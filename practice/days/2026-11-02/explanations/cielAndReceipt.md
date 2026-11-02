# Ciel and Receipt (CodeChef CC-CIELRCPT)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-CIELRCPT](https://www.codechef.com/problems/CIELRCPT)
- **Difficulty / Rating:** 936
- **Tags:** greedy, bitmasks, math
- **Solution File:** `cielAndReceipt.js`

---

## 2. Core Intuition & Mathematical Rationale
The restaurant offers 12 menu items whose prices are the powers of two:
$$2^0, 2^1, 2^2, \dots, 2^{11} = 2048$$
To minimize the total number of ordered items summing to $p$:
1. Greedily take as many of the maximum allowed price item ($2048$) as possible:
   $$k = \lfloor p / 2048 \rfloor$$
2. The remaining price $r = p \pmod{2048}$ is strictly less than 2048.
3. Every integer $r < 2048$ has a unique representation as a sum of distinct powers of two, each bounded by $2^{10} \le 1024 < 2048$.
4. By canonical binary expansion, the minimum number of powers of two summing to $r$ is simply its Hamming weight (number of set bits, or popcount).

Total minimum items:
$$\text{Ans} = \lfloor p / 2048 \rfloor + \text{popcount}(p \pmod{2048})$$

---

## 3. Complexity
- **Time Complexity:** $O(\log p)$ or $O(1)$ per testcase, since $p < 2^{12}$ after modulo.
- **Space Complexity:** $O(1)$ auxiliary.

