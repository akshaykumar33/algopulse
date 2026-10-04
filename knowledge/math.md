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
| [Yogurt Sale](https://codeforces.com/problemset/problem/1955/A) | `Codeforces` | `800` | `yogurtSale.js` | Key algorithmic application from Day 2026-10-01. |
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


## 7. Common Pitfalls & Anti-Patterns
- **Bitwise Truncation on $>2 \cdot 10^9$:** Never use `x | 0` or `~~x` on values larger than $2^{31}-1$.
- **Floating Point Inexactness:** `0.1 + 0.2 !== 0.3`. For geometry or float comparisons, use an epsilon: `Math.abs(a - b) < 1e-9`.
