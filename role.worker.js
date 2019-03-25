let roleWorker = {
  run: function (creep) {
    if (creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false;
    }
    if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true;
    }

    if (creep.memory.building == false) {
      const buildings = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.energy > 50;
                    }
                });
                if (buildings.length > 0) {
                    if (creep.withdraw(buildings[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(buildings[0]);
                    }

                } else {
                    const targets = creep.room.find(FIND_DROPPED_RESOURCES);
                    if (targets.length) {
                        creep.moveTo(targets[0], {});
                        creep.pickup(targets[0])
                    }
                }
    } else {
      var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      }
    }
  }
};

module.exports = roleWorker;