const fs = require('fs');

function solve() {
  const data = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (data.length === 0 || data[0] === '') return;
  const n = parseInt(data[0], 10);
  const cnt = new Int32Array(100005);
  const freqCnt = new Int32Array(100005);
  let distinct = 0;
  let maxF = 0;
  let ans = 1;
  for (let i = 1; i <= n; i++) {
    const c = parseInt(data[i], 10);
    const oldF = cnt[c];
    if (oldF === 0) {
      distinct++;
    } else {
      freqCnt[oldF]--;
    }
    const newF = oldF + 1;
    cnt[c] = newF;
    freqCnt[newF]++;
    if (newF > maxF) maxF = newF;
    let ok = false;
    if (distinct === 1 || maxF === 1) {
      ok = true;
    } else if (freqCnt[1] === 1 && freqCnt[maxF] === distinct - 1) {
      ok = true;
    } else if (freqCnt[maxF] === 1 && freqCnt[maxF - 1] === distinct - 1) {
      ok = true;
    }
    if (ok) ans = i;
  }
  console.log(ans);
}

solve();
