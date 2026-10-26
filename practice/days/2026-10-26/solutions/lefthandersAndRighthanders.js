const fs = require('fs');

function solve() {
    let raw = '';
    try {
        if (!process.stdin.isTTY) {
            raw = fs.readFileSync(0, 'utf-8').trim();
        }
    } catch {}
    if (!raw && fs.existsSync('input.txt')) {
        try { raw = fs.readFileSync('input.txt', 'utf-8').trim(); } catch {}
    }
    if (!raw) {
        try { raw = fs.readFileSync(0, 'utf-8').trim(); } catch {}
    }
    const lines = raw.trim().split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) return;
    const n = parseInt(lines[0].trim(), 10);
    const s = lines[1].trim();

    const half = n / 2;
    const out = [];

    for (let i = 0; i < half; i++) {
        const lIdx = i;
        const rIdx = i + half;
        if (s[lIdx] === 'R' && s[rIdx] === 'L') {
            out.push(`${rIdx + 1} ${lIdx + 1}`);
        } else {
            out.push(`${lIdx + 1} ${rIdx + 1}`);
        }
    }
    const res = out.join('\n');
    console.log(res);
    try {
        fs.writeFileSync('output.txt', res + '\n');
    } catch {}
}

solve();
