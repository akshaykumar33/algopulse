var accountsMerge = function(accounts) {
  let parent = {};
  let emailToName = {};

  function find(i) {
    if (parent[i] === undefined) parent[i] = i;
    if (parent[i] === i) return i;
    return parent[i] = find(parent[i]);
  }

  function union(i, j) {
    let rootI = find(i);
    let rootJ = find(j);
    if (rootI !== rootJ) {
      parent[rootI] = rootJ;
    }
  }

  for (let acc of accounts) {
    let name = acc[0];
    let firstEmail = acc[1];
    for (let i = 1; i < acc.length; i++) {
      emailToName[acc[i]] = name;
      union(firstEmail, acc[i]);
    }
  }

  let comps = {};
  for (let email in emailToName) {
    let root = find(email);
    if (!comps[root]) comps[root] = [];
    comps[root].push(email);
  }

  let res = [];
  for (let root in comps) {
    let emails = comps[root];
    emails.sort();
    let name = emailToName[root];
    res.push([name, ...emails]);
  }

  res.sort((a, b) => {
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      if (a[i] < b[i]) return -1;
      if (a[i] > b[i]) return 1;
    }
    return a.length - b.length;
  });

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
          const result = Array.isArray(parsed) && accountsMerge.length > 1 ? accountsMerge(...parsed) : accountsMerge(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(accountsMerge(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = accountsMerge;
