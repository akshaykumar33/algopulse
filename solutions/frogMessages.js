const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const k = parseInt(input[ptr++], 10);
  const p = parseInt(input[ptr++], 10);

  const frogs = new Array(n);
  for (let i = 0; i < n; i++) {
    frogs[i] = { id: i + 1, pos: parseInt(input[ptr++], 10) };
  }
  frogs.sort((a, b) => a.pos - b.pos);

  const comp = new Int32Array(n + 1);
  let curComp = 0;
  comp[frogs[0].id] = curComp;

  for (let i = 1; i < n; i++) {
    if (frogs[i].pos - frogs[i - 1].pos > k) {
      curComp++;
    }
    comp[frogs[i].id] = curComp;
  }

  const out = [];
  for (let i = 0; i < p; i++) {
    const u = parseInt(input[ptr++], 10);
    const v = parseInt(input[ptr++], 10);
    out.push(comp[u] === comp[v] ? 'Yes' : 'No');
  }

  console.log(out.join('\n'));
}

solve();
