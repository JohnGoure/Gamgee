let ScrumMaster = require("scrum.master");

let transporter = {
    run: function (creep) {
        let scrumMasters = _.filter(Game.creeps, (creep) => creep.memory.role == "scrum_master");

        // If there isn't a scrum master the transporter becomes the scrum master.
        if (scrumMasters.length == 0) {
            ScrumMaster.scrumMaster.run(creep);
        } 
        else {
            if (creep.memory.transporting && creep.carry.energy == 0) {
                creep.memory.transporting = false;
            }

            if (!creep.memory.transporting && creep.carry.energy == creep.carryCapacity) {
                creep.memory.transporting = true;
            }

            if (!creep.memory.transporting) {
                findEnergy(creep);
            }
            else {
                creep.memory.transporting = true;
                transportEnergyToStorage(creep);
            }
        }
    }
}

function findEnergy(creep) {
    ScrumMaster.findEnergy(creep);
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
    if (creep.memory.upgradeContainerId == null) {        
        const containerId = Game.spawns[creep.memory.spawnName].memory.upgradeContainerId;
        creep.memory.upgradeContainerId = containerId;
    }
    if (creep.memory.spawnContainer1Id == null) {
        const containerId = Game.spawns[creep.memory.spawnName].memory.spawnContainer1Id != null ? Game.spawns[creep.memory.spawnName].memory.spawnContainer1Id : null;
        creep.memory.spawnContainer1Id = containerId;
    }
    if (creep.memory.spawnContainer2Id == null) {
        const containerId = Game.spawns[creep.memory.spawnName].memory.spawnContainer2Id ? Game.spawns[creep.memory.spawnName].memory.spawnContainer2Id : null;
        creep.memory.spawnContainer2Id = containerId;
    }
    const upgradeContainer = Game.getObjectById(creep.memory.upgradeContainerId);
    const spawnContainer1 = Game.getObjectById(creep.memory.spawnContainer1Id);
    const spawnContainer2 = Game.getObjectById(creep.memory.spawnContainer2Id);

    const containers = [upgradeContainer, spawnContainer1, spawnContainer2]

    // containers.filter(container => 
    //     container != null && container.store[RESOURCE_ENERGY] < container.store.getCapacity());

    // TransferEnergy(containers[0], creep);

    if (spawnContainer1 != null && spawnContainer1.store[RESOURCE_ENERGY] < spawnContainer1.store.getCapacity() * .7) {  
        TransferEnergy(spawnContainer1, creep);
    }
    else if (spawnContainer2 != null && spawnContainer2.store[RESOURCE_ENERGY] < spawnContainer1.store.getCapacity() *.7) { 
        TransferEnergy(spawnContainer2, creep);
    }
    else if (upgradeContainer != null && upgradeContainer != 'undefined' && upgradeContainer.store[RESOURCE_ENERGY] < upgradeContainer.store.getCapacity()) { 
        TransferEnergy(upgradeContainer, creep);
    }
    else if (spawnContainer1 != null && spawnContainer1.store[RESOURCE_ENERGY] < spawnContainer1.store.getCapacity()) {     
        TransferEnergy(spawnContainer1, creep);
    }
    else if (spawnContainer2 != null && spawnContainer2.store[RESOURCE_ENERGY] < spawnContainer2.store.getCapacity()) {         
        TransferEnergy(spawnContainer2, creep);
    }

}

function TransferEnergy(upgradeContainer, creep) { 
    if (creep.transfer(upgradeContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(upgradeContainer)
    }
}

function findFullestContainer(creep) {
    const storedEnergyContainers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (
                structure.id == "5cad5f10b5f63036db0a2f39" || structure.id == "5cad5bd3b8c230403962c7c7" &&
                structure.store[RESOURCE_ENERGY] > 0
            );
        }
    });
    if (storedEnergyContainers.length == 2) {
        if (storedEnergyContainers[0].store[RESOURCE_ENERGY] > storedEnergyContainers[1].store[RESOURCE_ENERGY]) {
            return storedEnergyContainers[0].store[RESOURCE_ENERGY];
        } else {
            return storedEnergyContainers[1].store[RESOURCE_ENERGY];
        }
    } else {
        return null;
    }

}

function Print(text) {
    console.log(text);
}

module.exports = transporter;