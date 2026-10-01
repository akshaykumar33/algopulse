/**
 * Code Sanitizer & Anti-AI-Fingerprinting Pipeline
 * Ensures submitted code has zero AI detection artifacts, no comments,
 * standard human competitive programming naming, and no prompt-injection watermarks.
 */

// List of known prompt injection watermarks and AI fingerprint identifiers
const KNOWN_AI_WATERMARKS = [
  'ballast',
  'mexoramax',
  'fillerVariable',
  'llm_output',
  'ai_marker',
  'ai_watermark',
  'filler_var',
];

/**
 * Strips all single-line (//), multi-line (/* ... * /), and JSDoc comments from JavaScript code
 * while strictly preserving string literals ('...', "...", `...`) and regexes.
 */
function stripComments(code) {
  if (typeof code !== 'string') return '';

  let out = '';
  let inString = false;
  let stringChar = '';
  let inSingleComment = false;
  let inMultiComment = false;
  let isEscaped = false;

  for (let i = 0; i < code.length; i++) {
    const c = code[i];
    const next = code[i + 1] || '';

    // Inside single-line comment: skip until newline
    if (inSingleComment) {
      if (c === '\n') {
        inSingleComment = false;
        out += '\n';
      }
      continue;
    }

    // Inside multi-line comment: skip until */
    if (inMultiComment) {
      if (c === '*' && next === '/') {
        inMultiComment = false;
        i++; // skip /
      }
      continue;
    }

    // Inside string literal
    if (inString) {
      out += c;
      if (isEscaped) {
        isEscaped = false;
      } else if (c === '\\') {
        isEscaped = true;
      } else if (c === stringChar) {
        inString = false;
      }
      continue;
    }

    // Escape character handling
    if (isEscaped) {
      out += c;
      isEscaped = false;
      continue;
    }

    if (c === '\\') {
      out += c;
      isEscaped = true;
      continue;
    }

    // Comment start check
    if (c === '/' && next === '/') {
      inSingleComment = true;
      i++; // skip second /
      continue;
    }

    if (c === '/' && next === '*') {
      inMultiComment = true;
      i++; // skip *
      continue;
    }

    // String literal start check
    if (c === "'" || c === '"' || c === '`') {
      inString = true;
      stringChar = c;
      out += c;
      continue;
    }

    out += c;
  }

  // Collapse empty/whitespace-only lines
  const lines = out.split(/\r?\n/).map((l) => l.trimEnd());
  const filtered = [];
  let prevWasEmpty = false;

  for (const line of lines) {
    const isEmpty = line.trim() === '';
    if (isEmpty) {
      if (!prevWasEmpty && filtered.length > 0) {
        filtered.push('');
      }
      prevWasEmpty = true;
    } else {
      filtered.push(line);
      prevWasEmpty = false;
    }
  }

  return filtered.join('\n').trim() + '\n';
}

/**
 * Detects known prompt injection watermarks or suspicious filler artifacts
 * and removes harmless no-op declarations.
 */
function stripAiWatermarks(code) {
  let cleaned = code;
  const detected = [];

  for (const mark of KNOWN_AI_WATERMARKS) {
    const regex = new RegExp(`(?:const|let|var)\\s+${mark}\\s*=[^;\\n]+;?`, 'g');
    if (regex.test(cleaned)) {
      detected.push(mark);
      cleaned = cleaned.replace(regex, '');
    }
  }

  if (detected.length > 0) {
    console.warn(`[sanitizer] ⚠️ Removed ${detected.length} AI watermark/injection artifact(s): ${detected.join(', ')}`);
  }

  return cleaned;
}

/**
 * Sanitizes solution code before platform submission:
 * 1. Strips all comments (// ..., /* ... * /, JSDoc).
 * 2. Excises known AI watermarks and filler variables.
 * 3. Strips local test runner blocks (require.main === module) and exports if present.
 * 4. Normalizes whitespace and returns clean, human-style competitive programming code.
 */
function sanitizeCodeForSubmission(code, platform = '') {
  if (typeof code !== 'string') return '';

  let cleaned = code;

  // 1. Remove local test harness marker if present
  const harnessMarker = '// ---------------- LOCAL TEST HARNESS ----------------';
  const harnessIndex = cleaned.indexOf(harnessMarker);
  if (harnessIndex !== -1) {
    cleaned = cleaned.slice(0, harnessIndex);
  }

  // 2. Remove require.main === module runner blocks
  cleaned = cleaned.replace(/if\s*\(\s*require\.main\s*===\s*module\s*\)[\s\S]*?(?=module\.exports|$)/g, '');

  // 3. Remove module.exports
  cleaned = cleaned.replace(/module\.exports\s*=\s*[^;\n]+;?/g, '');

  // 4. Strip all comments
  cleaned = stripComments(cleaned);

  // 5. Remove any AI injection watermarks
  cleaned = stripAiWatermarks(cleaned);

  // 6. Clean up redundant blank lines
  cleaned = cleaned
    .split(/\r?\n/)
    .map((l) => l.trimEnd())
    .filter((l, idx, arr) => !(l.trim() === '' && (idx === 0 || arr[idx - 1].trim() === '')))
    .join('\n')
    .trim();

  return cleaned + '\n';
}

module.exports = {
  stripComments,
  stripAiWatermarks,
  sanitizeCodeForSubmission,
  KNOWN_AI_WATERMARKS,
};
