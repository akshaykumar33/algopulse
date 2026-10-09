const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (!lines.length || lines[0] === '') return;
    let t = parseInt(lines[0]);
    let ptr = 1;
    let out = [];
    for (let tc = 0; tc < t; tc++) {
        let a = lines[ptr++];
        let b = lines[ptr++];
        if (a === b) {
            out.push("YES");
            continue;
        }
        let n = a.length;
        let ok = false;
        for (let i = 0; i < n - 1; i++) {
            if (a[i] === '0' && b[i] === '0' && a[i+1] === '1' && b[i+1] === '1') {
                ok = true;
                break;
            }
        }
        out.push(ok ? "YES" : "NO");
    }
    console.log(out.join('\n'));
}

solve();
