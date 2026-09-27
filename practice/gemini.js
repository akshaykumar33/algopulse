/**
 * Google Gemini API Client for Automated Competitive Programming Explanations
 * Uses native Node.js HTTPS - zero external dependencies.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

function getApiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY.trim();
  if (process.env.GOOGLE_API_KEY) return process.env.GOOGLE_API_KEY.trim();

  // Check for .env file at repo root
  const envPath = path.resolve(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split(/\r?\n/);
    for (const line of lines) {
      const match = line.match(/^\s*(?:GEMINI_API_KEY|GOOGLE_API_KEY)\s*=\s*(["']?)(.*?)\1\s*$/);
      if (match && match[2]) {
        return match[2].trim();
      }
    }
  }

  return null;
}

function callGeminiApi(apiKey, model, prompt) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 4096,
      },
    });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const parsedUrl = new URL(url);

    const req = https.request(
      {
        hostname: parsedUrl.hostname,
        path: parsedUrl.pathname + parsedUrl.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
          'User-Agent': 'CP-Practice-Visualizer',
        },
        timeout: 25000,
      },
      (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => {
          try {
            const json = JSON.parse(body);
            if (res.statusCode !== 200) {
              return reject(new Error(json.error?.message || `HTTP ${res.statusCode}`));
            }
            const candidateText = json.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!candidateText) {
              return reject(new Error('Empty candidate response from Gemini API'));
            }
            resolve(candidateText);
          } catch (e) {
            reject(e);
          }
        });
      }
    );

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Gemini API request timed out after 25s'));
    });

    req.write(payload);
    req.end();
  });
}

async function generateWithGemini(problem) {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  const prompt = `You are a World Finalist Competitive Programming coach and technical documentation architect.
Generate a deeply insightful, mathematically rigorous, and visually documented explanation in GitHub Flavored Markdown for the following competitive programming problem:

Problem Details:
- Platform: ${problem.platform}
- Problem ID: ${problem.id}
- Name: ${problem.name}
- Difficulty / Rating: ${problem.rating}
- Tags: ${(problem.tags || []).join(', ')}
- URL: ${problem.url}
- Template File: ${problem.template}
- Target Solution File: ${problem.file}.js

Required Structure (Produce pure Markdown with no preamble):
# ${problem.name} (${problem.platform} ${problem.id})

## 1. Problem Overview
- Platform, ID, Rating, Tags, Links, and concise 2-sentence summary of what is to be optimized or computed.

## 2. Core Intuition & Mathematical Rationale
- Mathematical Invariant: What property is conserved or strictly monotonic?
- Strategy / Exchange Argument: Why does the optimal choice work? Why do alternative naive approaches fail?
- Include a syntactically valid Mermaid flowchart (using \`\`\`mermaid ... \`\`\`) visualizing the algorithmic decision structure.

## 3. Visual Step-by-Step Walkthrough
- Illustrate state transitions on a representative sample case.
- Include a valid Mermaid sequenceDiagram or stateDiagram tracing pointer or state updates across iterations.

## 4. Algorithmic Complexity
- Time Complexity with formal arithmetic proof.
- Auxiliary Space Complexity.
- Call stack depth (avoiding Node.js recursion limit).

## 5. Edge Cases & Trap Audit
- Boundary values (N=1, zero, negatives, extreme bounds 10^9).
- Numeric overflow: JavaScript safe integer bounds (2^53 - 1 approx 9e15 vs BigInt).

## 6. Idiomatic JavaScript Reference Solution
- Clean, fast, idiomatic JavaScript (Node.js) code matching the ${problem.template} template.
- Do NOT include any filler variables, AI watermarks, or unnecessary wrappers.`;

  try {
    // Try gemini-2.5-flash first, fallback to gemini-1.5-flash
    return await callGeminiApi(apiKey, 'gemini-2.5-flash', prompt);
  } catch (err) {
    console.warn(`[gemini] Warning: gemini-2.5-flash failed (${err.message}). Retrying with gemini-1.5-flash...`);
    try {
      return await callGeminiApi(apiKey, 'gemini-1.5-flash', prompt);
    } catch (e2) {
      console.warn(`[gemini] Warning: Gemini generation failed (${e2.message}). Falling back to native visualizer.`);
      return null;
    }
  }
}

module.exports = {
  getApiKey,
  generateWithGemini,
};
