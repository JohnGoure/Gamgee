let Transporter = require('transporter');
let Upgrader = require('role.upgrader');

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
        const buildings = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
            return ((structure.id != '5cad579b3b636f1583e1895e' && structure.id != '5cad5a17adfc20719aa12323') && (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) &&
              structure.store[RESOURCE_ENERGY] > 200)
          }
        });
        let closest = creep.pos.findClosestByPath(buildings);
        if (closest) {
          if (creep.withdraw(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(closest);
          }
  
        } else {
          const resource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
          if (resource) {
            creep.moveTo(resource);
            creep.pickup(resource);
          }
        }
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