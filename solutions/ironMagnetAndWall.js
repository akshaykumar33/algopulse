const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;
const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);
const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const [n, k] = readIntArray();
    const s = readLine().trim();
    const segments = s.split('X');
    let matched = 0;
    for (const seg of segments) {
      const irons = [];
      const magnets = [];
      let sheets = 0;
      let sheetsBefore = new Array(seg.length).fill(0);
      let sc = 0;
      for (let i = 0; i < seg.length; i++) {
        if (seg[i] === ':') sc++;
        sheetsBefore[i] = sc;
      }
      for (let i = 0; i < seg.length; i++) {
        if (seg[i] === 'I') irons.push(i);
        else if (seg[i] === 'M') magnets.push(i);
      }
      const usedI = new Array(irons.length).fill(false);
      for (const mi of magnets) {
        for (let ii = 0; ii < irons.length; ii++) {
          if (usedI[ii]) continue;
          const fi = irons[ii];
          const dist = Math.abs(fi - mi);
          const lo = Math.min(fi, mi), hi = Math.max(fi, mi);
          let sh = 0;
          for (let p = lo; p <= hi; p++) if (seg[p] === ':') sh++;
          const power = k + 1 - dist - sh;
          if (power > 0) { usedI[ii] = true; matched++; break; }
        }
      }
    }
    print(matched);
  }
}

solve();
printAll();
