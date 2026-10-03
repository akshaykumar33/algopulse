const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(lines[ptr++], 10);
        const arr = lines[ptr++].split(/\s+/).map(Number);
        
        let l = 0;
        let r = n - 1;
        while (l < n && arr[l] === 0) l++;
        while (r >= 0 && arr[r] === 0) r--;
        
        if (l > r) {
            out.push(0);
            continue;
        }
        
        let hasZero = false;
        for (let j = l; j <= r; j++) {
            if (arr[j] === 0) {
                hasZero = true;
                break;
            }
        }
        
        if (hasZero) {
            out.push(2);
        } else {
            out.push(1);
        }
    }
    console.log(out.join('\n'));
}

solve();
