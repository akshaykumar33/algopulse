const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length < 2) return;
    const n = parseInt(input[0]);
    const arr = input[1].split(/\s+/).map(Number);
    
    const cans = [];
    for (let i = 0; i < n; i++) {
        cans.push({ val: arr[i], id: i + 1 });
    }
    
    cans.sort((a, b) => b.val - a.val);
    
    let sum = 0;
    const order = [];
    for (let i = 0; i < n; i++) {
        sum += cans[i].val * i + 1;
        order.push(cans[i].id);
    }
    
    const out = [];
    out.push(sum);
    out.push(order.join(' '));
    console.log(out.join('\n'));
}

solve();
