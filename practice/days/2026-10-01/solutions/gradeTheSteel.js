const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0], 10);
    let out = [];
    
    for (let i = 1; i <= t && i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        let [h, c, t_val] = lines[i].trim().split(/\s+/).map(Number);
        
        let cond1 = h > 50;
        let cond2 = c < 0.7;
        let cond3 = t_val > 560;
        
        if (cond1 && cond2 && cond3) {
            out.push(10);
        } else if (cond1 && cond2) {
            out.push(9);
        } else if (cond2 && cond3) {
            out.push(8);
        } else if (cond1 && cond3) {
            out.push(7);
        } else if (cond1 || cond2 || cond3) {
            out.push(6);
        } else {
            out.push(5);
        }
    }
    console.log(out.join('\n'));
}

solve();
