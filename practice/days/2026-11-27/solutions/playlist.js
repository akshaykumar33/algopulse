const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const k = parseInt(tokens[ptr++], 10);
  const songs = new Array(n);
  for (let i = 0; i < n; i++) {
    songs[i] = { t: BigInt(tokens[ptr++]), b: BigInt(tokens[ptr++]) };
  }
  songs.sort((x, y) => (x.b > y.b ? -1 : x.b < y.b ? 1 : 0));

  class MinHeap {
    constructor() { this.d = []; }
    push(v) {
      this.d.push(v);
      let i = this.d.length - 1;
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (this.d[i] < this.d[p]) {
          const t = this.d[i]; this.d[i] = this.d[p]; this.d[p] = t;
          i = p;
        } else break;
      }
    }
    pop() {
      const top = this.d[0];
      const bot = this.d.pop();
      if (this.d.length > 0) {
        this.d[0] = bot;
        let i = 0;
        while (true) {
          let b = i;
          const l = 2 * i + 1, r = 2 * i + 2;
          if (l < this.d.length && this.d[l] < this.d[b]) b = l;
          if (r < this.d.length && this.d[r] < this.d[b]) b = r;
          if (b !== i) {
            const t = this.d[i]; this.d[i] = this.d[b]; this.d[b] = t;
            i = b;
          } else break;
        }
      }
      return top;
    }
    size() { return this.d.length; }
  }

  const heap = new MinHeap();
  let sumT = 0n;
  let maxPleasure = 0n;
  for (let i = 0; i < n; i++) {
    heap.push(songs[i].t);
    sumT += songs[i].t;
    if (heap.size() > k) {
      sumT -= heap.pop();
    }
    const cur = sumT * songs[i].b;
    if (cur > maxPleasure) maxPleasure = cur;
  }
  console.log(maxPleasure.toString());
}
