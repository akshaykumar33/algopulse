const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const s = input[0];

  let minDiff = 6;
  for (let num = 0; num < 1000000; num++) {
    const d0 = Math.floor(num / 100000) % 10;
    const d1 = Math.floor(num / 10000) % 10;
    const d2 = Math.floor(num / 1000) % 10;
    const d3 = Math.floor(num / 100) % 10;
    const d4 = Math.floor(num / 10) % 10;
    const d5 = num % 10;

    if (d0 + d1 + d2 === d3 + d4 + d5) {
      let diff = 0;
      if (d0 !== s.charCodeAt(0) - 48) diff++;
      if (d1 !== s.charCodeAt(1) - 48) diff++;
      if (d2 !== s.charCodeAt(2) - 48) diff++;
      if (d3 !== s.charCodeAt(3) - 48) diff++;
      if (d4 !== s.charCodeAt(4) - 48) diff++;
      if (d5 !== s.charCodeAt(5) - 48) diff++;
      if (diff < minDiff) minDiff = diff;
    }
  }
  console.log(minDiff);
}

solve();
