var replaceWords = function(dictionary, sentence) {
    let root = {};
    for (let word of dictionary) {
        let cur = root;
        for (let char of word) {
            if (!cur[char]) cur[char] = {};
            cur = cur[char];
        }
        cur.isEnd = true;
    }
    
    let words = sentence.split(' ');
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        let cur = root;
        let prefix = '';
        for (let j = 0; j < word.length; j++) {
            let char = word[j];
            if (!cur[char]) break;
            prefix += char;
            cur = cur[char];
            if (cur.isEnd) {
                words[i]  = prefix;
                break;
            }
        }
    }
    return words.join(' ');
};

var solve = replaceWords;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      let i = 0;
      while (i < lines.length) {
        const dict = JSON.parse(lines[i++]);
        const sent = JSON.parse(lines[i++]);
        const res = solve(dict, sent);
        console.log(JSON.stringify(res));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
