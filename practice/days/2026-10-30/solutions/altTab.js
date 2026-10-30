const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const programs = [];
  for (let i = 0; i < n; i++) {
    programs.push(input[ptr++]);
  }

  const seen = new Set();
  const suffixes = [];

  for (let i = n - 1; i >= 0; i--) {
    const prog = programs[i];
    if (!seen.has(prog)) {
      seen.add(prog);
      suffixes.push(prog.slice(-2));
    }
  }

  console.log(suffixes.join(''));
}

solve();
