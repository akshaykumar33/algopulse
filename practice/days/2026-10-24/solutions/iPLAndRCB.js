const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    let line = 0;
    const t = Number(input[line++]);
    const out = [];

    for (let i = 0; i < t; i++) {
        const [x, y] = input[line++].split(' ').map(Number);
        const ans = Math.max(0, x - y);
        out.push(ans);
    }

    console.log(out.join('\n'));
}

solve();
