const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  const n = parseInt(tokens[0], 10);
  const s = tokens[1];
  let trans = 1;
  for (let i = 1; i < n; i++) {
    if (s[i] !== s[i - 1]) trans++;
  }
  console.log(Math.min(n, trans + 2));
}
