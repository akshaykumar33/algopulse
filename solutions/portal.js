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
    const [n, x, y] = input[lineIdx++].trim().split(/\s+/).map(Number);
    const p = input[lineIdx++].trim().split(/\s+/).map(Number);

    const s = [];
    for (let i = 0; i < x; i++) s.push(p[i]);
    for (let i = y; i < n; i++) s.push(p[i]);

    const tArr = [];
    for (let i = x; i < y; i++) tArr.push(p[i]);

    if (tArr.length === 0) {
      out.push(s.join(' '));
      continue;
    }

    let minIdx = 0;
    for (let i = 1; i < tArr.length; i++) {
      if (tArr[i] < tArr[minIdx]) minIdx = i;
    }

    const tRot = [];
    for (let i = 0; i < tArr.length; i++) {
      tRot.push(tArr[(minIdx + i) % tArr.length]);
    }

    if (s.length === 0) {
      out.push(tRot.join(' '));
      continue;
    }

    let insertPos = s.length;
    for (let i = 0; i < s.length; i++) {
      if (s[i] > tRot[0]) {
        insertPos = i;
        break;
      }
    }

    const res = [];
    for (let i = 0; i < insertPos; i++) res.push(s[i]);
    for (let i = 0; i < tRot.length; i++) res.push(tRot[i]);
    for (let i = insertPos; i < s.length; i++) res.push(s[i]);

    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
