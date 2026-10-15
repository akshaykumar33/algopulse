const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
let idx = 0;
const t = parseInt(input[idx++]);
const out = [];
for (let i = 0; i < t; i++) {
    const n = parseInt(input[idx++]);
    const s = input[idx++];
    let cnt = 0;
    for (let j = 0; j < n; j++) {
        if (s[j] === '1') cnt++;
    }
    if (n % 2 !== 0 || cnt % 2 === 0) {
        out.push('YES');
    } else {
        out.push('NO');
    }
}
process.stdout.write(out.join('\n') + '\n');
