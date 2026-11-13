const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];
  for (let i = 0; i < t; i++) {
    const x = Number(input[ptr++]);
    const y = Number(input[ptr++]);
    if (x > y + 1) {
      out.push('Chef');
    } else if (x === y + 1) {
      out.push(x % 2 === 0 ? 'Chef' : 'Chefina');
    } else if (x + 1 < y) {
      out.push('Chefina');
    } else if (x + 1 === y) {
      out.push(x % 2 === 1 ? 'Chef' : 'Chefina');
    } else {
      out.push(x % 2 === 1 ? 'Chef' : 'Chefina');
    }
  }
  console.log(out.join('\n'));
}

function main() {}

solve();
