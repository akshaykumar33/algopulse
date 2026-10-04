/**
 * Competitive Programming Knowledge Base Engine & Manager
 * 
 * Provides automated synchronization, auditing, and indexing for the repository's
 * algorithmic Knowledge Base (knowledge/).
 * 
 * Commands:
 *   node practice/knowledge              - Audit knowledge base & show coverage matrix
 *   node practice/knowledge --sync       - Sync problem references across tag files and README.md
 *   node practice/knowledge --add <file> - Add a problem to corresponding knowledge base tag files
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const KNOWLEDGE_DIR = path.join(REPO_ROOT, 'knowledge');
const DAYS_DIR = path.join(__dirname, 'days');
const SOLUTIONS_DIR = path.join(REPO_ROOT, 'solutions');

// Standard tag normalization mapping to canonical knowledge file slugs
const TAG_SLUG_MAP = {
  'greedy': 'greedy',
  'math': 'math',
  'number theory': 'number-theory',
  'number-theory': 'number-theory',
  'two pointers': 'two-pointers',
  'two-pointers': 'two-pointers',
  'dp': 'dynamic-programming',
  'dynamic programming': 'dynamic-programming',
  'dynamic-programming': 'dynamic-programming',
  'strings': 'strings',
  'string': 'strings',
  'binary search': 'binary-search',
  'binary-search': 'binary-search',
  'bitmasks': 'bitmasks',
  'bit manipulation': 'bitmasks',
  'bits': 'bitmasks',
  'constructive algorithms': 'constructive-algorithms',
  'constructive-algorithms': 'constructive-algorithms',
  'constructive': 'constructive-algorithms',
  'data structures': 'data-structures',
  'data-structures': 'data-structures',
  'trees': 'trees-and-graphs',
  'graphs': 'trees-and-graphs',
  'trees-and-graphs': 'trees-and-graphs',
  'games': 'game-theory',
  'game theory': 'game-theory',
  'game-theory': 'game-theory',
  'sortings': 'sorting',
  'sorting': 'sorting',
  'brute force': 'brute-force',
  'brute-force': 'brute-force',
  'implementation': 'implementation',
  'geometry': 'math',
  'matrices': 'constructive-algorithms',
  'expression parsing': 'strings',
  'algorithms': 'implementation',
  'combinatorics': 'math',
  'dfs and similar': 'trees-and-graphs',
  'dfs-and-similar': 'trees-and-graphs',
  'ternary search': 'binary-search',
  'ternary-search': 'binary-search',
  '*special': 'implementation',
  'codechef': 'implementation'
};

function normalizeTag(rawTag) {
  if (!rawTag) return 'implementation';
  const clean = String(rawTag).toLowerCase().trim();
  return TAG_SLUG_MAP[clean] || clean.replace(/\s+/g, '-');
}

function loadAllPracticeProblems() {
  const problems = new Map();
  if (!fs.existsSync(DAYS_DIR)) return problems;

  const days = fs.readdirSync(DAYS_DIR).filter((d) => fs.existsSync(path.join(DAYS_DIR, d, 'set.json'))).sort();
  for (const day of days) {
    const setPath = path.join(DAYS_DIR, day, 'set.json');
    try {
      const set = JSON.parse(fs.readFileSync(setPath, 'utf-8'));
      for (const p of set.problems || []) {
        if (!problems.has(p.file)) {
          let platform = p.platform;
          if (!platform) {
            if (p.url && p.url.includes('leetcode.com')) platform = 'LeetCode';
            else if (p.url && p.url.includes('codechef.com')) platform = 'CodeChef';
            else platform = 'Codeforces';
          }
          problems.set(p.file, { ...p, platform, day });
        }
      }
    } catch {
      // skip invalid JSON
    }
  }
  return problems;
}

function listKnowledgeFiles() {
  if (!fs.existsSync(KNOWLEDGE_DIR)) return [];
  return fs
    .readdirSync(KNOWLEDGE_DIR)
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .map((f) => f.replace(/\.md$/, ''));
}

function auditKnowledgeBase() {
  console.log('===============================================================');
  console.log('   🧠 Algorithmic Knowledge Base — Coverage & Audit Report      ');
  console.log('===============================================================');

  const files = listKnowledgeFiles();
  const problems = loadAllPracticeProblems();

  // Aggregate problems by canonical tag slug
  const tagCounts = new Map();
  for (const p of problems.values()) {
    const tags = p.tags && p.tags.length ? p.tags : ['implementation'];
    for (const t of tags) {
      const slug = normalizeTag(t);
      if (!tagCounts.has(slug)) tagCounts.set(slug, []);
      tagCounts.get(slug).push(p);
    }
  }

  console.log(`Knowledge Base Location: ${KNOWLEDGE_DIR}`);
  console.log(`Knowledge Topic Guides:  ${files.length} guides`);
  console.log(`Total Practice Problems: ${problems.size} problems\n`);

  console.log('Tag / Topic Guide Coverage:');
  console.log('---------------------------------------------------------------');
  console.log('Topic Slug'.padEnd(25) + 'File Exists?'.padEnd(15) + 'Referenced Problems');
  console.log('---------------------------------------------------------------');

  const allSlugs = new Set([...files, ...tagCounts.keys()]);
  const sortedSlugs = Array.from(allSlugs).sort();

  let coveredCount = 0;
  for (const slug of sortedSlugs) {
    const exists = files.includes(slug);
    if (exists) coveredCount++;
    const count = (tagCounts.get(slug) || []).length;
    const status = exists ? '✅ Yes' : '⚠️ Missing';
    console.log(slug.padEnd(25) + status.padEnd(15) + `${count} problems`);
  }

  console.log('---------------------------------------------------------------');
  console.log(`Coverage Summary: ${coveredCount} of ${sortedSlugs.length} topics documented.\n`);
  console.log('Quick commands:');
  console.log('  node practice/knowledge --sync       Update index & problem catalog');
  console.log('  node practice/knowledge --add <file> Add problem to its tag guides');
  console.log('===============================================================\n');
}

function addProblemToKnowledgeFile(fileSlug, problem) {
  const filePath = path.join(KNOWLEDGE_DIR, `${fileSlug}.md`);
  if (!fs.existsSync(filePath)) {
    console.warn(`[knowledge] Guide file not found: knowledge/${fileSlug}.md`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  // Check if problem already listed in the catalog
  if (content.includes(`\`${problem.file}.js\``) || content.includes(problem.name)) {
    return false; // already present
  }

  const catalogHeader = '## 6. Solved Problems Catalog & Takeaways';
  if (!content.includes(catalogHeader)) {
    return false;
  }

  const lines = content.split(/\r?\n/);
  const headerIdx = lines.findIndex((l) => l.trim() === catalogHeader);
  if (headerIdx === -1) return false;

  // Find next section header (e.g. ## 7.)
  let nextSectionIdx = lines.findIndex((l, i) => i > headerIdx && /^## \d\./.test(l.trim()));
  if (nextSectionIdx === -1) nextSectionIdx = lines.length;

  // Find last line starting with '|' between headerIdx and nextSectionIdx
  let lastTableRowIdx = -1;
  for (let i = headerIdx + 1; i < nextSectionIdx; i++) {
    if (lines[i].trim().startsWith('|')) {
      lastTableRowIdx = i;
    }
  }

  const row = `| [${problem.name}](${problem.url}) | \`${problem.platform}\` | \`${problem.rating}\` | \`${problem.file}.js\` | Key algorithmic application from Day ${problem.day}. |`;

  if (lastTableRowIdx !== -1) {
    // Append directly below the last table row
    lines.splice(lastTableRowIdx + 1, 0, row);
  } else {
    // No table exists yet: insert table with header
    const tableHeader = [
      '',
      '| Problem | Platform | Rating | Solution File | Core Insight / Takeaway |',
      '|---|---|---|---|---|',
      row,
      ''
    ];
    lines.splice(headerIdx + 1, 0, ...tableHeader);
  }

  fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
  return true;
}

function syncKnowledgeBase() {
  console.log('[knowledge] Synchronizing Knowledge Base catalogs...');
  const problems = loadAllPracticeProblems();
  const files = listKnowledgeFiles();

  let additions = 0;
  for (const p of problems.values()) {
    const tags = p.tags && p.tags.length ? p.tags : ['implementation'];
    for (const t of tags) {
      const slug = normalizeTag(t);
      if (files.includes(slug)) {
        const added = addProblemToKnowledgeFile(slug, p);
        if (added) {
          console.log(`  + Linked [${p.name}] -> knowledge/${slug}.md`);
          additions++;
        }
      }
    }
  }

  console.log(`[knowledge] Synchronization complete. ${additions} problem references updated.`);
}

function addSpecificProblem(problemFile, customTags = []) {
  const problems = loadAllPracticeProblems();
  let problem = problems.get(problemFile);

  if (!problem) {
    // Check solutions folder
    const solPath = path.join(SOLUTIONS_DIR, `${problemFile}.js`);
    if (!fs.existsSync(solPath)) {
      console.error(`[knowledge] Solution file not found: solutions/${problemFile}.js`);
      process.exit(1);
    }
    problem = {
      file: problemFile,
      name: problemFile,
      platform: 'General',
      rating: 'N/A',
      url: '#',
      day: 'N/A',
      tags: customTags.length ? customTags : ['implementation']
    };
  } else if (customTags.length) {
    problem.tags = [...new Set([...(problem.tags || []), ...customTags])];
  }

  const tags = problem.tags && problem.tags.length ? problem.tags : ['implementation'];
  console.log(`[knowledge] Adding [${problem.name}] with tags: ${tags.join(', ')}`);

  for (const t of tags) {
    const slug = normalizeTag(t);
    const added = addProblemToKnowledgeFile(slug, problem);
    if (added) {
      console.log(`  ✅ Added to knowledge/${slug}.md`);
    } else {
      console.log(`  · Already present or guide missing for knowledge/${slug}.md`);
    }
  }
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes('--sync')) {
    syncKnowledgeBase();
  } else if (args.includes('--add')) {
    const target = args[args.indexOf('--add') + 1];
    if (!target) {
      console.error('Error: specify problem file name to add: --add <problemFile>');
      process.exit(1);
    }
    const extraTags = args.slice(args.indexOf('--add') + 2).filter((a) => !a.startsWith('--'));
    addSpecificProblem(target, extraTags);
  } else {
    auditKnowledgeBase();
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  normalizeTag,
  listKnowledgeFiles,
  addProblemToKnowledgeFile,
  loadAllPracticeProblems,
  TAG_SLUG_MAP
};
