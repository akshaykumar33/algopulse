/**
 * Robust, multi-tiered live web search and summarization for AlgoPulse Studio.
 * Integrates:
 * 1. Codeforces official API for contest schedules & platforms
 * 2. DuckDuckGo Instant Answer API for instant abstracts & topics
 * 3. Wikipedia API for authoritative CS & algorithm definitions
 * 4. DuckDuckGo HTML search for general web queries
 */

const ai = require('./index');

async function searchWeb(query, { maxResults = 5 } = {}) {
  const q = String(query || '').trim();
  if (!q) return [];
  const results = [];
  const seenUrls = new Set();

  function addResult(title, url, snippet) {
    if (!title || !url || seenUrls.has(url)) return;
    seenUrls.add(url);
    results.push({
      title: title.replace(/<[^>]+>/g, '').trim(),
      url,
      snippet: (snippet || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
    });
  }

  // 1. Codeforces Contests check if query is about contests/rounds
  if (/(codeforces|contest|round|division|div\b|schedule|upcoming)/i.test(q)) {
    try {
      const res = await fetch('https://codeforces.com/api/contest.list?gym=false', { timeout: 6000 });
      const json = await res.json();
      if (json.status === 'OK' && Array.isArray(json.result)) {
        const upcoming = json.result.filter((c) => c.phase === 'BEFORE').slice(0, 3);
        for (const c of upcoming) {
          const startTime = new Date(c.startTimeSeconds * 1000).toLocaleString();
          addResult(
            `Codeforces: ${c.name}`,
            `https://codeforces.com/contests/${c.id}`,
            `Upcoming contest starting at ${startTime}. Type: ${c.type}, Duration: ${Math.round(c.durationSeconds / 3600)}h.`
          );
        }
      }
    } catch {
      // Ignore API errors
    }
  }

  // 2. DuckDuckGo Instant Answer API
  try {
    const res = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json`, { timeout: 6000 });
    const data = await res.json();
    if (data.AbstractText && data.AbstractURL) {
      addResult(data.Heading || q, data.AbstractURL, data.AbstractText);
    }
    if (Array.isArray(data.RelatedTopics)) {
      for (const t of data.RelatedTopics.slice(0, 3)) {
        if (t.Text && t.FirstURL) {
          addResult(t.Text.slice(0, 60), t.FirstURL, t.Text);
        }
      }
    }
  } catch {
    // Ignore DDG API errors
  }

  // 3. Wikipedia API
  try {
    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(q)}&limit=3&namespace=0&format=json`,
      {
        headers: { 'User-Agent': 'AlgoPulseStudio/1.0 (study@example.com)' },
        timeout: 6000,
      }
    );
    const [searchTerm, titles, descriptions, urls] = await res.json();
    if (Array.isArray(titles)) {
      for (let i = 0; i < titles.length; i++) {
        if (urls[i]) addResult(titles[i], urls[i], descriptions[i] || `Wikipedia article about ${titles[i]}`);
      }
    }
  } catch {
    // Ignore Wikipedia errors
  }

  // 4. DuckDuckGo HTML Search
  if (results.length < maxResults) {
    try {
      const res = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(q)}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        timeout: 8000,
      });
      if (res.ok) {
        const html = await res.text();
        const blocks = html.split(/<div[^>]*class="[^"]*result\b/i).slice(1);
        for (const b of blocks) {
          if (results.length >= maxResults) break;
          const titleM = b.match(/<a[^>]*class="[^"]*result__a[^"]*"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/i);
          const snipM = b.match(/<a[^>]*class="[^"]*result__snippet[^"]*"[^>]*>([\s\S]*?)<\/a>/i) || b.match(/class="[^"]*result__snippet[^"]*"[^>]*>([\s\S]*?)<\//i);
          if (titleM) {
            let rawUrl = titleM[1];
            const uddg = rawUrl.match(/uddg=([^&]+)/);
            const finalUrl = uddg ? decodeURIComponent(uddg[1]) : rawUrl;
            const title = titleM[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
            const snippet = snipM ? snipM[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : '';
            if (title && finalUrl && !finalUrl.startsWith('/')) {
              addResult(title, finalUrl, snippet);
            }
          }
        }
      }
    } catch {
      // Ignore DDG HTML errors
    }
  }

  return results.slice(0, maxResults);
}

async function searchAndSummarize({ query, lang = 'en-US' }) {
  const results = await searchWeb(query, { maxResults: 5 });
  if (!results.length) {
    return {
      query,
      results: [],
      summary: `I searched the web for "${query}", but couldn't retrieve results right now.`,
      lang,
    };
  }

  const resultsText = results.map((r, i) => `[${i + 1}] ${r.title}\nURL: ${r.url}\nSnippet: ${r.snippet}`).join('\n\n');
  const prompt = `You are Ham, the helpful and clever competitive programming companion.
The user asked to search the web for: "${query}".
Here are the live search results:
${resultsText}

Summarize the key information clearly and concisely (max 3 short paragraphs or bullet points).
CRITICAL LANGUAGE RULE: Write the summary ENTIRELY in the language corresponding to BCP-47 tag "${lang}".
- If "hi-IN", write in natural, fluent Hindi (Devanagari script)!
- If "kn-IN", write in Kannada!
- If "ta-IN", write in Tamil!
- If "es-ES", write in Spanish!
- If "ja-JP", write in Japanese!
- If English, write in crisp English!
Cite the key sources using markdown links.`;

  let summary = '';
  try {
    const res = await ai.complete({ prompt, maxTokens: 1200, cache: false, thinking: 'low' });
    summary = res.text.trim();
  } catch {
    summary = results.map((r) => `- **[${r.title}](${r.url})**: ${r.snippet}`).join('\n\n');
  }

  return { query, results, summary, lang };
}

module.exports = { searchWeb, searchAndSummarize };
