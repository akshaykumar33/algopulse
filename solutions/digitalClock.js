const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const H = parseInt(tokens[ptr++], 10);
        const M = parseInt(tokens[ptr++], 10);
        let count = 0;
        for (let h = 0; h < H; h++) {
            for (let m = 0; m < M; m++) {
                const s = h.toString() + m.toString();
                let same = true;
                for (let i = 1; i < s.length; i++) {
                    if (s[i] !== s[0]) {
                        same = false;
                        break;
                    }
                }
                if (same) count++;
            }
        }
        out.push(count);
    }
    console.log(out.join('\n'));
}
solve();
