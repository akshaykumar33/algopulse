const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let minL = Infinity;
    let costMinL = Infinity;
    let maxR = -Infinity;
    let costMaxR = Infinity;
    let maxLen = 0;
    let costMaxLen = Infinity;

    for (let i = 0; i < n; i++) {
      const l = parseInt(input[ptr++], 10);
      const r = parseInt(input[ptr++], 10);
      const c = parseInt(input[ptr++], 10);

      if (l < minL) {
        minL = l;
        costMinL = c;
      } else if (l === minL) {
        if (c < costMinL) costMinL = c;
      }

      if (r > maxR) {
        maxR = r;
        costMaxR = c;
      } else if (r === maxR) {
        if (c < costMaxR) costMaxR = c;
      }

      const len = r - l + 1;
      if (len > maxLen) {
        maxLen = len;
        costMaxLen = c;
      } else if (len === maxLen) {
        if (c < costMaxLen) costMaxLen = c;
      }

      let ans = costMinL + costMaxR;
      if (maxLen === maxR - minL + 1) {
        if (costMaxLen < ans) ans = costMaxLen;
      }
      out.push(ans);
    }
  }
  console.log(out.join('\n'));
}

solve();
