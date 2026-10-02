const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input.length || input[0] === '') return;
  const t = parseInt(input[0], 10);
  const out = [];

  for (let i = 1; i <= t; i++) {
    if (!input[i]) break;
    const days = input[i].trim().split(/\s+/).map(Number);
    let sunny = 0;
    let rainy = 0;
    for (let j = 0; j < 7; j++) {
      if (days[j] === 1) sunny++;
      else rainy++;
    }
    out.push(sunny > rainy ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
