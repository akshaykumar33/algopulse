const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const [n, m] = lines[0].split(/\s+/).map(Number);
    let sumA = 0;
    let sumB = 0;
    const diffs = [];
    for (let i = 1; i <= n; i++) {
        const [a, b] = lines[i].split(/\s+/).map(Number);
        sumA += a;
        sumB += b;
        diffs.push(a - b);
    }
    const out = [];
    if (sumB > m) {
        out.push(-1);
        console.log(out.join('\n'));
        return;
    }
    diffs.sort((x, y) => y - x);
    let cur = sumA;
    let ans = 0;
    for (let i = 0; i < n; i++) {
        if (cur <= m) break;
        cur -= diffs[i];
        ans++;
    }
    out.push(ans);
    console.log(out.join('\n'));
}

solve();
