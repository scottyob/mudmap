
function ProcessMap(mapFile, playerData) {
    // Parses a Tintin++ like map

    // Returns an object in the format of:
    // {
    //     map: {
    //         1: {
    //             vnum: "1",
    //             flags: "abc".at.apply.
    //         }
    //     },
    //     players: {
    //         "scott": "1"
    //     }
    // }

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
    
    // Build a map of Room IDs to their players
    let roomPlayers = {};
    Object.keys(playerData).forEach(player => {
        const room = playerData[player];
        roomPlayers[room] = roomPlayers[room] ?? [];
        roomPlayers[room].push(player);
    });
    
    // Build the rooms objects
    let rooms = {};
    let players = {};
    let last_room = null;
    mapFile.split("\n").forEach((line) => {
        let m = line.match(ROOM_REGEX);
        if(m) {
            // Build a new room
            const vnum = m.groups.vnum;
            rooms[vnum] = m.groups;
            rooms[vnum].exits = [];
            last_room = rooms[vnum];

            // If there are players at this room, add them
            rooms[vnum].players = [];
            if(m.groups.id in roomPlayers) {
                // Set players attribute on object
                const playersInRoom = roomPlayers[m.groups.id];
                rooms[vnum].players = playersInRoom;
                // Update every player in this room to belong to this room ID
                playersInRoom.forEach(p => {
                    players[p] = vnum;
                });
            }
        }
    
        // Build exits found for the room
        m = line.match(EXIT_REGEX);
        if(m) {
             last_room.exits.push(m.groups)
        }
    })

    return {
        "map": rooms,
        "players": players
    };    
}

export {ProcessMap};