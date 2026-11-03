const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const grid = [tokens[ptr++], tokens[ptr++]];
        
        const vis = Array.from({ length: 2 }, () => Array(n).fill(false));
        const q = [];
        
        q.push([0, 0]);
        vis[0][0] = true;
        
        let found = false;
        
        while (q.length > 0) {
            const [r, c] = q.shift();
            
            if (r === 1 && c === n - 1) {
                found = true;
                break;
            }
            
            const dr = [-1, 1, 0, 0];
            const dc = [0, 0, -1, 1];
            
            for (let i = 0; i < 4; i++) {
                let nr = r + dr[i];
                let nc = c + dc[i];
                
                if (nr >= 0 && nr < 2 && nc >= 0 && nc < n) {
                    if (grid[nr][nc] === '<') {
                        nc--;
                    } else {
                        nc++;
                    }
                    
                    if (!vis[nr][nc]) {
                        vis[nr][nc] = true;
                        q.push([nr, nc]);
                    }
                }
            }
        }
        
        if (vis[1][n - 1]) {
            out.push('YES');
        } else {
            out.push('NO');
        }
    }
    
    console.log(out.join('\n'));
}

solve();
