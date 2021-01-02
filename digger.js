let digger = {
    run: function (creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            let source = Game.getObjectById(creep.memory.assignedSource);
            if (source == null) { 
                for (var spawnName in Game.spawns) {
                    const spawn = Game.spawns[spawnName];
                    const energySources = spawn.room.find(FIND_SOURCES);        
                
                    for (var energySource in energySources) {
                        const diggersAtSource = _.filter(Game.creeps, (creep) => creep.memory.assignedSource == energySources[energySource].id).length;
                        if (diggersAtSource < DIGGERMAXCOUNT) { 
                            creep.memory.assignedSource = energySources[energySource].id;
                        }
                    } 
                }
                
            }
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }

        } 
        else {
            const buildings = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER);
                }
            });
            if (buildings.length > 0) {
                let storage = creep.pos.findClosestByPath(buildings);
                if (storage) {
                    if (creep.transfer(storage, RESOURCE_ENERGY, creep.carryCapacity) == ERR_NOT_IN_RANGE || creep.transfer(storage, RESOURCE_ENERGY, creep.carryCapacity) == ERR_FULL) {
                        DropResources(creep);
                    } 
                }
                    
                else if (storage.store[RESOURCE_ENERGY] >= storage.storeCapacity - 50) {
                    DropResources(creep);
                }
            } 
            else {
                DropResources(creep);
            }
        }
    }
}

function DropResources(creep) {
    creep.drop(RESOURCE_ENERGY, creep.carryCapacity);
}

module.exports = digger;