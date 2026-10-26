const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).filter(Boolean);
    if (!input || input.length === 0) return;
    
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    
    for (let tc = 0; tc < t; tc++) {
        let n = parseInt(input[ptr++], 10);
        let s = input[ptr++];
        let codePos = s.indexOf('code');
        let chefPos = s.indexOf('chef');
        if (codePos !== -1 && chefPos !== -1 && codePos < chefPos) {
            out.push('AC');
        } else {
            out.push('WA');
        }
    }
    
    console.log(out.join('\n'));
}

solve();
