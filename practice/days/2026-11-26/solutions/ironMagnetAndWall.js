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
    let matched = 0;
    let currentSegmentStart = 0;
    for (let i = 0; i <= n; i++) {
      if (i === n || s[i] === 'X') {
        const segment = s.substring(currentSegmentStart, i);
        const irons = [];
        const magnets = [];
        const sheetsBefore = new Array(segment.length + 1).fill(0);
        for (let j = 0; j < segment.length; j++) {
          sheetsBefore[j + 1] = sheetsBefore[j] + (segment[j] === ':' ? 1 : 0);
          if (segment[j] === 'I') {
            irons.push(j);
          } else if (segment[j] === 'M') {
            magnets.push(j);
          }
        }
        let ironPointer = 0;
        let magnetPointer = 0;
        while (ironPointer < irons.length && magnetPointer < magnets.length) {
          const iPos = irons[ironPointer];
          const mPos = magnets[magnetPointer];
          const dist = Math.abs(iPos - mPos);
          const lo = Math.min(iPos, mPos);
          const hi = Math.max(iPos, mPos);
          const sh = sheetsBefore[hi + 1] - sheetsBefore[lo];
          const power = k + 1 - dist - sh;
          if (power > 0) {
            matched++;
            ironPointer++;
            magnetPointer++;
          } else {
            if (iPos < mPos) {
              ironPointer++; 
            } else {
              magnetPointer++;
            }
          }
        }
        currentSegmentStart = i + 1;
      }
    }
    print(matched);
  }
}
solve();
printAll();
