const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;

    let t = parseInt(lines[0], 10);
    let lineIdx = 1;
    let out = [];

    while (t-- > 0) {
        let [n, x] = lines[lineIdx++].split(' ').map(Number);
        let a = lines[lineIdx++].split(' ').map(Number);

        let currentSum = a.reduce((acc, val) => acc + val, 0);
        let requiredSum = n * x;
        let needed = requiredSum - currentSum;

        out.push(Math.max(0, needed));
    }

    console.log(out.join('\n'));
}

solve();
