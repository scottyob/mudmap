
function GetMap() {

    const inputData = `
    R {    1} {0} {} {Shadgard, Gatehouse} {🚪} {} {} {} {} {} {1.000} {c413dc79-b833-4bc9-ba1c-67ea97e33638}
    E {    2} {s} {s} {4} {0} {} {1.000} {} {0.00}
    E {    7} {go gate} {go gate} {0} {0} {} {1.000} {} {0.00}
    
    R {    2} {0} {} {Shadgard, Main Street} { } {} {} {} {} {} {1.000} {1ded4acf-84af-443a-9d90-30582a199bc1}
    E {    1} {n} {n} {1} {0} {} {1.000} {} {0.00}
    E {    3} {e} {e} {2} {0} {} {1.000} {} {0.00}
    E {    4} {s} {s} {4} {0} {} {1.000} {} {0.00}
    
    R {    3} {0} {} {Shadgard, North Wall} { } {} {} {} {} {} {1.000} {dc32c0f0-a53e-409e-a592-807a9665eac5}
    E {    2} {w} {w} {8} {0} {} {1.000} {} {0.00}
    E {   16} {se} {se} {6} {0} {} {1.000} {} {0.00}
    
    R {    4} {0} {} {Shadgard, Main Street} {🏨} {} {} {} {} {} {1.000} {9a1a5df0-78ec-4609-91de-6e905ed12524}
    E {    2} {n} {n} {1} {0} {} {1.000} {} {0.00}
    E {    5} {w} {w} {8} {0} {} {1.000} {} {0.00}
    E {   19} {s} {s} {4} {0} {} {1.000} {} {0.00}
    
    R {    5} {0} {} {Shadgard, Bankers Square} {🏦} {} {} {} {} {} {1.000} {3fff4fb7-4df1-42bd-b3a2-010c5b6eb899}
    E {    4} {e} {e} {2} {0} {} {1.000} {} {0.00}
    E {    6} {s} {s} {4} {0} {} {1.000} {} {0.00}
    
    R {    6} {0} {} {Shadgard, West Row} { } {} {} {} {} {} {1.000} {83079df9-c50e-4664-8ef3-157a94982ff0}
    E {    5} {n} {n} {1} {0} {} {1.000} {} {0.00}
    E {   19} {e} {e} {2} {0} {} {1.000} {} {0.00}
    E {   20} {se} {se} {6} {0} {} {1.000} {} {0.00}
    
    R {    7} {0} {} {} { } {} {} {} {} {} {1.000} {a52ab032-7b16-4baf-bb66-6bfc7213644d}
    E {    1} {go gate} {go gate} {0} {0} {} {1.000} {} {0.00}
    E {    8} {n} {n} {1} {0} {} {1.000} {} {0.00}
    
    R {    8} {0} {} {} { } {} {} {} {} {} {1.000} {d50b6782-614e-4841-8f72-7dfcf63f4fc7}
    E {    7} {s} {s} {4} {0} {} {1.000} {} {0.00}
    E {    9} {nw} {nw} {9} {0} {} {1.000} {} {0.00}
    
    R {    9} {0} {} {} { } {} {} {} {} {} {1.000} {fb00e915-1912-46be-bd50-f5e2f134de95}
    E {    8} {se} {se} {6} {0} {} {1.000} {} {0.00}
    E {   10} {e} {e} {2} {0} {} {1.000} {} {0.00}
    
    R {   10} {0} {} {} { } {} {} {} {} {} {1.000} {8163b236-fa8b-46fb-8183-86fecb777ed0}
    E {    9} {w} {w} {8} {0} {} {1.000} {} {0.00}
    E {   11} {ne} {ne} {3} {0} {} {1.000} {} {0.00}
    
    R {   11} {0} {} {} { } {} {} {} {} {} {1.000} {df6b5d6d-5e39-4fc3-baff-a3bf3d90c58e}
    E {   10} {sw} {sw} {12} {0} {} {1.000} {} {0.00}
    E {   12} {n} {n} {1} {0} {} {1.000} {} {0.00}
    
    R {   12} {0} {} {} { } {} {} {} {} {} {1.000} {4e621702-ab8c-46cc-9903-779ee9c111bf}
    E {   11} {s} {s} {4} {0} {} {1.000} {} {0.00}
    E {   13} {n} {n} {1} {0} {} {1.000} {} {0.00}
    
    R {   13} {0} {} {} { } {} {} {} {} {} {1.000} {4f0e6d06-f1fd-4afb-b8ae-bdc8b4ebf95e}
    E {   12} {s} {s} {4} {0} {} {1.000} {} {0.00}
    E {   14} {nw} {nw} {9} {0} {} {1.000} {} {0.00}
    
    R {   14} {0} {} {} { } {} {} {} {} {} {1.000} {c908485f-ec9f-4d8c-a844-698799c2e840}
    E {   13} {se} {se} {6} {0} {} {1.000} {} {0.00}
    E {   15} {n} {n} {1} {0} {} {1.000} {} {0.00}
    
    R {   15} {0} {} {} { } {} {} {} {} {} {1.000} {60ed5cfb-9802-4152-ad66-ecc78592ef37}
    E {   14} {s} {s} {4} {0} {} {1.000} {} {0.00}
    
    R {   16} {0} {} {Shadgard, Brewery Row} { } {} {} {} {} {} {1.000} {c2f39173-aedb-42ca-9cb1-89c930c2af2a}
    E {    3} {nw} {nw} {9} {0} {} {1.000} {} {0.00}
    E {   17} {e} {e} {2} {0} {} {1.000} {} {0.00}
    E {   18} {sw} {sw} {12} {0} {} {1.000} {} {0.00}
    
    R {   17} {0} {} {Shadgard, Brewery Row} { } {} {} {} {} {} {1.000} {25db8bc8-38db-490b-a511-80fd77881a6b}
    E {   16} {w} {w} {8} {0} {} {1.000} {} {0.00}
    
    R {   18} {0} {} {Shadgard, Market Street} { } {} {} {} {} {} {1.000} {68626f0d-2add-4964-9066-61a331deb132}
    E {   16} {ne} {ne} {3} {0} {} {1.000} {} {0.00}
    E {   19} {w} {w} {8} {0} {} {1.000} {} {0.00}
    
    R {   19} {0} {} {Shadgard, Town Commons} { } {} {} {} {} {} {1.000} {7af16a16-2db7-47dc-a38e-8eba8f95c383}
    E {   18} {e} {e} {2} {0} {} {1.000} {} {0.00}
    E {    4} {n} {n} {1} {0} {} {1.000} {} {0.00}
    E {    6} {w} {w} {8} {0} {} {1.000} {} {0.00}
    E {   20} {s} {s} {4} {0} {} {1.000} {} {0.00}
    
    R {   20} {0} {} {Shadgard, Old South Road} { } {} {} {} {} {} {1.000} {2b02ce7a-0156-45f4-b3e9-75cec72ec8ed}
    E {   19} {n} {n} {1} {0} {} {1.000} {} {0.00}
    E {    6} {nw} {nw} {9} {0} {} {1.000} {} {0.00}
    E {   22} {s} {s} {4} {0} {} {1.000} {} {0.00}
    
    R {   21} {0} {} {Shadgard, Old South Road} { } {} {} {} {} {} {1.000} {73c96e2f-bc1c-47ab-9cf0-5b3ddc1bb0c0}
    E {   22} {n} {n} {1} {0} {} {1.000} {} {0.00}
    
    R {   22} {4104} {} {} { } {} {} {} {} {} {1.000} {}
    E {   21} {s} {s} {4} {0} {} {1.000} {} {0.00}
    E {   20} {n} {n} {1} {0} {} {1.000} {} {0.00}
    `;
    
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