const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    const t = parseInt(lines[0], 10);
    let lineIdx = 1;
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(lines[lineIdx++], 10);
        const aAttack = lines[lineIdx++].split(' ').map(Number);
        const aDefense = lines[lineIdx++].split(' ').map(Number);
        const cAttack = lines[lineIdx++].split(' ').map(Number);
        const cDefense = lines[lineIdx++].split(' ').map(Number);
        
        const sumAAttack = aAttack.reduce((acc, val) => acc + val, 0);
        const sumADefense = aDefense.reduce((acc, val) => acc + val, 0);
        
        const sumCAttack = cAttack.reduce((acc, val) => acc + val, 0);
        const sumCDefense = cDefense.reduce((acc, val) => acc + val, 0);
        
        const totalA = sumAAttack + sumADefense;
        const totalC = sumCAttack + sumCDefense;
        
        if (totalA > totalC) {
            out.push('Draft');
        } else if (totalC > totalA) {
            out.push('Chestnut');
        } else {
            out.push('Draw');
        }
    }
    
    console.log(out.join('\n'));
}

solve();
