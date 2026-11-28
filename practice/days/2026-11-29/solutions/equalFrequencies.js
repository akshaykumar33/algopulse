const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const t = readInt();
  for (let tc = 0; tc < t; tc++) {
    const n = readInt();
    const s = readLine().trim();
    const cnt = new Array(26).fill(0);
    for (let i = 0; i < n; i++) cnt[s.charCodeAt(i) - 97]++;
    const ord = [...Array(26).keys()].sort((x, y) => cnt[y] - cnt[x]);
    let best = -1, bk = 0;
    for (let k = 1; k <= 26; k++) {
      if (n % k) continue;
      const f = n / k;
      let keep = 0;
      for (let i = 0; i < k; i++) keep += Math.min(cnt[ord[i]], f);
      if (keep > best) { best = keep; bk = k; }
    }
    const f = n / bk;
    const need = new Array(26).fill(0);
    for (let i = 0; i < bk; i++) need[ord[i]] = f;
    const res = s.split("");
    const used = new Array(26).fill(0);
    const free = [];
    for (let i = 0; i < n; i++) {
      const c = s.charCodeAt(i) - 97;
      if (used[c] < need[c]) used[c]++;
      else free.push(i);
    }
    let p = 0;
    for (let c = 0; c < 26; c++) {
      while (used[c] < need[c]) { res[free[p++]] = String.fromCharCode(97 + c); used[c]++; }
    }
    print(n - best);
    print(res.join(""));
  }
}

solve();
printAll();
