const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length === 0 || input[0] === '') return;
    
    let t = parseInt(input[0], 10);
    let out = [];
    
    for (let i = 1; i <= t; i++) {
        if (!input[i]) break;
        let [x, m, d] = input[i].trim().split(/\s+/).map(Number);
        let ans = Math.min(x * d, m);
        out.push(ans);
    }
    
    console.log(out.join('\n'));
}

solve();
