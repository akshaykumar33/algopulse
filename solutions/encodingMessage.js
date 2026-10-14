const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        let arr = lines[i].split('');
        for (let j = 0; j < arr.length - 1; j += 2) {
            let tmp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = tmp;
        }
        let res = '';
        for (let j = 0; j < arr.length; j++) {
            let code = arr[j].charCodeAt(0);
            res += String.fromCharCode(219 - code);
        }
        out.push(res);
    }
    console.log(out.join('\n'));
}

solve();
