const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === "") return;
    let t = parseInt(lines[0]);
    let idx = 1;
    let out = [];
    while (t--) {
        if (idx >= lines.length) break;
        const parts = lines[idx++].trim().split(/\s+/).map(Number);
        const a = parts[0];
        const b = parts[1];
        const c = parts[2];
        const d = parts[3];
        const k = parts[4];
        let possible = false;
        const arr = [a, b, c, d];
        for (let mask = 0; mask < 16; mask++) {
            let s1 = 0;
            let s2 = 0;
            for (let i = 0; i < 4; i++) {
                if ((mask & (1 << i)) !== 0) {
                    s1 += arr[i];
                } else {
                    s2 += arr[i];
                }
            }
            if (s1 <= k && s2 <= k) {
                possible = true;
                break;
            }
        }
        if (possible) {
            out.push("YES");
        } else {
            out.push("NO");
        }
    }
    console.log(out.join('\n'));
}

solve();
