const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lines = [];
let resolver = null;

rl.on('line', (l) => {
  if (resolver) {
    const r = resolver;
    resolver = null;
    r(l);
  } else {
    lines.push(l);
  }
});

function readLine() {
  if (lines.length > 0) return Promise.resolve(lines.shift());
  return new Promise((res) => {
    resolver = res;
  });
}

async function solve() {
  const tLine = await readLine();
  if (!tLine) return;
  const t = parseInt(tLine.trim(), 10);

  for (let tc = 0; tc < t; tc++) {
    const nLine = await readLine();
    if (!nLine) break;
    const n = parseInt(nLine.trim(), 10);
    const arrLine = await readLine();
    const arr = arrLine.trim().split(/\s+/).map(Number);
    const set = new Set(arr);

    let mex = 0;
    while (set.has(mex)) {
      mex++;
    }

    console.log(mex);

    while (true) {
      const resp = await readLine();
      const y = parseInt(resp.trim(), 10);
      if (y === -1 || y === -2) break;
      console.log(y);
    }
  }

  process.exit(0);
}

solve();
