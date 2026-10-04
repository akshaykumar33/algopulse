const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0], 10);
    const out = [];
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    
    for (let i = 1; i <= t; i++) {
        if (i >= lines.length) break;
        const s = lines[i];
        let cnt = 0;
        let happy = false;
        for (let j = 0; j < s.length; j++) {
            if (vowels.has(s[j])) {
                cnt++;
                if (cnt > 2) {
                    happy = true;
                    break;
                }
            } else {
                cnt = 0;
            }
        }
        if (happy) {
            out.push("Happy");
        } else {
            out.push("Sad");
        }
    }
    console.log(out.join('\n'));
}

solve();
