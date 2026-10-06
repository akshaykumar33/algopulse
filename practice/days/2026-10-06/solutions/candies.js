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
        
        const freq = {};
        let possible = true;
        
        for (let j = 0; j < 2 * n; j++) {
            const val = arr[j];
            freq[val] = (freq[val] || 0) + 1;
            if (freq[val] > 2) {
                possible = false;
            }
        }
        
        out.push(possible ? "Yes" : "No");
    }
    
    console.log(out.join('\n'));
}

solve();
