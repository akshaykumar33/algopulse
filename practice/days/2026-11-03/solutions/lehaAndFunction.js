const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const m = parseInt(tokens[ptr++], 10);
    const a = [];
    for (let i = 0; i < m; i++) a.push(parseInt(tokens[ptr++], 10));
    const b = [];
    for (let i = 0; i < m; i++) b.push({ val: parseInt(tokens[ptr++], 10), idx: i });
    a.sort((x, y) => y - x);
    b.sort((x, y) => x.val - y.val);
    const res = new Int32Array(m);
    for (let i = 0; i < m; i++) {
        res[b[i].idx] = a[i];
    }
    console.log(res.join(' '));
}
solve();
