const SCRIPTS = [
  [/[ऀ-ॿ]/g, 'hi-IN'],
  [/[ಀ-೿]/g, 'kn-IN'],
  [/[஀-௿]/g, 'ta-IN'],
  [/[ఀ-౿]/g, 'te-IN'],
  [/[ঀ-৿]/g, 'bn-IN'],
  [/[઀-૿]/g, 'gu-IN'],
  [/[ഀ-ൿ]/g, 'ml-IN'],
  [/[਀-੿]/g, 'pa-IN'],
  [/[぀-ヿ一-龯]/g, 'ja-JP'],
  [/[가-힯]/g, 'ko-KR'],
  [/[؀-ۿ]/g, 'ar-SA'],
  [/[Ѐ-ӿ]/g, 'ru-RU'],
];

function detectLang(text) {
  if (!text) return null;
  const s = String(text);
  let best = null;
  let most = 0;
  for (const [re, code] of SCRIPTS) {
    const k = (s.match(re) || []).length;
    if (k > most) {
      most = k;
      best = code;
    }
  }
  if (best === 'hi-IN' && /\b(आहे|आहेस|आहात|काय|मला|तुला|तुझ|माझ|नाही|कसा|कशी|कसं|आणि|झाल|बघ|सांग|आपण|इथे|तिथे|खूप|छान)\b/.test(s)) return 'mr-IN';
  if (best) return best;
  if (/\b(hola|por\s+favor|gracias|buenos|buenas|siguiente|problema|abrir|amigos|amor|cariño|claro)\b/i.test(s)) return 'es-ES';
  if (/\b(bonjour|merci|s'il\s+vous\s+plaît|oui|problème|ouvrir|suivant|mon\s+amour)\b/i.test(s)) return 'fr-FR';
  if (/\b(hallo|danke|bitte|nächste|aufgabe|öffnen|schön|liebe)\b/i.test(s)) return 'de-DE';
  if (/\b(ciao|grazie|per\s+favore|prossimo|apri|amore)\b/i.test(s)) return 'it-IT';
  if (/\b(kya|kaise|karo|karna|chalo|bhai|batao|sawal|samjhao|dekho|chalao|likho|haan|nahi|pehle|baad|suno|bolo|namaste|shukriya|dhanyawad|niche|upar|jaan|babu|shona)\b/i.test(s)) {
    return 'hi-IN';
  }
  return null;
}

module.exports = { detectLang };
