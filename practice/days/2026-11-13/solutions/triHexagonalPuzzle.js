const fs = require('fs');

const H = [
  [0, 3, 6, 8, 5, 2],
  [1, 4, 7, 9, 6, 3],
  [6, 9, 11, 12, 10, 8]
];

function applyMove(mask, h, c) {
  const cyc = H[h];
  let res = mask;
  for (let i = 0; i < 6; i++) {
    res &= ~(1 << cyc[i]);
  }
  for (let i = 0; i < 6; i++) {
    if ((mask >> cyc[i]) & 1) {
      const nextIdx = (c === 1) ? (i + 1) % 6 : (i + 5) % 6;
      res |= (1 << cyc[nextIdx]);
    }
  }
  return res;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const target = (1 << 3) | (1 << 6) | (1 << 8) | (1 << 9);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = input[ptr++];
    let start = 0;
    for (let i = 0; i < 13; i++) {
      if (s.charCodeAt(i) === 49) start |= (1 << i);
    }

    if (start === target) {
      out.push('0');
      continue;
    }

    const dist = new Map();
    const parent = new Map();
    const q = [start];
    dist.set(start, 0);
    let head = 0;

    while (head < q.length) {
      const u = q[head++];
      if (u === target) break;
      for (let h = 0; h < 3; h++) {
        for (let c = 0; c < 2; c++) {
          const v = applyMove(u, h, c);
          if (!dist.has(v)) {
            dist.set(v, dist.get(u) + 1);
            parent.set(v, { prev: u, h, c });
            q.push(v);
          }
        }
      }
    }

    let curr = target;
    const moves = [];
    while (curr !== start) {
      const p = parent.get(curr);
      moves.push(p.h + ' ' + p.c);
      curr = p.prev;
    }
    moves.reverse();

    out.push(moves.length.toString());
    for (let i = 0; i < moves.length; i++) {
      out.push(moves[i]);
    }
  }

  console.log(out.join('\n'));
}

function main() {}

solve();
