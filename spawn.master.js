let spawnMaster = {
    run: function() {
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    let workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
    let diggers = _.filter(Game.creeps, (creep) => creep.memory.role =='digger1');
    let diggers2 = _.filter(Game.creeps, (creep) => creep.memory.role =='digger2');
    let scrumMasters = _.filter(Game.creeps, (creep) => creep.memory.role == 'scrum_master');
    let defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair_squad');
    
    if(diggers.length < 2) {
        let newName = 'Digger' + Game.time;
        console.log('making digger');
        const sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,MOVE,CARRY], newName, {memory: {role: 'digger1', assignedSource: sources[0].id}});
    }
    
    if(diggers2.length < 2) {
        let newName = 'Digger' + Game.time;
        console.log('making digger');
        const sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,MOVE,CARRY], newName, {memory: {role: 'digger2', assignedSource: sources[1].id}});
    }
    
    if (diggers.length >= 2 && diggers2.length >= 2) {
        
        if(scrumMasters.length < 2) {
            var newName = 'Scrum_Master' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY], newName, {memory: {role: 'scrum_master'}})
        }
        if(upgraders.length < 5) {
            let newName = 'Upgrader' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY], newName, {memory: {role: 'upgrader'}});
        }
    
        if(workers.length < 3) {
            var newName = 'Worker' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY], newName, {memory: {role: 'worker'}});
        }
        
        if(repairers.length < 1) {
            var newName = 'minimum_wage_employee' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,MOVE,CARRY], newName, {memory: {role: 'repair_squad'}});
        }
        
        if(defenders.length < 1) {
            var newName = 'Defender' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'attacker'}});
        }
        
    }
    }
}

module.exports = spawnMaster;