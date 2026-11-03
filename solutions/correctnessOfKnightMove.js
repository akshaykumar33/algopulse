const fs = require('fs');

function solve() {
    const raw = fs.readFileSync(0, 'utf-8');
    const lines = raw.split(/\r?\n/);
    if (lines.length === 0 || lines[0].trim() === '') return;
    const t = parseInt(lines[0].trim(), 10);
    const out = [];

    for (let i = 1; i <= t; i++) {
        const s = lines[i] !== undefined ? lines[i] : '';
        if (s.length !== 5) {
            out.push('Error');
            continue;
        }
        const c0 = s.charCodeAt(0);
        const c1 = s.charCodeAt(1);
        const c2 = s.charCodeAt(2);
        const c3 = s.charCodeAt(3);
        const c4 = s.charCodeAt(4);

        if (c0 >= 97 && c0 <= 104 &&
            c1 >= 49 && c1 <= 56 &&
            c2 === 45 &&
            c3 >= 97 && c3 <= 104 &&
            c4 >= 49 && c4 <= 56) {
            const dx = Math.abs(c0 - c3);
            const dy = Math.abs(c1 - c4);
            if ((dx === 1 && dy === 2) || (dx === 2 && dy === 1)) {
                out.push('Yes');
            } else {
                out.push('No');
            }
        } else {
            out.push('Error');
        }
    }

    console.log(out.join('\n'));
}

solve();
