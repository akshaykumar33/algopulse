var largestTimeFromDigits = function(arr) {
  let best = -1;
  let ans = '';
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (j === i) continue;
      for (let k = 0; k < 4; k++) {
        if (k === i || k === j) continue;
        const l = 6 - i - j - k;
        const hh = arr[i] * 10 + arr[j];
        const mm = arr[k] * 10 + arr[l];
        if (hh < 24 && mm < 60) {
          const t = hh * 60 + mm;
          if (t > best) {
            best = t;
            ans = (hh < 10 ? '0' + hh : '' + hh) + ':' + (mm < 10 ? '0' + mm : '' + mm);
          }
        }
      }
    }
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(largestTimeFromDigits(JSON.parse(line))));
    }
  }
}
