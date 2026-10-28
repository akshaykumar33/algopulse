var xorQueries = function(arr, queries) {
  const n = arr.length;
  const pref = new Int32Array(n + 1);
  for (let i = 0; i < n; i++) {
    pref[i + 1] = pref[i] ^ arr[i];
  }

  const res = new Int32Array(queries.length);
  for (let i = 0; i < queries.length; i++) {
    const l = queries[i][0];
    const r = queries[i][1];
    res[i] = pref[r + 1] ^ pref[l];
  }

  return Array.from(res);
};

var solve = function(arr, queries) {
  return xorQueries(arr, queries);
};

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
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

