const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const home = tokens[ptr++];
    const away = tokens[ptr++];
    const n = parseInt(tokens[ptr++], 10);
    
    const yellow = {
        h: new Array(105).fill(0),
        a: new Array(105).fill(0)
    };
    const redSent = {
        h: new Array(105).fill(false),
        a: new Array(105).fill(false)
    };
    
    const out = [];
    
    for (let i = 0; i < n; i++) {
        const time = parseInt(tokens[ptr++], 10);
        const team = tokens[ptr++];
        const player = parseInt(tokens[ptr++], 10);
        const card = tokens[ptr++].toUpperCase();
        
        const tName = team === 'h' ? home : away;
        const yArr = team === 'h' ? yellow.h : yellow.a;
        const rArr = team === 'h' ? redSent.h : redSent.a;
        
        if (rArr[player]) continue;
        
        if (card === 'Y') {
            yArr[player]++;
            if (yArr[player] >= 2) {
                rArr[player] = true;
                out.push(tName + ' ' + player + ' ' + time);
            }
        } else {
            rArr[player] = true;
            out.push(tName + ' ' + player + ' ' + time);
        }
    }
    
    if (out.length > 0) {
        console.log(out.join('\n'));
    }
}

solve();
