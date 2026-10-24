const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(input[ptr++], 10);
    }

    const seenTotal = new Uint8Array(n + 2);
    for (let i = 0; i < n; i++) {
      if (a[i] <= n) seenTotal[a[i]] = 1;
    }
    let totalMex = 0;
    while (seenTotal[totalMex]) totalMex++;

    const seenPref = new Uint8Array(n + 2);
    let curPrefMex = 0;
    let splitIdx = -1;

    for (let i = 0; i < n; i++) {
      if (a[i] <= n) seenPref[a[i]] = 1;
      while (seenPref[curPrefMex]) curPrefMex++;
      if (curPrefMex === totalMex) {
        splitIdx = i;
        break;
      }
    }

    if (splitIdx === -1 || splitIdx === n - 1) {
      out.push(-1);
      continue;
    }

    const seenSuf = new Uint8Array(n + 2);
    let curSufMex = 0;
    for (let i = splitIdx + 1; i < n; i++) {
      if (a[i] <= n) seenSuf[a[i]] = 1;
    }
    while (seenSuf[curSufMex]) curSufMex++;

    if (curSufMex === totalMex) {
      out.push(2);
      out.push(`1 ${splitIdx + 1}`);
      out.push(`${splitIdx + 2} ${n}`);
    } else {
      out.push(-1);
    }
  }

  console.log(out.join('\n'));
}

solve();
