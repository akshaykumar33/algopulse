const fs = require('fs');
const buffer = fs.readFileSync(0);
let offset = 0;

function nextInt() {
  while (offset < buffer.length && buffer[offset] <= 32) offset++;
  let res = 0;
  while (offset < buffer.length && buffer[offset] > 32) {
    res = res * 10 + (buffer[offset] - 48);
    offset++;
  }
  return res;
}

const output = [];

function solve() {
  const T = nextInt();

  for (let t = 0; t < T; t++) {
    const n = nextInt();
    const xs = new Array(n);
    const ys = new Array(n);
    let maxInit = 0;
    let total = 0;

    for (let i = 0; i < n; i++) {
      const x = nextInt();
      const y = nextInt();
      xs[i] = x;
      ys[i] = y;
      if (x > maxInit) maxInit = x;
      total += y;
    }

    
    const LIMIT = n + 48;
    if (maxInit > LIMIT) {
      output.push(maxInit);
      continue;
    }

    
    const cnt = new Float64Array(LIMIT + 2);
    for (let i = 0; i < n; i++) {
      if (xs[i] <= LIMIT) cnt[xs[i]] = ys[i];
    }
    const pre = new Float64Array(LIMIT + 3);
    for (let v = 0; v <= LIMIT + 1; v++) pre[v + 1] = pre[v] + cnt[v];

    const can = (M) => {
      if (M <= 2) return total >= M;

      
      let excess = total - pre[M];
      let deficit = 0;

      for (let k = M - 1; k >= 2; k--) {
        const req = 1 + deficit;
        const have = cnt[k];
        if (have >= req) {
          excess += have - req;
        } else {
          deficit += req - have;
          if (deficit > total) return false;
        }
      }

      
      
      return cnt[0] + cnt[1] + excess >= 2 * (1 + deficit);
    };

    let low = maxInit + 1;
    let high = LIMIT;
    let best = maxInit;

    while (low <= high) {
      const mid = (low + high) >> 1;
      if (can(mid)) {
        best = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    output.push(best);
  }
}

solve();
process.stdout.write(output.join('\n') + '\n');
