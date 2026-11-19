const fs = require('fs');

function largestRectangleArea(n, a) {
  let maxArea = 0n;
  const stack = [];
  for (let i = 0; i <= n; i++) {
    const curH = i === n ? 0n : BigInt(a[i]);
    while (stack.length > 0 && (i === n || BigInt(a[stack[stack.length - 1]]) > curH)) {
      const topIdx = stack.pop();
      const h = BigInt(a[topIdx]);
      const w = stack.length === 0 ? BigInt(i) : BigInt(i - stack[stack.length - 1] - 1);
      const area = h * w;
      if (area > maxArea) maxArea = area;
    }
    stack.push(i);
  }
  return maxArea;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = new Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(input[ptr++], 10);
    }
    out.push(largestRectangleArea(n, a).toString());
  }

  console.log(out.join('\n'));
}

solve();
