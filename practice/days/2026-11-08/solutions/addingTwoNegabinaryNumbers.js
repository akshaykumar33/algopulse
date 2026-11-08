var addNegabinary = function(arr1, arr2) {
  let i = arr1.length - 1;
  let j = arr2.length - 1;
  let carry = 0;
  const ans = [];
  while (i >= 0 || j >= 0 || carry !== 0) {
    let sum = carry;
    if (i >= 0) sum += arr1[i--];
    if (j >= 0) sum += arr2[j--];
    const rem = (sum % 2 + 2) % 2;
    ans.push(rem);
    carry = -Math.floor((sum - rem) / 2);
  }
  while (ans.length > 1 && ans[ans.length - 1] === 0) {
    ans.pop();
  }
  ans.reverse();
  return ans;
};

var solve = addNegabinary;
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
  } catch (err) {}
}
module.exports = solve;
