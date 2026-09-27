/**
 * AI configuration: secrets come from process env or the repo-root .env (gitignored);
 * the non-secret provider choice is stored in practice/ai/settings.local.json
 * (also gitignored) so the dashboard can switch providers without touching .env.
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const SETTINGS_PATH = path.join(__dirname, 'settings.local.json');

function readEnvFile() {
  const envPath = path.join(REPO_ROOT, '.env');
  if (!fs.existsSync(envPath)) return {};
  const env = {};
  for (const line of fs.readFileSync(envPath, 'utf-8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(["']?)(.*?)\2\s*$/);
    if (match) env[match[1]] = match[3].trim();
  }
  return env;
}

// Process env wins over .env, like every dotenv loader.
function env(name) {
  const v = process.env[name];
  if (v && v.trim()) return v.trim();
  return readEnvFile()[name] || null;
}

function readSettings() {
  try {
    return JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf-8'));
  } catch {
    return {};
  }
}

function writeSettings(patch) {
  const next = { ...readSettings(), ...patch };
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(next, null, 2), 'utf-8');
  return next;
}

module.exports = { REPO_ROOT, env, readSettings, writeSettings };
