const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
const n = parseInt(input[0]);
const p = new Int32Array(n + 1);
for (let i = 1; i <= n; i++) {
    p[i] = parseInt(input[i]);
}
const dp = new Int32Array(n + 1);
function solve(i) {
    if (p[i] === -1) return 1;
    if (dp[i] !== 0) return dp[i];
    return dp[i] = 1 + solve(p[i]);
}
let ans = 0;
for (let i = 1; i <= n; i++) {
    ans = Math.max(ans, solve(i));
}
console.log(ans);
