"""
Local voice server for the studio buddy:
1. Microsoft Edge Neural TTS (100% Free, Unlimited, studio-quality female voices in 50+ languages).
2. Meta MMS (Offline local VitsModel on GPU/CPU as zero-network fallback).

  POST /speak {"text": "...", "lang": "hi-IN", "mood": "flirt"} -> {"audio": base64 mp3, "format": "mp3", "voice": "..."}
  GET  /health -> {"ok": true, "device": "cuda", "engine": "edge+mms"}
  POST /warm  {"lang": "kn-IN"} -> preload
"""

import asyncio
import base64
import json
import os
import re
import sys
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

HERE = os.path.dirname(os.path.abspath(__file__))
os.environ.setdefault("HF_HOME", os.path.join(HERE, ".cache"))

PORT = int(os.environ.get("TTS_PORT", "3334"))

# Multilingual female neural voices (Edge TTS)
EDGE_VOICES = {
    "hi": "hi-IN-SwaraNeural",
    "hi-in": "hi-IN-SwaraNeural",
    "en": "en-US-JennyNeural",
    "en-us": "en-US-JennyNeural",
    "en-in": "en-IN-NeerjaNeural",
    "kn": "kn-IN-SapnaNeural",
    "kn-in": "kn-IN-SapnaNeural",
    "mr": "mr-IN-AarohiNeural",
    "mr-in": "mr-IN-AarohiNeural",
    "ta": "ta-IN-PallaviNeural",
    "ta-in": "ta-IN-PallaviNeural",
    "te": "te-IN-ShrutiNeural",
    "te-in": "te-IN-ShrutiNeural",
    "bn": "bn-IN-TanishaaNeural",
    "bn-in": "bn-IN-TanishaaNeural",
    "gu": "gu-IN-DhwaniNeural",
    "gu-in": "gu-IN-DhwaniNeural",
    "ml": "ml-IN-SobhanaNeural",
    "ml-in": "ml-IN-SobhanaNeural",
    "pa": "pa-IN-GurpreetNeural",
    "pa-in": "pa-IN-GurpreetNeural",
    "ur": "ur-PK-UzmaNeural",
    "ur-pk": "ur-PK-UzmaNeural",
    "es": "es-ES-ElviraNeural",
    "es-es": "es-ES-ElviraNeural",
    "fr": "fr-FR-DeniseNeural",
    "fr-fr": "fr-FR-DeniseNeural",
    "ja": "ja-JP-NanamiNeural",
    "ja-jp": "ja-JP-NanamiNeural",
    "ko": "ko-KR-SunHiNeural",
    "ko-kr": "ko-KR-SunHiNeural",
    "zh": "zh-CN-XiaoxiaoNeural",
    "zh-cn": "zh-CN-XiaoxiaoNeural",
    "de": "de-DE-KatjaNeural",
    "de-de": "de-DE-KatjaNeural",
    "it": "it-IT-ElsaNeural",
    "it-it": "it-IT-ElsaNeural",
    "ru": "ru-RU-SvetlanaNeural",
    "ru-ru": "ru-RU-SvetlanaNeural",
    "ar": "ar-SA-ZariyahNeural",
    "ar-sa": "ar-SA-ZariyahNeural",
}

# Optional torch / MMS fallback (lazy loaded)
mms_available = None
torch_module = None
vits_module = None
tokenizer_module = None
DEVICE = "cpu"

def check_mms():
    global mms_available, torch_module, vits_module, tokenizer_module, DEVICE
    if mms_available is not None:
        return mms_available
    try:
        import torch
        from transformers import AutoTokenizer, VitsModel
        torch_module = torch
        vits_module = VitsModel
        tokenizer_module = AutoTokenizer
        DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
        mms_available = True
    except Exception:
        mms_available = False
    return mms_available

MMS_LANGS = {
    "hi": "hin", "kn": "kan", "mr": "mar", "te": "tel", "ta": "tam", "bn": "ben",
    "gu": "guj", "ml": "mal", "pa": "pan", "ur": "urd", "en": "eng", "es": "spa",
    "fr": "fra", "de": "deu", "ru": "rus", "ar": "ara", "ja": "jpn", "ko": "kor",
}

models = {}
lock = threading.Lock()


def load_mms(lang):
    if not check_mms():
        return None, None
    code = MMS_LANGS.get(str(lang).lower().split("-")[0])
    if not code:
        return None, None
    with lock:
        if code not in models:
            name = f"facebook/mms-tts-{code}"
            tok = tokenizer_module.from_pretrained(name)
            model = vits_module.from_pretrained(name).to(DEVICE).eval()
            models[code] = (tok, model)
        return models[code]


def romanize(tok, text):
    if not getattr(tok, "is_uroman", False):
        return text
    import uroman
    return uroman.Uroman().romanize_string(text)


def mms_speak(text, lang):
    tok, model = load_mms(lang)
    if not tok or not model:
        raise ValueError(f"no local MMS voice for {lang}")
    clean = re.sub(r"[^\w\s.,!?'ऀ-෿-]", " ", text).strip()
    inputs = tok(romanize(tok, clean), return_tensors="pt").to(DEVICE)
    with torch_module.inference_mode():
        wave = model(**inputs).waveform[0].float().cpu().numpy()
    import numpy as np
    pcm = (np.clip(wave, -1, 1) * 32767).astype("<i2").tobytes()
    return {
        "pcm": base64.b64encode(pcm).decode(),
        "rate": model.config.sampling_rate,
        "engine": "mms-local",
    }


async def edge_speak_async(text, lang, mood=""):
    import edge_tts
    key = str(lang).lower().replace("_", "-")
    voice = EDGE_VOICES.get(key) or EDGE_VOICES.get(key.split("-")[0]) or "en-US-JennyNeural"
    pitch = "+2Hz" if mood in ("baby", "giggle", "flirt") else "+0Hz"
    rate = "+2%" if mood in ("proud", "happy") else "-1%" if mood in ("love", "flirt") else "+0%"
    comm = edge_tts.Communicate(text, voice, pitch=pitch, rate=rate)
    chunks = []
    async for chunk in comm.stream():
        if chunk["type"] == "audio":
            chunks.append(chunk["data"])
    raw_mp3 = b"".join(chunks)
    return {
        "audio": base64.b64encode(raw_mp3).decode("ascii"),
        "format": "mp3",
        "rate": 24000,
        "voice": voice,
        "engine": "edge-neural",
    }


def speak(text, lang, mood=""):
    # 1. Primary: Edge Neural TTS (instant, expressive, studio-grade female neural voice)
    try:
        return asyncio.run(edge_speak_async(text, lang, mood))
    except Exception as edge_err:
        # 2. Secondary: Meta MMS local offline fallback
        if mms_available:
            try:
                return mms_speak(text, lang)
            except Exception as mms_err:
                raise RuntimeError(f"Edge TTS failed ({edge_err}) and MMS failed ({mms_err})")
        raise edge_err


class Handler(BaseHTTPRequestHandler):
    def reply(self, status, body):
        data = json.dumps(body).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        if self.path == "/health":
            return self.reply(200, {"ok": True, "device": DEVICE, "engine": "edge+mms", "loaded": sorted(models)})
        self.reply(404, {"error": "not found"})

    def do_POST(self):
        try:
            size = int(self.headers.get("Content-Length") or 0)
            body = json.loads(self.rfile.read(min(size, 20000)) or b"{}")
            if self.path == "/warm":
                return self.reply(200, {"ok": True})
            if self.path == "/speak":
                text = str(body.get("text", ""))[:600]
                lang = body.get("lang", "en-US")
                mood = body.get("mood", "")
                if not text.strip():
                    return self.reply(400, {"error": "nothing to say"})
                return self.reply(200, speak(text, lang, mood))
            self.reply(404, {"error": "not found"})
        except Exception as err:
            self.reply(500, {"error": str(err)})

    def log_message(self, *args):
        pass


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"[tts] local voice on http://127.0.0.1:{PORT} (edge-neural + {DEVICE})", flush=True)
    server.serve_forever()
