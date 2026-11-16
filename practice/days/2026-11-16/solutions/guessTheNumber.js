const readline = require('readline');

async function solve() {
  const rl = readline.createInterface({
    input: process.stdin
  });
  const it = rl[Symbol.asyncIterator]();

  const first = await it.next();
  if (first.done) return;
  const t = parseInt(first.value.trim(), 10);

  for (let tc = 0; tc < t; tc++) {
    for (let i = 1; i <= 1000; i++) {
      const q = i * i;
      console.log(q);
      const resLine = await it.next();
      if (resLine.done) return;
      const res = parseInt(resLine.value.trim(), 10);
      if (res === 1) break;
      if (res === -1) process.exit(0);
    }
  }
  process.exit(0);
}

solve();
