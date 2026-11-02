const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8');
    let pos = 0;
    
    function nextToken() {
        while (pos < input.length && input.charCodeAt(pos) <= 32) {
            pos++;
        }
        if (pos >= input.length) return null;
        let start = pos;
        while (pos < input.length && input.charCodeAt(pos) > 32) {
            pos++;
        }
        return input.slice(start, pos);
    }
    
    const tStr = nextToken();
    if (!tStr) return;
    const t = parseInt(tStr, 10);
    
    const out = [];
    
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(nextToken(), 10);
        const matrix = Array.from({ length: n }, () => new Array(n));
        
        let cur = 1;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                matrix[i][j] = cur++;
            }
        }
        
        for (let i = 0; i < n; i++) {
            if (i % 2 === 1) {
                matrix[i].reverse();
            }
        }
        
        for (let i = 0; i < n; i++) {
            out.push(matrix[i].join(' '));
        }
    }
    
    console.log(out.join('\n'));
}

solve();
