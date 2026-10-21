const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!input || input.length === 0 || input[0] === '') return;
    let ptr = 0;
    let tc = parseInt(input[ptr++], 10);
    let out = [];
    while (tc-- > 0) {
        let n = parseInt(input[ptr++], 10);
        let k = parseInt(input[ptr++], 10);
        if (n === 1) {
            out.push('1\n1');
        } else if (k === 1 || k === n) {
            out.push('-1');
        } else if (k % 2 === 0) {
            out.push(`3\n1 ${k} ${k + 1}`);
        } else {
            out.push(`3\n1 ${k - 1} ${k + 2}`);
        }
    }
    console.log(out.join('\n'));
}

solve();
