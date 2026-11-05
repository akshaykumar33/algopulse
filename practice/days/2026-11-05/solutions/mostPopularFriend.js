const fs = require('fs');

function solve() {
    const buffer = fs.readFileSync(0);
    let offset = 0;

    function readInt() {
        while (offset < buffer.length && buffer[offset] <= 32) {
            offset++;
        }
        if (offset >= buffer.length) return null;
        let res = 0;
        while (offset < buffer.length && buffer[offset] > 32) {
            res = res * 10 + (buffer[offset] - 48);
            offset++;
        }
        return res;
    }

    const tVal = readInt();
    if (tVal === null) return;
    const out = [];

    for (let t = 0; t < tVal; t++) {
        const n = readInt();
        const m = readInt();
        const adj = Array.from({ length: n + 1 }, () => []);
        for (let i = 0; i < m; i++) {
            const u = readInt();
            const v = readInt();
            adj[u].push(v);
            adj[v].push(u);
        }

        const vis = new Uint8Array(n + 1);
        let bestId = 1;
        let maxPop = -1;
        let minDegreeSum = Infinity;

        for (let i = 1; i <= n; i++) {
            if (vis[i]) continue;
            const comp = [];
            const q = [i];
            vis[i] = 1;
            let head = 0;
            while (head < q.length) {
                const u = q[head++];
                comp.push(u);
                for (const v of adj[u]) {
                    if (!vis[v]) {
                        vis[v] = 1;
                        q.push(v);
                    }
                }
            }

            const size = comp.length;
            let degSum = 0;
            for (const u of comp) {
                degSum += adj[u].length;
            }

            const pop = degSum / size;
            if (pop > maxPop || (pop === maxPop && degSum < minDegreeSum)) {
                maxPop = pop;
                minDegreeSum = degSum;
                let minId = Infinity;
                for (const u of comp) {
                    if (u < minId) minId = u;
                }
                bestId = minId;
            } else if (pop === maxPop && degSum === minDegreeSum) {
                let minId = Infinity;
                for (const u of comp) {
                    if (u < minId) minId = u;
                }
                if (minId < bestId) {
                    bestId = minId;
                }
            }
        }

        out.push(bestId + ' ' + maxPop.toFixed(2));
    }

    console.log(out.join('\n'));
}

solve();
