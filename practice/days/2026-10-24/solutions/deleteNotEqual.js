const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length === 0 || input[0] === '') return;
    const t = parseInt(input[0], 10);
    const out = [];
    let lineIdx = 1;
    for (let i = 0; i < t; i++) {
        const n = parseInt(input[lineIdx++], 10);
        const s = input[lineIdx++];
        let hasZeros = false;
        let hasOnes = false;
        for (let j = 0; j < n; j++) {
            if (s[j] === '0') hasZeros = true;
            else hasOnes = true;
        }
        if (!hasZeros || !hasOnes) {
            out.push(n);
        } else {
            if (s[0] !== s[n - 1]) {
                out.push(1);
            } else {
                let allSameExcept = true;
                const first = s[0];
                for (let j = 1; j < n - 1; j++) {
                    if (s[j] !== first) {
                        allSameExcept = false;
                        break;
                    }
                }
                if (allSameExcept) {
                    out.push(2);
                } else {
                    out.push(1);
                }
            }
        }
    }
    console.log(out.join('\n'));
}

solve();
