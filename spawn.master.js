let controllerLevel = 1

let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
let workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
let diggers = _.filter(Game.creeps, (creep) => creep.memory.role == 'digger1');
let diggers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'digger2');
let scrumMasters = _.filter(Game.creeps, (creep) => creep.memory.role == 'scrum_master');
let defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair_squad');
let transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
let manager = _.filter(Game.creeps, (creep) => creep.memory.role == 'manager');

let spawnMaster = {
    run: function (roomName) {
        controllerLevel = Game.rooms[roomName].controller.level;
        for (var spawnName in Game.spawns) {
            GetDiggers(spawnName);
            MakeWorkCrew(spawnName);
        }
    }
};

function GetDiggers(spawnName) {
    const spawn = Game.spawns[spawnName];
    const energySources = spawn.room.find(FIND_SOURCES);

    for (var energySource in energySources) {
        let newName = 'Digger' + Game.time;

        if (diggers.length < 2) {
            spawn.spawnCreep(GetDiggerDuties(), newName, {
                memory: {
                    role: 'digger1',
                    assignedSource: energySources[energySource].id
                }
            });
        }
        else if (diggers2.length < 2) {
            spawn.spawnCreep(GetDiggerDuties(), newName, {
                memory: {
                    role: 'digger2',
                    assignedSource: energySources[energySource].id
                }
            });
        }
    }
}

function GetDiggerDuties() {
    const DIGGERDUTIES1 = [WORK, CARRY, MOVE];
    const DIGGERDUTIES2 = [WORK, WORK, WORK, CARRY, MOVE];
    const DIGGERDUTIES3 = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
    const DIGGERDUTIES4 = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY];

    var diggerDuties = DIGGERDUTIES1;
    
    if (controllerLevel == 2) {
        diggerDuties = DIGGERDUTIES2;
    } else if (controllerLevel == 3) {
        diggerDuties = DIGGERDUTIES3;
    } else if (controllerLevel == 4) {
        diggerDuties = DIGGERDUTIES4;
    }

    return diggerDuties;

}

function MakeWorkCrew(spawnName) {
    if (diggers.length >= 2 && diggers2.length >= 2) {
        MakeScrumMasters(spawnName);
        MakeManagers(spawnName);
        MakeUpgraders(spawnName);
        MakeTransporters(spawnName);
        MakeWorkers(spawnName);
        MakeRepairers(spawnName);
        MakeDefenders(spawnName);
    }
}

function MakeScrumMasters(spawnName) {
    let newName = 'Scrum_Master' + Game.time;
    if (scrumMasters.length < 2) {
        Game.spawns[spawnName].spawnCreep(GetScrumDuties, newName, {
            memory: {
                role: 'scrum_master'
            }
        });
    }
}

function GetScrumDuties() {
    const DUTIES1 = [CARRY, MOVE, MOVE];
    const DUTIES2 = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
    const DUTIES3 = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
    const DUTIES4 = [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
    
    var scrumDuties = GetDuties([DUTIES1, DUTIES2, DUTIES3, DUTIES4]);

    return scrumDuties;

}

function MakeManagers(spawnName) {
    if (manager.length < 1) {
        let newName = 'Manager' + Game.time;
        Game.spawns[spawnName].spawnCreep(GetManagerDuties(), newName, {memory: {role: 'manager'}});
    }
}

function GetManagerDuties() {
    const DUTIES1 = [CARRY, MOVE, MOVE];
    const DUTIES2 = [CARRY, CARRY, CARRY, MOVE, MOVE];
    const DUTIES3 = [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
    const DUTIES4 = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];

    let duties = GetDuties([DUTIES1, DUTIES2, DUTIES3, DUTIES4]);
    
    return duties;
}

function MakeUpgraders(spawnName) {
    if (upgraders.length < 5) {            
        let newName = 'Upgrader' + Game.time;
        Game.spawns[spawnName].spawnCreep(UpgraderDuties(), newName, {
            memory: {
                role: 'upgrader'
            }
        });
    }
}

function UpgraderDuties() {
    const DUTIES1 = [WORK, MOVE, CARRY];
    const DUTIES2 = [WORK, WORK, MOVE, MOVE, CARRY, CARRY];
    const DUTIES3 = [WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY];
    const DUTIES4 = [WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];

    let duties = GetDuties([DUTIES1, DUTIES2, DUTIES3, DUTIES4]);

    return duties;
}

function MakeTransporters(spawnName) {   
    if (transporters.length < 2) {
        let newName = 'transporter' + Game.time;
        Game.spawns[spawnName].spawnCreep(TransporterDuties(), newName, {
            memory: {
                role: 'transporter'
            }
        });
    }
}

function TransporterDuties() {
    const DUTIES1 = [CARRY, MOVE, MOVE];
    const DUTIES2 = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
    const DUTIES3 = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
    const DUTIES4 = [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
    
    let duties = GetDuties([DUTIES1, DUTIES2, DUTIES3, DUTIES4]);

    return duties;
}

function MakeWorkers(spawnName) {
    if (workers.length < 1) {
        var newName = 'Worker' + Game.time;
        Game.spawns[spawnName].spawnCreep(WorkerDuties(), newName, {
            memory: {
                role: 'worker'
            }
        });
    }
}

function WorkerDuties() {
    const DUTIES1 = [WORK, MOVE, CARRY];
    const DUTIES2 = [WORK, WORK, MOVE, MOVE, CARRY, CARRY];
    const DUTIES3 = [WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE,, CARRY, CARRY, CARRY, CARRY, ];
    const DUTIES4 = [WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];

    let duties = GetDuties([DUTIES1, DUTIES2, DUTIES3, DUTIES4]);

    return duties;
}

function MakeRepairers(spawnName) {
    if (repairers.length < 1) {
        var newName = 'minimum_wage_employee' + Game.time;
        Game.spawns[spawnName].spawnCreep(RepairerDuties, newName, {
            memory: {
                role: 'repair_squad'
            }
        });
    }
}

function RepairerDuties() {
    const DUTIES1 = [WORK, MOVE, CARRY];
    const DUTIES2 = [WORK, WORK, MOVE, MOVE, CARRY, CARRY];
    const DUTIES3 = [WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE,, CARRY, CARRY, CARRY, CARRY ];
    const DUTIES4 = [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
    
    let duties = GetDuties([DUTIES1, DUTIES2, DUTIES3, DUTIES4]);

    return duties;
}

function MakeDefenders(spawnName) {    
    if (defenders.length < 0) {
        var newName = 'Defender' + Game.time;
        Game.spawns[spawnName].spawnCreep(DefenderDuties(), newName, {
            memory: {
                role: 'attacker'
            }
        });
    }
}

function DefenderDuties() {
    const DUTIES1 = [ATTACK, MOVE, MOVE];
    const DUTIES2 = [ATTACK, ATTACK, MOVE, MOVE];
    const DUTIES3 = [ATTACK, ATTACK, MOVE, MOVE, MOVE ];
    const DUTIES4 = [ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE];
    
    let duties = GetDuties([DUTIES1, DUTIES2, DUTIES3, DUTIES4]);

    return duties;
}

function GetDuties(duties) {
    let duty = duties[0];
    if (controllerLevel == 2) {
        duty = duties[1];
    }else if (controllerLevel == 3) {
        managerDuties = duties[2];
    } else if (controllerLevel == 4) {
        managerDuties = duties[3];
    }
    return duty;
}

module.exports = spawnMaster;