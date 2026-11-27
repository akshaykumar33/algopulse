# Dynamic Programming — Algorithmic Patterns & Knowledge Base

## 1. Core Principles & Mental Model
Dynamic Programming (DP) solves complex problems by breaking them down into simpler subproblems, storing the results of these subproblems in a memory table (memoization or tabulation) to prevent redundant re-computation.

### The Four Pillars of DP:
1. **State Definition:** What minimal tuple of parameters $(i, j, \dots)$ uniquely characterizes the state of the system?
2. **Transition Function:** How does state $DP[\text{current}]$ derive from previously computed optimal states?
3. **Base Cases:** What are the smallest non-decomposable trivial subproblems?
4. **Order of Computation & Memory Optimization:** In what order must loops execute so dependencies are computed before needed? Can older states be discarded to save space?

---

## 2. Recognition Signals ("When you see X, think Y")
- **"Find the maximum / minimum cost to reach state $N$":** $\implies$ Optimization DP.
- **"Count the number of ways to form target value":** $\implies$ Counting DP (sum of transitions).
- **"Determine if target sum is achievable using elements":** $\implies$ Boolean Knapsack / Subset Sum.
- **Constraints: $N \le 2000$ with $O(N^2)$ or $N \le 500$ with $O(N^3)$:** $\implies$ Interval / 2D DP.
- **Constraints: $N \le 20$:** $\implies$ Bitmask DP.

---

## 3. Key Mathematical Theorems & Formulations
1. **0-1 Knapsack / Subset Sum:**
   $$DP[i][w] = \max(DP[i-1][w], DP[i-1][w - \text{weight}[i]] + \text{val}[i])$$
   *1D Space Optimization:* Iterate $w$ **backwards** from $W$ down to $\text{weight}[i]$ to avoid using the same item multiple times:
   $$DP[w] = DP[w] \lor DP[w - \text{weight}[i]]$$
2. **Unbounded Knapsack (Coin Change):**
   Iterate $w$ **forwards** from $\text{weight}[i]$ up to $W$ to allow repeated item usage.

---

## 4. Node.js / JavaScript Implementation Patterns & Traps

### Pattern: 1D Space-Optimized Subset Sum (Boolean Knapsack)
```javascript
// Check if subset sum equals target
function canPartition(nums, target) {
  const dp = new Uint8Array(target + 1);
  dp[0] = 1; // Base case: sum 0 is always achievable

  for (const x of nums) {
    for (let w = target; w >= x; w--) {
      if (dp[w - x]) {
        dp[w] = 1;
      }
    }
  }
  return Boolean(dp[target]);
}
```

### Pattern: TypedArray Allocation for High Performance
```javascript
// Fast 1D DP table allocation
const dp = new Int32Array(maxN + 1);
dp.fill(-1); // Memoization sentinel
```

### Critical Traps:
- **Nested Array Allocation inside Multi-Test Loop:** If $T = 10^4$ and you do `Array.from({length: 2000}, () => new Array(2000))` in each testcase, you will get **Memory Limit Exceeded (MLE)** or **Time Limit Exceeded (TLE)** from garbage collection. Pre-allocate or reuse buffers!
- **Call Stack Limits in Top-Down Memoization:** Recursive `dfs(i, j)` in Node.js fails if recursion depth exceeds $\sim 10,000$. Use iterative bottom-up tabulation for deep constraints.

---

## 5. Sub-Patterns & Archetypes
1. **Linear 1D DP:** $DP[i]$ depends on $DP[i-1], DP[i-2]$ (e.g. Climbing Stairs, House Robber).
2. **Knapsack Archetypes:** 0-1 (backward loop), Unbounded (forward loop), Bounded (binary splitting).
3. **Grid DP:** Pathfinding on $N \times M$ matrix where $DP[r][c] = \text{cost} + \min(DP[r-1][c], DP[r][c-1])$.

---

## 6. Solved Problems Catalog & Takeaways

| Problem | Platform | Rating | Solution File | Core Insight / Takeaway |
|---|---|---|---|---|
| [Fair Division](https://codeforces.com/problemset/problem/1472/B) | `Codeforces` | `800` | `fairDivision.js` | Subset sum / parity balance: partition candies of weight 1 and 2 into equal sums. Total sum must be even; if weight 1 count is 0, weight 2 count must be even. |
| [Chess For Three](https://codeforces.com/problemset/problem/1973/A) | `Codeforces` | `900` | `chessForThree.js` | Key algorithmic application from Day 2026-09-30. |
| [Make it Divisible by 25](https://codeforces.com/problemset/problem/1593/B) | `Codeforces` | `900` | `makeItDivisibleBy25.js` | Key algorithmic application from Day 2026-10-01. |
| [Gold Rush](https://codeforces.com/problemset/problem/1829/D) | `Codeforces` | `1000` | `goldRush.js` | Key algorithmic application from Day 2026-10-02. |
| [Cormen --- The Best Friend Of a Man](https://codeforces.com/problemset/problem/732/B) | `Codeforces` | `1000` | `cormenTheBestFriendOfAMan.js` | Key algorithmic application from Day 2026-10-03. |
| [Also Try Minecraft](https://codeforces.com/problemset/problem/1709/B) | `Codeforces` | `900` | `alsoTryMinecraft.js` | Key algorithmic application from Day 2026-10-05. |
| [Birthday Feast](https://www.codechef.com/problems/BIRTHDAYFEAST) | `CodeChef` | `Easy` | `birthdayFeast.js` | Unbounded Min-Cost Knapsack tabulated up to max(A_i). Sum individual dp[A_i] per friend. |
| [Sasha and His Trip](https://codeforces.com/problemset/problem/1113/A) | `Codeforces` | `900` | `sashaAndHisTrip.js` | Key algorithmic application from Day 2026-10-06. |
| [Kefa and First Steps](https://codeforces.com/problemset/problem/580/A) | `Codeforces` | `900` | `kefaAndFirstSteps.js` | Key algorithmic application from Day 2026-10-06. |
| [Rudolf and 121](https://codeforces.com/problemset/problem/1941/B) | `Codeforces` | `1000` | `rudolfAnd121.js` | Key algorithmic application from Day 2026-10-06. |
| [Rudolf and the Ugly String](https://codeforces.com/problemset/problem/1941/C) | `Codeforces` | `900` | `rudolfAndTheUglyString.js` | Key algorithmic application from Day 2026-10-07. |
| [Non-Substring Subsequence](https://codeforces.com/problemset/problem/1451/B) | `Codeforces` | `900` | `nonSubstringSubsequence.js` | Key algorithmic application from Day 2026-10-08. |
| [Filling Diamonds](https://codeforces.com/problemset/problem/1339/A) | `Codeforces` | `900` | `fillingDiamonds.js` | Key algorithmic application from Day 2026-10-08. |
| [Two Binary Strings](https://codeforces.com/problemset/problem/1861/B) | `Codeforces` | `1000` | `twoBinaryStrings.js` | Key algorithmic application from Day 2026-10-09. |
| [Move to the End](https://codeforces.com/problemset/problem/2104/B) | `Codeforces` | `1000` | `moveToTheEnd.js` | Key algorithmic application from Day 2026-10-13. |
| [Save the Magazines](https://codeforces.com/problemset/problem/1743/C) | `Codeforces` | `1100` | `saveTheMagazines.js` | Key algorithmic application from Day 2026-10-14. |
| [Subsequence Addition (Easy Version)](https://codeforces.com/problemset/problem/1807/G1) | `Codeforces` | `1100` | `subsequenceAdditionEasyVersion.js` | Key algorithmic application from Day 2026-10-15. |
| [Monsters Attack!](https://codeforces.com/problemset/problem/1923/B) | `Codeforces` | `1100` | `monstersAttack.js` | Key algorithmic application from Day 2026-10-16. |
| [Uninteresting Number](https://codeforces.com/problemset/problem/2050/C) | `Codeforces` | `1200` | `uninterestingNumber.js` | Key algorithmic application from Day 2026-10-16. |
| [Yet Another Coin Problem](https://codeforces.com/problemset/problem/1934/B) | `Codeforces` | `1200` | `yetAnotherCoinProblem.js` | Key algorithmic application from Day 2026-10-16. |
| [Niko's Tactical Cards](https://codeforces.com/problemset/problem/2173/B) | `Codeforces` | `1100` | `nikoSTacticalCards.js` | Key algorithmic application from Day 2026-10-17. |
| [BerSU Ball](https://codeforces.com/problemset/problem/489/B) | `Codeforces` | `1200` | `berSUBall.js` | Key algorithmic application from Day 2026-10-17. |
| [Binomial Coefficients, Kind Of](https://codeforces.com/problemset/problem/2025/B) | `Codeforces` | `1100` | `binomialCoefficientsKindOf.js` | Key algorithmic application from Day 2026-10-18. |
| [Ternary String](https://codeforces.com/problemset/problem/1354/B) | `Codeforces` | `1200` | `ternaryString.js` | Key algorithmic application from Day 2026-10-18. |
| [Petr and a Combination Lock](https://codeforces.com/problemset/problem/1097/B) | `Codeforces` | `1200` | `petrAndACombinationLock.js` | Key algorithmic application from Day 2026-10-21. |
| [Another Permutation Problem](https://codeforces.com/problemset/problem/1859/C) | `Codeforces` | `1200` | `anotherPermutationProblem.js` | Key algorithmic application from Day 2026-10-24. |
| [Build Permutation](https://codeforces.com/problemset/problem/1713/C) | `Codeforces` | `1200` | `buildPermutation.js` | Key algorithmic application from Day 2026-10-24. |
| [Flipping Game](https://codeforces.com/problemset/problem/327/A) | `Codeforces` | `1200` | `flippingGame.js` | Key algorithmic application from Day 2026-10-24. |
| [Binary Path](https://codeforces.com/problemset/problem/1937/B) | `Codeforces` | `1300` | `binaryPath.js` | Key algorithmic application from Day 2026-10-24. |
| [Magnitude (Easy Version)](https://codeforces.com/problemset/problem/1984/C1) | `Codeforces` | `1300` | `magnitudeEasyVersion.js` | Key algorithmic application from Day 2026-10-24. |
| [Spotlights](https://codeforces.com/problemset/problem/729/B) | `Codeforces` | `1200` | `spotlights.js` | Key algorithmic application from Day 2026-10-25. |
| [Rudolf and the Another Competition](https://codeforces.com/problemset/problem/1846/C) | `Codeforces` | `1200` | `rudolfAndTheAnotherCompetition.js` | Key algorithmic application from Day 2026-10-25. |
| [Vlad and a Sum of Sum of Digits](https://codeforces.com/problemset/problem/1926/C) | `Codeforces` | `1200` | `vladAndASumOfSumOfDigits.js` | Key algorithmic application from Day 2026-10-25. |
| [Find the Different Ones!](https://codeforces.com/problemset/problem/1927/D) | `Codeforces` | `1300` | `findTheDifferentOnes.js` | Key algorithmic application from Day 2026-10-25. |
| [Boring Day](https://codeforces.com/problemset/problem/1982/C) | `Codeforces` | `1200` | `boringDay.js` | Key algorithmic application from Day 2026-10-26. |
| [Delete Two Elements](https://codeforces.com/problemset/problem/1598/C) | `Codeforces` | `1200` | `deleteTwoElements.js` | Key algorithmic application from Day 2026-10-26. |
| [Lecture Sleep](https://codeforces.com/problemset/problem/961/B) | `Codeforces` | `1200` | `lectureSleep.js` | Key algorithmic application from Day 2026-10-27. |
| [Restricted RPS](https://codeforces.com/problemset/problem/1245/B) | `Codeforces` | `1200` | `restrictedRPS.js` | Key algorithmic application from Day 2026-10-27. |
| [Stamina and Tasks](https://codeforces.com/problemset/problem/2208/C) | `Codeforces` | `1300` | `staminaAndTasks.js` | Key algorithmic application from Day 2026-10-27. |
| [Production of Snowmen](https://codeforces.com/problemset/problem/2182/C) | `Codeforces` | `1200` | `productionOfSnowmen.js` | Key algorithmic application from Day 2026-10-28. |
| [Replace and Keep Sorted](https://codeforces.com/problemset/problem/1485/B) | `Codeforces` | `1200` | `replaceAndKeepSorted.js` | Key algorithmic application from Day 2026-10-28. |
| [WOW Factor](https://codeforces.com/problemset/problem/1178/B) | `Codeforces` | `1300` | `wOWFactor.js` | Key algorithmic application from Day 2026-10-28. |
| [Rudolf and the Ball Game](https://codeforces.com/problemset/problem/1941/D) | `Codeforces` | `1200` | `rudolfAndTheBallGame.js` | Key algorithmic application from Day 2026-10-29. |
| [Three Activities](https://codeforces.com/problemset/problem/1914/D) | `Codeforces` | `1200` | `threeActivities.js` | Key algorithmic application from Day 2026-10-29. |
| [Against the Difference](https://codeforces.com/problemset/problem/2135/A) | `Codeforces` | `1200` | `againstTheDifference.js` | Key algorithmic application from Day 2026-10-29. |
| [Colorful Table](https://codeforces.com/problemset/problem/1870/C) | `Codeforces` | `1300` | `colorfulTable.js` | Key algorithmic application from Day 2026-10-30. |
| [Particles](https://codeforces.com/problemset/problem/1844/C) | `Codeforces` | `1300` | `particles.js` | Key algorithmic application from Day 2026-10-30. |
| [Mike and strings](https://codeforces.com/problemset/problem/798/B) | `Codeforces` | `1300` | `mikeAndStrings.js` | Key algorithmic application from Day 2026-10-30. |
| [As Simple as One and Two](https://codeforces.com/problemset/problem/1276/A) | `Codeforces` | `1400` | `asSimpleAsOneAndTwo.js` | Key algorithmic application from Day 2026-10-30. |
| [K for the Price of One (Easy Version)](https://codeforces.com/problemset/problem/1282/B1) | `Codeforces` | `1400` | `kForThePriceOfOneEasyVersion.js` | Key algorithmic application from Day 2026-10-30. |
| [Polo the Penguin and Matrix](https://codeforces.com/problemset/problem/289/B) | `Codeforces` | `1400` | `poloThePenguinAndMatrix.js` | Key algorithmic application from Day 2026-10-31. |
| [Equalize](https://codeforces.com/problemset/problem/1037/C) | `Codeforces` | `1300` | `equalize.js` | Key algorithmic application from Day 2026-11-01. |
| [Lose it!](https://codeforces.com/problemset/problem/1176/C) | `Codeforces` | `1300` | `loseIt.js` | Key algorithmic application from Day 2026-11-01. |
| [Remove the Ends](https://codeforces.com/problemset/problem/2064/C) | `Codeforces` | `1300` | `removeTheEnds.js` | Key algorithmic application from Day 2026-11-01. |
| [Alternating Subsequence](https://codeforces.com/problemset/problem/1343/C) | `Codeforces` | `1200` | `alternatingSubsequence.js` | Key algorithmic application from Day 2026-11-01. |
| [Secret message](https://codeforces.com/problemset/problem/2194/C) | `Codeforces` | `1300` | `secretMessage.js` | Key algorithmic application from Day 2026-11-02. |
| [Array and Operations](https://codeforces.com/problemset/problem/1618/D) | `Codeforces` | `1300` | `arrayAndOperations.js` | Key algorithmic application from Day 2026-11-02. |
| [Seating Arrangement (Easy Version)](https://codeforces.com/problemset/problem/2232/C1) | `Codeforces` | `1300` | `seatingArrangementEasyVersion.js` | Key algorithmic application from Day 2026-11-02. |
| [Reverse String](https://codeforces.com/problemset/problem/1553/B) | `Codeforces` | `1300` | `reverseString.js` | Key algorithmic application from Day 2026-11-02. |
| [Quasi Binary](https://codeforces.com/problemset/problem/538/B) | `Codeforces` | `1400` | `quasiBinary.js` | Key algorithmic application from Day 2026-11-02. |
| [Bridge Renovation](https://codeforces.com/problemset/problem/2038/L) | `Codeforces` | `1400` | `bridgeRenovation.js` | Key algorithmic application from Day 2026-11-02. |
| [Arrow Path](https://codeforces.com/problemset/problem/1948/C) | `Codeforces` | `1300` | `arrowPath.js` | Key algorithmic application from Day 2026-11-03. |
| [Maximize the Score](https://codeforces.com/problemset/problem/2248/C) | `Codeforces` | `1300` | `maximizeTheScore.js` | Key algorithmic application from Day 2026-11-03. |
| [Art Union](https://codeforces.com/problemset/problem/416/B) | `Codeforces` | `1300` | `artUnion.js` | Key algorithmic application from Day 2026-11-03. |
| [Game on Permutation](https://codeforces.com/problemset/problem/1860/C) | `Codeforces` | `1400` | `gameOnPermutation.js` | Key algorithmic application from Day 2026-11-03. |
| [Make Nonzero Sum (easy version)](https://codeforces.com/problemset/problem/1753/A1) | `Codeforces` | `1300` | `makeNonzeroSumEasyVersion.js` | Key algorithmic application from Day 2026-11-04. |
| [Range Operation](https://codeforces.com/problemset/problem/2169/C) | `Codeforces` | `1300` | `rangeOperation.js` | Key algorithmic application from Day 2026-11-04. |
| [Create The Teams](https://codeforces.com/problemset/problem/1380/C) | `Codeforces` | `1400` | `createTheTeams.js` | Key algorithmic application from Day 2026-11-04. |
| [Letter](https://codeforces.com/problemset/problem/180/C) | `Codeforces` | `1400` | `letter.js` | Key algorithmic application from Day 2026-11-04. |
| [2^Sort](https://codeforces.com/problemset/problem/1692/G) | `Codeforces` | `1400` | `p2Sort.js` | Key algorithmic application from Day 2026-11-04. |
| [Triple Operations](https://codeforces.com/problemset/problem/1999/E) | `Codeforces` | `1300` | `tripleOperations.js` | Key algorithmic application from Day 2026-11-05. |
| [Cut Ribbon](https://codeforces.com/problemset/problem/189/A) | `Codeforces` | `1300` | `cutRibbon.js` | Key algorithmic application from Day 2026-11-05. |
| [Brand New Tatar TV Show](https://codeforces.com/problemset/problem/2236/D) | `Codeforces` | `1300` | `brandNewTatarTVShow.js` | Key algorithmic application from Day 2026-11-05. |
| [Ice and Fire](https://codeforces.com/problemset/problem/1774/C) | `Codeforces` | `1300` | `iceAndFire.js` | Key algorithmic application from Day 2026-11-05. |
| [Hamiltonian Wall](https://codeforces.com/problemset/problem/1766/C) | `Codeforces` | `1300` | `hamiltonianWall.js` | Key algorithmic application from Day 2026-11-05. |
| [Basketball Exercise](https://codeforces.com/problemset/problem/1195/C) | `Codeforces` | `1400` | `basketballExercise.js` | Key algorithmic application from Day 2026-11-05. |
| [Bouncing Ball](https://codeforces.com/problemset/problem/1415/C) | `Codeforces` | `1400` | `bouncingBall.js` | Key algorithmic application from Day 2026-11-05. |
| [Approximating a Constant Range](https://codeforces.com/problemset/problem/602/B) | `Codeforces` | `1400` | `approximatingAConstantRange.js` | Key algorithmic application from Day 2026-11-06. |
| [Copil Copac Draws Trees](https://codeforces.com/problemset/problem/1830/A) | `Codeforces` | `1400` | `copilCopacDrawsTrees.js` | Key algorithmic application from Day 2026-11-06. |
| [Sakurako's Field Trip](https://codeforces.com/problemset/problem/2033/C) | `Codeforces` | `1400` | `sakurakoSFieldTrip.js` | Key algorithmic application from Day 2026-11-06. |
| [Serval and Toxel's Arrays](https://codeforces.com/problemset/problem/1789/C) | `Codeforces` | `1500` | `servalAndToxelSArrays.js` | Key algorithmic application from Day 2026-11-06. |
| [Two Substrings](https://codeforces.com/problemset/problem/550/A) | `Codeforces` | `1500` | `twoSubstrings.js` | Key algorithmic application from Day 2026-11-06. |
| [Hossam and Friends](https://codeforces.com/problemset/problem/1771/B) | `Codeforces` | `1400` | `hossamAndFriends.js` | Key algorithmic application from Day 2026-11-06. |
| [Increase Subarray Sums](https://codeforces.com/problemset/problem/1644/C) | `Codeforces` | `1400` | `increaseSubarraySums.js` | Key algorithmic application from Day 2026-11-06. |
| [Cut 'em all!](https://codeforces.com/problemset/problem/982/C) | `Codeforces` | `1500` | `cutEmAll.js` | Key algorithmic application from Day 2026-11-06. |
| [The Fair Nut and String](https://codeforces.com/problemset/problem/1084/C) | `Codeforces` | `1500` | `theFairNutAndString.js` | Key algorithmic application from Day 2026-11-06. |
| [Bewitching Stargazer](https://codeforces.com/problemset/problem/2053/C) | `Codeforces` | `1500` | `bewitchingStargazer.js` | Key algorithmic application from Day 2026-11-06. |
| [Mortal Kombat Tower](https://codeforces.com/problemset/problem/1418/C) | `Codeforces` | `1500` | `mortalKombatTower.js` | Key algorithmic application from Day 2026-11-06. |
| [Three Strings](https://codeforces.com/problemset/problem/2050/E) | `Codeforces` | `1500` | `threeStrings.js` | Key algorithmic application from Day 2026-11-08. |
| [Backspace](https://codeforces.com/problemset/problem/1553/D) | `Codeforces` | `1500` | `backspace.js` | Key algorithmic application from Day 2026-11-08. |
| [Mr. Kitayuta's Colorful Graph](https://codeforces.com/problemset/problem/505/B) | `Codeforces` | `1400` | `mrKitayutaSColorfulGraph.js` | Key algorithmic application from Day 2026-11-09. |
| [Orac and Models](https://codeforces.com/problemset/problem/1350/B) | `Codeforces` | `1400` | `oracAndModels.js` | Key algorithmic application from Day 2026-11-09. |
| [Qpwoeirut And The City](https://codeforces.com/problemset/problem/1706/C) | `Codeforces` | `1400` | `qpwoeirutAndTheCity.js` | Key algorithmic application from Day 2026-11-09. |
| [String Equality](https://codeforces.com/problemset/problem/1451/C) | `Codeforces` | `1400` | `stringEquality.js` | Key algorithmic application from Day 2026-11-09. |
| [Diluc and Kaeya](https://codeforces.com/problemset/problem/1536/C) | `Codeforces` | `1500` | `dilucAndKaeya.js` | Key algorithmic application from Day 2026-11-09. |
| [Complex Market Analysis](https://codeforces.com/problemset/problem/1609/C) | `Codeforces` | `1400` | `complexMarketAnalysis.js` | Key algorithmic application from Day 2026-11-10. |
| [Nastya and Potions](https://codeforces.com/problemset/problem/1851/E) | `Codeforces` | `1500` | `nastyaAndPotions.js` | Key algorithmic application from Day 2026-11-10. |
| [Vlad and an Odd Ordering](https://codeforces.com/problemset/problem/1926/E) | `Codeforces` | `1500` | `vladAndAnOddOrdering.js` | Key algorithmic application from Day 2026-11-10. |
| [Remove One Element](https://codeforces.com/problemset/problem/1272/D) | `Codeforces` | `1500` | `removeOneElement.js` | Key algorithmic application from Day 2026-11-10. |
| [Given Length and Sum of Digits...](https://codeforces.com/problemset/problem/489/C) | `Codeforces` | `1400` | `givenLengthAndSumOfDigits.js` | Key algorithmic application from Day 2026-11-11. |
| [Mashmokh and ACM](https://codeforces.com/problemset/problem/414/B) | `Codeforces` | `1400` | `mashmokhAndACM.js` | Key algorithmic application from Day 2026-11-11. |
| [Woodcutters](https://codeforces.com/problemset/problem/545/C) | `Codeforces` | `1500` | `woodcutters.js` | Key algorithmic application from Day 2026-11-11. |
| [Factorials and Powers of Two](https://codeforces.com/problemset/problem/1646/C) | `Codeforces` | `1500` | `factorialsAndPowersOfTwo.js` | Key algorithmic application from Day 2026-11-11. |
| [Make Nonzero Sum (hard version)](https://codeforces.com/problemset/problem/1753/A2) | `Codeforces` | `1500` | `makeNonzeroSumHardVersion.js` | Key algorithmic application from Day 2026-11-11. |
| [a-Good String](https://codeforces.com/problemset/problem/1385/D) | `Codeforces` | `1500` | `aGoodString.js` | Key algorithmic application from Day 2026-11-11. |
| [Mirror Swaps](https://www.codechef.com) | `CodeChef` | `-` | `mirrorSwaps.js` | Each mirror pair $(i, N+1-i)$ is a binary state; edges $(i,i+1)$ and its mirror depend only on pairs $i, i+1$ (centre edges are swap-invariant), so a 2-state chain DP on (max sum, min swaps) lexicographically. |
| [File List](https://codeforces.com/problemset/problem/174/B) | `Codeforces` | `1400` | `fileList.js` | Key algorithmic application from Day 2026-11-12. |
| [Vampiric Powers, anyone?](https://codeforces.com/problemset/problem/1847/C) | `Codeforces` | `1400` | `vampiricPowersAnyone.js` | Key algorithmic application from Day 2026-11-12. |
| [Gas Pipeline](https://codeforces.com/problemset/problem/1207/C) | `Codeforces` | `1500` | `gasPipeline.js` | Key algorithmic application from Day 2026-11-12. |
| [Air Conditioners](https://codeforces.com/problemset/problem/1547/E) | `Codeforces` | `1500` | `airConditioners.js` | Key algorithmic application from Day 2026-11-12. |
| [Bishwock](https://codeforces.com/problemset/problem/991/D) | `Codeforces` | `1500` | `bishwock.js` | Key algorithmic application from Day 2026-11-13. |
| [Alternating String](https://codeforces.com/problemset/problem/2008/E) | `Codeforces` | `1500` | `alternatingString.js` | Key algorithmic application from Day 2026-11-13. |
| [The Humanoid](https://codeforces.com/problemset/problem/1759/E) | `Codeforces` | `1500` | `theHumanoid.js` | Key algorithmic application from Day 2026-11-13. |
| [Bargaining Table](https://codeforces.com/problemset/problem/22/B) | `Codeforces` | `1500` | `bargainingTable.js` | Key algorithmic application from Day 2026-11-13. |
| [Longtail Hedgehog](https://codeforces.com/problemset/problem/615/B) | `Codeforces` | `1600` | `longtailHedgehog.js` | Key algorithmic application from Day 2026-11-13. |
| [Maximum Sum on Even Positions](https://codeforces.com/problemset/problem/1373/D) | `Codeforces` | `1600` | `maximumSumOnEvenPositions.js` | Key algorithmic application from Day 2026-11-13. |
| [Zero-Sum Prefixes](https://codeforces.com/problemset/problem/1748/C) | `Codeforces` | `1600` | `zeroSumPrefixes.js` | Key algorithmic application from Day 2026-11-13. |
| [Add One](https://codeforces.com/problemset/problem/1513/C) | `Codeforces` | `1600` | `addOne.js` | Key algorithmic application from Day 2026-11-13. |
| [Vasya and Multisets](https://codeforces.com/problemset/problem/1051/C) | `Codeforces` | `1500` | `vasyaAndMultisets.js` | Key algorithmic application from Day 2026-11-14. |
| [The Walkway](https://codeforces.com/problemset/problem/1858/B) | `Codeforces` | `1500` | `theWalkway.js` | Key algorithmic application from Day 2026-11-14. |
| [Playoff](https://codeforces.com/problemset/problem/1767/D) | `Codeforces` | `1500` | `playoff.js` | Key algorithmic application from Day 2026-11-14. |
| [Qualification Rounds](https://codeforces.com/problemset/problem/868/C) | `Codeforces` | `1500` | `qualificationRounds.js` | Key algorithmic application from Day 2026-11-14. |
| [Living Sequence](https://codeforces.com/problemset/problem/1811/E) | `Codeforces` | `1500` | `livingSequence.js` | Key algorithmic application from Day 2026-11-14. |
| [New Year and Domino](https://codeforces.com/problemset/problem/611/C) | `Codeforces` | `1500` | `newYearAndDomino.js` | Key algorithmic application from Day 2026-11-14. |
| [Good Sequences](https://codeforces.com/problemset/problem/264/B) | `Codeforces` | `1500` | `goodSequences.js` | Key algorithmic application from Day 2026-11-14. |
| [Tenzing and Balls](https://codeforces.com/problemset/problem/1842/C) | `Codeforces` | `1500` | `tenzingAndBalls.js` | Key algorithmic application from Day 2026-11-14. |
| [Cow and Message](https://codeforces.com/problemset/problem/1307/C) | `Codeforces` | `1500` | `cowAndMessage.js` | Key algorithmic application from Day 2026-11-14. |
| [Colorful Bricks](https://codeforces.com/problemset/problem/1081/C) | `Codeforces` | `1500` | `colorfulBricks.js` | Key algorithmic application from Day 2026-11-14. |
| [Kyoya and Colored Balls](https://codeforces.com/problemset/problem/553/A) | `Codeforces` | `1500` | `kyoyaAndColoredBalls.js` | Key algorithmic application from Day 2026-11-14. |
| [Boredom](https://codeforces.com/problemset/problem/455/A) | `Codeforces` | `1500` | `boredom.js` | Key algorithmic application from Day 2026-11-14. |
| [Elimination](https://codeforces.com/problemset/problem/417/A) | `Codeforces` | `1500` | `elimination.js` | Key algorithmic application from Day 2026-11-14. |
| [Parsa's Humongous Tree](https://codeforces.com/problemset/problem/1528/A) | `Codeforces` | `1600` | `parsaSHumongousTree.js` | Key algorithmic application from Day 2026-11-14. |
| [Color Stripe](https://codeforces.com/problemset/problem/219/C) | `Codeforces` | `1600` | `colorStripe.js` | Key algorithmic application from Day 2026-11-14. |
| [Interesting Function](https://codeforces.com/problemset/problem/1538/F) | `Codeforces` | `1500` | `interestingFunction.js` | Key algorithmic application from Day 2026-11-15. |
| [Potions (Easy Version)](https://codeforces.com/problemset/problem/1526/C1) | `Codeforces` | `1500` | `potionsEasyVersion.js` | Key algorithmic application from Day 2026-11-15. |
| [Skyscrapers (easy version)](https://codeforces.com/problemset/problem/1313/C1) | `Codeforces` | `1500` | `skyscrapersEasyVersion.js` | Key algorithmic application from Day 2026-11-15. |
| [Even Number Addicts](https://codeforces.com/problemset/problem/1738/C) | `Codeforces` | `1500` | `evenNumberAddicts.js` | Key algorithmic application from Day 2026-11-15. |
| [Maximum Sum of Products](https://codeforces.com/problemset/problem/1519/D) | `Codeforces` | `1600` | `maximumSumOfProducts.js` | Key algorithmic application from Day 2026-11-15. |
| [Discrete Acceleration](https://codeforces.com/problemset/problem/1408/C) | `Codeforces` | `1500` | `discreteAcceleration.js` | Key algorithmic application from Day 2026-11-15. |
| [Little Elephant and Interval](https://codeforces.com/problemset/problem/204/A) | `Codeforces` | `1500` | `littleElephantAndInterval.js` | Key algorithmic application from Day 2026-11-15. |
| [Ayoub and Lost Array](https://codeforces.com/problemset/problem/1105/C) | `Codeforces` | `1500` | `ayoubAndLostArray.js` | Key algorithmic application from Day 2026-11-15. |
| [Dasha and Password](https://codeforces.com/problemset/problem/761/C) | `Codeforces` | `1500` | `dashaAndPassword.js` | Key algorithmic application from Day 2026-11-15. |
| [Marvolo Gaunt's Ring](https://codeforces.com/problemset/problem/855/B) | `Codeforces` | `1500` | `marvoloGauntSRing.js` | Key algorithmic application from Day 2026-11-15. |
| [Sums on Segments](https://codeforces.com/problemset/problem/2043/C) | `Codeforces` | `1600` | `sumsOnSegments.js` | Key algorithmic application from Day 2026-11-15. |
| [Arpa's weak amphitheater and Mehrdad's valuable Hoses](https://codeforces.com/problemset/problem/741/B) | `Codeforces` | `1600` | `arpaSWeakAmphitheaterAndMehrdadSValuableHoses.js` | Key algorithmic application from Day 2026-11-15. |
| [Restaurant](https://codeforces.com/problemset/problem/597/B) | `Codeforces` | `1600` | `restaurant.js` | Key algorithmic application from Day 2026-11-15. |
| [Array Walk](https://codeforces.com/problemset/problem/1389/B) | `Codeforces` | `1600` | `arrayWalk.js` | Key algorithmic application from Day 2026-11-15. |
| [Sequence and Swaps](https://codeforces.com/problemset/problem/1455/D) | `Codeforces` | `1600` | `sequenceAndSwaps.js` | Key algorithmic application from Day 2026-11-15. |
| [Cinema Cashier](https://codeforces.com/problemset/problem/10/B) | `Codeforces` | `1500` | `cinemaCashier.js` | Key algorithmic application from Day 2026-11-16. |
| [Maximum Submatrix 2](https://codeforces.com/problemset/problem/375/B) | `Codeforces` | `1600` | `maximumSubmatrix2.js` | Key algorithmic application from Day 2026-11-16. |
| [Almost Identity Permutations](https://codeforces.com/problemset/problem/888/D) | `Codeforces` | `1600` | `almostIdentityPermutations.js` | Key algorithmic application from Day 2026-11-16. |
| [Divisibility by Eight](https://codeforces.com/problemset/problem/550/C) | `Codeforces` | `1500` | `divisibilityByEight.js` | Key algorithmic application from Day 2026-11-17. |
| [Divan and bitwise operations](https://codeforces.com/problemset/problem/1614/C) | `Codeforces` | `1500` | `divanAndBitwiseOperations.js` | Key algorithmic application from Day 2026-11-17. |
| [Job Interview](https://codeforces.com/problemset/problem/1976/C) | `Codeforces` | `1600` | `jobInterview.js` | Key algorithmic application from Day 2026-11-17. |
| [K for the Price of One (Hard Version)](https://codeforces.com/problemset/problem/1282/B2) | `Codeforces` | `1600` | `kForThePriceOfOneHardVersion.js` | Key algorithmic application from Day 2026-11-17. |
| [Pipes](https://codeforces.com/problemset/problem/1234/C) | `Codeforces` | `1500` | `pipes.js` | Key algorithmic application from Day 2026-11-18. |
| [Vasya and String](https://codeforces.com/problemset/problem/676/C) | `Codeforces` | `1500` | `vasyaAndString.js` | Key algorithmic application from Day 2026-11-18. |
| [Line Empire](https://codeforces.com/problemset/problem/1659/C) | `Codeforces` | `1500` | `lineEmpire.js` | Key algorithmic application from Day 2026-11-18. |
| [Good Key, Bad Key](https://codeforces.com/problemset/problem/1703/G) | `Codeforces` | `1600` | `goodKeyBadKey.js` | Key algorithmic application from Day 2026-11-18. |
| [Hard Process](https://codeforces.com/problemset/problem/660/C) | `Codeforces` | `1600` | `hardProcess.js` | Key algorithmic application from Day 2026-11-18. |
| [Two Arrays](https://codeforces.com/problemset/problem/1288/C) | `Codeforces` | `1600` | `twoArrays.js` | Key algorithmic application from Day 2026-11-18. |
| [Polycarp and Div 3](https://codeforces.com/problemset/problem/1005/D) | `Codeforces` | `1500` | `polycarpAndDiv3.js` | Key algorithmic application from Day 2026-11-19. |
| [Maximum width](https://codeforces.com/problemset/problem/1492/C) | `Codeforces` | `1500` | `maximumWidth.js` | Key algorithmic application from Day 2026-11-19. |
| [Beautiful Sequence](https://codeforces.com/problemset/problem/2069/C) | `Codeforces` | `1500` | `beautifulSequence.js` | Key algorithmic application from Day 2026-11-19. |
| [Working out](https://codeforces.com/problemset/problem/429/B) | `Codeforces` | `1600` | `workingOut.js` | Key algorithmic application from Day 2026-11-20. |
| [Erase and Extend (Easy Version)](https://codeforces.com/problemset/problem/1537/E1) | `Codeforces` | `1600` | `eraseAndExtendEasyVersion.js` | Key algorithmic application from Day 2026-11-20. |
| [Anton and Making Potions](https://codeforces.com/problemset/problem/734/C) | `Codeforces` | `1600` | `antonAndMakingPotions.js` | Key algorithmic application from Day 2026-11-20. |
| [Planar Reflections](https://codeforces.com/problemset/problem/1498/C) | `Codeforces` | `1600` | `planarReflections.js` | Key algorithmic application from Day 2026-11-20. |
| [Timofey and a tree](https://codeforces.com/problemset/problem/763/A) | `Codeforces` | `1600` | `timofeyAndATree.js` | Key algorithmic application from Day 2026-11-20. |
| [Tree Jumps](https://codeforces.com/problemset/problem/2070/D) | `Codeforces` | `1600` | `treeJumps.js` | Key algorithmic application from Day 2026-11-21. |
| [Hits Different](https://codeforces.com/problemset/problem/1829/G) | `Codeforces` | `1600` | `hitsDifferent.js` | Key algorithmic application from Day 2026-11-22. |
| [Linova and Kingdom](https://codeforces.com/problemset/problem/1336/A) | `Codeforces` | `1600` | `linovaAndKingdom.js` | Key algorithmic application from Day 2026-11-22. |
| [Carrying Conundrum](https://codeforces.com/problemset/problem/1567/C) | `Codeforces` | `1600` | `carryingConundrum.js` | Key algorithmic application from Day 2026-11-22. |
| [Standard Free2play](https://codeforces.com/problemset/problem/1238/C) | `Codeforces` | `1600` | `standardFree2play.js` | Key algorithmic application from Day 2026-11-22. |
| [Serval and The Formula](https://codeforces.com/problemset/problem/2085/C) | `Codeforces` | `1600` | `servalAndTheFormula.js` | Key algorithmic application from Day 2026-11-22. |
| [Infected Tree](https://codeforces.com/problemset/problem/1689/C) | `Codeforces` | `1600` | `infectedTree.js` | Key algorithmic application from Day 2026-11-22. |
| [Round Table Knights](https://codeforces.com/problemset/problem/71/C) | `Codeforces` | `1600` | `roundTableKnights.js` | Key algorithmic application from Day 2026-11-22. |
| [Rudolf and k Bridges](https://codeforces.com/problemset/problem/1941/E) | `Codeforces` | `1600` | `rudolfAndKBridges.js` | Key algorithmic application from Day 2026-11-23. |
| [Strange Test](https://codeforces.com/problemset/problem/1632/C) | `Codeforces` | `1600` | `strangeTest.js` | Key algorithmic application from Day 2026-11-23. |
| [How Does the Rook Move?](https://codeforces.com/problemset/problem/1957/C) | `Codeforces` | `1600` | `howDoesTheRookMove.js` | Key algorithmic application from Day 2026-11-23. |
| [Really Big Numbers](https://codeforces.com/problemset/problem/817/C) | `Codeforces` | `1600` | `reallyBigNumbers.js` | Key algorithmic application from Day 2026-11-24. |
| [Remove the Bracket](https://codeforces.com/problemset/problem/1787/C) | `Codeforces` | `1600` | `removeTheBracket.js` | Key algorithmic application from Day 2026-11-24. |
| [EKG](https://codeforces.com/problemset/problem/316/B2) | `Codeforces` | `1600` | `eKG.js` | Key algorithmic application from Day 2026-11-24. |
| [Tree Cutting](https://codeforces.com/problemset/problem/1946/C) | `Codeforces` | `1600` | `treeCutting.js` | Key algorithmic application from Day 2026-11-24. |
| [Kevin and Puzzle](https://codeforces.com/problemset/problem/2061/C) | `Codeforces` | `1600` | `kevinAndPuzzle.js` | Key algorithmic application from Day 2026-11-24. |
| [Color with Occurrences](https://codeforces.com/problemset/problem/1714/D) | `Codeforces` | `1600` | `colorWithOccurrences.js` | Key algorithmic application from Day 2026-11-25. |
| [DZY Loves Sequences](https://codeforces.com/problemset/problem/446/A) | `Codeforces` | `1600` | `dZYLovesSequences.js` | Key algorithmic application from Day 2026-11-25. |
| [Basketball Team](https://codeforces.com/problemset/problem/107/B) | `Codeforces` | `1600` | `basketballTeam.js` | Key algorithmic application from Day 2026-11-25. |
| [Long Path](https://codeforces.com/problemset/problem/407/B) | `Codeforces` | `1600` | `longPath.js` | Key algorithmic application from Day 2026-11-25. |
| [Sasha and a Bit of Relax](https://codeforces.com/problemset/problem/1109/A) | `Codeforces` | `1600` | `sashaAndABitOfRelax.js` | Key algorithmic application from Day 2026-11-25. |
| [Alyona and Spreadsheet](https://codeforces.com/problemset/problem/777/C) | `Codeforces` | `1600` | `alyonaAndSpreadsheet.js` | Key algorithmic application from Day 2026-11-26. |
| [Decorate Apple Tree](https://codeforces.com/problemset/problem/1056/D) | `Codeforces` | `1600` | `decorateAppleTree.js` | Key algorithmic application from Day 2026-11-26. |
| [Travel Card](https://codeforces.com/problemset/problem/756/B) | `Codeforces` | `1600` | `travelCard.js` | Key algorithmic application from Day 2026-11-26. |
| [An impassioned circulation of affection](https://codeforces.com/problemset/problem/814/C) | `Codeforces` | `1600` | `anImpassionedCirculationOfAffection.js` | Key algorithmic application from Day 2026-11-26. |
| [Boboniu and Bit Operations](https://codeforces.com/problemset/problem/1395/C) | `Codeforces` | `1600` | `boboniuAndBitOperations.js` | Key algorithmic application from Day 2026-11-26. |
| [Sagheer, the Hausmeister](https://codeforces.com/problemset/problem/812/B) | `Codeforces` | `1600` | `sagheerTheHausmeister.js` | Key algorithmic application from Day 2026-11-26. |
| [Another Problem on Strings](https://codeforces.com/problemset/problem/165/C) | `Codeforces` | `1600` | `anotherProblemOnStrings.js` | Key algorithmic application from Day 2026-11-26. |
| [RGB Substring (hard version)](https://codeforces.com/problemset/problem/1196/D2) | `Codeforces` | `1600` | `rGBSubstringHardVersion.js` | Key algorithmic application from Day 2026-11-26. |
| [Hungry Games](https://codeforces.com/problemset/problem/1994/C) | `Codeforces` | `1600` | `hungryGames.js` | Key algorithmic application from Day 2026-11-26. |
| [Multicolored Marbles](https://codeforces.com/problemset/problem/209/A) | `Codeforces` | `1600` | `multicoloredMarbles.js` | Key algorithmic application from Day 2026-11-26. |
| [Alternative Thinking](https://codeforces.com/problemset/problem/603/A) | `Codeforces` | `1600` | `alternativeThinking.js` | Key algorithmic application from Day 2026-11-27. |
| [Sending a Sequence Over the Network](https://codeforces.com/problemset/problem/1741/E) | `Codeforces` | `1600` | `sendingASequenceOverTheNetwork.js` | Key algorithmic application from Day 2026-11-27. |
| [Bear and Blocks](https://codeforces.com/problemset/problem/573/B) | `Codeforces` | `1600` | `bearAndBlocks.js` | Key algorithmic application from Day 2026-11-27. |
| [Good Subarrays](https://codeforces.com/problemset/problem/1398/C) | `Codeforces` | `1600` | `goodSubarrays.js` | Key algorithmic application from Day 2026-11-27. |
| [Party Lemonade](https://codeforces.com/problemset/problem/913/C) | `Codeforces` | `1600` | `partyLemonade.js` | Key algorithmic application from Day 2026-11-27. |
| [Hard problem](https://codeforces.com/problemset/problem/706/C) | `Codeforces` | `1600` | `hardProblem.js` | Key algorithmic application from Day 2026-11-27. |
| [Tokitsukaze and Strange Inequality](https://codeforces.com/problemset/problem/1677/A) | `Codeforces` | `1600` | `tokitsukazeAndStrangeInequality.js` | Key algorithmic application from Day 2026-11-27. |

---

## 7. Common Pitfalls & Anti-Patterns
- **Uninitialized DP Values:** For minimization DP, initializing with `Number.MAX_SAFE_INTEGER` can cause integer overflow if you add to it. Initialize with `1e9` or check for sentinel before adding.
