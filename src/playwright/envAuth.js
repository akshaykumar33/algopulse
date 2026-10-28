/**
 * Environment-driven Auth Sync for Playwright Submitters
 * Dynamically syncs platform session cookies from .env file into .auth/*.json files.
 * Zero hardcoded secret values or hashes.
 */

const fs = require('fs');
const path = require('path');
const { PLATFORMS, REPO_ROOT } = require('./config');

function parseEnvFile() {
  const envPath = path.join(REPO_ROOT, '.env');
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf-8');
  const env = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[key] = val;
    }
  }
  return env;
}

function getExistingCookieName(authFilePath, pattern, defaultName) {
  if (fs.existsSync(authFilePath)) {
    try {
      const data = JSON.parse(fs.readFileSync(authFilePath, 'utf-8'));
      const existing = (data.cookies || []).find((c) => pattern.test(c.name));
      if (existing) return existing.name;
    } catch {}
  }
  return defaultName;
}

function syncSessionsFromEnv() {
  const env = parseEnvFile();
  const results = {};

  // 1. CodeChef
  const ccSession = env.CODECHEF_SESSION || process.env.CODECHEF_SESSION;
  if (ccSession && ccSession.trim()) {
    let cookieName = getExistingCookieName(PLATFORMS.codechef.authFile, /^sess|authtoken|remember_me/i, 'SESS');
    let cookieValue = ccSession.trim();
    if (ccSession.includes('=')) {
      const parts = ccSession.split('=');
      cookieName = parts[0].trim();
      cookieValue = parts.slice(1).join('=').trim();
    }
    if (cookieValue) {
      updateAuthFile(PLATFORMS.codechef.authFile, [
        {
          name: cookieName,
          value: cookieValue,
          domain: '.codechef.com',
          path: '/',
          expires: 2000000000,
          httpOnly: true,
          secure: true,
          sameSite: 'Lax',
        },
      ]);
      results.codechef = true;
    }
  }

  // 2. LeetCode
  const lcSession = env.LEETCODE_SESSION || process.env.LEETCODE_SESSION;
  if (lcSession && lcSession.trim()) {
    let cookieValue = lcSession.trim();
    if (lcSession.includes('LEETCODE_SESSION=')) {
      cookieValue = lcSession.split('LEETCODE_SESSION=')[1].split(';')[0].trim();
    }
    if (cookieValue) {
      const newCookies = [
        {
          name: 'LEETCODE_SESSION',
          value: cookieValue,
          domain: '.leetcode.com',
          path: '/',
          expires: 2000000000,
          httpOnly: true,
          secure: true,
          sameSite: 'Lax',
        },
      ];
      try {
        const parts = cookieValue.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
          if (Array.isArray(payload.device_with_ip) && payload.device_with_ip[0]) {
            newCookies.push({
              name: 'uuuserid',
              value: payload.device_with_ip[0],
              domain: 'leetcode.com',
              path: '/',
              expires: 2000000000,
              httpOnly: false,
              secure: true,
              sameSite: 'Lax',
            });
          }
        }
      } catch {}
      updateAuthFile(PLATFORMS.leetcode.authFile, newCookies);
      results.leetcode = true;
    }
  }

  // 3. Codeforces
  const cfSession = env.CODEFORCES_SESSION || process.env.CODEFORCES_SESSION;
  if (cfSession && cfSession.trim()) {
    let cookieName = getExistingCookieName(PLATFORMS.codeforces.authFile, /39af5|39ce7/i, '39af5');
    let cookieValue = cfSession.trim();
    if (cfSession.includes('=')) {
      const parts = cfSession.split('=');
      cookieName = parts[0].trim();
      cookieValue = parts.slice(1).join('=').trim();
    }
    if (cookieValue) {
      updateAuthFile(PLATFORMS.codeforces.authFile, [
        {
          name: cookieName,
          value: cookieValue,
          domain: '.codeforces.com',
          path: '/',
          expires: 2000000000,
          httpOnly: true,
          secure: true,
          sameSite: 'Lax',
        },
      ]);
      results.codeforces = true;
    }
  }

  return results;
}

function updateAuthFile(authFilePath, newCookies) {
  let data = { cookies: [], origins: [] };
  if (fs.existsSync(authFilePath)) {
    try {
      data = JSON.parse(fs.readFileSync(authFilePath, 'utf-8'));
    } catch {}
  }

  const existingCookies = data.cookies || [];
  for (const newC of newCookies) {
    const idx = existingCookies.findIndex((c) => c.name === newC.name);
    if (idx !== -1) {
      existingCookies[idx] = { ...existingCookies[idx], ...newC };
    } else {
      existingCookies.push(newC);
    }
  }

  data.cookies = existingCookies;
  fs.mkdirSync(path.dirname(authFilePath), { recursive: true });
  fs.writeFileSync(authFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = {
  syncSessionsFromEnv,
  parseEnvFile,
};
