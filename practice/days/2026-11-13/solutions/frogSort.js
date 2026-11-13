const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const w = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      w[i] = Number(input[ptr++]);
    }
    const l = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      l[i] = Number(input[ptr++]);
    }
    const frogs = [];
    for (let i = 0; i < n; i++) {
      frogs.push({ w: w[i], l: l[i], pos: i });
    }
    frogs.sort((a, b) => a.w - b.w);
    let totalHits = 0;
    let prevPos = frogs[0].pos;
    for (let i = 1; i < n; i++) {
      let curPos = frogs[i].pos;
      if (curPos <= prevPos) {
        const hits = Math.floor((prevPos - curPos) / frogs[i].l) + 1;
        totalHits += hits;
        curPos += hits * frogs[i].l;
      }
      prevPos = curPos;
    }
    out.push(totalHits.toString());
  }
  console.log(out.join('\n'));
}

function main() {}

solve();
