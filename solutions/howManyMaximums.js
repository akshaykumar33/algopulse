const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    let line = 0;
    const T = parseInt(input[line++]);
    const output = [];

    for (let t = 0; t < T; t++) {
        const N = parseInt(input[line++]);
        const P = input[line++].split(' ').map(Number);

        let count = 0;
        for (let i = 0; i < N - 1; i++) {
            if (P[i] > P[i + 1]) {
                count++;
            }
        }
        output.push(count);
    }
    console.log(output.join('\n'));
}

solve();
