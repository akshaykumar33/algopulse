# String Processing & Parsing — Algorithmic Patterns & Knowledge Base

## 1. Core Principles & Mental Model
String problems in competitive programming range from basic character counting and ASCII code manipulation to tokenization, palindrome verification, sliding window search, and pattern matching. In JavaScript, strings are immutable UTF-16 sequences.

---

## 2. Recognition Signals ("When you see X, think Y")
- **"Check if two strings are anagrams":** $\implies$ Character frequency count array (`new Int32Array(26)`).
- **"Compare strings case-insensitively / lexicographically":** $\implies$ `.toLowerCase()` + comparison (`<`, `>`).
- **"Abbreviate words longer than 10 characters":** $\implies$ Length check and format string: `$S[0]${len - 2}$S[len - 1]`.
- **"Parse encoded symbols (e.g. Borze code)":** $\implies$ Linear state machine scan with 1-character or 2-character lookahead.
- **"Find longest palindromic substring":** $\implies$ Expand around center or Manacher's Algorithm.

---

## 3. Key Mathematical Theorems & Invariants
1. **Anagram Equivalence Invariant:**
   Two strings $S_1$ and $S_2$ are anagrams if and only if their multiset of character frequencies is identical:
   $$\forall c \in \Sigma, \quad \text{count}(S_1, c) = \text{count}(S_2, c)$$
2. **Palindrome Parity Invariant:**
   A string can be rearranged into a palindrome if and only if **at most one** character has an odd frequency count.

---

## 4. Node.js / JavaScript Implementation Patterns & Traps

### Pattern 1: Fast Frequency Array for Lowercase English Letters
```javascript
// Fast 26-element array allocation (avoids hash map overhead)
const freq = new Int32Array(26);
for (let i = 0; i < str.length; i++) {
  freq[str.charCodeAt(i) - 97]++; // 97 is 'a'
}
```

### Pattern 2: Multi-Character Lookahead Parsing (Tokenization)
```javascript
// Example: Borze (Codeforces 32B)
// '.' -> '0', '-.' -> '1', '--' -> '2'
let i = 0;
let res = '';
while (i < str.length) {
  if (str[i] === '.') {
    res += '0';
    i++;
  } else if (str[i] === '-' && str[i + 1] === '.') {
    res += '1';
    i += 2;
  } else if (str[i] === '-' && str[i + 1] === '-') {
    res += '2';
    i += 2;
  }
}
```

### Pattern 3: Fast String Palindrome Check
```javascript
function isPalindrome(s) {
  let l = 0, r = s.length - 1;
  while (l < r) {
    if (s.charCodeAt(l) !== s.charCodeAt(r)) return false;
    l++;
    r--;
  }
  return true;
}
```

### Critical Traps:
- **String Concatenation in Tight Loops:** Repeated `str += chunk` in deep loops creates intermediate immutable strings and triggers heavy V8 garbage collection. Buffer into an array: `chunks.push(chunk)` and join once: `chunks.join('')`.
- **Lexicographical Comparison of Numbers:** Strings `"10"` is smaller than `"2"` lexicographically! Always parse to numbers before numeric comparisons.

---

## 5. Sub-Patterns & Archetypes
1. **Character Frequency Mapping:** Counting frequencies for parity, majority element, or anagram verification.
2. **Linear Tokenizer / Scanner:** Parsing formatted strings by scanning indices with conditional stride ($+1$ or $+2$).
3. **Run-Length Encoding (RLE):** Compressing sequences of identical characters.

---

## 6. Solved Problems Catalog & Takeaways

| Problem | Platform | Rating | Solution File | Core Insight / Takeaway |
|---|---|---|---|---|
| [Way Too Long Words](https://codeforces.com/problemset/problem/71/A) | `Codeforces` | `800` | `wayTooLongWords.js` | If length $> 10$, compress to `$s[0]${length - 2}$s[length - 1]`. |
| [Petya and Strings](https://codeforces.com/problemset/problem/112/A) | `Codeforces` | `800` | `petyaAndStrings.js` | Convert both to lowercase; perform standard lexicographical comparison. |
| [Borze](https://codeforces.com/problemset/problem/32/B) | `Codeforces` | `800` | `borze.js` | Prefix code decoding: greedy lookahead on first character determines token length (1 vs 2). |

---
| [Helpful Maths](https://codeforces.com/problemset/problem/339/A) | `undefined` | `800` | `helpfulMaths.js` | Key algorithmic application from Day 2026-09-25. |
| [Word Capitalization](https://codeforces.com/problemset/problem/281/A) | `undefined` | `800` | `wordCapitalization.js` | Key algorithmic application from Day 2026-09-25. |
| [Anton and Danik](https://codeforces.com/problemset/problem/734/A) | `undefined` | `800` | `antonAndDanik.js` | Key algorithmic application from Day 2026-09-26. |
| [Trippi Troppi](https://codeforces.com/problemset/problem/2094/A) | `undefined` | `800` | `trippiTroppi.js` | Key algorithmic application from Day 2026-09-26. |
| [Normal Problem](https://codeforces.com/problemset/problem/2044/B) | `undefined` | `800` | `normalProblem.js` | Key algorithmic application from Day 2026-09-26. |
| [Translation](https://codeforces.com/problemset/problem/41/A) | `undefined` | `800` | `translation.js` | Key algorithmic application from Day 2026-09-27. |
| [Down with Brackets](https://codeforces.com/problemset/problem/2110/B) | `Codeforces` | `900` | `downWithBrackets.js` | Key algorithmic application from Day 2026-09-29. |
| [Skibidus and Ohio](https://codeforces.com/problemset/problem/2065/B) | `Codeforces` | `800` | `skibidusAndOhio.js` | Key algorithmic application from Day 2026-09-30. |
| [Delete from the Left](https://codeforces.com/problemset/problem/1005/B) | `Codeforces` | `900` | `deleteFromTheLeft.js` | Key algorithmic application from Day 2026-10-02. |
| [Move Brackets](https://codeforces.com/problemset/problem/1374/C) | `Codeforces` | `1000` | `moveBrackets.js` | Key algorithmic application from Day 2026-10-04. |
| [Lecture](https://codeforces.com/problemset/problem/499/B) | `Codeforces` | `1000` | `lecture.js` | Key algorithmic application from Day 2026-10-05. |
| [Decoding](https://codeforces.com/problemset/problem/746/B) | `Codeforces` | `900` | `decoding.js` | Key algorithmic application from Day 2026-10-07. |
| [Rudolf and the Ugly String](https://codeforces.com/problemset/problem/1941/C) | `Codeforces` | `900` | `rudolfAndTheUglyString.js` | Key algorithmic application from Day 2026-10-07. |
| [Non-Substring Subsequence](https://codeforces.com/problemset/problem/1451/B) | `Codeforces` | `900` | `nonSubstringSubsequence.js` | Key algorithmic application from Day 2026-10-08. |
| [Palindromic Twist](https://codeforces.com/problemset/problem/1027/A) | `Codeforces` | `1000` | `palindromicTwist.js` | Key algorithmic application from Day 2026-10-08. |
| [Football](https://codeforces.com/problemset/problem/43/A) | `Codeforces` | `1000` | `football.js` | Key algorithmic application from Day 2026-10-09. |
| [Chat room](https://codeforces.com/problemset/problem/58/A) | `Codeforces` | `1000` | `chatRoom.js` | Key algorithmic application from Day 2026-10-10. |
| [String Task](https://codeforces.com/problemset/problem/118/A) | `Codeforces` | `1000` | `stringTask.js` | Key algorithmic application from Day 2026-10-11. |
| [Mike and palindrome](https://codeforces.com/problemset/problem/798/A) | `Codeforces` | `1000` | `mikeAndPalindrome.js` | Key algorithmic application from Day 2026-10-12. |
| [Asterisk-Minor Template](https://codeforces.com/problemset/problem/1796/B) | `Codeforces` | `1000` | `asteriskMinorTemplate.js` | Key algorithmic application from Day 2026-10-13. |
| [Double Strings](https://codeforces.com/problemset/problem/1703/D) | `Codeforces` | `1100` | `doubleStrings.js` | Key algorithmic application from Day 2026-10-13. |
| [Shuffle Hashing](https://codeforces.com/problemset/problem/1278/A) | `Codeforces` | `1000` | `shuffleHashing.js` | Key algorithmic application from Day 2026-10-14. |
| [Diverse Substring](https://codeforces.com/problemset/problem/1073/A) | `Codeforces` | `1000` | `diverseSubstring.js` | Key algorithmic application from Day 2026-10-14. |
| [Double-ended Strings](https://codeforces.com/problemset/problem/1506/C) | `Codeforces` | `1000` | `doubleEndedStrings.js` | Key algorithmic application from Day 2026-10-14. |
| [XOR Palindromes](https://codeforces.com/problemset/problem/1867/B) | `Codeforces` | `1100` | `xORPalindromes.js` | Key algorithmic application from Day 2026-10-19. |
| [Turtle and Good Pairs](https://codeforces.com/problemset/problem/2003/C) | `Codeforces` | `1200` | `turtleAndGoodPairs.js` | Key algorithmic application from Day 2026-10-20. |
| [Misha and Changing Handles](https://codeforces.com/problemset/problem/501/B) | `Codeforces` | `1100` | `mishaAndChangingHandles.js` | Key algorithmic application from Day 2026-10-21. |
| [AccurateLee](https://codeforces.com/problemset/problem/1369/B) | `Codeforces` | `1200` | `accurateLee.js` | Key algorithmic application from Day 2026-10-22. |
| [A-B Palindrome](https://codeforces.com/problemset/problem/1512/C) | `Codeforces` | `1200` | `aBPalindrome.js` | Key algorithmic application from Day 2026-10-24. |
| [Removal of Unattractive Pairs](https://codeforces.com/problemset/problem/1907/C) | `Codeforces` | `1200` | `removalOfUnattractivePairs.js` | Key algorithmic application from Day 2026-10-24. |
| [Count Magical Substring Pairs I](https://leetcode.com/problems/count-magical-substring-pairs-i/) | `LeetCode` | `Medium` | `countMagicalSubstringPairs.js` | Adjacent substring boundary decomposition: precompute distinct character counts via 26-bit bitmasks, matching left and right distinct frequencies across split points. |
| [Count Magical Substring Pairs II](https://leetcode.com/problems/count-magical-substring-pairs-ii/) | `LeetCode` | `Hard` | `countMagicalSubstringPairsII.js` | Full linear-scale O(26N) adjacent distinct counting: maintain sorted last/first occurrence arrays of size <= 26 via insertion sort to compute interval lengths in O(1) per distinct level. |
| [Needle in a Haystack](https://codeforces.com/problemset/problem/2174/A) | `Codeforces` | `1200` | `needleInAHaystack.js` | Key algorithmic application from Day 2026-10-24. |
| [Common Prefixes](https://codeforces.com/problemset/problem/1384/A) | `Codeforces` | `1200` | `commonPrefixes.js` | Key algorithmic application from Day 2026-10-24. |
| [Kuroni and Simple Strings](https://codeforces.com/problemset/problem/1305/B) | `Codeforces` | `1200` | `kuroniAndSimpleStrings.js` | Key algorithmic application from Day 2026-10-24. |
| [Bit Flipping](https://codeforces.com/problemset/problem/1659/B) | `Codeforces` | `1300` | `bitFlipping.js` | Key algorithmic application from Day 2026-10-25. |


## 7. Common Pitfalls & Anti-Patterns
- **Regex Re-Compilation:** Creating `new RegExp(...)` inside a loop is slow. Pre-compile regexes outside loops.
- **Char Code Range:** Remember `'A'` is 65, `'a'` is 97, `'0'` is 48.
