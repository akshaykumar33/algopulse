const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(Boolean);
    if (lines.length < 1) return;
    let ptr = 0;
    const t = parseInt(lines[ptr++].trim(), 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(lines[ptr++].trim(), 10);
        const s = lines[ptr++].trim();

        let i = 0;
        let ops = 0;

        while (i < n - 1) {
            if (s[i] === '(') {
                ops++;
                i += 2;
            } else {
                let j = i + 1;
                while (j < n && s[j] !== ')') {
                    j++;
                }
                if (j === n) break;
                ops++;
                i = j + 1;
            }
        }
        out.push(`${ops} ${n - i}`);
    }
    console.log(out.join('\n'));
}

solve();
