const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length === 0 || input[0] === '') return;
    
    let lineIdx = 0;
    const t = parseInt(input[lineIdx++], 10);
    const out = [];
    
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(input[lineIdx++], 10);
        const a = input[lineIdx++].split(/\s+/).map(Number);
        const b = input[lineIdx++].split(/\s+/).map(Number);
        
        let res = "Tie";
        for (let bit = 30; bit >= 0; bit--) {
            let ca = 0;
            let cb = 0;
            const p = Math.pow(2, bit);
            for (let i = 0; i < n; i++) {
                if (Math.floor(a[i] / p) % 2 === 1) ca++;
                if (Math.floor(b[i] / p) % 2 === 1) cb++;
            }
            if (ca !== cb) {
                if (ca > cb) {
                    res = "Renako";
                } else {
                    res = "Ajisai";
                }
                break;
            }
        }
        out.push(res);
    }
    
    console.log(out.join('\n'));
}

solve();
