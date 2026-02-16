// Sandhiva Phrasebank - Cultural Clinical Translations
// 10+ Languages: Hindi, Spanish, Punjabi, Urdu, Bengali, Tamil, Telugu, Gujarati, Mandarin, Arabic

const phrasebank = {
    hindi: [
        {
            phrase: "mere kamar mein aag lagi hai",
            transliteration: "mere kamar mein aag lagi hai",
            literal: "my lower back is on fire",
            meanings: [
                "Severe lower back pain (most likely)",
                "Burning sensation in lumbar region",
                "Possible radiculopathy",
                "UTI referral pain (less common)"
            ],
            medicalInterpretation: "Patient indicates severe lower back pain with burning quality",
            questions: [
                "Does the pain shoot down your leg?",
                "Any numbness or tingling?",
                "Any trouble urinating or controlling bowels?"
            ],
            redFlags: ["cauda equina syndrome", "radiculopathy", "severe musculoskeletal strain"],
            bodyPart: "lumbar",
            confidence: 0.95,
            urgency: "medium-high",
            documentationText: "Patient indicates lumbar region pain with burning quality. Described as 'aag lagi hai' (fire in lower back)."
        },
        {
            phrase: "chakkar aa rahe hain",
            transliteration: "chakkar aa rahe hain",
            literal: "dizziness is coming",
            meanings: [
                "Vertigo/spinning sensation (most likely)",
                "Lightheadedness",
                "Feeling faint",
                "Confusion or disorientation"
            ],
            medicalInterpretation: "Patient experiencing dizziness, likely vertigo",
            questions: [
                "Is the room spinning around you?",
                "Have you fallen or nearly fallen?",
                "Any hearing changes or ringing in ears?"
            ],
            redFlags: ["stroke risk", "fall risk", "cardiac arrhythmia", "inner ear pathology"],
            bodyPart: "head",
            confidence: 0.98,
            urgency: "high",
            documentationText: "Patient reports dizziness described as 'chakkar aa rahe hain'. Requires stroke workup if acute."
        },
        {
            phrase: "dil doob raha hai",
            transliteration: "dil doob raha hai",
            literal: "heart is sinking",
            meanings: [
                "Depression/despair (most common)",
                "Chest heaviness/pressure",
                "Anxiety/panic",
                "Cardiac symptoms"
            ],
            medicalInterpretation: "Could indicate depression OR cardiac symptoms - requires clarification",
            questions: [
                "Do you feel sad or hopeless?",
                "Any chest pain, pressure, or tightness?",
                "Any trouble breathing or sweating?"
            ],
            redFlags: ["MI risk", "depression", "suicidal ideation", "panic disorder"],
            bodyPart: "chest",
            confidence: 0.85,
            urgency: "high",
            documentationText: "Patient describes 'dil doob raha hai' (sinking heart) - ambiguous between cardiac and psychiatric symptoms."
        },
        {
            phrase: "meri rooh kaanp rahi hai",
            transliteration: "meri rooh kaanp rahi hai",
            literal: "my soul is trembling",
            meanings: [
                "Severe panic/anxiety (most likely)",
                "Trauma response",
                "Dread or terror",
                "PTSD symptoms"
            ],
            medicalInterpretation: "Patient experiencing severe anxiety, panic, or trauma response",
            questions: [
                "Have you experienced something frightening recently?",
                "Are you having racing thoughts or feeling unsafe?",
                "Any history of trauma or PTSD?"
            ],
            redFlags: ["panic attack", "PTSD", "acute stress reaction", "suicidal ideation"],
            bodyPart: "general",
            confidence: 0.92,
            urgency: "high",
            documentationText: "Patient reports severe anxiety/panic described as 'rooh kaanp rahi hai' (soul trembling)."
        },
        {
            phrase: "पेट में चूहे कूद रहे हैं",
            transliteration: "pet mein chuhe kood rahe hain",
            literal: "mice are jumping in stomach",
            meanings: [
                "Extreme hunger (most likely)",
                "Stomach growling/gurgling",
                "Food insecurity"
            ],
            medicalInterpretation: "Patient reports hunger or possible food insecurity",
            questions: [
                "When did you last eat?",
                "Do you have access to regular meals?",
                "Any nausea or other symptoms?"
            ],
            redFlags: ["food insecurity", "malnutrition risk", "hypoglycemia"],
            bodyPart: "abdomen",
            confidence: 0.95,
            urgency: "low",
            documentationText: "Patient indicates hunger described as 'chuhe kood rahe hain' (mice jumping in stomach)."
        },
        {
            phrase: "gas ban rahi hai",
            transliteration: "gas ban rahi hai",
            literal: "gas is forming",
            meanings: [
                "Bloating/gas (most likely)",
                "Indigestion",
                "Abdominal distention",
                "Possible obstruction (if severe)"
            ],
            medicalInterpretation: "Patient reports bloating or abdominal gas",
            questions: [
                "Is your stomach swollen or tight?",
                "When did you last pass gas or have a bowel movement?",
                "Any vomiting or severe pain?"
            ],
            redFlags: ["bowel obstruction", "appendicitis", "severe constipation"],
            bodyPart: "abdomen",
            confidence: 0.90,
            urgency: "low-medium",
            documentationText: "Patient reports abdominal bloating described as 'gas ban rahi hai'."
        },
        {
            phrase: "सांस फूल रही है",
            transliteration: "saans phool rahi hai",
            literal: "breath is swelling",
            meanings: [
                "Shortness of breath (most likely)",
                "Difficulty breathing",
                "Breathlessness from exertion"
            ],
            medicalInterpretation: "Patient experiencing dyspnea",
            questions: [
                "How many stairs can you climb before feeling breathless?",
                "Any chest pain or tightness?",
                "Do you have asthma or heart problems?"
            ],
            redFlags: ["MI", "pulmonary embolism", "CHF exacerbation", "asthma attack"],
            bodyPart: "chest",
            confidence: 0.96,
            urgency: "high",
            documentationText: "Patient reports dyspnea described as 'saans phool rahi hai' (swelling breath)."
        }
    ],
    spanish: [
        {
            phrase: "me duele el pecho",
            transliteration: "me duele el pecho",
            literal: "my chest hurts",
            meanings: [
                "Chest pain (most likely)",
                "Heartache (emotional)",
                "Breast pain"
            ],
            medicalInterpretation: "Chest pain - requires immediate cardiac assessment",
            questions: [
                "When did the pain start?",
                "Is it sharp, dull, or crushing?",
                "Does it radiate to your arm or jaw?"
            ],
            redFlags: ["MI risk", "cardiac emergency", "pulmonary embolism", "aortic dissection"],
            bodyPart: "chest",
            confidence: 0.95,
            urgency: "critical",
            documentationText: "Patient reports chest pain described as 'me duele el pecho'. Requires immediate cardiac workup."
        },
        {
            phrase: "me falta el aire",
            transliteration: "me falta el aire",
            literal: "I lack air",
            meanings: [
                "Shortness of breath (most likely)",
                "Difficulty breathing",
                "Panic/anxiety",
                "Suffocating feeling"
            ],
            medicalInterpretation: "Respiratory distress or panic",
            questions: [
                "How long have you had trouble breathing?",
                "Any chest pain?",
                "Do you have asthma or other lung conditions?"
            ],
            redFlags: ["respiratory emergency", "MI", "pulmonary embolism", "asthma attack", "pneumothorax"],
            bodyPart: "chest",
            confidence: 0.96,
            urgency: "critical",
            documentationText: "Patient reports dyspnea described as 'me falta el aire' (lacking air)."
        },
        {
            phrase: "se me fue el alma",
            transliteration: "se me fue el alma",
            literal: "my soul left me",
            meanings: [
                "Fainted/syncope (most likely)",
                "Severe shock or fright",
                "Near-death feeling"
            ],
            medicalInterpretation: "Loss of consciousness or severe emotional distress",
            questions: [
                "Did you lose consciousness?",
                "Were you frightened by something?",
                "Any chest pain or breathing problems?"
            ],
            redFlags: ["syncope", "panic attack", "cardiac event", "neurological issue"],
            bodyPart: "general",
            confidence: 0.88,
            urgency: "high",
            documentationText: "Patient describes 'se me fue el alma' (soul left) - possible syncope or severe panic."
        },
        {
            phrase: "tengo el estómago revuelto",
            transliteration: "tengo el estómago revuelto",
            literal: "I have a stirred stomach",
            meanings: [
                "Nausea (most likely)",
                "Upset stomach",
                "Digestive distress",
                "Morning sickness"
            ],
            medicalInterpretation: "Gastrointestinal distress with nausea",
            questions: [
                "Any vomiting or diarrhea?",
                "What did you eat recently?",
                "Any fever or blood in stool?"
            ],
            redFlags: ["food poisoning", "gastroenteritis", "appendicitis", "bowel obstruction"],
            bodyPart: "abdomen",
            confidence: 0.91,
            urgency: "low-medium",
            documentationText: "Patient reports nausea described as 'estómago revuelto' (stirred stomach)."
        },
        {
            phrase: "se me pone la piel de gallina",
            transliteration: "se me pone la piel de gallina",
            literal: "I get chicken skin",
            meanings: [
                "Chills/rigors (most likely)",
                "Fever",
                "Cold sensation",
                "Emotional response"
            ],
            medicalInterpretation: "Chills possibly indicating fever or infection",
            questions: [
                "Do you have a fever?",
                "Any other symptoms like cough or body aches?",
                "When did this start?"
            ],
            redFlags: ["infection", "sepsis risk", "influenza", "bacteremia"],
            bodyPart: "general",
            confidence: 0.87,
            urgency: "medium",
            documentationText: "Patient reports chills described as 'piel de gallina' (chicken skin/goosebumps)."
        },
        {
            phrase: "me pesan las piernas",
            transliteration: "me pesan las piernas",
            literal: "my legs feel heavy",
            meanings: [
                "Leg heaviness/fatigue (most likely)",
                "Poor circulation",
                "Venous insufficiency",
                "DVT (less common)"
            ],
            medicalInterpretation: "Patient reports lower extremity heaviness or fatigue",
            questions: [
                "Is one leg more swollen than the other?",
                "Any pain, redness, or warmth?",
                "Does elevating your legs help?"
            ],
            redFlags: ["DVT", "venous insufficiency", "peripheral artery disease"],
            bodyPart: "legs",
            confidence: 0.89,
            urgency: "medium",
            documentationText: "Patient describes leg heaviness as 'me pesan las piernas'."
        }
    ],
    punjabi: [
        {
            phrase: "ਮੇਰਾ ਸਿਰ ਫਟ ਰਿਹਾ ਹੈ",
            transliteration: "mera sir phat riha hai",
            literal: "my head is bursting",
            meanings: [
                "Severe headache (most likely)",
                "Migraine",
                "Head pressure"
            ],
            medicalInterpretation: "Patient experiencing severe headache",
            questions: [
                "Is this the worst headache of your life?",
                "Any vision changes or neck stiffness?",
                "Any nausea or vomiting?"
            ],
            redFlags: ["subarachnoid hemorrhage", "meningitis", "severe migraine"],
            bodyPart: "head",
            confidence: 0.94,
            urgency: "high",
            documentationText: "Patient reports severe headache described as 'sir phat riha hai' (head bursting)."
        }
    ],
    urdu: [
        {
            phrase: "سینے میں جلن",
            transliteration: "seene mein jalan",
            literal: "burning in chest",
            meanings: [
                "Heartburn/GERD (most likely)",
                "Chest pain",
                "Acid reflux"
            ],
            medicalInterpretation: "Patient reports chest burning, likely GERD or cardiac",
            questions: [
                "Does it get worse after eating?",
                "Any shortness of breath?",
                "Does it improve with antacids?"
            ],
            redFlags: ["MI", "GERD", "esophageal issues"],
            bodyPart: "chest",
            confidence: 0.91,
            urgency: "medium-high",
            documentationText: "Patient reports chest burning described as 'seene mein jalan'."
        }
    ],
    bengali: [
        {
            phrase: "পেট ব্যথা করছে",
            transliteration: "pet byatha korchhe",
            literal: "stomach is hurting",
            meanings: [
                "Abdominal pain (most likely)",
                "Stomach ache",
                "Gastric distress"
            ],
            medicalInterpretation: "Patient experiencing abdominal pain",
            questions: [
                "Where exactly does it hurt?",
                "How long has it been hurting?",
                "Any changes in bowel movements?"
            ],
            redFlags: ["appendicitis", "bowel obstruction", "perforation"],
            bodyPart: "abdomen",
            confidence: 0.93,
            urgency: "medium",
            documentationText: "Patient reports abdominal pain described as 'pet byatha korchhe'."
        }
    ],
    tamil: [
        {
            phrase: "மூச்சு வாங்குது",
            transliteration: "moochu vaangudu",
            literal: "breath is being taken",
            meanings: [
                "Shortness of breath (most likely)",
                "Difficulty breathing",
                "Breathlessness"
            ],
            medicalInterpretation: "Patient experiencing dyspnea",
            questions: [
                "When did the breathing difficulty start?",
                "Any chest pain?",
                "Do you have asthma?"
            ],
            redFlags: ["respiratory distress", "MI", "asthma", "COPD exacerbation"],
            bodyPart: "chest",
            confidence: 0.95,
            urgency: "high",
            documentationText: "Patient reports dyspnea described as 'moochu vaangudu'."
        }
    ],
    telugu: [
        {
            phrase: "తలనొప్పి ఉంది",
            transliteration: "talanoppi undi",
            literal: "there is head pain",
            meanings: [
                "Headache (most likely)",
                "Head pain",
                "Cephalalgia"
            ],
            medicalInterpretation: "Patient experiencing headache",
            questions: [
                "How severe is the pain (1-10)?",
                "Any vision or balance problems?",
                "When did it start?"
            ],
            redFlags: ["migraine", "stroke", "meningitis"],
            bodyPart: "head",
            confidence: 0.96,
            urgency: "medium",
            documentationText: "Patient reports headache described as 'talanoppi undi'."
        }
    ],
    gujarati: [
        {
            phrase: "છાતીમાં દુખાવો",
            transliteration: "chhatima dukhavo",
            literal: "pain in chest",
            meanings: [
                "Chest pain (most likely)",
                "Chest discomfort",
                "Cardiac symptoms"
            ],
            medicalInterpretation: "Patient reports chest pain requiring assessment",
            questions: [
                "Is the pain constant or does it come and go?",
                "Any arm or jaw pain?",
                "Any sweating or nausea?"
            ],
            redFlags: ["MI", "angina", "pulmonary embolism"],
            bodyPart: "chest",
            confidence: 0.94,
            urgency: "critical",
            documentationText: "Patient reports chest pain described as 'chhatima dukhavo'."
        }
    ],
    mandarin: [
        {
            phrase: "头晕目眩",
            transliteration: "tóu yūn mù xuàn",
            literal: "head dizzy eyes dazzled",
            meanings: [
                "Severe dizziness (most likely)",
                "Vertigo",
                "Disorientation"
            ],
            medicalInterpretation: "Patient experiencing severe dizziness or vertigo",
            questions: [
                "Is the room spinning?",
                "Have you fallen?",
                "Any headache or vision changes?"
            ],
            redFlags: ["stroke", "vertigo", "inner ear disorder"],
            bodyPart: "head",
            confidence: 0.92,
            urgency: "high",
            documentationText: "Patient reports severe dizziness described as '头晕目眩' (tóu yūn mù xuàn)."
        }
    ],
    arabic: [
        {
            phrase: "ألم في الصدر",
            transliteration: "alam fi al-sadr",
            literal: "pain in the chest",
            meanings: [
                "Chest pain (most likely)",
                "Cardiac symptoms",
                "Chest discomfort"
            ],
            medicalInterpretation: "Patient reports chest pain requiring immediate evaluation",
            questions: [
                "When did it start?",
                "Does anything make it better or worse?",
                "Any difficulty breathing?"
            ],
            redFlags: ["MI", "cardiac emergency", "pulmonary issues"],
            bodyPart: "chest",
            confidence: 0.95,
            urgency: "critical",
            documentationText: "Patient reports chest pain described as 'alam fi al-sadr'."
        }
    ]
};

// Export for use in the app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = phrasebank;
}
