# Number Theory — Algorithmic Patterns & Knowledge Base

## 1. Core Principles & Mental Model
Number theory deals with integers, divisibility, prime numbers, modular arithmetic, and arithmetic functions. In competitive programming, the majority of number theory problems rely on Euclidean GCD, prime factorization, the Sieve of Eratosthenes, or modular exponentiation.

---

## 2. Recognition Signals ("When you see X, think Y")
- **"Find GCD or LCM of numbers":** $\implies$ Euclidean algorithm $O(\log(\min(A, B)))$ and $\text{LCM}(A, B) = \frac{A \cdot B}{\text{GCD}(A, B)}$.
- **"Answer modulo $10^9 + 7$ or $998244353$":** $\implies$ Modular arithmetic at every addition and multiplication step.
- **"Count divisors or factorize $N \le 10^{12}$":** $\implies$ Trial division up to $\sqrt{N}$ in $O(\sqrt{N})$.
- **"Primes up to $10^7$":** $\implies$ Sieve of Eratosthenes in $O(N \log \log N)$.
- **"Compute $A^B \pmod M$ for $B \le 10^{18}$":** $\implies$ Fast Binary Exponentiation in $O(\log B)$.

---

## 3. Key Mathematical Theorems & Formulas
1. **Euclidean Algorithm for GCD:**
   $$\gcd(a, b) = \gcd(b, a \pmod b) \quad \text{with } \gcd(a, 0) = a$$
2. **Modular Arithmetic Identities:**
   - $(A + B) \pmod M = ((A \pmod M) + (B \pmod M)) \pmod M$
   - $(A \cdot B) \pmod M = ((A \pmod M) \cdot (B \pmod M)) \pmod M$
   - $(A - B) \pmod M = ((A \pmod M) - (B \pmod M) + M) \pmod M$
3. **Fermat's Little Theorem:**
   If $p$ is prime and $\gcd(a, p) = 1$, then:
   $$a^{p-1} \equiv 1 \pmod p \implies a^{-1} \equiv a^{p-2} \pmod p$$
4. **Last Digits of Powers (Cycles):**
   - For any base ending in 5, $5^n$ ends in $25$ for all $n \ge 2$.

---

## 4. Node.js / JavaScript Implementation Patterns & Traps

### Pattern: Euclidean GCD (Iterative & Fast)
```javascript
function gcd(a, b) {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return (a / gcd(a, b)) * b;
}
```

### Pattern: Binary Exponentiation with BigInt
```javascript
function powerMod(base, exp, mod) {
  let res = 1n;
  let b = BigInt(base) % BigInt(mod);
  let e = BigInt(exp);
  const m = BigInt(mod);

  while (e > 0n) {
    if (e & 1n) res = (res * b) % m;
    b = (b * b) % m;
    e >>= 1n;
  }
  return Number(res);
}
```

### Pattern: Linear / Standard Sieve of Eratosthenes ($N \le 10^7$)
```javascript
function sieve(maxN) {
  const isPrime = new Uint8Array(maxN + 1);
  isPrime.fill(1);
  isPrime[0] = isPrime[1] = 0;

  for (let p = 2; p * p <= maxN; p++) {
    if (isPrime[p]) {
      for (let i = p * p; i <= maxN; i += p) {
        isPrime[i] = 0;
      }
    }
  }
  return isPrime;
}
```

### Critical Traps:
- **Product Overflow before Modulo:** In JavaScript, `(a * b) % MOD` will silently lose precision if $a, b \approx 10^9$ because $10^{18} > 9 \times 10^{15}$. **Always** cast to `BigInt` when multiplying two large integers before modulo: `Number((BigInt(a) * BigInt(b)) % BigInt(MOD))`.

---

## 5. Sub-Patterns & Archetypes
1. **Coprimality & Reduction:** Reducing fractions $A/B$ by dividing by $\gcd(A, B)$.
2. **Divisor Counting:** Prime factorize $N = p_1^{e_1} p_2^{e_2} \dots p_k^{e_k}$. Total divisors $d(N) = \prod (e_i + 1)$.
3. **Power Cycle Observation:** When computing high powers modulo $10^k$, inspect the periodic cycle of the last digits.

---

## 6. Solved Problems Catalog & Takeaways

| Problem | Platform | Rating | Solution File | Core Insight / Takeaway |
|---|---|---|---|---|
| [Again Twenty Five!](https://codeforces.com/problemset/problem/630/A) | `Codeforces` | `800` | `againTwentyFive.js` | For any $n \ge 2$, $5^n \pmod{100} = 25$. Constant time $O(1)$! |
| [Game with Integers](https://codeforces.com/problemset/problem/1899/A) | `Codeforces` | `800` | `gameWithIntegers.js` | If $n \pmod 3 \ne 0$, Vanya can add/subtract 1 on turn 1 to reach a multiple of 3 and win immediately. |
| [Ordinary Numbers](https://codeforces.com/problemset/problem/1520/B) | `Codeforces` | `800` | `ordinaryNumbers.js` | Key algorithmic application from Day 2026-09-30. |
| [Permutation Swap](https://codeforces.com/problemset/problem/1828/B) | `Codeforces` | `900` | `permutationSwap.js` | Key algorithmic application from Day 2026-10-01. |
| [Minimum LCM](https://codeforces.com/problemset/problem/1765/M) | `Codeforces` | `1000` | `minimumLCM.js` | Key algorithmic application from Day 2026-10-02. |
| [Ilya and Bank Account](https://codeforces.com/problemset/problem/313/A) | `Codeforces` | `900` | `ilyaAndBankAccount.js` | Key algorithmic application from Day 2026-10-03. |
| [Prime Subtraction](https://codeforces.com/problemset/problem/1238/A) | `Codeforces` | `900` | `primeSubtraction.js` | Key algorithmic application from Day 2026-10-04. |
| [Strange Partition](https://codeforces.com/problemset/problem/1471/A) | `Codeforces` | `900` | `strangePartition.js` | Key algorithmic application from Day 2026-10-04. |
| [Yet Another Tetris Problem](https://codeforces.com/problemset/problem/1324/A) | `Codeforces` | `900` | `yetAnotherTetrisProblem.js` | Key algorithmic application from Day 2026-10-05. |
| [Left and Down](https://codeforces.com/problemset/problem/2125/B) | `Codeforces` | `900` | `leftAndDown.js` | Key algorithmic application from Day 2026-10-05. |
| [Fair Numbers](https://codeforces.com/problemset/problem/1411/B) | `Codeforces` | `1000` | `fairNumbers.js` | Key algorithmic application from Day 2026-10-09. |
| [Minimize Equal Sum Subarrays](https://codeforces.com/problemset/problem/1998/B) | `Codeforces` | `1000` | `minimizeEqualSumSubarrays.js` | Key algorithmic application from Day 2026-10-09. |
| [Relatively Prime Pairs](https://codeforces.com/problemset/problem/1051/B) | `Codeforces` | `1000` | `relativelyPrimePairs.js` | Key algorithmic application from Day 2026-10-11. |
| [Non-coprime Split](https://codeforces.com/problemset/problem/1872/C) | `Codeforces` | `1100` | `nonCoprimeSplit.js` | Key algorithmic application from Day 2026-10-11. |
| [Spring](https://codeforces.com/problemset/problem/2204/C) | `Codeforces` | `1000` | `spring.js` | Key algorithmic application from Day 2026-10-12. |
| [GCD Length](https://codeforces.com/problemset/problem/1511/B) | `Codeforces` | `1100` | `gCDLength.js` | Key algorithmic application from Day 2026-10-16. |
| [The 67th OEIS Problem](https://codeforces.com/problemset/problem/2218/D) | `Codeforces` | `1100` | `the67thOEISProblem.js` | Key algorithmic application from Day 2026-10-18. |
| [All are Same](https://codeforces.com/problemset/problem/1593/D1) | `Codeforces` | `1100` | `allAreSame.js` | Key algorithmic application from Day 2026-10-22. |
| [Long Multiplication](https://codeforces.com/problemset/problem/1954/C) | `Codeforces` | `1200` | `longMultiplication.js` | Key algorithmic application from Day 2026-10-22. |
| [Fedya and Maths](https://codeforces.com/problemset/problem/456/B) | `Codeforces` | `1200` | `fedyaAndMaths.js` | Key algorithmic application from Day 2026-10-24. |
| [Divisor Chain](https://codeforces.com/problemset/problem/1864/C) | `Codeforces` | `1300` | `divisorChain.js` | Key algorithmic application from Day 2026-10-24. |
| [Divide and Equalize](https://codeforces.com/problemset/problem/1881/D) | `Codeforces` | `1300` | `divideAndEqualize.js` | Key algorithmic application from Day 2026-10-24. |
| [Playing with GCD](https://codeforces.com/problemset/problem/1736/B) | `Codeforces` | `1200` | `playingWithGCD.js` | Key algorithmic application from Day 2026-10-25. |
| [The Monster](https://codeforces.com/problemset/problem/787/A) | `Codeforces` | `1200` | `theMonster.js` | Key algorithmic application from Day 2026-10-25. |
| [Nastia and a Good Array](https://codeforces.com/problemset/problem/1521/B) | `Codeforces` | `1300` | `nastiaAndAGoodArray.js` | Key algorithmic application from Day 2026-10-25. |
| [Honey Cake](https://codeforces.com/problemset/problem/2181/H) | `Codeforces` | `1200` | `honeyCake.js` | Key algorithmic application from Day 2026-10-26. |
| [A Balanced Problemset?](https://codeforces.com/problemset/problem/1925/B) | `Codeforces` | `1200` | `aBalancedProblemset.js` | Key algorithmic application from Day 2026-10-26. |
| [Add 0 or K](https://codeforces.com/problemset/problem/2134/B) | `Codeforces` | `1200` | `add0OrK.js` | Key algorithmic application from Day 2026-10-26. |
| [Yet Another Array Restoration](https://codeforces.com/problemset/problem/1409/C) | `Codeforces` | `1200` | `yetAnotherArrayRestoration.js` | Key algorithmic application from Day 2026-10-26. |
| [T-primes](https://codeforces.com/problemset/problem/230/B) | `Codeforces` | `1300` | `tPrimes.js` | Key algorithmic application from Day 2026-10-26. |
| [Fox Dividing Cheese](https://codeforces.com/problemset/problem/371/B) | `Codeforces` | `1300` | `foxDividingCheese.js` | Key algorithmic application from Day 2026-10-26. |
| [A Simple GCD Problem (Easy Version)](https://codeforces.com/problemset/problem/2210/C1) | `Codeforces` | `1200` | `aSimpleGCDProblemEasyVersion.js` | Key algorithmic application from Day 2026-10-27. |
| [Make Them Odd](https://codeforces.com/problemset/problem/1277/B) | `Codeforces` | `1200` | `makeThemOdd.js` | Key algorithmic application from Day 2026-10-28. |
| [Heidi Learns Hashing (Easy)](https://codeforces.com/problemset/problem/1184/A1) | `Codeforces` | `1200` | `heidiLearnsHashingEasy.js` | Key algorithmic application from Day 2026-10-29. |
| [Divisor Subtraction](https://codeforces.com/problemset/problem/1076/B) | `Codeforces` | `1200` | `divisorSubtraction.js` | Key algorithmic application from Day 2026-10-29. |
| [Collatz Conjecture](https://codeforces.com/problemset/problem/1982/B) | `Codeforces` | `1200` | `collatzConjecture.js` | Key algorithmic application from Day 2026-10-29. |
| [Omkar and Last Class of Math](https://codeforces.com/problemset/problem/1372/B) | `Codeforces` | `1300` | `omkarAndLastClassOfMath.js` | Key algorithmic application from Day 2026-10-29. |
| [Product of Three Numbers](https://codeforces.com/problemset/problem/1294/C) | `Codeforces` | `1300` | `productOfThreeNumbers.js` | Key algorithmic application from Day 2026-10-29. |
| [Dreaming of Freedom](https://codeforces.com/problemset/problem/1826/C) | `Codeforces` | `1300` | `dreamingOfFreedom.js` | Key algorithmic application from Day 2026-10-30. |
| [Di-visible Confusion](https://codeforces.com/problemset/problem/1603/A) | `Codeforces` | `1300` | `diVisibleConfusion.js` | Key algorithmic application from Day 2026-10-30. |
| [Insane Problem](https://codeforces.com/problemset/problem/2044/E) | `Codeforces` | `1300` | `insaneProblem.js` | Key algorithmic application from Day 2026-10-30. |
| [Ehab and a Special Coloring Problem](https://codeforces.com/problemset/problem/1174/C) | `Codeforces` | `1300` | `ehabAndASpecialColoringProblem.js` | Key algorithmic application from Day 2026-10-30. |
| [Composite Coloring](https://codeforces.com/problemset/problem/1332/B) | `Codeforces` | `1400` | `compositeColoring.js` | Key algorithmic application from Day 2026-10-30. |
| [Subset Multiplication](https://codeforces.com/problemset/problem/2124/C) | `Codeforces` | `1300` | `subsetMultiplication.js` | Key algorithmic application from Day 2026-10-31. |
| [Ice Sculptures](https://codeforces.com/problemset/problem/158/D) | `Codeforces` | `1300` | `iceSculptures.js` | Key algorithmic application from Day 2026-10-31. |
| [Position in Fraction](https://codeforces.com/problemset/problem/900/B) | `Codeforces` | `1300` | `positionInFraction.js` | Key algorithmic application from Day 2026-10-31. |

---

## 7. Common Pitfalls & Anti-Patterns
- **LCM Overflow:** Never do `(a * b) / gcd(a, b)`. Always divide first: `(a / gcd(a, b)) * b` to prevent unnecessary overflow.
- **Divisor Enumeration Bound:** Always stop loop at `i * i <= n`, never `i <= n / 2`.
