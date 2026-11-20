const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);
  const cl = parseInt(input[ptr++], 10);
  const ce = parseInt(input[ptr++], 10);
  const v = parseInt(input[ptr++], 10);

  const stairs = new Int32Array(cl);
  for (let i = 0; i < cl; i++) stairs[i] = parseInt(input[ptr++], 10);
  const elevs = new Int32Array(ce);
  for (let i = 0; i < ce; i++) elevs[i] = parseInt(input[ptr++], 10);

  function lowerBound(arr, val) {
    let l = 0;
    let r = arr.length;
    while (l < r) {
      const mid = (l + r) >> 1;
      if (arr[mid] >= val) r = mid;
      else l = mid + 1;
    }
    return l;
  }

  const q = parseInt(input[ptr++], 10);
  const out = [];

  for (let qi = 0; qi < q; qi++) {
    const x1 = parseInt(input[ptr++], 10);
    const y1 = parseInt(input[ptr++], 10);
    const x2 = parseInt(input[ptr++], 10);
    const y2 = parseInt(input[ptr++], 10);

    if (x1 === x2) {
      out.push(Math.abs(y1 - y2));
      continue;
    }

    let minTime = Infinity;
    const dy = Math.abs(x1 - x2);

    if (cl > 0) {
      const idx = lowerBound(stairs, y1);
      if (idx < cl) {
        const s = stairs[idx];
        const t = Math.abs(y1 - s) + dy + Math.abs(y2 - s);
        if (t < minTime) minTime = t;
      }
      if (idx > 0) {
        const s = stairs[idx - 1];
        const t = Math.abs(y1 - s) + dy + Math.abs(y2 - s);
        if (t < minTime) minTime = t;
      }
    }

    if (ce > 0) {
      const elTime = Math.ceil(dy / v);
      const idx = lowerBound(elevs, y1);
      if (idx < ce) {
        const e = elevs[idx];
        const t = Math.abs(y1 - e) + elTime + Math.abs(y2 - e);
        if (t < minTime) minTime = t;
      }
      if (idx > 0) {
        const e = elevs[idx - 1];
        const t = Math.abs(y1 - e) + elTime + Math.abs(y2 - e);
        if (t < minTime) minTime = t;
      }
    }

    out.push(minTime);
  }

  console.log(out.join('\n'));
}

solve();
