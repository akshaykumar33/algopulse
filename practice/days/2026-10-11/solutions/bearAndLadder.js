const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0], 10);
    const res = [];
    for (let i = 1; i <= t; i++) {
        const nums = lines[i].split(/\s+/).map(Number);
        const a = nums[0];
        const b = nums[1];
        const d = Math.abs(a - b);
        const m = Math.min(a, b);
        if (d === 2 || (d === 1 && m % 2 === 1)) {
            res.push("YES");
        } else {
            res.push("NO");
        }
    }
    console.log(res.join('\n'));
}

solve();
