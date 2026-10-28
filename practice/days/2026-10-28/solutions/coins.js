const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(Boolean);
  if (!lines || lines.length < 3) return;

  const wins = { A: 0, B: 0, C: 0 };
  for (let i = 0; i < 3; i++) {
    const s = lines[i].trim();
    if (s[1] === '>') {
      wins[s[0]]++;
    } else {
      wins[s[2]]++;
    }
  }

  const counts = Object.values(wins).sort((a, b) => a - b);
  if (counts[0] === 0 && counts[1] === 1 && counts[2] === 2) {
    const coins = ['A', 'B', 'C'];
    coins.sort((a, b) => wins[a] - wins[b]);
    console.log(coins.join(''));
  } else {
    console.log('Impossible');
  }
}

solve();

