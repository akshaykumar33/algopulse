const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (input.length === 0 || input[0] === '') return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const a = [parseInt(input[ptr++], 10), parseInt(input[ptr++], 10), parseInt(input[ptr++], 10)];
        const b = [parseInt(input[ptr++], 10), parseInt(input[ptr++], 10), parseInt(input[ptr++], 10)];
        a.sort((x, y) => y - x);
        b.sort((x, y) => y - x);
        const sa = a.join('');
        const sb = b.join('');
        if (sa > sb) {
            out.push('Alice');
        } else if (sb > sa) {
            out.push('Bob');
        } else {
            out.push('Tie');
        }
    }
    console.log(out.join('\n'));
}

solve();
