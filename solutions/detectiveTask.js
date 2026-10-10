const fs = require('fs');

function main() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0], 10);
    const out = [];
    for (let tc = 1; tc <= t; tc++) {
        const s = lines[tc];
        const n = s.length;
        let lastOne = 0;
        let firstZero = n - 1;
        for (let i = 0; i < n; i++) {
            if (s[i] === '1') {
                lastOne = i;
            }
        }
        for (let i = 0; i < n; i++) {
            if (s[i] === '0') {
                firstZero = i;
                break;
            }
        }
        out.push(firstZero - lastOne + 1);
    }
    console.log(out.join('\n'));
}

main();
