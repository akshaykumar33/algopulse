# Greedy Algorithms — Algorithmic Patterns & Knowledge Base

## 1. Core Principles & Mental Model
A greedy algorithm makes the locally optimal choice at each step with the hypothesis that these local choices lead to a globally optimal solution. Unlike dynamic programming, greedy decisions are irrevocable: once a choice is made, it is never reconsidered or backtracked.

### The Two Necessary Conditions:
1. **Greedy-Choice Property:** A global optimum can be arrived at by selecting a local optimum without looking ahead at future choices or subproblems.
2. **Optimal Substructure:** An optimal solution to the overall problem contains within it optimal solutions to its subproblems.

### The Exchange Argument (Proof Technique)
To prove correctness in competitive programming:
- Assume an optimal solution $O$ differs from the greedy solution $G$.
- Identify the first point of divergence where $O$ makes choice $x$ and $G$ makes choice $y$.
- Show that exchanging $x$ for $y$ in $O$ preserves feasibility and does not worsen the objective function: $Cost(O') \le Cost(O)$.
- By induction, $O$ can be transformed into $G$ without loss of optimality, proving $G$ is optimal.

---

## 2. Recognition Signals ("When you see X, think Y")
- **"Minimize the maximum / Maximize the minimum"** $\implies$ Greedy with sorting or binary search.
- **"Interval scheduling / Non-overlapping intervals"** $\implies$ Sort by end time $R_i$.
- **"Process items with deadlines / rewards"** $\implies$ Sort by deadline or value, maintain choices with a min-heap.
- **"Rearrange characters or numbers to maximize value"** $\implies$ Greedy sorting or frequency counting.
- **"Combine pairs to minimize total cost"** $\implies$ Pair smallest with largest, or Huffman coding.

---

## 3. Key Mathematical Theorems, Invariants & Formulas
1. **Interval Scheduling:** Sorting $N$ intervals $[L_i, R_i]$ by end time $R_i$ maximizing disjoint intervals:
   $$\text{Pick } i \text{ such that } R_i \text{ is minimal and } L_i \ge R_{\text{prev}}$$
2. **Rearrangement Inequality:** For sorted sequences $x_1 \le x_2 \le \dots \le x_n$ and $y_1 \le y_2 \le \dots \le y_n$, any permutation $\sigma$ satisfies:
   $$\sum_{i=1}^n x_i y_{n-i+1} \le \sum_{i=1}^n x_i y_{\sigma(i)} \le \sum_{i=1}^n x_i y_i$$
   *Takeaway:* To maximize dot product, pair largest with largest; to minimize, pair largest with smallest.

---

## 4. Node.js / JavaScript Implementation Patterns & Traps

### Pattern: Fast In-Place Numeric Sorting
```javascript
// ALWAYS provide numeric comparator: (a, b) => a - b
const arr = [10, 2, 5, 1];
arr.sort((a, b) => a - b); // [1, 2, 5, 10]
```

### Pattern: Greedy Frequency Counter
```javascript
// Count frequencies in O(N) using plain object or Uint32Array
const freq = new Map();
for (const x of arr) {
  freq.set(x, (freq.get(x) || 0) + 1);
}
```

### Critical Traps:
- **Lexicographical Sort Trap:** `arr.sort()` sorts alphabetically in JS! Always pass `(a, b) => a - b`.
- **False Greedy Assumption:** Many problems feel greedy but are actually 0-1 Knapsack (DP). Always check whether choosing the largest element early blocks a superior combination later.

---

## 5. Sub-Patterns & Archetypes
1. **Sort & Scan:** Sort elements by weight, deadline, or ratio, then make a single linear pass.
2. **Two-Pass Greedy:** Left-to-right pass to satisfy prefix conditions, followed by right-to-left pass to satisfy suffix conditions (e.g., Candy problem).
3. **Priority Queue Greedy:** Dynamically maintain available candidates with a heap, picking the best feasible choice per step.

---

## 6. Solved Problems Catalog & Takeaways

| Problem | Platform | Rating | Solution File | Core Insight / Takeaway |
|---|---|---|---|---|
| [Helpful Maths](https://codeforces.com/problemset/problem/339/A) | `Codeforces` | `800` | `helpfulMaths.js` | Extract summands, sort ascending, rejoin with `+`. Simplest sort-and-greedy archetype. |
| [Team](https://codeforces.com/problemset/problem/231/A) | `Codeforces` | `800` | `team.js` | Count independent boolean votes $\ge 2$ per problem. |
| [Domino piling](https://codeforces.com/problemset/problem/50/A) | `Codeforces` | `800` | `dominoPiling.js` | Greedy packing theorem: $\lfloor \frac{M \times N}{2} \rfloor$ dominos always fit. |
| [Two Arrays And Swaps](https://codeforces.com/problemset/problem/1353/B) | `Codeforces` | `800` | `twoArraysAndSwaps.js` | Sort array $A$ ascending, $B$ descending; greedily swap if $B[i] > A[i]$. |
| [Only Pluses](https://codeforces.com/problemset/problem/1992/A) | `Codeforces` | `800` | `onlyPluses.js` | Key algorithmic application from Day 2026-09-27. |
| [Buttons](https://codeforces.com/problemset/problem/1858/A) | `Codeforces` | `800` | `buttons.js` | Key algorithmic application from Day 2026-09-27. |
| [Two Vessels](https://codeforces.com/problemset/problem/1872/A) | `Codeforces` | `800` | `twoVessels.js` | Key algorithmic application from Day 2026-09-27. |
| [Sereja and Dima](https://codeforces.com/problemset/problem/381/A) | `Codeforces` | `800` | `serejaAndDima.js` | Key algorithmic application from Day 2026-09-28. |
| [Beautiful Average](https://codeforces.com/problemset/problem/2162/A) | `Codeforces` | `800` | `beautifulAverage.js` | Key algorithmic application from Day 2026-09-28. |
| [Most Unstable Array](https://codeforces.com/problemset/problem/1353/A) | `Codeforces` | `800` | `mostUnstableArray.js` | Key algorithmic application from Day 2026-09-29. |
| [Fair Division](https://codeforces.com/problemset/problem/1472/B) | `Codeforces` | `800` | `fairDivision.js` | Key algorithmic application from Day 2026-09-29. |
| [Devu, the Singer and Churu, the Joker](https://codeforces.com/problemset/problem/439/A) | `Codeforces` | `900` | `devuTheSingerAndChuruTheJoker.js` | Key algorithmic application from Day 2026-09-29. |
| [New World, New Me, New Array](https://codeforces.com/problemset/problem/2072/A) | `Codeforces` | `800` | `newWorldNewMeNewArray.js` | Key algorithmic application from Day 2026-09-30. |
| [Minimize Inversions](https://codeforces.com/problemset/problem/1918/B) | `Codeforces` | `900` | `minimizeInversions.js` | Key algorithmic application from Day 2026-09-30. |
| [Mark the Dust Sweeper](https://codeforces.com/problemset/problem/1705/B) | `Codeforces` | `900` | `markTheDustSweeper.js` | Key algorithmic application from Day 2026-09-30. |


## 7. Common Pitfalls & Anti-Patterns
- **Coin Change Fallacy:** Standard greedy coin change works for canonical denominations (1, 5, 10, 25), but fails for arbitrary denominations (e.g., coins $[1, 3, 4]$ for sum 6: greedy gives $4+1+1 = 3$, DP gives $3+3 = 2$).
- **Modifying Array while Iterating:** Do not `splice()` inside a loop; use two pointers or a filtered array instead.
