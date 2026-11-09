# Black And White Cells (CodeChef CC-BWCELL)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-BWCELL](https://www.codechef.com/problems/BWCELL)
- **Difficulty / Rating:** 1515
- **Tags:** game theory, nim, impartial games
- **Solution File:** `blackAndWhiteCells.js`

---

## 2. Core Intuition & Mathematical Rationale
The game consists of a single white cell `'W'` with $L$ black cells to its left and $R$ black cells to its right.
In one turn, a player chooses some positive number of black cells on ANY ONE side of the white cell and removes them.
This is structurally isomorphic to the classic impartial game of 2-pile Nim (or subtraction game on two independent piles of sizes $L$ and $R$).
Under the normal play convention (last player to move wins):
- The state $(L, R)$ has Nim-sum $L \oplus R$.
- The state is a second-player winning position (P-position) if and only if $L \oplus R = 0 \iff L = R$.
- The state is a first-player winning position (N-position) if and only if $L \ne R$.
Since Aleksa plays first:
- If $L = R$: Chef (the second player) wins.
- If $L \ne R$: Aleksa (the first player) wins.

---

## 3. Algorithmic Complexity
- **Time Complexity:** $O(|S|)$ to locate the `'W'` and count $L, R$.
- **Space Complexity:** $O(1)$ auxiliary space.
