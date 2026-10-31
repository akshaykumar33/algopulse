const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    const n = parseInt(tokens[0], 10);
    const s = tokens[1];
    const arr = s.split('').sort();
    console.log(arr.join(''));
}
solve();
