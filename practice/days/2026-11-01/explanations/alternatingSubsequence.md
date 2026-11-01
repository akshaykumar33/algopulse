# Alternating Subsequence (Codeforces 1343C)

## Algorithmic & Mathematical Analysis
- **Problem Statement:** Partition an array of integers into alternating sign blocks and find the maximum sum of a subsequence of maximum possible length.
- **Invariance & Greediness:**
  - Any valid alternating subsequence can pick at most one element from each maximal contiguous subarray with identical signs.
  - To maximize the sum, we greedily select the maximum element $\max(B_i)$ from each maximal homogeneous block $B_i$.
- **Complexity:**
  - Time Complexity: $O(N)$ single-pass two-pointer linear scan.
  - Space Complexity: $O(1)$ auxiliary space.

