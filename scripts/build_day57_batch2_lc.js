const fs = require('fs');
const path = require('path');

const targetDay = '2026-11-20';
const solDir = path.join(__dirname, '..', 'practice', 'days', targetDay, 'solutions');
const testDir = path.join(__dirname, '..', 'practice', 'days', targetDay, 'tests');
const rootSolDir = path.join(__dirname, '..', 'solutions');

const solutions = {};
const tests = {};

// 34. countAlternatingSubarrays
solutions['countAlternatingSubarrays'] = `var countAlternatingSubarrays = function(nums) {
  let ans = 0, cur = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] !== nums[i - 1]) cur++;
    else cur = 1;
    ans += cur;
  }
  return ans;
};

var solve = countAlternatingSubarrays;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = countAlternatingSubarrays;`;

tests['countAlternatingSubarrays'] = [
  { input: "[0, 1, 1, 1]", output: "5" },
  { input: "[1, 0, 1, 0]", output: "10" }
];

// 35. numberOfSubarraysWithGCDEqualToK
solutions['numberOfSubarraysWithGCDEqualToK'] = `function gcd(a, b) {
  while (b) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a;
}

var subarrayGCD = function(nums, k) {
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    let g = 0;
    for (let j = i; j < nums.length; j++) {
      g = gcd(g, nums[j]);
      if (g < k) break;
      if (g === k) ans++;
    }
  }
  return ans;
};

var solve = subarrayGCD;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = subarrayGCD;`;

tests['numberOfSubarraysWithGCDEqualToK'] = [
  { input: "[[9, 3, 1, 2, 6, 3], 3]", output: "4" },
  { input: "[[4], 2]", output: "0" }
];

// 36. minimumOperationsToMakeASpecialNumber
solutions['minimumOperationsToMakeASpecialNumber'] = `var minimumOperations = function(num) {
  let n = num.length;
  let ans = num.includes('0') ? n - 1 : n;
  const targets = ['00', '25', '50', '75'];
  for (const t of targets) {
    let p = 1;
    for (let i = n - 1; i >= 0; i--) {
      if (num[i] === t[p]) {
        p--;
        if (p < 0) {
          ans = Math.min(ans, n - i - 2);
          break;
        }
      }
    }
  }
  return ans;
};

var solve = minimumOperations;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = minimumOperations;`;

tests['minimumOperationsToMakeASpecialNumber'] = [
  { input: "\"2245047\"", output: "2" },
  { input: "\"2908305\"", output: "3" },
  { input: "\"10\"", output: "1" }
];

// 37. designANumberContainerSystem
solutions['designANumberContainerSystem'] = `class MinHeap {
  constructor() {
    this.h = [];
  }
  push(v) {
    this.h.push(v);
    let i = this.h.length - 1;
    while (i > 0) {
      let p = (i - 1) >> 1;
      if (this.h[p] > this.h[i]) {
        let t = this.h[p];
        this.h[p] = this.h[i];
        this.h[i] = t;
        i = p;
      } else break;
    }
  }
  pop() {
    if (!this.h.length) return null;
    let top = this.h[0];
    let end = this.h.pop();
    if (this.h.length) {
      this.h[0] = end;
      let i = 0, n = this.h.length;
      while ((i << 1) + 1 < n) {
        let l = (i << 1) + 1, r = l + 1, best = l;
        if (r < n && this.h[r] < this.h[l]) best = r;
        if (this.h[best] < this.h[i]) {
          let t = this.h[best];
          this.h[best] = this.h[i];
          this.h[i] = t;
          i = best;
        } else break;
      }
    }
    return top;
  }
  peek() {
    return this.h[0] ?? null;
  }
}

var NumberContainers = function() {
  this.idxToNum = new Map();
  this.numToHeap = new Map();
};

NumberContainers.prototype.change = function(index, number) {
  this.idxToNum.set(index, number);
  if (!this.numToHeap.has(number)) {
    this.numToHeap.set(number, new MinHeap());
  }
  this.numToHeap.get(number).push(index);
};

NumberContainers.prototype.find = function(number) {
  if (!this.numToHeap.has(number)) return -1;
  const heap = this.numToHeap.get(number);
  while (heap.h.length > 0) {
    let top = heap.peek();
    if (this.idxToNum.get(top) === number) return top;
    heap.pop();
  }
  return -1;
};

var solve = function(actions, args) {
  let obj = null;
  const res = [];
  for (let i = 0; i < actions.length; i++) {
    if (actions[i] === "NumberContainers") {
      obj = new NumberContainers();
      res.push(null);
    } else if (actions[i] === "change") {
      obj.change(...args[i]);
      res.push(null);
    } else if (actions[i] === "find") {
      res.push(obj.find(...args[i]));
    }
  }
  return res;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = NumberContainers;`;

tests['designANumberContainerSystem'] = [
  {
    input: "[[\"NumberContainers\",\"find\",\"change\",\"change\",\"change\",\"change\",\"find\",\"change\",\"find\"], [[],[10],[2,10],[1,10],[3,10],[5,10],[10],[1,20],[10]]]",
    output: "[null,-1,null,null,null,null,1,null,2]"
  }
];

// 38. stringCompressionIII
solutions['stringCompressionIII'] = `var compressedString = function(word) {
  let comp = '';
  let i = 0, n = word.length;
  while (i < n) {
    let c = word[i], count = 0;
    while (i < n && word[i] === c && count < 9) {
      count++;
      i++;
    }
    comp += count + c;
  }
  return comp;
};

var solve = compressedString;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = compressedString;`;

tests['stringCompressionIII'] = [
  { input: "\"abcde\"", output: "\"1a1b1c1d1e\"" },
  { input: "\"aaaaaaaaaaaaaabb\"", output: "\"9a5a2b\"" }
];

// 39. maximumGoodSubarraySum
solutions['maximumGoodSubarraySum'] = `var maximumSubarraySum = function(nums, k) {
  let minPref = new Map();
  let pref = 0;
  let ans = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    if (!minPref.has(x) || pref < minPref.get(x)) {
      minPref.set(x, pref);
    }
    pref += x;
    if (minPref.has(x - k)) {
      ans = Math.max(ans, pref - minPref.get(x - k));
    }
    if (minPref.has(x + k)) {
      ans = Math.max(ans, pref - minPref.get(x + k));
    }
  }
  return ans === -Infinity ? 0 : ans;
};

var solve = maximumSubarraySum;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = maximumSubarraySum;`;

tests['maximumGoodSubarraySum'] = [
  { input: "[[1, 2, 3, 4, 5, 6], 1]", output: "11" },
  { input: "[[-1, -2, -3, -4], 2]", output: "-6" },
  { input: "[[-1, 3, 2, 4, 5], 3]", output: "11" }
];

// 40. shortestDistanceAfterRoadAdditionQueriesI
solutions['shortestDistanceAfterRoadAdditionQueriesI'] = `var shortestDistanceAfterQueries = function(n, queries) {
  const adj = Array.from({ length: n }, () => []);
  for (let i = 0; i < n - 1; i++) adj[i].push(i + 1);
  const ans = [];
  for (const [u, v] of queries) {
    adj[u].push(v);
    const dist = new Int32Array(n).fill(-1);
    dist[0] = 0;
    const q = [0];
    let head = 0;
    while (head < q.length) {
      const cur = q[head++];
      if (cur === n - 1) break;
      for (const nxt of adj[cur]) {
        if (dist[nxt] === -1) {
          dist[nxt] = dist[cur] + 1;
          q.push(nxt);
        }
      }
    }
    ans.push(dist[n - 1]);
  }
  return ans;
};

var solve = shortestDistanceAfterQueries;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = shortestDistanceAfterQueries;`;

tests['shortestDistanceAfterRoadAdditionQueriesI'] = [
  { input: "[5, [[2, 4], [0, 2], [0, 4]]]", output: "[3,2,1]" },
  { input: "[4, [[0, 3], [0, 2]]]", output: "[1,1]" }
];

// 41. swapAdjacentInLRString
solutions['swapAdjacentInLRString'] = `var canTransform = function(start, end) {
  if (start.length !== end.length) return false;
  let i = 0, j = 0, n = start.length;
  while (i < n || j < n) {
    while (i < n && start[i] === 'X') i++;
    while (j < n && end[j] === 'X') j++;
    if (i === n || j === n) return i === n && j === n;
    if (start[i] !== end[j]) return false;
    if (start[i] === 'L' && i < j) return false;
    if (start[i] === 'R' && i > j) return false;
    i++;
    j++;
  }
  return true;
};

var solve = canTransform;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = canTransform;`;

tests['swapAdjacentInLRString'] = [
  { input: "[\"RXXLRXRXL\", \"XRLXXRRLX\"]", output: "true" },
  { input: "[\"X\", \"L\"]", output: "false" }
];

// 42. maximizeAmountAfterTwoDaysOfConversions
solutions['maximizeAmountAfterTwoDaysOfConversions'] = `var maxAmount = function(initialCurrency, pairs1, rates1, pairs2, rates2) {
  function getRates(initCur, pairs, rates) {
    const dist = new Map();
    dist.set(initCur, 1.0);
    const currencies = new Set();
    currencies.add(initCur);
    for (const [u, v] of pairs) {
      currencies.add(u);
      currencies.add(v);
    }
    const nodes = Array.from(currencies);
    for (let iter = 0; iter < nodes.length; iter++) {
      let updated = false;
      for (let i = 0; i < pairs.length; i++) {
        const [u, v] = pairs[i];
        const r = rates[i];
        if (dist.has(u)) {
          const cand = dist.get(u) * r;
          if (!dist.has(v) || cand > dist.get(v)) {
            dist.set(v, cand);
            updated = true;
          }
        }
        if (dist.has(v)) {
          const cand = dist.get(v) / r;
          if (!dist.has(u) || cand > dist.get(u)) {
            dist.set(u, cand);
            updated = true;
          }
        }
      }
      if (!updated) break;
    }
    return dist;
  }

  const day1 = getRates(initialCurrency, pairs1, rates1);
  let maxResult = 1.0;

  for (const [midCur, amount1] of day1.entries()) {
    const day2 = getRates(midCur, pairs2, rates2);
    if (day2.has(initialCurrency)) {
      maxResult = Math.max(maxResult, amount1 * day2.get(initialCurrency));
    }
  }

  return maxResult;
};

var solve = maxAmount;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1], parsed[2], parsed[3], parsed[4])));
    }
  } catch (e) {}
}

module.exports = maxAmount;`;

tests['maximizeAmountAfterTwoDaysOfConversions'] = [
  {
    input: "[\"EUR\", [[\"EUR\", \"USD\"], [\"USD\", \"JPY\"]], [2.0, 3.0], [[\"JPY\", \"USD\"], [\"USD\", \"CHF\"], [\"CHF\", \"EUR\"]], [4.0, 5.0, 6.0]]",
    output: "720"
  },
  {
    input: "[\"NGN\", [[\"NGN\", \"EUR\"]], [9.0], [[\"NGN\", \"EUR\"]], [6.0]]",
    output: "1.5"
  },
  {
    input: "[\"USD\", [[\"USD\", \"EUR\"]], [1.0], [[\"EUR\", \"JPY\"]], [10.0]]",
    output: "1"
  }
];

// 43. extraCharactersInAString
solutions['extraCharactersInAString'] = `var minExtraChar = function(s, dictionary) {
  const n = s.length;
  const dict = new Set(dictionary);
  const dp = new Int32Array(n + 1);
  for (let i = n - 1; i >= 0; i--) {
    dp[i] = dp[i + 1] + 1;
    for (let j = i + 1; j <= n; j++) {
      if (dict.has(s.slice(i, j))) {
        dp[i] = Math.min(dp[i], dp[j]);
      }
    }
  }
  return dp[0];
};

var solve = minExtraChar;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = minExtraChar;`;

tests['extraCharactersInAString'] = [
  { input: "[\"leetscode\", [\"leet\", \"code\", \"leetcode\"]]", output: "1" },
  { input: "[\"sayhelloworld\", [\"hello\", \"world\"]]", output: "3" }
];

// 44. constructTheLexicographicallyLargestValidSequence
solutions['constructTheLexicographicallyLargestValidSequence'] = `var constructDistancedSequence = function(n) {
  const size = 2 * n - 1;
  const res = new Int32Array(size);
  const used = new Uint8Array(n + 1);

  function backtrack(idx) {
    if (idx === size) return true;
    if (res[idx] !== 0) return backtrack(idx + 1);

    for (let num = n; num >= 1; num--) {
      if (used[num]) continue;
      if (num === 1) {
        res[idx] = 1;
        used[1] = 1;
        if (backtrack(idx + 1)) return true;
        res[idx] = 0;
        used[1] = 0;
      } else {
        const nextIdx = idx + num;
        if (nextIdx < size && res[nextIdx] === 0) {
          res[idx] = num;
          res[nextIdx] = num;
          used[num] = 1;
          if (backtrack(idx + 1)) return true;
          res[idx] = 0;
          res[nextIdx] = 0;
          used[num] = 0;
        }
      }
    }
    return false;
  }

  backtrack(0);
  return Array.from(res);
};

var solve = constructDistancedSequence;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = constructDistancedSequence;`;

tests['constructTheLexicographicallyLargestValidSequence'] = [
  { input: "3", output: "[3,1,2,3,2]" },
  { input: "5", output: "[5,3,1,4,3,5,2,4,2]" }
];

// 45. slidingSubarrayBeauty
solutions['slidingSubarrayBeauty'] = `var getSubarrayBeauty = function(nums, k, x) {
  const n = nums.length;
  const count = new Int32Array(51);
  const ans = new Int32Array(n - k + 1);

  for (let i = 0; i < k; i++) {
    if (nums[i] < 0) count[-nums[i]]++;
  }

  function getXth() {
    let seen = 0;
    for (let v = 50; v >= 1; v--) {
      seen += count[v];
      if (seen >= x) return -v;
    }
    return 0;
  }

  ans[0] = getXth();

  for (let i = k; i < n; i++) {
    if (nums[i] < 0) count[-nums[i]]++;
    if (nums[i - k] < 0) count[-nums[i - k]]--;
    ans[i - k + 1] = getXth();
  }

  return Array.from(ans);
};

var solve = getSubarrayBeauty;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1], parsed[2])));
    }
  } catch (e) {}
}

module.exports = getSubarrayBeauty;`;

tests['slidingSubarrayBeauty'] = [
  { input: "[[1, -1, -3, -2, 3], 3, 2]", output: "[-1,-2,-2]" },
  { input: "[[-1, -2, -3, -4, -5], 2, 2]", output: "[-1,-2,-3,-4]" },
  { input: "[[-3, 1, 2, -3, 0, -3], 2, 1]", output: "[-3,0,-3,-3,-3]" }
];

// 46. findAllGroupsOfFarmland
solutions['findAllGroupsOfFarmland'] = `var findFarmland = function(land) {
  const m = land.length, n = land[0].length;
  const ans = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (land[r][c] === 1) {
        if ((r === 0 || land[r - 1][c] === 0) && (c === 0 || land[r][c - 1] === 0)) {
          let r2 = r, c2 = c;
          while (r2 + 1 < m && land[r2 + 1][c] === 1) r2++;
          while (c2 + 1 < n && land[r][c2 + 1] === 1) c2++;
          ans.push([r, c, r2, c2]);
        }
      }
    }
  }
  return ans;
};

var solve = findFarmland;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = findFarmland;`;

tests['findAllGroupsOfFarmland'] = [
  { input: "[[1, 0, 0], [0, 1, 1], [0, 1, 1]]", output: "[[0,0,0,0],[1,1,2,2]]" },
  { input: "[[0, 1], [1, 0]]", output: "[[0,1,0,1],[1,0,1,0]]" }
];

// 47. minimumLevelsToGainMorePoints
solutions['minimumLevelsToGainMorePoints'] = `var minimumLevels = function(possible) {
  const n = possible.length;
  let total = 0;
  for (let i = 0; i < n; i++) total += possible[i] === 1 ? 1 : -1;
  let cur = 0;
  for (let i = 0; i < n - 1; i++) {
    cur += possible[i] === 1 ? 1 : -1;
    if (2 * cur > total) return i + 1;
  }
  return -1;
};

var solve = minimumLevels;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = minimumLevels;`;

tests['minimumLevelsToGainMorePoints'] = [
  { input: "[1, 0, 1, 0]", output: "1" },
  { input: "[1, 1, 1, 1, 1]", output: "3" },
  { input: "[0, 0]", output: "-1" }
];

// 48. longestStringChain
solutions['longestStringChain'] = `var longestStrChain = function(words) {
  words.sort((a, b) => a.length - b.length);
  const dp = new Map();
  let maxChain = 1;
  for (const w of words) {
    let cur = 1;
    for (let i = 0; i < w.length; i++) {
      const prev = w.slice(0, i) + w.slice(i + 1);
      if (dp.has(prev)) {
        cur = Math.max(cur, dp.get(prev) + 1);
      }
    }
    dp.set(w, cur);
    maxChain = Math.max(maxChain, cur);
  }
  return maxChain;
};

var solve = longestStrChain;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = longestStrChain;`;

tests['longestStringChain'] = [
  { input: "[\"a\", \"b\", \"ba\", \"bca\", \"bda\", \"bdca\"]", output: "4" },
  { input: "[\"xbc\", \"pcxbcf\", \"xb\", \"cxbc\", \"pcxbc\"]", output: "5" },
  { input: "[\"abcd\", \"dbqca\"]", output: "1" }
];

// 49. checkIfAStringContainsAllBinaryCodesOfSizeK
solutions['checkIfAStringContainsAllBinaryCodesOfSizeK'] = `var hasAllCodes = function(s, k) {
  const need = 1 << k;
  if (s.length - k + 1 < need) return false;
  const seen = new Uint8Array(need);
  let count = 0;
  let hash = 0;
  const mask = need - 1;
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 1) & mask) | (s.charCodeAt(i) - 48);
    if (i >= k - 1) {
      if (!seen[hash]) {
        seen[hash] = 1;
        count++;
        if (count === need) return true;
      }
    }
  }
  return false;
};

var solve = hasAllCodes;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = hasAllCodes;`;

tests['checkIfAStringContainsAllBinaryCodesOfSizeK'] = [
  { input: "[\"00110110\", 2]", output: "true" },
  { input: "[\"0110\", 1]", output: "true" },
  { input: "[\"0110\", 2]", output: "false" }
];

// 50. findTheMaximumLengthOfValidSubsequenceI
solutions['findTheMaximumLengthOfValidSubsequenceI'] = `var maximumLength = function(nums) {
  let c0 = 0, c1 = 0;
  let alt0 = 0, exp0 = 0;
  let alt1 = 0, exp1 = 1;
  for (let i = 0; i < nums.length; i++) {
    const p = nums[i] % 2;
    if (p === 0) c0++;
    else c1++;
    if (p === exp0) {
      alt0++;
      exp0 ^= 1;
    }
    if (p === exp1) {
      alt1++;
      exp1 ^= 1;
    }
  }
  return Math.max(c0, c1, alt0, alt1);
};

var solve = maximumLength;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = maximumLength;`;

tests['findTheMaximumLengthOfValidSubsequenceI'] = [
  { input: "[1, 2, 3, 4]", output: "4" },
  { input: "[1, 2, 1, 1, 2, 1, 2]", output: "6" },
  { input: "[1, 3]", output: "2" }
];

// 51. countSubmatricesWithTopLeftElementAndSumLessThanK
solutions['countSubmatricesWithTopLeftElementAndSumLessThanK'] = `var countSubmatrices = function(grid, k) {
  const m = grid.length, n = grid[0].length;
  let ans = 0;
  const pref = Array.from({ length: m }, () => new Int32Array(n));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      let sum = grid[r][c];
      if (r > 0) sum += pref[r - 1][c];
      if (c > 0) sum += pref[r][c - 1];
      if (r > 0 && c > 0) sum -= pref[r - 1][c - 1];
      pref[r][c] = sum;
      if (sum <= k) ans++;
    }
  }
  return ans;
};

var solve = countSubmatrices;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = countSubmatrices;`;

tests['countSubmatricesWithTopLeftElementAndSumLessThanK'] = [
  { input: "[[[7, 6, 3], [6, 6, 1]], 18]", output: "4" },
  { input: "[[[7, 2, 9], [1, 5, 0], [2, 6, 6]], 20]", output: "6" }
];

// 52. findTheLargestAreaOfSquareInsideTwoRectangles
solutions['findTheLargestAreaOfSquareInsideTwoRectangles'] = `var largestSquareArea = function(bottomLeft, topRight) {
  const n = bottomLeft.length;
  let maxSide = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const x1 = Math.max(bottomLeft[i][0], bottomLeft[j][0]);
      const y1 = Math.max(bottomLeft[i][1], bottomLeft[j][1]);
      const x2 = Math.min(topRight[i][0], topRight[j][0]);
      const y2 = Math.min(topRight[i][1], topRight[j][1]);
      const w = x2 - x1;
      const h = y2 - y1;
      const side = Math.min(w, h);
      if (side > maxSide) {
        maxSide = side;
      }
    }
  }
  return maxSide * maxSide;
};

var solve = largestSquareArea;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = largestSquareArea;`;

tests['findTheLargestAreaOfSquareInsideTwoRectangles'] = [
  { input: "[[[1, 1], [2, 2], [3, 1]], [[3, 3], [4, 4], [6, 6]]]", output: "1" },
  { input: "[[[1, 1], [2, 2], [1, 2]], [[3, 3], [4, 4], [3, 4]]]", output: "1" },
  { input: "[[[1, 1], [3, 3], [3, 1]], [[2, 2], [4, 4], [4, 2]]]", output: "0" }
];

// 53. findXorBeautyOfArray
solutions['findXorBeautyOfArray'] = `var xorBeauty = function(nums) {
  let ans = 0;
  for (let i = 0; i < nums.length; i++) ans ^= nums[i];
  return ans;
};

var solve = xorBeauty;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = xorBeauty;`;

tests['findXorBeautyOfArray'] = [
  { input: "[1, 4]", output: "5" },
  { input: "[15, 45, 20, 2, 34, 35, 5, 44, 32, 30]", output: "34" }
];

// 54. minimumOperationsToMakeBinaryArrayElementsEqualToOneI
solutions['minimumOperationsToMakeBinaryArrayElementsEqualToOneI'] = `var minOperations = function(nums) {
  let ans = 0;
  const n = nums.length;
  for (let i = 0; i <= n - 3; i++) {
    if (nums[i] === 0) {
      nums[i] ^= 1;
      nums[i + 1] ^= 1;
      nums[i + 2] ^= 1;
      ans++;
    }
  }
  for (let i = 0; i < n; i++) {
    if (nums[i] === 0) return -1;
  }
  return ans;
};

var solve = minOperations;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = minOperations;`;

tests['minimumOperationsToMakeBinaryArrayElementsEqualToOneI'] = [
  { input: "[0, 1, 1, 1, 0, 0]", output: "3" },
  { input: "[0, 1, 1, 1]", output: "-1" }
];

// 55. balanceABinarySearchTree
solutions['balanceABinarySearchTree'] = `function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

var balanceBST = function(root) {
  const vals = [];
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    vals.push(node.val);
    inorder(node.right);
  }
  inorder(root);

  function build(l, r) {
    if (l > r) return null;
    const mid = (l + r) >> 1;
    const node = new TreeNode(vals[mid]);
    node.left = build(l, mid - 1);
    node.right = build(mid + 1, r);
    return node;
  }

  return build(0, vals.length - 1);
};

const arrayToTree = (arr) => {
  if (!arr || arr.length === 0 || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (queue.length > 0 && i < arr.length) {
    const cur = queue.shift();
    if (i < arr.length && arr[i] !== null) {
      cur.left = new TreeNode(arr[i]);
      queue.push(cur.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      cur.right = new TreeNode(arr[i]);
      queue.push(cur.right);
    }
    i++;
  }
  return root;
};

const treeToArray = (root) => {
  if (!root) return [];
  const res = [];
  const queue = [root];
  while (queue.length > 0) {
    const cur = queue.shift();
    if (cur !== null) {
      res.push(cur.val);
      queue.push(cur.left || null);
      queue.push(cur.right || null);
    } else {
      res.push(null);
    }
  }
  while (res.length > 0 && res[res.length - 1] === null) {
    res.pop();
  }
  return res;
};

var solve = function(arr) {
  const root = arrayToTree(arr);
  const balanced = balanceBST(root);
  return treeToArray(balanced);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = balanceBST;`;

tests['balanceABinarySearchTree'] = [
  { input: "[1, null, 2, null, 3, null, 4, null, null]", output: "[2,1,3,null,null,null,4]" },
  { input: "[2, 1, 3]", output: "[2,1,3]" }
];

// 56. collectingChocolates
solutions['collectingChocolates'] = `var minCost = function(nums, x) {
  const n = nums.length;
  const minVal = new Int32Array(nums);
  let ans = 0;
  for (let i = 0; i < n; i++) ans += nums[i];

  for (let k = 1; k < n; k++) {
    let curCost = k * x;
    for (let i = 0; i < n; i++) {
      const rotated = nums[(i - k + n) % n];
      if (rotated < minVal[i]) minVal[i] = rotated;
      curCost += minVal[i];
    }
    if (curCost < ans) ans = curCost;
  }

  return ans;
};

var solve = minCost;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = minCost;`;

tests['collectingChocolates'] = [
  { input: "[[20, 1, 15], 5]", output: "13" },
  { input: "[[1, 2, 3], 4]", output: "6" }
];

// 57. findTheSubstringWithMaximumCost
solutions['findTheSubstringWithMaximumCost'] = `var maximumCostSubstring = function(s, chars, vals) {
  const valMap = new Map();
  for (let i = 0; i < chars.length; i++) {
    valMap.set(chars[i], vals[i]);
  }
  let maxCost = 0;
  let cur = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    const v = valMap.has(ch) ? valMap.get(ch) : (ch.charCodeAt(0) - 96);
    cur = Math.max(0, cur + v);
    maxCost = Math.max(maxCost, cur);
  }
  return maxCost;
};

var solve = maximumCostSubstring;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1], parsed[2])));
    }
  } catch (e) {}
}

module.exports = maximumCostSubstring;`;

tests['findTheSubstringWithMaximumCost'] = [
  { input: "[\"adaa\", \"d\", [-1000]]", output: "2" },
  { input: "[\"abc\", \"abc\", [-1, -1, -1]]", output: "0" }
];

// 58. describeThePainting
solutions['describeThePainting'] = `var splitPainting = function(segments) {
  const diff = new Map();
  const endpoints = new Set();
  for (const [start, end, color] of segments) {
    diff.set(start, (diff.get(start) || 0) + color);
    diff.set(end, (diff.get(end) || 0) - color);
    endpoints.add(start);
    endpoints.add(end);
  }
  const pts = Array.from(endpoints).sort((a, b) => a - b);
  const ans = [];
  let curColor = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    curColor += diff.get(pts[i]) || 0;
    if (curColor > 0) {
      ans.push([pts[i], pts[i + 1], curColor]);
    }
  }
  return ans;
};

var solve = splitPainting;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = splitPainting;`;

tests['describeThePainting'] = [
  { input: "[[1, 4, 5], [4, 7, 7], [1, 7, 9]]", output: "[[1,4,14],[4,7,16]]" },
  { input: "[[1, 7, 9], [6, 8, 15], [8, 10, 7]]", output: "[[1,6,9],[6,7,24],[7,8,15],[8,10,7]]" }
];

// 59. findASafeWalkThroughAGrid
solutions['findASafeWalkThroughAGrid'] = `var findSafeWalk = function(grid, health) {
  const m = grid.length, n = grid[0].length;
  const dist = Array.from({ length: m }, () => new Int32Array(n).fill(1e9));
  dist[0][0] = grid[0][0];

  const deque = [[0, 0]];
  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  while (deque.length > 0) {
    const [r, c] = deque.shift();
    const d = dist[r][c];
    if (r === m - 1 && c === n - 1) break;

    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
        const w = grid[nr][nc];
        if (d + w < dist[nr][nc]) {
          dist[nr][nc] = d + w;
          if (w === 0) deque.unshift([nr, nc]);
          else deque.push([nr, nc]);
        }
      }
    }
  }

  return dist[m - 1][n - 1] < health;
};

var solve = findSafeWalk;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = findSafeWalk;`;

tests['findASafeWalkThroughAGrid'] = [
  { input: "[[[0, 1, 0, 0, 0], [0, 1, 0, 1, 0], [0, 0, 0, 1, 0]], 1]", output: "true" },
  { input: "[[[1, 1, 1], [1, 0, 1], [1, 1, 1]], 5]", output: "true" },
  { input: "[[[1, 1, 1, 1]], 4]", output: "false" }
];

// 60. minimumNumberOfValidStringsToFormTargetI
solutions['minimumNumberOfValidStringsToFormTargetI'] = `class TrieNode {
  constructor() {
    this.next = new Map();
  }
}

var minValidStrings = function(words, target) {
  const root = new TrieNode();
  for (const w of words) {
    let node = root;
    for (let i = 0; i < w.length; i++) {
      const ch = w[i];
      if (!node.next.has(ch)) node.next.set(ch, new TrieNode());
      node = node.next.get(ch);
    }
  }

  const n = target.length;
  const maxJump = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    let node = root;
    let len = 0;
    for (let j = i; j < n; j++) {
      const ch = target[j];
      if (!node.next.has(ch)) break;
      node = node.next.get(ch);
      len++;
    }
    maxJump[i] = len;
  }

  let jumps = 0, curEnd = 0, furthest = 0;
  for (let i = 0; i < n; i++) {
    if (i + maxJump[i] > furthest) {
      furthest = i + maxJump[i];
    }
    if (i === curEnd) {
      if (furthest === i) return -1;
      jumps++;
      curEnd = furthest;
      if (curEnd >= n) break;
    }
  }

  return curEnd >= n ? jumps : -1;
};

var solve = minValidStrings;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = minValidStrings;`;

tests['minimumNumberOfValidStringsToFormTargetI'] = [
  { input: "[[\"a\", \"b\", \"c\", \"ab\"], \"abc\"]", output: "2" },
  { input: "[[\"abababab\", \"ab\"], \"ababaababa\"]", output: "2" },
  { input: "[[\"abcdef\"], \"xyz\"]", output: "-1" }
];

// 61. lexicographicallyMinimumStringAfterRemovingStars
solutions['lexicographicallyMinimumStringAfterRemovingStars'] = `var clearStars = function(s) {
  const n = s.length;
  const stacks = Array.from({ length: 26 }, () => []);
  const removed = new Uint8Array(n);

  for (let i = 0; i < n; i++) {
    if (s[i] === '*') {
      removed[i] = 1;
      for (let c = 0; c < 26; c++) {
        if (stacks[c].length > 0) {
          const idx = stacks[c].pop();
          removed[idx] = 1;
          break;
        }
      }
    } else {
      stacks[s.charCodeAt(i) - 97].push(i);
    }
  }

  let ans = '';
  for (let i = 0; i < n; i++) {
    if (!removed[i]) ans += s[i];
  }
  return ans;
};

var solve = clearStars;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = clearStars;`;

tests['lexicographicallyMinimumStringAfterRemovingStars'] = [
  { input: "\"aaba*\"", output: "\"aab\"" },
  { input: "\"abc\"", output: "\"abc\"" }
];

// 62. continuousSubarrays
solutions['continuousSubarrays'] = `var continuousSubarrays = function(nums) {
  let ans = 0;
  let left = 0;
  const minDeque = [];
  const maxDeque = [];

  for (let right = 0; right < nums.length; right++) {
    const x = nums[right];
    while (minDeque.length > 0 && nums[minDeque[minDeque.length - 1]] >= x) minDeque.pop();
    minDeque.push(right);

    while (maxDeque.length > 0 && nums[maxDeque[maxDeque.length - 1]] <= x) maxDeque.pop();
    maxDeque.push(right);

    while (nums[maxDeque[0]] - nums[minDeque[0]] > 2) {
      left++;
      if (minDeque[0] < left) minDeque.shift();
      if (maxDeque[0] < left) maxDeque.shift();
    }

    ans += right - left + 1;
  }

  return ans;
};

var solve = continuousSubarrays;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = continuousSubarrays;`;

tests['continuousSubarrays'] = [
  { input: "[5, 4, 2, 4]", output: "8" },
  { input: "[1, 2, 3]", output: "6" }
];

// 63. minimumArrayChangesToMakeDifferencesEqual
solutions['minimumArrayChangesToMakeDifferencesEqual'] = `var minChanges = function(nums, k) {
  const n = nums.length;
  const m = n >> 1;
  const diffCount = new Int32Array(k + 1);
  const maxDiffCount = new Int32Array(k + 1);

  for (let i = 0; i < m; i++) {
    const a = nums[i], b = nums[n - 1 - i];
    const diff = Math.abs(a - b);
    diffCount[diff]++;
    const maxD = Math.max(k - a, a, k - b, b);
    maxDiffCount[maxD]++;
  }

  const prefMaxDiff = new Int32Array(k + 2);
  for (let x = 0; x <= k; x++) {
    prefMaxDiff[x + 1] = prefMaxDiff[x] + maxDiffCount[x];
  }

  let ans = 1e9;
  for (let x = 0; x <= k; x++) {
    const cost2 = x > 0 ? prefMaxDiff[x] : 0;
    const cost1 = (m - cost2) - diffCount[x];
    const total = cost1 + 2 * cost2;
    if (total < ans) ans = total;
  }

  return ans;
};

var solve = minChanges;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = minChanges;`;

tests['minimumArrayChangesToMakeDifferencesEqual'] = [
  { input: "[[1, 0, 1, 2, 4, 3], 4]", output: "2" },
  { input: "[[0, 1, 2, 3, 3, 6, 5, 4], 6]", output: "2" }
];

// 64. zeroArrayTransformationIII
solutions['zeroArrayTransformationIII'] = `class MaxHeap {
  constructor() {
    this.h = [];
  }
  push(v) {
    this.h.push(v);
    let i = this.h.length - 1;
    while (i > 0) {
      let p = (i - 1) >> 1;
      if (this.h[p] < this.h[i]) {
        let t = this.h[p];
        this.h[p] = this.h[i];
        this.h[i] = t;
        i = p;
      } else break;
    }
  }
  pop() {
    if (!this.h.length) return null;
    let top = this.h[0];
    let end = this.h.pop();
    if (this.h.length) {
      this.h[0] = end;
      let i = 0, n = this.h.length;
      while ((i << 1) + 1 < n) {
        let l = (i << 1) + 1, r = l + 1, best = l;
        if (r < n && this.h[r] > this.h[l]) best = r;
        if (this.h[best] > this.h[i]) {
          let t = this.h[best];
          this.h[best] = this.h[i];
          this.h[i] = t;
          i = best;
        } else break;
      }
    }
    return top;
  }
  peek() {
    return this.h[0] ?? null;
  }
  size() {
    return this.h.length;
  }
}

var maxRemoval = function(nums, queries) {
  queries.sort((a, b) => a[0] - b[0]);
  const n = nums.length;
  const heap = new MaxHeap();
  const diff = new Int32Array(n + 1);
  let curDec = 0;
  let qIdx = 0;
  let usedCount = 0;

  for (let i = 0; i < n; i++) {
    curDec += diff[i];
    while (qIdx < queries.length && queries[qIdx][0] === i) {
      heap.push(queries[qIdx][1]);
      qIdx++;
    }

    while (curDec < nums[i]) {
      if (heap.size() === 0 || heap.peek() < i) return -1;
      const r = heap.pop();
      curDec++;
      diff[r + 1]--;
      usedCount++;
    }
  }

  return queries.length - usedCount;
};

var solve = maxRemoval;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = maxRemoval;`;

tests['zeroArrayTransformationIII'] = [
  { input: "[[2, 0, 2], [[0, 2], [0, 2], [1, 1]]]", output: "1" },
  { input: "[[1, 1, 1, 1], [[1, 3], [0, 2], [1, 3], [1, 2]]]", output: "2" },
  { input: "[[1, 2, 3, 4], [[0, 3]]]", output: "-1" }
];

// 65. addingSpacesToAString
solutions['addingSpacesToAString'] = `var addSpaces = function(s, spaces) {
  const res = [];
  let p = 0;
  for (let i = 0; i < spaces.length; i++) {
    res.push(s.slice(p, spaces[i]));
    p = spaces[i];
  }
  res.push(s.slice(p));
  return res.join(' ');
};

var solve = addSpaces;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = addSpaces;`;

tests['addingSpacesToAString'] = [
  { input: "[\"LeetcodeHelpsMeLearn\", [8, 13, 15]]", output: "\"Leetcode Helps Me Learn\"" },
  { input: "[\"spacing\", [0, 1, 2, 3, 4, 5, 6]]", output: "\" s p a c i n g\"" }
];

// 66. minimumCostToConvertStringI
solutions['minimumCostToConvertStringI'] = `var minimumCost = function(source, target, original, changed, cost) {
  const INF = 1e14;
  const dist = Array.from({ length: 26 }, () => new Float64Array(26).fill(INF));
  for (let i = 0; i < 26; i++) dist[i][i] = 0;

  for (let i = 0; i < original.length; i++) {
    const u = original[i].charCodeAt(0) - 97;
    const v = changed[i].charCodeAt(0) - 97;
    const c = cost[i];
    if (c < dist[u][v]) dist[u][v] = c;
  }

  for (let k = 0; k < 26; k++) {
    for (let i = 0; i < 26; i++) {
      for (let j = 0; j < 26; j++) {
        const sum = dist[i][k] + dist[k][j];
        if (sum < dist[i][j]) dist[i][j] = sum;
      }
    }
  }

  let totalCost = 0;
  for (let i = 0; i < source.length; i++) {
    const u = source.charCodeAt(i) - 97;
    const v = target.charCodeAt(i) - 97;
    if (dist[u][v] >= INF) return -1;
    totalCost += dist[u][v];
  }

  return totalCost;
};

var solve = minimumCost;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1], parsed[2], parsed[3], parsed[4])));
    }
  } catch (e) {}
}

module.exports = minimumCost;`;

tests['minimumCostToConvertStringI'] = [
  {
    input: "[\"abcd\", \"acbe\", [\"a\", \"b\", \"c\", \"c\", \"e\", \"d\"], [\"b\", \"c\", \"b\", \"e\", \"b\", \"e\"], [2, 5, 5, 1, 2, 20]]",
    output: "28"
  },
  {
    input: "[\"aaaa\", \"bbbb\", [\"a\", \"c\"], [\"c\", \"b\"], [1, 2]]",
    output: "12"
  },
  {
    input: "[\"abcd\", \"abce\", [\"a\"], [\"e\"], [10000]]",
    output: "-1"
  }
];

// Write all solutions and tests
let written = 0;
for (const [name, code] of Object.entries(solutions)) {
  fs.writeFileSync(path.join(solDir, `${name}.js`), code, 'utf-8');
  fs.writeFileSync(path.join(rootSolDir, `${name}.js`), code, 'utf-8');
  if (tests[name]) {
    fs.writeFileSync(path.join(testDir, `${name}.json`), JSON.stringify(tests[name], null, 2), 'utf-8');
  }
  written++;
}

console.log('Successfully built ' + written + ' LeetCode solutions and test fixtures.');
