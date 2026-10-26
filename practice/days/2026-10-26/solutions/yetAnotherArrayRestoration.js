const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    let t = parseInt(lines[0], 10);
    let lineIdx = 1;
    let out = [];
    
    while (t--) {
        while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
        if (lineIdx >= lines.length) break;
        const parts = lines[lineIdx++].trim().split(/\s+/);
        const n = parseInt(parts[0], 10);
        const x = parseInt(parts[1], 10);
        const y = parseInt(parts[2], 10);
        
        let bestMax = Infinity;
        let bestArr = [];
        
        for (let diff = 1; diff <= y - x; diff++) {
            if ((y - x) % diff !== 0) continue;
            let steps = (y - x) / diff;
            if (n - 1 < steps) continue;
            
            let start = x;
            while (start - diff > 0 && steps < n - 1) {
                start -= diff;
                steps++;
            }
            
            let cur = start;
            let arr = [];
            for (let i = 0; i < n; i++) {
                arr.push(cur);
                cur += diff;
            }
            
            let maxVal = arr[arr.length - 1];
            if (maxVal < bestMax && arr.includes(x) && arr.includes(y)) {
                bestMax = maxVal;
                bestArr = arr;
            }
        }
        
        out.push(bestArr.join(' '));
    }
    
    console.log(out.join('\n'));
}

solve();
