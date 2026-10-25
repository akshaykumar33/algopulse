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
| [AND Reconstruction](https://codeforces.com/problemset/problem/1991/B) | `Codeforces` | `1100` | `aNDReconstruction.js` | Key algorithmic application from Day 2026-10-16. |
| [Monsters Attack!](https://codeforces.com/problemset/problem/1923/B) | `Codeforces` | `1100` | `monstersAttack.js` | Key algorithmic application from Day 2026-10-16. |
| [Restore the Array](https://codeforces.com/problemset/problem/1811/C) | `Codeforces` | `1100` | `restoreTheArray.js` | Key algorithmic application from Day 2026-10-16. |
| [Eating Candies](https://codeforces.com/problemset/problem/1669/F) | `Codeforces` | `1100` | `eatingCandies.js` | Key algorithmic application from Day 2026-10-16. |
| [Yet Another Coin Problem](https://codeforces.com/problemset/problem/1934/B) | `Codeforces` | `1200` | `yetAnotherCoinProblem.js` | Key algorithmic application from Day 2026-10-16. |
| [Line](https://codeforces.com/problemset/problem/1722/D) | `Codeforces` | `1100` | `line.js` | Key algorithmic application from Day 2026-10-17. |
| [Subtract Min Sort](https://codeforces.com/problemset/problem/2060/D) | `Codeforces` | `1100` | `subtractMinSort.js` | Key algorithmic application from Day 2026-10-17. |
| [Vicious Labyrinth](https://codeforces.com/problemset/problem/2078/B) | `Codeforces` | `1100` | `viciousLabyrinth.js` | Key algorithmic application from Day 2026-10-17. |
| [Niko's Tactical Cards](https://codeforces.com/problemset/problem/2173/B) | `Codeforces` | `1100` | `nikoSTacticalCards.js` | Key algorithmic application from Day 2026-10-17. |
| [BerSU Ball](https://codeforces.com/problemset/problem/489/B) | `Codeforces` | `1200` | `berSUBall.js` | Key algorithmic application from Day 2026-10-17. |
| [Binary Inversions](https://codeforces.com/problemset/problem/1760/E) | `Codeforces` | `1100` | `binaryInversions.js` | Key algorithmic application from Day 2026-10-18. |
| [The 67th OEIS Problem](https://codeforces.com/problemset/problem/2218/D) | `Codeforces` | `1100` | `the67thOEISProblem.js` | Key algorithmic application from Day 2026-10-18. |
| [Maximum Even Sum](https://codeforces.com/problemset/problem/2137/C) | `Codeforces` | `1100` | `maximumEvenSum.js` | Key algorithmic application from Day 2026-10-18. |
| [Quests](https://codeforces.com/problemset/problem/1914/C) | `Codeforces` | `1100` | `quests.js` | Key algorithmic application from Day 2026-10-18. |
| [Summation Game](https://codeforces.com/problemset/problem/1920/B) | `Codeforces` | `1100` | `summationGame.js` | Key algorithmic application from Day 2026-10-18. |
| [Transfusion](https://codeforces.com/problemset/problem/2050/B) | `Codeforces` | `1100` | `transfusion.js` | Key algorithmic application from Day 2026-10-19. |
| [Cake Assignment](https://codeforces.com/problemset/problem/2138/A) | `Codeforces` | `1100` | `cakeAssignment.js` | Key algorithmic application from Day 2026-10-19. |
| [Li Hua and Pattern](https://codeforces.com/problemset/problem/1797/B) | `Codeforces` | `1100` | `liHuaAndPattern.js` | Key algorithmic application from Day 2026-10-19. |
| [Minimize the Thickness](https://codeforces.com/problemset/problem/1741/C) | `Codeforces` | `1100` | `minimizeTheThickness.js` | Key algorithmic application from Day 2026-10-19. |
| [Shovels and Swords](https://codeforces.com/problemset/problem/1366/A) | `Codeforces` | `1100` | `shovelsAndSwords.js` | Key algorithmic application from Day 2026-10-19. |
| [Skibidus and Sigma](https://codeforces.com/problemset/problem/2065/D) | `Codeforces` | `1200` | `skibidusAndSigma.js` | Key algorithmic application from Day 2026-10-19. |
| [Make It Good](https://codeforces.com/problemset/problem/1385/C) | `Codeforces` | `1200` | `makeItGood.js` | Key algorithmic application from Day 2026-10-19. |
| [Beautiful XOR](https://codeforces.com/problemset/problem/2162/C) | `Codeforces` | `1100` | `beautifulXOR.js` | Key algorithmic application from Day 2026-10-20. |
| [Sort Zero](https://codeforces.com/problemset/problem/1712/C) | `Codeforces` | `1100` | `sortZero.js` | Key algorithmic application from Day 2026-10-20. |
| [Ternary Sequence](https://codeforces.com/problemset/problem/1401/B) | `Codeforces` | `1100` | `ternarySequence.js` | Key algorithmic application from Day 2026-10-20. |
| [Equal Values](https://codeforces.com/problemset/problem/2111/C) | `Codeforces` | `1100` | `equalValues.js` | Key algorithmic application from Day 2026-10-20. |
| [Turtle and Good Pairs](https://codeforces.com/problemset/problem/2003/C) | `Codeforces` | `1200` | `turtleAndGoodPairs.js` | Key algorithmic application from Day 2026-10-20. |
| [Variety is Discouraged](https://codeforces.com/problemset/problem/2064/B) | `Codeforces` | `1100` | `varietyIsDiscouraged.js` | Key algorithmic application from Day 2026-10-21. |
| [Medians](https://codeforces.com/problemset/problem/2032/B) | `Codeforces` | `1100` | `medians.js` | Key algorithmic application from Day 2026-10-21. |
| [Getting Points](https://codeforces.com/problemset/problem/1902/B) | `Codeforces` | `1100` | `gettingPoints.js` | Key algorithmic application from Day 2026-10-21. |
| [Kill Demodogs](https://codeforces.com/problemset/problem/1731/B) | `Codeforces` | `1100` | `killDemodogs.js` | Key algorithmic application from Day 2026-10-21. |
| [Binary Colouring](https://codeforces.com/problemset/problem/1977/B) | `Codeforces` | `1100` | `binaryColouring.js` | Key algorithmic application from Day 2026-10-21. |
| [Yet Another MEX Problem](https://codeforces.com/problemset/problem/2183/B) | `Codeforces` | `1100` | `yetAnotherMEXProblem.js` | Key algorithmic application from Day 2026-10-22. |
| [Long Multiplication](https://codeforces.com/problemset/problem/1954/C) | `Codeforces` | `1200` | `longMultiplication.js` | Key algorithmic application from Day 2026-10-22. |
| [AccurateLee](https://codeforces.com/problemset/problem/1369/B) | `Codeforces` | `1200` | `accurateLee.js` | Key algorithmic application from Day 2026-10-22. |
| [Building Permutation](https://codeforces.com/problemset/problem/285/C) | `Codeforces` | `1200` | `buildingPermutation.js` | Key algorithmic application from Day 2026-10-23. |
| [Binary String Battle](https://codeforces.com/problemset/problem/2123/D) | `Codeforces` | `1200` | `binaryStringBattle.js` | Key algorithmic application from Day 2026-10-23. |
| [Creating Keys for StORages Has Become My Main Skill](https://codeforces.com/problemset/problem/2072/C) | `Codeforces` | `1200` | `creatingKeysForStORagesHasBecomeMyMainSkill.js` | Key algorithmic application from Day 2026-10-23. |
| [Weight of the System of Nested Segments](https://codeforces.com/problemset/problem/1650/C) | `Codeforces` | `1200` | `weightOfTheSystemOfNestedSegments.js` | Key algorithmic application from Day 2026-10-24. |
| [Removal of Unattractive Pairs](https://codeforces.com/problemset/problem/1907/C) | `Codeforces` | `1200` | `removalOfUnattractivePairs.js` | Key algorithmic application from Day 2026-10-24. |
| [Virus](https://codeforces.com/problemset/problem/1704/C) | `Codeforces` | `1200` | `virus.js` | Key algorithmic application from Day 2026-10-24. |
| [Vika and the Bridge](https://codeforces.com/problemset/problem/1848/B) | `Codeforces` | `1200` | `vikaAndTheBridge.js` | Key algorithmic application from Day 2026-10-24. |
| [Kar Salesman](https://codeforces.com/problemset/problem/2022/B) | `Codeforces` | `1300` | `karSalesman.js` | Key algorithmic application from Day 2026-10-24. |
| [Qingshan Loves Strings 2](https://codeforces.com/problemset/problem/1889/A) | `Codeforces` | `1300` | `qingshanLovesStrings2.js` | Key algorithmic application from Day 2026-10-24. |
| [Sanatorium](https://codeforces.com/problemset/problem/732/C) | `Codeforces` | `1200` | `sanatorium.js` | Key algorithmic application from Day 2026-10-24. |
| [Roma and Changing Signs](https://codeforces.com/problemset/problem/262/B) | `Codeforces` | `1200` | `romaAndChangingSigns.js` | Key algorithmic application from Day 2026-10-24. |
| [Floor of MEX (Easy Version)](https://codeforces.com/problemset/problem/2262/A1) | `Codeforces` | `1200` | `floorOfMEXEasyVersion.js` | Key algorithmic application from Day 2026-10-24. |
| [Another Permutation Problem](https://codeforces.com/problemset/problem/1859/C) | `Codeforces` | `1200` | `anotherPermutationProblem.js` | Key algorithmic application from Day 2026-10-24. |
| [Sail](https://codeforces.com/problemset/problem/298/B) | `Codeforces` | `1200` | `sail.js` | Key algorithmic application from Day 2026-10-24. |
| [Appleman and Toastman](https://codeforces.com/problemset/problem/461/A) | `Codeforces` | `1200` | `applemanAndToastman.js` | Key algorithmic application from Day 2026-10-24. |
| [Conan and Agasa play a Card Game](https://codeforces.com/problemset/problem/914/B) | `Codeforces` | `1200` | `conanAndAgasaPlayACardGame.js` | Key algorithmic application from Day 2026-10-24. |
| [Square Filling](https://codeforces.com/problemset/problem/1207/B) | `Codeforces` | `1200` | `squareFilling.js` | Key algorithmic application from Day 2026-10-24. |
| [The Strict Teacher (Hard Version)](https://codeforces.com/problemset/problem/2005/B2) | `Codeforces` | `1200` | `theStrictTeacherHardVersion.js` | Key algorithmic application from Day 2026-10-24. |
| [Corners](https://codeforces.com/problemset/problem/1720/C) | `Codeforces` | `1200` | `corners.js` | Key algorithmic application from Day 2026-10-24. |
| [Corrupted Array](https://codeforces.com/problemset/problem/1512/D) | `Codeforces` | `1200` | `corruptedArray.js` | Key algorithmic application from Day 2026-10-24. |
| [Needle in a Haystack](https://codeforces.com/problemset/problem/2174/A) | `Codeforces` | `1200` | `needleInAHaystack.js` | Key algorithmic application from Day 2026-10-24. |
| [Soldier and Badges](https://codeforces.com/problemset/problem/546/B) | `Codeforces` | `1200` | `soldierAndBadges.js` | Key algorithmic application from Day 2026-10-24. |
| [Set of Strangers](https://codeforces.com/problemset/problem/2069/B) | `Codeforces` | `1200` | `setOfStrangers.js` | Key algorithmic application from Day 2026-10-24. |
| [Common Prefixes](https://codeforces.com/problemset/problem/1384/A) | `Codeforces` | `1200` | `commonPrefixes.js` | Key algorithmic application from Day 2026-10-24. |
| [Kuroni and Simple Strings](https://codeforces.com/problemset/problem/1305/B) | `Codeforces` | `1200` | `kuroniAndSimpleStrings.js` | Key algorithmic application from Day 2026-10-24. |
| [Queue Sort](https://codeforces.com/problemset/problem/1899/E) | `Codeforces` | `1300` | `queueSort.js` | Key algorithmic application from Day 2026-10-24. |
| [Binary Path](https://codeforces.com/problemset/problem/1937/B) | `Codeforces` | `1300` | `binaryPath.js` | Key algorithmic application from Day 2026-10-24. |
| [Magnitude (Easy Version)](https://codeforces.com/problemset/problem/1984/C1) | `Codeforces` | `1300` | `magnitudeEasyVersion.js` | Key algorithmic application from Day 2026-10-24. |
| [Nice Matrix](https://codeforces.com/problemset/problem/1422/B) | `Codeforces` | `1300` | `niceMatrix.js` | Key algorithmic application from Day 2026-10-24. |
| [Minimize Distance](https://codeforces.com/problemset/problem/1585/C) | `Codeforces` | `1300` | `minimizeDistance.js` | Key algorithmic application from Day 2026-10-24. |


## 7. Common Pitfalls & Anti-Patterns
- **Coin Change Fallacy:** Standard greedy coin change works for canonical denominations (1, 5, 10, 25), but fails for arbitrary denominations (e.g., coins $[1, 3, 4]$ for sum 6: greedy gives $4+1+1 = 3$, DP gives $3+3 = 2$).
- **Modifying Array while Iterating:** Do not `splice()` inside a loop; use two pointers or a filtered array instead.
