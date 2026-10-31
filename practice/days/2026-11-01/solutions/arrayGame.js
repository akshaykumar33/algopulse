const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(parseInt(tokens[ptr++], 10));
    }

    if (k >= 3) {
      out.push(0);
      continue;
    }

    arr.sort((a, b) => a - b);
    let ans = arr[0];
    for (let i = 0; i < n - 1; i++) {
      ans = Math.min(ans, arr[i + 1] - arr[i]);
    }

    if (k === 1) {
      out.push(ans);
      continue;
    }

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < i; j++) {
        const diff = arr[i] - arr[j];
        ans = Math.min(ans, diff);
        
        let l = 0, r = n - 1;
        while (l <= r) {
          const mid = (l + r) >> 1;
          if (arr[mid] === diff) {
            ans = 0;
            break;
          } else if (arr[mid] < diff) {
            ans = Math.min(ans, diff - arr[mid]);
            l = mid + 1;
          } else {
            ans = Math.min(ans, arr[mid] - diff);
            r = mid - 1;
          }
        }
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
