const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const k = parseInt(input[ptr++], 10);
  const answers = [];
  for (let i = 0; i < n - k + 1; i++) answers.push(input[ptr++]);

  const names = [];
  for (let i = 0; i < n; i++) {
    const d1 = String.fromCharCode(65 + Math.floor(i / 26));
    const d2 = String.fromCharCode(97 + (i % 26));
    names.push(d1 + d2);
  }

  for (let i = 0; i < n - k + 1; i++) {
    if (answers[i] === 'NO') {
      names[i + k - 1] = names[i];
    }
  }

  console.log(names.join(' '));
}

solve();
