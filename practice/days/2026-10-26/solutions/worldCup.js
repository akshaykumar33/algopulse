const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (lines.length < 3 || lines[0] === '') return;
    const n = parseInt(lines[0], 10);
    let a = parseInt(lines[1], 10) - 1;
    let b = parseInt(lines[2], 10) - 1;

    let round = 0;
    while (a !== b) {
        a >>= 1;
        b >>= 1;
        round++;
    }

    if ((1 << round) === n) {
        console.log('Final!');
    } else {
        console.log(round);
    }
}

solve();
