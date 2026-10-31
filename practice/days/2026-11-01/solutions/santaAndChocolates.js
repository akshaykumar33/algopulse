const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const k = parseInt(tokens[ptr++], 10);
        let sum = 0;
        const arr = new Array(n);
        for (let j = 0; j < n; j++) {
            arr[j] = parseInt(tokens[ptr++], 10);
            sum += arr[j];
        }

        if (sum < n) {
            out.push("No");
            continue;
        }

        if (k === 0) {
            let maxVal = 0;
            let minVal = Infinity;
            for (let j = 0; j < n; j++) {
                if (arr[j] > maxVal) maxVal = arr[j];
                if (arr[j] < minVal) minVal = arr[j];
            }
            if (maxVal - minVal <= 1) {
                out.push("Yes");
            } else {
                out.push("No");
            }
        } else {
            out.push("Yes");
        }
    }

    console.log(out.join('\n'));
}

solve();
