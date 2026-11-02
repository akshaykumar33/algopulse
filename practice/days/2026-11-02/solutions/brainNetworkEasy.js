const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);

    if (m !== n - 1) {
        console.log("no");
        return;
    }

    const adj = Array.from({ length: n + 1 }, () => []);
    for (let i = 0; i < m; i++) {
        const u = parseInt(tokens[ptr++], 10);
        const v = parseInt(tokens[ptr++], 10);
        adj[u].push(v);
        adj[v].push(u);
    }

    const vis = new Uint8Array(n + 1);
    const q = [1];
    vis[1] = 1;
    let head = 0;

    while (head < q.length) {
        const u = q[head++];
        for (let i = 0; i < adj[u].length; i++) {
            const v = adj[u][i];
            if (!vis[v]) {
                vis[v] = 1;
                q.push(v);
            }
        }
    }

    if (q.length === n) {
        console.log("yes");
    } else {
        console.log("no");
    }
}

solve();
