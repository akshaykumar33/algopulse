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

  const cnt = new Int32Array(32);
  const pow2 = new Float64Array(32);
  let curPow = 1;
  for (let k = 0; k <= 30; k++) {
    pow2[k] = curPow;
    curPow *= 2;
  }

  for (let i = 0; i < n; i++) {
    const val = nextInt();
    const k = 31 - Math.clz32(val);
    cnt[k]++;
  }

  const out = [];
  for (let j = 0; j < q; j++) {
    let rem = nextInt();
    let ans = 0;
    for (let k = 30; k >= 0; k--) {
      if (rem === 0) break;
      const val = pow2[k];
      if (rem >= val && cnt[k] > 0) {
        const take = Math.min(cnt[k], Math.floor(rem / val));
        rem -= take * val;
        ans += take;
      }
    }
    if (rem === 0) {
      out.push(ans);
    } else {
      out.push(-1);
    }
  }

  console.log(out.join('\n'));
}

solve();
