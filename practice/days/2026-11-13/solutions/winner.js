const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines || lines.length === 0 || lines[0] === '') return;
  const n = parseInt(lines[0].trim(), 10);
  const names = [];
  const scores = [];
  const finalScores = new Map();

  for (let i = 1; i <= n; i++) {
    const parts = lines[i].trim().split(/\s+/);
    const name = parts[0];
    const score = parseInt(parts[1], 10);
    names.push(name);
    scores.push(score);
    finalScores.set(name, (finalScores.get(name) || 0) + score);
  }

  let maxScore = -Infinity;
  for (const score of finalScores.values()) {
    if (score > maxScore) {
      maxScore = score;
    }
  }

  const runningScores = new Map();
  for (let i = 0; i < n; i++) {
    const name = names[i];
    const score = scores[i];
    const current = (runningScores.get(name) || 0) + score;
    runningScores.set(name, current);
    if (current >= maxScore && finalScores.get(name) === maxScore) {
      console.log(name);
      return;
    }
  }
}

solve();
