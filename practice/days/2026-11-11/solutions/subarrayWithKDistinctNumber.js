function subarraysWithKDistinct(arr, k) {
  const n = arr.length;
  if (k <= 0 || k > n) return 0;

  let minV = arr[0];
  let maxV = arr[0];
  for (let i = 1; i < n; i++) {
    if (arr[i] < minV) minV = arr[i];
    if (arr[i] > maxV) maxV = arr[i];
  }

  const useArray = maxV - minV <= 200000;
  const freqArr = useArray ? new Int32Array(maxV - minV + 1) : null;

  function atMost(limit) {
    if (limit <= 0) return 0;
    let l = 0;
    let distinct = 0;
    let total = 0;

    if (useArray) {
      freqArr.fill(0);
      for (let r = 0; r < n; r++) {
        const vr = arr[r] - minV;
        if (freqArr[vr] === 0) distinct++;
        freqArr[vr]++;
        while (distinct > limit) {
          const vl = arr[l] - minV;
          freqArr[vl]--;
          if (freqArr[vl] === 0) distinct--;
          l++;
        }
        total += r - l + 1;
      }
    } else {
      const freqMap = new Map();
      for (let r = 0; r < n; r++) {
        const vr = arr[r];
        const cr = freqMap.get(vr) || 0;
        if (cr === 0) distinct++;
        freqMap.set(vr, cr + 1);
        while (distinct > limit) {
          const vl = arr[l];
          const cl = freqMap.get(vl) - 1;
          freqMap.set(vl, cl);
          if (cl === 0) distinct--;
          l++;
        }
        total += r - l + 1;
      }
    }

    return total;
  }

  return atMost(k) - atMost(k - 1);
}

class Solution {
  subarraysWithKDistinct(arr, k) {
    return subarraysWithKDistinct(arr, k);
  }
}

if (typeof require !== 'undefined' && require.main === module) {
  const fs = require('fs');
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (input) {
    const tokens = input.split(/\s+/);
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
      const n = parseInt(tokens[ptr++], 10);
      const k = parseInt(tokens[ptr++], 10);
      const arr = new Int32Array(n);
      for (let i = 0; i < n; i++) {
        arr[i] = parseInt(tokens[ptr++], 10);
      }
      out.push(subarraysWithKDistinct(arr, k));
    }

    console.log(out.join('\n'));
  }
}
