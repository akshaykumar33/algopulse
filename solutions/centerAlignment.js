const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8');
    const lines = input.split(/\r?\n/);
    if (lines.length > 0 && lines[lines.length - 1] === '') {
        lines.pop();
    }
    
    let maxLen = 0;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].length > maxLen) {
            maxLen = lines[i].length;
        }
    }
    
    const out = [];
    out.push('*'.repeat(maxLen + 2));
    
    let leftTurn = true;
    for (let i = 0; i < lines.length; i++) {
        const s = lines[i];
        const diff = maxLen - s.length;
        let left = Math.floor(diff / 2);
        let right = Math.ceil(diff / 2);
        if (diff % 2 !== 0) {
            if (leftTurn) {
                left = Math.floor(diff / 2);
                right = Math.ceil(diff / 2);
            } else {
                left = Math.ceil(diff / 2);
                right = Math.floor(diff / 2);
            }
            leftTurn = !leftTurn;
        }
        out.push('*' + ' '.repeat(left) + s + ' '.repeat(right) + '*');
    }
    
    out.push('*'.repeat(maxLen + 2));
    console.log(out.join('\n'));
}

solve();
