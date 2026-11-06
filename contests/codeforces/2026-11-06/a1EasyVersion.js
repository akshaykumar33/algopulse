const lines = require('fs').readFileSync(0, 'utf-8').trim().split(/\r?\n/);
const t = parseInt(lines[0]);
const output = [];
for (let i = 1; i <= t; i++) {
  const n = parseInt(lines[i]);
  const h = Math.floor(n / 2);
  output.push(h * (n - h));
}
console.log(output.join('\n'));
