const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const sets = [];
        const allElements = new Set();

        for (let j = 0; j < n; j++) {
            const c = parseInt(tokens[ptr++], 10);
            const s = new Set();
            for (let k = 0; k < c; k++) {
                const val = parseInt(tokens[ptr++], 10);
                s.add(val);
                allElements.add(val);
            }
            sets.push(s);
        }

        let maxLen = 0;

        for (const forbidden of allElements) {
            const currentUnion = new Set();
            for (let j = 0; j < n; j++) {
                if (!sets[j].has(forbidden)) {
                    for (const el of sets[j]) {
                        currentUnion.add(el);
                    }
                }
            }
            if (currentUnion.size > maxLen) {
                maxLen = currentUnion.size;
            }
        }

        out.push(maxLen);
    }

    console.log(out.join('\n'));
}

solve();
