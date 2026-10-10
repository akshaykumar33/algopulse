const fs = require('fs');

function main() {
    const input = fs.readFileSync(0, 'utf-8');
    let pos = 0;

    function nextInt() {
        while (pos < input.length && input.charCodeAt(pos) <= 32) {
            pos++;
        }
        if (pos >= input.length) return null;
        let res = 0;
        while (pos < input.length && input.charCodeAt(pos) > 32) {
            res = res * 10 + (input.charCodeAt(pos) - 48);
            pos++;
        }
        return res;
    }

    const t = nextInt();
    if (t === null) return;
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = nextInt();
        const k = nextInt();
        const c = new Int32Array(n);
        for (let i = 0; i < n; i++) {
            c[i] = nextInt();
        }

        if (c[0] === c[n - 1]) {
            let cnt = 0;
            for (let i = 0; i < n; i++) {
                if (c[i] === c[0]) cnt++;
            }
            out.push(cnt >= k ? 'YES' : 'NO');
        } else {
            let cnt1 = 0;
            let idx1 = -1;
            for (let i = 0; i < n; i++) {
                if (c[i] === c[0]) {
                    cnt1++;
                    if (cnt1 === k) {
                        idx1 = i;
                        break;
                    }
                }
            }

            let cnt2 = 0;
            let idx2 = -1;
            for (let i = n - 1; i >= 0; i--) {
                if (c[i] === c[n - 1]) {
                    cnt2++;
                    if (cnt2 === k) {
                        idx2 = i;
                        break;
                    }
                }
            }

            if (cnt1 === k && cnt2 === k && idx1 < idx2) {
                out.push('YES');
            } else {
                out.push('NO');
            }
        }
    }

    console.log(out.join('\n'));
}

main();
