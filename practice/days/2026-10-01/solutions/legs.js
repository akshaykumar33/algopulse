const fs = require('fs');

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  const results = [];
  for (let i = 1; i <= t; i++) {
    const n = parseInt(input[i], 10);
    results.push(Math.floor((n + 2) / 4));
  }
  console.log(results.join('\n'));
}

main();
