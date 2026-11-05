const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let i = 0; i < t; i++) {
        const s = tokens[ptr++];
        if (s.length < 4 || s.startsWith('</') === false || s.endsWith('>') === false) {
            out.push('Error');
            continue;
        }
        const content = s.slice(2, s.length - 1);
        if (content.length === 0) {
            out.push('Error');
            continue;
        }
        let ok = true;
        for (let j = 0; j < content.length; j++) {
            const c = content[j];
            const isLower = c >= 'a' && c <= 'z';
            const isDigit = c >= '0' && c <= '9';
            if (!isLower && !isDigit) {
                ok = false;
                break;
            }
        }
        if (ok) {
            out.push('Success');
        } else {
            out.push('Error');
        }
    }
    console.log(out.join('\n'));
}

solve();
