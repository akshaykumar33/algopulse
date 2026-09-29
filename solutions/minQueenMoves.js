/**
 * Problem: Minimum Queen Moves to Reach Target (LeetCode Easy - 3 pt)
 * 
 * Objective:
 * Given a source position [sr, sc] and target position [tr, tc] on an 8 x 8 empty chessboard,
 * return the minimum number of queen moves required to land on the target.
 * 
 * Logic & Complexity:
 * - 0 moves: source === target
 * - 1 move: source and target share the same row (sr === tr), same column (sc === tc),
 *   or same diagonal (|sr - tr| === |sc - tc|).
 * - 2 moves: Any other cell can always be reached in at most 2 moves on an empty board
 *   (e.g., move along row to (sr, tc), then along column to (tr, tc)).
 * 
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} source
 * @param {number[]} target
 * @return {number}
 */
var minQueenMoves = function(source, target) {
  const [sr, sc] = source;
  const [tr, tc] = target;

  if (sr === tr && sc === tc) {
    return 0;
  }

  if (sr === tr || sc === tc || Math.abs(sr - tr) === Math.abs(sc - tc)) {
    return 1;
  }

  return 2;
};

// ============================================================================
// Local Test Harness (run via `node run minQueenMoves` or `node minQueenMoves.js`)
// ============================================================================

if (require.main === module) {
  const fs = require('fs');

  const testCases = [
    { source: [8, 1], target: [1, 8], expected: 1 },
    { source: [4, 2], target: [1, 3], expected: 2 },
    { source: [1, 1], target: [1, 1], expected: 0 },
  ];

  let inputData = '';
  try {
    if (!process.stdin.isTTY) {
      inputData = fs.readFileSync(0, 'utf-8').trim();
    }
  } catch (_) {}

  if (inputData.length > 0) {
    const lines = inputData.split(/\r?\n/).filter(line => line.trim().length > 0);
    let i = 0;
    while (i < lines.length) {
      const line = lines[i].trim();
      try {
        const parsed = JSON.parse(line);
        if (Array.isArray(parsed) && parsed.length === 2 && Array.isArray(parsed[0]) && Array.isArray(parsed[1])) {
          console.log(minQueenMoves(parsed[0], parsed[1]));
          i++;
        } else if (Array.isArray(parsed) && parsed.length === 2 && typeof parsed[0] === 'number') {
          if (i + 1 < lines.length) {
            const nextParsed = JSON.parse(lines[i + 1].trim());
            console.log(minQueenMoves(parsed, nextParsed));
            i += 2;
          } else {
            i++;
          }
        } else {
          i++;
        }
      } catch (_) {
        const tokens = line.split(/\s+/).map(Number);
        if (tokens.length >= 4) {
          console.log(minQueenMoves([tokens[0], tokens[1]], [tokens[2], tokens[3]]));
        }
        i++;
      }
    }
  } else {
    console.log(`Running ${testCases.length} sample test cases...\n`);
    let passed = 0;
    testCases.forEach((tc, idx) => {
      const actual = minQueenMoves(tc.source, tc.target);
      const isMatch = actual === tc.expected;
      if (isMatch) {
        passed++;
        console.log(`[PASS] Test #${idx + 1}: source=[${tc.source}], target=[${tc.target}] => expected ${tc.expected}, got ${actual}`);
      } else {
        console.log(`[FAIL] Test #${idx + 1}: source=[${tc.source}], target=[${tc.target}] => expected ${tc.expected}, got ${actual}`);
      }
    });
    console.log(`\nResults: ${passed}/${testCases.length} tests passed.`);
  }
}
