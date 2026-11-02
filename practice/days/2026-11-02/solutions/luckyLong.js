const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const s = tokens[ptr++];
        let cnt = 0;
        for (let j = 0; j < s.length; j++) {
            const c = s[j];
            if (c !== '4' && c !== '7') {
                cnt++;
            }
        }
        out.push(cnt);
    }
    console.log(out.join('\n'));
}
solve();
