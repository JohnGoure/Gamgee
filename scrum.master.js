const FINDCONTAINERENERGYAT = 200;
const FINDDROPPEDENERGYAT = 300;

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
    else {
        // If the storage is full move the scrum masters back to the spawn
        // so they are out of the way.
        const getOutOfWay = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_SPAWN));
            }
        });
        creep.moveTo(getOutOfWay);
    }
}

function findEnergy(creep) {
    let storedEnergyContainers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_STORAGE &&
                structure.store[RESOURCE_ENERGY] >= FINDCONTAINERENERGYAT || structure.structureType == STRUCTURE_CONTAINER &&
                structure.store[RESOURCE_ENERGY] >= FINDCONTAINERENERGYAT)
        }
    });

    // If the creep is not a scrum master or upgrader they can't use the
    // upgrader or spawn containers.
    if (creep.memory.role == 'transporter' || creep.memory.role == 'worker')
        storedEnergyContainers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER &&
                structure.store[RESOURCE_ENERGY] > FINDCONTAINERENERGYAT
                && structure.id != Game.spawns[creep.memory.spawnName].memory.upgradeContainerId
                && structure.id != Game.spawns[creep.memory.spawnName].memory.spawnContainer1Id
                && structure.id != Game.spawns[creep.memory.spawnName].memory.spawnContainer2Id
            );
        }
    });
    
    const closestEnergyContainer = creep.pos.findClosestByPath(storedEnergyContainers);        
    
    const droppedResources = creep.room.find(FIND_DROPPED_RESOURCES);
    const lotsofenergy = droppedResources.filter(resource => resource.energy >= FINDDROPPEDENERGYAT);
    const closestDroppedEnergy = creep.pos.findClosestByPath(lotsofenergy);

    if (closestDroppedEnergy != null)
        getDroppedEnergy(creep, closestDroppedEnergy);

    else if (closestEnergyContainer != null) {
        getStoredEnergy(creep, closestEnergyContainer);
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

module.exports = {
    scrumMaster: scrumMaster, 
    findEnergy: findEnergy
};