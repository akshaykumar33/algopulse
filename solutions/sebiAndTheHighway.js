const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const S = parseFloat(input[ptr++]);
    const SG = parseFloat(input[ptr++]);
    const FG = parseFloat(input[ptr++]);
    const D = parseFloat(input[ptr++]);
    const T = parseFloat(input[ptr++]);

    const actualSpeed = S + (180 * D) / T;
    const diffS = Math.abs(actualSpeed - SG);
    const diffF = Math.abs(actualSpeed - FG);

    if (Math.abs(diffS - diffF) < 1e-9) out.push('DRAW');
    else if (diffS < diffF) out.push('SEBI');
    else out.push('FATHER');
  }
  console.log(out.join('\n'));
}

solve();
