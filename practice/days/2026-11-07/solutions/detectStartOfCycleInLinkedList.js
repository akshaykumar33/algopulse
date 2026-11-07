const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const out = [];

  while (ptr < input.length) {
    const n = parseInt(input[ptr++], 10);
    const vals = [];
    for (let i = 0; i < n; i++) {
      vals.push(parseInt(input[ptr++], 10));
    }
    const pos = ptr < input.length ? parseInt(input[ptr++], 10) : -1;

    if (n === 0 || pos < 0 || pos >= n) {
      out.push(-1);
      continue;
    }

    const nodes = [];
    for (let i = 0; i < n; i++) {
      nodes.push({ val: vals[i], next: null, idx: i });
    }
    for (let i = 0; i < n - 1; i++) {
      nodes[i].next = nodes[i + 1];
    }
    nodes[n - 1].next = nodes[pos];

    let slow = nodes[0];
    let fast = nodes[0];
    let hasCycle = false;

    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
      if (slow === fast) {
        hasCycle = true;
        break;
      }
    }

    if (!hasCycle) {
      out.push(-1);
    } else {
      let p = nodes[0];
      while (p !== slow) {
        p = p.next;
        slow = slow.next;
      }
      out.push(p.idx);
    }
  }

  console.log(out.join('\n'));
}

solve();
