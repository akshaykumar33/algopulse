const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);

  const regions = Array.from({ length: m + 1 }, () => []);

  for (let i = 0; i < n; i++) {
    const name = tokens[ptr++];
    const reg = parseInt(tokens[ptr++], 10);
    const score = parseInt(tokens[ptr++], 10);
    regions[reg].push({ name, score });
  }

  const out = [];
  for (let r = 1; r <= m; r++) {
    const list = regions[r];
    list.sort((a, b) => b.score - a.score);

    if (list.length > 2 && list[1].score === list[2].score) {
      out.push('?');
    } else {
      out.push(`${list[0].name} ${list[1].name}`);
    }
  }

  console.log(out.join('\n'));
}

solve();
