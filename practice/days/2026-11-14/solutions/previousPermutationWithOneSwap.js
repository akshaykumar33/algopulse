var prevPermOpt1 = function(arr) {
  const n = arr.length;
  let idx = -1;
  for (let i = n - 2; i >= 0; i--) {
    if (arr[i] > arr[i + 1]) {
      idx = i;
      break;
    }
  }
  if (idx === -1) return arr;

  let bestJ = idx + 1;
  for (let j = idx + 1; j < n; j++) {
    if (arr[j] < arr[idx] && arr[j] > arr[bestJ]) {
      bestJ = j;
    }
  }

  const tmp = arr[idx];
  arr[idx] = arr[bestJ];
  arr[bestJ] = tmp;
  return arr;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const l of lines) console.log(JSON.stringify(prevPermOpt1(JSON.parse(l))));
  }
}

module.exports = prevPermOpt1;
