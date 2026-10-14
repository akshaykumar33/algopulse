const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length === 0 || input[0] === '') return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const r = parseFloat(input[ptr++]);
        const arr = [];
        for (let j = 0; j < 3; j++) {
            arr.push(input[ptr++].trim().split(/\s+/).map(Number));
        }
        const d1 = (arr[0][0] - arr[1][0]) ** 2 + (arr[0][1] - arr[1][1]) ** 2;
        const d2 = (arr[1][0] - arr[2][0]) ** 2 + (arr[1][1] - arr[2][1]) ** 2;
        const d3 = (arr[2][0] - arr[0][0]) ** 2 + (arr[2][1] - arr[0][1]) ** 2;
        const limit = r * r;
        let cnt = 0;
        if (d1 <= limit) cnt++;
        if (d2 <= limit) cnt++;
        if (d3 <= limit) cnt++;
        if (cnt >= 2) {
            out.push("yes");
        } else {
            out.push("no");
        }
    }
    console.log(out.join('\n'));
}

solve();
