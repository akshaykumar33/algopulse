# Racing Horses (CodeChef CC-HORSES)

## Algorithmic & Mathematical Analysis
- **Problem Statement:** Given $N$ horses with skill levels $S_1, S_2, \dots, S_N$, find the minimum absolute difference $|S_i - S_j|$ between any two distinct horses.
- **Invariance & Monotonicity:** In any set of real numbers, sorting them in ascending order guarantees that the minimal distance between any pair is attained by some adjacent pair in the sorted sequence.
- **Complexity:**
  - Sorting: $O(N \log N)$
  - Scan: $O(N)$
  - Total Time: $O(T \cdot N \log N) \ll 10^6$ operations, runs comfortably within 100ms.
  - Space: $O(N)$.

