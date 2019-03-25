var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
        }
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {});
            }
        } else {
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
        }
    }
};

module.exports = roleUpgrader;