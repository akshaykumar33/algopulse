var maxProduct = function(words) {
  let maskMap = new Map();
  for (const w of words) {
    let mask = 0;
    for (let i = 0; i < w.length; i++) {
      mask |= (1 << (w.charCodeAt(i) - 97));
    }
    const cur = maskMap.get(mask) || 0;
    if (w.length > cur) {
      maskMap.set(mask, w.length);
    }
  }

  let ans = 0;
  const entries = Array.from(maskMap.entries());
  for (let i = 0; i < entries.length; i++) {
    const [mask1, len1] = entries[i];
    for (let j = i + 1; j < entries.length; j++) {
      const [mask2, len2] = entries[j];
      if ((mask1 & mask2) === 0) {
        const prod = len1 * len2;
        if (prod > ans) ans = prod;
      }
    }
  }
  return ans;
};

var solve = typeof maxProduct !== 'undefined' ? maxProduct : null;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      const parsed = JSON.parse(line);
      console.log(JSON.stringify(maxProduct(parsed)));
    }
  }
}

