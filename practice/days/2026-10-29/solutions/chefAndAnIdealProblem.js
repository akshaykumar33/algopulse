const fs = require('fs');

function solve() {
  process.stdout.write('3\n');
  const buf = Buffer.alloc(128);
  const bytesRead = fs.readSync(0, buf);
  if (bytesRead > 0) {
    const y = parseInt(buf.toString('utf-8', 0, bytesRead).trim(), 10);
    const z = 6 - 3 - y;
    process.stdout.write(z + '\n');
  }
}

solve();
