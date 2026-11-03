const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const k = parseInt(tokens[ptr++], 10);
        let ok = true;
        for (let j = 0; j < k; j++) {
            const s = tokens[ptr++];
            let isLang1 = true;
            let isLang2 = true;
            for (let c = 0; c < s.length; c++) {
                const ch = s.charCodeAt(c);
                if (ch >= 97 && ch <= 109) {
                    isLang2 = false;
                } else if (ch >= 78 && ch <= 90) {
                    isLang1 = false;
                } else {
                    isLang1 = false;
                    isLang2 = false;
                }
            }
            if (!isLang1 && !isLang2) {
                ok = false;
            }
        }
        out.push(ok ? 'YES' : 'NO');
    }

    console.log(out.join('\n'));
}

solve();
