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
| [Sandwiches](https://www.codechef.com) | `CodeChef` | `500` | `sandwiches.js` | Bottleneck analysis: sandwiches are bounded by min(floor(B/2), H + C). |
| [Seating](https://www.codechef.com) | `CodeChef` | `500` | `seating.js` | Sequential minimum allocation: greedily scan and assign the lowest unoccupied indices. |
| [Staircase Edits](https://www.codechef.com) | `CodeChef` | `1000` | `staircaseEdits.js` | Maximum invariant preservation: keeping the max frequency cluster of A[i] - i minimizes edits to N - max_freq. |
| [Make it Divisible by 25](https://codeforces.com/problemset/problem/1593/B) | `Codeforces` | `900` | `makeItDivisibleBy25.js` | Key algorithmic application from Day 2026-10-01. |
| [Wizard of Orz](https://codeforces.com/problemset/problem/1467/A) | `Codeforces` | `900` | `wizardOfOrz.js` | Key algorithmic application from Day 2026-10-02. |
| [Digit Game](https://codeforces.com/problemset/problem/1419/A) | `Codeforces` | `900` | `digitGame.js` | Key algorithmic application from Day 2026-10-02. |
| [Dominant Piranha](https://codeforces.com/problemset/problem/1433/C) | `Codeforces` | `900` | `dominantPiranha.js` | Key algorithmic application from Day 2026-10-02. |
| [Array Cloning Technique](https://codeforces.com/problemset/problem/1665/B) | `Codeforces` | `900` | `arrayCloningTechnique.js` | Key algorithmic application from Day 2026-10-03. |
| [NIT Destroys the Universe](https://codeforces.com/problemset/problem/1696/B) | `Codeforces` | `900` | `nITDestroysTheUniverse.js` | Key algorithmic application from Day 2026-10-03. |
| [Alice and Bob](https://codeforces.com/problemset/problem/2169/A) | `Codeforces` | `900` | `aliceAndBob.js` | Key algorithmic application from Day 2026-10-03. |
| [Cormen --- The Best Friend Of a Man](https://codeforces.com/problemset/problem/732/B) | `Codeforces` | `1000` | `cormenTheBestFriendOfAMan.js` | Key algorithmic application from Day 2026-10-03. |
| [Berland Poker](https://codeforces.com/problemset/problem/1359/A) | `Codeforces` | `1000` | `berlandPoker.js` | Key algorithmic application from Day 2026-10-03. |
| [Magic Numbers](https://codeforces.com/problemset/problem/320/A) | `Codeforces` | `900` | `magicNumbers.js` | Key algorithmic application from Day 2026-10-04. |
| [Strange Partition](https://codeforces.com/problemset/problem/1471/A) | `Codeforces` | `900` | `strangePartition.js` | Key algorithmic application from Day 2026-10-04. |
| [Move Brackets](https://codeforces.com/problemset/problem/1374/C) | `Codeforces` | `1000` | `moveBrackets.js` | Key algorithmic application from Day 2026-10-04. |
| [Customising the Track](https://codeforces.com/problemset/problem/1543/B) | `Codeforces` | `900` | `customisingTheTrack.js` | Key algorithmic application from Day 2026-10-05. |
| [Perpendicular Segments](https://codeforces.com/problemset/problem/2026/A) | `Codeforces` | `900` | `perpendicularSegments.js` | Key algorithmic application from Day 2026-10-05. |
| [K-divisible Sum](https://codeforces.com/problemset/problem/1476/A) | `Codeforces` | `1000` | `kDivisibleSum.js` | Key algorithmic application from Day 2026-10-05. |
| [Skip One Day](https://www.codechef.com/problems/SKIPONEDAY) | `CodeChef` | `Easy` | `skipOneDay.js` | Maximizing sum by skipping exactly one element corresponds to subtracting min(A). |
| [Sasha and His Trip](https://codeforces.com/problemset/problem/1113/A) | `Codeforces` | `900` | `sashaAndHisTrip.js` | Key algorithmic application from Day 2026-10-06. |
| [Shooting](https://codeforces.com/problemset/problem/1216/B) | `Codeforces` | `900` | `shooting.js` | Key algorithmic application from Day 2026-10-06. |
| [Rudolf and 121](https://codeforces.com/problemset/problem/1941/B) | `Codeforces` | `1000` | `rudolfAnd121.js` | Key algorithmic application from Day 2026-10-06. |
| [Sakurako and Water](https://codeforces.com/problemset/problem/2033/B) | `Codeforces` | `900` | `sakurakoAndWater.js` | Key algorithmic application from Day 2026-10-07. |
| [Balanced Round](https://codeforces.com/problemset/problem/1850/D) | `Codeforces` | `900` | `balancedRound.js` | Key algorithmic application from Day 2026-10-07. |
| [Rudolf and the Ugly String](https://codeforces.com/problemset/problem/1941/C) | `Codeforces` | `900` | `rudolfAndTheUglyString.js` | Key algorithmic application from Day 2026-10-07. |
| [Absent Remainder](https://codeforces.com/problemset/problem/1613/B) | `Codeforces` | `1000` | `absentRemainder.js` | Key algorithmic application from Day 2026-10-07. |
| [The Strict Teacher (Easy Version)](https://codeforces.com/problemset/problem/2005/B1) | `Codeforces` | `1000` | `theStrictTeacherEasyVersion.js` | Key algorithmic application from Day 2026-10-07. |
| [XOR Sequences](https://codeforces.com/problemset/problem/1979/B) | `Codeforces` | `1000` | `xORSequences.js` | Key algorithmic application from Day 2026-10-07. |
| [Permutation Sort](https://codeforces.com/problemset/problem/1525/B) | `Codeforces` | `900` | `permutationSort.js` | Key algorithmic application from Day 2026-10-08. |
| [Non-Substring Subsequence](https://codeforces.com/problemset/problem/1451/B) | `Codeforces` | `900` | `nonSubstringSubsequence.js` | Key algorithmic application from Day 2026-10-08. |
| [Penchick and Satay Sticks](https://codeforces.com/problemset/problem/2031/B) | `Codeforces` | `900` | `penchickAndSataySticks.js` | Key algorithmic application from Day 2026-10-08. |
| [Lunar New Year and Number Division](https://codeforces.com/problemset/problem/1106/C) | `Codeforces` | `900` | `lunarNewYearAndNumberDivision.js` | Key algorithmic application from Day 2026-10-08. |
| [Game of Mathletes](https://codeforces.com/problemset/problem/2060/C) | `Codeforces` | `900` | `gameOfMathletes.js` | Key algorithmic application from Day 2026-10-08. |
| [Ehab Fails to Be Thanos](https://codeforces.com/problemset/problem/1174/A) | `Codeforces` | `1000` | `ehabFailsToBeThanos.js` | Key algorithmic application from Day 2026-10-09. |
| [Two Binary Strings](https://codeforces.com/problemset/problem/1861/B) | `Codeforces` | `1000` | `twoBinaryStrings.js` | Key algorithmic application from Day 2026-10-09. |
| [Eating Queries](https://codeforces.com/problemset/problem/1676/E) | `Codeforces` | `1100` | `eatingQueries.js` | Key algorithmic application from Day 2026-10-09. |
| [Train and Queries](https://codeforces.com/problemset/problem/1702/C) | `Codeforces` | `1100` | `trainAndQueries.js` | Key algorithmic application from Day 2026-10-09. |
| [Permutation Minimization by Deque](https://codeforces.com/problemset/problem/1579/E1) | `Codeforces` | `1000` | `permutationMinimizationByDeque.js` | Key algorithmic application from Day 2026-10-10. |
| [Chat room](https://codeforces.com/problemset/problem/58/A) | `Codeforces` | `1000` | `chatRoom.js` | Key algorithmic application from Day 2026-10-10. |
| [Offshores](https://codeforces.com/problemset/problem/2194/B) | `Codeforces` | `1000` | `offshores.js` | Key algorithmic application from Day 2026-10-10. |
| [Good Prefixes](https://codeforces.com/problemset/problem/1985/C) | `Codeforces` | `1000` | `goodPrefixes.js` | Key algorithmic application from Day 2026-10-10. |
| [Maximum Rounding](https://codeforces.com/problemset/problem/1857/B) | `Codeforces` | `1100` | `maximumRounding.js` | Key algorithmic application from Day 2026-10-10. |
| [Combination Lock](https://codeforces.com/problemset/problem/2091/C) | `Codeforces` | `1000` | `combinationLock.js` | Key algorithmic application from Day 2026-10-11. |
| [Tiles Comeback](https://codeforces.com/problemset/problem/1851/C) | `Codeforces` | `1000` | `tilesComeback.js` | Key algorithmic application from Day 2026-10-11. |
| [Relatively Prime Pairs](https://codeforces.com/problemset/problem/1051/B) | `Codeforces` | `1000` | `relativelyPrimePairs.js` | Key algorithmic application from Day 2026-10-11. |
| [Teleporters (Easy Version)](https://codeforces.com/problemset/problem/1791/G1) | `Codeforces` | `1100` | `teleportersEasyVersion.js` | Key algorithmic application from Day 2026-10-11. |
| [Kalindrome Array](https://codeforces.com/problemset/problem/1610/B) | `Codeforces` | `1100` | `kalindromeArray.js` | Key algorithmic application from Day 2026-10-11. |
| [X-Sum](https://codeforces.com/problemset/problem/1676/D) | `Codeforces` | `1000` | `xSum.js` | Key algorithmic application from Day 2026-10-12. |
| [Renako Amaori and XOR Game (easy version)](https://codeforces.com/problemset/problem/2171/C1) | `Codeforces` | `1100` | `renakoAmaoriAndXORGameEasyVersion.js` | Key algorithmic application from Day 2026-10-12. |
| [Shrinking Array](https://codeforces.com/problemset/problem/2112/B) | `Codeforces` | `1100` | `shrinkingArray.js` | Key algorithmic application from Day 2026-10-12. |
| [Matrix Game](https://codeforces.com/problemset/problem/1365/A) | `Codeforces` | `1100` | `matrixGame.js` | Key algorithmic application from Day 2026-10-12. |
| [Not a Cheap String](https://codeforces.com/problemset/problem/1702/D) | `Codeforces` | `1000` | `notACheapString.js` | Key algorithmic application from Day 2026-10-13. |
| [Move to the End](https://codeforces.com/problemset/problem/2104/B) | `Codeforces` | `1000` | `moveToTheEnd.js` | Key algorithmic application from Day 2026-10-13. |
| [Deck of Cards](https://codeforces.com/problemset/problem/2145/B) | `Codeforces` | `1000` | `deckOfCards.js` | Key algorithmic application from Day 2026-10-13. |
| [Similar Pairs](https://codeforces.com/problemset/problem/1360/C) | `Codeforces` | `1100` | `similarPairs.js` | Key algorithmic application from Day 2026-10-13. |
| [K-Sort](https://codeforces.com/problemset/problem/1987/B) | `Codeforces` | `1000` | `kSort.js` | Key algorithmic application from Day 2026-10-14. |
| [MEXor Mixup](https://codeforces.com/problemset/problem/1567/B) | `Codeforces` | `1000` | `mEXorMixup.js` | Key algorithmic application from Day 2026-10-14. |
| [Make it Zigzag](https://codeforces.com/problemset/problem/2154/B) | `Codeforces` | `1000` | `makeItZigzag.js` | Key algorithmic application from Day 2026-10-14. |
| [Save the Magazines](https://codeforces.com/problemset/problem/1743/C) | `Codeforces` | `1100` | `saveTheMagazines.js` | Key algorithmic application from Day 2026-10-14. |
| [Crafting](https://codeforces.com/problemset/problem/2055/B) | `Codeforces` | `1000` | `crafting.js` | Key algorithmic application from Day 2026-10-15. |
| [378QAQ and Mocha's Array](https://codeforces.com/problemset/problem/1975/B) | `Codeforces` | `1000` | `p378QAQAndMochaSArray.js` | Key algorithmic application from Day 2026-10-15. |
| [Valerii Against Everyone](https://codeforces.com/problemset/problem/1438/B) | `Codeforces` | `1000` | `valeriiAgainstEveryone.js` | Key algorithmic application from Day 2026-10-15. |
| [Subsequence Addition (Easy Version)](https://codeforces.com/problemset/problem/1807/G1) | `Codeforces` | `1100` | `subsequenceAdditionEasyVersion.js` | Key algorithmic application from Day 2026-10-15. |
| [Division by Two and Permutation](https://codeforces.com/problemset/problem/1624/C) | `Codeforces` | `1100` | `divisionByTwoAndPermutation.js` | Key algorithmic application from Day 2026-10-15. |


## 7. Common Pitfalls & Anti-Patterns
- **Coin Change Fallacy:** Standard greedy coin change works for canonical denominations (1, 5, 10, 25), but fails for arbitrary denominations (e.g., coins $[1, 3, 4]$ for sum 6: greedy gives $4+1+1 = 3$, DP gives $3+3 = 2$).
- **Modifying Array while Iterating:** Do not `splice()` inside a loop; use two pointers or a filtered array instead.
