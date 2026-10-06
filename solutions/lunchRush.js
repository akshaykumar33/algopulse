const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
let idx = 0;
const n = parseInt(input[idx++]);
const k = parseInt(input[idx++]);
let ans = -2000000000;
for (let i = 0; i < n; i++) {
    const f = parseInt(input[idx++]);
    const t = parseInt(input[idx++]);
    let joy = f;
    if (t > k) {
        joy -= (t - k);
    }
    if (joy > ans) {
        ans = joy;
    }
}
process.stdout.write(ans.toString() + '\n');
