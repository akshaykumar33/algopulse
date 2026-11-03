const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8');
    const lines = input.split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0], 10);
    const out = [];
    const regex = /^[a-h][1-8]-[a-h][1-8]$/;
    
    for (let i = 1; i <= t && i < lines.length; i++) {
        const s = lines[i].trim();
        if (!s) {
            continue;
        }
        if (!regex.test(s)) {
            out.push("Error");
            continue;
        }
        const x1 = s.charCodeAt(0) - 96;
        const y1 = s.charCodeAt(1) - 48;
        const x2 = s.charCodeAt(3) - 96;
        const y2 = s.charCodeAt(4) - 48;
        
        const dx = Math.abs(x1 - x2);
        const dy = Math.abs(y1 - y2);
        
        if ((dx === 1 && dy === 2) || (dx === 2 && dy === 1)) {
            out.push("Yes");
        } else {
            out.push("No");
        }
    }
    console.log(out.join('\n'));
}

solve();
