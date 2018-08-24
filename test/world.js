// Game Constants

global.OK = 0;
global.ERR_NOT_OWNER = -1;
global.ERR_NO_PATH = -2;
global.ERR_NAME_EXISTS = -3;
global.ERR_BUSY = -4;
global.ERR_NOT_FOUND = -5;
global.ERR_NOT_ENOUGH_RESOURCES = -6;
global.ERR_NOT_ENOUGH_ENERGY = -6;
global.ERR_INVALID_TARGET = -7;
global.ERR_FULL = -8;
global.ERR_NOT_IN_RANGE = -9;
global.ERR_INVALID_ARGS = -10;
global.ERR_TIRED = -11;
global.ERR_NO_BODYPART = -12;
global.ERR_NOT_ENOUGH_EXTENSIONS = -6;
global.ERR_RCL_NOT_ENOUGH = -14;
global.ERR_GCL_NOT_ENOUGH = -15;

global.FIND_EXIT_TOP = 1;
global.FIND_EXIT_RIGHT = 3;
global.FIND_EXIT_BOTTOM = 5;
global.FIND_EXIT_LEFT = 7;
global.FIND_EXIT = 10;
global.FIND_CREEPS = 101;
global.FIND_MY_CREEPS = 102;
global.FIND_HOSTILE_CREEPS = 103;
global.FIND_SOURCES_ACTIVE = 104;
global.FIND_SOURCES = 105;
/** `FIND_DROPPED_ENERGY` is deprecated the return value is the same as `FIND_DROPPED_RESOURCES` */
global.FIND_DROPPED_ENERGY = -106;
global.FIND_DROPPED_RESOURCES = 106;
global.FIND_STRUCTURES = 107;
global.FIND_MY_STRUCTURES = 108;
global.FIND_HOSTILE_STRUCTURES = 109;
global.FIND_FLAGS = 110;
global.FIND_CONSTRUCTION_SITES = 111;
global.FIND_MY_SPAWNS = 112;
global.FIND_HOSTILE_SPAWNS = 113;
global.FIND_MY_CONSTRUCTION_SITES = 114;
global.FIND_HOSTILE_CONSTRUCTION_SITES = 115;
global.FIND_MINERALS = 116;
global.FIND_NUKES = 117;
global.FIND_TOMBSTONES = 118;

global.TOP = 1;
global.TOP_RIGHT = 2;
global.RIGHT = 3;
global.BOTTOM_RIGHT = 4;
global.BOTTOM = 5;
global.BOTTOM_LEFT = 6;
global.LEFT = 7;
global.TOP_LEFT = 8;

global.COLOR_RED = 1;
global.COLOR_PURPLE = 2;
global.COLOR_BLUE = 3;
global.COLOR_CYAN = 4;
global.COLOR_GREEN = 5;
global.COLOR_YELLOW = 6;
global.COLOR_ORANGE = 7;
global.COLOR_BROWN = 8;
global.COLOR_GREY = 9;
global.COLOR_WHITE = 10;

global.CREEP_SPAWN_TIME = 3;
global.CREEP_LIFE_TIME = 1500;
global.CREEP_CLAIM_LIFE_TIME = 500;
global.CREEP_CORPSE_RATE = 0.2;

global.OBSTACLE_OBJECT_TYPES = [
  "spawn",
  "creep",
  "wall",
  "source",
  "constructedWall",
  "extension",
  "link",
  "storage",
  "tower",
  "observer",
  "powerSpawn",
  "powerBank",
  "lab",
  "terminal",
  "nuker"
];

global.ENERGY_REGEN_TIME = 300;
global.ENERGY_DECAY = 1000;

global.REPAIR_COST = 0.01;

global.RAMPART_DECAY_AMOUNT = 300;
global.RAMPART_DECAY_TIME = 100;
global.RAMPART_HITS = 1;
global.RAMPART_HITS_MAX = {
    2: 300000,
    3: 1000000,
    4: 3000000,
    5: 10000000,
    6: 30000000,
    7: 100000000,
    8: 300000000
};

global.SPAWN_HITS = 5000;
global.SPAWN_ENERGY_START = 300;
global.SPAWN_ENERGY_CAPACITY = 300;

global.SOURCE_ENERGY_CAPACITY = 3000;
global.SOURCE_ENERGY_NEUTRAL_CAPACITY = 1500;
global.SOURCE_ENERGY_KEEPER_CAPACITY = 4000;

global.WALL_HITS = 1;
global.WALL_HITS_MAX = 300000000;

global.EXTENSION_HITS = 1000;
global.EXTENSION_ENERGY_CAPACITY = {
    0: 50,
    1: 50,
    2: 50,
    3: 50,
    4: 50,
    5: 50,
    6: 50,
    7: 100,
    8: 200
};

global.ROAD_HITS = 5000;
global.ROAD_WEAROUT = 1;
global.ROAD_DECAY_AMOUNT = 100;
global.ROAD_DECAY_TIME = 1000;

global.LINK_HITS = 1000;
global.LINK_HITS_MAX = 1000;
global.LINK_CAPACITY = 800;
global.LINK_COOLDOWN = 1;
global.LINK_LOSS_RATIO = 0.03;

global.STORAGE_CAPACITY = 1000000;
global.STORAGE_HITS = 10000;

global.CARRY_CAPACITY = 50;
global.HARVEST_POWER = 2;
global.HARVEST_MINERAL_POWER = 1;
global.REPAIR_POWER = 100;
global.DISMANTLE_POWER = 50;
global.BUILD_POWER = 5;
global.ATTACK_POWER = 30;
global.UPGRADE_CONTROLLER_POWER = 1;
global.RANGED_ATTACK_POWER = 10;
global.HEAL_POWER = 12;
global.RANGED_HEAL_POWER = 4;
global.DISMANTLE_COST = 0.005;

global.MOVE = "move";
global.WORK = "work";
global.CARRY = "carry";
global.ATTACK = "attack";
global.RANGED_ATTACK = "ranged_attack";
global.TOUGH = "tough";
global.HEAL = "heal";
global.CLAIM = "claim";

global.CONSTRUCTION_COST_ROAD_SWAMP_RATIO = 5;

global.STRUCTURE_EXTENSION = "extension";
global.STRUCTURE_RAMPART = "rampart";
global.STRUCTURE_ROAD = "road";
global.STRUCTURE_SPAWN = "spawn";
global.STRUCTURE_LINK = "link";
global.STRUCTURE_WALL = "constructedWall";
global.STRUCTURE_KEEPER_LAIR = "keeperLair";
global.STRUCTURE_CONTROLLER = "controller";
global.STRUCTURE_STORAGE = "storage";
global.STRUCTURE_TOWER = "tower";
global.STRUCTURE_OBSERVER = "observer";
global.STRUCTURE_POWER_BANK = "powerBank";
global.STRUCTURE_POWER_SPAWN = "powerSpawn";
global.STRUCTURE_EXTRACTOR = "extractor";
global.STRUCTURE_LAB = "lab";
global.STRUCTURE_TERMINAL = "terminal";
global.STRUCTURE_CONTAINER = "container";
global.STRUCTURE_NUKER = "nuker";
global.STRUCTURE_PORTAL = "portal";

global.RESOURCE_ENERGY = "energy";
global.RESOURCE_POWER = "power";
global.RESOURCE_UTRIUM = "U";
global.RESOURCE_LEMERGIUM = "L";
global.RESOURCE_KEANIUM = "K";
global.RESOURCE_GHODIUM = "G";
global.RESOURCE_ZYNTHIUM = "Z";
global.RESOURCE_OXYGEN = "O";
global.RESOURCE_HYDROGEN = "H";
global.RESOURCE_CATALYST = "X";
global.RESOURCE_HYDROXIDE = "OH";
global.RESOURCE_ZYNTHIUM_KEANITE = "ZK";
global.RESOURCE_UTRIUM_LEMERGITE = "UL";
global.RESOURCE_UTRIUM_HYDRIDE = "UH";
global.RESOURCE_UTRIUM_OXIDE = "UO";
global.RESOURCE_KEANIUM_HYDRIDE = "KH";
global.RESOURCE_KEANIUM_OXIDE = "KO";
global.RESOURCE_LEMERGIUM_HYDRIDE = "LH";
global.RESOURCE_LEMERGIUM_OXIDE = "LO";
global.RESOURCE_ZYNTHIUM_HYDRIDE = "ZH";
global.RESOURCE_ZYNTHIUM_OXIDE = "ZO";
global.RESOURCE_GHODIUM_HYDRIDE = "GH";
global.RESOURCE_GHODIUM_OXIDE = "GO";
global.RESOURCE_UTRIUM_ACID = "UH2O";
global.RESOURCE_UTRIUM_ALKALIDE = "UHO2";
global.RESOURCE_KEANIUM_ACID = "KH2O";
global.RESOURCE_KEANIUM_ALKALIDE = "KHO2";
global.RESOURCE_LEMERGIUM_ACID = "LH2O";
global.RESOURCE_LEMERGIUM_ALKALIDE = "LHO2";
global.RESOURCE_ZYNTHIUM_ACID = "ZH2O";
global.RESOURCE_ZYNTHIUM_ALKALIDE = "ZHO2";
global.RESOURCE_GHODIUM_ACID = "GH2O";
global.RESOURCE_GHODIUM_ALKALIDE = "GHO2";
global.RESOURCE_CATALYZED_UTRIUM_ACID = "XUH2O";
global.RESOURCE_CATALYZED_UTRIUM_ALKALIDE = "XUHO2";
global.RESOURCE_CATALYZED_KEANIUM_ACID = "XKH2O";
global.RESOURCE_CATALYZED_KEANIUM_ALKALIDE = "XKHO2";
global.RESOURCE_CATALYZED_LEMERGIUM_ACID = "XLH2O";
global.RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE = "XLHO2";
global.RESOURCE_CATALYZED_ZYNTHIUM_ACID = "XZH2O";
global.RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE = "XZHO2";
global.RESOURCE_CATALYZED_GHODIUM_ACID = "XGH2O";
global.RESOURCE_CATALYZED_GHODIUM_ALKALIDE = "XGHO2";

global.SUBSCRIPTION_TOKEN = "token";

global.CONTROLLER_CLAIM_DOWNGRADE = {};
global.CONTROLLER_RESERVE = {};
global.CONTROLLER_RESERVE_MAX = {};
global.CONTROLLER_MAX_UPGRADE_PER_TICK = {};
global.CONTROLLER_ATTACK_BLOCKED_UPGRADE = {};

global.TOWER_HITS = {};
global.TOWER_CAPACITY = {};
global.TOWER_ENERGY_COST = {};
global.TOWER_POWER_ATTACK = {};
global.TOWER_POWER_HEAL = {};
global.TOWER_POWER_REPAIR = {};
global.TOWER_OPTIMAL_RANGE = {};
global.TOWER_FALLOFF_RANGE = {};
global.TOWER_FALLOFF = {};

global.OBSERVER_HITS = {};
global.OBSERVER_RANGE = {};

global.POWER_BANK_HITS = {};
global.POWER_BANK_CAPACITY_MAX = {};
global.POWER_BANK_CAPACITY_MIN = {};
global.POWER_BANK_CAPACITY_CRIT = {};
global.POWER_BANK_DECAY = {};
global.POWER_BANK_HIT_BACK = {};

global.POWER_SPAWN_HITS = {};
global.POWER_SPAWN_ENERGY_CAPACITY = {};
global.POWER_SPAWN_POWER_CAPACITY = {};
global.POWER_SPAWN_ENERGY_RATIO = {};

global.EXTRACTOR_HITS = {};
global.EXTRACTOR_COOLDOWN = {};

global.LAB_HITS = {};
global.LAB_MINERAL_CAPACITY = {};
global.LAB_ENERGY_CAPACITY = {};
global.LAB_BOOST_ENERGY = {};
global.LAB_BOOST_MINERAL = {};
global.LAB_COOLDOWN = {};
global.LAB_REACTION_AMOUNT = {};

global.GCL_POW = {};
global.GCL_MULTIPLY = {};
global.GCL_NOVICE = {};

global.MODE_SIMULATION = "simulation";
global.MODE_SURVIVAL = "survival";
global.MODE_WORLD = "world";
global.MODE_ARENA = "arena";

global.TERRAIN_MASK_WALL = {};
global.TERRAIN_MASK_SWAMP = {};
global.TERRAIN_MASK_LAVA = {};

global.MAX_CONSTRUCTION_SITES = {};
global.MAX_CREEP_SIZE = {};

global.MINERAL_REGEN_TIME = {};
global.MINERAL_RANDOM_FACTOR = {};

global.MINERAL_DENSITY_CHANGE = {};

global.DENSITY_LOW = {};
global.DENSITY_MODERATE = {};
global.DENSITY_HIGH = {};
global.DENSITY_ULTRA = {};

global.TERMINAL_CAPACITY = {};
global.TERMINAL_COOLDOWN = {};
global.TERMINAL_HITS = {};
global.TERMINAL_SEND_COST = {};
global.TERMINAL_MIN_SEND = {};

global.CONTAINER_HITS = {};
global.CONTAINER_CAPACITY = {};
global.CONTAINER_DECAY = {};
global.CONTAINER_DECAY_TIME = {};
global.CONTAINER_DECAY_TIME_OWNED = {};

global.NUKER_HITS = {};
global.NUKER_COOLDOWN = {};
global.NUKER_ENERGY_CAPACITY = {};
global.NUKER_GHODIUM_CAPACITY = {};
global.NUKE_LAND_TIME = {};
global.NUKE_RANGE = {};

global.LOOK_CREEPS = "creep";
global.LOOK_ENERGY = "energy";
global.LOOK_RESOURCES = "resource";
global.LOOK_SOURCES = "source";
global.LOOK_MINERALS = "mineral";
global.LOOK_STRUCTURES = "structure";
global.LOOK_FLAGS = "flag";
global.LOOK_CONSTRUCTION_SITES = "constructionSite";
global.LOOK_NUKES = "nuke";
global.LOOK_TERRAIN = "terrain";
global.LOOK_TOMBSTONES = 'tombstone';

global.ORDER_SELL = "sell";
global.ORDER_BUY = "buy";

global.SYSTEM_USERNAME = "me";

global.TOMBSTONE_DECAY_PER_PART = 5;

module.exports = {
    init() {
        window.Memory = {
            creeps: {},
            rooms: {},
            spawns: {},
            flags: {}
        };

        window.Game = {
            creeps: [],
            rooms: {},
            spawns: {}
        }
    }
}