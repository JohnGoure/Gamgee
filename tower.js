module.exports = { //TOWER CODE defendMyRoom: 
    function (myRoomName) { 
        var hostiles = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS); 
        var hostileHealers = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS, { filter: (s) => (s.getActiveBodyparts(HEAL) > 0) });
        var hostileAttackers = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS, { filter: (s) => ( s.getActiveBodyparts(ATTACK) > 0 || s.getActiveBodyparts(RANGED_ATTACK) > 0) }); 
        var hostiles = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS); 
        var towers = Game.rooms[myRoomName].find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } }); 
        var healerHit = false; 
    //Alternative to finding towers: // var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER); //if there are hostileHealers - attakc them 
        if (hostileHealers.length > 0 && healerHit == false) { 
            towers.forEach(tower => tower.attack(hostileHealers[0]));            
            healerHit = true; console.log("ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! "); 
        } 
            //if there are hostileAttackers - attakc them 
        else if (hostileAttackers.length > 0) { 
            towers.forEach(tower => tower.attack(hostileAttackers[0])); 
            healerHit = false; 
            console.log("ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! "); 
        } 
        //if there are ANY Hostiles - attakc them 
        else if (hostiles.length > 0) { 
            towers.forEach(tower => tower.attack(hostiles[0])); 
            healerHit = false; 
            console.log("ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! "); 
        } 
        //if there are no hostiles.... 
        if (hostiles.length === 0) { 
        //....first heal any damaged creeps 
        for (let name in Game.creeps) { 
            // get the creep object 
            var creep = Game.creeps[name]; 
            if (creep.hits < creep.hitsMax) {
                towers.forEach(tower => tower.heal(creep));
                 console.log("Tower is healing Creeps."); 
                } 
                } 
                for (var i in towers) {
                     //...repair Buildings! :) But ONLY until HALF the energy of the tower is gone. //Because we don't want to be exposed if something shows up at our door :) 
                     if (towers.energy > ((towers.energyCapacity / 10) * 10)) {

                    //Find the closest damaged Structure
                    var closestDamagedStructure = towers.pos.findClosestByRange(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART });
                    if (closestDamagedStructure) {
                        towers.repair(closestDamagedStructure);
                        console.log("The tower is repairing buildings.");
                    }
                }
            }

        }
    }
};