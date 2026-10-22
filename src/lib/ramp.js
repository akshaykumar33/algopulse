/**
 * Adaptive difficulty, ported from Algorynth's practice-engine.
 * Tomorrow's level per platform rises after a strong week and eases off after two
 * rough days, instead of the fixed "+100 rating per week" schedule.
 */

const { ratingToLevel, levelToRating } = require('./progression');

const LEVEL_STEP = 4; // one step = 100 Codeforces rating points
const PROMOTE_THRESHOLD = 0.7;
const STEP_BACK_THRESHOLD = 0.4;
const PROMOTE_WINDOW_DAYS = 7;
const STEP_BACK_WINDOW_DAYS = 2;

const clamp = (l) => Math.min(100, Math.max(0, Math.round(l)));
const solveRate = (records) => (records.length === 0 ? 0 : records.filter((r) => r.outcome === 'solved').length / records.length);

/**
 * Decide the next level from the outcomes since the level last changed. Anchoring
 * the window at the last change means a promotion needs a full fresh week at the
 * new level, and one bad day right after a promotion cannot step back on the
 * strength of days played at the old level.
 * @param {number} currentLevel
 * @param {{date: string, outcome: 'solved'|'unsolved'}[]} history
 */
function nextLevel(currentLevel, history) {
  const byDay = new Map();
  for (const r of history) {
    if (!byDay.has(r.date)) byDay.set(r.date, []);
    byDay.get(r.date).push(r);
  }
  const days = [...byDay.keys()].sort();

  const recent = days.slice(-STEP_BACK_WINDOW_DAYS);
  if (currentLevel > 0 && recent.length === STEP_BACK_WINDOW_DAYS && recent.every((d) => solveRate(byDay.get(d)) < STEP_BACK_THRESHOLD)) {
    return {
      level: clamp(currentLevel - LEVEL_STEP),
      decision: 'step_back',
      reason: `below ${STEP_BACK_THRESHOLD * 100}% solved on each of the last ${STEP_BACK_WINDOW_DAYS} days`,
    };
  }
  if (days.length >= PROMOTE_WINDOW_DAYS) {
    const rate = solveRate(days.slice(-PROMOTE_WINDOW_DAYS).flatMap((d) => byDay.get(d)));
    if (rate >= PROMOTE_THRESHOLD) {
      return { level: clamp(currentLevel + LEVEL_STEP), decision: 'promote', reason: `${Math.round(rate * 100)}% solved over the last ${PROMOTE_WINDOW_DAYS} days` };
    }
    return { level: currentLevel, decision: 'hold', reason: `${Math.round(rate * 100)}% solved over the last ${PROMOTE_WINDOW_DAYS} days (${PROMOTE_THRESHOLD * 100}% promotes)` };
  }
  return { level: currentLevel, decision: 'hold', reason: `${days.length} of ${PROMOTE_WINDOW_DAYS} days played at this level` };
}

/**
 * Replay a platform's finished days in order, applying the rule after each day.
 * @param {number} startLevel
 * @param {{date: string, outcome: string}[]} records  finished days only
 */
function replay(startLevel, records) {
  const dates = [...new Set(records.map((r) => r.date))].sort();
  let level = startLevel;
  let windowStart = 0;
  let result = { level, decision: 'hold', reason: 'no finished days yet' };
  for (let i = 0; i < dates.length; i++) {
    const inWindow = new Set(dates.slice(windowStart, i + 1));
    result = nextLevel(level, records.filter((r) => inWindow.has(r.date)));
    if (result.level !== level) {
      level = result.level;
      windowStart = i + 1; // fresh window at the new level
    }
  }
  return { ...result, level };
}

const LEETCODE_BUCKETS = [['Easy', ratingToLevel(1000)], ['Medium', ratingToLevel(1550)], ['Hard', ratingToLevel(2100)]];
const leetCodeDifficultyFor = (level) =>
  LEETCODE_BUCKETS.reduce((best, b) => (Math.abs(b[1] - level) < Math.abs(best[1] - level) ? b : best))[0];

module.exports = { LEVEL_STEP, nextLevel, replay, leetCodeDifficultyFor, levelToRating, ratingToLevel };
