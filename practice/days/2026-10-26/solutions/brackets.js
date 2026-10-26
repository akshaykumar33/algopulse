const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(Boolean);
    if (lines.length < 1) return;
    const t = parseInt(lines[0].trim(), 10);
    const out = [];

    for (let i = 1; i <= t; i++) {
        const s = lines[i].trim();
        let bal = 0;
        let maxBal = 0;
        for (let j = 0; j < s.length; j++) {
            if (s[j] === '(') bal++;
            else bal--;
            if (bal > maxBal) maxBal = bal;
        }
        out.push('('.repeat(maxBal) + ')'.repeat(maxBal));
    }
    console.log(out.join('\n'));
}

solve();
