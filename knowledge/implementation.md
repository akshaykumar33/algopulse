# Implementation & Simulation — Algorithmic Patterns & Knowledge Base

## 1. Core Principles & Mental Model
Implementation problems require translating problem specifications directly into precise, bug-free code without requiring deep mathematical insight. The challenge lies in managing state, handling boundary and corner cases, and avoiding off-by-one errors.

### Pillars of Robust Implementation:
1. **Model the State Clearly:** Use descriptive variable names and decoupled helper functions.
2. **Direction Vectors for 2D Grids:** Represent steps using relative delta arrays (`dx`, `dy`) rather than long chains of `if/else`.
3. **Boundary Invariants:** Check array indices before accessing (`0 <= r < R && 0 <= c < C`).
4. **Coordinate Normalization:** Standardize 1-based contest inputs to 0-based indices at the boundary of your program.

---

## 2. Recognition Signals ("When you see X, think Y")
- **"Follow directions / Navigate grid (U, D, L, R)":** $\implies$ Coordinate state $(x, y)$ tracking with direction mapping.
- **"Simulate $K$ rounds of a game / process":** $\implies$ Discrete loop simulation with state updates.
- **"Reorder or rearrange array based on given rules":** $\implies$ In-place swap or auxiliary array assignment.
- **"Format / decode output string":** $\implies$ String template construction.

---

## 3. Key Mathematical Theorems & Grid Invariants
1. **Grid Movement Vectors:**
   For standard Cartesian or Matrix movements:
   ```javascript
   // 4-directional orthogonal steps (Up, Right, Down, Left)
   const DR = [-1, 0, 1, 0];
   const DC = [0, 1, 0, -1];
   ```
2. **Manhattan Distance Metric:**
   $$d((x_1, y_1), (x_2, y_2)) = |x_1 - x_2| + |y_1 - y_2|$$

---

## 4. Node.js / JavaScript Implementation Patterns & Traps

### Pattern 1: Coordinate State Navigation
```javascript
// Example: Following Directions (Codeforces 1791B)
function passesTarget(n, moves, targetX, targetY) {
  let x = 0, y = 0;
  for (let i = 0; i < n; i++) {
    const m = moves[i];
    if (m === 'U') y++;
    else if (m === 'D') y--;
    else if (m === 'R') x++;
    else if (m === 'L') x--;

    if (x === targetX && y === targetY) {
      return true;
    }
  }
  return false;
}
```

### Pattern 2: Fast Buffer Reading & Line Parsing
```javascript
const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;

  let lineIdx = 0;
  const t = parseInt(input[lineIdx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const [n, k] = input[lineIdx++].split(' ').map(Number);
    // process test case...
  }

  console.log(out.join('\n'));
}
```

### Critical Traps:
- **String Splitting on Large Multi-Test Cases:** In input files with hundreds of thousands of numbers, `split(/\s+/)` creates millions of small strings in memory, triggering heavy V8 garbage collection pauses. For large inputs, use an index-based scanner or regex tokenizer.
- **0-Index vs 1-Index Off-by-One:** Contest problems frequently use 1-based indexing for vertices and array elements. Convert immediately upon input reading: `const u = parseInt(parts[0], 10) - 1`.

---

## 5. Sub-Patterns & Archetypes
1. **Simulation:** Mirroring real-world steps until a target or cycle is reached.
2. **Matrix Transposition & Rotations:** Swapping indices: $90^\circ$ clockwise rotation maps $(r, c) \mapsto (c, N - 1 - r)$.
3. **State Machine Parsing:** Transitioning between parser states (e.g. inside tag vs outside tag).

---

## 6. Solved Problems Catalog & Takeaways

| Problem | Platform | Rating | Solution File | Core Insight / Takeaway |
|---|---|---|---|---|
| [Following Directions](https://codeforces.com/problemset/problem/1791/B) | `Codeforces` | `800` | `followingDirections.js` | Track $(x, y)$ coordinates step-by-step; check if $(1, 1)$ is visited. |
| [Bit++](https://codeforces.com/problemset/problem/282/A) | `Codeforces` | `800` | `bitPlusPlus.js` | Check for `++` or `--` substring to modify accumulator. |
| [Next Round](https://codeforces.com/problemset/problem/158/A) | `Codeforces` | `800` | `nextRound.js` | Count participants with score $\ge score[k-1]$ and score $> 0$. |

---
| [Petya and Strings](https://codeforces.com/problemset/problem/112/A) | `undefined` | `800` | `petyaAndStrings.js` | Key algorithmic application from Day 2026-09-25. |
| [Beautiful Matrix](https://codeforces.com/problemset/problem/263/A) | `undefined` | `800` | `beautifulMatrix.js` | Key algorithmic application from Day 2026-09-25. |
| [Helpful Maths](https://codeforces.com/problemset/problem/339/A) | `undefined` | `800` | `helpfulMaths.js` | Key algorithmic application from Day 2026-09-25. |
| [Word Capitalization](https://codeforces.com/problemset/problem/281/A) | `undefined` | `800` | `wordCapitalization.js` | Key algorithmic application from Day 2026-09-25. |
| [Anton and Danik](https://codeforces.com/problemset/problem/734/A) | `undefined` | `800` | `antonAndDanik.js` | Key algorithmic application from Day 2026-09-26. |
| [Tram](https://codeforces.com/problemset/problem/116/A) | `undefined` | `800` | `tram.js` | Key algorithmic application from Day 2026-09-26. |
| [Stones on the Table](https://codeforces.com/problemset/problem/266/A) | `undefined` | `800` | `stonesOnTheTable.js` | Key algorithmic application from Day 2026-09-26. |
| [Wrong Subtraction](https://codeforces.com/problemset/problem/977/A) | `undefined` | `800` | `wrongSubtraction.js` | Key algorithmic application from Day 2026-09-26. |
| [Normal Problem](https://codeforces.com/problemset/problem/2044/B) | `undefined` | `800` | `normalProblem.js` | Key algorithmic application from Day 2026-09-26. |
| [Fox And Snake](https://codeforces.com/problemset/problem/510/A) | `undefined` | `800` | `foxAndSnake.js` | Key algorithmic application from Day 2026-09-26. |
| [Blank Space](https://codeforces.com/problemset/problem/1829/B) | `undefined` | `800` | `blankSpace.js` | Key algorithmic application from Day 2026-09-27. |
| [Maximum in Table](https://codeforces.com/problemset/problem/509/A) | `undefined` | `800` | `maximumInTable.js` | Key algorithmic application from Day 2026-09-27. |
| [Translation](https://codeforces.com/problemset/problem/41/A) | `undefined` | `800` | `translation.js` | Key algorithmic application from Day 2026-09-27. |
| [Vlad and the Best of Five](https://codeforces.com/problemset/problem/1926/A) | `undefined` | `800` | `vladAndTheBestOfFive.js` | Key algorithmic application from Day 2026-09-27. |
| [A+B?](https://codeforces.com/problemset/problem/1772/A) | `undefined` | `800` | `aPlusB.js` | Key algorithmic application from Day 2026-09-27. |
| [Vanya and Cubes](https://codeforces.com/problemset/problem/492/A) | `Codeforces` | `800` | `vanyaAndCubes.js` | Key algorithmic application from Day 2026-09-28. |
| [Sum of Round Numbers](https://codeforces.com/problemset/problem/1352/A) | `Codeforces` | `800` | `sumOfRoundNumbers.js` | Key algorithmic application from Day 2026-09-28. |
| [One and Two](https://codeforces.com/problemset/problem/1788/A) | `Codeforces` | `800` | `oneAndTwo.js` | Key algorithmic application from Day 2026-09-28. |
| [Vus the Cossack and a Contest](https://codeforces.com/problemset/problem/1186/A) | `Codeforces` | `800` | `vusTheCossackAndAContest.js` | Key algorithmic application from Day 2026-09-28. |
| [Sereja and Dima](https://codeforces.com/problemset/problem/381/A) | `Codeforces` | `800` | `serejaAndDima.js` | Key algorithmic application from Day 2026-09-28. |
| [Bear and Big Brother](https://codeforces.com/problemset/problem/791/A) | `Codeforces` | `800` | `bearAndBigBrother.js` | Key algorithmic application from Day 2026-09-28. |
| [Pascal's Triangle II](https://leetcode.com/problems/pascals-triangle-ii/) | `LeetCode` | `Easy` | `pascalSTriangleII.js` | Key algorithmic application from Day 2026-09-28. |
| [Valid Perfect Square](https://leetcode.com/problems/valid-perfect-square/) | `LeetCode` | `Easy` | `validPerfectSquare.js` | Key algorithmic application from Day 2026-09-28. |
| [Detect Capital](https://leetcode.com/problems/detect-capital/) | `LeetCode` | `Easy` | `detectCapital.js` | Key algorithmic application from Day 2026-09-28. |
| [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/) | `LeetCode` | `Easy` | `mergeTwoSortedLists.js` | Key algorithmic application from Day 2026-09-28. |
| [Set Mismatch](https://leetcode.com/problems/set-mismatch/) | `LeetCode` | `Easy` | `setMismatch.js` | Key algorithmic application from Day 2026-09-28. |
| [Average Selling Price](https://leetcode.com/problems/average-selling-price/) | `LeetCode` | `Easy` | `averageSellingPrice.js` | Key algorithmic application from Day 2026-09-28. |
| [Remove Duplicates from Sorted List](https://leetcode.com/problems/remove-duplicates-from-sorted-list/) | `LeetCode` | `Easy` | `removeDuplicatesFromSortedList.js` | Key algorithmic application from Day 2026-09-28. |
| [Percentage of Users Attended a Contest](https://leetcode.com/problems/percentage-of-users-attended-a-contest/) | `LeetCode` | `Easy` | `percentageOfUsersAttendedAContest.js` | Key algorithmic application from Day 2026-09-28. |
| [Power of Four](https://leetcode.com/problems/power-of-four/) | `LeetCode` | `Easy` | `powerOfFour.js` | Key algorithmic application from Day 2026-09-28. |
| [Project Employees I](https://leetcode.com/problems/project-employees-i/) | `LeetCode` | `Easy` | `projectEmployeesI.js` | Key algorithmic application from Day 2026-09-28. |
| [Cars and Bikes](https://www.codechef.com/problems/TYRES) | `CodeChef` | `809` | `carsAndBikes.js` | Key algorithmic application from Day 2026-09-28. |
| [Buy 2 Get 1 Free](https://www.codechef.com/problems/SALE2) | `CodeChef` | `821` | `buy2Get1Free.js` | Key algorithmic application from Day 2026-09-28. |
| [Maximum Score](https://www.codechef.com/problems/MXSCWN) | `CodeChef` | `843` | `maximumScore.js` | Key algorithmic application from Day 2026-09-28. |
| [Circular Track](https://www.codechef.com/problems/LOOP) | `CodeChef` | `838` | `circularTrack.js` | Key algorithmic application from Day 2026-09-28. |
| [Id and Ship](https://www.codechef.com/problems/FLOW010) | `CodeChef` | `847` | `idAndShip.js` | Key algorithmic application from Day 2026-09-28. |
| [Equal Integers](https://www.codechef.com/problems/INCREAR) | `CodeChef` | `852` | `equalIntegers.js` | Key algorithmic application from Day 2026-09-28. |
| [Advitiya](https://www.codechef.com/problems/ADVITIYA) | `CodeChef` | `844` | `advitiya.js` | Key algorithmic application from Day 2026-09-28. |
| [Nearest Court](https://www.codechef.com/problems/NEARESTCOURT) | `CodeChef` | `819` | `nearestCourt.js` | Key algorithmic application from Day 2026-09-28. |
| [Mileage matters](https://www.codechef.com/problems/MILEAGE) | `CodeChef` | `831` | `mileageMatters.js` | Key algorithmic application from Day 2026-09-28. |
| [Best of N Sets](https://www.codechef.com/problems/BESTOFTENNIS) | `CodeChef` | `830` | `bestOfNSets.js` | Key algorithmic application from Day 2026-09-28. |
| [Borze](https://codeforces.com/problemset/problem/32/B) | `Codeforces` | `800` | `borze.js` | Key algorithmic application from Day 2026-09-29. |
| [Devu, the Singer and Churu, the Joker](https://codeforces.com/problemset/problem/439/A) | `Codeforces` | `900` | `devuTheSingerAndChuruTheJoker.js` | Key algorithmic application from Day 2026-09-29. |
| [Check If Two String Arrays are Equivalent](https://leetcode.com/problems/check-if-two-string-arrays-are-equivalent/) | `LeetCode` | `Easy` | `checkIfTwoStringArraysAreEquivalent.js` | Key algorithmic application from Day 2026-09-29. |
| [Symmetric Tree](https://leetcode.com/problems/symmetric-tree/) | `LeetCode` | `Easy` | `symmetricTree.js` | Key algorithmic application from Day 2026-09-29. |
| [Search in a Binary Search Tree](https://leetcode.com/problems/search-in-a-binary-search-tree/) | `LeetCode` | `Easy` | `searchInABinarySearchTree.js` | Key algorithmic application from Day 2026-09-29. |
| [Excel Sheet Column Number](https://leetcode.com/problems/excel-sheet-column-number/) | `LeetCode` | `Easy` | `excelSheetColumnNumber.js` | Key algorithmic application from Day 2026-09-29. |
| [Missing Number](https://leetcode.com/problems/missing-number/) | `LeetCode` | `Easy` | `missingNumber.js` | Key algorithmic application from Day 2026-09-29. |
| [Majority Element](https://leetcode.com/problems/majority-element/) | `LeetCode` | `Easy` | `majorityElement.js` | Key algorithmic application from Day 2026-09-29. |
| [Duplicate Emails](https://leetcode.com/problems/duplicate-emails/) | `LeetCode` | `Easy` | `duplicateEmails.js` | Key algorithmic application from Day 2026-09-29. |
| [Remove Linked List Elements](https://leetcode.com/problems/remove-linked-list-elements/) | `LeetCode` | `Easy` | `removeLinkedListElements.js` | Key algorithmic application from Day 2026-09-29. |
| [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) | `LeetCode` | `Easy` | `maximumDepthOfBinaryTree.js` | Key algorithmic application from Day 2026-09-29. |
| [Convert Sorted Array to Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/) | `LeetCode` | `Easy` | `convertSortedArrayToBinarySearchTree.js` | Key algorithmic application from Day 2026-09-29. |
| [Valid Pair](https://www.codechef.com/problems/SOCKS1) | `CodeChef` | `851` | `validPair.js` | Key algorithmic application from Day 2026-09-29. |
| [Summer Heat](https://www.codechef.com/problems/COCONUT) | `CodeChef` | `852` | `summerHeat.js` | Key algorithmic application from Day 2026-09-29. |
| [Snape and Ladder](https://www.codechef.com/problems/SNAPE) | `CodeChef` | `828` | `snapeAndLadder.js` | Key algorithmic application from Day 2026-09-29. |
| [Body Mass Index](https://www.codechef.com/problems/BMI) | `CodeChef` | `845` | `bodyMassIndex.js` | Key algorithmic application from Day 2026-09-29. |
| [Melt Gold](https://www.codechef.com/problems/MELTGOLD) | `CodeChef` | `835` | `meltGold.js` | Key algorithmic application from Day 2026-09-29. |
| [Guess the bottom face](https://www.codechef.com/problems/BOTTOM) | `CodeChef` | `815` | `guessTheBottomFace.js` | Key algorithmic application from Day 2026-09-29. |
| [Complete the credits](https://www.codechef.com/problems/CREDITS) | `CodeChef` | `809` | `completeTheCredits.js` | Key algorithmic application from Day 2026-09-29. |
| [Chess Format](https://www.codechef.com/problems/CHSFORMT) | `CodeChef` | `844` | `chessFormat.js` | Key algorithmic application from Day 2026-09-29. |
| [Sub A Add B](https://www.codechef.com/problems/SUBAADDB) | `CodeChef` | `817` | `subAAddB.js` | Key algorithmic application from Day 2026-09-29. |
| [Which Mixture](https://www.codechef.com/problems/MIXTURE) | `CodeChef` | `841` | `whichMixture.js` | Key algorithmic application from Day 2026-09-29. |
| [Plus or Minus](https://codeforces.com/problemset/problem/1807/A) | `Codeforces` | `800` | `plusOrMinus.js` | Key algorithmic application from Day 2026-09-30. |
| [Calculating Function](https://codeforces.com/problemset/problem/486/A) | `Codeforces` | `800` | `calculatingFunction.js` | Key algorithmic application from Day 2026-09-30. |
| [Medium Number](https://codeforces.com/problemset/problem/1760/A) | `Codeforces` | `800` | `mediumNumber.js` | Key algorithmic application from Day 2026-09-30. |
| [New World, New Me, New Array](https://codeforces.com/problemset/problem/2072/A) | `Codeforces` | `800` | `newWorldNewMeNewArray.js` | Key algorithmic application from Day 2026-09-30. |
| [Favorite Sequence](https://codeforces.com/problemset/problem/1462/A) | `Codeforces` | `800` | `favoriteSequence.js` | Key algorithmic application from Day 2026-09-30. |
| [Minimize Inversions](https://codeforces.com/problemset/problem/1918/B) | `Codeforces` | `900` | `minimizeInversions.js` | Key algorithmic application from Day 2026-09-30. |
| [Chess For Three](https://codeforces.com/problemset/problem/1973/A) | `Codeforces` | `900` | `chessForThree.js` | Key algorithmic application from Day 2026-09-30. |
| [Mark the Dust Sweeper](https://codeforces.com/problemset/problem/1705/B) | `Codeforces` | `900` | `markTheDustSweeper.js` | Key algorithmic application from Day 2026-09-30. |
| [Create Hello World Function](https://leetcode.com/problems/create-hello-world-function/) | `LeetCode` | `Easy` | `createHelloWorldFunction.js` | Key algorithmic application from Day 2026-09-30. |
| [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/) | `LeetCode` | `Easy` | `numberOf1Bits.js` | Key algorithmic application from Day 2026-09-30. |
| [Maximum Product of Three Numbers](https://leetcode.com/problems/maximum-product-of-three-numbers/) | `LeetCode` | `Easy` | `maximumProductOfThreeNumbers.js` | Key algorithmic application from Day 2026-09-30. |
| [Two Sum IV - Input is a BST](https://leetcode.com/problems/two-sum-iv-input-is-a-bst/) | `LeetCode` | `Easy` | `twoSumIVInputIsABST.js` | Key algorithmic application from Day 2026-09-30. |
| [Single Number](https://leetcode.com/problems/single-number/) | `LeetCode` | `Easy` | `singleNumber.js` | Key algorithmic application from Day 2026-09-30. |
| [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) | `LeetCode` | `Easy` | `bestTimeToBuyAndSellStock.js` | Key algorithmic application from Day 2026-09-30. |
| [Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/) | `LeetCode` | `Easy` | `isomorphicStrings.js` | Key algorithmic application from Day 2026-09-30. |
| [Check if the Sentence Is Pangram](https://leetcode.com/problems/check-if-the-sentence-is-pangram/) | `LeetCode` | `Easy` | `checkIfTheSentenceIsPangram.js` | Key algorithmic application from Day 2026-09-30. |
| [Biggest Single Number](https://leetcode.com/problems/biggest-single-number/) | `LeetCode` | `Easy` | `biggestSingleNumber.js` | Key algorithmic application from Day 2026-09-30. |
| [Minimum Absolute Difference](https://leetcode.com/problems/minimum-absolute-difference/) | `LeetCode` | `Easy` | `minimumAbsoluteDifference.js` | Key algorithmic application from Day 2026-09-30. |
| [The Preparations](https://www.codechef.com/problems/SUPCHEF) | `CodeChef` | `823` | `thePreparations.js` | Key algorithmic application from Day 2026-09-30. |
| [Man of the Match](https://www.codechef.com/problems/MATCH_ALK) | `CodeChef` | `825` | `manOfTheMatch.js` | Key algorithmic application from Day 2026-09-30. |
| [Chef and His Fruit Stand](https://www.codechef.com/problems/FRUITCHAAT) | `CodeChef` | `822` | `chefAndHisFruitStand.js` | Key algorithmic application from Day 2026-09-30. |
| [Wordle](https://www.codechef.com/problems/WORDLE) | `CodeChef` | `804` | `wordle.js` | Key algorithmic application from Day 2026-09-30. |
| [DNA Storage](https://www.codechef.com/problems/DNASTORAGE) | `CodeChef` | `801` | `dNAStorage.js` | Key algorithmic application from Day 2026-09-30. |
| [Make N Zero](https://www.codechef.com/problems/MAKENZERO) | `CodeChef` | `846` | `makeNZero.js` | Key algorithmic application from Day 2026-09-30. |
| [Maximum Production](https://www.codechef.com/problems/EITA) | `CodeChef` | `833` | `maximumProduction.js` | Key algorithmic application from Day 2026-09-30. |
| [FIND A and B](https://www.codechef.com/problems/FINDK3) | `CodeChef` | `802` | `fINDAAndB.js` | Key algorithmic application from Day 2026-09-30. |
| [Paper Cutting](https://www.codechef.com/problems/CUTPAPER) | `CodeChef` | `800` | `paperCutting.js` | Key algorithmic application from Day 2026-09-30. |
| [The Block Game](https://www.codechef.com/problems/PALL01) | `CodeChef` | `830` | `theBlockGame.js` | Key algorithmic application from Day 2026-09-30. |


## 7. Common Pitfalls & Anti-Patterns
- **Mutation of Iterated Arrays:** Modifying an array while iterating over it with a loop or forEach causes skipped indices.
- **Implicit Global Variables:** Forgetting `let` or `const` leaks variables to global scope, which can contaminate across multi-test case executions.
