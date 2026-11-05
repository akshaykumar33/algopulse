# Mr Pr in a Dilemma (CC-ICM2008)

## Problem Overview
Mr. Pr and Ms. Ad start at coordinates $a$ and $b$ on the real number line, respectively. In each second, Mr. Pr chooses either speed $c$ or speed $d$. If Mr. Pr chooses $c$, Ms. Ad moves with speed $d$; if Mr. Pr chooses $d$, Ms. Ad moves with speed $c$. We need to decide if they can ever meet at the exact same integer position after an integral number of seconds.

## Key Insight & Invariants
- In each second, Mr. Pr and Ms. Ad move in the positive direction with speeds $\{c, d\}$ assigned in one of two configurations.
- The relative distance between them changes by either $+|c - d|$ or $-|c - d|$ in each second.
- Thus, after $t$ seconds, the net change in distance is $m \cdot |c - d|$ for an integer $m$.
- For them to meet, the initial distance $|a - b|$ must be an exact multiple of $|c - d|$.
- Special cases:
  - If $a = b$: They already meet at time $t = 0 \implies$ YES.
  - If $a \ne b$ and $c = d$: The distance $|c - d| = 0$, so their gap never changes $\implies$ NO.
  - If $|a - b| \pmod{|c - d|} == 0$: YES. Otherwise NO.

## Complexity
- **Time Complexity:** $O(1)$ per testcase, $O(T)$ overall.
- **Space Complexity:** $O(1)$.
