const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const X = parseInt(tokens[ptr++], 10); // S available
    const Y = parseInt(tokens[ptr++], 10); // L available
    const Z = parseInt(tokens[ptr++], 10); // XL available
    const A = parseInt(tokens[ptr++], 10); // S needed
    const B = parseInt(tokens[ptr++], 10); // L needed
    const C = parseInt(tokens[ptr++], 10); // XL needed

    let satisfied = 0;

    // 1. XL demand (C) can only be satisfied by XL shirts (Z)
    const servedXL = Math.min(Z, C);
    satisfied += servedXL;
    const remXL = Z - servedXL;

    // 2. L demand (B) satisfied by L shirts (Y) first, then leftover XL (remXL)
    const servedL_fromY = Math.min(Y, B);
    satisfied += servedL_fromY;
    const remL = Y - servedL_fromY;
    const neededL = B - servedL_fromY;

    const servedL_fromXL = Math.min(remXL, neededL);
    satisfied += servedL_fromXL;
    const remXL2 = remXL - servedL_fromXL;

    // 3. S demand (A) satisfied by S shirts (X), then leftover L (remL), then leftover XL (remXL2)
    const totalAvailableForS = X + remL + remXL2;
    const servedS = Math.min(totalAvailableForS, A);
    satisfied += servedS;

    out.push(satisfied);
  }

  console.log(out.join('\n'));
}

solve();
