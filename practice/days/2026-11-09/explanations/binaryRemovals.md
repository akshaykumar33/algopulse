# Binary Removals (CodeChef CC-BINREM)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-BINREM](https://www.codechef.com/problems/BINREM)
- **Difficulty / Rating:** 1572
- **Tags:** strings, inversions, greedy
- **Solution File:** `binaryRemovals.js`

---

## 2. Core Intuition & Mathematical Rationale
In each operation, we may delete any subsequence of $S$ whose number of inversions is $\le X$ and is a multiple of $K$.
Any monotonic string (such as a string consisting solely of `'0'`s or solely of `'1'`s) has 0 inversions.
Since 0 is always $\le X$ and $0 \equiv 0 \pmod K$, a subsequence of all `'1'`s can always be deleted in 1 operation with 0 inversions.
Then, all remaining characters are `'0'`, which can be deleted in a second operation with 0 inversions.
Therefore, the answer is always at most 2.
Can the entire string be deleted in 1 operation?
The only way to delete the entire string in 1 operation is if the whole string $S$ itself has its total inversion count $\le X$ and $\equiv 0 \pmod K$.
We compute the inversion count of $S$ in $O(N)$ time by maintaining a running count of `'1'`s and adding it to total inversions whenever `'0'` is encountered.
If $\text{invs} \le X$ and $\text{invs} \pmod K == 0$, output 1; otherwise, output 2.

---

## 3. Algorithmic Complexity
- **Time Complexity:** $O(N)$ linear scan per testcase.
- **Space Complexity:** $O(1)$ auxiliary space.
