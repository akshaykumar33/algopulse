class CombinationIterator {
  constructor(characters, combinationLength) {
    this.combinations = [];
    this.idx = 0;
    const n = characters.length;
    const k = combinationLength;
    const chars = characters.split('');
    const backtrack = (start, path) => {
      if (path.length === k) {
        this.combinations.push(path.join(''));
        return;
      }
      for (let i = start; i < n; i++) {
        path.push(chars[i]);
        backtrack(i + 1, path);
        path.pop();
      }
    };
    backtrack(0, []);
  }
  next() {
    return this.combinations[this.idx++];
  }
  hasNext() {
    return this.idx < this.combinations.length;
  }
}

function solve(commands, args) {
  let it = null;
  const res = [];
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    const a = args[i];
    if (cmd === 'CombinationIterator') {
      it = new CombinationIterator(a[0], a[1]);
      res.push(null);
    } else if (cmd === 'next') {
      res.push(it.next());
    } else if (cmd === 'hasNext') {
      res.push(it.hasNext());
    }
  }
  return res;
}

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const cmds = JSON.parse(lines[i]);
        const a = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(cmds, a)));
      }
    }
  } catch (err) {}
}
module.exports = CombinationIterator;
