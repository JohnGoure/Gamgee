let ScrumMaster = require("scrum.master");
let Digger = require("digger");

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {
        let scrumMasters = _.filter(Game.creeps, (creep) => creep.memory.role == "scrum_master");
        let diggers = _.filter(Game.creeps, (creep) => creep.memory.role == 'digger');
        if (diggers == 0) {
            Digger.run(creep);
        }
        else if (scrumMasters.length == 0) {
            ScrumMaster.scrumMaster.run(creep);
        } 
        else {
            if (creep.memory.upgrading && creep.carry.energy == 0) {
                creep.memory.upgrading = false;
            }
            if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
                creep.memory.upgrading = true;
            }
    
            if (creep.memory.upgrading) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {});
                }
            } 
            else {
                ScrumMaster.findEnergy(creep);
    
            }
        }
        
    }
};

module.exports = roleUpgrader;