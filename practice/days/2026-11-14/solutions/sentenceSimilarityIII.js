var areSentencesSimilar = function(sentence1, sentence2) {
  const w1 = sentence1.split(' ');
  const w2 = sentence2.split(' ');
  if (w1.length > w2.length) return areSentencesSimilar(sentence2, sentence1);

  let l = 0;
  while (l < w1.length && w1[l] === w2[l]) l++;

  let r = 0;
  while (r < w1.length - l && w1[w1.length - 1 - r] === w2[w2.length - 1 - r]) r++;

  return l + r === w1.length;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(areSentencesSimilar(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = areSentencesSimilar;
