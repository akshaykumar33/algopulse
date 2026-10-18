const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (!lines || lines.length === 0 || lines[0] === '') return;

    let lineIdx = 0;
    const t = parseInt(lines[lineIdx++], 10);
    const out = [];

    function count(arr) {
        let ones = 0;
        let inv = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === 1) {
                ones++;
            } else {
                inv += ones;
            }
        }
        return inv;
    }

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(lines[lineIdx++], 10);
        const arr = lines[lineIdx++].trim().split(/\s+/).map(Number);

        let firstZero = -1;
        let lastOne = -1;
        for (let i = 0; i < n; i++) {
            if (arr[i] === 0 && firstZero === -1) {
                firstZero = i;
            }
            if (arr[i] === 1) {
                lastOne = i;
            }
        }

        let ans = count(arr);

        if (firstZero !== -1) {
            arr[firstZero] = 1;
            const cur = count(arr);
            if (cur > ans) ans = cur;
            arr[firstZero] = 0;
        }

        if (lastOne !== -1) {
            arr[lastOne] = 0;
            const cur = count(arr);
            if (cur > ans) ans = cur;
            arr[lastOne] = 1;
        }

        out.push(ans);
    }

    console.log(out.join('\n'));
}

solve();
