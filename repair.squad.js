let repairSquad = {
    run: function (creep) {

        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if (creep.memory.building == false) {
            const buildings = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.id != '5c9a24e5cac6ca1076c66c3f' || structure.id != '5c9963dcc9db991063d82dfe') && (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store[RESOURCE_ENERGY] > 0)
                }
            });
            let closest = creep.pos.findClosestByPath(buildings);
            if (closest) {
                if (creep.withdraw(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closest);
                }

            } else {
                const targets = creep.room.find(FIND_DROPPED_RESOURCES);
                if (targets.length) {
                    creep.moveTo(targets[0], {});
                    creep.pickup(targets[0])
                }
            }
        } else {
            creep.memory.building = true;
            var repairitnow = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.hits < 650 && structure.hits > 0)
                }
            });

            if (repairitnow.length > 0) {
                if (creep.repair(repairitnow[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairitnow[0]);
                }
            } else {

                var repairit = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.hits < structure.hitsMax && structure.hits > 0 && structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART)
                    }
                });

                var repairwall = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_RAMPART && structure.hits < structure.hitsMax && structure.hits > 0 || structure.hits < structure.hitsMax && structure.hits > 0 && structure.structureType == STRUCTURE_WALL)
                    }
                });

                if (repairit.length > 0) {
                    if (creep.repair(repairit[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(repairit[0]);
                    }
                } else {

                    if (repairwall.length > 0) {
                        if (creep.repair(repairwall[repairwall.length - 1]) == ERR_NOT_IN_RANGE) { //omgekeerde volgorde zodat ramparts eerst gerepaird worden
                            creep.moveTo(repairwall[0]);
                        }
                    }
                    /*else {
Worker.run(creep); // so it will alway's will be busy. DO NOT FORGET TO IMPORT(var roleHarvester = require('role.harvester');) IT 
}*/
                }
            }
        }
    }
}
module.exports = repairSquad;