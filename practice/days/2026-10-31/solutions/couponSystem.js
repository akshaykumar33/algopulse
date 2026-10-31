const fs = require('fs');

function main() {
    const input = fs.readFileSync(0, 'utf-8');
    const tokens = input.trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const best = new Map();
        
        for (let j = 0; j < n; j++) {
            const c = parseInt(tokens[ptr++], 10);
            const r = parseInt(tokens[ptr++], 10);
            const p = parseInt(tokens[ptr++], 10);
            
            if (!best.has(c)) {
                best.set(c, { r: r, p: p });
            } else {
                const cur = best.get(c);
                if (r > cur.r || (r === cur.r && p < cur.p)) {
                    best.set(c, { r: r, p: p });
                }
            }
        }
        
        const cities = Array.from(best.keys()).sort((a, b) => a - b);
        
        for (const c of cities) {
            const item = best.get(c);
            out.push(`${item.r} ${item.p}`);
        }
    }
    
    console.log(out.join('\n'));
}

main();
