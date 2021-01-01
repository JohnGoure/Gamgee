let digger = {
    run: function (creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            let source = Game.getObjectById(creep.memory.assignedSource);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }

        } 
        else {
            const buildings = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER);
                }
            });
            if (buildings.length > 0) {
                let storage = creep.pos.findClosestByPath(buildings);
                if (storage) {
                    creep.transfer(storage, RESOURCE_ENERGY, creep.carryCapacity); 
                }
                    
                else if (storage.store[RESOURCE_ENERGY] >= storage.storeCapacity - 44) {
                    creep.drop(RESOURCE_ENERGY, creep.carryCapacity);
                }
            } else {
                creep.drop(RESOURCE_ENERGY, creep.carryCapacity);
            }
        }
    }
}

module.exports = digger;