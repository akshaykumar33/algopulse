const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
const s = lines[0];
let cnt = 0;
const n = s.length;
for (let i = 0; i < Math.floor(n / 2); i++) {
    if (s[i] !== s[n - 1 - i]) {
        cnt++;
    }
}
let ans = "NO";
if (cnt === 1) {
    ans = "YES";
} else if (cnt === 0 && n % 2 === 1) {
    ans = "YES";
}
console.log(ans);
