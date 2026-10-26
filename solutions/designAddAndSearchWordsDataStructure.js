class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

var WordDictionary = function() {
  this.root = new TrieNode();
};

WordDictionary.prototype.addWord = function(word) {
  let cur = this.root;
  for (let i = 0; i < word.length; i++) {
    let c = word[i];
    if (!cur.children[c]) {
      cur.children[c] = new TrieNode();
    }
    cur = cur.children[c];
  }
  cur.isEnd = true;
};

WordDictionary.prototype.search = function(word) {
  return this.searchHelper(word, 0, this.root);
};

WordDictionary.prototype.searchHelper = function(word, idx, node) {
  let cur = node;
  for (let i = idx; i < word.length; i++) {
    let c = word[i];
    if (c === '.') {
      for (let key in cur.children) {
        if (this.searchHelper(word, i + 1, cur.children[key])) {
          return true;
        }
      }
      return false;
    } else {
      if (!cur.children[c]) {
        return false;
      }
      cur = cur.children[c];
    }
  }
  return cur.isEnd;
};

var solve = function(commands, inputs) {
  let obj = null;
  let res = [];
  for (let i = 0; i < commands.length; i++) {
    if (commands[i] === "WordDictionary") {
      obj = new WordDictionary();
      res.push(null);
    } else if (commands[i] === "addWord") {
      obj.addWord(inputs[i][0]);
      res.push(null);
    } else if (commands[i] === "search") {
      res.push(obj.search(inputs[i][0]));
    }
  }
  return res;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = solve(parsed[0], parsed[1]);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
