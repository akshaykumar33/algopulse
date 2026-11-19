const fs = require('fs');

function solve() {
  fs.writeSync(1, '1\n3 1 1 2\n3 3 4 4\n');
  const buf = Buffer.alloc(128);
  let nRead = 0;
  try {
    nRead = fs.readSync(0, buf, 0, 128, null);
  } catch (e) {}
  if (nRead <= 0) return;
  const s = buf.toString('utf8', 0, nRead).trim();
  const diff = parseInt(s, 10);
  let ans = 5;
  if (diff === 2) ans = 1;
  else if (diff === 1) ans = 2;
  else if (diff === 0) ans = 5;
  else if (diff === -1) ans = 3;
  else if (diff === -2) ans = 4;
  fs.writeSync(1, `2\n${ans}\n`);
}

solve();
