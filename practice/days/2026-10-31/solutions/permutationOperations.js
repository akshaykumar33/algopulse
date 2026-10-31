const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
let ptr = 0;

const readInt = () => parseInt(tokens[ptr++], 10);

const out = [];

const solve = () => {
    const n = readInt();
    const a = new Array(n);
    for (let i = 0; i < n; i++) {
        a[i] = readInt();
    }

    const p = new Array(n);
    const ops = new Array(n);

    for (let i = 0; i < n; i++) {
        p[i] = n - i;
    }

    for (let i = 0; i < n; i++) {
        ops[i] = n - i;
    }

    out.push(p.join(' '));
    out.push(ops.join(' '));
};

const t = readInt();
for (let i = 0; i < t; i++) {
    solve();
}

console.log(out.join('\n'));
