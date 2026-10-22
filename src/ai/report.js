/**
 * Report generation engine for AlgoPulse Studio.
 * Generates structured, high-value Markdown reports in any requested language (English, Hindi, Indian regional, foreign languages).
 */

const ai = require('./index');
const rag = require('./rag');
const { searchWeb } = require('./web');
const store = require('../lib/store');

async function generateReport({ topic, lang = 'en-US', date, context = {} }) {
  const cleanTopic = String(topic || 'Competitive Programming Progress').trim();
  
  // 1. Gather local RAG knowledge
  const ragHits = rag.search(cleanTopic, { k: 4 });
  const ragContext = ragHits.length
    ? ragHits.map((h) => `[Topic: ${h.title}]\n${h.snippet}\n${h.text.slice(0, 400)}`).join('\n\n')
    : '';

  // 2. Fetch live web snippets if appropriate
  let webContext = '';
  try {
    const webHits = await searchWeb(cleanTopic, { maxResults: 3 });
    if (webHits.length) {
      webContext = webHits.map((w) => `[Source: ${w.title} (${w.url})]\n${w.snippet}`).join('\n\n');
    }
  } catch (e) {
    // Ignore web search errors during report generation
  }

  // 3. Local progress context if asking about progress / today
  let progressContext = '';
  if (/progress|stat|today|streak|solved|performance|rank/i.test(cleanTopic) || !cleanTopic) {
    try {
      const p = store.progress();
      const s = store.streaks();
      progressContext = `Overall Progress: ${p.completed} of ${p.total} problems solved (${p.percent}%). Current streak: ${s.current} days (longest: ${s.longest} days). XP: ${p.xp}.`;
    } catch {
      // Ignore store read issues
    }
  }

  const prompt = `You are an elite Competitive Programming Mentor and Technical Architect generating a structured, professional report.

Topic/Goal: "${cleanTopic}"
Report Date: ${date || store.localToday()}
Target Language BCP-47: "${lang}"

Grounding Information:
${progressContext ? `\nStudent Practice Stats:\n${progressContext}\n` : ''}
${ragContext ? `\nVerified Knowledge Base:\n${ragContext}\n` : ''}
${webContext ? `\nLive Web Information:\n${webContext}\n` : ''}

Report Structure Requirements:
1. Header with Title, Date, Subject, and Language.
2. Executive Summary / Overview.
3. Core Concept & Mathematical / Algorithmic Insights (Invariants, Time/Space complexities, Tradeoffs).
4. Code / Implementation Patterns & Pitfalls (Clean, high-performance CP conventions).
5. Solved Problems / Practical Applications & Next Steps.

CRITICAL LANGUAGE REQUIREMENT:
The ENTIRE report MUST be written naturally and fluently in the requested target language corresponding to "${lang}".
- If "hi-IN" or Hindi was requested: Write the ENTIRE report in clear, formal, beautiful Hindi (Devanagari script)!
- If "kn-IN" (Kannada): Write in Kannada script!
- If "ta-IN" (Tamil): Write in Tamil script!
- If "te-IN" (Telugu): Write in Telugu script!
- If "es-ES" (Spanish): Write in Spanish!
- If "fr-FR" (French): Write in French!
- If "ja-JP" (Japanese): Write in Japanese!
- If English: Write in clean, articulate English!

Produce only the Markdown report text.`;

  const res = await ai.complete({ prompt, maxTokens: 4000, cache: false });
  const markdown = res.text.trim();
  
  // Extract a clean title from the first heading if present
  const titleM = markdown.match(/^#\s+(.+)$/m);
  const title = titleM ? titleM[1].replace(/[*_#]/g, '').trim() : `Report: ${cleanTopic}`;

  return {
    title,
    topic: cleanTopic,
    markdown,
    lang,
    generatedAt: new Date().toISOString(),
  };
}

module.exports = { generateReport };
