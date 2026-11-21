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
  const k = nextInt();
  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = nextInt();
  const interesting = new Uint8Array(n);
  const workers = [];
  for (let w = 0; w < k; w++) workers.push({ id: -1, prog: 0, total: 0 });
  let nextTask = 0;
  let finished = 0;
  for (let w = 0; w < k && nextTask < n; w++) {
    workers[w] = { id: nextTask, prog: 0, total: a[nextTask] };
    nextTask++;
  }
  while (finished < n) {
    const d = Math.round((100 * finished) / n);
    for (let w = 0; w < k; w++) {
      if (workers[w].id !== -1) {
        if (workers[w].prog + 1 === d) {
          interesting[workers[w].id] = 1;
        }
      }
    }
    for (let w = 0; w < k; w++) {
      if (workers[w].id !== -1) {
        workers[w].prog++;
        if (workers[w].prog === workers[w].total) {
          finished++;
          if (nextTask < n) {
            workers[w] = { id: nextTask, prog: 0, total: a[nextTask] };
            nextTask++;
          } else {
            workers[w] = { id: -1, prog: 0, total: 0 };
          }
        }
      }
    }
  }
  let count = 0;
  for (let i = 0; i < n; i++) if (interesting[i]) count++;
  console.log(count);
}
solve();