/**
 * The game layer: XP, player level, rank, daily quests and achievements.
 * Ported from Algorynth's practice-engine.
 *
 * Everything is derived from practice data that already exists (verified solves with
 * their day, platform and difficulty, and the languages of accepted attempts), so
 * nothing extra is stored and the numbers can never drift from the history they
 * describe.
 */

/* ---------- difficulty scale: one 0–100 level across platforms ---------- */

const MIN_LEVEL = 0;
const MAX_LEVEL = 100;
const RATING_FLOOR = 800;
const RATING_PER_LEVEL = 25; // 100 rating points = 4 levels; Codeforces 800 = level 0

const clampLevel = (level) => Math.min(MAX_LEVEL, Math.max(MIN_LEVEL, Math.round(level)));
const ratingToLevel = (rating) => clampLevel((rating - RATING_FLOOR) / RATING_PER_LEVEL);
const levelToRating = (level) => RATING_FLOOR + clampLevel(level) * RATING_PER_LEVEL;

// LeetCode only publishes three buckets; each maps to the middle of the Codeforces band
// it usually corresponds to (Easy ≈ 800–1200, Medium ≈ 1300–1800, Hard ≈ 1900+).
const LEETCODE_LEVELS = { Easy: ratingToLevel(1000), Medium: ratingToLevel(1550), Hard: ratingToLevel(2100) };

/** A problem's level from whatever difficulty its set.json entry carries. */
function problemLevel(problem) {
  if (typeof problem.rating === 'number') return ratingToLevel(problem.rating);
  if (problem.difficulty in LEETCODE_LEVELS) return LEETCODE_LEVELS[problem.difficulty];
  return 0;
}

/* ---------- XP, levels, ranks ---------- */

/** XP for one solve: harder problems are worth more. */
const xpForSolve = (level) => 10 + Math.round(Math.max(0, level) / 2);

/** Level L starts at 50·L·(L−1) XP: 0, 100, 300, 600, 1000, … */
function levelFromXp(xp) {
  let level = 1;
  while (50 * (level + 1) * level <= xp) level++;
  const start = 50 * level * (level - 1);
  return { level, into: xp - start, span: 100 * level };
}

/** Named after Codeforces ranks, which every competitive programmer recognises. */
const RANKS = [
  { title: 'Newbie', tone: 'gray', minLevel: 1 },
  { title: 'Pupil', tone: 'green', minLevel: 3 },
  { title: 'Specialist', tone: 'cyan', minLevel: 6 },
  { title: 'Expert', tone: 'blue', minLevel: 10 },
  { title: 'Candidate Master', tone: 'violet', minLevel: 15 },
  { title: 'Master', tone: 'orange', minLevel: 20 },
  { title: 'Grandmaster', tone: 'red', minLevel: 30 },
];

function rankFor(level) {
  let index = 0;
  RANKS.forEach((r, i) => {
    if (level >= r.minLevel) index = i;
  });
  return { rank: RANKS[index], next: RANKS[index + 1] || null };
}

/* ---------- quests ---------- */

function questsFor(day) {
  const make = (id, title, description, xp, current, target) => ({
    id,
    title,
    description,
    xp,
    current: Math.min(current, target),
    target,
    done: target > 0 && current >= target,
  });
  return [
    make('warm-up', 'Warm up', 'Solve your first problem today', 10, day.solved, 1),
    make('hat-trick', 'Hat-trick', 'Solve three problems today', 25, day.solved, 3),
    make('triple-crown', 'Triple crown', 'Solve one on each platform', 40, day.platforms.size, 3),
    make('full-clear', 'Full clear', "Finish the whole day's set", 100, day.solved, day.setSize),
  ];
}

/* ---------- streaks ---------- */

function streaks(dates, today) {
  const days = new Set(dates);
  const step = (date, by) => {
    const d = new Date(`${date}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() + by);
    return d.toISOString().slice(0, 10);
  };
  let best = 0;
  for (const date of days) {
    if (days.has(step(date, -1))) continue;
    let run = 1;
    let next = step(date, 1);
    while (days.has(next)) {
      run++;
      next = step(next, 1);
    }
    best = Math.max(best, run);
  }
  // Today counts only once something is solved, so an unfinished today never breaks a streak.
  let cursor = days.has(today) ? today : step(today, -1);
  let current = 0;
  while (days.has(cursor)) {
    current++;
    cursor = step(cursor, -1);
  }
  return { current, best };
}

/* ---------- the whole picture ---------- */

/**
 * @param {{ solved: {date: string, platform: string, level: number}[],
 *           setSizes: Record<string, number>, languages: string[], today: string }} input
 */
function computeProgress(input) {
  const days = new Map();
  let xp = 0;
  let xpToday = 0;
  let hardest = -1;
  const emptyDay = (date) => ({ solved: 0, platforms: new Set(), setSize: input.setSizes[date] || 0 });

  for (const item of input.solved) {
    const day = days.get(item.date) || emptyDay(item.date);
    day.solved++;
    day.platforms.add(item.platform);
    days.set(item.date, day);
    const gain = xpForSolve(item.level);
    xp += gain;
    if (item.date === input.today) xpToday += gain;
    hardest = Math.max(hardest, item.level);
  }

  let bestDay = 0;
  let tripleCrownDays = 0;
  let fullClearDays = 0;
  for (const [date, day] of days) {
    for (const quest of questsFor(day)) {
      if (!quest.done) continue;
      xp += quest.xp;
      if (date === input.today) xpToday += quest.xp;
    }
    bestDay = Math.max(bestDay, day.solved);
    if (day.platforms.size >= 3) tripleCrownDays++;
    if (day.setSize > 0 && day.solved >= day.setSize) fullClearDays++;
  }

  const today = days.get(input.today) || emptyDay(input.today);
  const { current: streak, best: bestStreak } = streaks([...days.keys()], input.today);
  const solvedTotal = input.solved.length;
  const polyglot = ['javascript', 'python'].filter((l) => input.languages.includes(l)).length;
  const level = levelFromXp(xp);
  const { rank, next } = rankFor(level.level);

  const achievement = (a) => ({ ...a, current: Math.min(a.current, a.target), unlocked: a.current >= a.target });
  const achievements = [
    achievement({ id: 'first-blood', title: 'First blood', description: 'Solve your first problem', icon: 'sword', current: solvedTotal, target: 1 }),
    achievement({ id: 'hat-trick', title: 'Hat-trick', description: 'Solve 3 problems in one day', icon: 'target', current: bestDay, target: 3 }),
    achievement({ id: 'triple-crown', title: 'Triple crown', description: 'Solve on all three platforms in one day', icon: 'crown', current: tripleCrownDays, target: 1 }),
    achievement({ id: 'polyglot', title: 'Polyglot', description: 'Get accepted in JavaScript and Python', icon: 'translate', current: polyglot, target: 2 }),
    achievement({ id: 'warming-up', title: 'Warming up', description: 'Keep a 3-day streak', icon: 'fire-simple', current: bestStreak, target: 3 }),
    achievement({ id: 'on-fire', title: 'On fire', description: 'Keep a 7-day streak', icon: 'fire', current: bestStreak, target: 7 }),
    achievement({ id: 'unstoppable', title: 'Unstoppable', description: 'Keep a 30-day streak', icon: 'lightning', current: bestStreak, target: 30 }),
    achievement({ id: 'ten-down', title: 'Ten down', description: 'Solve 10 problems', icon: 'sparkle', current: solvedTotal, target: 10 }),
    achievement({ id: 'century', title: 'Century', description: 'Solve 100 problems', icon: 'trophy', current: solvedTotal, target: 100 }),
    achievement({ id: 'climber', title: 'Climber', description: 'Solve a problem rated 1400 or harder', icon: 'mountains', current: hardest >= 24 ? 1 : 0, target: 1 }),
    achievement({ id: 'full-clear', title: 'Full clear', description: "Finish a whole day's set", icon: 'medal', current: fullClearDays, target: 1 }),
  ];

  const activity = {};
  for (const [date, day] of days) activity[date] = day.solved;

  return {
    xp,
    xpToday,
    level,
    rank,
    nextRank: next,
    streak,
    bestStreak,
    solvedTotal,
    solvedToday: today.solved,
    quests: questsFor(today),
    achievements,
    activity,
  };
}

module.exports = {
  ratingToLevel,
  levelToRating,
  problemLevel,
  xpForSolve,
  levelFromXp,
  RANKS,
  rankFor,
  computeProgress,
};
