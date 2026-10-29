const fs = require('fs');

function solve() {
  let input;
  try {
    input = fs.readFileSync('input.txt', 'utf-8').trim().split(/\s+/);
  } catch {
    input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  }
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const total = 2 * n;
  const map = new Map();

  for (let i = 1; i <= total; i++) {
    const val = parseInt(input[ptr++], 10);
    let list = map.get(val);
    if (!list) {
      list = [];
      map.set(val, list);
    }
    list.push(i);
  }

  for (const list of map.values()) {
    if ((list.length & 1) === 1) {
      try {
        fs.writeFileSync('output.txt', '-1\n');
      } catch {}
      console.log('-1');
      return;
    }
  }

  const out = [];
  for (const list of map.values()) {
    for (let i = 0; i < list.length; i += 2) {
      out.push(list[i] + ' ' + list[i + 1]);
    }
  }
  const res = out.join('\n');
  try {
    fs.writeFileSync('output.txt', res + '\n');
  } catch {}
  console.log(res);
}

solve();
