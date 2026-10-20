# Brute Force & Search Pruning — Algorithmic Patterns & Knowledge Base

## 1. Core Principles & Mental Model
Brute Force systematically evaluates every candidate in the problem's search space to find an optimal or valid configuration. In competitive programming, brute force is valid when constraints are sufficiently small, or when paired with aggressive branch-and-bound pruning.

### Time Complexity Feasibility Matrix:
- $N \le 10 \implies O(N!) \approx 3.6 \times 10^6$ ops (Permutations).
- $N \le 20 \implies O(2^N) \approx 1.05 \times 10^6$ ops (Subsets).
- $N \le 500 \implies O(N^3) \approx 1.25 \times 10^8$ ops (Triple nested loops).
- $N \le 5000 \implies O(N^2) \approx 2.5 \times 10^7$ ops (Double nested loops).

---

## 2. Recognition Signals ("When you see X, think Y")
- **Constraints: $N \le 8$ or $N \le 10$:** $\implies$ Full permutation enumeration (`next_permutation`).
- **Constraints: $N \le 20$:** $\implies$ Recursion with pruning or bitmask iteration.
- **Constraints: $N \le 40$:** $\implies$ Meet-in-the-middle ($2^{20} + 2^{20} \approx 2 \times 10^6$ ops).
- **"Find if any combination of 5 increments achieves max product":** $\implies$ Brute force all distributions of 5 operations ($O(3^5) = 243$ states).

---

## 3. Key Mathematical Theorems & Search Reductions
1. **Branch-and-Bound Principle:**
   If current accumulated cost already exceeds known minimum answer, terminate branch immediately:
   $$\text{if } (\text{currentCost} \ge \text{bestAnswer}) \quad \text{return;}$$
2. **Meet-in-the-Middle:**
   Split array of size $N$ into two halves of size $N/2$. Compute all $2^{N/2}$ subset sums for each half, sort the second half, and use binary search to match targets in $O(2^{N/2} \cdot N/2)$ time.

---

## 4. Node.js / JavaScript Implementation Patterns & Traps

### Pattern 1: Nested Small Constrained Loops
```javascript
// Example: Only Pluses (Codeforces 1992A)
// Distribute 5 increments among 3 variables a, b, c
let maxProduct = 0;
for (let i = 0; i <= 5; i++) {
  for (let j = 0; j <= 5 - i; j++) {
    const k = 5 - i - j;
    const prod = (a + i) * (b + j) * (c + k);
    if (prod > maxProduct) maxProduct = prod;
  }
}
```

### Pattern 2: Recursive Backtracking with Pruning
```javascript
function backtrack(index, currentSum, target, arr) {
  if (currentSum === target) return true;
  if (currentSum > target || index >= arr.length) return false;

  // Pruning: early exit if remaining maximum possible sum is insufficient
  // Branch 1: include element
  if (backtrack(index + 1, currentSum + arr[index], target, arr)) return true;
  // Branch 2: exclude element
  if (backtrack(index + 1, currentSum, target, arr)) return true;

  return false;
}
```

### Critical Traps:
- **Excessive Object / Array Allocations in Recursion:** Avoid doing `backtrack([...currentList, x])` because copying arrays at every step creates $O(2^N \cdot N)$ memory overhead. Use a mutable array with push and pop:
  ```javascript
  path.push(x);
  backtrack(...);
  path.pop();
  ```

---

## 5. Sub-Patterns & Archetypes
1. **Iterative Enumeration:** Exhaustively testing all coordinates $(x, y)$ or bounded integer choices.
2. **Backtracking:** Depth-first construction with undo operations upon reaching dead ends.
3. **Meet-in-the-Middle:** Splitting exponential search spaces into halves.

---

## 6. Solved Problems Catalog & Takeaways

| Problem | Platform | Rating | Solution File | Core Insight / Takeaway |
|---|---|---|---|---|
| [Only Pluses](https://codeforces.com/problemset/problem/1992/A) | `Codeforces` | `800` | `onlyPluses.js` | With only 5 operations across 3 variables, the total search space is $\binom{5+3-1}{3-1} = 21$ combinations; trivial brute force. |
| [Watermelon](https://codeforces.com/problemset/problem/4/A) | `Codeforces` | `800` | `watermelon.js` | Feasibility check across split pairs $(2, w-2)$. |

---
| [Team](https://codeforces.com/problemset/problem/231/A) | `undefined` | `800` | `team.js` | Key algorithmic application from Day 2026-09-25. |
| [Minimize!](https://codeforces.com/problemset/problem/2009/A) | `undefined` | `800` | `minimize.js` | Key algorithmic application from Day 2026-09-26. |
| [Maximum in Table](https://codeforces.com/problemset/problem/509/A) | `undefined` | `800` | `maximumInTable.js` | Key algorithmic application from Day 2026-09-27. |
| [Beautiful Year](https://codeforces.com/problemset/problem/271/A) | `undefined` | `800` | `beautifulYear.js` | Key algorithmic application from Day 2026-09-27. |
| [Two Vessels](https://codeforces.com/problemset/problem/1872/A) | `undefined` | `800` | `twoVessels.js` | Key algorithmic application from Day 2026-09-27. |
| [I_love_\%username\%](https://codeforces.com/problemset/problem/155/A) | `undefined` | `800` | `iLoveUsername.js` | Key algorithmic application from Day 2026-09-27. |
| [One and Two](https://codeforces.com/problemset/problem/1788/A) | `Codeforces` | `800` | `oneAndTwo.js` | Key algorithmic application from Day 2026-09-28. |
| [Beautiful Average](https://codeforces.com/problemset/problem/2162/A) | `Codeforces` | `800` | `beautifulAverage.js` | Key algorithmic application from Day 2026-09-28. |
| [Fibonacciness](https://codeforces.com/problemset/problem/2060/A) | `Codeforces` | `800` | `fibonacciness.js` | Key algorithmic application from Day 2026-09-28. |
| [Ordinary Numbers](https://codeforces.com/problemset/problem/1520/B) | `Codeforces` | `800` | `ordinaryNumbers.js` | Key algorithmic application from Day 2026-09-30. |
| [Chess For Three](https://codeforces.com/problemset/problem/1973/A) | `Codeforces` | `900` | `chessForThree.js` | Key algorithmic application from Day 2026-09-30. |
| [Do Not Be Distracted!](https://codeforces.com/problemset/problem/1520/A) | `Codeforces` | `800` | `doNotBeDistracted.js` | Key algorithmic application from Day 2026-10-01. |
| [PizzaForces](https://codeforces.com/problemset/problem/1555/A) | `Codeforces` | `900` | `pizzaForces.js` | Key algorithmic application from Day 2026-10-02. |
| [Delete from the Left](https://codeforces.com/problemset/problem/1005/B) | `Codeforces` | `900` | `deleteFromTheLeft.js` | Key algorithmic application from Day 2026-10-02. |
| [Little Elephant and Rozdil](https://codeforces.com/problemset/problem/205/A) | `Codeforces` | `900` | `littleElephantAndRozdil.js` | Key algorithmic application from Day 2026-10-02. |
| [Gold Rush](https://codeforces.com/problemset/problem/1829/D) | `Codeforces` | `1000` | `goldRush.js` | Key algorithmic application from Day 2026-10-02. |
| [ABC String](https://codeforces.com/problemset/problem/1494/A) | `Codeforces` | `900` | `aBCString.js` | Key algorithmic application from Day 2026-10-03. |
| [Berland Poker](https://codeforces.com/problemset/problem/1359/A) | `Codeforces` | `1000` | `berlandPoker.js` | Key algorithmic application from Day 2026-10-03. |
| [Magic Numbers](https://codeforces.com/problemset/problem/320/A) | `Codeforces` | `900` | `magicNumbers.js` | Key algorithmic application from Day 2026-10-04. |
| [Kefa and First Steps](https://codeforces.com/problemset/problem/580/A) | `Codeforces` | `900` | `kefaAndFirstSteps.js` | Key algorithmic application from Day 2026-10-06. |
| [Rudolf and 121](https://codeforces.com/problemset/problem/1941/B) | `Codeforces` | `1000` | `rudolfAnd121.js` | Key algorithmic application from Day 2026-10-06. |
| [Sakurako and Water](https://codeforces.com/problemset/problem/2033/B) | `Codeforces` | `900` | `sakurakoAndWater.js` | Key algorithmic application from Day 2026-10-07. |
| [Number of Apartments](https://codeforces.com/problemset/problem/1430/A) | `Codeforces` | `900` | `numberOfApartments.js` | Key algorithmic application from Day 2026-10-07. |
| [Balanced Round](https://codeforces.com/problemset/problem/1850/D) | `Codeforces` | `900` | `balancedRound.js` | Key algorithmic application from Day 2026-10-07. |
| [Penchick and Satay Sticks](https://codeforces.com/problemset/problem/2031/B) | `Codeforces` | `900` | `penchickAndSataySticks.js` | Key algorithmic application from Day 2026-10-08. |
| [Filling Diamonds](https://codeforces.com/problemset/problem/1339/A) | `Codeforces` | `900` | `fillingDiamonds.js` | Key algorithmic application from Day 2026-10-08. |
| [Fair Numbers](https://codeforces.com/problemset/problem/1411/B) | `Codeforces` | `1000` | `fairNumbers.js` | Key algorithmic application from Day 2026-10-09. |
| [Parallelepiped](https://codeforces.com/problemset/problem/224/A) | `Codeforces` | `1100` | `parallelepiped.js` | Key algorithmic application from Day 2026-10-09. |
| [Consecutive Points Segment](https://codeforces.com/problemset/problem/1671/B) | `Codeforces` | `1000` | `consecutivePointsSegment.js` | Key algorithmic application from Day 2026-10-10. |
| [Lucky Sum of Digits](https://codeforces.com/problemset/problem/109/A) | `Codeforces` | `1000` | `luckySumOfDigits.js` | Key algorithmic application from Day 2026-10-11. |
| [X-Sum](https://codeforces.com/problemset/problem/1676/D) | `Codeforces` | `1000` | `xSum.js` | Key algorithmic application from Day 2026-10-12. |
| [Mike and palindrome](https://codeforces.com/problemset/problem/798/A) | `Codeforces` | `1000` | `mikeAndPalindrome.js` | Key algorithmic application from Day 2026-10-12. |
| [Rooms and Staircases](https://codeforces.com/problemset/problem/1244/B) | `Codeforces` | `1000` | `roomsAndStaircases.js` | Key algorithmic application from Day 2026-10-12. |
| [Shrinking Array](https://codeforces.com/problemset/problem/2112/B) | `Codeforces` | `1100` | `shrinkingArray.js` | Key algorithmic application from Day 2026-10-12. |
| [Move to the End](https://codeforces.com/problemset/problem/2104/B) | `Codeforces` | `1000` | `moveToTheEnd.js` | Key algorithmic application from Day 2026-10-13. |
| [Tavas and SaDDas](https://codeforces.com/problemset/problem/535/B) | `Codeforces` | `1100` | `tavasAndSaDDas.js` | Key algorithmic application from Day 2026-10-13. |
| [Double Strings](https://codeforces.com/problemset/problem/1703/D) | `Codeforces` | `1100` | `doubleStrings.js` | Key algorithmic application from Day 2026-10-13. |
| [Shuffle Hashing](https://codeforces.com/problemset/problem/1278/A) | `Codeforces` | `1000` | `shuffleHashing.js` | Key algorithmic application from Day 2026-10-14. |
| [Double-ended Strings](https://codeforces.com/problemset/problem/1506/C) | `Codeforces` | `1000` | `doubleEndedStrings.js` | Key algorithmic application from Day 2026-10-14. |
| [378QAQ and Mocha's Array](https://codeforces.com/problemset/problem/1975/B) | `Codeforces` | `1000` | `p378QAQAndMochaSArray.js` | Key algorithmic application from Day 2026-10-15. |
| [Boboniu Likes to Color Balls](https://codeforces.com/problemset/problem/1395/A) | `Codeforces` | `1000` | `boboniuLikesToColorBalls.js` | Key algorithmic application from Day 2026-10-15. |
| [Subsequence Addition (Easy Version)](https://codeforces.com/problemset/problem/1807/G1) | `Codeforces` | `1100` | `subsequenceAdditionEasyVersion.js` | Key algorithmic application from Day 2026-10-15. |
| [Uninteresting Number](https://codeforces.com/problemset/problem/2050/C) | `Codeforces` | `1200` | `uninterestingNumber.js` | Key algorithmic application from Day 2026-10-16. |
| [Yet Another Coin Problem](https://codeforces.com/problemset/problem/1934/B) | `Codeforces` | `1200` | `yetAnotherCoinProblem.js` | Key algorithmic application from Day 2026-10-16. |
| [Palindromic Subsequences](https://codeforces.com/problemset/problem/2056/C) | `Codeforces` | `1200` | `palindromicSubsequences.js` | Key algorithmic application from Day 2026-10-16. |
| [The Clock](https://codeforces.com/problemset/problem/1692/D) | `Codeforces` | `1100` | `theClock.js` | Key algorithmic application from Day 2026-10-17. |
| [Maximum Even Sum](https://codeforces.com/problemset/problem/2137/C) | `Codeforces` | `1100` | `maximumEvenSum.js` | Key algorithmic application from Day 2026-10-18. |
| [Kill the Monster](https://codeforces.com/problemset/problem/1633/C) | `Codeforces` | `1100` | `killTheMonster.js` | Key algorithmic application from Day 2026-10-18. |
| [Transfusion](https://codeforces.com/problemset/problem/2050/B) | `Codeforces` | `1100` | `transfusion.js` | Key algorithmic application from Day 2026-10-19. |
| [Minimize the Thickness](https://codeforces.com/problemset/problem/1741/C) | `Codeforces` | `1100` | `minimizeTheThickness.js` | Key algorithmic application from Day 2026-10-19. |
| [Carrot Cakes](https://codeforces.com/problemset/problem/799/A) | `Codeforces` | `1100` | `carrotCakes.js` | Key algorithmic application from Day 2026-10-20. |
| [Equal Values](https://codeforces.com/problemset/problem/2111/C) | `Codeforces` | `1100` | `equalValues.js` | Key algorithmic application from Day 2026-10-20. |


## 7. Common Pitfalls & Anti-Patterns
- **Failing to Estimate States:** Always multiply loop bounds before coding: if the loop runs $10^9$ times, it **will** TLE. Node.js executes roughly $10^8$ operations per second.
