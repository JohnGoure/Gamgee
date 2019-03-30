let digger = {
    run: function (creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            let source = Game.getObjectById(creep.memory.assignedSource);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }

        } else {
            if (creep.memory.role == 'digger2') {
                let storage = Game.getObjectById('5c9949238bd7934566785556');
                creep.transfer(storage, RESOURCE_ENERGY, creep.carryCapacity);
                if (storage.store[RESOURCE_ENERGY] >= storage.storeCapacity - 44) {
                    creep.drop(RESOURCE_ENERGY, creep.carryCapacity)
                }
            }
            if (creep.memory.role == 'digger1') {
                let storage = Game.getObjectById('5c99533efef79118dc4e76ad');
                creep.transfer(storage, RESOURCE_ENERGY, creep.carryCapacity);
                if (storage.store[RESOURCE_ENERGY] >= storage.storeCapacity - 44) {
                    creep.drop(RESOURCE_ENERGY, creep.carryCapacity)
                }
            }
        }
    }
}

module.exports = digger;