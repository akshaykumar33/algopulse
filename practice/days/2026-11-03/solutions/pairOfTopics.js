const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const a = new Array(n);
    for (let i = 0; i < n; i++) {
        a[i] = parseInt(tokens[ptr++], 10);
    }
    const b = new Array(n);
    for (let i = 0; i < n; i++) {
        b[i] = parseInt(tokens[ptr++], 10);
    }

    const diff = new Array(n);
    for (let i = 0; i < n; i++) {
        diff[i] = a[i] - b[i];
    }

    diff.sort((x, y) => x - y);

    let ans = 0;
    let l = 0;
    let r = n - 1;

    while (l < r) {
        if (diff[l] + diff[r] > 0) {
            ans += (r - l);
            r--;
        } else {
            l++;
        }
    }

    console.log(ans);
}

solve();
