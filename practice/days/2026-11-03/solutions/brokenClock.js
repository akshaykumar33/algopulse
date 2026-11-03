const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    const format = parseInt(tokens[0], 10);
    const s = tokens[1];
    
    let h1 = s.charCodeAt(0) - 48;
    let h2 = s.charCodeAt(1) - 48;
    let m1 = s.charCodeAt(3) - 48;
    let m2 = s.charCodeAt(4) - 48;

    if (m2 > 9) m2 = 9;
    if (m1 > 5) m1 = 5;

    if (format === 12) {
        let h = h1 * 10 + h2;
        if (h === 0) {
            h1 = 0;
            h2 = 1;
        } else if (h > 12) {
            if (h2 === 0) {
                h1 = 1;
                h2 = 0;
            } else {
                h1 = 0;
                h2 = h2;
            }
        }
    } else {
        let h = h1 * 10 + h2;
        if (h > 23) {
            h1 = 0;
            h2 = h2;
        }
    }

    console.log(`${h1}${h2}:${m1}${m2}`);
}

solve();
