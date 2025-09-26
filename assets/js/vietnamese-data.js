// Vietnamese Language Learning Resources Data
(function(global) {
    'use strict';

    // CONCEPT: Modular language data structure
    // WHY: Consistent interface for resource aggregation
    // PATTERN: Module pattern with global registration

    const vietnameseData = {
        name: "Vietnamese",
        nativeName: "Tiếng Việt",
        code: 'vi',
        flag: "🇻🇳",
        speakers: "90M",
        difficulty: "Hard",
        description: "A tonal language with rich history, Vietnamese offers excellent free resources including MSU's Creative Commons textbooks and strong government FSI materials.",

        resources: {
            courses: [
                {
                    category: "Open Educational Resources",
                    items: [
                        {
                            name: "Basic Vietnamese (MSU)",
                            url: "https://openbooks.lib.msu.edu/vietnamese/",
                            description: "Complete 15-chapter textbook with pronunciation sections",
                            level: "Novice to Intermediate-Low",
                            free: true,
                            features: ["Creative Commons license", "Multimedia materials", "Native speaker audio", "Comprehensive curriculum"]
                        },
                        {
                            name: "Intermediate Vietnamese (MSU)",
                            url: "https://lctlpartnership.celta.msu.edu/vietnamese/",
                            description: "Task-based approach with authentic materials",
                            level: "Intermediate",
                            free: true,
                            features: ["Real-life situations", "Task-based learning", "Authentic materials", "Progressive difficulty"]
                        },
                        {
                            name: "Southern Vietnamese for Beginners",
                            url: "https://archive.org/details/anh-bui-and-jack-noble-southern-vietnamese-for-beginners-2020",
                            description: "20-chapter comic-style course",
                            level: "Beginner",
                            free: true,
                            features: ["Southern dialect focus", "Story-based learning", "Comic format", "Visual approach"]
                        },
                        {
                            name: "FSI Vietnamese Basic Course",
                            url: "https://www.livelingua.com/project/fsi/vietnamese",
                            description: "Government-developed systematic course",
                            level: "Beginner to Intermediate",
                            free: true,
                            features: ["Public domain", "715 pages", "55 audio files", "Diplomatic training quality"]
                        },
                        {
                            name: "Tieng Viet Men Yeu Series",
                            url: "https://archive.org/details/tieng-viet-men-yeu-a-vietnamese-level-a-textbook",
                            description: "Multi-level textbook series (A-D)",
                            level: "All levels",
                            free: true,
                            features: ["Complete series", "Teacher editions", "Progressive levels", "Comprehensive coverage"]
                        },
                        {
                            name: "Elementary Vietnamese",
                            url: "https://archive.org/details/elementaryvietna0000ngnh",
                            description: "Harvard/Tuttle college-level course",
                            level: "Beginner to Intermediate",
                            free: true,
                            features: ["Cultural notes", "Pronunciation drills", "University-level", "Structured approach"]
                        }
                    ]
                },
                {
                    category: "Online Platforms",
                    items: [
                        {
                            name: "Duolingo Vietnamese",
                            url: "https://www.duolingo.com/course/vi/en/Learn-Vietnamese",
                            description: "75 units with 1,294 lessons",
                            level: "Beginner to Intermediate",
                            free: true,
                            features: ["Completely free", "Gamified", "Northern dialect", "Mobile app"]
                        },
                        {
                            name: "HowToVietnamese",
                            url: "https://howtovietnamese.com/",
                            description: "Southern dialect focused lessons",
                            level: "Beginner to Intermediate",
                            free: true,
                            features: ["Practical conversations", "Quality audio", "Southern accent", "Real-life focus"]
                        },
                        {
                            name: "Loecsen",
                            url: "https://www.loecsen.com/en/learn-vietnamese",
                            description: "Travel-focused essential expressions",
                            level: "Beginner",
                            free: true,
                            features: ["North/South dialect notes", "Travel situations", "Audio pronunciation", "Visual aids"]
                        }
                    ]
                },
                {
                    category: "University Programs",
                    items: [
                    ]
                }
            ],

            apps: [
                {
                    name: "Anki",
                    url: "https://apps.ankiweb.net/",
                    description: "Spaced repetition flashcards with Vietnamese decks",
                    level: "All levels",
                    free: true,
                    features: ["Desktop free", "Community decks", "Spaced repetition", "Custom cards"]
                },
                {
                    name: "Drops Vietnamese",
                    url: "https://languagedrops.com/",
                    description: "Visual vocabulary learning",
                    level: "Beginner to Intermediate",
                    free: true,
                    features: ["5 minutes/day free", "Beautiful graphics", "Visual learning", "Topic-based"]
                },
                {
                    name: "Memrise Vietnamese",
                    url: "https://www.memrise.com/",
                    description: "Official course + community courses",
                    level: "Beginner to Intermediate",
                    free: true,
                    features: ["Native speaker videos", "Spaced repetition", "Community content", "Mobile app"]
                },
                {
                    name: "Vietnamese by Nemo",
                    url: "iOS/Android app stores",
                    description: "Essential phrases app",
                    level: "Beginner",
                    free: true,
                    features: ["Basic version free", "Offline capable", "Audio pronunciation", "Travel focus"]
                },
                {
                    name: "Mondly",
                    url: "https://www.mondly.com/",
                    description: "AR/VR integration, chatbots",
                    level: "Beginner to Advanced",
                    free: true,
                    features: ["Basic lessons free", "Speech recognition", "AR/VR features", "Chatbot practice"]
                },
                {
                    name: "Digital Dialects",
                    url: "https://www.digitaldialects.com/Vietnamese.htm",
                    description: "Browser-based vocabulary games",
                    level: "Beginner",
                    free: true,
                    features: ["Free vocabulary games", "Alphabet games", "No registration", "Immediate feedback"]
                },
                {
                    name: "UniKey",
                    url: "https://www.unikey.org/",
                    description: "Vietnamese input method",
                    level: "All users",
                    free: true,
                    features: ["VNI support", "Telex support", "Most popular IME", "Windows/Mac/Linux"]
                }
            ],

            books: [
                {
                    category: "Digital Libraries",
                    items: [
                        {
                            name: "National Library of Vietnam",
                            url: "https://nlv.gov.vn/",
                            description: "Digital collections of literature and history",
                            level: "Various",
                            free: true,
                            features: ["Hán-Nôm manuscripts", "Doctoral theses", "Historical texts", "Cultural materials"]
                        },
                        {
                            name: "BIBLIO.VN",
                            url: "https://biblio.vn/",
                            description: "Scientific and literary works",
                            level: "Academic/General",
                            free: true,
                            features: ["Free registration", "Multiple formats", "Academic content", "Literary works"]
                        },
                        {
                            name: "Vietnamese Digital Educational Library",
                            url: "https://thuviensachso.edu.vn/",
                            description: "Primary school materials and interactive books",
                            level: "Elementary to Intermediate",
                            free: true,
                            features: ["Interactive features", "Subject categories", "School materials", "Grade-aligned"]
                        },
                    ]
                },
                {
                    category: "Textbooks and References",
                    items: [
                        {
                            name: "Vietnamese Reference Grammar",
                            url: "https://archive.org/details/vietnameserefere0000thom",
                            description: "Comprehensive grammar reference by Thompson",
                            level: "All levels",
                            free: true,
                            features: ["386 pages", "Authoritative source", "Complete grammar", "Academic reference"]
                        },
                        {
                            name: "EVBCorpus",
                            url: "https://github.com/qhungngo/EVBCorpus",
                            description: "20+ million word bilingual corpus",
                            level: "Various",
                            free: true,
                            features: ["Sentence-aligned", "Research-oriented", "Bilingual", "Large corpus"]
                        },
                    ]
                },
                {
                    category: "News and Current Events",
                    items: [
                        {
                            name: "VnExpress International",
                            url: "https://e.vnexpress.net/",
                            description: "English news about Vietnam",
                            level: "Intermediate to Advanced",
                            free: true,
                            features: ["Daily updates", "Bilingual features", "Current events", "Cultural content"]
                        },
                    ]
                }
            ],

            audio: [
                {
                    category: "YouTube Channels",
                    items: [
                        {
                            name: "Tieng Viet Oi",
                            url: "https://www.youtube.com/channel/UCBWZ4YRAivDHkIhNMs6iQ4A",
                            description: "54.4K subscribers, practical lessons",
                            level: "All levels",
                            free: true,
                            features: ["Games", "Activities", "Natural conversation", "Interactive approach"]
                        },
                        {
                            name: "Learn Vietnamese with Annie",
                            url: "https://www.youtube.com/channel/UCoHqnZy_SFICoaC0M-iLlRg",
                            description: "41.7K subscribers, comics integration",
                            level: "Beginner to Intermediate",
                            free: true,
                            features: ["Visual storytelling", "Cultural insights", "Comic format", "Engaging content"]
                        },
                        {
                            name: "Learn Vietnamese with SVFF",
                            url: "https://www.youtube.com/channel/UCWbQ6k9-GxboKL4gQE1bz3w",
                            description: "33.2K subscribers, cultural immersion",
                            level: "All levels",
                            free: true,
                            features: ["Real-world communication", "Cultural focus", "Practical lessons", "Immersive approach"]
                        },
                        {
                            name: "HowToVietnamese YouTube",
                            url: "https://www.youtube.com/channel/UC0fspKfWI99xkoh-RcsNFew",
                            description: "14.5K subscribers, Southern dialect",
                            level: "All levels",
                            free: true,
                            features: ["Southern accent", "Visual aids", "Clear explanations", "Dialect-specific"]
                        }
                    ]
                },
                {
                    category: "Podcasts",
                    items: [
                    ]
                },
                {
                    category: "Media Resources",
                    items: [
                        {
                            name: "Viet Channels",
                            url: "https://www.vietchannels.com/",
                            description: "Multiple Vietnamese TV channels",
                            level: "All levels",
                            free: true,
                            features: ["Live streaming", "DVR", "Free registration", "Multiple channels"]
                        },
                    ]
                }
            ],

            practice: [
                {
                    category: "Language Exchange",
                    items: [
                        {
                            name: "Reddit r/Vietnamese",
                            url: "https://reddit.com/r/vietnamese",
                            description: "27,000+ member community",
                            level: "All levels",
                            free: true,
                            features: ["Q&A threads", "Resource sharing", "Native speakers", "Active community"]
                        },
                        {
                            name: "MyLanguageExchange",
                            url: "https://mylanguageexchange.com/",
                            description: "Email and chat exchanges",
                            level: "All levels",
                            free: true,
                            features: ["Detailed matching", "Cultural focus", "Various formats", "Structured exchange"]
                        },
                        {
                            name: "Hilokal",
                            url: "https://www.hilokal.com/en/speak/Vietnamese",
                            description: "Audio conversation practice",
                            level: "All levels",
                            free: true,
                            features: ["Drop-in chatrooms", "No video required", "Audio-only", "Casual practice"]
                        }
                    ]
                },
                {
                    category: "Dictionaries and Tools",
                    items: [
                        {
                            name: "Cambridge Vietnamese Dictionary",
                            url: "https://dictionary.cambridge.org/us/dictionary/english-vietnamese/",
                            description: "PASSWORD dictionary",
                            level: "All levels",
                            free: true,
                            features: ["Example sentences", "Bilingual approach", "Academic quality", "Audio pronunciation"]
                        },
                        {
                            name: "Sketch Engine viTenTen",
                            url: "https://www.sketchengine.eu/vitenten-vietnamese-corpus/",
                            description: "6 billion word corpus",
                            level: "Research/Advanced",
                            free: true,
                            features: ["POS-tagged", "Frequency lists", "Research tool", "Massive corpus"]
                        },
                        {
                            name: "YourVietnamese Pronunciation",
                            url: "https://yourvietnamese.com/learn-vietnamese/pronounce-vietnamese-words/",
                            description: "IPA pronunciation guide",
                            level: "All levels",
                            free: true,
                            features: ["Audio recordings", "Regional differences", "IPA notation", "Clear guides"]
                        }
                    ]
                },
                {
                    category: "Text-to-Speech",
                    items: [
                        {
                            name: "ElevenLabs Vietnamese TTS",
                            url: "https://elevenlabs.io/text-to-speech/vietnamese",
                            description: "AI-powered TTS",
                            level: "All levels",
                            free: true,
                            features: ["Emotional control", "Multiple voices", "AI quality", "Natural sound"]
                        },
                        {
                            name: "Sapling Vietnamese",
                            url: "https://sapling.ai/lang/vietnamese",
                            description: "Spell checker",
                            level: "All levels",
                            free: true,
                            features: ["Browser integration", "API available", "Grammar check", "Writing assistant"]
                        }
                    ]
                },
                {
                    category: "Development Tools",
                    items: [
                        {
                            name: "Underthesea",
                            url: "https://github.com/undertheseanlp/underthesea",
                            description: "Vietnamese NLP toolkit",
                            level: "Developers",
                            free: true,
                            features: ["Open source", "TTS", "Word segmentation", "NLP tools"]
                        },
                        {
                            name: "VnCoreNLP",
                            url: "https://github.com/vncorenlp/VnCoreNLP",
                            description: "NLP pipeline",
                            level: "Developers",
                            free: true,
                            features: ["Open source", "University-developed", "Complete pipeline", "Research quality"]
                        }
                    ]
                }
            ]
        }
    };

    // Register Vietnamese data globally
    if (typeof languageData !== 'undefined') {
        languageData.vietnamese = vietnameseData;
    } else {
        global.languageData = { vietnamese: vietnameseData };
    }

})(window);