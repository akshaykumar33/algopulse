const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 6 || input[0] === '') return;

  const x1 = parseInt(input[0], 10);
  const y1 = parseInt(input[1], 10);
  const x2 = parseInt(input[2], 10);
  const y2 = parseInt(input[3], 10);
  const x3 = parseInt(input[4], 10);
  const y3 = parseInt(input[5], 10);

  const out = [
    3,
    `${x1 + x2 - x3} ${y1 + y2 - y3}`,
    `${x1 + x3 - x2} ${y1 + y3 - y2}`,
    `${x2 + x3 - x1} ${y2 + y3 - y1}`,
  ];

  console.log(out.join('\n'));
}

solve();
