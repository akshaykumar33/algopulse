const readline = require('readline');

async function solve() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const it = rl[Symbol.asyncIterator]();

  async function nextLine() {
    const res = await it.next();
    return res.done ? null : res.value.trim();
  }

  const line1 = await nextLine();
  if (!line1) return;
  const n = parseInt(line1.split(/\s+/)[0], 10);

  async function ask(l, r) {
    console.log(`? ${l} ${r}`);
    const ansStr = await nextLine();
    return parseInt(ansStr, 10);
  }

  const s13 = await ask(1, 3);
  const s12 = await ask(1, 2);
  const s23 = await ask(2, 3);

  const a = new Array(n + 1);
  a[3] = s13 - s12;
  a[1] = s13 - s23;
  a[2] = s12 - a[1];

  let prevSum = s13;
  for (let i = 4; i <= n; i++) {
    const curSum = await ask(1, i);
    a[i] = curSum - prevSum;
    prevSum = curSum;
  }

  console.log(`! ${a.slice(1).join(' ')}`);
  rl.close();
}

solve();
