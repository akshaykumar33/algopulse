const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const exams = [];
  for (let i = 0; i < n; i++) {
    const a = parseInt(input[ptr++], 10);
    const b = parseInt(input[ptr++], 10);
    exams.push([a, b]);
  }

  exams.sort((x, y) => {
    if (x[0] !== y[0]) return x[0] - y[0];
    return x[1] - y[1];
  });

  let last = -1;
  for (let i = 0; i < n; i++) {
    const [a, b] = exams[i];
    if (b >= last) {
      last = b;
    } else {
      last = a;
    }
  }

  console.log(last);
}

solve();
