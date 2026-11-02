const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    const s = tokens[0];
    let isPal = true;
    for (let i = 0, j = s.length - 1; i < j; i++, j--) {
        if (s[i] !== s[j]) {
            isPal = false;
            break;
        }
    }
    if (isPal) {
        console.log(1);
    } else {
        console.log(2);
    }
}

solve();
