const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (!input || input.length === 0 || input[0] === '') return;
    const t = parseInt(input[0], 10);
    let lineIdx = 1;
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(input[lineIdx++], 10);
        const s = input[lineIdx++];
        let firstOne = -1;
        let lastZero = -1;
        for (let j = 0; j < n; j++) {
            if (s[j] === '1' && firstOne === -1) firstOne = j;
            if (s[j] === '0') lastZero = j;
        }
        if (firstOne === -1 || lastZero === -1 || firstOne > lastZero) {
            out.push(s);
        } else {
            let l = 0;
            while (l < n && s[l] === '0') l++;
            let r = 0;
            while (r < n && s[n - 1 - r] === '1') r++;
            out.push('0'.repeat(l) + '0' + '1'.repeat(r));
        }
    }
    console.log(out.join('\n'));
}

solve();
