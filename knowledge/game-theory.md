# Game Theory & Impartial Games — Algorithmic Patterns & Knowledge Base

## 1. Core Principles & Mental Model
Combinatorial Game Theory studies sequential, two-player games with complete information, deterministic transitions, and alternating turns (no random elements like dice or hidden hands).

### Fundamental Concepts:
1. **Normal Play Convention:** The last player to move wins (the player with no legal moves loses).
2. **$N$-Positions & $P$-Positions:**
   - **$P$-Position (Previous Player Winning):** Any move from here leaves an $N$-position for the opponent. If you start your turn in a $P$-position, you are doomed under optimal play.
   - **$N$-Position (Next Player Winning):** There exists at least one move leading to a $P$-position. If you start in an $N$-position, you can win by moving to that $P$-position.
3. **Impartial vs Partisan Games:**
   - *Impartial:* The set of available moves depends only on the current state, not on whose turn it is (e.g. Nim).
   - *Partisan:* Available moves depend on the player (e.g. Chess, Checkers).

---

## 2. Recognition Signals ("When you see X, think Y")
- **"Two players play optimally with alternating turns":** $\implies$ Game Theory state classification.
- **"Remove stones from piles / subtract 1 or 2":** $\implies$ Modular arithmetic on pile sizes or Nim-sum (XOR sum).
- **"Determine who wins if both play optimally":** $\implies$ Analyze small base states ($N=0, 1, 2, 3$) to detect recurring winning/losing cycles or parity.

---

## 3. Key Mathematical Theorems & Formulations
1. **State Transition Rules:**
   - Any terminal state (no moves available) is a $P$-position.
   - A state is an $N$-position $\iff$ $\exists$ a transition to a $P$-position.
   - A state is a $P$-position $\iff$ **all** transitions lead to $N$-positions.
2. **Bouton's Theorem for Nim:**
   In standard Nim with pile sizes $x_1, x_2, \dots, x_k$, a position is a $P$-position (second player wins) if and only if the XOR sum is zero:
   $$\bigoplus_{i=1}^k x_i = 0$$

---

## 4. Node.js / JavaScript Implementation Patterns & Traps

### Pattern: State Deduction via Modulo / Parity Analysis
```javascript
// Example: Buttons (Codeforces 1858A)
// Anna has 'a' unique buttons, Katie has 'b', and 'c' common buttons.
function determineWinner(a, b, c) {
  // If c is odd, Anna takes the extra common button first, effectively giving her a + 1
  const effectiveA = a + Math.ceil(c / 2);
  const effectiveB = b + Math.floor(c / 2);
  return effectiveA > effectiveB ? "First" : "Second";
}
```

### Critical Traps:
- **Misidentifying Who Goes First:** Pay meticulous attention to whether Player 1 or Player 2 takes the first move.
- **Misleading Simulation:** Attempting to simulate large games with minimax will TLE. Always compute states for $n = 0, 1, 2, 3, \dots, 10$ on paper to spot the mathematical pattern.

---

## 5. Sub-Patterns & Archetypes
1. **Parity of Total Moves:** If each turn must consume an item and total items is $K$, First wins if $K$ is odd, Second wins if $K$ is even.
2. **Symmetric Strategy:** Second player mirrors First player's moves to maintain a balanced invariant.
3. **Sprague-Grundy Theorem:** Every impartial game is equivalent to a one-pile game of Nim with size equal to its Grundy value ($\text{mex}$).

---

## 6. Solved Problems Catalog & Takeaways

| Problem | Platform | Rating | Solution File | Core Insight / Takeaway |
|---|---|---|---|---|
| [Buttons](https://codeforces.com/problemset/problem/1858/A) | `Codeforces` | `800` | `buttons.js` | Common buttons $c$ are consumed first; parity of $c$ determines which player gains the advantage. |
| [Game with Integers](https://codeforces.com/problemset/problem/1899/A) | `Codeforces` | `800` | `gameWithIntegers.js` | If $n \pmod 3 \ne 0$, Vanya can immediately add or subtract 1 to win on turn 1. |
| [MEX Game (Easy)](https://www.codechef.com) | `CodeChef` | `1200` | `mexGameEasy.js` | Constant MEX preservation invariant: all paths have identical length; winner determined by parity of total valid decrements. |
| [Digit Game](https://codeforces.com/problemset/problem/1419/A) | `Codeforces` | `900` | `digitGame.js` | Key algorithmic application from Day 2026-10-02. |
| [Coin Games](https://codeforces.com/problemset/problem/1972/B) | `Codeforces` | `900` | `coinGames.js` | Key algorithmic application from Day 2026-10-04. |
| [Game of Mathletes](https://codeforces.com/problemset/problem/2060/C) | `Codeforces` | `900` | `gameOfMathletes.js` | Key algorithmic application from Day 2026-10-08. |
| [Removals Game](https://codeforces.com/problemset/problem/2002/B) | `Codeforces` | `1000` | `removalsGame.js` | Key algorithmic application from Day 2026-10-09. |
| [Renako Amaori and XOR Game (easy version)](https://codeforces.com/problemset/problem/2171/C1) | `Codeforces` | `1100` | `renakoAmaoriAndXORGameEasyVersion.js` | Key algorithmic application from Day 2026-10-12. |
| [Matrix Game](https://codeforces.com/problemset/problem/1365/A) | `Codeforces` | `1100` | `matrixGame.js` | Key algorithmic application from Day 2026-10-12. |
| [Swap Game](https://codeforces.com/problemset/problem/1747/C) | `Codeforces` | `1200` | `swapGame.js` | Key algorithmic application from Day 2026-10-17. |
| [Summation Game](https://codeforces.com/problemset/problem/1920/B) | `Codeforces` | `1100` | `summationGame.js` | Key algorithmic application from Day 2026-10-18. |
| [Palindrome Game (easy version)](https://codeforces.com/problemset/problem/1527/B1) | `Codeforces` | `1200` | `palindromeGameEasyVersion.js` | Key algorithmic application from Day 2026-10-18. |
| [Binary String Battle](https://codeforces.com/problemset/problem/2123/D) | `Codeforces` | `1200` | `binaryStringBattle.js` | Key algorithmic application from Day 2026-10-23. |
| [Conan and Agasa play a Card Game](https://codeforces.com/problemset/problem/914/B) | `Codeforces` | `1200` | `conanAndAgasaPlayACardGame.js` | Key algorithmic application from Day 2026-10-24. |
| [Hot Potatoes at the Fairy Warehouse](https://codeforces.com/problemset/problem/2255/A) | `Codeforces` | `1200` | `hotPotatoesAtTheFairyWarehouse.js` | Key algorithmic application from Day 2026-10-25. |
| [Doors Breaking and Repairing](https://codeforces.com/problemset/problem/1102/C) | `Codeforces` | `1200` | `doorsBreakingAndRepairing.js` | Key algorithmic application from Day 2026-10-26. |
| [Training Before the Olympiad](https://codeforces.com/problemset/problem/1916/C) | `Codeforces` | `1200` | `trainingBeforeTheOlympiad.js` | Key algorithmic application from Day 2026-10-27. |
| [Not Sitting](https://codeforces.com/problemset/problem/1627/B) | `Codeforces` | `1300` | `notSitting.js` | Key algorithmic application from Day 2026-10-27. |
| [Game with a Fraction](https://codeforces.com/problemset/problem/2196/A) | `Codeforces` | `1200` | `gameWithAFraction.js` | Key algorithmic application from Day 2026-10-28. |
| [Jellyfish and Game](https://codeforces.com/problemset/problem/1874/A) | `Codeforces` | `1200` | `jellyfishAndGame.js` | Key algorithmic application from Day 2026-10-28. |
| [Little Girl and Game](https://codeforces.com/problemset/problem/276/B) | `Codeforces` | `1300` | `littleGirlAndGame.js` | Key algorithmic application from Day 2026-10-29. |

---

## 7. Common Pitfalls & Anti-Patterns
- **Assuming Greedy Play:** Optimal play means players play to WIN, which may involve making a seemingly suboptimal local move to force the opponent into a terminal trap.
