const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    
    const n = parseInt(tokens[ptr++], 10);
    const adj = Array.from({ length: n + 1 }, () => []);
    
    for (let i = 0; i < n - 1; i++) {
        const u = parseInt(tokens[ptr++], 10);
        const v = parseInt(tokens[ptr++], 10);
        const w = parseInt(tokens[ptr++], 10);
        adj[u].push({ to: v, weight: w });
        adj[v].push({ to: u, weight: w });
    }
    
    const q = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < q; i++) {
        const start = parseInt(tokens[ptr++], 10);
        const end = parseInt(tokens[ptr++], 10);
        
        const dist = new Array(n + 1).fill(-1);
        const queue = [start];
        dist[start] = 0;
        let head = 0;
        
        while (head < queue.length) {
            const curr = queue[head++];
            if (curr === end) break;
            
            for (const edge of adj[curr]) {
                if (dist[edge.to] === -1) {
                    dist[edge.to] = dist[curr] + edge.weight;
                    queue.push(edge.to);
                }
            }
        }
        
        out.push(dist[end]);
    }
    
    console.log(out.join('\n'));
}

solve();
