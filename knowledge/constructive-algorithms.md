# Constructive Algorithms — Algorithmic Patterns & Knowledge Base

## 1. Core Principles & Mental Model
In Constructive problems, you are not asked to find the *number* of solutions or the *optimal value*; rather, you must construct a concrete configuration (an array, a matrix, or a sequence of operations) that satisfies given invariants and constraints.

### Golden Rules of Constructive Thinking:
1. **Reduce the Degrees of Freedom:** Instead of seeking the most general configuration, look for the most symmetric, regular, or periodic pattern that trivially satisfies the rules.
2. **Find the Invariant:** What property must hold across all elements or sub-blocks?
3. **Tile by Small Periodic Patterns:** Many 2D grid constructions can be solved by tiling a repeating $2 \times 2$ or $4 \times 4$ kernel across the entire board.
4. **Extreme / Boundary-First Construction:** Place extreme values at boundaries or alternating positions to neutralize conflicting constraints.

---

## 2. Recognition Signals ("When you see X, think Y")
- **"Construct any array / matrix satisfying...":** $\implies$ Constructive problem.
- **"Output any valid sequence of operations":** $\implies$ Constructive step reduction.
- **"Ensure every cell has exactly $K$ equal neighbors":** $\implies 2 \times 2$ block tiling.
- **"Maximize adjacent differences $\sum |a_i - a_{i+1}|$":** $\implies$ Alternate 0s and extreme values (e.g. $[0, M, 0]$).

---

## 3. Key Mathematical Theorems & Construction Kernels
1. **Checkerboard / Parity Tiling:**
   Assigning values based on $(r + c) \pmod 2$ guarantees that any adjacent cell has the opposite parity/value.
2. **$2 \times 2$ Inversion Kernels:**
   In [Almost Ternary Matrix (CF 1699B)](https://codeforces.com/problemset/problem/1699/B), constructing repeating blocks of:
   $$\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} \quad \text{and} \quad \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$$
   guarantees that every internal and boundary cell has exactly 1 same-value neighbor.

---

## 4. Node.js / JavaScript Implementation Patterns & Traps

### Pattern: Periodic 2D Matrix Synthesis
```javascript
// Constructs an N x M matrix from a 2x2 repeating kernel
function constructMatrix(n, m) {
  const grid = [];
  for (let r = 0; r < n; r++) {
    const row = new Int32Array(m);
    for (let c = 0; c < m; c++) {
      // Determine value based on periodic 4x4 or 2x2 block
      const blockRow = Math.floor(r / 2) % 2;
      const blockCol = Math.floor(c / 2) % 2;
      const cellInBlock = (r % 2) ^ (c % 2);
      row[c] = (blockRow ^ blockCol) ? cellInBlock : 1 - cellInBlock;
    }
    grid.push(row.join(' '));
  }
  return grid.join('\n');
}
```

### Critical Traps:
- **Overcomplicating the Pattern:** Resist the temptation to simulate dynamic placement. Formulate the mathematical closed formula $(r, c) \mapsto \text{value}$ directly.
- **Boundary Collisions:** Always test minimum valid dimensions ($N=2, M=2$) and odd/even boundary configurations to ensure the pattern doesn't violate edge constraints.

---

## 5. Sub-Patterns & Archetypes
1. **Periodic Block Tiling:** Repeating a verified $2 \times 2$ or $4 \times 4$ pattern across $N \times M$.
2. **Bipartite / Checkerboard Coloring:** Coloring nodes based on depth parity or $(r + c) \pmod 2$.
3. **Extreme Value Interleaving:** Constructing $[1, N, 2, N-1, 3, N-2, \dots]$ to maximize differences between consecutive elements.

---

## 6. Solved Problems Catalog & Takeaways

| Problem | Platform | Rating | Solution File | Core Insight / Takeaway |
|---|---|---|---|---|
| [Almost Ternary Matrix](https://codeforces.com/problemset/problem/1699/B) | `Codeforces` | `900` | `almostTernaryMatrix.js` | Tile alternating $2 \times 2$ blocks to guarantee every cell has exactly 1 equal neighbor. |
| [Most Unstable Array](https://codeforces.com/problemset/problem/1353/A) | `Codeforces` | `800` | `mostUnstableArray.js` | For $n=1$, ans is 0; for $n=2$, ans is $m$; for $n \ge 3$, place all sum $m$ in middle $[0, m, 0]$ to achieve $2m$. |
| [Only Pluses](https://codeforces.com/problemset/problem/1992/A) | `Codeforces` | `800` | `onlyPluses.js` | Product $a \cdot b \cdot c$ is maximized by greedily incrementing the smallest of the three integers at each of the 5 operations. |
| [Minimize Inversions](https://codeforces.com/problemset/problem/1918/B) | `Codeforces` | `900` | `minimizeInversions.js` | Key algorithmic application from Day 2026-09-30. |
| [Mark the Dust Sweeper](https://codeforces.com/problemset/problem/1705/B) | `Codeforces` | `900` | `markTheDustSweeper.js` | Key algorithmic application from Day 2026-09-30. |
| [Shuffle (Easy)](https://www.codechef.com) | `CodeChef` | `1200` | `shuffleEasy.js` | Window sort preimage combinatorics: reversing consecutive length-K sorts yields K! * K^(N-K) valid starting permutations. |
| [Shuffle (Hard)](https://www.codechef.com) | `CodeChef` | `1700` | `shuffleHard.js` | General window-sort preimage counting: valid iff suffix Q[L..N] is identity; count is K! * K^(prefix_max_count(0..pos(L)) - 1). |
| [Wizard of Orz](https://codeforces.com/problemset/problem/1467/A) | `Codeforces` | `900` | `wizardOfOrz.js` | Key algorithmic application from Day 2026-10-02. |
| [Dominant Piranha](https://codeforces.com/problemset/problem/1433/C) | `Codeforces` | `900` | `dominantPiranha.js` | Key algorithmic application from Day 2026-10-02. |
| [Array Cloning Technique](https://codeforces.com/problemset/problem/1665/B) | `Codeforces` | `900` | `arrayCloningTechnique.js` | Key algorithmic application from Day 2026-10-03. |
| [Mocha and Math](https://codeforces.com/problemset/problem/1559/A) | `Codeforces` | `900` | `mochaAndMath.js` | Key algorithmic application from Day 2026-10-03. |
| [Preparing for the Exam](https://codeforces.com/problemset/problem/2051/C) | `Codeforces` | `1000` | `preparingForTheExam.js` | Key algorithmic application from Day 2026-10-03. |
| [Perpendicular Segments](https://codeforces.com/problemset/problem/2026/A) | `Codeforces` | `900` | `perpendicularSegments.js` | Key algorithmic application from Day 2026-10-05. |
| [K-divisible Sum](https://codeforces.com/problemset/problem/1476/A) | `Codeforces` | `1000` | `kDivisibleSum.js` | Key algorithmic application from Day 2026-10-05. |
| [Construct the String](https://codeforces.com/problemset/problem/1335/B) | `Codeforces` | `900` | `constructTheString.js` | Key algorithmic application from Day 2026-10-06. |
| [Sakurako and Water](https://codeforces.com/problemset/problem/2033/B) | `Codeforces` | `900` | `sakurakoAndWater.js` | Key algorithmic application from Day 2026-10-07. |
| [Number of Apartments](https://codeforces.com/problemset/problem/1430/A) | `Codeforces` | `900` | `numberOfApartments.js` | Key algorithmic application from Day 2026-10-07. |
| [Permutation Sort](https://codeforces.com/problemset/problem/1525/B) | `Codeforces` | `900` | `permutationSort.js` | Key algorithmic application from Day 2026-10-08. |
| [Dinner Time](https://codeforces.com/problemset/problem/2102/A) | `Codeforces` | `900` | `dinnerTime.js` | Key algorithmic application from Day 2026-10-08. |
| [Progressive Square](https://codeforces.com/problemset/problem/1955/B) | `Codeforces` | `1000` | `progressiveSquare.js` | Key algorithmic application from Day 2026-10-08. |
| [Removals Game](https://codeforces.com/problemset/problem/2002/B) | `Codeforces` | `1000` | `removalsGame.js` | Key algorithmic application from Day 2026-10-09. |
| [Ehab Fails to Be Thanos](https://codeforces.com/problemset/problem/1174/A) | `Codeforces` | `1000` | `ehabFailsToBeThanos.js` | Key algorithmic application from Day 2026-10-09. |
| [Minimize Equal Sum Subarrays](https://codeforces.com/problemset/problem/1998/B) | `Codeforces` | `1000` | `minimizeEqualSumSubarrays.js` | Key algorithmic application from Day 2026-10-09. |
| [Two Binary Strings](https://codeforces.com/problemset/problem/1861/B) | `Codeforces` | `1000` | `twoBinaryStrings.js` | Key algorithmic application from Day 2026-10-09. |
| [Permutation Minimization by Deque](https://codeforces.com/problemset/problem/1579/E1) | `Codeforces` | `1000` | `permutationMinimizationByDeque.js` | Key algorithmic application from Day 2026-10-10. |
| [Combination Lock](https://codeforces.com/problemset/problem/2091/C) | `Codeforces` | `1000` | `combinationLock.js` | Key algorithmic application from Day 2026-10-11. |
| [3-palindrome](https://codeforces.com/problemset/problem/805/B) | `Codeforces` | `1000` | `p3Palindrome.js` | Key algorithmic application from Day 2026-10-12. |
| [Mike and palindrome](https://codeforces.com/problemset/problem/798/A) | `Codeforces` | `1000` | `mikeAndPalindrome.js` | Key algorithmic application from Day 2026-10-12. |
| [Chess Tournament](https://codeforces.com/problemset/problem/1569/B) | `Codeforces` | `1000` | `chessTournament.js` | Key algorithmic application from Day 2026-10-13. |
| [Bear and Finding Criminals](https://codeforces.com/problemset/problem/680/B) | `Codeforces` | `1000` | `bearAndFindingCriminals.js` | Key algorithmic application from Day 2026-10-13. |
| [Similar Pairs](https://codeforces.com/problemset/problem/1360/C) | `Codeforces` | `1100` | `similarPairs.js` | Key algorithmic application from Day 2026-10-13. |
| [Make it Zigzag](https://codeforces.com/problemset/problem/2154/B) | `Codeforces` | `1000` | `makeItZigzag.js` | Key algorithmic application from Day 2026-10-14. |
| [Save the Magazines](https://codeforces.com/problemset/problem/1743/C) | `Codeforces` | `1100` | `saveTheMagazines.js` | Key algorithmic application from Day 2026-10-14. |
| [Polycarp Recovers the Permutation](https://codeforces.com/problemset/problem/1611/C) | `Codeforces` | `1000` | `polycarpRecoversThePermutation.js` | Key algorithmic application from Day 2026-10-15. |
| [Crafting](https://codeforces.com/problemset/problem/2055/B) | `Codeforces` | `1000` | `crafting.js` | Key algorithmic application from Day 2026-10-15. |
| [Valerii Against Everyone](https://codeforces.com/problemset/problem/1438/B) | `Codeforces` | `1000` | `valeriiAgainstEveryone.js` | Key algorithmic application from Day 2026-10-15. |
| [Koxia and Permutation](https://codeforces.com/problemset/problem/1770/B) | `Codeforces` | `1000` | `koxiaAndPermutation.js` | Key algorithmic application from Day 2026-10-15. |
| [Array Cancellation](https://codeforces.com/problemset/problem/1405/B) | `Codeforces` | `1000` | `arrayCancellation.js` | Key algorithmic application from Day 2026-10-15. |
| [Difference of GCDs](https://codeforces.com/problemset/problem/1708/B) | `Codeforces` | `1100` | `differenceOfGCDs.js` | Key algorithmic application from Day 2026-10-15. |
| [Division by Two and Permutation](https://codeforces.com/problemset/problem/1624/C) | `Codeforces` | `1100` | `divisionByTwoAndPermutation.js` | Key algorithmic application from Day 2026-10-15. |

---

## 7. Common Pitfalls & Anti-Patterns
- **Ignoring Constraints on $N$:** Ensure the construction holds for small $N$ ($N=1, 2$) where boundary effects can collapse the general pattern.
