const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
if (!input || !input[0]) process.exit(0);

const t = parseInt(input[0], 10);
const out = [];
for (let i = 1; i <= t; i++) {
  if (!input[i]) continue;
  const s = input[i].trim();
  let hasAdjacent = false;
  for (let j = 0; j < s.length - 1; j++) {
    if (s[j] === s[j + 1]) {
      hasAdjacent = true;
      break;
    }
  }
  out.push(hasAdjacent ? 1 : s.length);
}
console.log(out.join('\n'));
