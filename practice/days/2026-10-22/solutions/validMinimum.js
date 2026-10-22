const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0], 10);
    const ans = [];
    for (let i = 1; i <= t; i++) {
        const parts = lines[i].trim().split(/\s+/).map(Number);
        const a = parts[0];
        const b = parts[1];
        const c = parts[2];
        if (a === b || b === c || c === a) {
            ans.push("YES");
        } else {
            ans.push("NO");
        }
    }
    console.log(ans.join('\n'));
}

solve();
