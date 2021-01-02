let roleUpgrader = require('role.upgrader');
let roleWorker = require('role.worker');
let roleDigger = require('digger');
let roleScrumMaster = require('scrum.master');
let roleDefender = require('defender');
let roleRepairMan = require('repair.squad');
let roleTransporter = require('transporter');
let roleManager = require('role.manager');

let controlFreak = {
    run: function () {
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.role == "digger") {
                roleDigger.run(creep);
            }
            if (creep.memory.role == 'worker') {
                roleWorker.run(creep);
            }
            if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if (creep.memory.role == 'scrum_master') {
                roleScrumMaster.run(creep);
            }
            if (creep.memory.role == 'transporter') {
                roleTransporter.run(creep);
            }
            if (creep.memory.role == 'attacker') {
                roleDefender.run(creep);
            }
            if (creep.memory.role == 'repair_squad') {
                roleRepairMan.run(creep);
            }
            if (creep.memory.role == 'manager') {
                roleManager.run(creep);
            }
        }
    }
}

module.exports = controlFreak;