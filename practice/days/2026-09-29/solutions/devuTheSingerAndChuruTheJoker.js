const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

function solve() {
  const [n, d] = readIntArray();
  const t = readIntArray();
  const sumSongs = t.reduce((acc, v) => acc + v, 0);
  const minRequired = sumSongs + 10 * (n - 1);
  if (minRequired > d) {
    console.log(-1);
  } else {
    console.log(Math.floor((d - sumSongs) / 5));
  }
}

solve();
