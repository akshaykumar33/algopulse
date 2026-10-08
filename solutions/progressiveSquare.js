const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    let lineIdx = 0;
    const t = parseInt(lines[lineIdx++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        while (lineIdx < lines.length && lines[lineIdx].trim() === '') {
            lineIdx++;
        }
        if (lineIdx >= lines.length) break;
        const [n, c, d] = lines[lineIdx++].trim().split(/\s+/).map(Number);
        
        while (lineIdx < lines.length && lines[lineIdx].trim() === '') {
            lineIdx++;
        }
        if (lineIdx >= lines.length) break;
        const arr = lines[lineIdx++].trim().split(/\s+/).map(Number);
        
        arr.sort((a, b) => a - b);

        const base = arr[0];
        const gen = [];
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                gen.push(base + i * c + j * d);
            }
        }
        gen.sort((a, b) => a - b);

        let ok = true;
        for (let i = 0; i < n * n; i++) {
            if (arr[i] !== gen[i]) {
                ok = false;
                break;
            }
        }
        out.push(ok ? "YES" : "NO");
    }
    console.log(out.join('\n'));
}

solve();
