const solve = () => {
  const input = require('fs').readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let lineIdx = 0;
  const n = parseInt(input[lineIdx++]);

  let goodCount = 0;

  for (let i = 0; i < n; i++) {
    const kStr = input[lineIdx++];
    let isGood = true;
    const seenDigits = new Set();

    for (let j = 0; j < kStr.length; j++) {
      const digit = kStr[j];
      if (seenDigits.has(digit)) {
        isGood = false;
        break;
      }
      seenDigits.add(digit);
    }

    if (isGood) {
      goodCount++;
    }
  }

  console.log(goodCount);
};

solve();
