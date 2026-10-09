const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0]);
    let idx = 1;
    const out = [];
    for (let i = 0; i < t; i++) {
        if (idx >= lines.length) break;
        const s = lines[idx++];
        const freq = {};
        for (let j = 0; j < s.length; j++) {
            const ch = s[j];
            freq[ch] = (freq[ch] || 0) + 1;
        }
        let ok = true;
        const pairs = [['A', 'a'], ['B', 'b'], ['C', 'c'], ['D', 'd']];
        for (const [u, l] of pairs) {
            if ((freq[u] || 0) !== (freq[l] || 0)) {
                ok = false;
                break;
            }
        }
        out.push(ok ? "YES" : "NO");
    }
    console.log(out.join('\n'));
}

solve();
