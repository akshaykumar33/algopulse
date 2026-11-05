#!/usr/bin/env node

/**
 * AlgoPulse Day Status & Lifecycle Auditing Engine
 * 
 * Inspects, audits, and records the completion status of practice days:
 * - Solutions written
 * - Test fixtures created
 * - Verified problems (README [x] marks)
 * - Platform submissions & Accepted verdicts
 * - Finished status (status.json & README badges)
 * 
 * Usage:
 *   node src/cli/dayStatus.js                  # Shows today, previous day, and last 7 days
 *   node src/cli/dayStatus.js --date YYYY-MM-DD # Details for a specific day
 *   node src/cli/dayStatus.js --all            # Shows status across all historical days
 *   node src/cli/dayStatus.js --sync-all       # Generates status.json and badges for all days
 */

const fs = require('fs');
const path = require('path');
const {
  localToday,
  getDayStatus,
  updateDayStatus,
  isDayFinished,
  resolveTargetDate,
  listDaysWithStatus,
} = require('../lib/dayStatus');

const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
};

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? null : args[i + 1];
};

const isAll = args.includes('--all');
const isSyncAll = args.includes('--sync-all');
const customDate = flag('--date') || args.find((a) => !a.startsWith('--') && /^\d{4}-\d{2}-\d{2}$/.test(a));

function printDayDetail(s) {
  const isDone = s.finished;
  const statusBadge = isDone
    ? `${C.green}${C.bold}✅ FINISHED${C.reset}`
    : s.status === 'NOT_INITIALIZED'
    ? `${C.dim}⭕ NOT INITIALIZED${C.reset}`
    : `${C.yellow}${C.bold}⏳ IN PROGRESS${C.reset}`;

  console.log(`\n${C.bold}${C.cyan}╔═════════════════════════════════════════════════════════════════════════╗${C.reset}`);
  console.log(`${C.bold}${C.cyan}║  Day ${String(s.day || '?').padEnd(4)} (${s.date}) — Status Report                                ║${C.reset}`);
  console.log(`${C.bold}${C.cyan}╚═════════════════════════════════════════════════════════════════════════╝${C.reset}`);
  console.log(`  Overall Status:   ${statusBadge}`);
  console.log(`  Total Problems:   ${s.totalProblems}`);
  console.log(`  Solutions Code:   ${s.solutionsCount} / ${s.totalProblems}`);
  console.log(`  Local Verified:   ${s.verifiedCount} / ${s.totalProblems} (${s.percentVerified}%)`);
  console.log(`  Submissions:      ${s.submittedCount} / ${s.totalProblems} (${s.percentSubmitted}%)`);
  console.log(`  Accepted (AC):    ${s.acceptedCount} / ${s.totalProblems} (${s.percentAccepted}%)`);
  if (s.dlqCount > 0) {
    console.log(`  DLQ / Failures:   ${C.red}${s.dlqCount} problem(s) in retry queue${C.reset}`);
  }

  if (s.byPlatform) {
    console.log(`\n  ${C.bold}Platform Breakdown:${C.reset}`);
    for (const [key, p] of Object.entries(s.byPlatform)) {
      console.log(
        `    • ${p.name.padEnd(12)}: Total: ${String(p.total).padStart(2)} | Sols: ${String(p.solutions).padStart(2)} | Verified: ${String(p.verified).padStart(2)} | Submitted: ${String(p.submitted).padStart(2)} | Accepted: ${String(p.accepted).padStart(2)}`
      );
    }
  }
  console.log();
}

function printSummaryTable(statuses) {
  console.log(`\n${C.bold}Date        Day    Status         Verified      Submitted     Accepted${C.reset}`);
  console.log('─'.repeat(70));
  for (const s of statuses) {
    const isDone = s.finished;
    const badge = isDone
      ? `${C.green}FINISHED   ${C.reset}`
      : s.status === 'NOT_INITIALIZED'
      ? `${C.dim}NOT INIT   ${C.reset}`
      : `${C.yellow}IN PROGRESS${C.reset}`;
    const dayStr = String(s.day || '-').padStart(3);
    const verStr = `${s.verifiedCount}/${s.totalProblems}`.padStart(10);
    const subStr = `${s.submittedCount}/${s.totalProblems}`.padStart(11);
    const accStr = `${s.acceptedCount}/${s.totalProblems}`.padStart(10);

    console.log(`${s.date}  ${dayStr}    ${badge}   ${verStr}   ${subStr}   ${accStr}`);
  }
  console.log();
}

async function main() {
  if (isSyncAll) {
    console.log(`[dayStatus] Auditing and updating status for all historical practice days ...`);
    const all = listDaysWithStatus();
    let updated = 0;
    for (const d of all) {
      updateDayStatus(d.date);
      updated++;
    }
    console.log(`[dayStatus] Successfully updated status.json and README badges for ${updated} days.`);
    return;
  }

  if (customDate) {
    const s = updateDayStatus(customDate) || getDayStatus(customDate);
    printDayDetail(s);
    return;
  }

  if (isAll) {
    const all = listDaysWithStatus();
    printSummaryTable(all);
    return;
  }

  // Default view: Show current date (today), previous day, and recent 7 days
  const today = localToday();
  const all = listDaysWithStatus();

  console.log(`\n${C.bold}${C.cyan}╔═════════════════════════════════════════════════════════════════════════╗${C.reset}`);
  console.log(`${C.bold}${C.cyan}║  ⚡ AlgoPulse Daily Progression & Finish Status Auditor                 ║${C.reset}`);
  console.log(`${C.bold}${C.cyan}╚═════════════════════════════════════════════════════════════════════════╝${C.reset}`);
  console.log(`  Local Date: ${C.bold}${today}${C.reset}`);

  // Find previous existing day
  const previousDays = all.filter((d) => d.date < today);
  const prevDay = previousDays.length > 0 ? previousDays[previousDays.length - 1] : null;

  if (prevDay) {
    const prevBadge = prevDay.finished
      ? `${C.green}FINISHED (100% verified & submitted)${C.reset}`
      : `${C.yellow}INCOMPLETE (${prevDay.verifiedCount}/${prevDay.totalProblems} verified)${C.reset}`;
    console.log(`  Previous Day: ${C.bold}${prevDay.date}${C.reset} (Day ${prevDay.day}) → ${prevBadge}`);
  }

  const todayStatus = getDayStatus(today);
  const todayBadge = todayStatus.finished
    ? `${C.green}FINISHED${C.reset}`
    : todayStatus.status === 'NOT_INITIALIZED'
    ? `${C.yellow}READY TO START (Run 'npm run pick' or 'npm run autonomous')${C.reset}`
    : `${C.yellow}IN PROGRESS (${todayStatus.verifiedCount}/${todayStatus.totalProblems} verified)${C.reset}`;
  console.log(`  Today (${today}): ${C.bold}${todayBadge}${C.reset}`);

  console.log(`\n${C.bold}Recent Days Summary:${C.reset}`);
  printSummaryTable(all.slice(-7));
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});

