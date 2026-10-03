const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length === 0 || input[0] === '') return;
    
    let lineIdx = 0;
    const t = parseInt(input[lineIdx++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        if (lineIdx >= input.length) break;
        const [n, m] = input[lineIdx++].split(' ').map(Number);
        let ans = n + m;
        out.push(ans);
    }
    
    console.log(out.join('\n'));
}

solve();
