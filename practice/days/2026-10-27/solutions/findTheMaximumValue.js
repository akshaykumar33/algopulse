const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8');
    const lines = input.split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    let ptr = 0;
    const t = parseInt(lines[ptr++].trim(), 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        if (ptr >= lines.length) break;
        const line = lines[ptr++].trim();
        if (line === '') {
            i--;
            continue;
        }
        const nums = line.split(/\s+/).map(Number);
        const n = nums.length;
        
        let maxVal = -1;
        let count = 0;
        let found = false;
        
        for (let j = 0; j < n; j++) {
            if (nums[j] === n - 1 && !found) {
                found = true;
            } else {
                if (nums[j] > maxVal) {
                    maxVal = nums[j];
                }
            }
        }
        
        out.push(maxVal);
    }
    
    console.log(out.join('\n'));
}

solve();
