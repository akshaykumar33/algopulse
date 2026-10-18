const fs = require('fs');
const https = require('https');
const path = require('path');

async function fetchUserStatus(handle, count = 20) {
  return new Promise((resolve, reject) => {
    const url = `https://codeforces.com/api/user.status?handle=${encodeURIComponent(handle)}&from=1&count=${count}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.status === 'OK') {
            resolve(json.result);
          } else {
            reject(new Error(json.comment || 'CF API error'));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function sync(dateStr = '2026-10-18') {
  const filePath = path.join(__dirname, 'days', dateStr, 'submissions.json');
  if (!fs.existsSync(filePath)) {
    console.error(`Submissions file not found: ${filePath}`);
    return;
  }

  const submissions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const cfSubs = submissions.filter(s => s.platform === 'Codeforces');

  try {
    const apiRecords = await fetchUserStatus('akshaykumarpatil33', 30);
    let changed = false;

    for (const sub of cfSubs) {
      const match = apiRecords.find(r => String(r.id) === String(sub.submissionId));
      if (match && match.verdict) {
        let newVerdict = match.verdict;
        if (match.verdict === 'OK') newVerdict = 'Accepted';
        else if (match.verdict === 'WRONG_ANSWER') newVerdict = `Wrong answer on test ${match.passedTestCount + 1}`;
        else if (match.verdict === 'TIME_LIMIT_EXCEEDED') newVerdict = `Time limit exceeded on test ${match.passedTestCount + 1}`;
        else if (match.verdict === 'MEMORY_LIMIT_EXCEEDED') newVerdict = `Memory limit exceeded on test ${match.passedTestCount + 1}`;

        if (sub.verdict !== newVerdict) {
          console.log(`[sync] Updating ${sub.problemId} (${sub.submissionId}): ${sub.verdict} -> ${newVerdict}`);
          sub.verdict = newVerdict;
          sub.time = `${match.timeConsumedMillis}\u00a0ms`;
          sub.memory = `${Math.round(match.memoryConsumedBytes / 1024)}\u00a0KB`;
          if (newVerdict === 'Accepted') {
            sub.success = true;
          }
          changed = true;
        }
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2), 'utf8');
      console.log(`[sync] Successfully synchronized submissions with Codeforces!`);
    } else {
      console.log(`[sync] Checked CF API: submissions are currently being evaluated in judge queue.`);
    }
  } catch (err) {
    console.warn(`[sync] Failed to fetch from CF API: ${err.message}`);
  }
}

if (require.main === module) {
  const dateArg = process.argv[2] || '2026-10-18';
  sync(dateArg);
}

module.exports = { sync };
