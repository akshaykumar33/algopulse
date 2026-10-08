const fs = require('fs');

function main() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (input.length === 0 || input[0] === '') return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(input[ptr++], 10);
        const arr = [];
        for (let i = n; i >= 1; i--) {
            arr.push(i);
        }
        out.push(arr.join(' '));
    }
    console.log(out.join('\n'));
}

main();
