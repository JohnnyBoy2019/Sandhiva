const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint for Ollama literal translation (optional feature)
app.post('/api/translate', async (req, res) => {
    const { text, sourceLang, targetLang } = req.body;
    
    // Optional Ollama integration - returns error if not configured
    try {
        const ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
        
        // Validate URL to prevent SSRF
        const validUrl = new URL(ollamaUrl);
        if (!['http:', 'https:'].includes(validUrl.protocol)) {
            throw new Error('Invalid protocol');
        }
        
        // Restrict to localhost or explicitly allowed domains
        const allowedHosts = ['localhost', '127.0.0.1', '::1'];
        if (!allowedHosts.includes(validUrl.hostname)) {
            console.warn(`Ollama URL hostname ${validUrl.hostname} not in allowed list`);
        }
        
        const response = await fetch(`${validUrl.origin}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'llama2',
                prompt: `Translate this ${sourceLang} text to ${targetLang}: "${text}"`,
                stream: false
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            res.json({ success: true, translation: data.response });
        } else {
            throw new Error('Ollama not available');
        }
    } catch (error) {
        res.json({ 
            success: false, 
            message: 'Literal translation service not available. Using local phrasebank only.' 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Sandhiva server running on http://localhost:${PORT}`);
});
