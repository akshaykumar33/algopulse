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
  const n = readInt();
  const a = new Array(n + 1);
  for (let i = 1; i <= n; i++) a[i] = readInt();
  const dp = new Int32Array(n + 1);
  const dq = new Int32Array(n + 1);
  const col = new Int32Array(n + 1);
  let ans = 0;
  for (let k = 0; k < n; k++) {
    for (let j = 1; j <= n; j++) col[j] = j <= k ? n - k + j : j - k;
    let tl = 0;
    dp[1] = 0;
    dq[tl++] = 1;
    for (let j = 2; j <= n; j++) {
      const lo = j - a[col[j]];
      let l = 0, r = tl - 1;
      while (l < r) {
        const md = (l + r) >> 1;
        if (dq[md] >= lo) r = md; else l = md + 1;
      }
      dp[j] = dp[dq[l]] + 1;
      while (tl > 0 && dp[dq[tl - 1]] >= dp[j]) tl--;
      dq[tl++] = j;
    }
    ans += dp[n];
  }
  print(ans);
}

solve();
printAll();
