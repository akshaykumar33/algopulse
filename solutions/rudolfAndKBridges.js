const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let sign = 1;
    if (buf[pos] === 45) { sign = -1; pos++; }
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res * sign;
  }
  const t = nextInt();
  if (t === null) return;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const m = nextInt();
    const k = nextInt();
    const d = nextInt();
    const rowCost = new Float64Array(n);
    const q = new Int32Array(m + 1);
    for (let i = 0; i < n; i++) {
      const dp = new Float64Array(m);
      let head = 0, tail = 0;
      for (let j = 0; j < m; j++) {
        const a = nextInt();
        if (j === 0) {
          dp[0] = 1;
          q[tail++] = 0;
        } else {
          while (head < tail && q[head] < j - d - 1) head++;
          dp[j] = dp[q[head]] + a + 1;
          while (tail > head && dp[q[tail - 1]] >= dp[j]) tail--;
          q[tail++] = j;
        }
      }
      rowCost[i] = dp[m - 1];
    }
    let curSum = 0;
    for (let i = 0; i < k; i++) curSum += rowCost[i];
    let minSum = curSum;
    for (let i = k; i < n; i++) {
      curSum += rowCost[i] - rowCost[i - k];
      if (curSum < minSum) minSum = curSum;
    }
    out.push(minSum);
  }
  console.log(out.join('\n'));
}

solve();
