const fs = require('fs');

function main() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (input.length === 0 || input[0] === '') return;
    let ptr = 0;
    const t = Number(input[ptr++]);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const n = Number(input[ptr++]);
        const a = [];
        for (let i = 0; i < n; i++) {
            a.push(Number(input[ptr++]));
        }
        let sorted = true;
        for (let i = 0; i < n; i++) {
            if (a[i] !== i + 1) {
                sorted = false;
                break;
            }
        }
        if (sorted) {
            out.push(0);
        } else if (a[0] === 1 || a[n - 1] === n) {
            out.push(1);
        } else if (a[0] === n && a[n - 1] === 1) {
            out.push(3);
        } else {
            out.push(2);
        }
    }
    console.log(out.join('\n'));
}

main();
