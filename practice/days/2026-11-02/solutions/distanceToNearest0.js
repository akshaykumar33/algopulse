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
        const mat = [];
        const dist = [];
        const q = [];

        for (let i = 0; i < n; i++) {
            const row = [];
            const dRow = [];
            const matRow = tokens[ptr++];
            for (let j = 0; j < m; j++) {
                const val = parseInt(matRow[j], 10);
                row.push(val);
                if (val === 0) {
                    dRow.push(0);
                    q.push([i, j]);
                } else {
                    dRow.push(-1);
                }
            }
            mat.push(row);
            dist.push(dRow);
        }

        let head = 0;
        const dr = [-1, 1, 0, 0];
        const dc = [0, 0, -1, 1];

        while (head < q.length) {
            const curr = q[head++];
            const r = curr[0];
            const c = curr[1];

            for (let i = 0; i < 4; i++) {
                const nr = r + dr[i];
                const nc = c + dc[i];
                if (nr >= 0 && nr < n && nc >= 0 && nc < m) {
                    if (dist[nr][nc] === -1) {
                        dist[nr][nc] = dist[r][c] + 1;
                        q.push([nr, nc]);
                    }
                }
            }
        }

        for (let i = 0; i < n; i++) {
            out.push(dist[i].join(' '));
        }
    }

    console.log(out.join('\n'));
}

solve();
