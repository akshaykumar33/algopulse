var peopleIndexes = function(favoriteCompanies) {
  const n = favoriteCompanies.length;
  const idMap = new Map();
  let nextId = 0;
  const sets = new Array(n);
  for (let i = 0; i < n; i++) {
    const list = favoriteCompanies[i];
    const arr = new Int32Array(list.length);
    for (let j = 0; j < list.length; j++) {
      let id = idMap.get(list[j]);
      if (id === undefined) {
        id = nextId++;
        idMap.set(list[j], id);
      }
      arr[j] = id;
    }
    arr.sort();
    sets[i] = arr;
  }
  const order = Array.from({ length: n }, (_, i) => i);
  order.sort((a, b) => sets[b].length - sets[a].length);
  const isSubset = (a, b) => {
    let i = 0;
    let j = 0;
    const la = a.length;
    const lb = b.length;
    while (i < la && j < lb) {
      if (a[i] === b[j]) {
        i++;
        j++;
      } else if (a[i] > b[j]) {
        j++;
      } else {
        return false;
      }
    }
    return i === la;
  };
  const valid = new Uint8Array(n).fill(1);
  for (let idx = 0; idx < n; idx++) {
    const i = order[idx];
    const ai = sets[i];
    for (let jdx = 0; jdx < idx; jdx++) {
      const j = order[jdx];
      if (!valid[j]) continue;
      if (sets[j].length === ai.length) break;
      if (isSubset(ai, sets[j])) {
        valid[i] = 0;
        break;
      }
    }
  }
  const ans = [];
  for (let i = 0; i < n; i++) {
    if (valid[i]) ans.push(i);
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    for (const line of lines) {
      console.log(JSON.stringify(peopleIndexes(JSON.parse(line))));
    }
  }
}

module.exports = peopleIndexes;
