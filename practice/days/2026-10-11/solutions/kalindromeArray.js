const fs = require('fs');

function check(a, del) {
    let l = 0, r = a.length - 1;
    while (l < r) {
        if (a[l] === del) {
            l++;
        } else if (a[r] === del) {
            r--;
        } else if (a[l] !== a[r]) {
            return false;
        } else {
            l++;
            r--;
        }
    }
    return true;
}

function main() {
    const input = fs.readFileSync(0, 'utf-8');
    let pos = 0;
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return;

    function nextInt() {
        while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
        if (pos >= input.length) return null;
        let res = 0;
        while (pos < input.length && input.charCodeAt(pos) > 32) {
            res = res * 10 + (input.charCodeAt(pos) - 48);
            pos++;
        }
        return res;
    }

    const t = nextInt();
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = nextInt();
        const a = new Int32Array(n);
        for (let i = 0; i < n; i++) {
            a[i] = nextInt();
        }

        let l = 0, r = n - 1;
        let diffL = -1, diffR = -1;
        while (l < r) {
            if (a[l] !== a[r]) {
                diffL = a[l];
                diffR = a[r];
                break;
            }
            l++;
            r--;
        }

        if (diffL === -1) {
            out.push('YES');
        } else {
            if (check(a, diffL) || check(a, diffR)) {
                out.push('YES');
            } else {
                out.push('NO');
            }
        }
    }

    console.log(out.join('\n'));
}

main();
