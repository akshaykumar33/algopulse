const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    let lineIdx = 0;
    const t = parseInt(lines[lineIdx++], 10);
    const out = [];

    for (let i = 0; i < t; i++) {
        const [n, x] = lines[lineIdx++].split(' ').map(Number);
        const arr = lines[lineIdx++].split(' ').map(Number);

        let odds = 0;
        let evens = 0;
        for (let j = 0; j < n; j++) {
            if (arr[j] % 2 === 0) {
                evens++;
            } else {
                odds++;
            }
        }

        let possible = false;
        for (let oddCnt = 1; oddCnt <= Math.min(odds, x); oddCnt += 2) {
            const evenCnt = x - oddCnt;
            if (evenCnt >= 0 && evenCnt <= evens) {
                possible = true;
                break;
            }
        }

        if (possible) {
            out.push("Yes");
        } else {
            out.push("No");
        }
    }

    console.log(out.join('\n'));
}

solve();
