const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { nextLevel, replay, leetCodeDifficultyFor } = require('./ramp');

// n days starting 2026-09-01, each with `solved` of `total` problems solved.
function days(n, solved, total = 10, start = 1) {
  const out = [];
  for (let d = 0; d < n; d++) {
    const date = `2026-09-${String(start + d).padStart(2, '0')}`;
    for (let i = 0; i < total; i++) out.push({ date, outcome: i < solved ? 'solved' : 'unsolved' });
  }
  return out;
}

describe('nextLevel', () => {
  it('holds until a full week has been played', () => {
    assert.deepEqual(nextLevel(8, days(6, 10)).decision, 'hold');
  });
  it('promotes after a week at 70% or better', () => {
    assert.deepEqual([nextLevel(8, days(7, 7)).decision, nextLevel(8, days(7, 7)).level], ['promote', 12]);
  });
  it('holds a week below 70%', () => {
    assert.equal(nextLevel(8, days(7, 6)).decision, 'hold');
  });
  it('steps back after two days under 40%', () => {
    const r = nextLevel(8, days(2, 3));
    assert.deepEqual([r.decision, r.level], ['step_back', 4]);
  });
  it('never steps below level 0', () => {
    assert.equal(nextLevel(0, days(2, 0)).decision, 'hold');
  });
});

describe('replay', () => {
  it('promotes twice over two strong weeks, each needing a fresh week', () => {
    assert.equal(replay(0, days(13, 9)).level, 4);
    assert.equal(replay(0, days(14, 9)).level, 8);
  });
  it('steps back after a promotion only on fresh bad days', () => {
    const history = [...days(7, 9), ...days(2, 1, 10, 8)];
    const r = replay(0, history);
    assert.deepEqual([r.level, r.decision], [0, 'step_back']);
  });
});

describe('leetCodeDifficultyFor', () => {
  it('maps levels to the nearest bucket', () => {
    assert.equal(leetCodeDifficultyFor(0), 'Easy');
    assert.equal(leetCodeDifficultyFor(30), 'Medium');
    assert.equal(leetCodeDifficultyFor(60), 'Hard');
  });
});
