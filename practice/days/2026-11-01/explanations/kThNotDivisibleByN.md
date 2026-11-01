# K-th Not Divisible by n (Codeforces 1352C)

## Algorithmic & Mathematical Analysis
- **Problem Statement:** Given positive integers $n$ and $k$, find the $k$-th positive integer that is not divisible by $n$.
- **Closed-Form Invariant:** Integers not divisible by $n$ come in repeating blocks of size $n - 1$ between consecutive multiples of $n$.
- **Formula:**
  The number of full multiples skipped before the $k$-th non-multiple is $\lfloor \frac{k - 1}{n - 1} \rfloor$.
  Thus, the exact value is:
  $$\text{ans} = k + \left\lfloor \frac{k - 1}{n - 1} \right\rfloor$$
- **Complexity:**
  - Time Complexity: $O(1)$ arithmetic per testcase.
  - Space Complexity: $O(1)$ auxiliary space.

