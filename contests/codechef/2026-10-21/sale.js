const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    let line = 0;
    const out = [];

    const t = parseInt(input[line++]);

    for (let i = 0; i < t; i++) {
        const n = parseInt(input[line++]);
        const p = input[line++].split(' ').map(Number);
        const d = input[line++].split(' ').map(Number);

        let totalFinalPrice = 0;
        for (let j = 0; j < n; j++) {
            totalFinalPrice += (p[j] - d[j]);
        }
        out.push(totalFinalPrice);
    }

    console.log(out.join('\n'));
}

solve();
