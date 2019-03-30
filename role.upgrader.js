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
                    return (structure.structureType == STRUCTURE_CONTAINER && structure.id != "5c9a24e5cac6ca1076c66c3f" || structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store[RESOURCE_ENERGY] > 0 && structure.id != "5c9a24e5cac6ca1076c66c3f"
                }
            });
            let closest = creep.pos.findClosestByPath(buildings);
            if (closest) {
                if (creep.withdraw(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closest);
                }

            } else {
                const targets = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                if (targets) {
                    creep.moveTo(targets);
                    creep.pickup(targets)
                }
            }

        }
    }
};

module.exports = roleUpgrader;