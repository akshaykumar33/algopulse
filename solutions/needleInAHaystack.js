const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0]);
    let lineIdx = 1;
    const out = [];
    
    for (let i = 0; i < t; i++) {
        if (lineIdx >= lines.length) break;
        const s = lines[lineIdx++];
        const p = lines[lineIdx++];
        
        const cnt = new Array(26).fill(0);
        for (let j = 0; j < s.length; j++) {
            cnt[s.charCodeAt(j) - 97]++;
        }
        
        let possible = true;
        for (let j = 0; j < p.length; j++) {
            const c = p.charCodeAt(j) - 97;
            cnt[c]--;
            if (cnt[c] < 0) {
                possible = false;
                break;
            }
        }
        
        if (!possible) {
            out.push("NO");
            continue;
        }
        
        const rest = [];
        for (let j = 0; j < 26; j++) {
            for (let k = 0; k < cnt[j]; k++) {
                rest.push(String.fromCharCode(97 + j));
            }
        }
        
        let res = p + rest.join('');
        out.push("YES");
        out.push(res);
    }
    
    console.log(out.join('\n'));
}

solve();
