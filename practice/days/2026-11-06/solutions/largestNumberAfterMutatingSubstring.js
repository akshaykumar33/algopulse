var maximumNumber = function(num, change) {
  const arr = num.split('');
  let mutating = false;

  for (let i = 0; i < arr.length; i++) {
    const d = arr[i].charCodeAt(0) - 48;
    const c = change[d];

    if (c > d) {
      arr[i] = String.fromCharCode(c + 48);
      mutating = true;
    } else if (c === d) {
      continue;
    } else {
      if (mutating) break;
    }
  }

  return arr.join('');
};

var solve = typeof maximumNumber !== 'undefined' ? maximumNumber : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const num = JSON.parse(lines[i]);
        const change = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(num, change)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

