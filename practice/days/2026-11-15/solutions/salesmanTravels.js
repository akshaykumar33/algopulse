const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (input.length === 1 && input[0] === '') process.exit(0);
let ptr = 0;
const T = parseInt(input[ptr++], 10);
const out = [];

for (let t = 0; t < T; t++) {
  const n = parseInt(input[ptr++], 10);
  const k = parseInt(input[ptr++], 10);

  const used = new Uint8Array(n + 1);
  const ans = [];
  for (let i = n; i >= 3; i--) {
    if (used[i]) continue;
    ans.push(i);
    ans.push(i - 2);
    used[i] = 1;
    used[i - 2] = 1;
  }
  for (let i = 1; i <= n; i++) {
    if (!used[i]) ans.push(i);
  }
  out.push(ans.join(' '));
}
console.log(out.join('\n'));
