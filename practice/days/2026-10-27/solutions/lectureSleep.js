const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    const a = new Array(n);
    for (let i = 0; i < n; i++) {
        a[i] = parseInt(tokens[ptr++], 10);
    }
    const t = new Array(n);
    for (let i = 0; i < n; i++) {
        t[i] = parseInt(tokens[ptr++], 10);
    }

    let base = 0;
    for (let i = 0; i < n; i++) {
        if (t[i] === 1) {
            base += a[i];
        }
    }

    let curAdd = 0;
    for (let i = 0; i < k; i++) {
        if (t[i] === 0) {
            curAdd += a[i];
        }
    }

    let maxAdd = curAdd;
    for (let i = k; i < n; i++) {
        if (t[i] === 0) {
            curAdd += a[i];
        }
        if (t[i - k] === 0) {
            curAdd -= a[i - k];
        }
        if (curAdd > maxAdd) {
            maxAdd = curAdd;
        }
    }

    console.log(base + maxAdd);
}

solve();
