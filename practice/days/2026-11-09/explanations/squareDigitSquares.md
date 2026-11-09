# Square Digit Squares (CodeChef CC-SDSQUARE)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-SDSQUARE](https://www.codechef.com/problems/SDSQUARE)
- **Difficulty / Rating:** 1521
- **Tags:** math, brute force, precomputation
- **Solution File:** `squareDigitSquares.js`

---

## 2. Core Intuition & Mathematical Rationale
We are asked to count perfect squares $x^2 \in [a, b]$ where $1 \le a \le b \le 10^{10}$ that consist only of digits that are themselves perfect squares: $\{0, 1, 4, 9\}$.
Since $x^2 \le 10^{10}$, the root $x$ satisfies $1 \le x \le 10^5 = 100,000$.
There are only $100,000$ possible bases $x$.
We can precompute all numbers $x \in [1, 100,000]$ such that $x^2$ has only digits in $\{0, 1, 4, 9\}$.
In fact, across the entire range up to $10^{10}$, there are only 120 such numbers!
For each test case with query $[a, b]$, we simply count how many precomputed numbers fall within $[a, b]$.

---

## 3. Algorithmic Complexity
- **Precomputation Time:** $O(M \cdot D)$ where $M = 10^5$ and $D \le 11$ (digits per square), taking $\approx 10$ ms.
- **Per Test Case:** $O(1)$ over the 120 precomputed values.
- **Space Complexity:** $O(1)$ auxiliary space.
