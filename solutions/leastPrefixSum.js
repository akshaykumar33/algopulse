const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  class Heap {
    constructor(cmp) {
      this.data = [];
      this.cmp = cmp;
    }
    push(v) {
      this.data.push(v);
      let i = this.data.length - 1;
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (this.cmp(this.data[i], this.data[p])) {
          const tmp = this.data[i];
          this.data[i] = this.data[p];
          this.data[p] = tmp;
          i = p;
        } else break;
      }
    }
    pop() {
      if (!this.data.length) return null;
      const top = this.data[0];
      const bot = this.data.pop();
      if (this.data.length > 0) {
        this.data[0] = bot;
        let i = 0;
        while (true) {
          let best = i;
          const l = 2 * i + 1;
          const r = 2 * i + 2;
          if (l < this.data.length && this.cmp(this.data[l], this.data[best])) best = l;
          if (r < this.data.length && this.cmp(this.data[r], this.data[best])) best = r;
          if (best !== i) {
            const tmp = this.data[i];
            this.data[i] = this.data[best];
            this.data[best] = tmp;
            i = best;
          } else break;
        }
      }
      return top;
    }
    size() {
      return this.data.length;
    }
  }

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const a = new Array(n + 1);
    for (let i = 1; i <= n; i++) a[i] = parseInt(tokens[ptr++], 10);
    let ans = 0;
    let sum = 0;
    const maxH = new Heap((x, y) => x > y);
    for (let i = m; i >= 2; i--) {
      sum += a[i];
      maxH.push(a[i]);
      while (sum > 0) {
        const top = maxH.pop();
        sum -= 2 * top;
        ans++;
      }
    }
    sum = 0;
    const minH = new Heap((x, y) => x < y);
    for (let i = m + 1; i <= n; i++) {
      sum += a[i];
      minH.push(a[i]);
      while (sum < 0) {
        const top = minH.pop();
        sum -= 2 * top;
        ans++;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}
