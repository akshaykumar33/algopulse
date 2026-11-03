const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    const n = parseInt(tokens[0], 10);
    const total = (BigInt(n) * BigInt(n + 1)) / 2n;
    const diff = total % 2n === 0n ? 0 : 1;
    let target = total / 2n;
    const set1 = [];
    for (let i = n; i >= 1; i--) {
        const bi = BigInt(i);
        if (target >= bi) {
            set1.push(i);
            target -= bi;
        }
    }
    console.log(diff);
    console.log(`${set1.length} ${set1.join(' ')}`);
}
solve();
