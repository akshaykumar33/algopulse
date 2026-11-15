var partitionLabels = function(s) {
  const last = new Int32Array(26);
  for (let i = 0; i < s.length; i++) {
    last[s.charCodeAt(i) - 97] = i;
  }

  const ans = [];
  let start = 0, end = 0;
  for (let i = 0; i < s.length; i++) {
    const l = last[s.charCodeAt(i) - 97];
    if (l > end) end = l;
    if (i === end) {
      ans.push(end - start + 1);
      start = i + 1;
    }
  }

  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i++) {
      console.log(JSON.stringify(partitionLabels(JSON.parse(lines[i]))));
    }
  }
}

module.exports = partitionLabels;
