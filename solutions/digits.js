const solve = () => {
    const lines = require('fs').readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const out = [];
    const n = parseInt(lines[0]);
    out.push(String(n).length);
    console.log(out.join('\n'));
};
solve();
