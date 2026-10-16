# Dynamic Programming — Algorithmic Patterns & Knowledge Base

## 1. Core Principles & Mental Model
Dynamic Programming (DP) solves complex problems by breaking them down into simpler subproblems, storing the results of these subproblems in a memory table (memoization or tabulation) to prevent redundant re-computation.

### The Four Pillars of DP:
1. **State Definition:** What minimal tuple of parameters $(i, j, \dots)$ uniquely characterizes the state of the system?
2. **Transition Function:** How does state $DP[\text{current}]$ derive from previously computed optimal states?
3. **Base Cases:** What are the smallest non-decomposable trivial subproblems?
4. **Order of Computation & Memory Optimization:** In what order must loops execute so dependencies are computed before needed? Can older states be discarded to save space?

---

## 2. Recognition Signals ("When you see X, think Y")
- **"Find the maximum / minimum cost to reach state $N$":** $\implies$ Optimization DP.
- **"Count the number of ways to form target value":** $\implies$ Counting DP (sum of transitions).
- **"Determine if target sum is achievable using elements":** $\implies$ Boolean Knapsack / Subset Sum.
- **Constraints: $N \le 2000$ with $O(N^2)$ or $N \le 500$ with $O(N^3)$:** $\implies$ Interval / 2D DP.
- **Constraints: $N \le 20$:** $\implies$ Bitmask DP.

---

## 3. Key Mathematical Theorems & Formulations
1. **0-1 Knapsack / Subset Sum:**
   $$DP[i][w] = \max(DP[i-1][w], DP[i-1][w - \text{weight}[i]] + \text{val}[i])$$
   *1D Space Optimization:* Iterate $w$ **backwards** from $W$ down to $\text{weight}[i]$ to avoid using the same item multiple times:
   $$DP[w] = DP[w] \lor DP[w - \text{weight}[i]]$$
2. **Unbounded Knapsack (Coin Change):**
   Iterate $w$ **forwards** from $\text{weight}[i]$ up to $W$ to allow repeated item usage.

---

## 4. Node.js / JavaScript Implementation Patterns & Traps

### Pattern: 1D Space-Optimized Subset Sum (Boolean Knapsack)
```javascript
// Check if subset sum equals target
function canPartition(nums, target) {
  const dp = new Uint8Array(target + 1);
  dp[0] = 1; // Base case: sum 0 is always achievable

  for (const x of nums) {
    for (let w = target; w >= x; w--) {
      if (dp[w - x]) {
        dp[w] = 1;
      }
    }
  }
  return Boolean(dp[target]);
}
```

### Pattern: TypedArray Allocation for High Performance
```javascript
// Fast 1D DP table allocation
const dp = new Int32Array(maxN + 1);
dp.fill(-1); // Memoization sentinel
```

### Critical Traps:
- **Nested Array Allocation inside Multi-Test Loop:** If $T = 10^4$ and you do `Array.from({length: 2000}, () => new Array(2000))` in each testcase, you will get **Memory Limit Exceeded (MLE)** or **Time Limit Exceeded (TLE)** from garbage collection. Pre-allocate or reuse buffers!
- **Call Stack Limits in Top-Down Memoization:** Recursive `dfs(i, j)` in Node.js fails if recursion depth exceeds $\sim 10,000$. Use iterative bottom-up tabulation for deep constraints.

---

## 5. Sub-Patterns & Archetypes
1. **Linear 1D DP:** $DP[i]$ depends on $DP[i-1], DP[i-2]$ (e.g. Climbing Stairs, House Robber).
2. **Knapsack Archetypes:** 0-1 (backward loop), Unbounded (forward loop), Bounded (binary splitting).
3. **Grid DP:** Pathfinding on $N \times M$ matrix where $DP[r][c] = \text{cost} + \min(DP[r-1][c], DP[r][c-1])$.

---

## 6. Solved Problems Catalog & Takeaways

| Problem | Platform | Rating | Solution File | Core Insight / Takeaway |
|---|---|---|---|---|
| [Fair Division](https://codeforces.com/problemset/problem/1472/B) | `Codeforces` | `800` | `fairDivision.js` | Subset sum / parity balance: partition candies of weight 1 and 2 into equal sums. Total sum must be even; if weight 1 count is 0, weight 2 count must be even. |
| [Chess For Three](https://codeforces.com/problemset/problem/1973/A) | `Codeforces` | `900` | `chessForThree.js` | Key algorithmic application from Day 2026-09-30. |
| [Make it Divisible by 25](https://codeforces.com/problemset/problem/1593/B) | `Codeforces` | `900` | `makeItDivisibleBy25.js` | Key algorithmic application from Day 2026-10-01. |
| [Gold Rush](https://codeforces.com/problemset/problem/1829/D) | `Codeforces` | `1000` | `goldRush.js` | Key algorithmic application from Day 2026-10-02. |
| [Cormen --- The Best Friend Of a Man](https://codeforces.com/problemset/problem/732/B) | `Codeforces` | `1000` | `cormenTheBestFriendOfAMan.js` | Key algorithmic application from Day 2026-10-03. |
| [Also Try Minecraft](https://codeforces.com/problemset/problem/1709/B) | `Codeforces` | `900` | `alsoTryMinecraft.js` | Key algorithmic application from Day 2026-10-05. |
| [Birthday Feast](https://www.codechef.com/problems/BIRTHDAYFEAST) | `CodeChef` | `Easy` | `birthdayFeast.js` | Unbounded Min-Cost Knapsack tabulated up to max(A_i). Sum individual dp[A_i] per friend. |
| [Sasha and His Trip](https://codeforces.com/problemset/problem/1113/A) | `Codeforces` | `900` | `sashaAndHisTrip.js` | Key algorithmic application from Day 2026-10-06. |
| [Kefa and First Steps](https://codeforces.com/problemset/problem/580/A) | `Codeforces` | `900` | `kefaAndFirstSteps.js` | Key algorithmic application from Day 2026-10-06. |
| [Rudolf and 121](https://codeforces.com/problemset/problem/1941/B) | `Codeforces` | `1000` | `rudolfAnd121.js` | Key algorithmic application from Day 2026-10-06. |
| [Rudolf and the Ugly String](https://codeforces.com/problemset/problem/1941/C) | `Codeforces` | `900` | `rudolfAndTheUglyString.js` | Key algorithmic application from Day 2026-10-07. |
| [Non-Substring Subsequence](https://codeforces.com/problemset/problem/1451/B) | `Codeforces` | `900` | `nonSubstringSubsequence.js` | Key algorithmic application from Day 2026-10-08. |
| [Filling Diamonds](https://codeforces.com/problemset/problem/1339/A) | `Codeforces` | `900` | `fillingDiamonds.js` | Key algorithmic application from Day 2026-10-08. |
| [Two Binary Strings](https://codeforces.com/problemset/problem/1861/B) | `Codeforces` | `1000` | `twoBinaryStrings.js` | Key algorithmic application from Day 2026-10-09. |
| [Move to the End](https://codeforces.com/problemset/problem/2104/B) | `Codeforces` | `1000` | `moveToTheEnd.js` | Key algorithmic application from Day 2026-10-13. |
| [Save the Magazines](https://codeforces.com/problemset/problem/1743/C) | `Codeforces` | `1100` | `saveTheMagazines.js` | Key algorithmic application from Day 2026-10-14. |
| [Subsequence Addition (Easy Version)](https://codeforces.com/problemset/problem/1807/G1) | `Codeforces` | `1100` | `subsequenceAdditionEasyVersion.js` | Key algorithmic application from Day 2026-10-15. |
| [Monsters Attack!](https://codeforces.com/problemset/problem/1923/B) | `Codeforces` | `1100` | `monstersAttack.js` | Key algorithmic application from Day 2026-10-16. |
| [Uninteresting Number](https://codeforces.com/problemset/problem/2050/C) | `Codeforces` | `1200` | `uninterestingNumber.js` | Key algorithmic application from Day 2026-10-16. |
| [Yet Another Coin Problem](https://codeforces.com/problemset/problem/1934/B) | `Codeforces` | `1200` | `yetAnotherCoinProblem.js` | Key algorithmic application from Day 2026-10-16. |
| [Niko's Tactical Cards](https://codeforces.com/problemset/problem/2173/B) | `Codeforces` | `1100` | `nikoSTacticalCards.js` | Key algorithmic application from Day 2026-10-17. |
| [BerSU Ball](https://codeforces.com/problemset/problem/489/B) | `Codeforces` | `1200` | `berSUBall.js` | Key algorithmic application from Day 2026-10-17. |

---

## 7. Common Pitfalls & Anti-Patterns
- **Uninitialized DP Values:** For minimization DP, initializing with `Number.MAX_SAFE_INTEGER` can cause integer overflow if you add to it. Initialize with `1e9` or check for sentinel before adding.
