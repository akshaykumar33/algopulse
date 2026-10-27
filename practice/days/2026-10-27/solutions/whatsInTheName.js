const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split('\n');
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0].trim(), 10);
    const out = [];
    for (let i = 1; i <= t && i < lines.length; i++) {
        const parts = lines[i].trim().split(/\s+/);
        let res = '';
        if (parts.length === 1) {
            const s = parts[0];
            res = s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
        } else if (parts.length === 2) {
            const f = parts[0];
            const l = parts[1];
            res = f.charAt(0).toUpperCase() + '. ' + l.charAt(0).toUpperCase() + l.slice(1).toLowerCase();
        } else if (parts.length === 3) {
            const f = parts[0];
            const m = parts[1];
            const l = parts[2];
            res = f.charAt(0).toUpperCase() + '. ' + m.charAt(0).toUpperCase() + '. ' + l.charAt(0).toUpperCase() + l.slice(1).toLowerCase();
        }
        out.push(res);
    }
    console.log(out.join('\n'));
}

solve();
