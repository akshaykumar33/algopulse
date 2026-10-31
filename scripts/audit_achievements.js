const { execSync } = require('child_process');

try {
  const query = 'query { viewer { login repositories(first: 100, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) { totalCount nodes { name isPrivate pullRequests(states: MERGED) { totalCount } } } } }';
  const out = execSync(`gh api graphql -f query="${query}"`, { encoding: 'utf-8' });
  const data = JSON.parse(out).data.viewer;
  const repos = data.repositories.nodes;
  let totalPRs = 0;
  const repoStats = [];

  for (const r of repos) {
    const c = r.pullRequests.totalCount;
    totalPRs += c;
    if (c > 0) {
      repoStats.push({ name: r.name, isPrivate: r.isPrivate, mergedPRs: c });
    }
  }

  repoStats.sort((a, b) => b.mergedPRs - a.mergedPRs);

  console.log('=== GITHUB PR AUDIT FOR ' + data.login + ' ===');
  console.log('Total Repositories with Merged PRs:', repoStats.length);
  console.log('Total Merged PRs (all repositories):', totalPRs);
  console.log('\nTop Repositories by Merged PRs:');
  for (const r of repoStats.slice(0, 15)) {
    console.log(`  - ${r.name.padEnd(28)} : ${r.mergedPRs} (${r.isPrivate ? 'private' : 'public'})`);
  }

  // Count co-authored PRs across algopulse
  const coAuthorLog = execSync('git log --grep="Co-authored-by: Akshaykumarpatil333" --oneline', { encoding: 'utf-8' });
  const coAuthorCommits = coAuthorLog.trim().split('\n').filter(Boolean).length;
  console.log('\nCo-authored commits in current repo (algopulse):', coAuthorCommits);

  // Milestone comparison
  console.log('\n=== ACHIEVEMENT TIERS & YOUR CURRENT STATUS ===');
  console.log('1. PULL SHARK:');
  console.log('   - Base   : 2 merged PRs');
  console.log('   - Bronze : 16 merged PRs');
  console.log('   - Silver : 128 merged PRs  --> YOU ARE HERE (' + totalPRs + ' merged PRs)');
  console.log('   - Gold   : 1,024 merged PRs --> NEED ' + (1024 - totalPRs) + ' MORE TO REACH GOLD!');

  console.log('\n2. PAIR EXTRAORDINAIRE:');
  console.log('   - Base   : 1 co-authored merged PR');
  console.log('   - Bronze : 10 co-authored merged PRs');
  console.log('   - Silver : 24 co-authored merged PRs');
  console.log('   - Gold   : 48 co-authored merged PRs');
} catch (e) {
  console.error('Audit error:', e.message);
}

