var findThePrefixCommonArray = function(A, B) {
  const n = A.length;
  const freq = new Uint8Array(n + 1);
  const res = new Int32Array(n);
  let common = 0;

  for (let i = 0; i < n; i++) {
    freq[A[i]]++;
    if (freq[A[i]] === 2) common++;
    freq[B[i]]++;
    if (freq[B[i]] === 2) common++;
    res[i] = common;
  }
  return Array.from(res);
};

var solve = findThePrefixCommonArray;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(...parsed)));
    }
  } catch (e) {}
}
