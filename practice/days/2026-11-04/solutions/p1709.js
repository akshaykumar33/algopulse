const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  let lineIdx = 0;
  const t = parseInt(input[lineIdx++].trim(), 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    while (lineIdx < input.length && !input[lineIdx].trim()) lineIdx++;
    if (lineIdx >= input.length) break;
    const n = parseInt(input[lineIdx++].trim(), 10);
    const a = input[lineIdx++].trim().split(/\s+/).map(Number);
    const b = input[lineIdx++].trim().split(/\s+/).map(Number);

    const ops = [];
    let changed = true;
    while (changed) {
      changed = false;
      for (let i = 0; i < n - 1; i++) {
        if (a[i] > a[i + 1]) {
          const tmp = a[i];
          a[i] = a[i + 1];
          a[i + 1] = tmp;
          ops.push(`1 ${i + 1}`);
          changed = true;
        }
      }
      for (let i = 0; i < n - 1; i++) {
        if (b[i] > b[i + 1]) {
          const tmp = b[i];
          b[i] = b[i + 1];
          b[i + 1] = tmp;
          ops.push(`2 ${i + 1}`);
          changed = true;
        }
      }
      for (let i = 0; i < n; i++) {
        if (a[i] > b[i]) {
          const tmp = a[i];
          a[i] = b[i];
          b[i] = tmp;
          ops.push(`3 ${i + 1}`);
          changed = true;
        }
      }
    }

    out.push(ops.length);
    for (let i = 0; i < ops.length; i++) {
      out.push(ops[i]);
    }
  }

  console.log(out.join('\n'));
}

solve();

