let repairSquad = {
    run: function (creep) {

        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            console.log(creep + " building =" + creep.memory.building);
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            console.log(creep + " building =" + creep.memory.building);
        }

        if (creep.memory.building == false) {
            const buildings = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store[RESOURCE_ENERGY] > 0
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

            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });

            targets.sort((a, b) => a.hits - b.hits);

            if (targets.length > 0) {
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
}

module.exports = repairSquad;