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
                    return ((structure.id != '5cad579b3b636f1583e1895e' || structure.id != '5cad5a17adfc20719aa12323') && (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) &&
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
                    return (structure.hits < structure.hitsMax / 2 && structure.hits > 0 && structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART)
                }
            });
            
            if (repairitnow.length > 0) {
                closest = creep.pos.findClosestByRange(repairitnow);
                if (creep.repair(closest) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closest);
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
                        if (creep.repair(repairwall[repairwall.length - 1]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(repairwall[0]);
                        }
                    }
                }
            }
        }
    }
}
module.exports = repairSquad;