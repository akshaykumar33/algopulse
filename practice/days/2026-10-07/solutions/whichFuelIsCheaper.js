const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!input || input.length === 0 || input[0] === '') return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const x = parseInt(input[ptr++], 10);
        const y = parseInt(input[ptr++], 10);
        const a = parseInt(input[ptr++], 10);
        const b = parseInt(input[ptr++], 10);
        const k = parseInt(input[ptr++], 10);
        
        const petrol = x + a * k;
        const diesel = y + b * k;
        
        if (petrol < diesel) {
            out.push('PETROL');
        } else if (diesel < petrol) {
            out.push('DIESEL');
        } else {
            out.push('SAME PRICE');
        }
    }
    console.log(out.join('\n'));
}

solve();
