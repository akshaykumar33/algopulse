const fs = require('fs');
const inp = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);

function solve() {
    const n = parseInt(inp[0]);
    const s = inp[1];
    const out = [];

    for (let i = 0; i < n - 1; i++) {
        if (s[i] !== s[i+1]) {
            out.push("YES");
            out.push(s[i] + s[i+1]);
            return out.join('\n');
        }
    }

    out.push("NO");
    return out.join('\n');
}

console.log(solve());
