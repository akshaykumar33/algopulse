const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const colors = [];
        for (let j = 0; j < 6; j++) {
            colors.push(tokens[ptr++]);
        }
        
        const front = colors[0];
        const back = colors[1];
        const left = colors[2];
        const right = colors[3];
        const top = colors[4];
        const bottom = colors[5];
        
        let found = false;
        if ((front === left && left === top) ||
            (front === left && left === bottom) ||
            (front === right && right === top) ||
            (front === right && right === bottom) ||
            (back === left && left === top) ||
            (back === left && left === bottom) ||
            (back === right && right === top) ||
            (back === right && right === bottom)) {
            found = true;
        }
        
        if (found) {
            out.push('YES');
        } else {
            out.push('NO');
        }
    }
    
    console.log(out.join('\n'));
}

solve();
