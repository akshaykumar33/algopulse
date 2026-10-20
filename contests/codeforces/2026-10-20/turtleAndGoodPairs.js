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
        const cnt = new Int32Array(26);
        for (let i = 0; i < n; i++) {
            cnt[s.charCodeAt(i) - 97]++;
        }

        const res = [];
        let remaining = n;
        while (remaining > 0) {
            for (let c = 0; c < 26; c++) {
                if (cnt[c] > 0) {
                    res.push(String.fromCharCode(97 + c));
                    cnt[c]--;
                    remaining--;
                }
            }
        }
        out.push(res.join(''));
    }

    console.log(out.join('\n'));
}

solve();
