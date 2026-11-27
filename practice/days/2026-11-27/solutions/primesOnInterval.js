const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  const a = parseInt(tokens[0], 10);
  const b = parseInt(tokens[1], 10);
  const k = parseInt(tokens[2], 10);
  const isP = new Uint8Array(b + 1).fill(1);
  isP[0] = isP[1] = 0;
  for (let i = 2; i * i <= b; i++) {
    if (isP[i]) {
      for (let j = i * i; j <= b; j += i) isP[j] = 0;
    }
  }
  const pref = new Int32Array(b + 1);
  for (let i = 1; i <= b; i++) pref[i] = pref[i - 1] + isP[i];
  function check(len) {
    for (let x = a; x <= b - len + 1; x++) {
      if (pref[x + len - 1] - pref[x - 1] < k) return false;
    }
    return true;
  }
  let lo = 1, hi = b - a + 1, ans = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (check(mid)) {
      ans = mid;
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }
  console.log(ans);
}
