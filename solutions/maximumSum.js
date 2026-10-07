const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (!lines || lines.length === 0 || lines[0] === '') return;
    
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(lines[ptr++], 10);
        const arr = lines[ptr++].trim().split(/\s+/).map(Number);
        
        let sum = 0;
        let cnt = 0;
        let minVal = Infinity;
        
        for (let j = 0; j < n; j++) {
            const val = arr[j];
            const cur = Math.abs(val);
            sum += cur;
            if (val < 0) cnt++;
            if (cur < minVal) minVal = cur;
        }
        
        if (cnt % 2 !== 0) {
            sum -= 2 * minVal;
        }
        
        out.push(sum);
    }
    
    console.log(out.join('\n'));
}

solve();
