const fs = require('fs');

function solve() {
    const s = fs.readFileSync(0, 'utf-8').trim();
    if (!s) return;
    
    let heavyCount = 0;
    let ans = 0;
    
    for (let i = 0; i <= s.length - 5; i++) {
        const sub5 = s.substring(i, i + 5);
        if (sub5 === 'heavy') {
            heavyCount++;
        } else if (sub5 === 'metal') {
            ans += heavyCount;
        }
    }
    
    console.log(ans);
}

solve();
