const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (input.length < 3 || input[0] === '') return;
    const n = Number(input[0]);
    const m = Number(input[1]);
    const a = Number(input[2]);
    
    const ans = Math.ceil(n / a) * Math.ceil(m / a);
    console.log(ans);
}

solve();
