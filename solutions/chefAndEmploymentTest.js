const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8');
    const tokens = input.trim().split(/\s+/);
    if (tokens.length === 0 || tokens[0] === '') return;
    
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const k = parseInt(tokens[ptr++], 10);
        const arr = [];
        for (let j = 0; j < n; j++) {
            arr.push(parseInt(tokens[ptr++], 10));
        }
        arr.sort((a, b) => a - b);
        out.push(arr[Math.floor((n + k - 1) / 2)]);
    }
    
    console.log(out.join('\n'));
}

solve();
