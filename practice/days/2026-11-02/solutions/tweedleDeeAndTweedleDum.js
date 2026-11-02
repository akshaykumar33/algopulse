const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const player = tokens[ptr++];
        const arr = [];
        for (let j = 0; j < n; j++) {
            arr.push(parseInt(tokens[ptr++], 10));
        }
        
        if (n === 1 && player === 'Dee' && arr[0] % 2 === 0) {
            out.push('Dee');
        } else {
            out.push('Dum');
        }
    }
    
    console.log(out.join('\n'));
}

solve();
