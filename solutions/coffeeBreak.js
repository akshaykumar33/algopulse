const fs = require('fs');
function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const n = nextInt();
  if (n === null) return;
  const m = nextInt();
  const d = nextInt();
  const a = [];
  for (let i = 0; i < n; i++) {
    a.push({ time: nextInt(), id: i });
  }
  a.sort((x, y) => x.time - y.time);
  const qTime = new Int32Array(n + 10);
  const qDay = new Int32Array(n + 10);
  let qh = 0, qt = 0;
  let totalDays = 0;
  const ans = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    const curTime = a[i].time;
    if (qh < qt && qTime[qh] <= curTime) {
      const reusedDay = qDay[qh++];
      ans[a[i].id] = reusedDay;
      qTime[qt] = curTime + d + 1;
      qDay[qt++] = reusedDay;
    } else {
      totalDays++;
      ans[a[i].id] = totalDays;
      qTime[qt] = curTime + d + 1;
      qDay[qt++] = totalDays;
    }
  }
  console.log(totalDays);
  console.log(ans.join(' '));
}
solve();