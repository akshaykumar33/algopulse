# Binary Search & Answer Spaces — Algorithmic Patterns & Knowledge Base

## 1. Core Principles & Mental Model
Binary Search is a divide-and-conquer algorithm that operates on any **monotonic** predicate function $P(x)$. It divides the search space in half at each iteration, reducing complexity from $O(N)$ to $O(\log N)$.

### Two Domains of Binary Search:
1. **Discrete Array Search:** Finding a target value, lower bound, or upper bound in a sorted array.
2. **Binary Search on the Answer Space:** When optimizing a value $X$ (e.g. min time, max capacity), if testing whether an answer $X$ is feasible takes $O(K)$ time and feasibility is monotonic ($P(X) = \text{true} \implies P(X+1) = \text{true}$), binary search finds the optimal boundary in $O(K \log(\text{Range}))$.

---

## 2. Recognition Signals ("When you see X, think Y")
- **"Minimize the maximum / Maximize the minimum":** $\implies$ The quintessential binary search on answer signal.
- **"Find first element $\ge K$ (Lower Bound)":** $\implies$ Standard binary search.
- **Constraints: $N \le 2 \cdot 10^5$, values up to $10^{18}$, condition verification is greedy in $O(N)$:** $\implies$ Binary search on answer in $O(N \log(10^{18})) \approx 60 N$ ops.

---

## 3. Key Mathematical Theorems & Formulations
1. **Monotonicity Requirement:**
   The predicate function $P(x)$ must partition the domain into two contiguous regions:
   $$[\text{false}, \text{false}, \dots, \text{false}, \mathbf{true}, \text{true}, \dots, \text{true}]$$
2. **Midpoint Overflow Protection:**
   $$\text{mid} = \text{low} + \lfloor \frac{\text{high} - \text{low}}{2} \rfloor$$
   (Prevents integer overflow encountered in $(\text{low} + \text{high}) / 2$).

---

## 4. Node.js / JavaScript Implementation Patterns & Traps

### Pattern 1: Binary Search on Answer (Lower Bound / Minimum Feasible)
```javascript
function findMinFeasible(low, high, isFeasible) {
  let ans = high;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (isFeasible(mid)) {
      ans = mid;         // Record candidate
      high = mid - 1;    // Try smaller
    } else {
      low = mid + 1;     // Must be larger
    }
  }
  return ans;
}
```

### Pattern 2: Lower Bound in Sorted Array
```javascript
// Finds first index with arr[idx] >= target
function lowerBound(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  let ans = arr.length;

  while (low <= high) {
    const mid = (low + high) >> 1;
    if (arr[mid] >= target) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return ans;
}
```

### Critical Traps:
- **Infinite Loop on `while (low < high)`:** If updating `low = mid`, when `high - low === 1`, integer division floors `mid` to `low`, causing an infinite loop. Always use `low <= high` with explicit `ans = mid` candidate saving and `mid - 1` / `mid + 1` steps.
- **Bitwise Shift `>> 1` Over $2^{31} - 1$:** `(low + high) >> 1` treats operands as 32-bit signed integers. For bounds above $2 \cdot 10^9$, `>>` overflows into negative numbers! Use `Math.floor((low + high) / 2)`.

---

## 5. Sub-Patterns & Archetypes
1. **Discrete Value Search:** Exact search or nearest element.
2. **Feasibility Predicate:** Testing capacity, time, or partition counts.
3. **Continuous / Floating-Point Binary Search:** Fixed iterations (e.g. 100 steps) for high precision:
   ```javascript
   for (let iter = 0; iter < 100; iter++) {
     const mid = (low + high) / 2;
     if (check(mid)) high = mid;
     else low = mid;
   }
   ```

---

## 6. Solved Problems Catalog & Takeaways

| Problem | Platform | Rating | Solution File | Core Insight / Takeaway |
|---|---|---|---|---|
| [Melt Gold](https://www.codechef.com/problems/MELTGOLD) | `CodeChef` | `835` | `meltGold.js` | Time $T$ satisfies $\frac{T(T+1)}{2} \ge Y - X$. Solve via binary search or quadratic formula. |
| [Legs](https://codeforces.com/problemset/problem/1996/A) | `Codeforces` | `800` | `legs.js` | Key algorithmic application from Day 2026-10-01. |

---

## 7. Common Pitfalls & Anti-Patterns
- **Non-Monotonic Predicates:** If the condition fluctuates (true, false, true), binary search yields incorrect results. Always mathematically prove monotonicity before writing the search.
