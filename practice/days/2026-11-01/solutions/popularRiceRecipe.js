const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const map = new Map();
        for (let i = 0; i < n; i++) {
            const user = tokens[ptr++];
            const vote = tokens[ptr++];
            map.set(user, vote);
        }

        let total = 0;
        for (const vote of map.values()) {
            if (vote === '+') {
                total += 1;
            } else {
                total -= 1;
            }
        }
        out.push(total);
    }

    console.log(out.join('\n'));
}

solve();
