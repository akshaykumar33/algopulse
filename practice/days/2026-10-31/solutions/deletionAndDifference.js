const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const freq = new Map();
        for (let j = 0; j < n; j++) {
            const val = parseInt(tokens[ptr++], 10);
            freq.set(val, (freq.get(val) || 0) + 1);
        }
        
        let hasZero = false;
        let uniqueCount = 0;
        
        for (const [val, count] of freq.entries()) {
            if (count >= 2) {
                hasZero = true;
            }
            uniqueCount++;
        }
        
        if (hasZero) {
            out.push(1);
        } else {
            if (uniqueCount === 1) {
                out.push(1);
            } else {
                const keys = Array.from(freq.keys()).sort((a, b) => a - b);
                let canMakeZero = false;
                for (let j = 0; j < keys.length; j++) {
                    for (let k = j + 1; k < keys.length; k++) {
                        if (freq.has(keys[k] - keys[j])) {
                            canMakeZero = true;
                            break;
                        }
                    }
                    if (canMakeZero) break;
                }
                if (canMakeZero) {
                    out.push(1);
                } else {
                    out.push(uniqueCount);
                }
            }
        }
    }
    console.log(out.join('\n'));
}

solve();
