const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);
  const k = parseInt(tokens[ptr++], 10);
  const t = parseInt(tokens[ptr++], 10);

  const waste = new Float64Array(k);
  for (let i = 0; i < k; i++) {
    const r = parseInt(tokens[ptr++], 10) - 1;
    const c = parseInt(tokens[ptr++], 10) - 1;
    waste[i] = r * m + c;
  }
  waste.sort();

  const crops = ['Carrots', 'Kiwis', 'Grapes'];
  const out = [];

  for (let q = 0; q < t; q++) {
    const r = parseInt(tokens[ptr++], 10) - 1;
    const c = parseInt(tokens[ptr++], 10) - 1;
    const idx = r * m + c;

    let l = 0, rIdx = k - 1;
    let isWaste = false;
    let countBefore = 0;

    while (l <= rIdx) {
      const mid = (l + rIdx) >> 1;
      if (waste[mid] === idx) {
        isWaste = true;
        break;
      }
      if (waste[mid] < idx) {
        countBefore = mid + 1;
        l = mid + 1;
      } else {
        rIdx = mid - 1;
      }
    }

    if (isWaste) {
      out.push('Waste');
    } else {
      const cropIdx = (idx - countBefore) % 3;
      out.push(crops[cropIdx]);
    }
  }

  console.log(out.join('\n'));
}

solve();
