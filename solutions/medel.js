const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let i = 0; i < t; i++) {
    const n = parseInt(input[ptr++], 10);
    const arr = [];
    for (let j = 0; j < n; j++) {
      arr.push(parseInt(input[ptr++], 10));
    }
    let minVal = arr[0];
    let maxVal = arr[0];
    for (let j = 1; j < n; j++) {
      if (arr[j] < minVal) minVal = arr[j];
      if (arr[j] > maxVal) maxVal = arr[j];
    }
    let minIdx = -1;
    let maxIdx = -1;
    for (let j = 0; j < n; j++) {
      if (arr[j] === minVal && minIdx === -1) minIdx = j;
      if (arr[j] === maxVal && maxIdx === -1) maxIdx = j;
    }
    if (minIdx < maxIdx) {
      out.push(minVal + ' ' + maxVal);
    } else {
      out.push(maxVal + ' ' + minVal);
    }
  }
  console.log(out.join('\n'));
}

solve();
