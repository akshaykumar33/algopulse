"""
The buddy's expressive local voice: AI4Bharat Indic Parler-TTS on this PC's GPU.

Same HTTP contract as server.py (the plain MMS voice), so the studio can use either:

  POST /speak {"text": "...", "lang": "kn-IN", "mood": "love"} -> {"pcm": base64 int16 mono, "rate": 44100}
  POST /warm  {"lang": "kn-IN"} -> loads the model ahead of time
  GET  /health -> {"ok": true, "device": "cuda", "loaded": [...]}

The voice is described in words; each language uses one of the model's recommended
female speakers so the buddy sounds like the same person every time. Needs HF_TOKEN in
the repo's .env, since the model is gated (accept its terms on Hugging Face first).
Runs in tools/tts/.venv-parler (Python 3.12; parler-tts pins an older transformers).
"""

import base64
import json
import os
import re
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

HERE = os.path.dirname(os.path.abspath(__file__))
os.environ.setdefault("HF_HOME", os.path.join(HERE, ".cache"))


def read_env():
    path = os.path.join(HERE, "..", "..", ".env")
    if not os.path.exists(path):
        return
    for line in open(path, encoding="utf-8"):
        m = re.match(r"\s*(\w+)\s*=\s*\"?([^\"]*)\"?", line)
        if m and m.group(1) not in os.environ:
            os.environ[m.group(1)] = m.group(2).strip()


read_env()

import numpy as np
import torch
from parler_tts import ParlerTTSForConditionalGeneration
from transformers import AutoTokenizer, VitsModel

REPO = "ai4bharat/indic-parler-tts"
PORT = int(os.environ.get("TTS_PORT", "3334"))
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
DTYPE = torch.float16 if DEVICE == "cuda" else torch.float32

SPEAKERS = {
    "hi": "Divya", "kn": "Anu", "mr": "Sunita", "te": "Lalitha", "ta": "Jaya",
    "bn": "Aditi", "ml": "Anjali", "gu": "Neha", "pa": "Gurpreet", "en": "Mary",
}

MOODS = {
    "laugh": "cheerful and laughing",
    "giggle": "playful and giggly",
    "love": "soft, warm and affectionate",
    "flirt": "playful and gently teasing",
    "kiss": "soft and affectionate",
    "baby": "sweet and bubbly",
    "sad": "soft and a little sad",
    "cry": "soft and emotional",
    "proud": "excited and proud",
    "surprised": "excited and surprised",
    "shy": "soft and shy",
}

state = {"model": None, "tok": None, "desc_tok": None}
lock = threading.Lock()


def load():
    with lock:
        if state["model"] is None:
            token = os.environ.get("HF_TOKEN")
            model = ParlerTTSForConditionalGeneration.from_pretrained(
                REPO, token=token, torch_dtype=DTYPE, attn_implementation=os.environ.get("TTS_ATTN", "eager")
            ).to(DEVICE).eval()
            state["tok"] = AutoTokenizer.from_pretrained(REPO, token=token)
            state["desc_tok"] = AutoTokenizer.from_pretrained(model.config.text_encoder._name_or_path, token=token)
            state["model"] = model
            generate(model, "Hi!", "en", None)
    return state["model"]


def describe(lang, mood):
    base = str(lang).lower().split("-")[0]
    who = SPEAKERS.get(base, "Mary")
    tone = MOODS.get(mood, "sweet, soft and affectionate")
    return (
        f"{who}, a young woman, speaks in a {tone} voice with a high pitch and a gentle, smiling, "
        "highly expressive delivery, at a slightly slow pace, very close to the microphone. "
        "The recording is very clear and intimate, with no background noise."
    )


def speak(text, lang, mood):
    return generate(load(), text, lang, mood)


# Parler makes about 0.4 s of speech per second on a laptop GPU: too slow to answer live.
# MMS answers in ~0.3 s, so live replies use it while Parler re-voices them for next time.
MMS = {"hi": "hin", "kn": "kan", "mr": "mar", "te": "tel", "ta": "tam", "bn": "ben", "gu": "guj", "ml": "mal", "pa": "pan", "ur": "urd", "en": "eng"}
mms_models = {}
mms_lock = threading.Lock()


def speak_fast(text, lang):
    code = MMS.get(str(lang).lower().split("-")[0])
    if not code:
        raise ValueError(f"no fast voice for {lang}")
    with mms_lock:
        if code not in mms_models:
            name = f"facebook/mms-tts-{code}"
            mms_models[code] = (AutoTokenizer.from_pretrained(name), VitsModel.from_pretrained(name).to(DEVICE).eval())
    tok, model = mms_models[code]
    clean = re.sub(r"[^\w\s.,!?'ऀ-෿-]", " ", text).strip()
    inputs = tok(clean, return_tensors="pt").to(DEVICE)
    with torch.inference_mode():
        wave = model(**inputs).waveform[0].float().cpu().numpy()
    pcm = (np.clip(wave, -1, 1) * 32767).astype("<i2").tobytes()
    return {"pcm": base64.b64encode(pcm).decode(), "rate": model.config.sampling_rate}


# The first generation pays for CUDA kernel setup; load() runs one so replies never do.
def generate(model, text, lang, mood):
    clean = re.sub(r"[*_#`~<>\[\]{}|\\]", " ", text).strip()
    desc = state["desc_tok"](describe(lang, mood), return_tensors="pt").to(DEVICE)
    prompt = state["tok"](clean, return_tensors="pt").to(DEVICE)
    with torch.inference_mode():
        out = model.generate(
            input_ids=desc.input_ids,
            attention_mask=desc.attention_mask,
            prompt_input_ids=prompt.input_ids,
            prompt_attention_mask=prompt.attention_mask,
        )
    wave = out.float().cpu().numpy().squeeze()
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
            return self.reply(200, {"ok": True, "device": DEVICE, "engine": "parler", "loaded": ["parler"] if state["model"] else []})
        self.reply(404, {"error": "not found"})

    def do_POST(self):
        try:
            size = int(self.headers.get("Content-Length") or 0)
            body = json.loads(self.rfile.read(min(size, 20000)) or b"{}")
            if self.path == "/warm":
                speak_fast("ok", body.get("lang", "en"))
                return self.reply(200, {"ok": True})
            if self.path == "/speak":
                text = str(body.get("text", ""))[:600]
                if not text.strip():
                    return self.reply(400, {"error": "nothing to say"})
                if body.get("engine") == "fast":
                    return self.reply(200, speak_fast(text, body.get("lang", "en")))
                return self.reply(200, speak(text, body.get("lang", "en"), body.get("mood")))
            self.reply(404, {"error": "not found"})
        except Exception as err:
            self.reply(500, {"error": str(err)})

    def log_message(self, *args):
        pass


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"[tts] local voice on http://127.0.0.1:{PORT} ({DEVICE}, parler)", flush=True)
    threading.Thread(target=load, daemon=True).start()
    server.serve_forever()
