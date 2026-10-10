const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length === 0 || input[0] === '') return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(input[ptr++], 10);
        const s = input[ptr++];
        const map = new Map();
        let possible = false;

        for (let i = 0; i < n - 1; i++) {
            const sub = s.slice(i, i + 2);
            if (map.has(sub)) {
                if (map.get(sub) < i - 1) {
                    possible = true;
                    break;
                }
            } else {
                map.set(sub, i);
            }
        }

        out.push(possible ? 'YES' : 'NO');
    }

    console.log(out.join('\n'));
}

solve();
