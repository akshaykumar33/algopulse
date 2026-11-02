const fs = require('fs');

function isPal(s) {
    for (let i = 0, j = s.length - 1; i < j; i++, j--) {
        if (s[i] !== s[j]) return false;
    }
    return true;
}

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const out = [];

    if (/^\d+$/.test(tokens[0])) {
        const t = parseInt(tokens[ptr++], 10);
        for (let i = 0; i < t; i++) {
            if (ptr < tokens.length) {
                out.push(isPal(tokens[ptr++]) ? 1 : 2);
            }
        }
    } else {
        while (ptr < tokens.length) {
            out.push(isPal(tokens[ptr++]) ? 1 : 2);
        }
    }

    console.log(out.join('\n'));
}

solve();
