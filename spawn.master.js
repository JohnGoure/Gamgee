let DIGGERMAXCOUNT = 3;
let SCRUMMASTERMAXAMOUNT = 2;
let BUILDERCOUNT = 6;
let MANAGERCOUNT = 0;
let UPGRADERCOUNT = 4;
let TRANSPORTERCOUNT = 3;
let REPAIRERCOUNT = 1;
let DEFENDERCOUNT = 0;

let extensionCount = 0;

let spawnMaster = {
    run: function (roomName) {            
        extensionCount = Game.rooms[roomName].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_EXTENSION;
            } 
         }).length;

         if (extensionCount == 1) {
             SCRUMMASTERMAXAMOUNT = 2;
         }
         if (extensionCount >= 4) {
             DIGGERMAXCOUNT = DIGGERMAXCOUNT / 2;
             BUILDERCOUNT = BUILDERCOUNT / 2;
             UPGRADERCOUNT = UPGRADERCOUNT / 2;
             SCRUMMASTERMAXAMOUNT = SCRUMMASTERMAXAMOUNT / 2;
         }

         var towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {
            filter: {
                structureType: STRUCTURE_TOWER
            }
        });

        if (towers != null && towers.length > 0) {
            MANAGERCOUNT = 1;
        }

        for (var spawnName in Game.spawns) {
            SetupSpawnMemory(spawnName);
            GetDiggers(spawnName);
            MakeWorkCrew(spawnName);
        }
    }
};

function SetupSpawnMemory(spawnName, creep) {    
    const spawn = Game.spawns[spawnName];

    if (spawn.memory.sources == null) {
        spawn.memory.sources = spawn.room.find(FIND_SOURCES);
    }

    if (spawn.memory.upgradeContainerId == null) {    
        const allRedFlags = _.filter(Game.flags, (flag) => flag.color == COLOR_RED);

        const containers = spawn.room.find(FIND_STRUCTURES, {
            filter: {structureType: STRUCTURE_CONTAINER}
        });
    
        const upgradeContainer = containers.filter((c) => c.pos.toString() == allRedFlags[0].pos.toString())[0];
        spawn.memory.upgradeContainerId = upgradeContainer != null ? upgradeContainer.id : null;
    }
    if (spawn.memory.spawnContainer1Id == null || spawn.memory.spawnContainer2Id == null) {
        
        const allWhiteFlags = _.filter(Game.flags, (flag) => flag.color == COLOR_WHITE);

        const containers = spawn.room.find(FIND_STRUCTURES, {
            filter: {structureType: STRUCTURE_CONTAINER}
        });
    
        const spawnContainer = containers.filter((c) => allWhiteFlags.filter(f => f.pos.toString() == c.pos.toString()).length);
        if (spawnContainer != null) {
            if (spawnContainer[0] != null)
                spawn.memory.spawnContainer1Id = spawnContainer[0].id;
            if (spawnContainer[1] != null)
                spawn.memory.spawnContainer2Id = spawnContainer[1].id;
        }    
    }
}

function GetDiggers(spawnName) {
    const spawn = Game.spawns[spawnName];
    const energySources = spawn.memory.sources;   
    
    energySources.forEach( energySource => 
        {

            const diggersAtSource = _.filter(Game.creeps, (creep) => creep.memory.assignedSource == energySource.id).length;
            if (diggersAtSource < DIGGERMAXCOUNT) {   
                let newName = 'Digger' + Game.time;
                spawn.spawnCreep(GetDiggerDuties(), newName, {
                    memory: {
                        role: 'digger',
                        assignedSource: energySource.id,
                        spawnName: spawnName
                    }
                });
            }
        }
    );
}

function GetDiggerDuties() {

    let duties = [];
    let energyAmount = (extensionCount * 50) + 300;
    while (energyAmount > 0 && duties.length < 8) {
        if (duties.length == 0) {
            duties.push(CARRY);
            duties.push(MOVE);
            energyAmount = energyAmount - 100;
        } else if (energyAmount >= 100 && (duties.length + 1) % 3 == 0) {
            duties.push(WORK);
            energyAmount = energyAmount - 100;
        } else {
            duties.push(MOVE);
            energyAmount = energyAmount - 50;
        }
    }
    return duties;

}

function MakeWorkCrew(spawnName) { 
    let diggerCount = _.filter(Game.creeps, (creep) => creep.memory.role == 'digger' && creep.memory.spawnName == spawnName).length;
    let scrumMasterCount = _.filter(Game.creeps, (creep) => creep.memory.role == 'scrum_master' && creep.memory.spawnName == spawnName).length;

    // If there is 1 digger and no scrum master make a scrum master.
    // else check if diggercount is greater than the STARTSCRUMAT.
    if ((diggerCount > 1 && scrumMasterCount < 1) || (diggerCount >= DIGGERMAXCOUNT * 2)) {

        MakeScrumMasters(spawnName);

        if (scrumMasterCount != null && scrumMasterCount >= SCRUMMASTERMAXAMOUNT) {
            MakeManagers(spawnName);
            MakeUpgraders(spawnName);
            MakeTransporters(spawnName);
            MakeBuilders(spawnName);
            MakeRepairers(spawnName);
            MakeDefenders(spawnName);        
        }
    }    
}

function MakeScrumMasters(spawnName) {
    let scrumMasters = _.filter(Game.creeps, (creep) => creep.memory.role == 'scrum_master' && creep.memory.spawnName == spawnName);
    let newName = 'Scrum_Master' + Game.time;
    if (scrumMasters.length < SCRUMMASTERMAXAMOUNT) {
        Game.spawns[spawnName].spawnCreep(GetScrumDuties(), newName, {
            memory: {
                role: 'scrum_master',
                spawnName: spawnName
            }
        });
    }
}

function GetScrumDuties() {
    let duties = [];
    for (let step = 0; step < extensionCount + 6; step++) {
        if (duties.length == 0) {
            duties.push(CARRY);
        }
        else if (duties.length % 2 == 0) {
            duties.push(CARRY);
        }
        else {
            duties.push(MOVE);
        }
    }

    return duties;

}

function MakeManagers(spawnName) {
    let manager = _.filter(Game.creeps, (creep) => creep.memory.role == 'manager' && creep.memory.spawnName == spawnName);
    if (manager.length < MANAGERCOUNT) {
        let newName = 'Manager' + Game.time;
        Game.spawns[spawnName].spawnCreep(GetManagerDuties(), newName, {memory: {role: 'manager',
        spawnName: spawnName}});
    }
}

function GetManagerDuties() {

    let duties = [];

    for (let step = 0; step < extensionCount + 6; step++) {
        if (duties.length == 0) {
            duties.push(MOVE);
        } 
        else if (duties.length % 2 == 0) {
            duties.push(CARRY);
        } else {
            duties.push(MOVE);
        }
    }
    
    return duties;
}

function MakeUpgraders(spawnName) {
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.spawnName == spawnName);
    if (upgraders.length < UPGRADERCOUNT) {     
        let newName = 'Upgrader' + Game.time;
        Game.spawns[spawnName].spawnCreep(UpgraderDuties(), newName, {
            memory: {
                role: 'upgrader',
                spawnName: spawnName
            }
        });
    }
}

function UpgraderDuties() {

    return GetDiggerDuties();
}

function MakeTransporters(spawnName) {  
    const spawn = Game.spawns[spawnName];
    let transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter' && creep.memory.spawnName == spawnName); 

    if (transporters.length < TRANSPORTERCOUNT) {
        let newName = 'transporter' + Game.time;
        Game.spawns[spawnName].spawnCreep(TransporterDuties(), newName, {
            memory: {
                role: 'transporter',
                spawnName: spawnName,
                upgradeContainerId: spawn.memory.upgradeContainerId != null ? spawn.memory.upgradeContainerId : null,
                spawnContainer1Id: spawn.memory.spawnContainer1Id != null ? spawn.memory.spawnContainer1Id.id : null,
                spawnContainer2Id: spawn.memory.spawnContainer2Id != null ? spawn.memory.spawnContainer2Id.id : null
            }
        });
    }
}

function TransporterDuties() {
    return GetManagerDuties();
}

function MakeBuilders(spawnName) {
    let workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker' && creep.memory.spawnName == spawnName);
    if (workers.length < BUILDERCOUNT) {
        var newName = 'Worker' + Game.time;
        Game.spawns[spawnName].spawnCreep(BuilderDuties(), newName, {
            memory: {
                role: 'worker',
                spawnName: spawnName
            }
        });
    }
}

function BuilderDuties() {
    let duties = [];
    let energyAmount = (extensionCount * 50) + 300;
    while (energyAmount > 0) {
        if (duties.length == 0) {
            duties.push(CARRY);
            duties.push(MOVE);
            energyAmount = energyAmount - 100;
        } 
        else if (energyAmount >= 100 && duties.length % 2 == 0) {
            duties.push(WORK);
            energyAmount = energyAmount - 100;
        } 
        else if (energyAmount >= 100) {
            duties.push(MOVE);
            duties.push(CARRY);
            energyAmount = energyAmount - 100;
        }
        else if (energyAmount >= 50 && energyAmount < 100) {
            duties.push(MOVE);
            energyAmount = energyAmount - 50
        }
        else if (energyAmount < 50) {
            break;
        }
    }
    return duties;
}

function MakeRepairers(spawnName) {
    let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair_squad' && creep.memory.spawnName == spawnName);
    if (repairers.length < REPAIRERCOUNT) {
        var newName = 'minimum_wage_employee' + Game.time;
        Game.spawns[spawnName].spawnCreep(RepairerDuties(), newName, {
            memory: {
                role: 'repair_squad',
                spawnName: spawnName
            }
        });
    }
}

function RepairerDuties() {
    return BuilderDuties();
}

function MakeDefenders(spawnName) {    
    let defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker' && creep.memory.spawnName == spawnName);
    if (defenders.length < DEFENDERCOUNT) {
        var newName = 'Defender' + Game.time;
        Game.spawns[spawnName].spawnCreep(DefenderDuties(), newName, {
            memory: {
                role: 'attacker',
                spawnName: spawnName
            }
        });
    }
}

function DefenderDuties() {
    let duties = [];
    let energyAmount = 300 + (extensionCount * 50);

    while (energyAmount > 0) {
        if (duties.length == 0) {
            duties.push(MOVE);
            duties.push(MOVE);
            energyAmount = energyAmount - 100;
        } 
        else if (energyAmount >= 80) {
            duties.push(ATTACK);
            energyAmount = energyAmount - 80;
        } 
        else if (energyAmount >= 50) {
            duties.push(MOVE);
            energyAmount = energyAmount - 50;
        } else {
            break;
        }
    }

    return duties;
}

module.exports = spawnMaster;