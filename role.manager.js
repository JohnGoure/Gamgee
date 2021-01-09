const ScrumMaster = require('scrum.master');

let roleManager = {
    run: function(creep) {
        if (creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == false) {
            ScrumMaster.findEnergy(creep);
        }  
        else {
            creep.memory.working = true;
            const buildings = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER) &&
                  structure.energy < structure.energyCapacity;
                }
            });
            if (buildings.length > 0) {
                if (creep.transfer(buildings[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(buildings[0], {});
                }
            }
        }
    }
}

module.exports = roleManager;