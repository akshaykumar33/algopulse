# Sorting & Custom Comparators — Algorithmic Patterns & Knowledge Base

## 1. Core Principles & Mental Model
Sorting arranges elements into a monotonic total order. In competitive programming, sorting is often the critical preprocessing step ($O(N \log N)$) that unlocks $O(N)$ two-pointer scans, $O(\log N)$ binary searches, coordinate compression, or greedy choices.

---

## 2. Recognition Signals ("When you see X, think Y")
- **"Sort pairs by first element ascending, then second descending":** $\implies$ Custom multi-key comparator.
- **"Replace large coordinates ($X_i \le 10^9$) with relative ranks ($1 \le rank \le N$)":** $\implies$ Coordinate Compression.
- **"Count number of inversions in an array":** $\implies$ Merge Sort or Fenwick Tree / Segment Tree.
- **"Order tasks by completion deadline or score density":** $\implies$ Greedy sorting with custom comparator.

---

## 3. Key Mathematical Theorems & Invariants
1. **Total Order Requirements:**
   A valid comparator `comp(a, b)` must define a strict weak ordering:
   - *Irreflexivity:* `comp(a, a) === false` (or `0`).
   - *Asymmetry:* If `comp(a, b) < 0`, then `comp(b, a) > 0`.
   - *Transitivity:* If `comp(a, b) < 0` and `comp(b, c) < 0`, then `comp(a, c) < 0`.
   *Violation of these rules in V8 causes erratic sorting or infinite loops!*
2. **Inversion Parity:**
   Any swap of two adjacent elements changes the total number of inversions by exactly $+1$ or $-1$.

---

## 4. Node.js / JavaScript Implementation Patterns & Traps

### Pattern 1: Multi-Key Sorting
```javascript
// Sort points: x ascending; if x equal, y descending
points.sort((a, b) => {
  if (a.x !== b.x) return a.x - b.x;
  return b.y - a.y;
});
```

### Pattern 2: Coordinate Compression ($O(N \log N)$)
```javascript
function compressCoordinates(arr) {
  // 1. Extract unique values and sort
  const sortedUnique = Array.from(new Set(arr)).sort((a, b) => a - b);
  // 2. Map original value to compressed index (0-based rank)
  const rankMap = new Map();
  for (let i = 0; i < sortedUnique.length; i++) {
    rankMap.set(sortedUnique[i], i);
  }
  // 3. Transform array
  return arr.map((x) => rankMap.get(x));
}
```

### Pattern 3: High-Performance TypedArray Sorting
```javascript
// TypedArray sort() defaults to numerical ascending sort in V8!
const uintArr = new Int32Array([10, 2, 5, 1]);
uintArr.sort(); // [1, 2, 5, 10] - unlike regular Array.sort()!
```

### Critical Traps:
- **Default `Array.prototype.sort()` is Lexicographic:**
  ```javascript
  [10, 2, 5].sort(); // Yields [10, 2, 5] because '10' < '2' alphabetically!
  [10, 2, 5].sort((a, b) => a - b); // Yields [2, 5, 10] correctly!
  ```
- **Subtraction Overflow with Extreme Bounds:** If `a = -2e9` and `b = 2e9`, `a - b` is `-4e9`, which exceeds 32-bit signed integers (fine in standard JS `Number` up to $9 \times 10^{15}$, but causes bugs if cast to bitwise).

---

## 5. Sub-Patterns & Archetypes
1. **Parallel Sorting:** Sorting indices `[0, 1, ..., N-1]` by `arr[i]` instead of sorting the array directly.
2. **Bucket / Counting Sort ($O(N + K)$):** When element values are small ($K \le 10^6$), count frequencies in a flat array and reconstruct in linear time.

---

## 6. Solved Problems Catalog & Takeaways

| Problem | Platform | Rating | Solution File | Core Insight / Takeaway |
|---|---|---|---|---|
| [Helpful Maths](https://codeforces.com/problemset/problem/339/A) | `Codeforces` | `800` | `helpfulMaths.js` | Extract single-digit summands, sort in ascending numerical order, join with `+`. |
| [Two Arrays And Swaps](https://codeforces.com/problemset/problem/1353/B) | `Codeforces` | `800` | `twoArraysAndSwaps.js` | Dual sorting: sort $A$ ascending, $B$ descending; greedily swap larger elements. |

---
| [Only Pluses](https://codeforces.com/problemset/problem/1992/A) | `undefined` | `800` | `onlyPluses.js` | Key algorithmic application from Day 2026-09-27. |
| [Medium Number](https://codeforces.com/problemset/problem/1760/A) | `Codeforces` | `800` | `mediumNumber.js` | Key algorithmic application from Day 2026-09-30. |
| [Minimize Inversions](https://codeforces.com/problemset/problem/1918/B) | `Codeforces` | `900` | `minimizeInversions.js` | Key algorithmic application from Day 2026-09-30. |
| [Array Cloning Technique](https://codeforces.com/problemset/problem/1665/B) | `Codeforces` | `900` | `arrayCloningTechnique.js` | Key algorithmic application from Day 2026-10-03. |
| [Shooting](https://codeforces.com/problemset/problem/1216/B) | `Codeforces` | `900` | `shooting.js` | Key algorithmic application from Day 2026-10-06. |
| [Avoiding Zero](https://codeforces.com/problemset/problem/1427/A) | `Codeforces` | `900` | `avoidingZero.js` | Key algorithmic application from Day 2026-10-06. |
| [Currency System in Geraldion](https://codeforces.com/problemset/problem/560/A) | `Codeforces` | `1000` | `currencySystemInGeraldion.js` | Key algorithmic application from Day 2026-10-06. |
| [Balanced Round](https://codeforces.com/problemset/problem/1850/D) | `Codeforces` | `900` | `balancedRound.js` | Key algorithmic application from Day 2026-10-07. |
| [Cubes Sorting](https://codeforces.com/problemset/problem/1420/A) | `Codeforces` | `900` | `cubesSorting.js` | Key algorithmic application from Day 2026-10-07. |
| [Absent Remainder](https://codeforces.com/problemset/problem/1613/B) | `Codeforces` | `1000` | `absentRemainder.js` | Key algorithmic application from Day 2026-10-07. |
| [The Strict Teacher (Easy Version)](https://codeforces.com/problemset/problem/2005/B1) | `Codeforces` | `1000` | `theStrictTeacherEasyVersion.js` | Key algorithmic application from Day 2026-10-07. |
| [Penchick and Satay Sticks](https://codeforces.com/problemset/problem/2031/B) | `Codeforces` | `900` | `penchickAndSataySticks.js` | Key algorithmic application from Day 2026-10-08. |
| [Lunar New Year and Number Division](https://codeforces.com/problemset/problem/1106/C) | `Codeforces` | `900` | `lunarNewYearAndNumberDivision.js` | Key algorithmic application from Day 2026-10-08. |
| [Game of Mathletes](https://codeforces.com/problemset/problem/2060/C) | `Codeforces` | `900` | `gameOfMathletes.js` | Key algorithmic application from Day 2026-10-08. |
| [Progressive Square](https://codeforces.com/problemset/problem/1955/B) | `Codeforces` | `1000` | `progressiveSquare.js` | Key algorithmic application from Day 2026-10-08. |
| [Ehab Fails to Be Thanos](https://codeforces.com/problemset/problem/1174/A) | `Codeforces` | `1000` | `ehabFailsToBeThanos.js` | Key algorithmic application from Day 2026-10-09. |
| [Eating Queries](https://codeforces.com/problemset/problem/1676/E) | `Codeforces` | `1100` | `eatingQueries.js` | Key algorithmic application from Day 2026-10-09. |
| [Consecutive Points Segment](https://codeforces.com/problemset/problem/1671/B) | `Codeforces` | `1000` | `consecutivePointsSegment.js` | Key algorithmic application from Day 2026-10-10. |
| [Laptops](https://codeforces.com/problemset/problem/456/A) | `Codeforces` | `1100` | `laptops.js` | Key algorithmic application from Day 2026-10-10. |
| [Teleporters (Easy Version)](https://codeforces.com/problemset/problem/1791/G1) | `Codeforces` | `1100` | `teleportersEasyVersion.js` | Key algorithmic application from Day 2026-10-11. |
| [Similar Pairs](https://codeforces.com/problemset/problem/1360/C) | `Codeforces` | `1100` | `similarPairs.js` | Key algorithmic application from Day 2026-10-13. |
| [Crafting](https://codeforces.com/problemset/problem/2055/B) | `Codeforces` | `1000` | `crafting.js` | Key algorithmic application from Day 2026-10-15. |
| [378QAQ and Mocha's Array](https://codeforces.com/problemset/problem/1975/B) | `Codeforces` | `1000` | `p378QAQAndMochaSArray.js` | Key algorithmic application from Day 2026-10-15. |
| [Valerii Against Everyone](https://codeforces.com/problemset/problem/1438/B) | `Codeforces` | `1000` | `valeriiAgainstEveryone.js` | Key algorithmic application from Day 2026-10-15. |
| [Subsequence Addition (Easy Version)](https://codeforces.com/problemset/problem/1807/G1) | `Codeforces` | `1100` | `subsequenceAdditionEasyVersion.js` | Key algorithmic application from Day 2026-10-15. |
| [Songs Compression](https://codeforces.com/problemset/problem/1015/C) | `Codeforces` | `1100` | `songsCompression.js` | Key algorithmic application from Day 2026-10-16. |
| [Line](https://codeforces.com/problemset/problem/1722/D) | `Codeforces` | `1100` | `line.js` | Key algorithmic application from Day 2026-10-17. |
| [BerSU Ball](https://codeforces.com/problemset/problem/489/B) | `Codeforces` | `1200` | `berSUBall.js` | Key algorithmic application from Day 2026-10-17. |
| [Summation Game](https://codeforces.com/problemset/problem/1920/B) | `Codeforces` | `1100` | `summationGame.js` | Key algorithmic application from Day 2026-10-18. |
| [Skibidus and Sigma](https://codeforces.com/problemset/problem/2065/D) | `Codeforces` | `1200` | `skibidusAndSigma.js` | Key algorithmic application from Day 2026-10-19. |
| [Sort Zero](https://codeforces.com/problemset/problem/1712/C) | `Codeforces` | `1100` | `sortZero.js` | Key algorithmic application from Day 2026-10-20. |
| [Building an Aquarium](https://codeforces.com/problemset/problem/1873/E) | `Codeforces` | `1100` | `buildingAnAquarium.js` | Key algorithmic application from Day 2026-10-20. |
| [Turtle and Good Pairs](https://codeforces.com/problemset/problem/2003/C) | `Codeforces` | `1200` | `turtleAndGoodPairs.js` | Key algorithmic application from Day 2026-10-20. |
| [Hemose Shopping](https://codeforces.com/problemset/problem/1592/B) | `Codeforces` | `1200` | `hemoseShopping.js` | Key algorithmic application from Day 2026-10-21. |
| [Less or Equal](https://codeforces.com/problemset/problem/977/C) | `Codeforces` | `1200` | `lessOrEqual.js` | Key algorithmic application from Day 2026-10-21. |
| [Rank List](https://codeforces.com/problemset/problem/166/A) | `Codeforces` | `1100` | `rankList.js` | Key algorithmic application from Day 2026-10-22. |


## 7. Common Pitfalls & Anti-Patterns
- **Non-Deterministic Sort in Older Engines:** In modern Node.js (V8 $\ge$ 7.0), `Array.prototype.sort` is guaranteed to be stable (TimSort), but never rely on undefined comparator return values (returning `true`/`false` instead of negative/zero/positive integers).
