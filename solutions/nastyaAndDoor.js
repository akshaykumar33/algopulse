const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (lines.length < 1 || lines[0] === '') return;
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(lines[ptr++], 10);
        const k = parseInt(lines[ptr++], 10);
        const a = [];
        for (let i = 0; i < n; i++) {
            a.push(parseInt(lines[ptr++], 10));
        }

        const isPeak = new Int32Array(n);
        for (let i = 1; i < n - 1; i++) {
            if (a[i] > a[i - 1] && a[i] > a[i + 1]) {
                isPeak[i] = 1;
            }
        }

        const pref = new Int32Array(n + 1);
        for (let i = 0; i < n; i++) {
            pref[i + 1] = pref[i] + isPeak[i];
        }

        let maxPeaks = -1;
        let bestL = 0;

        for (let l = 0; l <= n - k; l++) {
            const r = l + k - 1;
            const peaks = pref[r] - pref[l + 1];
            if (peaks > maxPeaks) {
                maxPeaks = peaks;
                bestL = l;
            }
        }
        out.push(`${maxPeaks + 1} ${bestL + 1}`);
    }
    console.log(out.join('\n'));
}

solve();
