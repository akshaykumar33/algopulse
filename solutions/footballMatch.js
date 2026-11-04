const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  let lineIdx = 0;
  const t = parseInt(input[lineIdx++].trim(), 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    while (lineIdx < input.length && !input[lineIdx].trim()) lineIdx++;
    if (lineIdx >= input.length) break;
    const n = parseInt(input[lineIdx++].trim(), 10);

    let team1 = null;
    let team2 = null;
    let score1 = 0;
    let score2 = 0;

    for (let i = 0; i < n; i++) {
      const name = input[lineIdx++].trim();
      if (!team1) {
        team1 = name;
        score1++;
      } else if (name === team1) {
        score1++;
      } else if (!team2) {
        team2 = name;
        score2++;
      } else if (name === team2) {
        score2++;
      }
    }

    if (score1 > score2) {
      out.push(team1);
    } else if (score2 > score1) {
      out.push(team2);
    } else {
      out.push('Draw');
    }
  }

  console.log(out.join('\n'));
}

solve();
