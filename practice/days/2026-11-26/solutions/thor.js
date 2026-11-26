'use strict';
const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const n = nextInt();
  if (n === null) return;
  const q = nextInt();

  const appNotifs = Array.from({ length: n + 1 }, () => []);
  const appPtr = new Int32Array(n + 1);
  const isRead = new Uint8Array(q + 1);

  let totalNotifs = 0;
  let unread = 0;
  let maxReadT = 0;
  const out = [];

  for (let qi = 0; qi < q; qi++) {
    const type = nextInt();
    if (type === 1) {
      const x = nextInt();
      totalNotifs++;
      appNotifs[x].push(totalNotifs);
      unread++;
    } else if (type === 2) {
      const x = nextInt();
      const list = appNotifs[x];
      while (appPtr[x] < list.length) {
        const id = list[appPtr[x]++];
        if (!isRead[id]) {
          isRead[id] = 1;
          unread--;
        }
      }
    } else {
      const t = nextInt();
      while (maxReadT < t) {
        maxReadT++;
        if (!isRead[maxReadT]) {
          isRead[maxReadT] = 1;
          unread--;
        }
      }
    }
    out.push(unread);
  }

  console.log(out.join('\n'));
}

solve();
