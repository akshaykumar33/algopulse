# Mathematics & Parity Invariants — Algorithmic Patterns & Knowledge Base

## 1. Core Principles & Mental Model
Mathematical competitive programming problems require discovering conservation laws, parity invariants, closed-form equations, or boundary conditions that eliminate the need for step-by-step simulation.

### Fundamental Concepts:
1. **Parity Invariant:** The sum or difference of two integers has the same parity as their XOR. Operations like adding/subtracting 1 change parity; adding/subtracting 2 preserves parity.
2. **Floor / Ceil Arithmetic:** 
   - Integer division rounding up: $\lceil \frac{A}{B} \rceil = \lfloor \frac{A + B - 1}{B} \rfloor$ (for $A, B > 0$).
   - In JavaScript: `Math.floor((A + B - 1) / B)` or `Math.ceil(A / B)`.
3. **Pigeonhole Principle:** If $n$ items are placed into $m$ containers and $n > m$, at least one container must contain at least $\lceil n / m \rceil$ items.

---

## 2. Recognition Signals ("When you see X, think Y")
- **$N \ge 10^9$ or $T \le 10^5$ with large values:** $\implies O(1)$ closed-form mathematical formula.
- **"Determine if it is possible to make all elements equal":** $\implies$ Check total sum divisibility or invariant preservation.
- **"Divide array into equal parts":** $\implies$ Total sum must be even; check subset sum or parity.
- **"Coordinate distance / Manhattan distance":** $\implies |x_1 - x_2| + |y_1 - y_2|$; parity of Manhattan distance is invariant under orthogonal steps.

---

## 3. Key Mathematical Theorems & Formulas
1. **Arithmetic Progression Sum:**
   $$S_n = \frac{n(a_1 + a_n)}{2} = \frac{n(2a + (n-1)d)}{2}$$
2. **Sum of First $N$ Integers:**
   $$\sum_{i=1}^n i = \frac{n(n+1)}{2}$$
3. **Parity Addition Rules:**
   - $\text{Even} \pm \text{Even} = \text{Even}$
   - $\text{Odd} \pm \text{Odd} = \text{Even}$
   - $\text{Even} \pm \text{Odd} = \text{Odd}$
   - Sum of $K$ odd numbers is odd if and only if $K$ is odd.

---

## 4. Node.js / JavaScript Implementation Patterns & Traps

### Pattern: Safe Ceiling Integer Division
```javascript
// Safe integer division rounding up (for positive a, b)
function ceilDiv(a, b) {
  return Math.floor((a + b - 1) / b);
}
```

### Pattern: Large Number Safety Check ($2^{53} - 1$)
```javascript
// If product exceeds 9e15, use BigInt
const a = 1000000000;
const b = 1000000000;
// a * b = 1e18 > 9e15 -> USE BIGINT!
const safeProduct = BigInt(a) * BigInt(b);
```

### Critical Traps:
- **Integer Division in JavaScript:** In JS, `/` produces a float (`7 / 2 === 3.5`). You MUST explicitly wrap in `Math.floor(a / b)` or `Math.trunc(a / b)`. Bitwise `(a / b) | 0` only works up to $2^{31}-1$ (wraps at $2.14 \times 10^9$)!
- **Negative Modulo:** In JavaScript, `-5 % 3 === -2` (not 1). Safe modulo:
  ```javascript
  const mod = (n, m) => ((n % m) + m) % m;
  ```

---

## 5. Sub-Patterns & Archetypes
1. **Sum & Parity Balance:** Checking if sum of elements allows even split into two subsets (e.g. `Fair Division`).
2. **Coordinate Displacement Invariants:** Measuring distance on grids via Manhattan metric and checking reachability in $K$ steps ($K \ge \text{dist}$ and $(K - \text{dist}) \pmod 2 == 0$).
3. **Prefix Arithmetic Progressions:** Calculating consecutive step costs where the $k$-th step costs $k$.

---

## 6. Solved Problems Catalog & Takeaways

| Problem | Platform | Rating | Solution File | Core Insight / Takeaway |
|---|---|---|---|---|
| [Watermelon](https://codeforces.com/problemset/problem/4/A) | `Codeforces` | `800` | `watermelon.js` | $w$ can be split into two positive even parts iff $w$ is even and $w \ge 4$. |
| [Collecting Coins](https://codeforces.com/problemset/problem/1294/A) | `Codeforces` | `800` | `collectingCoins.js` | Total sum $(a+b+c+n)$ must be divisible by 3 and $n \ge$ deficit to reach $\max(a,b,c)$. |
| [Magical Sticks](https://codeforces.com/problemset/problem/1371/A) | `Codeforces` | `800` | `magicalSticks.js` | Pair sticks $i + (n - i)$ to form equal sticks: result is $\lceil n / 2 \rceil = \lfloor (n + 1) / 2 \rfloor$. |
| [Minimize!](https://codeforces.com/problemset/problem/2009/A) | `Codeforces` | `800` | `minimize.js` | $(c - a) + (b - c) = b - a$ for any $c \in [a, b]$. Independent of $c$! |

---
| [Domino piling](https://codeforces.com/problemset/problem/50/A) | `undefined` | `800` | `dominoPiling.js` | Key algorithmic application from Day 2026-09-25. |
| [Candies and Two Sisters](https://codeforces.com/problemset/problem/1335/A) | `undefined` | `800` | `candiesAndTwoSisters.js` | Key algorithmic application from Day 2026-09-26. |
| [Only Pluses](https://codeforces.com/problemset/problem/1992/A) | `undefined` | `800` | `onlyPluses.js` | Key algorithmic application from Day 2026-09-27. |
| [Buttons](https://codeforces.com/problemset/problem/1858/A) | `undefined` | `800` | `buttons.js` | Key algorithmic application from Day 2026-09-27. |
| [Two Vessels](https://codeforces.com/problemset/problem/1872/A) | `undefined` | `800` | `twoVessels.js` | Key algorithmic application from Day 2026-09-27. |
| [Sum of Round Numbers](https://codeforces.com/problemset/problem/1352/A) | `Codeforces` | `800` | `sumOfRoundNumbers.js` | Key algorithmic application from Day 2026-09-28. |
| [One and Two](https://codeforces.com/problemset/problem/1788/A) | `Codeforces` | `800` | `oneAndTwo.js` | Key algorithmic application from Day 2026-09-28. |
| [Game with Integers](https://codeforces.com/problemset/problem/1899/A) | `Codeforces` | `800` | `gameWithIntegers.js` | Key algorithmic application from Day 2026-09-28. |
| [Following Directions](https://codeforces.com/problemset/problem/1791/B) | `Codeforces` | `800` | `followingDirections.js` | Key algorithmic application from Day 2026-09-29. |
| [Most Unstable Array](https://codeforces.com/problemset/problem/1353/A) | `Codeforces` | `800` | `mostUnstableArray.js` | Key algorithmic application from Day 2026-09-29. |
| [Calculating Function](https://codeforces.com/problemset/problem/486/A) | `Codeforces` | `800` | `calculatingFunction.js` | Key algorithmic application from Day 2026-09-30. |
| [Ordinary Numbers](https://codeforces.com/problemset/problem/1520/B) | `Codeforces` | `800` | `ordinaryNumbers.js` | Key algorithmic application from Day 2026-09-30. |
| [New World, New Me, New Array](https://codeforces.com/problemset/problem/2072/A) | `Codeforces` | `800` | `newWorldNewMeNewArray.js` | Key algorithmic application from Day 2026-09-30. |
| [Chess For Three](https://codeforces.com/problemset/problem/1973/A) | `Codeforces` | `900` | `chessForThree.js` | Key algorithmic application from Day 2026-09-30. |
| [Sandwiches](https://www.codechef.com) | `CodeChef` | `500` | `sandwiches.js` | Resource bottleneck formulation: min(floor(B/2), H + C). |
| [Chocolate Cutting](https://www.codechef.com) | `CodeChef` | `500` | `chocolateCutting.js` | Grid line bipartition parity: rectangle N x M can be split into two equal pieces with a parallel cut iff N is even or M is even. |
| [Staircase Edits](https://www.codechef.com) | `CodeChef` | `1000` | `staircaseEdits.js` | Arithmetic invariant transformation: array is staircase iff A[i] - i = C. Minimum edits is N - max_freq(A[i] - i). |
| [Shuffle (Easy)](https://www.codechef.com) | `CodeChef` | `1200` | `shuffleEasy.js` | Permutation window-sort preimage counting: K! * K^(N - K) mod 998244353. |
| [MEX Game (Easy)](https://www.codechef.com) | `CodeChef` | `1200` | `mexGameEasy.js` | Arithmetic sum invariant under MEX preservation: sum_{x > M} (x - (M+1)) + sum_{x < M} x - M(M-1)/2. |
| [Shuffle (Hard)](https://www.codechef.com) | `CodeChef` | `1700` | `shuffleHard.js` | Preimage count of sliding window sort on general Q: K! * K^(prefix_maxima - 1). |
| [Divisibility Problem](https://codeforces.com/problemset/problem/1328/A) | `Codeforces` | `800` | `divisibilityProblem.js` | Key algorithmic application from Day 2026-10-01. |
| [Sum in Binary Tree](https://codeforces.com/problemset/problem/1843/C) | `Codeforces` | `800` | `sumInBinaryTree.js` | Key algorithmic application from Day 2026-10-01. |
| [Elephant](https://codeforces.com/problemset/problem/617/A) | `Codeforces` | `800` | `elephant.js` | Key algorithmic application from Day 2026-10-01. |
| [Yogurt Sale](https://codeforces.com/problemset/problem/1955/A) | `Codeforces` | `800` | `yogurtSale.js` | Bundle promotion optimization: compare 2*a <= b; if promo is cheaper, greedily buy floor(n/2)*b + (n%2)*a, else n*a. |
| [Legs](https://codeforces.com/problemset/problem/1996/A) | `Codeforces` | `800` | `legs.js` | Key algorithmic application from Day 2026-10-01. |
| [Permutation Swap](https://codeforces.com/problemset/problem/1828/B) | `Codeforces` | `900` | `permutationSwap.js` | Key algorithmic application from Day 2026-10-01. |
| [Make it Divisible by 25](https://codeforces.com/problemset/problem/1593/B) | `Codeforces` | `900` | `makeItDivisibleBy25.js` | Key algorithmic application from Day 2026-10-01. |
| [Everyone Loves to Sleep](https://codeforces.com/problemset/problem/1714/A) | `Codeforces` | `900` | `everyoneLovesToSleep.js` | Key algorithmic application from Day 2026-10-01. |
| [Wizard of Orz](https://codeforces.com/problemset/problem/1467/A) | `Codeforces` | `900` | `wizardOfOrz.js` | Key algorithmic application from Day 2026-10-02. |
| [PizzaForces](https://codeforces.com/problemset/problem/1555/A) | `Codeforces` | `900` | `pizzaForces.js` | Key algorithmic application from Day 2026-10-02. |
| [Vasilije in Cacak](https://codeforces.com/problemset/problem/1878/C) | `Codeforces` | `900` | `vasilijeInCacak.js` | Key algorithmic application from Day 2026-10-02. |
| [Board Moves](https://codeforces.com/problemset/problem/1353/C) | `Codeforces` | `1000` | `boardMoves.js` | Key algorithmic application from Day 2026-10-02. |
| [Minimum LCM](https://codeforces.com/problemset/problem/1765/M) | `Codeforces` | `1000` | `minimumLCM.js` | Key algorithmic application from Day 2026-10-02. |
| [Food Buying](https://codeforces.com/problemset/problem/1296/B) | `Codeforces` | `900` | `foodBuying.js` | Key algorithmic application from Day 2026-10-03. |
| [Mocha and Math](https://codeforces.com/problemset/problem/1559/A) | `Codeforces` | `900` | `mochaAndMath.js` | Key algorithmic application from Day 2026-10-03. |
| [Berland Poker](https://codeforces.com/problemset/problem/1359/A) | `Codeforces` | `1000` | `berlandPoker.js` | Key algorithmic application from Day 2026-10-03. |
| [Prime Subtraction](https://codeforces.com/problemset/problem/1238/A) | `Codeforces` | `900` | `primeSubtraction.js` | Key algorithmic application from Day 2026-10-04. |
| [Strange Partition](https://codeforces.com/problemset/problem/1471/A) | `Codeforces` | `900` | `strangePartition.js` | Key algorithmic application from Day 2026-10-04. |
| [XORinacci](https://codeforces.com/problemset/problem/1208/A) | `Codeforces` | `900` | `xORinacci.js` | Key algorithmic application from Day 2026-10-04. |
| [Drazil and Date](https://codeforces.com/problemset/problem/515/A) | `Codeforces` | `1000` | `drazilAndDate.js` | Key algorithmic application from Day 2026-10-04. |
| [Customising the Track](https://codeforces.com/problemset/problem/1543/B) | `Codeforces` | `900` | `customisingTheTrack.js` | Key algorithmic application from Day 2026-10-05. |
| [Perpendicular Segments](https://codeforces.com/problemset/problem/2026/A) | `Codeforces` | `900` | `perpendicularSegments.js` | Key algorithmic application from Day 2026-10-05. |
| [Maximums](https://codeforces.com/problemset/problem/1326/B) | `Codeforces` | `900` | `maximums.js` | Key algorithmic application from Day 2026-10-05. |
| [Left and Down](https://codeforces.com/problemset/problem/2125/B) | `Codeforces` | `900` | `leftAndDown.js` | Key algorithmic application from Day 2026-10-05. |
| [K-divisible Sum](https://codeforces.com/problemset/problem/1476/A) | `Codeforces` | `1000` | `kDivisibleSum.js` | Key algorithmic application from Day 2026-10-05. |
| [Pyramid of Bricks](https://www.codechef.com/problems/PYRAMID) | `CodeChef` | `Easy` | `pyramidOfBricks.js` | Closed-form quadratic solver for triangular sum k*(k+1)/2 <= N. |
| [Sasha and His Trip](https://codeforces.com/problemset/problem/1113/A) | `Codeforces` | `900` | `sashaAndHisTrip.js` | Key algorithmic application from Day 2026-10-06. |
| [Avoiding Zero](https://codeforces.com/problemset/problem/1427/A) | `Codeforces` | `900` | `avoidingZero.js` | Key algorithmic application from Day 2026-10-06. |
| [Rudolf and 121](https://codeforces.com/problemset/problem/1941/B) | `Codeforces` | `1000` | `rudolfAnd121.js` | Key algorithmic application from Day 2026-10-06. |
| [Theatre Square](https://codeforces.com/problemset/problem/1/A) | `Codeforces` | `1000` | `theatreSquare.js` | Key algorithmic application from Day 2026-10-06. |
| [Number of Apartments](https://codeforces.com/problemset/problem/1430/A) | `Codeforces` | `900` | `numberOfApartments.js` | Key algorithmic application from Day 2026-10-07. |
| [Cubes Sorting](https://codeforces.com/problemset/problem/1420/A) | `Codeforces` | `900` | `cubesSorting.js` | Key algorithmic application from Day 2026-10-07. |
| [Multiply by 2, divide by 6](https://codeforces.com/problemset/problem/1374/B) | `Codeforces` | `900` | `multiplyBy2DivideBy6.js` | Key algorithmic application from Day 2026-10-07. |
| [The Strict Teacher (Easy Version)](https://codeforces.com/problemset/problem/2005/B1) | `Codeforces` | `1000` | `theStrictTeacherEasyVersion.js` | Key algorithmic application from Day 2026-10-07. |
| [Dinner Time](https://codeforces.com/problemset/problem/2102/A) | `Codeforces` | `900` | `dinnerTime.js` | Key algorithmic application from Day 2026-10-08. |
| [Lunar New Year and Number Division](https://codeforces.com/problemset/problem/1106/C) | `Codeforces` | `900` | `lunarNewYearAndNumberDivision.js` | Key algorithmic application from Day 2026-10-08. |
| [Filling Diamonds](https://codeforces.com/problemset/problem/1339/A) | `Codeforces` | `900` | `fillingDiamonds.js` | Key algorithmic application from Day 2026-10-08. |
| [The number of positions](https://codeforces.com/problemset/problem/124/A) | `Codeforces` | `1000` | `theNumberOfPositions.js` | Key algorithmic application from Day 2026-10-08. |
| [Minimize Equal Sum Subarrays](https://codeforces.com/problemset/problem/1998/B) | `Codeforces` | `1000` | `minimizeEqualSumSubarrays.js` | Key algorithmic application from Day 2026-10-09. |
| [Parallelepiped](https://codeforces.com/problemset/problem/224/A) | `Codeforces` | `1100` | `parallelepiped.js` | Key algorithmic application from Day 2026-10-09. |
| [Permutation Minimization by Deque](https://codeforces.com/problemset/problem/1579/E1) | `Codeforces` | `1000` | `permutationMinimizationByDeque.js` | Key algorithmic application from Day 2026-10-10. |
| [Offshores](https://codeforces.com/problemset/problem/2194/B) | `Codeforces` | `1000` | `offshores.js` | Key algorithmic application from Day 2026-10-10. |
| [Consecutive Points Segment](https://codeforces.com/problemset/problem/1671/B) | `Codeforces` | `1000` | `consecutivePointsSegment.js` | Key algorithmic application from Day 2026-10-10. |
| [Maximum Rounding](https://codeforces.com/problemset/problem/1857/B) | `Codeforces` | `1100` | `maximumRounding.js` | Key algorithmic application from Day 2026-10-10. |
| [Relatively Prime Pairs](https://codeforces.com/problemset/problem/1051/B) | `Codeforces` | `1000` | `relativelyPrimePairs.js` | Key algorithmic application from Day 2026-10-11. |
| [Non-coprime Split](https://codeforces.com/problemset/problem/1872/C) | `Codeforces` | `1100` | `nonCoprimeSplit.js` | Key algorithmic application from Day 2026-10-11. |
| [Spring](https://codeforces.com/problemset/problem/2204/C) | `Codeforces` | `1000` | `spring.js` | Key algorithmic application from Day 2026-10-12. |
| [Water Lily](https://codeforces.com/problemset/problem/1199/B) | `Codeforces` | `1000` | `waterLily.js` | Key algorithmic application from Day 2026-10-12. |
| [Books Exchange (easy version)](https://codeforces.com/problemset/problem/1249/B1) | `Codeforces` | `1000` | `booksExchangeEasyVersion.js` | Key algorithmic application from Day 2026-10-13. |
| [Tavas and SaDDas](https://codeforces.com/problemset/problem/535/B) | `Codeforces` | `1100` | `tavasAndSaDDas.js` | Key algorithmic application from Day 2026-10-13. |
| [Special Numbers](https://codeforces.com/problemset/problem/1594/B) | `Codeforces` | `1100` | `specialNumbers.js` | Key algorithmic application from Day 2026-10-14. |
| [Sum of Odd Integers](https://codeforces.com/problemset/problem/1327/A) | `Codeforces` | `1100` | `sumOfOddIntegers.js` | Key algorithmic application from Day 2026-10-14. |
| [378QAQ and Mocha's Array](https://codeforces.com/problemset/problem/1975/B) | `Codeforces` | `1000` | `p378QAQAndMochaSArray.js` | Key algorithmic application from Day 2026-10-15. |
| [Boboniu Likes to Color Balls](https://codeforces.com/problemset/problem/1395/A) | `Codeforces` | `1000` | `boboniuLikesToColorBalls.js` | Key algorithmic application from Day 2026-10-15. |
| [Difference of GCDs](https://codeforces.com/problemset/problem/1708/B) | `Codeforces` | `1100` | `differenceOfGCDs.js` | Key algorithmic application from Day 2026-10-15. |
| [Division by Two and Permutation](https://codeforces.com/problemset/problem/1624/C) | `Codeforces` | `1100` | `divisionByTwoAndPermutation.js` | Key algorithmic application from Day 2026-10-15. |
| [GCD Length](https://codeforces.com/problemset/problem/1511/B) | `Codeforces` | `1100` | `gCDLength.js` | Key algorithmic application from Day 2026-10-16. |
| [Digits](https://codeforces.com/problemset/problem/2043/B) | `Codeforces` | `1100` | `digits.js` | Key algorithmic application from Day 2026-10-16. |
| [Uninteresting Number](https://codeforces.com/problemset/problem/2050/C) | `Codeforces` | `1200` | `uninterestingNumber.js` | Key algorithmic application from Day 2026-10-16. |
| [Yet Another Coin Problem](https://codeforces.com/problemset/problem/1934/B) | `Codeforces` | `1200` | `yetAnotherCoinProblem.js` | Key algorithmic application from Day 2026-10-16. |
| [Palindromic Subsequences](https://codeforces.com/problemset/problem/2056/C) | `Codeforces` | `1200` | `palindromicSubsequences.js` | Key algorithmic application from Day 2026-10-16. |
| [Vicious Labyrinth](https://codeforces.com/problemset/problem/2078/B) | `Codeforces` | `1100` | `viciousLabyrinth.js` | Key algorithmic application from Day 2026-10-17. |
| [Niko's Tactical Cards](https://codeforces.com/problemset/problem/2173/B) | `Codeforces` | `1100` | `nikoSTacticalCards.js` | Key algorithmic application from Day 2026-10-17. |
| [Fear of the Dark](https://codeforces.com/problemset/problem/1886/B) | `Codeforces` | `1200` | `fearOfTheDark.js` | Key algorithmic application from Day 2026-10-17. |
| [Binary Inversions](https://codeforces.com/problemset/problem/1760/E) | `Codeforces` | `1100` | `binaryInversions.js` | Key algorithmic application from Day 2026-10-18. |
| [The 67th OEIS Problem](https://codeforces.com/problemset/problem/2218/D) | `Codeforces` | `1100` | `the67thOEISProblem.js` | Key algorithmic application from Day 2026-10-18. |
| [Maximum Even Sum](https://codeforces.com/problemset/problem/2137/C) | `Codeforces` | `1100` | `maximumEvenSum.js` | Key algorithmic application from Day 2026-10-18. |
| [Quests](https://codeforces.com/problemset/problem/1914/C) | `Codeforces` | `1100` | `quests.js` | Key algorithmic application from Day 2026-10-18. |
| [Summation Game](https://codeforces.com/problemset/problem/1920/B) | `Codeforces` | `1100` | `summationGame.js` | Key algorithmic application from Day 2026-10-18. |
| [Kill the Monster](https://codeforces.com/problemset/problem/1633/C) | `Codeforces` | `1100` | `killTheMonster.js` | Key algorithmic application from Day 2026-10-18. |
| [Binomial Coefficients, Kind Of](https://codeforces.com/problemset/problem/2025/B) | `Codeforces` | `1100` | `binomialCoefficientsKindOf.js` | Key algorithmic application from Day 2026-10-18. |
| [Hungry Sequence](https://codeforces.com/problemset/problem/327/B) | `Codeforces` | `1200` | `hungrySequence.js` | Key algorithmic application from Day 2026-10-18. |
| [Transfusion](https://codeforces.com/problemset/problem/2050/B) | `Codeforces` | `1100` | `transfusion.js` | Key algorithmic application from Day 2026-10-19. |
| [Minimize the Thickness](https://codeforces.com/problemset/problem/1741/C) | `Codeforces` | `1100` | `minimizeTheThickness.js` | Key algorithmic application from Day 2026-10-19. |
| [Shovels and Swords](https://codeforces.com/problemset/problem/1366/A) | `Codeforces` | `1100` | `shovelsAndSwords.js` | Key algorithmic application from Day 2026-10-19. |
| [All Pairs Segments](https://codeforces.com/problemset/problem/2019/B) | `Codeforces` | `1200` | `allPairsSegments.js` | Key algorithmic application from Day 2026-10-19. |
| [Ternary Sequence](https://codeforces.com/problemset/problem/1401/B) | `Codeforces` | `1100` | `ternarySequence.js` | Key algorithmic application from Day 2026-10-20. |
| [Large Addition](https://codeforces.com/problemset/problem/1984/B) | `Codeforces` | `1100` | `largeAddition.js` | Key algorithmic application from Day 2026-10-20. |
| [Level Statistics](https://codeforces.com/problemset/problem/1334/A) | `Codeforces` | `1200` | `levelStatistics.js` | Key algorithmic application from Day 2026-10-20. |
| [Make Them Equal](https://codeforces.com/problemset/problem/1154/B) | `Codeforces` | `1200` | `makeThemEqual.js` | Key algorithmic application from Day 2026-10-20. |
| [Medians](https://codeforces.com/problemset/problem/2032/B) | `Codeforces` | `1100` | `medians.js` | Key algorithmic application from Day 2026-10-21. |
| [Lucky Numbers](https://codeforces.com/problemset/problem/630/C) | `Codeforces` | `1100` | `luckyNumbers.js` | Key algorithmic application from Day 2026-10-21. |
| [Kill Demodogs](https://codeforces.com/problemset/problem/1731/B) | `Codeforces` | `1100` | `killDemodogs.js` | Key algorithmic application from Day 2026-10-21. |
| [Binary Colouring](https://codeforces.com/problemset/problem/1977/B) | `Codeforces` | `1100` | `binaryColouring.js` | Key algorithmic application from Day 2026-10-21. |
| [Hemose Shopping](https://codeforces.com/problemset/problem/1592/B) | `Codeforces` | `1200` | `hemoseShopping.js` | Key algorithmic application from Day 2026-10-21. |
| [Sign Flipping](https://codeforces.com/problemset/problem/1375/A) | `Codeforces` | `1100` | `signFlipping.js` | Key algorithmic application from Day 2026-10-22. |
| [All are Same](https://codeforces.com/problemset/problem/1593/D1) | `Codeforces` | `1100` | `allAreSame.js` | Key algorithmic application from Day 2026-10-22. |
| [Long Multiplication](https://codeforces.com/problemset/problem/1954/C) | `Codeforces` | `1200` | `longMultiplication.js` | Key algorithmic application from Day 2026-10-22. |
| [Pashmak and Flowers](https://codeforces.com/problemset/problem/459/B) | `Codeforces` | `1300` | `pashmakAndFlowers.js` | Key algorithmic application from Day 2026-10-23. |
| [A Good Problem](https://codeforces.com/problemset/problem/2119/C) | `Codeforces` | `1300` | `aGoodProblem.js` | Key algorithmic application from Day 2026-10-23. |
| [Forever Winter](https://codeforces.com/problemset/problem/1829/F) | `Codeforces` | `1300` | `foreverWinter.js` | Key algorithmic application from Day 2026-10-23. |
| [Odd Selection](https://codeforces.com/problemset/problem/1363/A) | `Codeforces` | `1200` | `oddSelection.js` | Key algorithmic application from Day 2026-10-24. |
| [Removal of Unattractive Pairs](https://codeforces.com/problemset/problem/1907/C) | `Codeforces` | `1200` | `removalOfUnattractivePairs.js` | Key algorithmic application from Day 2026-10-24. |
| [Vika and the Bridge](https://codeforces.com/problemset/problem/1848/B) | `Codeforces` | `1200` | `vikaAndTheBridge.js` | Key algorithmic application from Day 2026-10-24. |
| [Kar Salesman](https://codeforces.com/problemset/problem/2022/B) | `Codeforces` | `1300` | `karSalesman.js` | Key algorithmic application from Day 2026-10-24. |
| [Inversion Graph](https://codeforces.com/problemset/problem/1638/C) | `Codeforces` | `1300` | `inversionGraph.js` | Key algorithmic application from Day 2026-10-24. |
| [Odd Sum Segments](https://codeforces.com/problemset/problem/1196/B) | `Codeforces` | `1200` | `oddSumSegments.js` | Key algorithmic application from Day 2026-10-24. |
| [Sanatorium](https://codeforces.com/problemset/problem/732/C) | `Codeforces` | `1200` | `sanatorium.js` | Key algorithmic application from Day 2026-10-24. |
| [Another Permutation Problem](https://codeforces.com/problemset/problem/1859/C) | `Codeforces` | `1200` | `anotherPermutationProblem.js` | Key algorithmic application from Day 2026-10-24. |
| [Plus Minus Permutation](https://codeforces.com/problemset/problem/1872/D) | `Codeforces` | `1200` | `plusMinusPermutation.js` | Key algorithmic application from Day 2026-10-24. |
| [The Strict Teacher (Hard Version)](https://codeforces.com/problemset/problem/2005/B2) | `Codeforces` | `1200` | `theStrictTeacherHardVersion.js` | Key algorithmic application from Day 2026-10-24. |
| [Build Permutation](https://codeforces.com/problemset/problem/1713/C) | `Codeforces` | `1200` | `buildPermutation.js` | Key algorithmic application from Day 2026-10-24. |
| [Fedya and Maths](https://codeforces.com/problemset/problem/456/B) | `Codeforces` | `1200` | `fedyaAndMaths.js` | Key algorithmic application from Day 2026-10-24. |
| [Divisor Chain](https://codeforces.com/problemset/problem/1864/C) | `Codeforces` | `1300` | `divisorChain.js` | Key algorithmic application from Day 2026-10-24. |
| [Magnitude (Easy Version)](https://codeforces.com/problemset/problem/1984/C1) | `Codeforces` | `1300` | `magnitudeEasyVersion.js` | Key algorithmic application from Day 2026-10-24. |
| [Divide and Equalize](https://codeforces.com/problemset/problem/1881/D) | `Codeforces` | `1300` | `divideAndEqualize.js` | Key algorithmic application from Day 2026-10-24. |
| [Nice Matrix](https://codeforces.com/problemset/problem/1422/B) | `Codeforces` | `1300` | `niceMatrix.js` | Key algorithmic application from Day 2026-10-24. |
| [Minimum Notation](https://codeforces.com/problemset/problem/1730/C) | `Codeforces` | `1200` | `minimumNotation.js` | Key algorithmic application from Day 2026-10-25. |
| [Almost Equal](https://codeforces.com/problemset/problem/1205/A) | `Codeforces` | `1200` | `almostEqual.js` | Key algorithmic application from Day 2026-10-25. |
| [The Bits](https://codeforces.com/problemset/problem/1017/B) | `Codeforces` | `1200` | `theBits.js` | Key algorithmic application from Day 2026-10-25. |
| [Playing with GCD](https://codeforces.com/problemset/problem/1736/B) | `Codeforces` | `1200` | `playingWithGCD.js` | Key algorithmic application from Day 2026-10-25. |
| [Super-Permutation](https://codeforces.com/problemset/problem/1822/D) | `Codeforces` | `1200` | `superPermutation.js` | Key algorithmic application from Day 2026-10-25. |
| [Classroom Watch](https://codeforces.com/problemset/problem/875/A) | `Codeforces` | `1200` | `classroomWatch.js` | Key algorithmic application from Day 2026-10-25. |
| [The Monster](https://codeforces.com/problemset/problem/787/A) | `Codeforces` | `1200` | `theMonster.js` | Key algorithmic application from Day 2026-10-25. |
| [Inflation](https://codeforces.com/problemset/problem/1476/B) | `Codeforces` | `1300` | `inflation.js` | Key algorithmic application from Day 2026-10-25. |
| [Nastia and a Good Array](https://codeforces.com/problemset/problem/1521/B) | `Codeforces` | `1300` | `nastiaAndAGoodArray.js` | Key algorithmic application from Day 2026-10-25. |
| [All-in-one Gun](https://codeforces.com/problemset/problem/2192/C) | `Codeforces` | `1300` | `allInOneGun.js` | Key algorithmic application from Day 2026-10-25. |
| [The Wall](https://codeforces.com/problemset/problem/340/A) | `Codeforces` | `1200` | `theWall.js` | Key algorithmic application from Day 2026-10-26. |
| [Honey Cake](https://codeforces.com/problemset/problem/2181/H) | `Codeforces` | `1200` | `honeyCake.js` | Key algorithmic application from Day 2026-10-26. |
| [Unnatural Conditions](https://codeforces.com/problemset/problem/1028/B) | `Codeforces` | `1200` | `unnaturalConditions.js` | Key algorithmic application from Day 2026-10-26. |
| [A Balanced Problemset?](https://codeforces.com/problemset/problem/1925/B) | `Codeforces` | `1200` | `aBalancedProblemset.js` | Key algorithmic application from Day 2026-10-26. |
| [Vanya and Books](https://codeforces.com/problemset/problem/552/B) | `Codeforces` | `1200` | `vanyaAndBooks.js` | Key algorithmic application from Day 2026-10-26. |
| [Equal Rectangles](https://codeforces.com/problemset/problem/1203/B) | `Codeforces` | `1200` | `equalRectangles.js` | Key algorithmic application from Day 2026-10-26. |
| [Diameter of Graph](https://codeforces.com/problemset/problem/1581/B) | `Codeforces` | `1200` | `diameterOfGraph.js` | Key algorithmic application from Day 2026-10-26. |
| [Add 0 or K](https://codeforces.com/problemset/problem/2134/B) | `Codeforces` | `1200` | `add0OrK.js` | Key algorithmic application from Day 2026-10-26. |
| [Slice to Survive](https://codeforces.com/problemset/problem/2109/B) | `Codeforces` | `1200` | `sliceToSurvive.js` | Key algorithmic application from Day 2026-10-26. |
| [Yet Another Array Restoration](https://codeforces.com/problemset/problem/1409/C) | `Codeforces` | `1200` | `yetAnotherArrayRestoration.js` | Key algorithmic application from Day 2026-10-26. |
| [Delete Two Elements](https://codeforces.com/problemset/problem/1598/C) | `Codeforces` | `1200` | `deleteTwoElements.js` | Key algorithmic application from Day 2026-10-26. |
| [Sereja and Contests](https://codeforces.com/problemset/problem/401/B) | `Codeforces` | `1200` | `serejaAndContests.js` | Key algorithmic application from Day 2026-10-26. |
| [Vasya and Book](https://codeforces.com/problemset/problem/1082/A) | `Codeforces` | `1200` | `vasyaAndBook.js` | Key algorithmic application from Day 2026-10-26. |
| [T-primes](https://codeforces.com/problemset/problem/230/B) | `Codeforces` | `1300` | `tPrimes.js` | Key algorithmic application from Day 2026-10-26. |
| [Points on Line](https://codeforces.com/problemset/problem/251/A) | `Codeforces` | `1300` | `pointsOnLine.js` | Key algorithmic application from Day 2026-10-26. |
| [Fox Dividing Cheese](https://codeforces.com/problemset/problem/371/B) | `Codeforces` | `1300` | `foxDividingCheese.js` | Key algorithmic application from Day 2026-10-26. |
| [Divisibility by 2^n](https://codeforces.com/problemset/problem/1744/D) | `Codeforces` | `1200` | `divisibilityBy2N.js` | Key algorithmic application from Day 2026-10-27. |
| [Beautiful Array](https://codeforces.com/problemset/problem/2041/E) | `Codeforces` | `1200` | `beautifulArray.js` | Key algorithmic application from Day 2026-10-27. |
| [Training Before the Olympiad](https://codeforces.com/problemset/problem/1916/C) | `Codeforces` | `1200` | `trainingBeforeTheOlympiad.js` | Key algorithmic application from Day 2026-10-27. |
| [3SUM](https://codeforces.com/problemset/problem/1692/F) | `Codeforces` | `1300` | `threeSum1692F.js` | Key algorithmic application from Day 2026-10-27. |
| [Stamina and Tasks](https://codeforces.com/problemset/problem/2208/C) | `Codeforces` | `1300` | `staminaAndTasks.js` | Key algorithmic application from Day 2026-10-27. |
| [Closest Cities](https://codeforces.com/problemset/problem/1922/C) | `Codeforces` | `1300` | `closestCities.js` | Key algorithmic application from Day 2026-10-27. |
| [Rudolph and Christmas Tree](https://codeforces.com/problemset/problem/1846/D) | `Codeforces` | `1200` | `rudolphAndChristmasTree.js` | Key algorithmic application from Day 2026-10-28. |
| [Game with a Fraction](https://codeforces.com/problemset/problem/2196/A) | `Codeforces` | `1200` | `gameWithAFraction.js` | Key algorithmic application from Day 2026-10-28. |
| [Production of Snowmen](https://codeforces.com/problemset/problem/2182/C) | `Codeforces` | `1200` | `productionOfSnowmen.js` | Key algorithmic application from Day 2026-10-28. |
| [Leftmost Below](https://codeforces.com/problemset/problem/2128/C) | `Codeforces` | `1200` | `leftmostBelow.js` | Key algorithmic application from Day 2026-10-28. |
| [Replace and Keep Sorted](https://codeforces.com/problemset/problem/1485/B) | `Codeforces` | `1200` | `replaceAndKeepSorted.js` | Key algorithmic application from Day 2026-10-28. |
| [Ian and Array Sorting](https://codeforces.com/problemset/problem/1815/A) | `Codeforces` | `1300` | `ianAndArraySorting.js` | Key algorithmic application from Day 2026-10-28. |
| [Heidi Learns Hashing (Easy)](https://codeforces.com/problemset/problem/1184/A1) | `Codeforces` | `1200` | `heidiLearnsHashingEasy.js` | Key algorithmic application from Day 2026-10-29. |
| [Prefix Sum Addicts](https://codeforces.com/problemset/problem/1738/B) | `Codeforces` | `1200` | `prefixSumAddicts.js` | Key algorithmic application from Day 2026-10-29. |
| [Magical Calendar](https://codeforces.com/problemset/problem/1371/B) | `Codeforces` | `1200` | `magicalCalendar.js` | Key algorithmic application from Day 2026-10-29. |
| [Parallelogram is Back](https://codeforces.com/problemset/problem/749/B) | `Codeforces` | `1200` | `parallelogramIsBack.js` | Key algorithmic application from Day 2026-10-29. |
| [Asuna and the Mosquitoes](https://codeforces.com/problemset/problem/2092/C) | `Codeforces` | `1200` | `asunaAndTheMosquitoes.js` | Key algorithmic application from Day 2026-10-29. |
| [Divisor Subtraction](https://codeforces.com/problemset/problem/1076/B) | `Codeforces` | `1200` | `divisorSubtraction.js` | Key algorithmic application from Day 2026-10-29. |
| [Collatz Conjecture](https://codeforces.com/problemset/problem/1982/B) | `Codeforces` | `1200` | `collatzConjecture.js` | Key algorithmic application from Day 2026-10-29. |
| [NN and the Optical Illusion](https://codeforces.com/problemset/problem/1100/C) | `Codeforces` | `1200` | `nNAndTheOpticalIllusion.js` | Key algorithmic application from Day 2026-10-29. |
| [Black Circles](https://codeforces.com/problemset/problem/2002/C) | `Codeforces` | `1200` | `blackCircles.js` | Key algorithmic application from Day 2026-10-29. |
| [Selection of Personnel](https://codeforces.com/problemset/problem/630/F) | `Codeforces` | `1300` | `selectionOfPersonnel.js` | Key algorithmic application from Day 2026-10-29. |
| [Omkar and Last Class of Math](https://codeforces.com/problemset/problem/1372/B) | `Codeforces` | `1300` | `omkarAndLastClassOfMath.js` | Key algorithmic application from Day 2026-10-29. |
| [Concatenation of Arrays](https://codeforces.com/problemset/problem/2023/A) | `Codeforces` | `1300` | `concatenationOfArrays.js` | Key algorithmic application from Day 2026-10-29. |
| [Product of Three Numbers](https://codeforces.com/problemset/problem/1294/C) | `Codeforces` | `1300` | `productOfThreeNumbers.js` | Key algorithmic application from Day 2026-10-29. |
| [Sonya and Exhibition](https://codeforces.com/problemset/problem/1004/B) | `Codeforces` | `1300` | `sonyaAndExhibition.js` | Key algorithmic application from Day 2026-10-30. |
| [Expansion coefficient of the array](https://codeforces.com/problemset/problem/1159/B) | `Codeforces` | `1300` | `expansionCoefficientOfTheArray.js` | Key algorithmic application from Day 2026-10-30. |
| [Money Trees](https://codeforces.com/problemset/problem/1873/F) | `Codeforces` | `1300` | `moneyTrees.js` | Key algorithmic application from Day 2026-10-30. |
| [Colorful Table](https://codeforces.com/problemset/problem/1870/C) | `Codeforces` | `1300` | `colorfulTable.js` | Key algorithmic application from Day 2026-10-30. |
| [Cow and Friend](https://codeforces.com/problemset/problem/1307/B) | `Codeforces` | `1300` | `cowAndFriend.js` | Key algorithmic application from Day 2026-10-30. |
| [Twist the Permutation](https://codeforces.com/problemset/problem/1650/D) | `Codeforces` | `1300` | `twistThePermutation.js` | Key algorithmic application from Day 2026-10-30. |
| [Dreaming of Freedom](https://codeforces.com/problemset/problem/1826/C) | `Codeforces` | `1300` | `dreamingOfFreedom.js` | Key algorithmic application from Day 2026-10-30. |
| [Di-visible Confusion](https://codeforces.com/problemset/problem/1603/A) | `Codeforces` | `1300` | `diVisibleConfusion.js` | Key algorithmic application from Day 2026-10-30. |
| [XOR Convenience (Easy Version)](https://codeforces.com/problemset/problem/2189/C1) | `Codeforces` | `1300` | `xORConvenienceEasyVersion.js` | Key algorithmic application from Day 2026-10-30. |
| [Particles](https://codeforces.com/problemset/problem/1844/C) | `Codeforces` | `1300` | `particles.js` | Key algorithmic application from Day 2026-10-30. |
| [Insane Problem](https://codeforces.com/problemset/problem/2044/E) | `Codeforces` | `1300` | `insaneProblem.js` | Key algorithmic application from Day 2026-10-30. |
| [Prefix Permutation Sums](https://codeforces.com/problemset/problem/1851/D) | `Codeforces` | `1300` | `prefixPermutationSums.js` | Key algorithmic application from Day 2026-10-30. |
| [Birthday](https://codeforces.com/problemset/problem/1068/A) | `Codeforces` | `1400` | `birthday.js` | Key algorithmic application from Day 2026-10-30. |
| [Good Pair Queries](https://codeforces.com/problemset/problem/2248/D) | `Codeforces` | `1400` | `goodPairQueries.js` | Key algorithmic application from Day 2026-10-30. |
| [Composite Coloring](https://codeforces.com/problemset/problem/1332/B) | `Codeforces` | `1400` | `compositeColoring.js` | Key algorithmic application from Day 2026-10-30. |
| [Ela's Fitness and the Luxury Number](https://codeforces.com/problemset/problem/1737/B) | `Codeforces` | `1300` | `elaSFitnessAndTheLuxuryNumber.js` | Key algorithmic application from Day 2026-10-31. |
| [Subset Multiplication](https://codeforces.com/problemset/problem/2124/C) | `Codeforces` | `1300` | `subsetMultiplication.js` | Key algorithmic application from Day 2026-10-31. |
| [Permutation Operations](https://codeforces.com/problemset/problem/1746/C) | `Codeforces` | `1300` | `permutationOperations.js` | Key algorithmic application from Day 2026-10-31. |
| [Absolute Cinema](https://codeforces.com/problemset/problem/2195/D) | `Codeforces` | `1300` | `absoluteCinema.js` | Key algorithmic application from Day 2026-10-31. |
| [Books Exchange (hard version)](https://codeforces.com/problemset/problem/1249/B2) | `Codeforces` | `1300` | `booksExchangeHardVersion.js` | Key algorithmic application from Day 2026-10-31. |
| [Where do I Turn?](https://codeforces.com/problemset/problem/227/A) | `Codeforces` | `1300` | `whereDoITurn.js` | Key algorithmic application from Day 2026-10-31. |
| [Forecast](https://codeforces.com/problemset/problem/630/N) | `Codeforces` | `1300` | `forecast.js` | Key algorithmic application from Day 2026-10-31. |
| [Position in Fraction](https://codeforces.com/problemset/problem/900/B) | `Codeforces` | `1300` | `positionInFraction.js` | Key algorithmic application from Day 2026-10-31. |
| [Dasha and friends](https://codeforces.com/problemset/problem/761/B) | `Codeforces` | `1300` | `dashaAndFriends.js` | Key algorithmic application from Day 2026-10-31. |
| [Mister B and Angle in Polygon](https://codeforces.com/problemset/problem/820/B) | `Codeforces` | `1300` | `misterBAndAngleInPolygon.js` | Key algorithmic application from Day 2026-10-31. |
| [Archer](https://codeforces.com/problemset/problem/312/B) | `Codeforces` | `1300` | `archer.js` | Key algorithmic application from Day 2026-10-31. |
| [Blue-Red Permutation](https://codeforces.com/problemset/problem/1607/D) | `Codeforces` | `1300` | `blueRedPermutation.js` | Key algorithmic application from Day 2026-10-31. |
| [Make a Power of Two](https://codeforces.com/problemset/problem/1560/D) | `Codeforces` | `1300` | `makeAPowerOfTwo.js` | Key algorithmic application from Day 2026-10-31. |
| [Alice's Adventures in Permuting](https://codeforces.com/problemset/problem/2028/B) | `Codeforces` | `1400` | `aliceSAdventuresInPermuting.js` | Key algorithmic application from Day 2026-10-31. |
| [Trinity](https://codeforces.com/problemset/problem/2032/C) | `Codeforces` | `1400` | `trinity.js` | Key algorithmic application from Day 2026-10-31. |
| [Absolute Sorting](https://codeforces.com/problemset/problem/1772/D) | `Codeforces` | `1400` | `absoluteSorting.js` | Key algorithmic application from Day 2026-10-31. |


## 7. Common Pitfalls & Anti-Patterns
- **Bitwise Truncation on $>2 \cdot 10^9$:** Never use `x | 0` or `~~x` on values larger than $2^{31}-1$.
- **Floating Point Inexactness:** `0.1 + 0.2 !== 0.3`. For geometry or float comparisons, use an epsilon: `Math.abs(a - b) < 1e-9`.
