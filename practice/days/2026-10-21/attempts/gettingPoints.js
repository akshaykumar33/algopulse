const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!input || input.length === 0 || input[0] === '') return;
    let ptr = 0;
    let tc = parseInt(input[ptr++], 10);
    let out = [];
    while (tc-- > 0) {
        let n = BigInt(input[ptr++]);
        let p = BigInt(input[ptr++]);
        let l = BigInt(input[ptr++]);
        let t = BigInt(input[ptr++]);
        let totalTasks = (n + 6n) / 7n;
        let low = 0n, high = n, ans = n;
        while (low <= high) {
            let mid = (low + high) / 2n;
            let tasks = 2n * mid;
            if (tasks > totalTasks) tasks = totalTasks;
            let pts = mid * l + tasks * t;
            if (pts >= p) {
                ans = mid;
                high = mid - 1n;
            } else {
                low = mid + 1n;
            }
        }
        out.push((n - ans).toString());
    }
    console.log(out.join('\n'));
}

solve();
