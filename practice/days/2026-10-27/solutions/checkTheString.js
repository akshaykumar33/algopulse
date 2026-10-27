const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    const s = tokens[0];
    
    let i = 0;
    let cntA = 0;
    while (i < s.length && s[i] === 'a') {
        cntA++;
        i++;
    }
    
    let cntB = 0;
    while (i < s.length && s[i] === 'b') {
        cntB++;
        i++;
    }
    
    let cntC = 0;
    while (i < s.length && s[i] === 'c') {
        cntC++;
        i++;
    }
    
    if (i === s.length && cntA > 0 && cntB > 0 && (cntC === cntA || cntC === cntB)) {
        console.log("YES");
    } else {
        console.log("NO");
    }
}

solve();
