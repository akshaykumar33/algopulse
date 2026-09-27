const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function nextInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let res = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      res = res * 10 + (buffer[offset] - 48);
      offset++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];


  const MAX_PAIRS = 2000000;
  const xorBuffer = new Int32Array(MAX_PAIRS);

  function quickselect(arr, totalLen, k) {
    let left = 0, right = totalLen - 1;
    while (left < right) {
      const pivotIdx = left + ((Math.random() * (right - left + 1)) | 0);
      const pivot = arr[pivotIdx];
      let i = left, j = right;
      while (i <= j) {
        while (arr[i] < pivot) i++;
        while (arr[j] > pivot) j--;
        if (i <= j) {
          const tmp = arr[i];
          arr[i] = arr[j];
          arr[j] = tmp;
          i++;
          j--;
        }
      }
      if (k <= j) {
        right = j;
      } else if (k >= i) {
        left = i;
      } else {
        break;
      }
    }
  }

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const q = nextInt();
    if (n === null || q === null) break;

    let cur = new Int32Array(n);
    let minVal = 2147483647;
    let maxVal = 0;

    for (let i = 0; i < n; i++) {
      const val = nextInt();
      cur[i] = val;
      if (val < minVal) minVal = val;
      if (val > maxVal) maxVal = val;
    }

    const history = [];
    history.push(maxVal - minVal);

    
    const totalPairs = (n * (n - 1)) / 2;
    while (history[history.length - 1] > 0) {
      let idx = 0;
      for (let i = 0; i < n; i++) {
        const valI = cur[i];
        for (let j = i + 1; j < n; j++) {
          xorBuffer[idx++] = valI ^ cur[j];
        }
      }

      quickselect(xorBuffer, totalPairs, n);

      const nextCur = new Int32Array(n);
      for (let i = 0; i < n; i++) {
        nextCur[i] = xorBuffer[i];
      }
      nextCur.sort();

      let curMin = nextCur[0];
      let curMax = nextCur[n - 1];
      history.push(curMax - curMin);
      cur = nextCur;
    }

    const historyLen = history.length;
    for (let qi = 0; qi < q; qi++) {
      const x = nextInt();
      if (x < historyLen) {
        out.push(history[x]);
      } else {
        out.push(0);
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
