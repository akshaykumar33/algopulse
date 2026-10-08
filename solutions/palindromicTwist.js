const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
const t = parseInt(input[0], 10);
let idx = 1;
const out = [];
for (let i = 0; i < t; i++) {
    const n = parseInt(input[idx++], 10);
    const s = input[idx++];
    let ok = true;
    for (let j = 0; j < n / 2; j++) {
        const d = Math.abs(s.charCodeAt(j) - s.charCodeAt(n - 1 - j));
        if (d !== 0 && d !== 2) {
            ok = false;
            break;
        }
    }
    out.push(ok ? "YES" : "NO");
}
console.log(out.join('\n'));
