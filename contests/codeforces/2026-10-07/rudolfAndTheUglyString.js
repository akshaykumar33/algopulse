const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length === 0 || input[0] === '') return;
    const t = parseInt(input[0], 10);
    let ptr = 1;
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(input[ptr++], 10);
        const s = input[ptr++];
        let ans = 0;
        let i = 0;
        while (i <= n - 3) {
            if (i <= n - 5 && s.slice(i, i + 5) === "mapie") {
                ans++;
                i += 5;
            } else if (s.slice(i, i + 3) === "map" || s.slice(i, i + 3) === "pie") {
                ans++;
                i += 3;
            } else {
                i++;
            }
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
