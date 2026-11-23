const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || !input[0]) return;
  const n = parseInt(input[0], 10);
  let v0 = 0;
  let v1 = 1023;
  let idx = 1;
  for (let i = 0; i < n; i++) {
    const op = input[idx++];
    const num = parseInt(input[idx++], 10);
    if (op === '|') {
      v0 |= num;
      v1 |= num;
    } else if (op === '&') {
      v0 &= num;
      v1 &= num;
    } else if (op === '^') {
      v0 ^= num;
      v1 ^= num;
    }
  }
  let orMask = 0;
  let xorMask = 0;
  let andMask = 1023;
  for (let bit = 0; bit < 10; bit++) {
    const b0 = (v0 >> bit) & 1;
    const b1 = (v1 >> bit) & 1;
    if (b0 === 0 && b1 === 0) {
      andMask &= ~(1 << bit);
    } else if (b0 === 1 && b1 === 1) {
      orMask |= (1 << bit);
    } else if (b0 === 1 && b1 === 0) {
      xorMask |= (1 << bit);
    }
  }
  const ops = [];
  if (orMask > 0) ops.push('| ' + orMask);
  if (xorMask > 0) ops.push('^ ' + xorMask);
  if (andMask < 1023) ops.push('& ' + andMask);
  console.log(ops.length + (ops.length > 0 ? '\n' + ops.join('\n') : ''));
}

solve();
