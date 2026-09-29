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
    const [a1, a2, a4, a5] = readIntArray();
    const candidates = [a1 + a2, a4 - a2, a5 - a4];
    let maxScore = 0;

    for (const a3 of candidates) {
      let score = 0;
      if (a3 === a1 + a2) score++;
      if (a4 === a2 + a3) score++;
      if (a5 === a3 + a4) score++;
      if (score > maxScore) maxScore = score;
    }

    print(maxScore);
  }
}

solve();
printAll();
