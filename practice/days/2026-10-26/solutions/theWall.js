const fs = require('fs');

function gcd(a, b) {
    while (b !== 0) {
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (lines.length < 4 || lines[0] === '') return;
    const x = parseInt(lines[0], 10);
    const y = parseInt(lines[1], 10);
    const a = parseInt(lines[2], 10);
    const b = parseInt(lines[3], 10);

    const L = lcm(x, y);
    const ans = Math.floor(b / L) - Math.floor((a - 1) / L);
    console.log(ans);
}

solve();
