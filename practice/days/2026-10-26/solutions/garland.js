const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length < 2) return;
    const garland = lines[0].trim();
    const template = lines[1].trim();

    const countG = {};
    for (const char of garland) {
        countG[char] = (countG[char] || 0) + 1;
    }

    const countT = {};
    for (const char of template) {
        countT[char] = (countT[char] || 0) + 1;
    }

    let ans = 0;
    for (const char in countT) {
        if (!countG[char]) {
            console.log(-1);
            return;
        }
        ans += Math.min(countG[char], countT[char]);
    }

    console.log(ans);
}

solve();
