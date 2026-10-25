# Bitwise Operations & Bitmasks — Algorithmic Patterns & Knowledge Base

## 1. Core Principles & Mental Model
Computers represent integers as binary bit strings. Bitwise operations (`&`, `|`, `^`, `~`, `<<`, `>>`) execute in a single CPU cycle. In competitive programming, bit manipulation is used for:
1. Compact representation of sets of elements (Bitmask where the $i$-th bit represents presence of element $i$).
2. XOR conservation invariants ($x \oplus x = 0$, $x \oplus 0 = x$).
3. Fast state compression in Dynamic Programming ($N \le 20 \implies 2^N \le 10^6$).

---

## 2. Recognition Signals ("When you see X, think Y")
- **"Find element that appears once while all others appear twice":** $\implies$ XOR accumulator ($A \oplus A = 0$).
- **"Check if a number is a power of two":** $\implies (n > 0) \land ((n \ \& \ (n - 1)) == 0)$.
- **"Find missing number in range $[0, n]$":** $\implies$ XOR all indices with all values.
- **Constraints: $N \le 20$ elements with subset selection":** $\implies$ Bitmask iteration from $0$ to $(1 \ll N) - 1$.
- **"Bitwise operations on independent bit positions":** $\implies$ Solve problem bit-by-bit from bit 0 to bit 30 independently.

---

## 3. Key Mathematical Theorems & Bit Identities
1. **XOR Cancellation & Commutativity:**
   $$x \oplus y = y \oplus x, \quad x \oplus (y \oplus z) = (x \oplus y) \oplus z$$
   $$x \oplus x = 0, \quad x \oplus 0 = x$$
2. **Lowest Set Bit Isolation:**
   $$\text{LSB}(x) = x \ \& \ (-x)$$
3. **Clearing Lowest Set Bit:**
   $$x \ \& \ (x - 1) \quad \text{(removes lowest 1-bit)}$$
4. **Iterating All Submasks of Mask $M$:**
   ```javascript
   for (let sub = m; sub > 0; sub = (sub - 1) & m) {
     // processes every submask in O(3^N) total across all masks
   }
   ```

---

## 4. Node.js / JavaScript Implementation Patterns & Traps

### Pattern 1: Bitmask Subset Operations
```javascript
// Test if i-th bit is set
const isSet = (mask, i) => (mask & (1 << i)) !== 0;

// Set i-th bit
const setBit = (mask, i) => mask | (1 << i);

// Clear i-th bit
const clearBit = (mask, i) => mask & ~(1 << i);

// Toggle i-th bit
const toggleBit = (mask, i) => mask ^ (1 << i);

// Count set bits (popcount)
function popcount(n) {
  let count = 0;
  while (n > 0) {
    n &= (n - 1);
    count++;
  }
  return count;
}
```

### Pattern 2: Missing Number via XOR Invariant
```javascript
// Example: LeetCode 268 (Missing Number)
function missingNumber(nums) {
  let xor = nums.length;
  for (let i = 0; i < nums.length; i++) {
    xor ^= i ^ nums[i];
  }
  return xor;
}
```

### Critical Traps:
- **32-Bit Bitwise Truncation:** In JavaScript, bitwise operators (`&`, `|`, `^`, `<<`, `>>`) coerce numbers into **32-bit signed integers** ($[-2^{31}, 2^{31}-1]$).
  - `(1 << 31)` becomes `-2147483648`.
  - `(1 << 32)` becomes `1` (wraps around mod 32!).
  - If you need bit manipulation on 64-bit numbers ($> 2^{31}-1$), **you MUST use `BigInt`** (`1n << 40n`).
- **Operator Precedence:** Bitwise operators have **lower precedence** than comparison and arithmetic operators!
  - `if (mask & 1 === 0)` evaluates as `mask & (1 === 0)` $\implies$ `mask & false` $\implies 0$!
  - **Always wrap in parentheses:** `if ((mask & 1) === 0)`.

---

## 5. Sub-Patterns & Archetypes
1. **Bitwise Independence:** Analyzing each bit column (0 through 30) independently.
2. **Subset Iteration:** Outer loop from `0` to `(1 << N) - 1`.
3. **XOR Prefix Sums:** $\text{XOR}(L, R) = \text{pref}[R] \oplus \text{pref}[L - 1]$.

---

## 6. Solved Problems Catalog & Takeaways

| Problem | Platform | Rating | Solution File | Core Insight / Takeaway |
|---|---|---|---|---|
| [Missing Number](https://leetcode.com/problems/missing-number/) | `LeetCode` | `Easy` | `missingNumber.js` | XOR invariant cancels all duplicate values, leaving only the missing integer. $O(N)$ time, $O(1)$ space. |
| [Bit++](https://codeforces.com/problemset/problem/282/A) | `Codeforces` | `800` | `bitPlusPlus.js` | Increment / decrement simulation depending on `+` character presence. |

---
| [Almost Ternary Matrix](https://codeforces.com/problemset/problem/1699/B) | `Codeforces` | `900` | `almostTernaryMatrix.js` | Key algorithmic application from Day 2026-09-29. |
| [Sum in Binary Tree](https://codeforces.com/problemset/problem/1843/C) | `Codeforces` | `800` | `sumInBinaryTree.js` | Key algorithmic application from Day 2026-10-01. |
| [ABC String](https://codeforces.com/problemset/problem/1494/A) | `Codeforces` | `900` | `aBCString.js` | Key algorithmic application from Day 2026-10-03. |
| [Mocha and Math](https://codeforces.com/problemset/problem/1559/A) | `Codeforces` | `900` | `mochaAndMath.js` | Key algorithmic application from Day 2026-10-03. |
| [XOR Sequences](https://codeforces.com/problemset/problem/1979/B) | `Codeforces` | `1000` | `xORSequences.js` | Key algorithmic application from Day 2026-10-07. |
| [Raising Bacteria](https://codeforces.com/problemset/problem/579/A) | `Codeforces` | `1000` | `raisingBacteria.js` | Key algorithmic application from Day 2026-10-09. |
| [Renako Amaori and XOR Game (easy version)](https://codeforces.com/problemset/problem/2171/C1) | `Codeforces` | `1100` | `renakoAmaoriAndXORGameEasyVersion.js` | Key algorithmic application from Day 2026-10-12. |
| [Tavas and SaDDas](https://codeforces.com/problemset/problem/535/B) | `Codeforces` | `1100` | `tavasAndSaDDas.js` | Key algorithmic application from Day 2026-10-13. |
| [MEXor Mixup](https://codeforces.com/problemset/problem/1567/B) | `Codeforces` | `1000` | `mEXorMixup.js` | Key algorithmic application from Day 2026-10-14. |
| [Special Numbers](https://codeforces.com/problemset/problem/1594/B) | `Codeforces` | `1100` | `specialNumbers.js` | Key algorithmic application from Day 2026-10-14. |
| [AND Reconstruction](https://codeforces.com/problemset/problem/1991/B) | `Codeforces` | `1100` | `aNDReconstruction.js` | Key algorithmic application from Day 2026-10-16. |
| [XOR Palindromes](https://codeforces.com/problemset/problem/1867/B) | `Codeforces` | `1100` | `xORPalindromes.js` | Key algorithmic application from Day 2026-10-19. |
| [Cake Assignment](https://codeforces.com/problemset/problem/2138/A) | `Codeforces` | `1100` | `cakeAssignment.js` | Key algorithmic application from Day 2026-10-19. |
| [Beautiful XOR](https://codeforces.com/problemset/problem/2162/C) | `Codeforces` | `1100` | `beautifulXOR.js` | Key algorithmic application from Day 2026-10-20. |
| [Binary Colouring](https://codeforces.com/problemset/problem/1977/B) | `Codeforces` | `1100` | `binaryColouring.js` | Key algorithmic application from Day 2026-10-21. |
| [Petr and a Combination Lock](https://codeforces.com/problemset/problem/1097/B) | `Codeforces` | `1200` | `petrAndACombinationLock.js` | Key algorithmic application from Day 2026-10-21. |
| [Fedor and New Game](https://codeforces.com/problemset/problem/467/B) | `Codeforces` | `1100` | `fedorAndNewGame.js` | Key algorithmic application from Day 2026-10-22. |
| [Chloe and the sequence ](https://codeforces.com/problemset/problem/743/B) | `Codeforces` | `1200` | `chloeAndTheSequence.js` | Key algorithmic application from Day 2026-10-23. |
| [Creating Keys for StORages Has Become My Main Skill](https://codeforces.com/problemset/problem/2072/C) | `Codeforces` | `1200` | `creatingKeysForStORagesHasBecomeMyMainSkill.js` | Key algorithmic application from Day 2026-10-23. |
| [A Good Problem](https://codeforces.com/problemset/problem/2119/C) | `Codeforces` | `1300` | `aGoodProblem.js` | Key algorithmic application from Day 2026-10-23. |
| [Count Magical Substring Pairs I](https://leetcode.com/problems/count-magical-substring-pairs-i/) | `LeetCode` | `Medium` | `countMagicalSubstringPairs.js` | Adjacent substring boundary decomposition: precompute distinct character counts via 26-bit bitmasks, matching left and right distinct frequencies across split points. |
| [Count Magical Substring Pairs II](https://leetcode.com/problems/count-magical-substring-pairs-ii/) | `LeetCode` | `Hard` | `countMagicalSubstringPairsII.js` | Full linear-scale O(26N) adjacent distinct counting: maintain sorted last/first occurrence arrays of size <= 26 via insertion sort to compute interval lengths in O(1) per distinct level. |
| [Divisor Chain](https://codeforces.com/problemset/problem/1864/C) | `Codeforces` | `1300` | `divisorChain.js` | Key algorithmic application from Day 2026-10-24. |


## 7. Common Pitfalls & Anti-Patterns
- **Shift of 31 or Higher with Standard Numbers:** `1 << 31` yields negative numbers; `1 << 32` resets to 1.
- **Missing Parentheses:** Never write `x & 1 == 0` without parentheses `(x & 1) == 0`.
