const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (lines.length < 1 || lines[0] === '') return;
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(lines[ptr++], 10);
        const l = parseInt(lines[ptr++], 10);
        const r = parseInt(lines[ptr++], 10);
        const a = [];
        for (let i = 0; i < n; i++) {
            a.push(parseInt(lines[ptr++], 10));
        }

        let ans = 0;
        let sum = 0;
        let left = 0;

        for (let right = 0; right < n; right++) {
            sum += a[right];
            while (sum > r && left <= right) {
                sum -= a[left++];
            }
            if (sum >= l && sum <= r) {
                ans++;
                sum = 0;
                left = right + 1;
            }
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
