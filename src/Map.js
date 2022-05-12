// const got = require('got');
const axios = require('axios');

async function GetMap() {
    const response = await axios.get('/map');
    // const inputData = await got('/map');
    const inputData = response.data;
    
    let ROOM_REGEX = String.raw`R\ \{\ *(?<vnum>.*)\}\ *`;
    ROOM_REGEX += String.raw`\{\ *(?<flags>.*)\}\ *`;
    ROOM_REGEX += String.raw`\{\ *(?<color>.*)\}\ *`;
    ROOM_REGEX += String.raw`\{\ *(?<name>.*)\}\ *`;
    ROOM_REGEX += String.raw`\{\ *(?<symbol>.*)\}\ *`;
    ROOM_REGEX += String.raw`\{\ *(?<desc>.*)\}\ *`;
    ROOM_REGEX += String.raw`\{\ *(?<area>.*)\}\ *`;
    ROOM_REGEX += String.raw`\{\ *(?<note>.*)\}\ *`;
    ROOM_REGEX += String.raw`\{\ *(?<terrain>.*)\}\ *`;
    ROOM_REGEX += String.raw`\{\ *(?<data>.*)\}\ *`;
    ROOM_REGEX += String.raw`\{\ *(?<weight>.*)\}\ *`;
    ROOM_REGEX += String.raw`\{\ *(?<id>.*)\}\ *`;
    
    let EXIT_REGEX = String.raw`E\ {\ *(?<vnum>.*)\}\ *`;
    EXIT_REGEX += String.raw`\{\ *(?<name>.*)\}\ *`;
    EXIT_REGEX += String.raw`\{\ *(?<cmd>.*)\}\ *`;
    EXIT_REGEX += String.raw`\{\ *(?<dir>.*)\}\ *`;
    EXIT_REGEX += String.raw`\{\ *(?<flags>.*)\}\ *`;
    EXIT_REGEX += String.raw`\{\ *(?<data>.*)\}\ *`;
    EXIT_REGEX += String.raw`\{\ *(?<weight>.*)\}\ *`;
    EXIT_REGEX += String.raw`\{\ *(?<color>.*)\}\ *`;
    EXIT_REGEX += String.raw`\{\ *(?<delay>.*)\}\ *`;
    
    
    console.log(EXIT_REGEX);
    let rooms = {};
    let last_room = null;
    
    inputData.split("\n").forEach((line) => {
        let m = line.match(ROOM_REGEX);
        if(m) {
            rooms[m.groups.vnum] = m.groups;
            rooms[m.groups.vnum].exits = [];
            last_room = rooms[m.groups.vnum];
        }
    
        m = line.match(EXIT_REGEX);
        if(m) {
             last_room.exits.push(m.groups)
        }
    })
    return rooms    
}

export {GetMap};