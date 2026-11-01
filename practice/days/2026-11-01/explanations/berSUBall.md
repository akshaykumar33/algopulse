# BerSU Ball (Codeforces 489B)

## Algorithmic & Mathematical Analysis
- **Problem Statement:** Given $n$ boys with skills $a_i$ and $m$ girls with skills $b_j$, find the maximum number of pairs such that $|a_i - b_j| \le 1$.
- **Greedy Two-Pointer Choice:**
  - Sorting both arrays enables a monotonic two-pointer scan.
  - When $a_i$ and $b_j$ can be paired, doing so greedily preserves maximum remaining availability for higher-skilled participants.
  - If $a_i < b_j - 1$, boy $i$ cannot match with girl $j$ or any later girl, so increment $i$.
  - Similarly, if $b_j < a_i - 1$, increment $j$.
- **Complexity:**
  - Time Complexity: $O(n \log n + m \log m)$ for sorting, $O(n + m)$ for two-pointer matching.
  - Space Complexity: $O(n + m)$.

