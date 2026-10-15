const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
let ptr = 0;
const t = parseInt(lines[ptr++]);
const res = [];
for (let i = 0; i < t; i++) {
    const n = parseInt(lines[ptr++]);
    const a = lines[ptr++];
    const b = lines[ptr++];
    let bal = 0;
    for (let j = 0; j < n; j++) {
        if (a[j] === '1') bal++;
        if (b[j] === '1') bal--;
    }
    res.push(bal === 0 ? 'YES' : 'NO');
}
console.log(res.join('\n'));
