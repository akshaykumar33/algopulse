var MagicDictionary = function() {
    this.words = [];
};;

MagicDictionary.prototype.buildDict = function(dictionary) {
    this.words = dictionary;
};;

MagicDictionary.prototype.search = function(searchWord) {
    for (let i = 0; i < this.words.length; i++) {
        let w = this.words[i];
        if (w.length !== searchWord.length) continue;
        let diff = 0;
        for (let j = 0; j < w.length; j++) {
            if (w[j] !== searchWord[j]) diff++;
            if (diff > 1) break;
        }
        if (diff === 1) return true;
    }
    return false;
};;

var solve = MagicDictionary;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      let obj = null;
      let res = [];
      for (let i = 0; i < lines.length; i += 2) {
        const ops = JSON.parse(lines[i]);
        const args = JSON.parse(lines[i + 1]);
        let out = [];
        for (let j = 0; j < ops.length; j++) {
          if (ops[j] === "MagicDictionary") {
            obj = new MagicDictionary();
            out.push(null);
          } else if (ops[j] === "buildDict") {
            obj.buildDict(args[j][0]);
            out.push(null);
          } else if (ops[j] === "search") {
            out.push(obj.search(args[j][0]));
          }
        }
        console.log(JSON.stringify(out));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
