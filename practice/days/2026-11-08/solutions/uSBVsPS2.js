const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const a = parseInt(input[ptr++], 10);
  const b = parseInt(input[ptr++], 10);
  const c = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);

  const usb = [];
  const ps2 = [];

  for (let i = 0; i < m; i++) {
    const val = parseInt(input[ptr++], 10);
    const type = input[ptr++];
    if (type === 'USB') usb.push(val);
    else ps2.push(val);
  }

  usb.sort((x, y) => x - y);
  ps2.sort((x, y) => x - y);

  let equipped = 0;
  let cost = 0n;

  let uPtr = 0;
  while (uPtr < usb.length && uPtr < a) {
    cost += BigInt(usb[uPtr++]);
    equipped++;
  }

  let pPtr = 0;
  while (pPtr < ps2.length && pPtr < b) {
    cost += BigInt(ps2[pPtr++]);
    equipped++;
  }

  const remaining = [];
  while (uPtr < usb.length) remaining.push(usb[uPtr++]);
  while (pPtr < ps2.length) remaining.push(ps2[pPtr++]);
  remaining.sort((x, y) => x - y);

  let rPtr = 0;
  while (rPtr < remaining.length && rPtr < c) {
    cost += BigInt(remaining[rPtr++]);
    equipped++;
  }

  console.log(`${equipped} ${cost.toString()}`);
}

solve();
