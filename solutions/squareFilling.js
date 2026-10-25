const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (input.length === 0 || input[0] === '') return;
    
    let ptr = 0;
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    
    const a = [];
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < m; j++) {
            row.push(parseInt(input[ptr++], 10));
        }
        a.push(row);
    }
    
    const b = Array.from({ length: n }, () => new Array(m).fill(0));
    const ops = [];
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < m - 1; j++) {
            if (a[i][j] === 1 && a[i+1][j] === 1 && a[i][j+1] === 1 && a[i+1][j+1] === 1) {
                b[i][j] = 1;
                b[i+1][j] = 1;
                b[i][j+1] = 1;
                b[i+1][j+1] = 1;
                ops.push((i + 1) + ' ' + (j + 1));
            }
        }
    }
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (a[i][j] !== b[i][j]) {
                console.log('-1');
                return;
            }
        }
    }
    
    const out = [];
    out.push(ops.length);
    for (let i = 0; i < ops.length; i++) {
        out.push(ops[i]);
    }
    console.log(out.join('\n'));
}

solve();
