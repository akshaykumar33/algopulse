const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  const n = parseInt(input[0].trim(), 10);
  const s = input[1].trim();

  let firstR = -1;
  let lastR = -1;
  let firstL = -1;
  let lastL = -1;

  for (let i = 0; i < n; i++) {
    if (s[i] === 'R') {
      if (firstR === -1) firstR = i + 1;
      lastR = i + 1;
    } else if (s[i] === 'L') {
      if (firstL === -1) firstL = i + 1;
      lastL = i + 1;
    }
  }

  if (firstR !== -1 && firstL === -1) {
    console.log(`${firstR} ${lastR + 1}`);
  } else if (firstL !== -1 && firstR === -1) {
    console.log(`${lastL} ${firstL - 1}`);
  } else {
    console.log(`${firstR} ${firstL - 1}`);
  }
}

solve();

