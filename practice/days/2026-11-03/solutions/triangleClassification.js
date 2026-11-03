const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8');
    const tokens = input.trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        let a = parseInt(tokens[ptr++], 10);
        let b = parseInt(tokens[ptr++], 10);
        let c = parseInt(tokens[ptr++], 10);
        
        let sides = [a, b, c];
        sides.sort((x, y) => x - y);
        
        if (sides[0] + sides[1] <= sides[2]) {
            out.push("Not Triangle");
        } else {
            let s1 = sides[0] * sides[0];
            let s2 = sides[1] * sides[1];
            let s3 = sides[2] * sides[2];
            
            if (s1 + s2 === s3) {
                out.push("Right Triangle");
            } else if (s1 + s2 < s3) {
                out.push("Obtuse Triangle");
            } else {
                out.push("Acute Triangle");
            }
        }
    }
    
    console.log(out.join('\n'));
}

solve();
