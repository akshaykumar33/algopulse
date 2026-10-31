const fs = require('fs');
const subs = JSON.parse(fs.readFileSync('practice/days/2026-10-31/submissions.json', 'utf-8'));
const failedCC = subs.filter(s => s.platform === 'CodeChef' && !(s.verdict || '').toLowerCase().includes('correct answer') && !(s.verdict || '').toLowerCase().includes('accepted'));
console.log('Failed CodeChef count:', failedCC.length);
for (const s of failedCC) {
  const v = (s.verdict || '').split('\n')[0];
  console.log(`${s.id.padEnd(14)} | ${s.file.padEnd(25)} | verdict: ${v}`);
}

const failedLC = subs.filter(s => s.platform === 'LeetCode' && !(s.verdict || '').toLowerCase().includes('correct answer') && !(s.verdict || '').toLowerCase().includes('accepted'));
console.log('\nFailed LeetCode count:', failedLC.length);
for (const s of failedLC) {
  const v = (s.verdict || '').split('\n')[0];
  console.log(`${s.id.padEnd(14)} | ${s.file.padEnd(25)} | verdict: ${v}`);
}

