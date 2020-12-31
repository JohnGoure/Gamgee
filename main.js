// Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );
// Game.spawns['Spawn1'].room.controller.activateSafeMode();

let spawnMaster = require('spawn.master');
let ControlFreak = require('control.freak');
let Tower = require('tower');

module.exports.loop = function () {

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    
        
        for (var r in Game.rooms) {
            Tower.run(r);
            spawnMaster.run(Game.rooms[r].controller.level);
        }
        
    ControlFreak.run();
}