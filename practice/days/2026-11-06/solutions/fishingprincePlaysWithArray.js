const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  function decompose(arr, m) {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
      let v = arr[i];
      let c = 1;
      while (v % m === 0) {
        v = Math.floor(v / m);
        c *= m;
      }
      if (res.length > 0 && res[res.length - 1].val === v) {
        res[res.length - 1].cnt += c;
      } else {
        res.push({ val: v, cnt: c });
      }
    }
    return res;
  }

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const m = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();

    const k = nextInt();
    const b = new Int32Array(k);
    for (let i = 0; i < k; i++) b[i] = nextInt();

    const decA = decompose(a, m);
    const decB = decompose(b, m);

    let same = true;
    if (decA.length !== decB.length) {
      same = false;
    } else {
      for (let i = 0; i < decA.length; i++) {
        if (decA[i].val !== decB[i].val || decA[i].cnt !== decB[i].cnt) {
          same = false;
          break;
        }
      }
    }

    out.push(same ? 'Yes' : 'No');
  }

  console.log(out.join('\n'));
}

solve();

