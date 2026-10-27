const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) {
        a.push({ id: i + 1, val: parseInt(tokens[ptr++], 10) });
    }

    const informed = [a[0]];
    const uninformed = [];
    for (let i = 1; i < n; i++) {
        uninformed.push(a[i]);
    }
    uninformed.sort((x, y) => y.val - x.val);

    const ans = [];
    let infPtr = 0;

    while (infPtr < informed.length && uninformed.length > 0) {
        if (informed[infPtr].val === 0) {
            infPtr++;
            continue;
        }
        informed[infPtr].val--;
        const nextPerson = uninformed.shift();
        ans.push(`${informed[infPtr].id} ${nextPerson.id}`);
        informed.push(nextPerson);
    }

    const out = [];
    if (uninformed.length > 0) {
        out.push('-1');
    } else {
        out.push(ans.length);
        for (let i = 0; i < ans.length; i++) {
            out.push(ans[i]);
        }
    }
    console.log(out.join('\n'));
}

solve();
