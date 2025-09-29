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
    speakers: "43 million native, 270+ million total speakers",
    countries: ["Indonesia", "East Timor (working language)"],
    resources: {
        courses: [
            {
                category: "Complete Courses",
                items: [
                    {
                        name: "Duolingo Indonesian",
                        url: "https://www.duolingo.com/course/id/en/Learn-Indonesian",
                        free: true,
                        level: "A1-B1",
                        features: ["Mobile app", "Offline mode", "Streak tracking", "Speaking exercises"]
                    },
                    {
                        name: "Live Lingua (US Peace Corps)",
                        url: "https://www.livelingua.com/courses/indonesian",
                        free: true,
                        level: "Beginner-Intermediate",
                        features: ["44 ebooks", "190 audio files", "Downloadable content", "No registration"]
                    },
                    {
                        name: "MOOC Universitas Airlangga",
                        url: "https://mooc.unair.ac.id/",
                        free: true,
                        level: "Various levels",
                        features: ["BIPA courses", "University certificates", "Indonesian professors"]
                    },
                    {
                        name: "BIPA Universitas Terbuka",
                        url: "https://bipa.ut.ac.id/",
                        free: true,
                        level: "A1-C2",
                        features: ["CEFR-aligned", "Distance learning", "Government backing"]
                    },
                    {
                        name: "University of Hawaii Indonesian",
                        url: "https://www.aifis.org/language-resources",
                        free: true,
                        level: "A1-C2",
                        features: ["Academic quality", "Cultural insights", "Structured progression"]
                    },
                    {
                        name: "Indonesian-Online.com",
                        url: "https://indonesian-online.com/",
                        free: true,
                        level: "A1-C2",
                        features: ["113 structured lessons", "University-adopted", "Anki flashcards"]
                    },
                    {
                        name: "Memrise Community",
                        url: "https://www.memrise.com/en-us/learn-indonesian",
                        free: true,
                        level: "All levels",
                        features: ["Native speaker audio", "Spaced repetition", "Gamification"]
                    },
                    {
                        name: "SOAS University London",
                        url: "https://www.soas.ac.uk/study/find-course/indonesian-beginners-course",
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
                        name: "UKBI Testing",
                        url: "https://ukbi.kemdikbud.go.id/",
                        free: true,
                        level: "All levels",
                        features: ["5 sections", "National certification", "Simulation materials"]
                    }]
            },
            {
                category: "University Resources",
                items: [
                    {
                        name: "Universitas Terbuka OER",
                        url: "http://rumahbelajar.id/",
                        free: true,
                        level: "All levels",
                        features: ["702 MOOCs", "10+ million participants", "ASEAN Studies"]
                    }]
            }
        ],

        apps: [
            {
                name: "Ling App",
                url: "https://ling-app.com/learn-indonesian/",
                free: true,
                level: "Beginner-Advanced",
                features: ["5 levels", "Offline mode", "Cultural context"]
            },
            {
                name: "Indonesian Keyboard",
                url: "https://play.google.com/",
                free: true,
                level: "All levels",
                features: ["Voice input", "Dual language", "Themes"]
            },
            {
                name: "10FastFingers",
                url: "https://10fastfingers.com/typing-test/indonesian",
                free: true,
                level: "All levels",
                features: ["Speed testing", "Certificates", "Progress tracking"]
            },
            {
                name: "TTSConverter.io",
                url: "https://ttsconverter.io/text-to-speech/indonesian",
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
                        free: true,
                        level: "Beginner-Expert",
                        features: ["Grammar", "Vocabulary", "Cultural sections", "Audio samples"]
                    },
                    {
                        name: "Wisconsin Indonesian Textbooks",
                        url: "http://www.indonesiantextbooks.wisc.edu/",
                        free: true,
                        level: "A1-C2",
                        features: ["Audio files", "Communicative approach", "Task-based"]
                    }]
            },
            {
                category: "Digital Libraries",
                items: [
                    {
                        name: "iPusnas",
                        url: "https://www.perpusnas.go.id/",
                        free: true,
                        level: "All levels",
                        features: ["Thousands of ebooks", "Mobile app", "Offline reading"]
                    },
                    {
                        name: "Bloom Library",
                        url: "https://bloomlibrary.org/#!/language:id",
                        free: true,
                        level: "Beginner-Elementary",
                        features: ["Literacy development", "Downloadable", "Graded readers"]
                    },
                    {
                        name: "Open Library Indonesia",
                        url: "https://openlibrary.org/subjects/place:indonesia",
                        free: true,
                        level: "All levels",
                        features: ["Borrow feature", "Extensive collection"]
                    },
                    {
                        name: "Let's Read Platform",
                        url: "https://reader.letsreadasia.org/",
                        free: true,
                        level: "All levels",
                        features: ["6 reading levels", "Mobile app", "Systematic progression"]
                    },
                    {
                        name: "Wikisource Indonesia",
                        url: "https://en.wikisource.org/wiki/Category:Indonesia",
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
                        name: "Learn Indonesian with Hani",
                        url: "https://www.youtube.com/channel/UCxI9zXjtaUT1hjrhHCSI_Zw",
                        free: true,
                        level: "All levels",
                        features: ["36K subscribers", "Cute animations", "Clear explanations"]
                    }]
            },
            {
                category: "Podcasts",
                items: [
                    {
                        name: "Noice",
                        url: "https://open.noice.id/audiobook",
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
                        name: "Jakarta Globe",
                        url: "https://jakartaglobe.id/",
                        free: true,
                        level: "Intermediate",
                        features: ["Current affairs", "Cultural understanding"]
                    },
                    {
                        name: "Jakarta Post",
                        url: "https://www.thejakartapost.com/",
                        free: true,
                        level: "Advanced",
                        features: ["Independent journalism", "Wide coverage"]
                    },
                    {
                        name: "ANTARA News",
                        url: "https://en.antaranews.com/",
                        free: true,
                        level: "Intermediate-Advanced",
                        features: ["Bilingual content", "Official sources"]
                    },
                    {
                        name: "VipoTV",
                        url: "https://vipotv.com/live-tv/indonesian/",
                        free: true,
                        level: "Intermediate-Advanced",
                        features: ["Multiple channels", "Free access"]
                    },
                    {
                        name: "Trans TV Live",
                        url: "https://www.transtv.co.id/live",
                        free: true,
                        level: "Intermediate-Advanced",
                        features: ["HD quality", "VOD available"]
                    },
                    {
                        name: "IndonesianaTV",
                        url: "https://indonesiana.tv/",
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
                ]
            },
            {
                category: "Dictionaries & Tools",
                items: [
                    {
                        name: "Cambridge Indonesian",
                        url: "https://dictionary.cambridge.org/dictionary/indonesian-english/",
                        free: true,
                        level: "All levels",
                        features: ["Audio pronunciations", "Example sentences"]
                    },
                    {
                        name: "SEAlang Library",
                        url: "http://sealang.net/indonesia/dictionary.htm",
                        free: true,
                        level: "Advanced",
                        features: ["Loanword tracking", "US government funded"]
                    },
                    {
                        name: "Kamus Alay",
                        url: "https://github.com/nasalsabila/kamus-alay",
                        free: true,
                        level: "Intermediate-Advanced",
                        features: ["Open source", "Research-backed", "CSV format"]
                    },
                    {
                        name: "G2P-ID",
                        url: "https://github.com/Wikidepia/g2p-id",
                        free: true,
                        level: "Advanced",
                        features: ["IPA conversion", "Open source"]
                    }]
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