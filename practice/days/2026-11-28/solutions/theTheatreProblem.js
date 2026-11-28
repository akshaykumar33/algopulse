const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

const perms = [];
const build = (cur, used) => {
  if (cur.length === 4) {
    perms.push(cur.slice());
    return;
  }
  for (let i = 0; i < 4; i++) {
    if (used & (1 << i)) continue;
    cur.push(i);
    build(cur, used | (1 << i));
    cur.pop();
  }
};
build([], 0);

const timeIdx = { 12: 0, 3: 1, 6: 2, 9: 3 };

function solve() {
  const T = readInt();
  let total = 0;
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const cnt = Array.from({ length: 4 }, () => new Array(4).fill(0));
    for (let i = 0; i < n; i++) {
      const [m, tm] = readLine().trim().split(/\s+/);
      cnt[m.charCodeAt(0) - 65][timeIdx[tm]]++;
    }
    let best = -Infinity;
    for (const mv of perms) {
      for (const pr of perms) {
        let cur = 0;
        for (let s = 0; s < 4; s++) {
          const c = cnt[mv[s]][s];
          cur += c ? c * (pr[s] + 1) * 25 : -100;
        }
        if (cur > best) best = cur;
      }
    }
    print(best);
    total += best;
  }
  print(total);
}

solve();
printAll();
