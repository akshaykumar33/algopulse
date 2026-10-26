const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).filter(Boolean);
    if (!input || input.length === 0) return;
    
    let ptr = 0;
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const cards = [];
    for (let i = 0; i < n; i++) {
        cards.push(parseInt(input[ptr++], 10));
    }
    
    const ops = [];
    for (let i = 0; i < n; i++) {
        if (cards[i] < 0) {
            ops.push(i + 1);
            cards[i] = -cards[i];
            if (i + 1 < n) {
                cards[i + 1] = -cards[i + 1];
            }
        }
    }
    
    const out = [];
    out.push(ops.length);
    if (ops.length > 0) {
        out.push(ops.join(' '));
    }
    console.log(out.join('\n'));
}

solve();
