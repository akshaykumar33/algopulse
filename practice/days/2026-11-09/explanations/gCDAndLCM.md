# GCD and LCM (CodeChef CC-GCDLM)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-GCDLM](https://www.codechef.com/problems/GCDLM)
- **Difficulty / Rating:** 1419
- **Tags:** math, number theory, game theory
- **Solution File:** `gCDAndLCM.js`

---

## 2. Core Intuition & Mathematical Rationale
Initially we have two numbers $X, Y$. In each of the $K$ moves:
1. Alice replaces one number with $G = \gcd(X, Y)$.
2. Bob replaces one number with $\text{lcm}(\text{current pair})$.
Let $G = \gcd(X, Y)$.
If $K = 1$:
Alice replaces the larger of $X, Y$ with $G$. The pair becomes $(G, \min(X, Y))$.
Since $G \mid \min(X, Y)$, their LCM is $\min(X, Y)$.
Bob replacing $\min(X, Y)$ with the LCM leaves the pair unchanged as $(G, \min(X, Y))$.
Thus, for $K = 1$, the minimum sum achievable is:
$$G + \min(X, Y)$$
If $K \ge 2$:
In move 2, the numbers are $(G, \min(X, Y))$. Their GCD is $G$.
Alice can replace $\min(X, Y)$ with $G$, making both numbers equal to $G$.
Once both numbers are equal to $G$, $\text{lcm}(G, G) = G$, so Bob cannot change them.
The numbers remain $(G, G)$ indefinitely, which is the absolute theoretical lower bound.
Thus, for $K \ge 2$, the minimum sum is:
$$2 \cdot \gcd(X, Y)$$

---

## 3. Algorithmic Complexity
- **Time Complexity:** $O(\log(\min(X, Y)))$ using Euclidean algorithm for GCD.
- **Space Complexity:** $O(1)$ auxiliary space.
