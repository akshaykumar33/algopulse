# Arranging The Sheep (Codeforces 1520E)

## Intuition & Analysis
Given a string of length $n$ with `*` (sheep) and `.` (empty), we wish to arrange all sheep contiguously with minimum moves.
Let the positions of the $k$ sheep be $p_0 < p_1 < \dots < p_{k-1}$.
If $k \le 1$, the cost is $0$.
If the sheep are placed contiguously starting at position $x$, the $i$-th sheep will be placed at $x + i$.
The distance moved by sheep $i$ is $|p_i - (x + i)| = |(p_i - i) - x|$.
Let $y_i = p_i - i$. Since $p_i$ is strictly increasing, $y_i$ is non-decreasing ($y_0 \le y_1 \le \dots \le y_{k-1}$).
The total distance is:
$$\sum_{i=0}^{k-1} |y_i - x|$$
This is minimized when $x$ is the median of the sequence $y$, namely $x = y_{\lfloor k/2 \rfloor}$.

## Complexity
- Time Complexity: $O(n)$ per test case.
- Space Complexity: $O(n)$ to store sheep positions.
