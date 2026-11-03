const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    
    let supCnt = 0;
    let vilCnt = 0;
    const out = [];
    
    for (let i = 0; i < n; i++) {
        const name = tokens[ptr++];
        const len = name.length;
        let isSup = false;
        if (len >= 3 && name.slice(len - 3) === 'man') {
            isSup = true;
        } else if (len >= 6 && name.slice(len - 6) === 'woman') {
            isSup = true;
        } else if (len >= 4 && name.slice(len - 4) === 'girl') {
            isSup = true;
        }
        
        if (isSup) {
            supCnt++;
        } else {
            vilCnt++;
        }
        
        if (supCnt >= vilCnt + 2) {
            out.push('SUPERHERO');
            for (let j = i + 1; j < n; j++) ptr++;
            break;
        } else if (vilCnt >= supCnt + 3) {
            out.push('VILLAIN');
            for (let j = i + 1; j < n; j++) ptr++;
            break;
        } else {
            if (i === n - 1) {
                out.push('DRAW');
            }
        }
    }
    
    console.log(out.join('\n'));
}

solve();
