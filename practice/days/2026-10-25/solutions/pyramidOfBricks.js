const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lines = [];

rl.on('line', (line) => {
  if (line.trim() !== '') {
    lines.push(line.trim());
  }
});

rl.on('close', () => {
  if (lines.length === 0) return;
  const t = parseInt(lines[0], 10);
  const out = [];
  for (let i = 1; i <= t && i < lines.length; i++) {
    const n = parseInt(lines[i], 10);
    let k = Math.floor((-1 + Math.sqrt(1 + 8 * n)) / 2);
    if ((k + 1) * (k + 2) / 2 <= n) {
      k++;
    } else if (k * (k + 1) / 2 > n) {
      k--;
    }
    out.push(k);
  }
  console.log(out.join('\n'));
});
