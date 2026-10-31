const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);

let ptr = 0;

function solve() {
    const n = parseInt(tokens[ptr++], 10);
    const l = parseInt(tokens[ptr++], 10);

    const a = new Array(n);
    for (let i = 0; i < n; i++) {
        a[i] = parseInt(tokens[ptr++], 10);
    }

    const b = new Array(n);
    for (let i = 0; i < n; i++) {
        b[i] = parseInt(tokens[ptr++], 10);
    }

    const diffA = new Array(n);
    for (let i = 0; i < n; i++) {
        diffA[i] = (a[(i + 1) % n] - a[i] + l) % l;
    }

    const diffB = new Array(n);
    for (let i = 0; i < n; i++) {
        diffB[i] = (b[(i + 1) % n] - b[i] + l) % l;
    }

    for (let shift = 0; shift < n; shift++) {
        let match = true;
        for (let i = 0; i < n; i++) {
            if (diffA[i] !== diffB[(i + shift) % n]) {
                match = false;
                break;
            }
        }
        if (match) {
            console.log('YES');
            return;
        }
    }

    console.log('NO');
}

solve();
