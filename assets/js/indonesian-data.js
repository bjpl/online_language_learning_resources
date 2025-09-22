// ===================================
// Indonesian Language Resources Data
// ===================================

// Add Indonesian to the global languageData object
if (typeof languageData === 'undefined') {
    window.languageData = {};
}

languageData.indonesian = {
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
    flag: "🇮🇩",
    code: "id",
    description: "The official language of Indonesia, spoken by over 270 million people. A standardized form of Malay, it serves as a lingua franca across the Indonesian archipelago's 17,000+ islands.",
    speakers: "43 million native, 270+ million total speakers",
    countries: ["Indonesia", "East Timor (working language)"],
    difficulty: "Easy for English speakers",

    resources: {
        courses: [
            {
                category: "Complete Courses",
                items: [
                    {
                        name: "Duolingo Indonesian",
                        url: "https://www.duolingo.com/course/id/en/Learn-Indonesian",
                        description: "Gamified bite-sized lessons with mobile support",
                        free: true,
                        level: "A1-B1",
                        features: ["Mobile app", "Offline mode", "Streak tracking", "Speaking exercises"]
                    },
                    {
                        name: "Live Lingua (US Peace Corps)",
                        url: "https://www.livelingua.com/courses/indonesian",
                        description: "6 complete Indonesian courses using Peace Corps materials",
                        free: true,
                        level: "Beginner-Intermediate",
                        features: ["44 ebooks", "190 audio files", "Downloadable content", "No registration"]
                    },
                    {
                        name: "MOOC Universitas Airlangga",
                        url: "https://mooc.unair.ac.id/",
                        description: "Free courses from leading Indonesian university",
                        free: true,
                        level: "Various levels",
                        features: ["BIPA courses", "University certificates", "Indonesian professors"]
                    },
                    {
                        name: "BIPA Universitas Terbuka",
                        url: "https://bipa.ut.ac.id/",
                        description: "Indonesia's Open University BIPA program",
                        free: true,
                        level: "A1-C2",
                        features: ["CEFR-aligned", "Distance learning", "Government backing"]
                    },
                    {
                        name: "University of Hawaii Indonesian",
                        url: "https://www.aifis.org/language-resources",
                        description: "Series of 5 comprehensive courses",
                        free: true,
                        level: "A1-C2",
                        features: ["Academic quality", "Cultural insights", "Structured progression"]
                    },
                    {
                        name: "Indonesian-Online.com",
                        url: "https://indonesian-online.com/",
                        description: "The Indonesian Way course with free samples",
                        free: true,
                        level: "A1-C2",
                        features: ["113 structured lessons", "University-adopted", "Anki flashcards"]
                    },
                    {
                        name: "50Languages",
                        url: "https://www.50languages.com/indonesian-for-free",
                        description: "100 free lessons with practical approach",
                        free: true,
                        level: "A1-B1",
                        features: ["MP3 audio files", "Mobile app", "Offline capability"]
                    },
                    {
                        name: "Memrise Community",
                        url: "https://www.memrise.com/en-us/learn-indonesian",
                        description: "Community-created Indonesian courses",
                        free: true,
                        level: "All levels",
                        features: ["Native speaker audio", "Spaced repetition", "Gamification"]
                    },
                    {
                        name: "SOAS University London",
                        url: "https://www.soas.ac.uk/study/find-course/indonesian-beginners-course",
                        description: "20-hour blended Indonesian course",
                        free: true,
                        level: "A1-A2",
                        features: ["Academic approach", "4 skills focus", "International perspective"]
                    }
                ]
            },
            {
                category: "Government & Official Resources",
                items: [
                    {
                        name: "BIPA Daring",
                        url: "https://bipa.kemdikbud.go.id/belajar_eng.php",
                        description: "Official Ministry of Education BIPA platform",
                        free: true,
                        level: "BIPA 1-3",
                        features: ["435 books", "Video tutorials", "Sahabatku Indonesia series"]
                    },
                    {
                        name: "Badan Bahasa",
                        url: "https://badanbahasa.kemdikbud.go.id/",
                        description: "Language Development Agency official site",
                        free: true,
                        level: "All levels",
                        features: ["UKBI testing", "30 language centers", "Diplomatic training"]
                    },
                    {
                        name: "Rumah Belajar",
                        url: "https://belajar.kemdikbud.go.id",
                        description: "Ministry of Education LMS",
                        free: true,
                        level: "All levels",
                        features: ["Video/audio/games", "Virtual labs", "Assessment tools"]
                    },
                    {
                        name: "SIBI Book System",
                        url: "https://buku.kemdikbud.go.id/",
                        description: "Official textbook platform",
                        free: true,
                        level: "All school levels",
                        features: ["PDF/audio/interactive", "Free Ministry publications"]
                    },
                    {
                        name: "UKBI Testing",
                        url: "https://ukbi.kemdikbud.go.id/",
                        description: "Official proficiency test preparation",
                        free: true,
                        level: "All levels",
                        features: ["5 sections", "National certification", "Simulation materials"]
                    },
                    {
                        name: "Darmasiswa Scholarship",
                        url: "https://darmasiswa.kemdikbud.go.id/",
                        description: "Government scholarship program info",
                        free: true,
                        level: "All levels",
                        features: ["Full immersion", "68 institutions", "Cultural studies"]
                    }
                ]
            },
            {
                category: "University Resources",
                items: [
                    {
                        name: "Universitas Terbuka OER",
                        url: "http://rumahbelajar.id/",
                        description: "Indonesian Open University resources",
                        free: true,
                        level: "All levels",
                        features: ["702 MOOCs", "10+ million participants", "ASEAN Studies"]
                    },
                    {
                        name: "UI Scholar Hub",
                        url: "https://scholarhub.ui.ac.id/",
                        description: "University of Indonesia repository",
                        free: true,
                        level: "Academic",
                        features: ["Open access research", "Language publications"]
                    },
                    {
                        name: "IndonesianPod101",
                        url: "https://www.indonesianpod101.com/",
                        description: "Audio/video lessons with free content",
                        free: true,
                        level: "All levels",
                        features: ["Weekly free lessons", "Mobile app", "Podcast format", "Transcripts"]
                    }
                ]
            }
        ],

        apps: [
            {
                name: "Duolingo App",
                url: "https://www.duolingo.com/",
                description: "Mobile language learning",
                free: true,
                level: "A1-B1",
                features: ["Offline mode", "Stories", "Progress sync"]
            },
            {
                name: "Ling App",
                url: "https://ling-app.com/learn-indonesian/",
                description: "Interactive mobile lessons",
                free: true,
                level: "Beginner-Advanced",
                features: ["5 levels", "Offline mode", "Cultural context"]
            },
            {
                name: "Drops Indonesian",
                url: "https://languagedrops.com/",
                description: "Visual vocabulary learning",
                free: true,
                level: "Beginner",
                features: ["2600+ illustrated words", "100% free content", "5-minute sessions"]
            },
            {
                name: "Anki",
                url: "https://ankiweb.net/",
                description: "Flashcard system with Indonesian decks",
                free: true,
                level: "All levels",
                features: ["Spaced repetition", "Customizable", "Sync across devices"]
            },
            {
                name: "Language Reactor",
                url: "https://www.languagereactor.com/",
                description: "Browser extension for video learning",
                free: true,
                level: "All levels",
                features: ["Netflix/YouTube subtitles", "Popup dictionary", "Dual subtitles"]
            },
            {
                name: "Readlang",
                url: "https://readlang.com/",
                description: "Click-to-translate reading",
                free: true,
                level: "All levels",
                features: ["Flashcard creation", "Web reader", "Chrome extension"]
            },
            {
                name: "Indonesian Keyboard",
                url: "https://play.google.com/",
                description: "Mobile typing support",
                free: true,
                level: "All levels",
                features: ["Voice input", "Dual language", "Themes"]
            },
            {
                name: "10FastFingers",
                url: "https://10fastfingers.com/typing-test/indonesian",
                description: "Online typing test",
                free: true,
                level: "All levels",
                features: ["Speed testing", "Certificates", "Progress tracking"]
            },
            {
                name: "TTSConverter.io",
                url: "https://ttsconverter.io/text-to-speech/indonesian",
                description: "Text-to-speech tool",
                free: true,
                level: "All levels",
                features: ["10 voices", "MP3 download", "Pitch control"]
            }
        ],

        books: [
            {
                category: "Free Textbooks",
                items: [
                    {
                        name: "Wikibooks Indonesian",
                        url: "https://en.wikibooks.org/wiki/Indonesian",
                        description: "Complete online course",
                        free: true,
                        level: "Beginner-Expert",
                        features: ["Grammar", "Vocabulary", "Cultural sections", "Audio samples"]
                    },
                    {
                        name: "Internet Archive Collection",
                        url: "https://archive.org/details/indonesian-learning",
                        description: "56 Indonesian learning materials",
                        free: true,
                        level: "All levels",
                        features: ["Downloadable PDFs", "Sound recordings", "Historical materials"]
                    },
                    {
                        name: "Wisconsin Indonesian Textbooks",
                        url: "http://www.indonesiantextbooks.wisc.edu/",
                        description: "Ayo Berbahasa Indonesia series",
                        free: true,
                        level: "A1-C2",
                        features: ["Audio files", "Communicative approach", "Task-based"]
                    },
                    {
                        name: "IndonesianPod101 PDFs",
                        url: "https://www.indonesianpod101.com/indonesian-workbooks/",
                        description: "16+ practice workbooks",
                        free: true,
                        level: "Beginner",
                        features: ["Alphabet", "Vocabulary", "Grammar", "Free with signup"]
                    },
                    {
                        name: "Indonesian in 7 Days",
                        url: "https://www.resourcefulindonesian.com/",
                        description: "Quick start guide",
                        free: true,
                        level: "Beginner",
                        features: ["Day-by-day structure", "Practical phrases", "PDF format"]
                    },
                    {
                        name: "PDF Language Lessons",
                        url: "https://www.pdf-language-lessons.com/indonesian/",
                        description: "Downloadable worksheets",
                        free: true,
                        level: "Beginner",
                        features: ["Grammar", "Phrases", "Vocabulary", "Printable"]
                    },
                    {
                        name: "Sneddon's Grammar (Archive)",
                        url: "https://archive.org/",
                        description: "Academic grammar reference",
                        free: true,
                        level: "Advanced",
                        features: ["Authoritative source", "Comprehensive coverage"]
                    }
                ]
            },
            {
                category: "Digital Libraries",
                items: [
                    {
                        name: "iPusnas",
                        url: "https://ipusnas.id/",
                        description: "National digital library",
                        free: true,
                        level: "All levels",
                        features: ["Thousands of ebooks", "Mobile app", "Offline reading"]
                    },
                    {
                        name: "Internet Archive Books",
                        url: "https://archive.org/details/kumpulan-berbagai-buku",
                        description: "Indonesian literature collection",
                        free: true,
                        level: "Intermediate-Advanced",
                        features: ["Hundreds of books", "Downloadable PDFs"]
                    },
                    {
                        name: "Bloom Library",
                        url: "https://bloomlibrary.org/#!/language:id",
                        description: "Children's educational books",
                        free: true,
                        level: "Beginner-Elementary",
                        features: ["Literacy development", "Downloadable", "Graded readers"]
                    },
                    {
                        name: "Open Library Indonesia",
                        url: "https://openlibrary.org/subjects/place:indonesia",
                        description: "Global library Indonesian section",
                        free: true,
                        level: "All levels",
                        features: ["Borrow feature", "Extensive collection"]
                    },
                    {
                        name: "Let's Read Platform",
                        url: "https://reader.letsreadasia.org/",
                        description: "Digital graded readers",
                        free: true,
                        level: "All levels",
                        features: ["6 reading levels", "Mobile app", "Systematic progression"]
                    },
                    {
                        name: "YLAI Graded Readers",
                        url: "https://ylai.org/",
                        description: "62 books across 6 levels",
                        free: true,
                        level: "Pre-reader to Advanced",
                        features: ["Locally developed", "Progressive difficulty"]
                    },
                    {
                        name: "Wikisource Indonesia",
                        url: "https://en.wikisource.org/wiki/Category:Indonesia",
                        description: "Historical texts and documents",
                        free: true,
                        level: "Advanced",
                        features: ["Independence proclamation", "Linguistic studies"]
                    }
                ]
            }
        ],

        audio: [
            {
                category: "YouTube Channels",
                items: [
                    {
                        name: "IndonesianPod101 YouTube",
                        url: "https://www.youtube.com/IndonesianPod101",
                        description: "Comprehensive video lessons",
                        free: true,
                        level: "All levels",
                        features: ["88K subscribers", "Structured series", "Cultural content"]
                    },
                    {
                        name: "Learn Indonesian with Hani",
                        url: "https://www.youtube.com/channel/UCxI9zXjtaUT1hjrhHCSI_Zw",
                        description: "Certified teacher lessons",
                        free: true,
                        level: "All levels",
                        features: ["36K subscribers", "Cute animations", "Clear explanations"]
                    },
                    {
                        name: "5-Minute Indonesian",
                        url: "https://www.youtube.com/",
                        description: "Daily conversations and slang",
                        free: true,
                        level: "Beginner-Intermediate",
                        features: ["Jakarta lifestyle vlogs", "Formal/informal language"]
                    }
                ]
            },
            {
                category: "Podcasts",
                items: [
                    {
                        name: "IndonesianPod101 Podcast",
                        url: "https://www.indonesianpod101.com/",
                        description: "1,818+ audio episodes",
                        free: true,
                        level: "All levels",
                        features: ["Biweekly updates", "Survival phrases", "Culture integration"]
                    },
                    {
                        name: "Learning Indonesian Podcast",
                        url: "https://podcasts.apple.com/",
                        description: "Shaun and Cici's course",
                        free: true,
                        level: "All levels",
                        features: ["Well-structured", "Previous learning integration"]
                    },
                    {
                        name: "AudioBuku.com",
                        url: "https://soundcloud.com/",
                        description: "Indonesian audiobooks",
                        free: true,
                        level: "All levels",
                        features: ["Online/offline listening", "Podcast format"]
                    },
                    {
                        name: "Noice",
                        url: "https://open.noice.id/audiobook",
                        description: "Free Indonesian audiobooks",
                        free: true,
                        level: "All levels",
                        features: ["Multiple genres", "Web streaming"]
                    }
                ]
            },
            {
                category: "News & Media",
                items: [
                    {
                        name: "Kompas.com",
                        url: "https://go.kompas.com",
                        description: "Major Indonesian newspaper",
                        free: true,
                        level: "Intermediate-Advanced",
                        features: ["Most widely read", "Authentic language"]
                    },
                    {
                        name: "Jakarta Globe",
                        url: "https://jakartaglobe.id/",
                        description: "English-language Indonesian news",
                        free: true,
                        level: "Intermediate",
                        features: ["Current affairs", "Cultural understanding"]
                    },
                    {
                        name: "Jakarta Post",
                        url: "https://www.thejakartapost.com/",
                        description: "English Indonesian newspaper",
                        free: true,
                        level: "Advanced",
                        features: ["Independent journalism", "Wide coverage"]
                    },
                    {
                        name: "ANTARA News",
                        url: "https://en.antaranews.com/",
                        description: "Official news agency",
                        free: true,
                        level: "Intermediate-Advanced",
                        features: ["Bilingual content", "Official sources"]
                    },
                    {
                        name: "VipoTV",
                        url: "https://vipotv.com/live-tv/indonesian/",
                        description: "Live Indonesian TV",
                        free: true,
                        level: "Intermediate-Advanced",
                        features: ["Multiple channels", "Free access"]
                    },
                    {
                        name: "Trans TV Live",
                        url: "https://www.transtv.co.id/live",
                        description: "Reality shows, dramas",
                        free: true,
                        level: "Intermediate-Advanced",
                        features: ["HD quality", "VOD available"]
                    },
                    {
                        name: "IndonesianaTV",
                        url: "https://indonesiana.tv/",
                        description: "Arts and culture streaming",
                        free: true,
                        level: "All levels",
                        features: ["Ministry of Education managed", "Cultural content"]
                    }
                ]
            }
        ],

        practice: [
            {
                category: "Language Exchange",
                items: [
                    {
                        name: "HelloTalk",
                        url: "https://www.hellotalk.com/",
                        description: "Global language exchange",
                        free: true,
                        level: "All levels",
                        features: ["18M+ users", "Voice/video chat", "Correction tools", "Moments feed"]
                    },
                    {
                        name: "Tandem",
                        url: "https://tandem.net/",
                        description: "Language exchange app",
                        free: true,
                        level: "All levels",
                        features: ["14,193+ Indonesian members", "Verification system", "Tutor marketplace"]
                    },
                    {
                        name: "Meet Indonesia Discord",
                        url: "https://discord.com/invite/qamDwdU",
                        description: "Discord community",
                        free: true,
                        level: "All levels",
                        features: ["3,613+ members", "Voice/text chat", "Cultural exchange"]
                    },
                    {
                        name: "Indonesia Community Discord",
                        url: "https://discord.com/invite/7DNS8J6",
                        description: "Large Indonesian server",
                        free: true,
                        level: "All levels",
                        features: ["9,229+ members", "Gaming and language practice"]
                    },
                    {
                        name: "Japanese-Indonesian Exchange",
                        url: "https://discord.com/invite/jpid",
                        description: "Bilingual exchange",
                        free: true,
                        level: "All levels",
                        features: ["7,798+ members", "Japanese-Indonesian focus"]
                    },
                    {
                        name: "MyLanguageExchange",
                        url: "https://www.mylanguageexchange.com/",
                        description: "Email/Skype exchanges",
                        free: true,
                        level: "All levels",
                        features: ["Long-term partnerships", "Structured exchanges"]
                    },
                    {
                        name: "ConversationExchange",
                        url: "https://www.conversationexchange.com/",
                        description: "Traditional language exchange",
                        free: true,
                        level: "All levels",
                        features: ["Face-to-face and online options"]
                    }
                ]
            },
            {
                category: "Dictionaries & Tools",
                items: [
                    {
                        name: "KBBI Official",
                        url: "https://kbbi.kemdikbud.go.id/",
                        description: "Official Indonesian dictionary",
                        free: true,
                        level: "Intermediate-Advanced",
                        features: ["120,000+ entries", "Etymology", "Public contributions"]
                    },
                    {
                        name: "KBBI Web",
                        url: "https://kbbi.web.id/",
                        description: "Unofficial KBBI mirror",
                        free: true,
                        level: "Intermediate-Advanced",
                        features: ["Fast search", "Mobile-friendly", "Offline version"]
                    },
                    {
                        name: "Cambridge Indonesian",
                        url: "https://dictionary.cambridge.org/dictionary/indonesian-english/",
                        description: "Professional bilingual dictionary",
                        free: true,
                        level: "All levels",
                        features: ["Audio pronunciations", "Example sentences"]
                    },
                    {
                        name: "Kamus.net",
                        url: "https://www.kamus.net/",
                        description: "World's largest English-Indonesian",
                        free: true,
                        level: "All levels",
                        features: ["Instant translations", "Multiple sources"]
                    },
                    {
                        name: "IndoDic",
                        url: "https://www.indodic.com/",
                        description: "Translation dictionary",
                        free: true,
                        level: "All levels",
                        features: ["Windows app", "Offline capability"]
                    },
                    {
                        name: "SEAlang Library",
                        url: "http://sealang.net/indonesia/dictionary.htm",
                        description: "Academic lexicography",
                        free: true,
                        level: "Advanced",
                        features: ["Loanword tracking", "US government funded"]
                    },
                    {
                        name: "Kamus Alay",
                        url: "https://github.com/nasalsabila/kamus-alay",
                        description: "Indonesian slang dictionary",
                        free: true,
                        level: "Intermediate-Advanced",
                        features: ["Open source", "Research-backed", "CSV format"]
                    },
                    {
                        name: "G2P-ID",
                        url: "https://github.com/Wikidepia/g2p-id",
                        description: "Pronunciation tool",
                        free: true,
                        level: "Advanced",
                        features: ["IPA conversion", "Open source"]
                    },
                    {
                        name: "LanguageTool",
                        url: "https://languagetool.org/",
                        description: "Grammar checker",
                        free: true,
                        level: "All levels",
                        features: ["Browser extensions", "API access"]
                    }
                ]
            }
        ]
    },

    quickStats: {
        totalResources: 100,
        freeResources: 100,
        categories: 5,
        averageRating: 4.6
    }
};