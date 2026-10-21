const fs = require('fs');

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let i = 0; i < t; i++) {
    const d = parseInt(input[ptr++], 10);
    const c = parseInt(input[ptr++], 10);
    const a1 = parseInt(input[ptr++], 10);
    const a2 = parseInt(input[ptr++], 10);
    const a3 = parseInt(input[ptr++], 10);
    const b1 = parseInt(input[ptr++], 10);
    const b2 = parseInt(input[ptr++], 10);
    const b3 = parseInt(input[ptr++], 10);
    const sumA = a1 + a2 + a3;
    const sumB = b1 + b2 + b3;
    const costWithout = sumA + sumB + 2 * d;
    let costWith = sumA + sumB + c;
    if (sumA < 150) costWith += d;
    if (sumB < 150) costWith += d;
    if (costWith < costWithout) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }
  console.log(out.join('\n'));
}

main();
