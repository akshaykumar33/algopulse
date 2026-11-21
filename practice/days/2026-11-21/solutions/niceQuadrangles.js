const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const cnt = Array.from({ length: 4 }, () => [
      [0n, 0n],
      [0n, 0n]
    ]);

    for (let i = 0; i < n; i++) {
      const x = parseInt(input[ptr++], 10);
      const y = parseInt(input[ptr++], 10);
      let q = -1;
      if (x > 0 && y > 0) q = 0;
      else if (x > 0 && y < 0) q = 1;
      else if (x < 0 && y < 0) q = 2;
      else if (x < 0 && y > 0) q = 3;
      if (q === -1) continue;
      const px = Math.abs(x) % 2;
      const py = Math.abs(y) % 2;
      cnt[q][px][py]++;
    }

    let total = 0n;
    for (let ax = 0; ax < 2; ax++) {
      for (let ay = 0; ay < 2; ay++) {
        if (cnt[0][ax][ay] === 0n) continue;
        for (let bx = 0; bx < 2; bx++) {
          for (let by = 0; by < 2; by++) {
            if (cnt[1][bx][by] === 0n) continue;
            for (let cx = 0; cx < 2; cx++) {
              for (let cy = 0; cy < 2; cy++) {
                if (cnt[2][cx][cy] === 0n) continue;
                for (let dx = 0; dx < 2; dx++) {
                  for (let dy = 0; dy < 2; dy++) {
                    if (cnt[3][dx][dy] === 0n) continue;
                    const term = (ax * by - ay * bx + bx * cy - by * cx + cx * dy - cy * dx + dx * ay - dy * ax);
                    if (Math.abs(term) % 2 === 0) {
                      total += cnt[0][ax][ay] * cnt[1][bx][by] * cnt[2][cx][cy] * cnt[3][dx][dy];
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    out.push(total.toString());
  }
  console.log(out.join('\n'));
}
solve();