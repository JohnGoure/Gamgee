// Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );
// Game.spawns['Spawn1'].room.controller.activateSafeMode();

let spawnMaster = require('spawn.master');
let ControlFreak = require('control.freak');

module.exports.loop = function () {
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    
    spawnMaster.run();
    ControlFreak.run();
}