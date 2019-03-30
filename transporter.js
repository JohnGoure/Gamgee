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
    const droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
    const storedEnergyContainers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.id == "5c99533efef79118dc4e76ad" &&
                structure.store[RESOURCE_ENERGY] > 450 || structure.id == "5c9949238bd7934566785556" &&
                structure.store[RESOURCE_ENERGY] > 450
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
    const scrumMasterStorage = Game.getObjectById("5c9a24e5cac6ca1076c66c3f");
    const upgradeStorage = Game.getObjectById("5c9963dcc9db991063d82dfe");
    if (scrumMasterStorage.store[RESOURCE_ENERGY] < CONTAINER_CAPACITY) {
        if (creep.transfer(scrumMasterStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(scrumMasterStorage);
        }
    } else if (upgradeStorage.store[RESOURCE_ENERGY] < CONTAINER_CAPACITY) {
        if (creep.transfer(upgradeStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(upgradeStorage);
        }
    } else if (creep.transfer(roomStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(roomStorage);
    }
}

function findFullestContainer(creep) {
    const storedEnergyContainers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (
                structure.id == "5c99533efef79118dc4e76ad" || structure.id == "5c9949238bd7934566785556" &&
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