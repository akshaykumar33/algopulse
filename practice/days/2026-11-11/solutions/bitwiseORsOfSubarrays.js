var subarrayBitwiseORs = function(arr) {
  const ans = new Set();
  let cur = new Int32Array(32);
  let nxt = new Int32Array(32);
  let curLen = 0;
  for (let i = 0; i < arr.length; i++) {
    const v = arr[i];
    nxt[0] = v;
    let nxtLen = 1;
    for (let j = 0; j < curLen; j++) {
      const y = cur[j] | v;
      if (y !== nxt[nxtLen - 1]) {
        nxt[nxtLen++] = y;
      }
    }
    for (let j = 0; j < nxtLen; j++) {
      ans.add(nxt[j]);
    }
    const tmp = cur;
    cur = nxt;
    nxt = tmp;
    curLen = nxtLen;
  }
  return ans.size;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    for (const line of lines) {
      console.log(JSON.stringify(subarrayBitwiseORs(JSON.parse(line))));
    }
  }
}

module.exports = subarrayBitwiseORs;
