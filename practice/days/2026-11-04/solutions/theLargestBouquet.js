const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const mg = parseFloat(input[ptr++]);
    const my = parseFloat(input[ptr++]);
    const mr = parseFloat(input[ptr++]);

    const og = parseFloat(input[ptr++]);
    const oy = parseFloat(input[ptr++]);
    const or_leaf = parseFloat(input[ptr++]);

    const pg = parseFloat(input[ptr++]);
    const py = parseFloat(input[ptr++]);
    const pr = parseFloat(input[ptr++]);

    const sums = [
      mg + my + mr,
      og + oy + or_leaf,
      pg + py + pr,
      mg + og + pg,
      my + oy + py,
      mr + or_leaf + pr
    ];

    let maxBouquet = 0;
    for (let i = 0; i < 6; i++) {
      const s = sums[i];
      if (s === 0) continue;
      const oddPart = (s % 2 === 1) ? s : (s - 1);
      if (oddPart > maxBouquet) {
        maxBouquet = oddPart;
      }
    }

    out.push(maxBouquet);
  }

  console.log(out.join('\n'));
}

solve();

