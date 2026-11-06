const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const c = Number(input[ptr++]);
    const s = input[ptr++];

    const counts = new Int32Array(5);
    for (let i = 0; i < n; i++) {
      const idx = s.charCodeAt(i) - 65;
      if (idx >= 0 && idx < 5) {
        counts[idx]++;
      }
    }

    let minCost = Infinity;
    for (let mask = 0; mask < 32; mask++) {
      let learnedCount = 0;
      let translatedPeople = 0;
      for (let lang = 0; lang < 5; lang++) {
        if ((mask & (1 << lang)) !== 0) {
          learnedCount++;
        } else {
          translatedPeople += counts[lang];
        }
      }
      const translatorCost = (translatedPeople * (translatedPeople + 1)) / 2;
      const total = learnedCount * c + translatorCost;
      if (total < minCost) {
        minCost = total;
      }
    }

    out.push(minCost);
  }

  console.log(out.join('\n'));
}

solve();

