const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const tr1 = new Set();
        const tr2 = new Set();
        const dr1 = new Set();
        const dr2 = new Set();

        const tr1Len = parseInt(tokens[ptr++], 10);
        for (let i = 0; i < tr1Len; i++) {
            tr1.add(tokens[ptr++]);
        }
        const dr1Len = parseInt(tokens[ptr++], 10);
        for (let i = 0; i < dr1Len; i++) {
            dr1.add(tokens[ptr++]);
        }

        const tr2Len = parseInt(tokens[ptr++], 10);
        for (let i = 0; i < tr2Len; i++) {
            tr2.add(tokens[ptr++]);
        }
        const dr2Len = parseInt(tokens[ptr++], 10);
        for (let i = 0; i < dr2Len; i++) {
            dr2.add(tokens[ptr++]);
        }

        let possible = true;
        for (const val of tr2) {
            if (!tr1.has(val)) {
                possible = false;
                break;
            }
        }

        if (possible) {
            for (const val of dr2) {
                if (!dr1.has(val)) {
                    possible = false;
                    break;
                }
            }
        }

        if (possible) {
            out.push('yes');
        } else {
            out.push('no');
        }
    }

    console.log(out.join('\n'));
}

solve();
