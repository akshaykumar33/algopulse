const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const date = '2026-10-31';

const cf1 = ['elaSFitnessAndTheLuxuryNumber','subsetMultiplication','studentsInRailwayCarriage','garbageDisposal','funkyNumbers','qualifyingContest','iceSculptures','permutationOperations','absoluteCinema','reachMedian','ohThosePalindromes','findThePermutation','booksExchangeHardVersion','whereDoITurn','forecast','positionInFraction','cloningToys'];
const cf2 = ['dashaAndFriends','misterBAndAngleInPolygon','archer','blueRedPermutation','queriesAboutLessOrEqualElements','increasingSubsequenceEasyVersion','makeAPowerOfTwo','stringsOfPower','aliceSAdventuresInPermuting','pINCodes','trinity','poloThePenguinAndMatrix','absoluteSorting','flamingoesOfMystery','soldierAndCards','valhallaSiege'];

const lc1 = ['topKFrequentElements','insertInterval','minimumTimeDifference','numberOfLongestIncreasingSubsequence','designTwitter','perfectSquares','surroundedRegions','lowestCommonAncestorOfABinarySearchTree','editDistance','stringCompression','canIWin','findRightInterval','reverseWordsInAString','courseSchedule','minimumMovesToEqualArrayElementsII','numberOfIslands','treeNode'];
const lc2 = ['contiguousArray','addTwoNumbers','binaryTreeLevelOrderTraversal','longestAbsoluteFilePath','exclusiveTimeOfFunctions','convertBSTToGreaterTree','combinationSumIV','numberOfProvinces','longestWordInDictionaryThroughDeleting','multiplyStrings','superUglyNumber','findTheDuplicateNumber','setMatrixZeroes','findDuplicateFileInSystem','rotateFunction','hIndexII'];

const cc1 = ['chefAndDolls','maximumORMinimum','unlockTheSafe','chefAndSecretIngredients','campOrNot','differenceMatrix','modeOfFrequencies','primeFactorisationOfNumbers','partitionScore','khaledInHIT','buttonPairs','origin','chefAndBabla','catsAndDogs','similarHeights','ratInMaze','markAll'];
const cc2 = ['exactMarks','couponSystem','daysInMonth','sadSplits','falseNumber','subtractionGame1','greedyPuppy','adaAndTheStaircase','deletionAndDifference','makeAnAP','chefAndSecretIngredient','toyBoxes','chefAndDigitsOfANumber','makeOdd','pintuAndFruits','theMinimumNumberOfMoves'];

const knowledgeFiles = [
  'knowledge/binary-search.md',
  'knowledge/brute-force.md',
  'knowledge/constructive-algorithms.md',
  'knowledge/data-structures.md',
  'knowledge/dynamic-programming.md',
  'knowledge/game-theory.md',
  'knowledge/greedy.md',
  'knowledge/implementation.md',
  'knowledge/math.md',
  'knowledge/number-theory.md',
  'knowledge/sorting.md',
  'knowledge/strings.md',
  'knowledge/trees-and-graphs.md',
  'knowledge/two-pointers.md'
];

function makeFiles(names, types) {
  const res = [];
  for (const n of names) {
    if (types.includes('sol')) res.push(`practice/days/${date}/solutions/${n}.js`);
    if (types.includes('test')) res.push(`practice/days/${date}/tests/${n}.json`);
    if (types.includes('exp')) res.push(`practice/days/${date}/explanations/${n}.md`);
  }
  return res;
}

const batches = [
  {
    branch: 'feat/day37-lc-part2',
    title: 'feat(day37): add LeetCode solutions and tests (part 2)',
    body: 'Add reference solutions and unit test suites for remaining 16 LeetCode problems of Day 37.',
    verify: '`node src/cli/verify.js 2026-10-31 --ref --platform leetcode` (100% green)',
    files: makeFiles(lc2, ['sol', 'test']),
  },
  {
    branch: 'feat/day37-cc-part1',
    title: 'feat(day37): add CodeChef solutions and tests (part 1)',
    body: 'Add reference solutions and unit test suites for first 17 CodeChef problems of Day 37.',
    verify: '`node src/cli/verify.js 2026-10-31 --ref --platform codechef` (100% green)',
    files: makeFiles(cc1, ['sol', 'test']),
  },
  {
    branch: 'feat/day37-cc-part2',
    title: 'feat(day37): add CodeChef solutions and tests (part 2)',
    body: 'Add reference solutions and unit test suites for remaining 16 CodeChef problems of Day 37.',
    verify: '`node src/cli/verify.js 2026-10-31 --ref --platform codechef` (100% green)',
    files: makeFiles(cc2, ['sol', 'test']),
  },
  {
    branch: 'docs/day37-explanations-cf',
    title: 'docs(day37): add Codeforces problem explanations',
    body: 'Add 33 detailed algorithmic explanations and complexity breakdowns for Day 37 Codeforces problems.',
    verify: 'Markdown documentation and diagrams audit.',
    files: makeFiles([...cf1, ...cf2], ['exp']),
  },
  {
    branch: 'docs/day37-explanations-lc',
    title: 'docs(day37): add LeetCode problem explanations',
    body: 'Add 33 detailed algorithmic explanations and complexity breakdowns for Day 37 LeetCode problems.',
    verify: 'Markdown documentation and diagrams audit.',
    files: makeFiles([...lc1, ...lc2], ['exp']),
  },
  {
    branch: 'docs/day37-explanations-cc',
    title: 'docs(day37): add CodeChef problem explanations and curriculum manifest',
    body: 'Add 33 detailed algorithmic explanations for Day 37 CodeChef problems along with Day 37 README and set.json.',
    verify: 'Markdown documentation and manifests audit.',
    files: [...makeFiles([...cc1, ...cc2], ['exp']), `practice/days/${date}/README.md`, `practice/days/${date}/set.json`, 'scripts/ship_day37.js'],
  },
  {
    branch: 'docs/sync-knowledge-day37',
    title: 'docs(knowledge): sync knowledge base catalogs for Day 37',
    body: 'Synchronize 14 algorithmic topic catalogs in knowledge base with Day 37 solved problems and takeaways.',
    verify: '`node src/cli/knowledge.js --sync` (clean catalog audit)',
    files: knowledgeFiles,
  },
];

function runCmd(cmd) {
  console.log(`[exec] ${cmd}`);
  return execSync(cmd, { encoding: 'utf-8', stdio: ['inherit', 'pipe', 'inherit'] });
}

async function ship() {
  console.log(`=== Shipping Remaining Day 37 Batches (${batches.length} batches, <= 50 files/PR) ===\n`);

  for (let i = 0; i < batches.length; i++) {
    const b = batches[i];
    console.log(`\n======================================================`);
    console.log(`[Batch ${i + 1}/${batches.length}] ${b.branch} (${b.files.length} files)`);
    console.log(`======================================================`);

    if (b.files.length > 50) {
      throw new Error(`CRITICAL: Batch ${b.branch} has ${b.files.length} files, exceeding limit of 50!`);
    }

    // Checkout new branch from main
    runCmd(`git checkout -b ${b.branch}`);

    // Stage files
    for (const f of b.files) {
      runCmd(`git add "${f}"`);
    }

    // Verify staged count
    const stagedOutput = execSync('git diff --name-only --cached', { encoding: 'utf-8' }).trim();
    const stagedFiles = stagedOutput ? stagedOutput.split('\n').filter(Boolean) : [];
    console.log(`[staged] Count: ${stagedFiles.length}`);

    if (stagedFiles.length === 0) {
      console.log(`[skip] No files staged for ${b.branch}, moving back to main...`);
      runCmd('git checkout main');
      continue;
    }

    if (stagedFiles.length > 50) {
      throw new Error(`CRITICAL: Staged count ${stagedFiles.length} exceeds 50!`);
    }

    // Commit
    const commitMsg = `${b.title}\n\n${b.body}\n\nCo-authored-by: Akshaykumarpatil333 <123820292+Akshaykumarpatil333@users.noreply.github.com>`;
    fs.writeFileSync('.commit_msg.tmp', commitMsg, 'utf-8');
    runCmd(`git commit -F .commit_msg.tmp`);
    if (fs.existsSync('.commit_msg.tmp')) fs.unlinkSync('.commit_msg.tmp');

    // Push
    runCmd(`git push -u origin ${b.branch}`);

    // Create PR
    const prBody = `## What\n${b.title}\n\n## Why\nDaily practice curriculum with <= 50 files/PR segregation.\n\n## How to verify\n${b.verify}`;
    fs.writeFileSync('.pr_body.tmp', prBody, 'utf-8');
    const prOut = execSync(`gh pr create --base main --head ${b.branch} --title "${b.title}" --body-file .pr_body.tmp`, { encoding: 'utf-8' }).trim();
    if (fs.existsSync('.pr_body.tmp')) fs.unlinkSync('.pr_body.tmp');
    console.log(`[PR] Created: ${prOut}`);

    // Merge PR via merge commit
    console.log(`[PR] Merging via merge commit ...`);
    runCmd(`gh pr merge ${b.branch} --merge`);
    console.log(`[PR] Merged successfully!`);

    // Clean any line ending noise on branch
    try {
      execSync('git checkout -- practice/days/2026-10-31/solutions practice/days/2026-10-31/tests practice/days/2026-10-31/explanations', { stdio: 'ignore' });
    } catch {}

    // Switch to main and pull
    runCmd('git checkout main');
    try {
      execSync('git checkout -- practice/days/2026-10-31/solutions practice/days/2026-10-31/tests practice/days/2026-10-31/explanations', { stdio: 'ignore' });
    } catch {}
    runCmd('git pull --ff-only origin main');
  }

  console.log(`\n🎉 All remaining Day 37 PR batches successfully shipped and merged into main!`);
}

ship().catch((err) => {
  console.error('Ship failed:', err);
  process.exit(1);
});
