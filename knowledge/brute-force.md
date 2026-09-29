# Brute Force & Search Pruning — Algorithmic Patterns & Knowledge Base

## 1. Core Principles & Mental Model
Brute Force systematically evaluates every candidate in the problem's search space to find an optimal or valid configuration. In competitive programming, brute force is valid when constraints are sufficiently small, or when paired with aggressive branch-and-bound pruning.

### Time Complexity Feasibility Matrix:
- $N \le 10 \implies O(N!) \approx 3.6 \times 10^6$ ops (Permutations).
- $N \le 20 \implies O(2^N) \approx 1.05 \times 10^6$ ops (Subsets).
- $N \le 500 \implies O(N^3) \approx 1.25 \times 10^8$ ops (Triple nested loops).
- $N \le 5000 \implies O(N^2) \approx 2.5 \times 10^7$ ops (Double nested loops).

---

## 2. Recognition Signals ("When you see X, think Y")
- **Constraints: $N \le 8$ or $N \le 10$:** $\implies$ Full permutation enumeration (`next_permutation`).
- **Constraints: $N \le 20$:** $\implies$ Recursion with pruning or bitmask iteration.
- **Constraints: $N \le 40$:** $\implies$ Meet-in-the-middle ($2^{20} + 2^{20} \approx 2 \times 10^6$ ops).
- **"Find if any combination of 5 increments achieves max product":** $\implies$ Brute force all distributions of 5 operations ($O(3^5) = 243$ states).

---

## 3. Key Mathematical Theorems & Search Reductions
1. **Branch-and-Bound Principle:**
   If current accumulated cost already exceeds known minimum answer, terminate branch immediately:
   $$\text{if } (\text{currentCost} \ge \text{bestAnswer}) \quad \text{return;}$$
2. **Meet-in-the-Middle:**
   Split array of size $N$ into two halves of size $N/2$. Compute all $2^{N/2}$ subset sums for each half, sort the second half, and use binary search to match targets in $O(2^{N/2} \cdot N/2)$ time.

---

## 4. Node.js / JavaScript Implementation Patterns & Traps

### Pattern 1: Nested Small Constrained Loops
```javascript
// Example: Only Pluses (Codeforces 1992A)
// Distribute 5 increments among 3 variables a, b, c
let maxProduct = 0;
for (let i = 0; i <= 5; i++) {
  for (let j = 0; j <= 5 - i; j++) {
    const k = 5 - i - j;
    const prod = (a + i) * (b + j) * (c + k);
    if (prod > maxProduct) maxProduct = prod;
  }
}
```

### Pattern 2: Recursive Backtracking with Pruning
```javascript
function backtrack(index, currentSum, target, arr) {
  if (currentSum === target) return true;
  if (currentSum > target || index >= arr.length) return false;

  // Pruning: early exit if remaining maximum possible sum is insufficient
  // Branch 1: include element
  if (backtrack(index + 1, currentSum + arr[index], target, arr)) return true;
  // Branch 2: exclude element
  if (backtrack(index + 1, currentSum, target, arr)) return true;

  return false;
}
```

### Critical Traps:
- **Excessive Object / Array Allocations in Recursion:** Avoid doing `backtrack([...currentList, x])` because copying arrays at every step creates $O(2^N \cdot N)$ memory overhead. Use a mutable array with push and pop:
  ```javascript
  path.push(x);
  backtrack(...);
  path.pop();
  ```

---

## 5. Sub-Patterns & Archetypes
1. **Iterative Enumeration:** Exhaustively testing all coordinates $(x, y)$ or bounded integer choices.
2. **Backtracking:** Depth-first construction with undo operations upon reaching dead ends.
3. **Meet-in-the-Middle:** Splitting exponential search spaces into halves.

---

## 6. Solved Problems Catalog & Takeaways

| Problem | Platform | Rating | Solution File | Core Insight / Takeaway |
|---|---|---|---|---|
| [Only Pluses](https://codeforces.com/problemset/problem/1992/A) | `Codeforces` | `800` | `onlyPluses.js` | With only 5 operations across 3 variables, the total search space is $\binom{5+3-1}{3-1} = 21$ combinations; trivial brute force. |
| [Watermelon](https://codeforces.com/problemset/problem/4/A) | `Codeforces` | `800` | `watermelon.js` | Feasibility check across split pairs $(2, w-2)$. |

---
| [Team](https://codeforces.com/problemset/problem/231/A) | `undefined` | `800` | `team.js` | Key algorithmic application from Day 2026-09-25. |
| [Minimize!](https://codeforces.com/problemset/problem/2009/A) | `undefined` | `800` | `minimize.js` | Key algorithmic application from Day 2026-09-26. |
| [Maximum in Table](https://codeforces.com/problemset/problem/509/A) | `undefined` | `800` | `maximumInTable.js` | Key algorithmic application from Day 2026-09-27. |
| [Beautiful Year](https://codeforces.com/problemset/problem/271/A) | `undefined` | `800` | `beautifulYear.js` | Key algorithmic application from Day 2026-09-27. |
| [Two Vessels](https://codeforces.com/problemset/problem/1872/A) | `undefined` | `800` | `twoVessels.js` | Key algorithmic application from Day 2026-09-27. |
| [I_love_\%username\%](https://codeforces.com/problemset/problem/155/A) | `undefined` | `800` | `iLoveUsername.js` | Key algorithmic application from Day 2026-09-27. |
| [One and Two](https://codeforces.com/problemset/problem/1788/A) | `Codeforces` | `800` | `oneAndTwo.js` | Key algorithmic application from Day 2026-09-28. |
| [Beautiful Average](https://codeforces.com/problemset/problem/2162/A) | `Codeforces` | `800` | `beautifulAverage.js` | Key algorithmic application from Day 2026-09-28. |
| [Fibonacciness](https://codeforces.com/problemset/problem/2060/A) | `Codeforces` | `800` | `fibonacciness.js` | Key algorithmic application from Day 2026-09-28. |


## 7. Common Pitfalls & Anti-Patterns
- **Failing to Estimate States:** Always multiply loop bounds before coding: if the loop runs $10^9$ times, it **will** TLE. Node.js executes roughly $10^8$ operations per second.
