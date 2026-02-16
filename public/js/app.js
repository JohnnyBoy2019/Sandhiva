// Sandhiva - Cultural Clinical Translator
// Main Application Logic

class SandhivaApp {
    constructor() {
        this.currentMode = 'telemed';
        this.currentLanguage = 'hindi';
        this.poseDetectionEnabled = false;
        this.detector = null;
        this.providerStream = null;
        this.animationId = null;
        this.isMuted = false;
        this.chatHistory = [];
        this.visitHistory = []; // For follow-up mode
        this.currentInterpretation = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateModeInfo();
        this.initializeChatPanel();
    }

    setupEventListeners() {
        // Mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentMode = e.target.dataset.mode;
                this.updateModeInfo();
                this.handleModeChange();
            });
        });

        // Language selector
        document.querySelectorAll('input[name="language"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.currentLanguage = e.target.value;
            });
        });

        // Analyze button
        document.getElementById('analyzeBtn').addEventListener('click', () => {
            this.analyzePhrase();
        });

        // Literal translation button
        document.getElementById('literalTranslateBtn').addEventListener('click', () => {
            this.getLiteralTranslation();
        });

        // Webcam button
        document.getElementById('startWebcam').addEventListener('click', () => {
            this.startWebcam();
        });

        // Sample video button
        document.getElementById('loadSampleVideo').addEventListener('click', () => {
            this.loadSampleVideo();
        });

        // Toggle pose detection
        document.getElementById('togglePose').addEventListener('click', () => {
            this.togglePoseDetection();
        });

        // Audio toggle
        document.getElementById('toggleAudio').addEventListener('click', () => {
            this.toggleAudio();
        });

        // Chat functionality
        document.getElementById('sendMessageBtn').addEventListener('click', () => {
            this.sendMessage();
        });

        document.getElementById('chatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Copy documentation
        document.getElementById('copyDocBtn').addEventListener('click', () => {
            this.copyDocumentation();
        });
    }

    initializeChatPanel() {
        // Show chat panel only in telemed mode initially
        this.updateChatVisibility();
    }

    updateChatVisibility() {
        const chatPanel = document.getElementById('chatPanel');
        if (this.currentMode === 'telemed' || this.currentMode === 'followup') {
            chatPanel.style.display = 'block';
        } else {
            chatPanel.style.display = 'none';
        }
    }

    handleModeChange() {
        this.updateChatVisibility();
        
        // Mode-specific behaviors
        if (this.currentMode === 'followup') {
            this.showFollowUpComparison();
        }
    }

    updateModeInfo() {
        const modeNames = {
            telemed: 'Telemedicine',
            triage: 'Triage',
            followup: 'Follow-up',
            transcription: 'Transcription',
            translator: 'Translator'
        };
        document.getElementById('modeInfo').textContent = `Mode: ${modeNames[this.currentMode]}`;
    }

    toggleAudio() {
        this.isMuted = !this.isMuted;
        const btn = document.getElementById('toggleAudio');
        const statusSpan = btn.querySelector('.audio-status');
        
        if (this.isMuted) {
            btn.classList.add('muted');
            statusSpan.textContent = 'Muted';
            btn.querySelector('.audio-icon').textContent = '🔇';
        } else {
            btn.classList.remove('muted');
            statusSpan.textContent = 'Unmuted';
            btn.querySelector('.audio-icon').textContent = '🎤';
        }

        // Mute/unmute actual stream if available
        if (this.providerStream) {
            this.providerStream.getAudioTracks().forEach(track => {
                track.enabled = !this.isMuted;
            });
        }
    }

    // Bidirectional chat
    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;

        this.addChatMessage('provider', message);
        input.value = '';

        // Simulate patient response after a delay
        setTimeout(() => {
            this.simulatePatientResponse(message);
        }, 1000);
    }

    addChatMessage(sender, text) {
        const messagesDiv = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        messageDiv.innerHTML = `
            <div class="sender">${sender === 'provider' ? 'Provider' : 'Patient'}</div>
            <div class="text">${text}</div>
        `;
        
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;

        // Store in history
        this.chatHistory.push({ sender, text, timestamp: new Date() });

        // If patient message, try to analyze it
        if (sender === 'patient') {
            this.analyzePatientMessage(text);
        }
    }

    simulatePatientResponse(providerQuestion) {
        // Simple simulation - in production this would be real patient input
        const responses = [
            "mere kamar mein aag lagi hai",
            "chakkar aa rahe hain",
            "gas ban rahi hai",
            "Yes, it started yesterday",
            "The pain is getting worse"
        ];
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        this.addChatMessage('patient', response);
    }

    analyzePatientMessage(text) {
        // Auto-analyze patient messages for phrasebank matches
        document.getElementById('phraseInput').value = text;
        this.analyzePhrase(true); // Silent mode - don't show alerts
    }

    // Phrase matching engine
    analyzePhrase(silent = false) {
        const input = document.getElementById('phraseInput').value.trim().toLowerCase();
        
        if (!input) {
            if (!silent) alert('Please enter a phrase to analyze');
            return;
        }

        const languageData = phrasebank[this.currentLanguage];
        
        if (!languageData) {
            if (!silent) alert('Language not supported yet');
            return;
        }

        // Find best match using fuzzy matching
        let bestMatch = null;
        let bestScore = 0;

        languageData.forEach(phrase => {
            const score = this.calculateMatchScore(input, phrase);
            if (score > bestScore) {
                bestScore = score;
                bestMatch = phrase;
            }
        });

        if (bestMatch && bestScore > 0.3) {
            this.currentInterpretation = bestMatch;
            this.displayInterpretationEvent(bestMatch, bestScore);
            this.updateCaptions(bestMatch);
            
            // Store in visit history for follow-up mode
            this.visitHistory.push({
                phrase: bestMatch,
                timestamp: new Date(),
                mode: this.currentMode
            });
        } else {
            if (!silent) alert('No matching phrase found in phrasebank. Try another expression.');
        }
    }

    // Simple fuzzy matching algorithm
    calculateMatchScore(input, phrase) {
        const searchText = phrase.phrase.toLowerCase();
        const transliteration = phrase.transliteration.toLowerCase();
        
        // Exact match
        if (searchText === input || transliteration === input) {
            return 1.0;
        }

        // Partial match
        if (searchText.includes(input) || transliteration.includes(input)) {
            return 0.8;
        }

        // Word overlap
        const inputWords = input.split(/\s+/);
        const phraseWords = (searchText + ' ' + transliteration).split(/\s+/);
        
        let matchCount = 0;
        inputWords.forEach(word => {
            if (phraseWords.some(pw => pw.includes(word) || word.includes(pw))) {
                matchCount++;
            }
        });

        return matchCount / Math.max(inputWords.length, 1) * 0.7;
    }

    displayInterpretationEvent(match, score) {
        // Show interpretation panel
        const panel = document.getElementById('interpretationPanel');
        panel.style.display = 'block';

        // Update confidence
        const confidence = Math.round(score * 100);
        document.getElementById('confidenceBar').style.width = `${confidence}%`;
        document.getElementById('confidenceText').textContent = `${confidence}%`;

        // Matched phrase
        document.getElementById('matchedPhrase').textContent = 
            `${match.phrase} (${match.transliteration})`;
        document.getElementById('literalMeaning').textContent = 
            `Literal: ${match.literal}`;

        // Meanings - handle both array and string formats
        const meaningsList = document.getElementById('meaningsList');
        meaningsList.innerHTML = '';
        const meanings = Array.isArray(match.meanings) ? match.meanings : [match.meanings];
        meanings.forEach((meaning, index) => {
            const li = document.createElement('li');
            li.textContent = meaning;
            if (index === 0 && meanings.length > 1) {
                li.style.fontWeight = 'bold'; // Emphasize top meaning
            }
            meaningsList.appendChild(li);
        });

        // Medical interpretation
        document.getElementById('medicalInterpretation').textContent = 
            match.medicalInterpretation;

        // Urgency level (mode-specific emphasis)
        if (match.urgency) {
            const urgencyDiv = document.getElementById('urgencyLevel');
            urgencyDiv.className = `urgency-indicator urgency-${match.urgency}`;
            urgencyDiv.textContent = match.urgency.toUpperCase().replace('-', ' ');
            
            // Triage mode: emphasize urgency more
            if (this.currentMode === 'triage') {
                urgencyDiv.style.fontSize = '1.3em';
                urgencyDiv.style.padding = '20px';
            }
        }

        // Questions
        const questionsList = document.getElementById('questionsList');
        questionsList.innerHTML = '';
        match.questions.forEach(question => {
            const li = document.createElement('li');
            li.textContent = question;
            questionsList.appendChild(li);
        });

        // Red flags - emphasize in triage mode
        const redFlagsList = document.getElementById('redFlagsList');
        redFlagsList.innerHTML = '';
        match.redFlags.forEach(flag => {
            const li = document.createElement('li');
            li.textContent = flag;
            if (this.currentMode === 'triage') {
                li.style.fontWeight = 'bold';
                li.style.fontSize = '1.1em';
            }
            redFlagsList.appendChild(li);
        });

        // Body part highlight
        this.highlightBodyPart(match.bodyPart);

        // Documentation text
        if (match.documentationText) {
            document.getElementById('documentationText').style.display = 'block';
            document.getElementById('docText').textContent = match.documentationText;
        }

        // Scroll to results
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    highlightBodyPart(bodyPart) {
        const bodyPartHighlight = document.getElementById('bodyPartHighlight');
        
        const bodyPartEmojis = {
            'head': '🧠 HEAD',
            'chest': '🫀 CHEST',
            'abdomen': '🫃 ABDOMEN',
            'lumbar': '🦴 LUMBAR SPINE',
            'skeletal': '🦴 SKELETAL',
            'legs': '🦵 LEGS',
            'general': '🧍 GENERAL'
        };

        bodyPartHighlight.innerHTML = `
            <div class="body-part">${bodyPartEmojis[bodyPart] || '🧍 GENERAL'}</div>
        `;
    }

    updateCaptions(match) {
        document.getElementById('hindiText').textContent = 
            `${match.phrase} (${match.transliteration})`;
        
        const meanings = Array.isArray(match.meanings) ? match.meanings : [match.meanings];
        document.getElementById('englishText').textContent = 
            meanings[0]; // Show top meaning in caption
    }

    copyDocumentation() {
        const docText = document.getElementById('docText').textContent;
        navigator.clipboard.writeText(docText).then(() => {
            const btn = document.getElementById('copyDocBtn');
            const originalText = btn.textContent;
            btn.textContent = '✅ Copied!';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        });
    }

    showFollowUpComparison() {
        // Show comparison of current vs previous visits
        if (this.visitHistory.length > 1) {
            const lastVisit = this.visitHistory[this.visitHistory.length - 2];
            const currentVisit = this.visitHistory[this.visitHistory.length - 1];
            
            console.log('Follow-up comparison:', {
                previous: lastVisit.phrase.phrase,
                current: currentVisit.phrase.phrase
            });
            
            // In a full implementation, this would show side-by-side comparison
        }
    }

    // Literal translation via Ollama
    async getLiteralTranslation() {
        const input = document.getElementById('phraseInput').value.trim();
        
        if (!input) {
            alert('Please enter a phrase to translate');
            return;
        }

        const btn = document.getElementById('literalTranslateBtn');
        const originalText = btn.textContent;
        btn.textContent = '⏳ Translating...';
        btn.disabled = true;

        try {
            const response = await fetch('/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: input,
                    sourceLang: this.currentLanguage === 'hindi' ? 'Hindi' : 'Spanish',
                    targetLang: 'English'
                })
            });

            const data = await response.json();
            
            if (data.success) {
                document.getElementById('literalTranslation').style.display = 'block';
                document.getElementById('literalTranslationText').textContent = data.translation;
            } else {
                alert(data.message || 'Translation service not available');
            }
        } catch (error) {
            alert('Error connecting to translation service. Please ensure Ollama is running.');
        } finally {
            btn.textContent = originalText;
            btn.disabled = false;
        }
    }

    // Webcam handling
    async startWebcam() {
        try {
            this.providerStream = await navigator.mediaDevices.getUserMedia({ 
                video: { width: 640, height: 480 } 
            });
            
            const video = document.getElementById('providerVideo');
            video.srcObject = this.providerStream;
            
            alert('Webcam started successfully!');
        } catch (error) {
            console.error('Webcam error:', error);
            alert('Could not access webcam. Please check permissions.');
        }
    }

    // Load sample patient video
    loadSampleVideo() {
        const video = document.getElementById('patientVideo');
        
        // Create a simple color video using canvas as sample
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        const ctx = canvas.getContext('2d');
        
        // Draw a sample pattern
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(0, 0, 640, 480);
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Sample Patient Video', 320, 240);
        ctx.fillText('(Placeholder)', 320, 280);
        
        // Convert canvas to blob and create object URL
        canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            video.poster = url;
        });
        
        alert('Sample patient video loaded (placeholder). In production, load actual video file.');
    }

    // Pose detection with TensorFlow.js
    async togglePoseDetection() {
        this.poseDetectionEnabled = !this.poseDetectionEnabled;
        
        if (this.poseDetectionEnabled) {
            await this.initPoseDetection();
            this.runPoseDetection();
        } else {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
            // Clear canvases
            ['providerCanvas', 'patientCanvas'].forEach(id => {
                const canvas = document.getElementById(id);
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            });
            document.getElementById('providerPose').textContent = '';
            document.getElementById('patientPose').textContent = '';
        }
    }

    async initPoseDetection() {
        if (!this.detector) {
            try {
                const detectorConfig = {
                    modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING
                };
                this.detector = await poseDetection.createDetector(
                    poseDetection.SupportedModels.MoveNet,
                    detectorConfig
                );
                alert('Pose detection initialized!');
            } catch (error) {
                console.error('Pose detection error:', error);
                alert('Could not initialize pose detection');
                this.poseDetectionEnabled = false;
            }
        }
    }

    async runPoseDetection() {
        if (!this.poseDetectionEnabled || !this.detector) return;

        const providerVideo = document.getElementById('providerVideo');
        const providerCanvas = document.getElementById('providerCanvas');
        
        // Set canvas size to match video
        if (providerVideo.videoWidth > 0) {
            providerCanvas.width = providerVideo.videoWidth;
            providerCanvas.height = providerVideo.videoHeight;
        }

        try {
            if (providerVideo.readyState >= 2) {
                const poses = await this.detector.estimatePoses(providerVideo);
                
                if (poses.length > 0) {
                    this.drawPose(providerCanvas, poses[0]);
                    this.analyzePose(poses[0], 'providerPose');
                }
            }
        } catch (error) {
            console.error('Pose estimation error:', error);
        }

        this.animationId = requestAnimationFrame(() => this.runPoseDetection());
    }

    drawPose(canvas, pose) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw keypoints
        pose.keypoints.forEach(keypoint => {
            if (keypoint.score > 0.3) {
                ctx.fillStyle = '#00ff00';
                ctx.beginPath();
                ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
                ctx.fill();
            }
        });

        // Draw skeleton connections
        const connections = [
            [5, 6], [5, 7], [7, 9], [6, 8], [8, 10], // Arms
            [5, 11], [6, 12], [11, 12], // Torso
            [11, 13], [13, 15], [12, 14], [14, 16] // Legs
        ];

        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        
        connections.forEach(([i, j]) => {
            const kp1 = pose.keypoints[i];
            const kp2 = pose.keypoints[j];
            
            if (kp1.score > 0.3 && kp2.score > 0.3) {
                ctx.beginPath();
                ctx.moveTo(kp1.x, kp1.y);
                ctx.lineTo(kp2.x, kp2.y);
                ctx.stroke();
            }
        });
    }

    analyzePose(pose, labelId) {
        // Analyze body position and highlight regions
        const keypoints = pose.keypoints;
        
        // Simple pose analysis
        const nose = keypoints[0];
        const leftShoulder = keypoints[5];
        const rightShoulder = keypoints[6];
        
        let poseLabel = 'Pose detected';
        let region = 'full body';

        // Detect if patient is leaning (possible pain)
        if (leftShoulder.score > 0.3 && rightShoulder.score > 0.3) {
            const shoulderDiff = Math.abs(leftShoulder.y - rightShoulder.y);
            if (shoulderDiff > 50) {
                poseLabel = '⚠️ Leaning detected';
                region = 'torso';
            }
        }

        // Detect hand near face/head
        const leftWrist = keypoints[9];
        const rightWrist = keypoints[10];
        
        if (nose.score > 0.3) {
            if ((leftWrist.score > 0.3 && Math.abs(leftWrist.y - nose.y) < 100) ||
                (rightWrist.score > 0.3 && Math.abs(rightWrist.y - nose.y) < 100)) {
                poseLabel = '👋 Hand near head';
                region = 'head/face';
            }
        }

        document.getElementById(labelId).textContent = `${poseLabel} | Region: ${region}`;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SandhivaApp();
    
    // Set initial caption text
    document.getElementById('hindiText').textContent = 'Waiting for input...';
    document.getElementById('englishText').textContent = 'Waiting for input...';
});
