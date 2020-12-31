let spawnMaster = {
    run: function (controllerLevel) {
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        let workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
        let diggers = _.filter(Game.creeps, (creep) => creep.memory.role == 'digger1');
        let diggers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'digger2');
        let scrumMasters = _.filter(Game.creeps, (creep) => creep.memory.role == 'scrum_master');
        let defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
        let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair_squad');
        let transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
        let manager = _.filter(Game.creeps, (creep) => creep.memory.role == 'manager');

        const rcl1DiggerDuties = [WORK, CARRY, MOVE];
        const rcl2DiggerDuties = [WORK, WORK, WORK, CARRY, MOVE];
        const rcl3DiggerDuties = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
        const rcl4DiggerDuties = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY];

        const rcl1ScrumDuties = [CARRY, MOVE, MOVE];
        const rcl2ScrumDuties = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
        const rcl3ScrumDuties = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
        const rcl4ScrumDuties = [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
        
        var rclDiggerDuties = rcl1DiggerDuties;
        var rclScrumDuties = rcl1ScrumDuties;
        
        if (controllerLevel == 2) {
            rclDiggerDuties = rcl2DiggerDuties;
            rclScrumDuties = rcl2ScrumDuties;
        } else if (controllerLevel == 3) {
            rclDiggerDuties = rcl3DiggerDuties;
            rclScrumDuties = rcl3ScrumDuties;
        } else if (controllerLevel == 4) {
            rclDiggerDuties = rcl4DiggerDuties;
            rclScrumDuties = rcl4ScrumDuties;
        }

        if (diggers.length < 1) {
            let newName = 'Digger' + Game.time;
            const sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
            Game.spawns['Spawn1'].spawnCreep(rclDiggerDuties, newName, {
                memory: {
                    role: 'digger1',
                    assignedSource: sources[0].id
                }
            });
        }

        if (diggers2.length < 1) {
            let newName = 'Digger' + Game.time;
            const sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
            Game.spawns['Spawn1'].spawnCreep(rclDiggerDuties, newName, {
                memory: {
                    role: 'digger2',
                    assignedSource: sources[1].id
                }
            });
        }

        if (diggers.length >= 1 && diggers2.length >= 1) {
            if (scrumMasters.length < 2) {
                var newName = 'Scrum_Master' + Game.time;
                Game.spawns['Spawn1'].spawnCreep(rclScrumDuties, newName, {
                    memory: {
                        role: 'scrum_master'
                    }
                });
            }
            
            if (manager.length < 1) {
                let newName = 'Manager' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'manager'}});
            }

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
}

module.exports = spawnMaster;