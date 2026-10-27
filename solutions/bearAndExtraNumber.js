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
        arr.sort((a, b) => a - b);

        let ans = -1;
        if (arr[1] - arr[0] > 1) {
            ans = arr[0];
        } else if (arr[n - 1] - arr[n - 2] > 1) {
            ans = arr[n - 1];
        } else {
            for (let i = 1; i < n - 1; i++) {
                if (arr[i] - arr[i - 1] > 1 || arr[i + 1] - arr[i] > 1) {
                    ans = arr[i];
                    break;
                }
                if (arr[i] === arr[i - 1] || arr[i] === arr[i + 1]) {
                    ans = arr[i];
                    break;
                }
            }
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
