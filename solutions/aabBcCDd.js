const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  const t = parseInt(input[0], 10);
  let line = 1;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    if (line >= input.length) break;
    const n = parseInt(input[line++], 10);
    const s = input[line++].trim().toLowerCase();
    const freq = new Int32Array(26);
    for (let i = 0; i < s.length; i++) {
      freq[s.charCodeAt(i) - 97]++;
    }
    freq.sort();
    out.push(freq[25] + freq[24]);
  }
  console.log(out.join('\n'));
}

solve();
