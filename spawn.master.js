let controllerLevel = Game.rooms[roomName].controller.level;

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
    run: function () {
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

        if (diggers.length < 1) {
            spawn.spawnCreep(GetDiggerDuties(), newName, {
                memory: {
                    role: 'digger1',
                    assignedSource: energySource.id
                }
            });
        }
        else if (diggers2.length < 1) {
            spawn.spawnCreep(GetDiggerDuties(), newName, {
                memory: {
                    role: 'digger2',
                    assignedSource: energySource.id
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
    if (diggers.length >= 1 && diggers2.length >= 1) {
        MakeScrumMasters(spawnName);
        MakeManagers(spawnName);
        MakeUpgraders(spawnName);
        MakeTransporters(spawnName);
        MakeWorkers(spawnName);
        MakeRepairers(spawnName);
        MakeDefenders(spawnName);

        if (upgraders.length < 1) {
            let newName = 'Upgrader' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], newName, {
                memory: {
                    role: 'upgrader'
                }
            });
        }

        if (transporters.length < 2) {
            let newName = 'transporter' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, MOVE, MOVE, MOVE], newName, {
                memory: {
                    role: 'transporter'
                }
            });
        }

        if (workers.length < 1) {
            var newName = 'Worker' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], newName, {
                memory: {
                    role: 'worker'
                }
            });
        }

        if (repairers.length < 1) {
            var newName = 'minimum_wage_employee' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], newName, {
                memory: {
                    role: 'repair_squad'
                }
            });
        }

        if (defenders.length < 0) {
            var newName = 'Defender' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE], newName, {
                memory: {
                    role: 'attacker'
                }
            });
        }
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
    const SCRUMDUTIES1 = [CARRY, MOVE, MOVE];
    const SCRUMDUTIES2 = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
    const SCRUMDUTIES3 = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
    const SCRUMDUTIES4 = [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
    
    var scrumDuties = SCRUMDUTIES1;

    if (controllerLevel == 2) {
        scrumDuties = SCRUMDUTIES2;
    } else if (controllerLevel == 3) {
        scrumDuties = SCRUMDUTIES3;
    } else if (controllerLevel == 4) {
        scrumDuties = SCRUMDUTIES4;
    }

    return scrumDuties;

}

function MakeManagers(spawnName) {
    if (manager.length < 1) {
        let newName = 'Manager' + Game.time;
        Game.spawns[spawnName].spawnCreep(GetManagerDuties(), newName, {memory: {role: 'manager'}});
    }
}

function GetManagerDuties() {
    const MANAGERDUTIES1 = [CARRY, MOVE, MOVE];
    const MANAGERDUTIES2 = [CARRY, CARRY, CARRY, MOVE, MOVE];
    const MANAGERDUTIES3 = [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
    const MANAGERDUTIES4 = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];

    let managerDuties = MANAGERDUTIES1;

    if (controllerLevel == 2) {
        managerDuties = MANAGERDUTIES2;
    }else if (controllerLevel == 3) {
        managerDuties = MANAGERDUTIES3;
    } else if (controllerLevel == 4) {
        managerDuties = MANAGERDUTIES4;
    }
    
    return managerDuties;
}

module.exports = spawnMaster;