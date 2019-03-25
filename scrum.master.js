let scrumMaster = {
        run: function (creep) {
            const spawn = Game.spawns['Spawn1'];

            if (creep.memory.building && creep.carry.energy == 0) {
                creep.memory.building = false;
            }
            if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
                creep.memory.building = true;
            }


            if (!creep.memory.building) {
                const buildings = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.energy > 50;
                    }
                });
                if (buildings.length > 0) {
                    if (creep.withdraw(buildings[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(buildings[0]);
                    }

                } else {
                    const targets = creep.room.find(FIND_DROPPED_RESOURCES);
                    if (targets.length) {
                        creep.moveTo(targets[0], {});
                        creep.pickup(targets[0])
                    }
                }
             } else {
                    const buildings = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                                structure.energy < structure.energyCapacity;
                        }
                    });
                    if (buildings.length > 0) {
                        if (creep.transfer(buildings[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(buildings[0], {});
                        }
                    }
                }
            }
        }

        module.exports = scrumMaster;