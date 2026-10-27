const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        let evens = 0;
        let odds = 0;
        const twos = [];

        for (let i = 0; i < 2 * n; i++) {
            const val = parseInt(tokens[ptr++], 10);
            if (val % 2 === 0) {
                evens++;
                let temp = val;
                let count = 0;
                while (temp % 2 === 0) {
                    count++;
                    temp = Math.floor(temp / 2);
                }
                twos.push(count);
            } else {
                odds++;
            }
        }

        if (evens === odds) {
            out.push(0);
        } else if (evens > odds) {
            const diff = Math.floor((evens - odds) / 2);
            twos.sort((x, y) => x - y);
            let ans = 0;
            for (let i = 0; i < diff; i++) {
                ans += twos[i];
            }
            out.push(ans);
        } else {
            const diff = Math.floor((odds - evens) / 2);
            out.push(diff);
        }
    }

    console.log(out.join('\n'));
}

solve();
