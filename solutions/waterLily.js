const fs = require('fs');
function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (input.length < 2 || input[0] === '') return;
    const h = parseFloat(input[0]);
    const l = parseFloat(input[1]);
    const ans = (l * l - h * h) / (2 * h);
    console.log(ans.toFixed(13));
}
solve();
