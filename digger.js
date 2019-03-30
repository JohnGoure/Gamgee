let digger = {
    run: function (creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            let source = Game.getObjectById(creep.memory.assignedSource);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }

        } else {
            if (creep.role == 'digger2') {
                let storage = Game.getObjectById('5c9949238bd7934566785556');
                creep.transfer(storage, resourceType);
            }
            if (creep.role == 'digger1') {
                let storage = Game.getObjectById('5c99533efef79118dc4e76ad');
                creep.transfer(storage, resourceType);
            }
            creep.drop(RESOURCE_ENERGY, creep.carryCapacity)
        }
    }
}

module.exports = digger;