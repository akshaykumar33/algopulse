const fs = require('fs');

function gcd(a, b) {
    while (b > 0) {
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
}

function main() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const parts = lines[i].split(/\s+/);
        const x = parseInt(parts[0], 10);
        const y = parseInt(parts[1], 10);
        out.push(gcd(x, y) * 2);
    }
    console.log(out.join('\n'));
}

main();
