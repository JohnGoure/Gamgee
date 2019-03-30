let Transport = require('transporter');

let roleWorker = {
  run: function (creep) {
    if (creep.memory.working && creep.carry.energy == 0) {
      creep.memory.working = false;
    }
    if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
    }
    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

    if (creep.memory.working == false) {
      const buildings = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return ((structure.id != '5c9a24e5cac6ca1076c66c3f' || structure.id != '5c9963dcc9db991063d82dfe') && (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) &&
            structure.store[RESOURCE_ENERGY] > 0)
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
    } else if (targets.length > 0) {
      creep.memory.working = true;
      if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0]);
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
    }
  }
};

module.exports = roleWorker;