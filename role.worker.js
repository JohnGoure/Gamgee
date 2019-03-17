let roleWorker = {
    run: function (creep) {
      const spawn = Game.spawns['Spawn1'];
      const spawnEnergy = _.sum(spawn.energy);
      console.log(spawnEnergy);

      if (creep.carry.energy < creep.carryCapacity) {
        const targets = creep.room.find(FIND_DROPPED_RESOURCES);
        if (targets.length) {
          creep.moveTo(targets[0], {
            visualizePathStyle: {
              stroke: '#ffffff'
            }
          });
          creep.pickup(targets[0])
        }
      } 
      //else if (spawn.energy < spawn.energyCapacity) {
        //   const targets = creep.room.find(FIND_STRUCTURES, {
        //     filter: (structure) => {
        //       return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
        //         structure.energy < structure.energyCapacity;
        //     }
        //   });
        //   if (targets.length > 0) {
        //     if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //       creep.moveTo(targets[0], {
        //         visualizePathStyle: {
        //           stroke: '#ffffff'
        //         }
        //       });
        //     }
        //   }
        // } 
        else {
          if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {
              visualizePathStyle: {
                stroke: '#fffff'
              }
            });
          }
        }
      }
    };

    module.exports = roleWorker;