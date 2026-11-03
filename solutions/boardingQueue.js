const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8');
    const tokens = input.trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) {
        a.push(parseInt(tokens[ptr++], 10));
    }
    const b = [];
    for (let i = 0; i < n; i++) {
        b.push(parseInt(tokens[ptr++], 10));
    }

    let time = 0;
    let q = [];
    for (let i = 0; i < n; i++) {
        q.push(a[i]);
    }

    let pos = 0;
    let ans = 0;
    while (pos < n) {
        let target = b[pos];
        let idx = -1;
        for (let i = pos; i < n; i++) {
            if (q[i] === target) {
                idx = i;
                break;
            }
        }
        ans += (idx - pos);
        for (let i = idx; i > pos; i--) {
            q[i] = q[i - 1];
        }
        q[pos] = target;
        pos++;
    }
    console.log(ans);
}

solve();
