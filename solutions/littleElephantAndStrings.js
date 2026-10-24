const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const k = parseInt(input[ptr++], 10);
  const n = parseInt(input[ptr++], 10);

  const fav = [];
  for (let i = 0; i < k; i++) {
    fav.push(input[ptr++]);
  }

  const out = [];
  for (let i = 0; i < n; i++) {
    const s = input[ptr++];
    if (s.length >= 47) {
      out.push('Good');
      continue;
    }

    let good = false;
    for (let j = 0; j < k; j++) {
      if (s.includes(fav[j])) {
        good = true;
        break;
      }
    }

    out.push(good ? 'Good' : 'Bad');
  }

  console.log(out.join('\n'));
}

solve();
