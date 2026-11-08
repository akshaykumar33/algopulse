const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3 || input[0] === '') return;
  const a = parseInt(input[0], 10);
  const x = parseInt(input[1], 10);
  const y = parseInt(input[2], 10);

  if (y <= 0 || y % a === 0) {
    console.log(-1);
    return;
  }

  const k = Math.floor(y / a) + 1;
  if (k === 1) {
    if (2 * Math.abs(x) < a) {
      console.log(1);
    } else {
      console.log(-1);
    }
  } else if (k % 2 === 0) {
    if (2 * Math.abs(x) < a) {
      console.log((3 * k - 2) / 2);
    } else {
      console.log(-1);
    }
  } else {
    if (Math.abs(x) < a && x !== 0) {
      if (x < 0) {
        console.log((3 * k - 3) / 2);
      } else {
        console.log((3 * k - 1) / 2);
      }
    } else {
      console.log(-1);
    }
  }
}

solve();
