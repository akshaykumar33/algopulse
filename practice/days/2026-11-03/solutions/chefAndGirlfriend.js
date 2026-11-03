const fs = require('fs');
function toMin(s) {
    const p = s.split(':');
    return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
}
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const t1 = toMin(tokens[ptr++]);
        const t2 = toMin(tokens[ptr++]);
        const dist = parseFloat(tokens[ptr++]);
        const diff = t1 - t2;
        const plan1 = diff + dist;
        const plan2 = Math.max(diff * 1.0, dist + diff / 2.0);
        out.push(`${plan1.toFixed(1)} ${plan2.toFixed(1)}`);
    }
    console.log(out.join('\n'));
}
solve();
