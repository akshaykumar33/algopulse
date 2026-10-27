const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const m = parseInt(tokens[ptr++], 10);
        const edges = [];
        for (let i = 0; i < m; i++) {
            const u = parseInt(tokens[ptr++], 10);
            const v = parseInt(tokens[ptr++], 10);
            edges.push([u, v]);
        }
        const vis = new Uint8Array(n);
        const ans = [];
        for (let i = m - 1; i >= 0; i--) {
            const u = edges[i][0];
            const v = edges[i][1];
            if (vis[u] === 0 && vis[v] === 0) {
                vis[u] = 1;
                vis[v] = 1;
                ans.push(i);
            }
        }
        ans.reverse();
        out.push(ans.join(' '));
    }
    console.log(out.join('\n'));
}
solve();
