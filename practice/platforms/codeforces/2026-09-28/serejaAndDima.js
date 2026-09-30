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
  const n = readInt();
  const a = readIntArray();
  let left = 0;
  let right = n - 1;
  let sereja = 0;
  let dima = 0;
  let turn = 0; // 0: Sereja, 1: Dima

  while (left <= right) {
    let picked;
    if (a[left] >= a[right]) {
      picked = a[left];
      left++;
    } else {
      picked = a[right];
      right--;
    }

    if (turn === 0) {
      sereja += picked;
      turn = 1;
    } else {
      dima += picked;
      turn = 0;
    }
  }

  print(sereja + ' ' + dima);
}

solve();
printAll();
