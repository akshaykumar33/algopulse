const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const [n, k, l] = lines[ptr++].split(' ').map(Number);
        const songs = [];
        
        for (let j = 0; j < n; j++) {
            const [m, lang] = lines[ptr++].split(' ').map(Number);
            if (lang === l) {
                songs.push(m);
            }
        }
        
        if (songs.length < k) {
            out.push(-1);
        } else {
            songs.sort((a, b) => b - a);
            let sum = 0;
            for (let j = 0; j < k; j++) {
                sum += songs[j];
            }
            out.push(sum);
        }
    }
    
    console.log(out.join('\n'));
}

solve();
