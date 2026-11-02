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
        const dist = new Array(n);
        const qR = new Int32Array(n * m);
        const qC = new Int32Array(n * m);
        let tail = 0;

        for (let i = 0; i < n; i++) {
            dist[i] = new Int32Array(m).fill(-1);
            let rowStr = tokens[ptr++];
            if (rowStr.length === m && (rowStr.includes('0') || rowStr.includes('1'))) {
                for (let j = 0; j < m; j++) {
                    if (rowStr.charCodeAt(j) === 48) {
                        dist[i][j] = 0;
                        qR[tail] = i;
                        qC[tail] = j;
                        tail++;
                    }
                }
            } else {
                let j = 0;
                while (j < m) {
                    if (parseInt(rowStr, 10) === 0) {
                        dist[i][j] = 0;
                        qR[tail] = i;
                        qC[tail] = j;
                        tail++;
                    }
                    j++;
                    if (j < m) rowStr = tokens[ptr++];
                }
            }
        }

        let head = 0;
        const dr = [-1, 1, 0, 0];
        const dc = [0, 0, -1, 1];

        while (head < tail) {
            const r = qR[head];
            const c = qC[head];
            head++;
            const d = dist[r][c] + 1;

            for (let i = 0; i < 4; i++) {
                const nr = r + dr[i];
                const nc = c + dc[i];
                if (nr >= 0 && nr < n && nc >= 0 && nc < m) {
                    if (dist[nr][nc] === -1) {
                        dist[nr][nc] = d;
                        qR[tail] = nr;
                        qC[tail] = nc;
                        tail++;
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
