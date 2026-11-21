const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (input.length === 1 && input[0] === '') process.exit(0);
let ptr = 0;
const T = parseInt(input[ptr++], 10);
const out = [];

for (let t = 0; t < T; t++) {
  const r0 = parseInt(input[ptr++], 10);
  const c0 = parseInt(input[ptr++], 10);

  const moves = [];
  const add = (r, c) => {
    if (moves.length === 0) {
      if (r !== r0 || c !== c0) moves.push([r, c]);
    } else {
      const last = moves[moves.length - 1];
      if (last[0] !== r || last[1] !== c) moves.push([r, c]);
    }
  };

  const mid = (r0 + c0) / 2;
  add(mid, mid);
  add(1, 1);

  for (let r = 2; r <= 4; r++) {
    add(r, r);
    add(1, 2 * r - 1);
    add(2 * r - 1, 1);
    add(r, r);
  }
  for (let r = 5; r <= 8; r++) {
    const x = 2 * (r - 4);
    add(r, r);
    add(x, 8);
    add(8, x);
    add(r, r);
  }

  out.push(moves.length);
  for (let i = 0; i < moves.length; i++) {
    out.push(moves[i][0] + ' ' + moves[i][1]);
  }
}
console.log(out.join('\n'));