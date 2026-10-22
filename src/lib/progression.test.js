const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { computeProgress, levelFromXp, rankFor, xpForSolve, problemLevel } = require('./progression');

const solve = (date, platform, level = 0) => ({ date, platform, level });
const base = (over = {}) => ({ solved: [], setSizes: {}, languages: [], today: '2026-09-27', ...over });

describe('xp and levels', () => {
  it('pays more for harder problems', () => {
    assert.equal(xpForSolve(0), 10);
    assert.equal(xpForSolve(32), 26);
    assert.equal(xpForSolve(-5), 10);
  });

  it('levels up at 100, 300, 600 XP', () => {
    assert.deepEqual(levelFromXp(0), { level: 1, into: 0, span: 100 });
    assert.equal(levelFromXp(99).level, 1);
    assert.deepEqual(levelFromXp(100), { level: 2, into: 0, span: 200 });
    assert.equal(levelFromXp(299).level, 2);
    assert.equal(levelFromXp(600).level, 4);
  });

  it('maps levels to Codeforces-style ranks', () => {
    assert.equal(rankFor(1).rank.title, 'Newbie');
    assert.equal(rankFor(1).next.title, 'Pupil');
    assert.equal(rankFor(10).rank.title, 'Expert');
    assert.equal(rankFor(99).rank.title, 'Grandmaster');
    assert.equal(rankFor(99).next, null);
  });

  it('reads difficulty from ratings and LeetCode buckets', () => {
    assert.equal(problemLevel({ rating: 800 }), 0);
    assert.equal(problemLevel({ rating: 1400 }), 24);
    assert.equal(problemLevel({ difficulty: 'Easy' }), 8);
    assert.equal(problemLevel({}), 0);
  });
});

describe('computeProgress', () => {
  it('starts everyone at level 1 with nothing unlocked', () => {
    const p = computeProgress(base({ setSizes: { '2026-09-27': 30 } }));
    assert.equal(p.xp, 0);
    assert.equal(p.streak, 0);
    assert.equal(p.level.level, 1);
    assert.deepEqual(p.quests.map((q) => q.done), [false, false, false, false]);
    assert.ok(p.achievements.every((a) => !a.unlocked));
  });

  it('adds solve XP and completed quest XP, and splits out today', () => {
    const p = computeProgress(
      base({
        solved: [
          solve('2026-09-26', 'codeforces'),
          solve('2026-09-27', 'codeforces'),
          solve('2026-09-27', 'codechef'),
          solve('2026-09-27', 'leetcode'),
        ],
        setSizes: { '2026-09-26': 30, '2026-09-27': 30 },
      })
    );
    // Yesterday: 10 + warm-up 10. Today: 30 + warm-up 10 + hat-trick 25 + triple crown 40.
    assert.equal(p.xp, 20 + 105);
    assert.equal(p.xpToday, 105);
    assert.deepEqual(p.quests.filter((q) => q.done).map((q) => q.id), ['warm-up', 'hat-trick', 'triple-crown']);
    assert.equal(p.solvedToday, 3);
    assert.deepEqual(p.activity, { '2026-09-26': 1, '2026-09-27': 3 });
  });

  it('counts the current streak through yesterday until today has a solve', () => {
    const p = computeProgress(base({ solved: ['2026-09-20', '2026-09-24', '2026-09-25', '2026-09-26'].map((d) => solve(d, 'leetcode')) }));
    assert.equal(p.streak, 3);
    assert.equal(p.bestStreak, 3);
  });

  it('breaks the streak after a missed day but keeps the best one', () => {
    const dates = ['2026-09-10', '2026-09-11', '2026-09-12', '2026-09-13', '2026-09-25'];
    const p = computeProgress(base({ solved: dates.map((d) => solve(d, 'codechef')) }));
    assert.equal(p.streak, 0);
    assert.equal(p.bestStreak, 4);
    assert.equal(p.achievements.find((a) => a.id === 'warming-up').unlocked, true);
    const onFire = p.achievements.find((a) => a.id === 'on-fire');
    assert.deepEqual([onFire.unlocked, onFire.current, onFire.target], [false, 4, 7]);
  });

  it('unlocks polyglot, climber and full clear from their own facts', () => {
    const p = computeProgress(
      base({
        solved: [solve('2026-09-27', 'codeforces', 24), solve('2026-09-27', 'codeforces')],
        setSizes: { '2026-09-27': 2 },
        languages: ['javascript', 'python'],
      })
    );
    const unlocked = p.achievements.filter((a) => a.unlocked).map((a) => a.id);
    for (const id of ['first-blood', 'polyglot', 'climber', 'full-clear']) assert.ok(unlocked.includes(id), id);
    assert.equal(p.quests.find((q) => q.id === 'full-clear').done, true);
  });

  it('never marks an empty set as fully cleared', () => {
    const p = computeProgress(base({ solved: [solve('2026-09-27', 'codeforces')] }));
    const q = p.quests.find((x) => x.id === 'full-clear');
    assert.deepEqual([q.done, q.target], [false, 0]);
  });
});
