const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
let idx = 0;
const t = parseInt(input[idx++]);
const res = [];
for (let i = 0; i < t; i++) {
  const n = parseInt(input[idx++]);
  const k = parseInt(input[idx++]);
  res.push(Math.floor(n / k));
}
console.log(res.join('\n'));
