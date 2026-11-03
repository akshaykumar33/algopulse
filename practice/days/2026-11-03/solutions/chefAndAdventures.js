const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const m = parseInt(tokens[ptr++], 10);
        const x = parseInt(tokens[ptr++], 10);
        const y = parseInt(tokens[ptr++], 10);
        
        let possible = false;
        
        if (n >= 1 && m >= 1) {
            const rem1 = (n - 1) % x;
            const rem2 = (m - 1) % y;
            
            if (rem1 === 0 && rem2 === 0) {
                if (n - 1 >= 0 && m - 1 >= 0) {
                    possible = true;
                }
            }
            
            if (!possible) {
                if (n - 1 >= x && m - 1 >= y) {
                    const diff1 = (n - 1) - x;
                    const diff2 = (m - 1) - y;
                    if (diff1 % x === 0 && diff2 % y === 0) {
                        possible = true;
                    }
                }
            }
        } else {
            if (n === 1 && m === 1) {
                possible = true;
            }
        }
        
        if (possible) {
            out.push('Pezzie');
        } else {
            out.push('Chefir');
        }
    }
    
    console.log(out.join('\n'));
}

solve();
