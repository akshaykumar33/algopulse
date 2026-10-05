"""
Local voice for the studio buddy: Meta's MMS text-to-speech models on this PC's GPU.

The studio server starts this when tools/tts/.venv exists and asks it to speak whenever
the Gemini voice is out of quota, so the buddy never goes silent in any language.

  POST /speak {"text": "...", "lang": "kn-IN"} -> {"pcm": base64 int16 mono, "rate": 16000}
  GET  /health -> {"ok": true, "device": "cuda", "loaded": [...]}
  POST /warm  {"lang": "kn-IN"} -> loads that language's model ahead of time

Each language model is about 145 MB, downloaded once into tools/tts/.cache.
"""

import base64
import json
import os
import re
import sys
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

HERE = os.path.dirname(os.path.abspath(__file__))
os.environ.setdefault("HF_HOME", os.path.join(HERE, ".cache"))

import numpy as np
import torch
from transformers import AutoTokenizer, VitsModel

PORT = int(os.environ.get("TTS_PORT", "3334"))
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

LANGS = {
    "hi": "hin", "kn": "kan", "mr": "mar", "te": "tel", "ta": "tam", "bn": "ben",
    "gu": "guj", "ml": "mal", "pa": "pan", "ur": "urd", "en": "eng", "es": "spa",
    "fr": "fra", "de": "deu", "ru": "rus", "ar": "ara", "ja": "jpn", "ko": "kor",
}

models = {}
lock = threading.Lock()


def load(lang):
    code = LANGS.get(str(lang).lower().split("-")[0])
    if not code:
        raise ValueError(f"no local voice for {lang}")
    with lock:
        if code not in models:
            name = f"facebook/mms-tts-{code}"
            tok = AutoTokenizer.from_pretrained(name)
            model = VitsModel.from_pretrained(name).to(DEVICE).eval()
            models[code] = (tok, model)
        return models[code]


def romanize(tok, text):
    if not getattr(tok, "is_uroman", False):
        return text
    import uroman

    return uroman.Uroman().romanize_string(text)


def speak(text, lang):
    tok, model = load(lang)
    clean = re.sub(r"[^\w\s.,!?'ऀ-෿-]", " ", text).strip()
    inputs = tok(romanize(tok, clean), return_tensors="pt").to(DEVICE)
    with torch.inference_mode():
        wave = model(**inputs).waveform[0].float().cpu().numpy()
    pcm = (np.clip(wave, -1, 1) * 32767).astype("<i2").tobytes()
    return {"pcm": base64.b64encode(pcm).decode(), "rate": model.config.sampling_rate}


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
            return self.reply(200, {"ok": True, "device": DEVICE, "loaded": sorted(models)})
        self.reply(404, {"error": "not found"})

    def do_POST(self):
        try:
            size = int(self.headers.get("Content-Length") or 0)
            body = json.loads(self.rfile.read(min(size, 20000)) or b"{}")
            if self.path == "/warm":
                load(body.get("lang", "en"))
                return self.reply(200, {"ok": True})
            if self.path == "/speak":
                text = str(body.get("text", ""))[:600]
                if not text.strip():
                    return self.reply(400, {"error": "nothing to say"})
                return self.reply(200, speak(text, body.get("lang", "en")))
            self.reply(404, {"error": "not found"})
        except Exception as err:
            self.reply(500, {"error": str(err)})

    def log_message(self, *args):
        pass


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"[tts] local voice on http://127.0.0.1:{PORT} ({DEVICE})", flush=True)
    for lang in sys.argv[1:]:
        threading.Thread(target=load, args=(lang,), daemon=True).start()
    server.serve_forever()
