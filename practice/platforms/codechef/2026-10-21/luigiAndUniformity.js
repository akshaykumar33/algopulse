const fs = require('fs');

function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!input || input.length === 0 || input[0] === '') return;
    let ptr = 0;
    let tc = parseInt(input[ptr++], 10);
    let out = [];
    while (tc-- > 0) {
        let n = parseInt(input[ptr++], 10);
        let g = 0;
        let a = new Int32Array(n);
        for (let i = 0; i < n; i++) {
            let val = parseInt(input[ptr++], 10);
            a[i] = val;
            if (i === 0) g = val;
            else g = gcd(g, val);
        }
        let cnt = 0;
        for (let i = 0; i < n; i++) {
            if (a[i] === g) cnt++;
        }
        out.push(n - cnt);
    }
    console.log(out.join('\n'));
}

solve();
