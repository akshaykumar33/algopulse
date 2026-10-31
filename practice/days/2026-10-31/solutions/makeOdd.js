const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const a = [];
        const b = [];
        for (let i = 0; i < n; i++) {
            a.push(parseInt(tokens[ptr++], 10));
        }
        for (let i = 0; i < n; i++) {
            b.push(parseInt(tokens[ptr++], 10));
        }

        let hasOddA = false;
        let countEvenA = 0;
        let countTwoB = 0;

        for (let i = 0; i < n; i++) {
            if (a[i] % 2 !== 0) {
                hasOddA = true;
            } else {
                countEvenA++;
            }

            let val = b[i];
            let twos = 0;
            while (val > 0 && val % 2 === 0) {
                twos++;
                val /= 2;
            }
            countTwoB += twos;
        }

        if (hasOddA) {
            out.push("YES");
        } else {
            if (countTwoB >= countEvenA) {
                out.push("YES");
            } else {
                out.push("NO");
            }
        }
    }

    console.log(out.join('\n'));
}

solve();
