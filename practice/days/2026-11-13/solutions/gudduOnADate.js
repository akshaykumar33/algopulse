const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = input[ptr++];
    let sum = 0;
    for (let i = 0; i < s.length; i++) {
      sum += s.charCodeAt(i) - 48;
    }
    const d = (10 - (sum % 10)) % 10;
    out.push(s + d);
  }

  console.log(out.join('\n'));
}

function main() {}

solve();
