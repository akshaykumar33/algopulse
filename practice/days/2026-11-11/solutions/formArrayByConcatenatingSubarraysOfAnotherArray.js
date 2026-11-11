var canChoose = function(groups, nums) {
  let pos = 0;
  for (let g = 0; g < groups.length; g++) {
    const grp = groups[g];
    const len = grp.length;
    let found = -1;
    for (let i = pos; i + len <= nums.length; i++) {
      let ok = true;
      for (let j = 0; j < len; j++) {
        if (nums[i + j] !== grp[j]) {
          ok = false;
          break;
        }
      }
      if (ok) {
        found = i;
        break;
      }
    }
    if (found === -1) return false;
    pos = found + len;
  }
  return true;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const parsed = lines.map((l) => JSON.parse(l));
    if (parsed.length === canChoose.length && !(Array.isArray(parsed[0]) && parsed[0].length === canChoose.length && parsed.every((p) => Array.isArray(p) && p.length === canChoose.length))) {
      console.log(JSON.stringify(canChoose(...parsed)));
    } else {
      for (const p of parsed) {
        console.log(JSON.stringify(canChoose(...p)));
      }
    }
  }
}

module.exports = canChoose;
