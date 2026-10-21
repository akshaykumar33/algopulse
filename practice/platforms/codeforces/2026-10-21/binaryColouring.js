const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0]);
    const out = [];
    for (let i = 1; i <= t; i++) {
        let x = parseInt(lines[i]);
        const arr = [];
        while (x > 0) {
            if (x % 2 !== 0) {
                let rem = x % 4;
                if (rem === 3) {
                    arr.push(-1);
                    x = (x + 1) / 2;
                } else {
                    arr.push(1);
                    x = (x - 1) / 2;
                }
            } else {
                arr.push(0);
                x = x / 2;
            }
        }
        out.push(arr.length);
        out.push(arr.join(' '));
    }
    console.log(out.join('\n'));
}

solve();
