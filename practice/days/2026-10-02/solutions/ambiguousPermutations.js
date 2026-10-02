const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    let lineIdx = 0;
    const out = [];

    while (lineIdx < lines.length) {
        const n = parseInt(lines[lineIdx++].trim(), 10);
        if (n === 0) break;
        const arr = lines[lineIdx++].trim().split(/\s+/).map(Number);
        
        let ambiguous = true;
        for (let i = 0; i < n; i++) {
            if (arr[arr[i] - 1] !== i + 1) {
                ambiguous = false;
                break;
            }
        }

        if (ambiguous) {
            out.push('ambiguous');
        } else {
            out.push('not ambiguous');
        }
    }

    console.log(out.join('\n'));
}

solve();
