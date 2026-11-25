const fs = require('fs');
const buf = fs.readFileSync(0);
let pos = 0;
const len = buf.length;

function nextInt() {
  while (pos < len && buf[pos] <= 32) pos++;
  if (pos >= len) return 0;
  let res = 0;
  while (pos < len && buf[pos] > 32) {
    res = res * 10 + (buf[pos] - 48);
    pos++;
  }
  return res;
}

function solve() {
  const t = nextInt();
  const out = [];
  for (let tc = 1; tc <= t; tc++) {
    const m = nextInt();
    const n = nextInt();
    const k = nextInt();
    const w = n - k + 1;
    const h = m - k + 1;
    const rowMax = Array.from({ length: m }, () => new Int32Array(w));
    const rowCnt = Array.from({ length: m }, () => new Int32Array(w));
    const dq = new Int32Array(Math.max(m, n) + 5);
    const row = new Int32Array(n);

    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) row[c] = nextInt();
      let head = 0, tail = 0, p = 0;
      for (let c = 0; c < n; c++) {
        if (tail > head && dq[head] <= c - k) {
          head++;
          if (p < head) p = head;
        }
        const cur = row[c];
        while (tail > head && row[dq[tail - 1]] < cur) {
          tail--;
          if (tail < p) p = tail;
        }
        dq[tail++] = c;
        if (c >= k - 1) {
          const mx = row[dq[head]];
          while (p < tail && row[dq[p]] === mx) p++;
          rowMax[r][c - k + 1] = mx;
          rowCnt[r][c - k + 1] = p - head;
        }
      }
    }

    const ansMax = Array.from({ length: h }, () => new Int32Array(w));
    const ansCnt = Array.from({ length: h }, () => new Int32Array(w));

    for (let c = 0; c < w; c++) {
      let head = 0, tail = 0, p = 0, sumCnt = 0;
      for (let r = 0; r < m; r++) {
        if (tail > head && dq[head] <= r - k) {
          if (head < p) sumCnt -= rowCnt[dq[head]][c];
          head++;
          if (p < head) {
            p = head;
            sumCnt = 0;
          }
        }
        const cur = rowMax[r][c];
        while (tail > head && rowMax[dq[tail - 1]][c] < cur) {
          tail--;
          if (tail < p) {
            p--;
            sumCnt -= rowCnt[dq[tail]][c];
          }
        }
        dq[tail++] = r;
        if (r >= k - 1) {
          const mx = rowMax[dq[head]][c];
          while (p < tail && rowMax[dq[p]][c] === mx) {
            sumCnt += rowCnt[dq[p]][c];
            p++;
          }
          ansMax[r - k + 1][c] = mx;
          ansCnt[r - k + 1][c] = sumCnt;
        }
      }
    }

    out.push('Case ' + tc + ':');
    for (let r = 0; r < h; r++) {
      const line = [];
      for (let c = 0; c < w; c++) {
        const mx = ansMax[r][c];
        const cnt = ansCnt[r][c];
        line.push(cnt > 1 ? mx + '(' + cnt + ')' : '' + mx);
      }
      out.push(line.join(' '));
    }
    out.push('');
  }
  console.log(out.join('\n'));
}

solve();
