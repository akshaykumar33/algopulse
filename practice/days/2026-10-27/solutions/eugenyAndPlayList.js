const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const endTimes = new Array(n);
    let cur = 0;
    for (let i = 0; i < n; i++) {
        const c = parseInt(tokens[ptr++], 10);
        const t = parseInt(tokens[ptr++], 10);
        cur += c * t;
        endTimes[i] = cur;
    }
    const out = [];
    let songIdx = 0;
    for (let i = 0; i < m; i++) {
        const mom = parseInt(tokens[ptr++], 10);
        while (songIdx < n && endTimes[songIdx] < mom) {
            songIdx++;
        }
        out.push(songIdx + 1);
    }
    console.log(out.join('\n'));
}
solve();
