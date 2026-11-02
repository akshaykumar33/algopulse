const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf.charCodeAt(pos) <= 32) pos++;
    if (pos >= buf.length) return null;
    let start = pos;
    while (pos < buf.length && buf.charCodeAt(pos) > 32) pos++;
    return parseInt(buf.slice(start, pos), 10);
  }

  const n = nextInt();
  if (n === null) return;
  const out = [];

  const labels = [
    'Beginner',
    'Junior Developer',
    'Middle Developer',
    'Senior Developer',
    'Hacker',
    'Jeff Dean'
  ];

  for (let i = 0; i < n; i++) {
    let s = 0;
    for (let j = 0; j < 5; j++) {
      s += nextInt();
    }
    out.push(labels[s]);
  }

  console.log(out.join('\n'));
}

solve();

