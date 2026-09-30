/**
 * Playwright Automation Configuration for Competitive Programming Platforms
 * Supports Codeforces, LeetCode, and CodeChef.
 */

const path = require('path');
const fs = require('fs');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const AUTH_DIR = path.join(REPO_ROOT, '.auth');
const PRACTICE_DAYS_DIR = path.join(REPO_ROOT, 'practice', 'days');

const SYSTEM_CHROME_USER_DATA_DIR = path.join(
  process.env.LOCALAPPDATA || 'C:\\Users\\AKKIE\\AppData\\Local',
  'Google',
  'Chrome',
  'User Data'
);
const PERSISTENT_CHROME_PROFILE_DIR = path.join(AUTH_DIR, 'chrome-profile');

// Ensure .auth directory exists
if (!fs.existsSync(AUTH_DIR)) {
  fs.mkdirSync(AUTH_DIR, { recursive: true });
}

// Available platform configurations
const PLATFORMS = {
  codeforces: {
    name: 'Codeforces',
    alias: ['cf', 'codeforces'],
    baseUrl: 'https://codeforces.com',
    loginUrl: 'https://codeforces.com/enter',
    authFile: path.join(AUTH_DIR, 'codeforces.json'),
    language: 'Node.js', // Target language
    // Match programTypeId for Node.js (typically 55 or similar)
    languagePattern: /node\.?js|javascript/i,
  },
  leetcode: {
    name: 'LeetCode',
    alias: ['lc', 'leetcode'],
    baseUrl: 'https://leetcode.com',
    loginUrl: 'https://leetcode.com/accounts/login/',
    authFile: path.join(AUTH_DIR, 'leetcode.json'),
    language: 'JavaScript',
  },
  codechef: {
    name: 'CodeChef',
    alias: ['cc', 'codechef'],
    baseUrl: 'https://www.codechef.com',
    loginUrl: 'https://www.codechef.com/login',
    authFile: path.join(AUTH_DIR, 'codechef.json'),
    language: 'JavaScript (Node.js)',
    languageCode: 'NODEJS',
  },
};

/**
 * Detects the best available browser channel on the current system
 */
function getBrowserChannel() {
  const isWindows = process.platform === 'win32';
  if (isWindows) {
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
    if (fs.existsSync(chromePath)) return 'chrome';
    if (fs.existsSync(edgePath)) return 'msedge';
  }
  return undefined; // Fall back to bundled chromium
}

module.exports = {
  REPO_ROOT,
  AUTH_DIR,
  PRACTICE_DAYS_DIR,
  SYSTEM_CHROME_USER_DATA_DIR,
  PERSISTENT_CHROME_PROFILE_DIR,
  PLATFORMS,
  getBrowserChannel,
};
