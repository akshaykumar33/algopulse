const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).filter(Boolean);
    if (!input || input.length === 0) return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];

    for (let i = 0; i < t; i++) {
        const n = parseInt(input[ptr++], 10);
        const m = parseInt(input[ptr++], 10);
        const arr = new Array(n);
        for (let j = 0; j < n; j++) {
            arr[j] = parseInt(input[ptr++], 10);
        }
        let maxB = 0;
        for (let j = 0; j < m; j++) {
            const b = parseInt(input[ptr++], 10);
            if (b > maxB) maxB = b;
        }

        const k = Math.min(n, maxB);
        if (k > 0) {
            const head = arr.slice(0, n - k);
            const tail = arr.slice(n - k).sort((a, b) => a - b);
            out.push(head.concat(tail).join(' '));
        } else {
            out.push(arr.join(' '));
        }
    }

    console.log(out.join('\n'));
}

solve();
