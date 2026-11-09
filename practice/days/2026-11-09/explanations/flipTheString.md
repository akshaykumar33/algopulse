# Flip the String (CodeChef CC-FLIP)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-FLIP](https://www.codechef.com/problems/FLIP)
- **Difficulty / Rating:** 1538
- **Tags:** strings, greedy, parity
- **Solution File:** `flipTheString.js`

---

## 2. Core Intuition & Mathematical Rationale
In each operation, we pick a substring of odd length $2k + 1$ starting at index $i$, and flip bits at odd positions within that substring:
$i, i+2, i+4, \dots, i+2k$.
Notice that all flipped indices share the same parity (either all even or all odd in the original 0-indexed string).
Furthermore, any contiguous subsegment of elements of the same parity can be chosen by picking $L = i$ and $R = i + 2k$.
Thus, the problem decouples into two completely independent subproblems:
1. Transforming characters at even indices of $A$ to match $B$.
2. Transforming characters at odd indices of $A$ to match $B$.

In each track, any contiguous block of mismatches $A[i] \ne B[i]$ can be resolved in a single operation.
Therefore, the minimum number of operations is the total count of contiguous maximal mismatch segments across both parity tracks.

---

## 3. Algorithmic Complexity
- **Time Complexity:** $O(|A|)$ linear scan across both parity tracks.
- **Space Complexity:** $O(1)$ auxiliary space.
