const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    const t = tokens[ptr++];

    const star = s.indexOf('*');
    if (star === -1) {
        if (s === t) {
            console.log("YES");
        } else {
            console.log("NO");
        }
        return;
    }

    if (n - 1 > m) {
        console.log("NO");
        return;
    }

    const leftS = s.substring(0, star);
    const rightS = s.substring(star + 1);

    const leftT = t.substring(0, star);
    const rightT = t.substring(m - rightS.length);

    if (leftS === leftT && rightS === rightT) {
        console.log("YES");
    } else {
        console.log("NO");
    }
}
solve();
