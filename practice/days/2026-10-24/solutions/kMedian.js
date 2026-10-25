const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (!lines.length || lines[0] === '') return;
    
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const [n, k] = lines[ptr++].split(/\s+/).map(Number);
        let arr = lines[ptr++].split(/\s+/).map(Number);
        arr.sort((a, b) => a - b);
        out.push(arr[Math.floor((n - k) / 2)]);
    }
    
    console.log(out.join('\n'));
}

solve();
