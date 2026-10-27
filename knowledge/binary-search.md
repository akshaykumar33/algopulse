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
| [K-divisible Sum](https://codeforces.com/problemset/problem/1476/A) | `Codeforces` | `1000` | `kDivisibleSum.js` | Key algorithmic application from Day 2026-10-05. |
| [Eating Queries](https://codeforces.com/problemset/problem/1676/E) | `Codeforces` | `1100` | `eatingQueries.js` | Key algorithmic application from Day 2026-10-09. |
| [Traffic Light](https://codeforces.com/problemset/problem/1744/C) | `Codeforces` | `1000` | `trafficLight.js` | Key algorithmic application from Day 2026-10-12. |
| [Eating Candies](https://codeforces.com/problemset/problem/1669/F) | `Codeforces` | `1100` | `eatingCandies.js` | Key algorithmic application from Day 2026-10-16. |
| [Fear of the Dark](https://codeforces.com/problemset/problem/1886/B) | `Codeforces` | `1200` | `fearOfTheDark.js` | Key algorithmic application from Day 2026-10-17. |
| [Ternary String](https://codeforces.com/problemset/problem/1354/B) | `Codeforces` | `1200` | `ternaryString.js` | Key algorithmic application from Day 2026-10-18. |
| [Shovels and Swords](https://codeforces.com/problemset/problem/1366/A) | `Codeforces` | `1100` | `shovelsAndSwords.js` | Key algorithmic application from Day 2026-10-19. |
| [Building an Aquarium](https://codeforces.com/problemset/problem/1873/E) | `Codeforces` | `1100` | `buildingAnAquarium.js` | Key algorithmic application from Day 2026-10-20. |
| [Variety is Discouraged](https://codeforces.com/problemset/problem/2064/B) | `Codeforces` | `1100` | `varietyIsDiscouraged.js` | Key algorithmic application from Day 2026-10-21. |
| [Getting Points](https://codeforces.com/problemset/problem/1902/B) | `Codeforces` | `1100` | `gettingPoints.js` | Key algorithmic application from Day 2026-10-21. |
| [Rank List](https://codeforces.com/problemset/problem/166/A) | `Codeforces` | `1100` | `rankList.js` | Key algorithmic application from Day 2026-10-22. |
| [Chloe and the sequence ](https://codeforces.com/problemset/problem/743/B) | `Codeforces` | `1200` | `chloeAndTheSequence.js` | Key algorithmic application from Day 2026-10-23. |
| [Chat Order](https://codeforces.com/problemset/problem/637/B) | `Codeforces` | `1200` | `chatOrder.js` | Key algorithmic application from Day 2026-10-24. |
| [Vika and the Bridge](https://codeforces.com/problemset/problem/1848/B) | `Codeforces` | `1200` | `vikaAndTheBridge.js` | Key algorithmic application from Day 2026-10-24. |
| [Kar Salesman](https://codeforces.com/problemset/problem/2022/B) | `Codeforces` | `1300` | `karSalesman.js` | Key algorithmic application from Day 2026-10-24. |
| [Sanatorium](https://codeforces.com/problemset/problem/732/C) | `Codeforces` | `1200` | `sanatorium.js` | Key algorithmic application from Day 2026-10-24. |
| [The Strict Teacher (Hard Version)](https://codeforces.com/problemset/problem/2005/B2) | `Codeforces` | `1200` | `theStrictTeacherHardVersion.js` | Key algorithmic application from Day 2026-10-24. |
| [Inflation](https://codeforces.com/problemset/problem/1476/B) | `Codeforces` | `1300` | `inflation.js` | Key algorithmic application from Day 2026-10-25. |
| [Find the Different Ones!](https://codeforces.com/problemset/problem/1927/D) | `Codeforces` | `1300` | `findTheDifferentOnes.js` | Key algorithmic application from Day 2026-10-25. |
| [All-in-one Gun](https://codeforces.com/problemset/problem/2192/C) | `Codeforces` | `1300` | `allInOneGun.js` | Key algorithmic application from Day 2026-10-25. |
| [Worms](https://codeforces.com/problemset/problem/474/B) | `Codeforces` | `1200` | `worms.js` | Key algorithmic application from Day 2026-10-26. |
| [Boring Day](https://codeforces.com/problemset/problem/1982/C) | `Codeforces` | `1200` | `boringDay.js` | Key algorithmic application from Day 2026-10-26. |
| [T-primes](https://codeforces.com/problemset/problem/230/B) | `Codeforces` | `1300` | `tPrimes.js` | Key algorithmic application from Day 2026-10-26. |
| [Points on Line](https://codeforces.com/problemset/problem/251/A) | `Codeforces` | `1300` | `pointsOnLine.js` | Key algorithmic application from Day 2026-10-26. |
| [Eugeny and Play List](https://codeforces.com/problemset/problem/302/B) | `Codeforces` | `1200` | `eugenyAndPlayList.js` | Key algorithmic application from Day 2026-10-27. |
| [Three Parts of the Array](https://codeforces.com/problemset/problem/1006/C) | `Codeforces` | `1200` | `threePartsOfTheArray.js` | Key algorithmic application from Day 2026-10-27. |
| [Two Cakes](https://codeforces.com/problemset/problem/911/B) | `Codeforces` | `1200` | `twoCakes.js` | Key algorithmic application from Day 2026-10-27. |
| [Monocarp's String](https://codeforces.com/problemset/problem/2145/C) | `Codeforces` | `1300` | `monocarpSString.js` | Key algorithmic application from Day 2026-10-27. |

---

## 7. Common Pitfalls & Anti-Patterns
- **Non-Monotonic Predicates:** If the condition fluctuates (true, false, true), binary search yields incorrect results. Always mathematically prove monotonicity before writing the search.
