const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const tasks = [];
    for (let i = 0; i < n; i++) {
        tasks.push({ val: parseInt(tokens[ptr++], 10), idx: i + 1 });
    }
    tasks.sort((a, b) => a.val - b.val);
    const eqIdx = [];
    for (let i = 0; i < n - 1; i++) {
        if (tasks[i].val === tasks[i + 1].val) {
            eqIdx.push(i);
        }
    }
    if (eqIdx.length < 2) {
        console.log('NO');
        return;
    }
    console.log('YES');
    const p1 = tasks.map(x => x.idx);
    const p2 = [...p1];
    const i1 = eqIdx[0];
    const temp1 = p2[i1]; p2[i1] = p2[i1 + 1]; p2[i1 + 1] = temp1;
    const p3 = [...p1];
    const i2 = eqIdx[1];
    const temp2 = p3[i2]; p3[i2] = p3[i2 + 1]; p3[i2 + 1] = temp2;
    console.log(p1.join(' '));
    console.log(p2.join(' '));
    console.log(p3.join(' '));
}
solve();
