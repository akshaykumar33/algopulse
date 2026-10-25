const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(lines[ptr++], 10);
        const arr = lines[ptr++].split(' ').map(Number);
        
        const freq = new Map();
        for (let j = 0; j < n; j++) {
            const val = arr[j];
            freq.set(val, (freq.get(val) || 0) + 1);
        }
        
        let maxFreq = 0;
        for (const count of freq.values()) {
            if (count > maxFreq) {
                maxFreq = count;
            }
        }
        
        const maxAllowed = Math.floor((n + 1) / 2);
        if (maxFreq <= maxAllowed) {
            out.push('Yes');
        } else {
            out.push('No');
        }
    }
    
    console.log(out.join('\n'));
}

solve();
