require("./constants");
require("./mocks.room");
require("./../default/extensions.room");

const world = {
    init() {

        global._ = require("lodash");
        global.Strategies = require("./../default/strategies"); 

        global.Memory = {
            creeps: {},
            rooms: {},
            spawns: {},
            flags: {}
        };

        global.Game = {
            creeps: {},
            rooms: {},
            spawns: {},
            time: 1
        }
    },
    initSimple() {
        world.init();
        world.createSpawn1();
        world.createCenterRoom();
    },
    extendFind(fn) {
        let inner = Game.rooms.W0N0.find;
        Game.rooms.W0N0.find = (type, filter) => {
            let result = fn(type, filter);
            return result || inner(type, filter);
        }
    },
    createCreep(name, role, body = [WORK, CARRY, MOVE]) {
        return Game.creeps[name] = {
            name: name,
            body: body,
            room: Game.rooms.W0N0,
            memory: {
                role: role
            },
            room: Game.rooms.W0N0,
            carry: {
                energy: 0
            },
            carryCapacity: 50,
            harvest: jest.fn(),
            moveTo: jest.fn(),
            transfer: jest.fn(),
            upgradeController: jest.fn()
        }
    },
    createSpawn1() {
        return Game.spawns.Spawn1 = {
            energy: 0,
            energyCapacity: 300,
            structureType: STRUCTURE_SPAWN,
            spawnCreep: jest.fn(),
            pos: {x:0, y:0}
        }
    },
    createCenterRoom() {
        let room = new Room();
        room.controller = {level: 1},
        room.energyAvailable = 150;
        room.findController = jest.fn();
        room.find = (type, opts) => {
            if (type === FIND_STRUCTURES && 
                (
                    opts.filter.structureType === STRUCTURE_SPAWN
                    ||
                    (typeof(opts.filter) === "function" && opts.filter(Game.spawns.Spawn1))
                )) {
                return [Game.spawns.Spawn1];
            }
            if (type === FIND_CREEPS) {
                return Game.creeps;
            }

            return [];
        }
        Game.rooms.W0N0 = room;
        return room;
    }
};

module.exports = world;