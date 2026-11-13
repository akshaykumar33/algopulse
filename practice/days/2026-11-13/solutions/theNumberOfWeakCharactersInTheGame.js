var numberOfWeakCharacters = function(properties) {
  properties.sort((a, b) => b[0] !== a[0] ? b[0] - a[0] : a[1] - b[1]);
  let ans = 0;
  let maxDef = 0;
  for (let i = 0; i < properties.length; i++) {
    if (properties[i][1] < maxDef) {
      ans++;
    } else {
      maxDef = properties[i][1];
    }
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(numberOfWeakCharacters(JSON.parse(line))));
    }
  }
}

module.exports = numberOfWeakCharacters;
