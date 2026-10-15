# Data Structures & Prefix Sums — Algorithmic Patterns & Knowledge Base

## 1. Core Principles & Mental Model
Data structures organize data to enable efficient queries and updates. In competitive programming, mastering fundamental structures like Prefix Sums, Frequency Maps, Monotonic Stacks/Deques, Priority Queues (Heaps), and Disjoint Set Union (DSU) turns expensive repetitive calculations into $O(1)$ or $O(\log N)$ operations.

---

## 2. Recognition Signals ("When you see X, think Y")
- **"Calculate sum of elements in range $[L, R]$ in $O(1)$":** $\implies$ 1D Prefix Sums.
- **"Subarray with sum equal to $K$":** $\implies$ Prefix Sum + Hash Map (storing prefix frequencies).
- **"Next Greater / Smaller Element in $O(N)$":** $\implies$ Monotonic Stack.
- **"Sliding Window Maximum in $O(N)$":** $\implies$ Monotonic Deque.
- **"Maintain running maximum / minimum with dynamic additions":** $\implies$ Binary Heap (Priority Queue).
- **"Dynamic connectivity / cycle detection in undirected graphs":** $\implies$ Disjoint Set Union (DSU).

---

## 3. Key Mathematical Theorems & Formulations
1. **1D Prefix Sum Invariant:**
   $$\text{pref}[i] = \sum_{j=0}^{i-1} arr[j] \implies \sum_{k=L}^R arr[k] = \text{pref}[R + 1] - \text{pref}[L]$$
2. **Difference Array (Range Additions):**
   To add $+V$ to all elements in range $[L, R]$:
   $$\text{diff}[L] += V, \quad \text{diff}[R + 1] -= V$$
   Taking the prefix sum of $\text{diff}$ yields the final values in $O(N)$.

---

## 4. Node.js / JavaScript Implementation Patterns & Traps

### Pattern 1: Fast 1D Prefix Sum Array
```javascript
function buildPrefixSum(arr) {
  const n = arr.length;
  // Use Float64Array or standard Array to avoid 32-bit overflow on large sums
  const pref = new Float64Array(n + 1);
  for (let i = 0; i < n; i++) {
    pref[i + 1] = pref[i] + arr[i];
  }
  return pref;
}

// Query range [L, R] (0-indexed inclusive)
const rangeSum = (pref, L, R) => pref[R + 1] - pref[L];
```

### Pattern 2: Binary Heap / Priority Queue (Min-Heap)
```javascript
class MinHeap {
  constructor() {
    this.data = [];
  }
  push(val) {
    this.data.push(val);
    this._bubbleUp(this.data.length - 1);
  }
  pop() {
    if (this.data.length === 0) return null;
    const top = this.data[0];
    const bottom = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = bottom;
      this._sinkDown(0);
    }
    return top;
  }
  _bubbleUp(idx) {
    while (idx > 0) {
      const p = (idx - 1) >> 1;
      if (this.data[idx] < this.data[p]) {
        [this.data[idx], this.data[p]] = [this.data[p], this.data[idx]];
        idx = p;
      } else break;
    }
  }
  _sinkDown(idx) {
    const len = this.data.length;
    while (true) {
      let smallest = idx;
      const l = (idx << 1) + 1, r = (idx << 1) + 2;
      if (l < len && this.data[l] < this.data[smallest]) smallest = l;
      if (r < len && this.data[r] < this.data[smallest]) smallest = r;
      if (smallest !== idx) {
        [this.data[idx], this.data[smallest]] = [this.data[smallest], this.data[idx]];
        idx = smallest;
      } else break;
    }
  }
  size() { return this.data.length; }
}
```

### Critical Traps:
- **`Int32Array` Accumulator Overflow:** An `Int32Array` wraps around at $2^{31} - 1 \approx 2.14 \times 10^9$. If summing $2 \cdot 10^5$ elements each up to $10^9$, the sum can reach $2 \cdot 10^{14}$! **Never store prefix sums in an `Int32Array`**; use `Float64Array`, `BigInt64Array`, or plain JS numbers.

---

## 5. Sub-Patterns & Archetypes
1. **Prefix Sum + Hash Map:** Finding subsegments with sum 0 or matching remainder.
2. **Frequency Map via Plain Object:** Key lookup and incrementing.
3. **Monotonic Stack:** Linear scan maintaining strictly ascending or descending elements.

---

## 6. Solved Problems Catalog & Takeaways

| Problem | Platform | Rating | Solution File | Core Insight / Takeaway |
|---|---|---|---|---|
| [Majority Element](https://leetcode.com/problems/majority-element/) | `LeetCode` | `Easy` | `majorityElement.js` | Boyer-Moore Voting Algorithm: tracks dominant candidate in $O(N)$ time and $O(1)$ space. |
| [Valid Pair](https://www.codechef.com/problems/SOCKS1) | `CodeChef` | `851` | `validPair.js` | Frequency check across three socks: if any two colors match ($A=B \lor B=C \lor A=C$), valid pair exists. |
| [Minimize Inversions](https://codeforces.com/problemset/problem/1918/B) | `Codeforces` | `900` | `minimizeInversions.js` | Key algorithmic application from Day 2026-09-30. |
| [Also Try Minecraft](https://codeforces.com/problemset/problem/1709/B) | `Codeforces` | `900` | `alsoTryMinecraft.js` | Key algorithmic application from Day 2026-10-05. |
| [Progressive Square](https://codeforces.com/problemset/problem/1955/B) | `Codeforces` | `1000` | `progressiveSquare.js` | Key algorithmic application from Day 2026-10-08. |
| [Train and Queries](https://codeforces.com/problemset/problem/1702/C) | `Codeforces` | `1100` | `trainAndQueries.js` | Key algorithmic application from Day 2026-10-09. |
| [Move to the End](https://codeforces.com/problemset/problem/2104/B) | `Codeforces` | `1000` | `moveToTheEnd.js` | Key algorithmic application from Day 2026-10-13. |
| [Double Strings](https://codeforces.com/problemset/problem/1703/D) | `Codeforces` | `1100` | `doubleStrings.js` | Key algorithmic application from Day 2026-10-13. |
| [Valerii Against Everyone](https://codeforces.com/problemset/problem/1438/B) | `Codeforces` | `1000` | `valeriiAgainstEveryone.js` | Key algorithmic application from Day 2026-10-15. |
| [Subsequence Addition (Easy Version)](https://codeforces.com/problemset/problem/1807/G1) | `Codeforces` | `1100` | `subsequenceAdditionEasyVersion.js` | Key algorithmic application from Day 2026-10-15. |
| [Eating Candies](https://codeforces.com/problemset/problem/1669/F) | `Codeforces` | `1100` | `eatingCandies.js` | Key algorithmic application from Day 2026-10-16. |

---

## 7. Common Pitfalls & Anti-Patterns
- **JavaScript `Set` / `Map` with Objects as Keys:** In JS, `new Set().add([1, 2]).has([1, 2])` is `false` (reference equality!). Serialize compound keys as strings: `\`${r},${c}\``.
