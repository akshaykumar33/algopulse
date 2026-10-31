const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const arr = [];
        for (let i = 0; i < n; i++) {
            arr.push(parseInt(tokens[ptr++], 10));
        }

        let minVal = n;
        let maxVal = 1;

        for (let i = 0; i < n; i++) {
            let cnt = 1;
            let j = i;
            while (j > 0 && arr[j] - arr[j - 1] <= 2) {
                cnt++;
                j--;
            }
            j = i;
            while (j < n - 1 && arr[j + 1] - arr[j] <= 2) {
                cnt++;
                j++;
            }
            if (cnt < minVal) minVal = cnt;
            if (cnt > maxVal) maxVal = cnt;
        }

        out.push(minVal + ' ' + maxVal);
    }

    console.log(out.join('\n'));
}

solve();
