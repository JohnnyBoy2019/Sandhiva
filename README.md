# Sandhiva 🏥

**Cultural Clinical Translator** - Instantly turns culturally-loaded patient phrases into usable medical meaning

Sandhiva is a clinical interpretation layer that catches euphemisms, idioms, and culturally specific symptom descriptions across 10+ languages, rendering structured Interpretation Events that help providers deliver safer, tighter care.

## What It Does

When a patient says something like:
- "mere kamar mein aag lagi hai" (my lower back is on fire)
- "chakkar aa rahe hain" (dizziness is coming)
- "me falta el aire" (I lack air)

Sandhiva **instantly** (0ms) does local phrasebank matching and shows:

### Interpretation Event Card
- ✅ Closest match + confidence score (e.g., 95%)
- 🎯 Ranked clinical meanings (most likely first)
- ❓ Suggested follow-up questions
- ⚠️ Red flags (stroke, MI, sepsis, etc.)
- 🫀 Body region highlight
- 📋 Visit-safe documentation text

### Optional AI Layer
When provider clicks "Literal translation," Sandhiva calls Ollama for contextual translation.

**Core clinical help is instant. AI is opt-in.**

## Five Clinical Modes

### 1. 🏥 Telemedicine Room
Full visit mode with:
- 2-way video (provider webcam + patient sample video)
- Bidirectional chat
- Live captions (HI/EN)
- Instant phrasebank interpretation
- TensorFlow.js pose detection for body region tracking

### 2. 🚨 Emergency Triage
Speed-focused mode with:
- Rapid phrase input
- Strong red flag emphasis
- Urgency level indicators
- "Ask these 3 questions next" prompts

### 3. 📋 Follow-Up Visit
Continuity tracking with:
- Compare last visit vs today
- Pattern recognition
- Symptom escalation detection

### 4. 🎤 Live Transcription
Minimal friction mode:
- Live dictation stream
- Inline Interpretation Events
- Works alongside existing workflows

### 5. 🔤 Standalone Translator
Quick demo mode:
- Instant phrasebank match
- Interpretation Event Card in <1 second
- Optional literal translation

## Supported Languages (10+)

- Hindi (हिन्दी)
- Spanish (Español)
- Punjabi (ਪੰਜਾਬੀ)
- Urdu (اردو)
- Bengali (বাংলা)
- Tamil (தமிழ்)
- Telugu (తెలుగు)
- Gujarati (ગુજરાતી)
- Mandarin (中文)
- Arabic (العربية)

## Technology Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Backend**: Node.js + Express
- **Pose Detection**: TensorFlow.js (MoveNet)
- **Optional Translation**: Ollama API integration
- **No blockchain/crypto/MetaMask**

## Installation

```bash
# Clone repository
git clone https://github.com/JohnnyBoy2019/Sandhiva.git
cd Sandhiva

# Install dependencies
npm install

# Start server
npm start
```

Server runs on `http://localhost:3000`

## Usage

1. **Select a mode** from the 5-mode menu
2. **Choose patient language** (Hindi, Spanish, etc.)
3. **Enter patient phrase** or use chat/transcription
4. **Get instant Interpretation Event** with:
   - Confidence score
   - Clinical meanings
   - Questions to ask
   - Red flags
   - Body region highlight
   - Documentation text
5. **Optional**: Click "Get Literal Translation" for Ollama-powered translation

## Features

### ⚡ Instant Matching
Local phrasebank matching = 0ms response time

### 🎯 Clinical Precision
Ranked meanings with medical context, not just word-for-word translation

### 🔴 Red Flags
Automatic flagging of concerning symptoms (stroke, MI, sepsis, etc.)

### 📹 Video Integration
Provider webcam + patient sample video with pose detection

### 💬 Bidirectional Chat
Provider can ask questions, patient responds, auto-analysis on patient messages

### 🎤 Audio Controls
Mute/unmute indicators for clean demo experience

### 📋 Documentation Ready
One-click copy of visit-safe annotation text

### 👤 Pose Detection
TensorFlow.js tracks body gestures, highlights regions, auto-zooms

## Optional: Ollama Integration

For literal translations, configure Ollama:

```bash
# Set environment variable (optional)
export OLLAMA_URL=http://localhost:11434

# Ollama must be running with a model (e.g., llama2)
```

If Ollama is not available, Sandhiva still works fully with local phrasebank.

## Architecture

```
Sandhiva/
├── server.js              # Express server
├── public/
│   ├── index.html        # Main UI
│   ├── css/
│   │   └── style.css     # Styling
│   ├── js/
│   │   └── app.js        # Application logic
│   └── data/
│       └── phrasebank.js # Cultural phrase database
```

## What Makes This Different

This is **not** "Google Translate for hospitals."

Sandhiva is a **clinical interpretation layer** that:
- Understands cultural context
- Provides medical framing
- Suggests clinical actions
- Flags urgent concerns
- Integrates into real workflows

## Demo Workflow

1. Start server: `npm start`
2. Open browser: `http://localhost:3000`
3. Select "Telemedicine" mode
4. Start webcam for provider view
5. Load sample patient video
6. Choose language (e.g., Hindi)
7. Enter phrase: "chakkar aa rahe hain"
8. See instant Interpretation Event with all clinical context
9. Try other modes and languages

## Contributing

This project focuses on:
- Adding more languages
- Expanding phrasebank
- Improving matching algorithms
- Enhancing pose detection
- Refining documentation text

## License

ISC

## Contact

GitHub: [JohnnyBoy2019/Sandhiva](https://github.com/JohnnyBoy2019/Sandhiva)

---

**Sandhiva**: Making culturally-loaded phrases clinically useful, instantly.
