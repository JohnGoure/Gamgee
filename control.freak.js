let roleUpgrader = require('role.upgrader');
let roleWorker = require('role.worker');
let roleDigger = require('digger');
let roleScrumMaster = require('scrum.master');
let roleDefender = require('defender');
let roleRepairMan = require('repair.squad');

let controlFreak = {
    run: function() {
        for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'digger1' || creep.memory.role == 'digger2') {
            roleDigger.run(creep);
        }
        if(creep.memory.role == 'worker') {
            roleWorker.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'scrum_master') {
            roleScrumMaster.run(creep);
        }
        if(creep.memory.role == 'attacker') {
            roleDefender.run(creep);
        }
        if(creep.memory.role == 'repair_squad') {
            roleRepairMan.run(creep);
        }
    }
    }
}

module.exports = controlFreak;