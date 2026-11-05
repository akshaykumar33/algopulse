const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const {
  localToday,
  resolveTargetDate,
  getDayStatus,
  updateDayStatus,
  isDayFinished,
  listDaysWithStatus,
} = require('./dayStatus');

test('localToday returns valid date string YYYY-MM-DD', () => {
  const t = localToday();
  assert.match(t, /^\d{4}-\d{2}-\d{2}$/);
});

test('resolveTargetDate prioritizes custom date or falls back to localToday', () => {
  assert.equal(resolveTargetDate('2026-11-01'), '2026-11-01');
  assert.equal(resolveTargetDate(null), localToday());
  assert.equal(resolveTargetDate(undefined), localToday());
});

test('getDayStatus handles non-existent day cleanly', () => {
  const s = getDayStatus('1999-01-01');
  assert.equal(s.status, 'NOT_INITIALIZED');
  assert.equal(s.finished, false);
  assert.equal(s.totalProblems, 0);
});

test('getDayStatus accurately assesses completed day 2026-11-04', () => {
  const s = getDayStatus('2026-11-04');
  assert.equal(s.date, '2026-11-04');
  assert.equal(s.day, 41);
  assert.equal(s.totalProblems, 99);
  assert.equal(s.solutionsCount, 99);
  assert.equal(s.verifiedCount, 99);
  assert.equal(s.submittedCount, 99);
  assert.equal(s.finished, true);
  assert.equal(s.status, 'FINISHED');
  assert.equal(isDayFinished('2026-11-04'), true);
});

test('updateDayStatus writes status.json and updates README badge', () => {
  const status = updateDayStatus('2026-11-04');
  assert.ok(status);
  assert.equal(status.finished, true);

  const statusFile = path.join(__dirname, '..', '..', 'practice', 'days', '2026-11-04', 'status.json');
  assert.ok(fs.existsSync(statusFile));
  const read = JSON.parse(fs.readFileSync(statusFile, 'utf-8'));
  assert.equal(read.finished, true);
  assert.equal(read.day, 41);

  const readme = fs.readFileSync(path.join(__dirname, '..', '..', 'practice', 'days', '2026-11-04', 'README.md'), 'utf-8');
  assert.ok(readme.includes('> **Day Status:** ✅ **FINISHED**'));
});

test('listDaysWithStatus returns array of day statuses', () => {
  const list = listDaysWithStatus();
  assert.ok(Array.isArray(list));
  assert.ok(list.length > 0);
  const day41 = list.find((d) => d.date === '2026-11-04');
  assert.ok(day41);
  assert.equal(day41.finished, true);
});

