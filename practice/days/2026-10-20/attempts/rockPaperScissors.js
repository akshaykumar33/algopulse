const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (!input || input.length === 0 || input[0] === '') return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        if (ptr >= input.length) break;
        const n = parseInt(input[ptr++], 10);
        const s = input[ptr++].trim();

        let ans = 0;
        let i = 0;
        while (i < n) {
            let j = i;
            while (j < n && s[j] === s[i]) {
                j++;
            }
            const len = j - i;
            ans += Math.ceil(len / 2);
            i = j;
        }
        out.push(ans);
    }

    console.log(out.join('\n'));
}

solve();
