const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = [];
    let p = -1;
    for (let i = 0; i < n; i++) {
      const v = parseInt(input[ptr++], 10);
      a.push(v);
      if (v !== 1 && v !== -1) p = i;
    }

    function getSubRanges(arr) {
      if (arr.length === 0) return [0, 0];
      let minS = 0, maxS = 0;
      let curMin = 0, curMax = 0;
      for (const x of arr) {
        curMax = Math.max(0, curMax + x);
        if (curMax > maxS) maxS = curMax;
        curMin = Math.min(0, curMin + x);
        if (curMin < minS) minS = curMin;
      }
      return [minS, maxS];
    }

    function getSuffRanges(arr) {
      let minS = 0, maxS = 0;
      let s = 0;
      for (let i = arr.length - 1; i >= 0; i--) {
        s += arr[i];
        if (s > maxS) maxS = s;
        if (s < minS) minS = s;
      }
      return [minS, maxS];
    }

    function getPrefRanges(arr) {
      let minS = 0, maxS = 0;
      let s = 0;
      for (let i = 0; i < arr.length; i++) {
        s += arr[i];
        if (s > maxS) maxS = s;
        if (s < minS) minS = s;
      }
      return [minS, maxS];
    }

    const intervals = [];
    if (p === -1) {
      intervals.push(getSubRanges(a));
    } else {
      const left = a.slice(0, p);
      const right = a.slice(p + 1);
      intervals.push(getSubRanges(left));
      intervals.push(getSubRanges(right));
      const [lMin, lMax] = getSuffRanges(left);
      const [rMin, rMax] = getPrefRanges(right);
      intervals.push([a[p] + lMin + rMin, a[p] + lMax + rMax]);
    }

    const set = new Set();
    for (const [l, r] of intervals) {
      for (let v = l; v <= r; v++) set.add(v);
    }
    const sorted = Array.from(set).sort((x, y) => x - y);
    out.push(sorted.length);
    out.push(sorted.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
