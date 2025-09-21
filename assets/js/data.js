// ===================================
// Language Learning Resources Data
// ===================================

// PATTERN: Data-driven architecture for easy content management
// WHY: Separating data from presentation allows non-technical updates

const languageData = {
    spanish: {
        name: "Spanish",
        nativeName: "Español",
        flag: "🇪🇸",
        learners: "559M",
        speakers: "460M native",
        difficulty: "Easy",
        description: "The world's second most spoken language, Spanish opens doors to vibrant cultures across Spain and Latin America.",
        highlights: ["Phonetic spelling", "Rich literature", "Growing importance in business"],
        resources: {
            apps: [
                { name: "SpanishDict", url: "https://www.spanishdict.com/", description: "Comprehensive dictionary and conjugation tool", free: true },
                { name: "Madrigal's Magic Key", url: "#", description: "Classic method focusing on cognates", free: false },
                { name: "Busuu", url: "https://www.busuu.com/", description: "Structured lessons with native speaker feedback", free: false }
            ],
            podcasts: [
                { name: "SpanishPod101", url: "https://www.spanishpod101.com/", description: "Structured lessons for all levels", free: true },
                { name: "Coffee Break Spanish", url: "https://coffeebreaklanguages.com/", description: "Quick 15-minute lessons", free: true },
                { name: "Duolingo Spanish Podcast", url: "https://podcast.duolingo.com/spanish", description: "Real stories from Latin America", free: true }
            ],
            communities: [
                { name: "HelloTalk", url: "https://www.hellotalk.com/", description: "Chat with native speakers", free: true },
                { name: "r/Spanish", url: "https://reddit.com/r/spanish", description: "Active Reddit community", free: true }
            ],
            books: [
                { name: "Madrigal's Magic Key to Spanish", author: "Margarita Madrigal", description: "Time-tested method" },
                { name: "Practice Makes Perfect Series", author: "Dorothy Richmond", description: "Comprehensive grammar practice" }
            ]
        }
    },

    french: {
        name: "French",
        nativeName: "Français",
        flag: "🇫🇷",
        learners: "280M",
        speakers: "280M native",
        difficulty: "Moderate",
        description: "The language of love, diplomacy, and haute cuisine. French remains crucial in international relations and arts.",
        highlights: ["UN working language", "Rich cultural heritage", "Spoken on 5 continents"],
        resources: {
            apps: [
                { name: "TV5Monde", url: "https://apprendre.tv5monde.com/", description: "Learn with authentic French media", free: true },
                { name: "Frantastique", url: "https://www.frantastique.com/", description: "Daily personalized lessons", free: false },
                { name: "FluentU French", url: "https://www.fluentu.com/", description: "Learn through real videos", free: false }
            ],
            podcasts: [
                { name: "InnerFrench", url: "https://innerfrench.com/", description: "Intermediate French with Hugo", free: true },
                { name: "Français Authentique", url: "https://www.francaisauthentique.com/", description: "Natural French learning", free: true }
            ],
            communities: [
                { name: "Alliance Française", url: "https://www.alliancefr.org/", description: "Global French cultural network", free: false },
                { name: "r/French", url: "https://reddit.com/r/french", description: "Helpful Reddit community", free: true }
            ]
        }
    },

    japanese: {
        name: "Japanese",
        nativeName: "日本語",
        flag: "🇯🇵",
        learners: "125M",
        speakers: "128M native",
        difficulty: "Hard",
        description: "Gateway to Japan's unique blend of tradition and innovation. Master three writing systems and unlock a fascinating culture.",
        highlights: ["3 writing systems", "Polite language levels", "Tech & pop culture"],
        resources: {
            apps: [
                { name: "WaniKani", url: "https://www.wanikani.com/", description: "Master Kanji through SRS", free: false },
                { name: "Bunpo", url: "https://bunpo.app/", description: "Grammar-focused learning", free: false },
                { name: "Japanese.io", url: "https://www.japanese.io/", description: "Read real Japanese with help", free: true }
            ],
            podcasts: [
                { name: "JapanesePod101", url: "https://www.japanesepod101.com/", description: "Comprehensive audio lessons", free: true },
                { name: "Nihongo con Teppei", url: "#", description: "Natural Japanese conversations", free: true }
            ],
            books: [
                { name: "Genki", author: "Eri Banno", description: "University standard textbook" },
                { name: "Remembering the Kanji", author: "James Heisig", description: "Systematic kanji learning" }
            ]
        }
    },

    german: {
        name: "German",
        nativeName: "Deutsch",
        flag: "🇩🇪",
        learners: "130M",
        speakers: "95M native",
        difficulty: "Moderate",
        description: "The language of engineering, philosophy, and classical music. Key to opportunities in Europe's economic powerhouse.",
        highlights: ["Logical grammar", "Compound words", "Business advantage"],
        resources: {
            apps: [
                { name: "Der Die Das", url: "#", description: "Master German articles", free: true },
                { name: "Nicos Weg", url: "https://learngerman.dw.com/", description: "Deutsche Welle's video course", free: true },
                { name: "Babbel", url: "https://www.babbel.com/", description: "Structured German courses", free: false }
            ],
            podcasts: [
                { name: "Slow German", url: "https://slowgerman.com/", description: "Clear, slow-paced German", free: true },
                { name: "Coffee Break German", url: "https://coffeebreaklanguages.com/", description: "Quick daily lessons", free: true }
            ],
            communities: [
                { name: "Goethe Institute", url: "https://www.goethe.de/", description: "Official German cultural institute", free: false }
            ]
        }
    },

    mandarin: {
        name: "Mandarin Chinese",
        nativeName: "中文",
        flag: "🇨🇳",
        learners: "200M",
        speakers: "918M native",
        difficulty: "Very Hard",
        description: "The world's most spoken native language. Essential for business and understanding China's growing global influence.",
        highlights: ["Tonal language", "Character-based writing", "Business essential"],
        resources: {
            apps: [
                { name: "HelloChinese", url: "https://www.hellochinese.cc/", description: "Game-like learning experience", free: true },
                { name: "Skritter", url: "https://skritter.com/", description: "Master Chinese characters", free: false },
                { name: "Du Chinese", url: "https://www.duchinese.net/", description: "Graded reading practice", free: true }
            ],
            podcasts: [
                { name: "ChinesePod", url: "https://chinesepod.com/", description: "Lessons for all levels", free: false },
                { name: "Mandarin Corner", url: "#", description: "YouTube immersion content", free: true }
            ],
            books: [
                { name: "Integrated Chinese", author: "Yuehua Liu", description: "University standard series" },
                { name: "HSK Standard Course", author: "Jiang Liping", description: "Official HSK preparation" }
            ]
        }
    },

    italian: {
        name: "Italian",
        nativeName: "Italiano",
        flag: "🇮🇹",
        learners: "85M",
        speakers: "65M native",
        difficulty: "Easy",
        description: "The melodious language of art, fashion, and cuisine. Your key to Italy's rich cultural treasures.",
        highlights: ["Musical quality", "Art & culture", "Culinary tradition"],
        resources: {
            apps: [
                { name: "ItalianPod101", url: "https://www.italianpod101.com/", description: "Comprehensive audio lessons", free: true },
                { name: "Conjuguemos", url: "https://conjuguemos.com/", description: "Practice Italian conjugations", free: true }
            ],
            podcasts: [
                { name: "Coffee Break Italian", url: "https://coffeebreaklanguages.com/", description: "Quick bite-sized lessons", free: true },
                { name: "News in Slow Italian", url: "#", description: "Current events at your pace", free: false }
            ],
            communities: [
                { name: "r/italianlearning", url: "https://reddit.com/r/italianlearning", description: "Supportive Reddit community", free: true }
            ]
        }
    },

    korean: {
        name: "Korean",
        nativeName: "한국어",
        flag: "🇰🇷",
        learners: "75M",
        speakers: "77M native",
        difficulty: "Hard",
        description: "Rising in popularity with K-pop and K-dramas. Features the logical Hangul alphabet, considered one of the world's best writing systems.",
        highlights: ["Logical alphabet", "Honorific system", "Pop culture boom"],
        resources: {
            apps: [
                { name: "Talk To Me In Korean", url: "https://talktomeinkorean.com/", description: "Popular structured curriculum", free: true },
                { name: "Memrise", url: "https://www.memrise.com/", description: "Vocabulary through spaced repetition", free: true }
            ],
            podcasts: [
                { name: "KoreanClass101", url: "https://www.koreanclass101.com/", description: "Comprehensive podcast lessons", free: true }
            ]
        }
    },

    portuguese: {
        name: "Portuguese",
        nativeName: "Português",
        flag: "🇧🇷",
        learners: "35M",
        speakers: "260M native",
        difficulty: "Easy-Moderate",
        description: "Spoken across four continents, Portuguese offers access to Brazil's emerging market and Portugal's historic charm.",
        highlights: ["Brazilian vs European variants", "Growing economic importance", "Musical language"],
        resources: {
            apps: [
                { name: "Semantica Portuguese", url: "https://www.semantica-portuguese.com/", description: "Video-based Brazilian Portuguese", free: false },
                { name: "Practice Portuguese", url: "https://www.practiceportuguese.com/", description: "European Portuguese focus", free: false }
            ],
            podcasts: [
                { name: "PortuguesePod101", url: "#", description: "Structured audio lessons", free: true }
            ]
        }
    },

    russian: {
        name: "Russian",
        nativeName: "Русский",
        flag: "🇷🇺",
        learners: "100M",
        speakers: "258M native",
        difficulty: "Hard",
        description: "The most widely spoken Slavic language, opening doors to Eastern Europe and Central Asia's rich literary tradition.",
        highlights: ["Cyrillic alphabet", "Case system", "Literary heritage"],
        resources: {
            apps: [
                { name: "Russian Alphabet Mastery", url: "#", description: "Master Cyrillic quickly", free: true },
                { name: "RussianPod101", url: "https://www.russianpod101.com/", description: "Comprehensive lessons", free: true }
            ],
            books: [
                { name: "New Penguin Russian Course", author: "Nicholas J. Brown", description: "Complete self-study guide" }
            ]
        }
    },

    arabic: {
        name: "Arabic",
        nativeName: "العربية",
        flag: "🇸🇦",
        learners: "120M",
        speakers: "422M native",
        difficulty: "Very Hard",
        description: "A key language for international relations, spoken across 25+ countries with rich dialectal variation.",
        highlights: ["Right-to-left script", "MSA vs dialects", "UN language"],
        resources: {
            apps: [
                { name: "ArabicPod101", url: "https://www.arabicpod101.com/", description: "Modern Standard Arabic", free: true },
                { name: "Mango Languages", url: "https://mangolanguages.com/", description: "Dialect-specific courses", free: false }
            ],
            books: [
                { name: "Alif Baa", author: "Brustad, Al-Batal, Al-Tonsi", description: "Introduction to Arabic letters and sounds" }
            ]
        }
    },

    dutch: {
        name: "Dutch",
        nativeName: "Nederlands",
        flag: "🇳🇱",
        learners: "5M",
        speakers: "24M native",
        difficulty: "Easy-Moderate",
        description: "The language of innovation and trade, Dutch opens doors to the Netherlands and Belgium's progressive societies.",
        highlights: ["Germanic roots", "Phonetic spelling", "Business language"],
        resources: {
            apps: [
                { name: "Duolingo Dutch", url: "https://www.duolingo.com/", description: "Complete free course from A1-B1", free: true },
                { name: "NT2 TaalMenu", url: "https://nt2taalmenu.nl/", description: "Integration exam preparation", free: true }
            ],
            courses: [
                { name: "University of Groningen MOOC", url: "https://www.futurelearn.com/courses/dutch", description: "Award-winning free course", free: true }
            ]
        }
    },

    danish: {
        name: "Danish",
        nativeName: "Dansk",
        flag: "🇩🇰",
        learners: "5M",
        speakers: "6M native",
        difficulty: "Easy-Moderate",
        description: "Gateway to Scandinavian culture and the concept of 'hygge', Danish offers a melodic introduction to Nordic languages.",
        highlights: ["Soft consonants", "Simple grammar", "Hygge culture"],
        resources: {
            apps: [
                { name: "GroVo Danish", url: "https://grovo.org/grovo-danish/", description: "100% free with 186,000+ sentences", free: true },
                { name: "Duolingo Danish", url: "https://www.duolingo.com/", description: "Gamified learning path", free: true }
            ],
            podcasts: [
                { name: "Simple Danish Podcast", url: "https://denmarkandme.com/podcast/", description: "Clear Danish with transcripts", free: true }
            ]
        }
    }
};

// Resource type descriptions for better UX
const resourceTypes = {
    apps: {
        icon: "📱",
        title: "Mobile Apps & Websites",
        description: "Interactive digital tools for daily practice"
    },
    podcasts: {
        icon: "🎧",
        title: "Podcasts & Audio",
        description: "Learn through listening during commutes"
    },
    books: {
        icon: "📚",
        title: "Books & Textbooks",
        description: "Structured learning with traditional materials"
    },
    communities: {
        icon: "👥",
        title: "Communities & Practice",
        description: "Connect with speakers and fellow learners"
    },
    videos: {
        icon: "🎬",
        title: "Videos & Courses",
        description: "Visual learning through video content"
    },
    tools: {
        icon: "🛠️",
        title: "Study Tools",
        description: "Flashcards, dictionaries, and utilities"
    }
};

// Learning methodology information
const methodologies = {
    spaced_repetition: {
        name: "Spaced Repetition System (SRS)",
        description: "Review material at increasing intervals to maximize long-term retention",
        tools: ["Anki", "WaniKani", "Memrise"],
        effectiveness: "Proven by cognitive science research"
    },
    immersion: {
        name: "Language Immersion",
        description: "Surround yourself with the target language through media and daily use",
        tools: ["Netflix", "YouTube", "News sites"],
        effectiveness: "Mimics natural language acquisition"
    },
    comprehensible_input: {
        name: "Comprehensible Input (CI)",
        description: "Focus on understanding messages slightly above your current level",
        tools: ["Graded readers", "LingQ", "Extensive reading"],
        effectiveness: "Based on Krashen's Input Hypothesis"
    },
    output_practice: {
        name: "Speaking & Writing Practice",
        description: "Actively produce the language through conversation and composition",
        tools: ["iTalki", "HelloTalk", "Lang-8"],
        effectiveness: "Essential for fluency development"
    }
};

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { languageData, resourceTypes, methodologies };
}