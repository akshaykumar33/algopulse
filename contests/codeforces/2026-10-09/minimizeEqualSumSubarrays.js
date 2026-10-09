const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8');
    let pos = 0;

    function nextInt() {
        while (pos < input.length && input.charCodeAt(pos) <= 32) {
            pos++;
        }
        if (pos >= input.length) return null;
        let res = 0;
        while (pos < input.length && input.charCodeAt(pos) > 32) {
            res = res * 10 + (input.charCodeAt(pos) - 48);
            pos++;
        }
        return res;
    }

    const t = nextInt();
    if (t === null) return;
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const n = nextInt();
        const p = [];
        for (let i = 0; i < n; i++) {
            p.push(nextInt());
        }
        const q = [];
        for (let i = 1; i < n; i++) {
            q.push(p[i]);
        }
        q.push(p[0]);
        out.push(q.join(' '));
    }
    console.log(out.join('\n'));
}

solve();
