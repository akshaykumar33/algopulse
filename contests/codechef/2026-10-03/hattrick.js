const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const arr = lines[i].trim().split(/\s+/);
        let flag = false;
        for (let j = 0; j < 4; j++) {
            if (arr[j] === 'W' && arr[j + 1] === 'W' && arr[j + 2] === 'W') {
                flag = true;
                break;
            }
        }
        out.push(flag ? "YES" : "NO");
    }
    console.log(out.join('\n'));
}

solve();
