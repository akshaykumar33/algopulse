const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const [k1, k2, k3, v] = lines[i].split(/\s+/).map(Number);
        const speed = k1 * k2 * k3 * v;
        const time = 100 / speed;
        const roundedTime = Math.round(time * 100) / 100;
        if (roundedTime < 9.58) {
            out.push("YES");
        } else {
            out.push("NO");
        }
    }
    console.log(out.join('\n'));
}

solve();
