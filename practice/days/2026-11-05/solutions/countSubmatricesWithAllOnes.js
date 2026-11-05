var countSubmatricesWithAllOnes = function(mat) {
    let m = mat.length;
    let n = mat[0].length;
    let heights = new Array(n).fill(0);
    let ans = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (mat[i][j] === 0) {
                heights[j] = 0;
            } else {
                heights[j] += 1;
            }
        }
        let sum = 0;
        let stack = [];
        for (let j = 0; j < n; j++) {
            while (stack.length > 0 && heights[stack[stack.length - 1]] >= heights[j]) {
                stack.pop();
            }
            if (stack.length > 0) {
                let prevIdx = stack[stack.length - 1];
                let count = (j - prevIdx) * heights[j];
                let prevSum = 0;
                for (let k = 0; k <= prevIdx; k++) {
                }
                let val = heights[j] * (j - prevIdx);
                let leftSum = prevIdx >= 0 ? dpGet(stack, j, heights) : 0;
                sum = (stack.length === 0 ? 0 : dp[stack[stack.length - 1]]) + heights[j] * (j - (stack.length === 0 ? -1 : stack[stack.length - 1]));
            } else {
                sum = heights[j] * (j + 1);
            }
            stack.push(j);
            ans += sum;
        }
    }
    return ans;
};

var countSubmatricesWithAllOnes = function(mat) {
    let m = mat.length;
    let n = mat[0].length;
    let h = new Array(n).fill(0);
    let ans = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            h[j] = mat[i][j] === 0 ? 0 : h[j] + 1;
        }
        let dp = new Array(n).fill(0);
        let stack = [];
        for (let j = 0; j < n; j++) {
            while (stack.length > 0 && h[stack[stack.length - 1]] >= h[j]) {
                stack.pop();
            }
            if (stack.length > 0) {
                let p = stack[stack.length - 1];
                dp[j] = dp[p] + h[j] * (j - p);
            } else {
                dp[j] = h[j] * (j + 1);
            }
            stack.push(j);
            ans += dp[j];
        }
    }
    return ans;
};

var solve = countSubmatricesWithAllOnes;

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
          const result = solve(parsed);
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
