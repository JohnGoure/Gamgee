let ScrumMaster = require('scrum.master');

let transporter = {
    run: function (creep) {
        let scrumMasters = _.filter(Game.creeps, (creep) => creep.memory.role == 'scrum_master');

        // If there isn't a scrum master the transporter becomes the scrum master.
        if (scrumMasters.length == 0) {
            ScrumMaster.run(creep);
        } else {
            if (creep.memory.transporting && creep.carry.energy == 0) {
                creep.memory.transporting = false;
            }
            if (!creep.memory.transporting && creep.carry.energy == creep.carryCapacity) {
                creep.memory.transporting = true;
            }


            if (!creep.memory.transporting) {
                findEnergy(creep);
            } else {
                creep.memory.transporting = true;
                transportEnergyToStorage(creep);
            }
        }
    }
}

function findEnergy(creep) {
    const droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
    const storedEnergyContainers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.id == "5cad5f10b5f63036db0a2f39" &&
                structure.store[RESOURCE_ENERGY] > 350 || structure.id == "5cad5bd3b8c230403962c7c7" &&
                structure.store[RESOURCE_ENERGY] > 350
            )
        }
    });
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

function transportEnergyToStorage(creep) {
    const roomStorage = creep.room.storage;
    const scrumMasterStorage = Game.getObjectById("5cad579b3b636f1583e1895e");
    const upgradeStorage = Game.getObjectById("5cad5a17adfc20719aa12323");
    if (scrumMasterStorage.store[RESOURCE_ENERGY] < CONTAINER_CAPACITY) {
        if (creep.transfer(scrumMasterStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(scrumMasterStorage);
        }
    } else if (upgradeStorage.store[RESOURCE_ENERGY] < CONTAINER_CAPACITY) {
        if (creep.transfer(upgradeStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(upgradeStorage);
        }
    } else if (creep.transfer(roomStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE || creep.transfer(roomStorage, RESOURCE_GHODIUM_OXIDE) == ERR_NOT_IN_RANGE) {
        creep.moveTo(roomStorage);
    }
}

function findFullestContainer(creep) {
    const storedEnergyContainers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (
                structure.id == "5cad5f10b5f63036db0a2f39" || structure.id == "5cad5bd3b8c230403962c7c7" &&
                structure.store[RESOURCE_ENERGY] > 0
            )
        }
    });
    if (storedEnergyContainers.length == 2) {
        if (storedEnergyContainers[0].store[RESOURCE_ENERGY] > storedEnergyContainers[1].store[RESOURCE_ENERGY]) {
            return storedEnergyContainers[0].store[RESOURCE_ENERGY];
        } else {
            return storedEnergyContainers[1].store[RESOURCE_ENERGY]
        }
    } else {
        return null;
    }

}

module.exports = transporter;