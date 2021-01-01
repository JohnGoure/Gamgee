let scrumMaster = {
    run: function (creep) {
        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if (!creep.memory.building) {
            findEnergy(creep);
        } 
        else {
            restoreEnergy(creep);
        }
    }
}

function restoreEnergy(creep) {
    const buildings = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                structure.energy < structure.energyCapacity);
        }
    });
    if (buildings) {
        if (creep.transfer(buildings, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(buildings);
        }
    }
}

function findEnergy(creep) {
    const droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
    let storedEnergyContainers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_STORAGE &&
                structure.store[RESOURCE_ENERGY] > 0 || structure.id == "5c9a24e5cac6ca1076c66c3f" &&
                structure.store[RESOURCE_ENERGY] > 0)
        }
    });
    if (storedEnergyContainers.length < 1) {
        storedEnergyContainers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER  &&
                structure.store[RESOURCE_ENERGY] > 0)
        }
    });
    }
    
    const closestEnergyContainer = creep.pos.findClosestByPath(storedEnergyContainers);
    if (closestEnergyContainer) {
        getStoredEnergy(creep, closestEnergyContainer);
    } else {
        if (droppedEnergy) {
            getDroppedEnergy(creep, droppedEnergy);
        }
    }

}

function getDroppedEnergy(creep, target) {
    creep.moveTo(target);
    creep.pickup(target);
}

function getStoredEnergy(creep, target) {
    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
}

module.exports = scrumMaster;