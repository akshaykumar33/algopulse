const fs = require('fs');

class MaxHeap {
  constructor() {
    this.data = [];
  }
  push(val) {
    this.data.push(val);
    this._up(this.data.length - 1);
  }
  pop() {
    if (this.data.length === 0) return null;
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this._down(0);
    }
    return top;
  }
  size() {
    return this.data.length;
  }
  _up(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.data[p].s < this.data[i].s) {
        const tmp = this.data[p];
        this.data[p] = this.data[i];
        this.data[i] = tmp;
        i = p;
      } else {
        break;
      }
    }
  }
  _down(i) {
    const n = this.data.length;
    while ((i << 1) + 1 < n) {
      let best = (i << 1) + 1;
      const r = best + 1;
      if (r < n && this.data[r].s > this.data[best].s) best = r;
      if (this.data[best].s > this.data[i].s) {
        const tmp = this.data[best];
        this.data[best] = this.data[i];
        this.data[i] = tmp;
        i = best;
      } else {
        break;
      }
    }
  }
}

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let c = 0; c < t; c++) {
    const n = parseInt(tokens[ptr++], 10);
    const d = parseInt(tokens[ptr++], 10);
    const byDay = Array.from({ length: d + 1 }, () => []);
    const orders = [];

    for (let i = 0; i < n; i++) {
      const di = parseInt(tokens[ptr++], 10);
      const ti = parseInt(tokens[ptr++], 10);
      const si = parseInt(tokens[ptr++], 10);
      const item = { d: di, t: ti, s: si };
      orders.push(item);
      if (di <= d) {
        byDay[di].push(item);
      }
    }

    const pq = new MaxHeap();
    for (let day = 1; day <= d; day++) {
      for (let j = 0; j < byDay[day].length; j++) {
        pq.push(byDay[day][j]);
      }
      const top = pq.pop();
      if (top) {
        top.t--;
        if (top.t > 0) {
          pq.push(top);
        }
      }
    }

    let ans = 0n;
    for (let i = 0; i < n; i++) {
      ans += BigInt(orders[i].t) * BigInt(orders[i].s);
    }
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
