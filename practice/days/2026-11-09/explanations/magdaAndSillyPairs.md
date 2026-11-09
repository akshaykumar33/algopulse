# Magda and Silly Pairs (CodeChef CC-SILLYPRS)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-SILLYPRS](https://www.codechef.com/problems/SILLYPRS)
- **Difficulty / Rating:** 1507
- **Tags:** math, greedy, parity
- **Solution File:** `magdaAndSillyPairs.js`

---

## 2. Core Intuition & Mathematical Rationale
Chefs have heights $A_1, \dots, A_N$ and chefettes have heights $B_1, \dots, B_N$.
When paired, child height is $\lfloor (A_i + B_j) / 2 \rfloor$.
Notice:
$$\lfloor (A_i + B_j) / 2 \rfloor = \frac{A_i + B_j - [A_i \not\equiv B_j \pmod 2]}{2}$$
Sum of all children heights across all $N$ pairs is:
$$\sum \lfloor (A_i + B_j) / 2 \rfloor = \frac{\sum A_i + \sum B_j - (\text{number of mismatched parity pairs})}{2}$$
The sum $\sum A_i + \sum B_j$ is invariant under any pairing.
To maximize the children sum, we must minimize the number of pairs with mismatched parities.
Let $e_A, o_A$ be the counts of even and odd numbers in $A$, and $e_B, o_B$ in $B$.
We can form $\min(e_A, e_B)$ even-even pairs and $\min(o_A, o_B)$ odd-odd pairs.
The remaining $|e_A - e_B|$ elements cannot avoid being paired across different parities.
Thus, the minimum number of mismatched pairs is exactly $|e_A - e_B|$.
The maximum possible sum is:
$$\frac{\sum A_i + \sum B_j - |e_A - e_B|}{2}$$

---

## 3. Algorithmic Complexity
- **Time Complexity:** $O(N)$ single pass over arrays $A$ and $B$.
- **Space Complexity:** $O(1)$ auxiliary space.
