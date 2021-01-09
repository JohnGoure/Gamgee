
let Upgrader = require('role.upgrader');
let ScrumMaster = require('scrum.master');

let roleWorker = {
  run: function (creep) {
    let diggers = _.filter(Game.creeps, (creep) => creep.memory.role == 'digger');
    if (diggers == 0) {
        Digger.run(creep);
    }
    else {
      if (creep.memory.working && creep.carry.energy == 0) {
        creep.memory.working = false;
      }
      if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
        creep.memory.working = true;
      }
      var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
  
      if (creep.memory.working == false) {
        // If not working find energy.
        ScrumMaster.findEnergy(creep)
      } else if (target != null) {
        creep.memory.working = true;
        if (creep.build(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      } else {
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
        else {
            Upgrader.run(creep);
        }
      }
    }
      
    }
};

module.exports = roleWorker;