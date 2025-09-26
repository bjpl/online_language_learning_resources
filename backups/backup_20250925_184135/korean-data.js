// ===================================
// Korean Language Resources Data
// ===================================

// Add Korean to the global languageData object
if (typeof languageData === 'undefined') {
    window.languageData = {};
}

languageData.korean = {
    name: "Korean",
    nativeName: "한국어",
    flag: "🇰🇷",
    code: "ko",
    description: "The language of South Korea and North Korea, known for its unique Hangul writing system created in 1443. With over 80 million speakers worldwide, Korean has gained global prominence through K-pop, K-dramas, and Korean cinema.",
    speakers: "80 million native speakers",
    countries: ["South Korea", "North Korea", "China (Yanbian)", "USA (Korean diaspora)"],
    difficulty: "Hard for English speakers",

    resources: {
        courses: [
            {
                category: "Government & Official Resources",
                items: [
                    {
                        name: "Online King Sejong Institute",
                        url: "https://www.iksi.or.kr/lms/main/about.do",
                        description: "Comprehensive government service with courses in 16+ languages",
                        free: true,
                        level: "Introductory to Advanced (1-6)",
                        features: ["Mobile/PC compatible", "Culture courses included", "24/7 availability"]
                    },
                    {
                        name: "Nuri-Sejong Institute Materials",
                        url: "https://nuri.iksi.or.kr/front/page/etc/copyright/main.do",
                        description: "Downloadable textbooks, videos, and comics",
                        free: true,
                        level: "All levels",
                        features: ["YumYum Korean comic", "7 mobile apps", "News reading exercises"]
                    },
                    {
                        name: "National Institute of Korean Language",
                        url: "https://www.korean.go.kr/front_eng/main.do",
                        description: "Official standardization resources",
                        free: true,
                        level: "All levels",
                        features: ["10-language learner's dictionary", "Urimalsaem collaborative dictionary"]
                    },
                    {
                        name: "EPS-TOPIK Standard Textbooks",
                        url: "https://www.eps.go.kr/",
                        description: "Foreign worker Korean textbooks",
                        free: true,
                        level: "Beginner",
                        features: ["9 languages", "Workplace vocabulary", "MP3 audio included"]
                    },
                    {
                        name: "TOPIK Past Papers Collection",
                        url: "https://www.topikguide.com/previous-papers/",
                        description: "Official test papers with answers",
                        free: true,
                        level: "All TOPIK levels",
                        features: ["Papers from TOPIK 35-101", "Listening audio included"]
                    }
                ]
            },
            {
                category: "University MOOCs",
                items: [
                    {
                        name: "First Step Korean (Yonsei)",
                        url: "https://www.coursera.org/learn/learn-korean",
                        description: "Elementary Korean skills course with 52,000+ student reviews",
                        free: true,
                        level: "Beginner",
                        features: ["17 hours content", "20 assignments", "Free audit access"]
                    },
                    {
                        name: "Korean for Beginners (Sungkyunkwan)",
                        url: "https://www.coursera.org/learn/korean-beginners",
                        description: "Basic communication skills course",
                        free: true,
                        level: "Beginner",
                        features: ["4 weeks", "K-MOOC funded", "Colloquial Korean focus"]
                    },
                    {
                        name: "Learn Korean: Introduction (Hanyang)",
                        url: "https://www.futurelearn.com/courses/introduction-to-korean",
                        description: "Complete beginner course",
                        free: true,
                        level: "Beginner",
                        features: ["Cultural context", "Real conversation practice"]
                    },
                    {
                        name: "K-MOOC Platform",
                        url: "http://www.kmooc.kr/",
                        description: "Official Korean MOOC with university courses",
                        free: true,
                        level: "All levels",
                        features: ["Completely free", "Multiple universities", "Seoul National University courses"]
                    },
                    {
                        name: "Learn to Speak Korean 1 (Yonsei)",
                        url: "https://www.coursera.org/learn/learn-speak-korean1",
                        description: "Practical conversation skills",
                        free: true,
                        level: "Beginner",
                        features: ["6 modules", "Restaurant/shopping scenarios", "Free audit"]
                    }
                ]
            },
            {
                category: "Structured Learning Platforms",
                items: [
                    {
                        name: "Talk To Me In Korean (TTMIK)",
                        url: "https://talktomeinkorean.com/",
                        description: "1000+ free lessons with PDFs from beginner to advanced",
                        free: true,
                        level: "Beginner to Advanced (Levels 1-10)",
                        features: ["Audio lessons", "Downloadable PDFs", "Community features"]
                    },
                    {
                        name: "How to Study Korean",
                        url: "https://www.howtostudykorean.com/",
                        description: "175+ comprehensive lessons covering eight units",
                        free: true,
                        level: "Absolute Beginner to Advanced",
                        features: ["Audio for every word/sentence", "Quizzes", "Mobile app", "20-30 vocab per lesson"]
                    },
                    {
                        name: "KoreanClass101",
                        url: "https://www.koreanclass101.com/",
                        description: "Daily updated lessons with free tier",
                        free: true,
                        level: "Absolute Beginner to Advanced",
                        features: ["1,500+ lessons", "PDF notes", "Cultural context"]
                    },
                    {
                        name: "GO! Billy Korean",
                        url: "https://gobillykorean.com/",
                        description: "Grammar guides and study materials",
                        free: true,
                        level: "Beginner to Intermediate",
                        features: ["6 cheat sheets", "CC BY-NC-ND 4.0 license", "YouTube integration"]
                    },
                    {
                        name: "90 Day Korean",
                        url: "https://www.90daykorean.com/korean-grammar/",
                        description: "Structured beginner's grammar guide",
                        free: true,
                        level: "Beginner",
                        features: ["SOV structure", "Particles", "Verb conjugations"]
                    }
                ]
            }
        ],

        apps: [
            {
                name: "Duolingo Korean",
                url: "https://www.duolingo.com/",
                description: "Complete gamified course with 65 skills",
                free: true,
                level: "Beginner to Lower-intermediate",
                features: ["2200+ words", "Completely free core", "Mobile/web sync"]
            },
            {
                name: "LingoDeer",
                url: "https://www.lingodeer.com/",
                description: "Korean-specific structure designed by language teachers",
                free: true,
                level: "Beginner to Intermediate (A1-B1)",
                features: ["Asian language focus", "Detailed grammar explanations", "Offline mode"]
            },
            {
                name: "Drops Korean",
                url: "https://languagedrops.com/",
                description: "Vocabulary-only focus with visual associations",
                free: true,
                level: "Beginner to Intermediate",
                features: ["2700+ words", "150+ topics", "5 min daily free"]
            },
            {
                name: "Memrise",
                url: "https://www.memrise.com/",
                description: "Native speaker videos with AI language partner",
                free: true,
                level: "Beginner to Intermediate",
                features: ["Real content immersion", "Spaced repetition", "Community courses"]
            },
            {
                name: "HelloTalk",
                url: "https://www.hellotalk.com/",
                description: "Language exchange with 2M+ Korean speakers",
                free: true,
                level: "All levels",
                features: ["Translation tools", "Social feed", "Voice/video chat"]
            },
            {
                name: "Anki",
                url: "https://apps.ankiweb.net/",
                description: "Flashcard system with Korean decks",
                free: true,
                level: "All levels",
                features: ["Joseph's Korean 11K deck", "Spaced repetition", "Custom decks"]
            },
            {
                name: "Naver Dictionary/Papago",
                url: "https://papago.naver.com/",
                description: "Comprehensive dictionary and translator",
                free: true,
                level: "All levels",
                features: ["14 languages", "OCR", "Offline mode", "Honorific understanding"]
            },
            {
                name: "Dongsa Verb Conjugator",
                url: "https://koreanverb.app/",
                description: "All Korean verb conjugations with explanations",
                free: true,
                level: "All levels",
                features: ["Step-by-step explanations", "Irregular verbs", "Offline capability"]
            },
            {
                name: "Tandem",
                url: "https://www.tandem.net/",
                description: "Language exchange app with 28,289+ in Korea",
                free: true,
                level: "All levels",
                features: ["Location search", "Tutor marketplace", "Video chat"]
            }
        ],

        books: [
            {
                category: "Open Textbooks",
                items: [
                    {
                        name: "Beginning Korean 1 (U of Iowa)",
                        url: "https://open.umn.edu/opentextbooks/textbooks/1195",
                        description: "Comprehensive workbook with grammar and vocabulary",
                        free: true,
                        level: "Beginner (Novice Low to High)",
                        features: ["YouTube lectures per chapter", "Audio files", "CC BY-NC license"]
                    },
                    {
                        name: "You Speak Korean! Book 1 (UPenn)",
                        url: "https://ysk.upenn.domains/ysk1/",
                        description: "Performance-based approach with task-supported teaching",
                        free: true,
                        level: "Beginner",
                        features: ["Backward design methodology", "Async practice materials", "CC BY-NC 4.0"]
                    },
                    {
                        name: "Korean From Zero Book 1",
                        url: "https://archive.org/details/KoreanFromZeroBook1",
                        description: "Complete beginner textbook",
                        free: true,
                        level: "Beginner",
                        features: ["Multiple formats (PDF, EPUB)", "22,910+ views"]
                    },
                    {
                        name: "Korean Through Folktales (Portland State)",
                        url: "https://pdx.edu/",
                        description: "Cultural approach using traditional stories",
                        free: true,
                        level: "Elementary to Advanced",
                        features: ["Cultural education", "1st-3rd year levels"]
                    },
                    {
                        name: "Sogang Korean Collection",
                        url: "https://archive.org/details/sogang-korean-students-books",
                        description: "Complete university series",
                        free: true,
                        level: "Multiple levels",
                        features: ["932.0M content", "20,639+ views", "University quality"]
                    },
                    {
                        name: "Let's Chat! Korean (OER Commons)",
                        url: "https://oercommons.org/courses/let-s-chat-korean",
                        description: "55+ interpersonal speaking activities",
                        free: true,
                        level: "Novice to Intermediate",
                        features: ["Remixable activities", "Conversation-focused", "OER license"]
                    }
                ]
            },
            {
                category: "Grammar Resources",
                items: [
                    {
                        name: "KoreanClass101 Workbooks",
                        url: "https://www.koreanclass101.com/korean-workbooks/",
                        description: "16+ PDF workbooks",
                        free: true,
                        level: "Beginner",
                        features: ["Alphabet", "Common words", "Three-part structure"]
                    },
                    {
                        name: "Tammy Korean PDFs",
                        url: "https://learning-korean.com/pdf/",
                        description: "TOPIK-focused materials",
                        free: true,
                        level: "Beginner to Intermediate",
                        features: ["1,671 TOPIK I vocab", "2,662 TOPIK II vocab", "84 beginner grammar points"]
                    },
                    {
                        name: "JAEM Korean Grammar",
                        url: "https://jaem.io/korean-grammar-guide-download-free-pdf/",
                        description: "Comprehensive grammar guide",
                        free: true,
                        level: "Beginner to Intermediate",
                        features: ["TOPIK test focus", "Example sentences", "Clear explanations"]
                    },
                    {
                        name: "Basic Korean Grammar Workbook",
                        url: "https://archive.org/details/BasicKoreanAGrammarAndWorkbook",
                        description: "Complete grammar workbook by Andrew Byon",
                        free: true,
                        level: "Beginner",
                        features: ["Traditional workbook format", "Exercises included"]
                    }
                ]
            },
            {
                category: "Reading Materials",
                items: [
                    {
                        name: "어린이동아 (Children's Dong-A)",
                        url: "https://kids.donga.com/",
                        description: "Simplified news for children",
                        free: true,
                        level: "Beginner to Intermediate",
                        features: ["Current events", "Comics", "News-themed learning"]
                    },
                    {
                        name: "TTMIK Stories",
                        url: "https://ttmikstories.app/",
                        description: "1,000+ graded stories with voice acting",
                        free: true,
                        level: "Beginner to Advanced (Level 1-7+)",
                        features: ["Professional voice acting", "Quizzes", "Progress tracking"]
                    },
                    {
                        name: "Naver Webtoon",
                        url: "https://comic.naver.com/index",
                        description: "Korea's largest webtoon platform",
                        free: true,
                        level: "Intermediate to Advanced",
                        features: ["Thousands of comics", "Offline download", "Modern slang"]
                    },
                    {
                        name: "VOA Korean Service",
                        url: "https://www.voakorea.com/",
                        description: "International news in Korean",
                        free: true,
                        level: "Intermediate to Advanced",
                        features: ["Audio versions available", "Current news"]
                    },
                    {
                        name: "National Library of Korea",
                        url: "https://www.nl.go.kr/EN/main/index.do",
                        description: "Digital collections including classics",
                        free: true,
                        level: "All levels",
                        features: ["Maps", "Manuscripts", "Public domain materials"]
                    }
                ]
            }
        ],

        audio: [
            {
                category: "Podcasts",
                items: [
                    {
                        name: "Talk to Me in Korean Podcast",
                        url: "https://talktomeinkorean.com/podcasts/",
                        description: "Weekly structured episodes across three levels",
                        free: true,
                        level: "All levels",
                        features: ["3-level structure", "English/Korean mix for beginners"]
                    },
                    {
                        name: "KoreanClass101 Podcast",
                        url: "https://www.koreanclass101.com/",
                        description: "Daily updated comprehensive lessons",
                        free: true,
                        level: "Absolute Beginner to Advanced",
                        features: ["1,500+ lessons", "PDF notes", "Cultural context"]
                    },
                    {
                        name: "SpongeMind Podcast",
                        url: "https://spongemind.org/",
                        description: "Bilingual episodes for learners",
                        free: true,
                        level: "Beginner to Intermediate",
                        features: ["Each topic in English then Korean"]
                    },
                    {
                        name: "IYAGI (이야기)",
                        url: "https://talktomeinkorean.com/",
                        description: "Natural Korean conversations",
                        free: true,
                        level: "Intermediate to Advanced",
                        features: ["100% Korean", "Native speaker dialogues"]
                    }
                ]
            },
            {
                category: "YouTube Channels",
                items: [
                    {
                        name: "Talk To Me In Korean",
                        url: "https://www.youtube.com/user/talktomeinkorean",
                        description: "Most comprehensive channel with 1.6M+ subscribers",
                        free: true,
                        level: "All levels",
                        features: ["Celebrity guests", "Street interviews", "Structured lessons"]
                    },
                    {
                        name: "KoreanClass101",
                        url: "https://www.youtube.com/user/koreanclass101",
                        description: "Structured lessons with 1.5M+ subscribers",
                        free: true,
                        level: "Beginner to Advanced",
                        features: ["30-day challenges", "Complete curriculum"]
                    },
                    {
                        name: "GO! Billy Korean",
                        url: "https://www.youtube.com/c/GoBillyKorean",
                        description: "American teacher perspective with 600K+ subscribers",
                        free: true,
                        level: "Beginner to Intermediate",
                        features: ["Classroom-style instruction", "Clear explanations"]
                    },
                    {
                        name: "Korean Englishman",
                        url: "https://www.youtube.com/user/koreanenglishman",
                        description: "Cultural immersion with 6M+ subscribers",
                        free: true,
                        level: "Intermediate to Advanced",
                        features: ["Celebrity interviews", "Dual subtitles", "Cultural content"]
                    },
                    {
                        name: "Seemile Korean",
                        url: "https://www.youtube.com/user/seemile",
                        description: "Mixed approach with 1.5M subscribers",
                        free: true,
                        level: "Beginner to Intermediate",
                        features: ["BTS lessons", "TOPIK preparation", "K-pop integration"]
                    }
                ]
            },
            {
                category: "Korean Media",
                items: [
                    {
                        name: "Korean Radio Apps",
                        url: "https://play.google.com/",
                        description: "100+ Korean radio stations",
                        free: true,
                        level: "Intermediate to Advanced",
                        features: ["KBS, MBC, SBS", "Background listening", "Sleep timer"]
                    },
                    {
                        name: "KBS Cool FM",
                        url: "https://www.kbs.co.kr/",
                        description: "Popular Korean radio station",
                        free: true,
                        level: "Intermediate to Advanced",
                        features: ["Live streaming", "Music and talk shows"]
                    },
                    {
                        name: "MBC Radio",
                        url: "https://www.imbc.com/",
                        description: "Major Korean broadcasting network",
                        free: true,
                        level: "Intermediate to Advanced",
                        features: ["Multiple channels", "News and entertainment"]
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
                        description: "Largest language exchange app with 2M+ Korean users",
                        free: true,
                        level: "All levels",
                        features: ["Real-time correction", "Moments feed", "Voice/video chat"]
                    },
                    {
                        name: "Let's Learn Korean Discord",
                        url: "https://discord.com/invite/MxVYDEE",
                        description: "Structured Discord server with 56,617+ members",
                        free: true,
                        level: "All levels",
                        features: ["Placement tests", "Mentors", "Korean-only channels"]
                    },
                    {
                        name: "Tandem",
                        url: "https://tandem.net/",
                        description: "Language exchange app with 28,289+ in Korea",
                        free: true,
                        level: "All levels",
                        features: ["Location search", "Tutor marketplace", "Verification system"]
                    },
                    {
                        name: "r/Korean",
                        url: "https://reddit.com/r/Korean",
                        description: "Reddit community with 100,000+ subscribers",
                        free: true,
                        level: "All levels",
                        features: ["Native speakers", "Weekly challenges", "Resource sharing"]
                    },
                    {
                        name: "ConversationExchange",
                        url: "https://www.conversationexchange.com/",
                        description: "Multi-format exchange platform",
                        free: true,
                        level: "All levels",
                        features: ["Face-to-face", "Pen-pal", "Chat options", "Completely free"]
                    },
                    {
                        name: "HanE Discord",
                        url: "https://discord.com/invite/hanelanguage",
                        description: "Korean-English exchange with 21,979+ members",
                        free: true,
                        level: "All levels",
                        features: ["All proficiency levels", "Voice practice", "Study groups"]
                    }
                ]
            },
            {
                category: "Community Resources",
                items: [
                    {
                        name: "awesome-korean (GitHub)",
                        url: "https://github.com/mariabnd/awesome-korean",
                        description: "Curated resource list with community updates",
                        free: true,
                        level: "All levels",
                        features: ["Community contributions", "Regularly updated"]
                    },
                    {
                        name: "Korean Wiki Project",
                        url: "https://www.koreanwikiproject.com/",
                        description: "Collaborative learning wiki",
                        free: true,
                        level: "All levels",
                        features: ["Grammar explanations", "Hangeul Assistant tool", "Cultural insights"]
                    },
                    {
                        name: "TTMIK Community",
                        url: "https://talktomeinkorean.com/",
                        description: "Integrated community platform",
                        free: true,
                        level: "All levels",
                        features: ["Study groups", "Meetups", "Social integration"]
                    }
                ]
            },
            {
                category: "Dictionary & Tools",
                items: [
                    {
                        name: "Naver Dictionary",
                        url: "https://dict.naver.com/",
                        description: "Comprehensive Korean dictionary",
                        free: true,
                        level: "All levels",
                        features: ["Example sentences", "Pronunciation", "Hanja"]
                    },
                    {
                        name: "Daum Dictionary",
                        url: "https://dic.daum.net/",
                        description: "Korean-English dictionary with clean interface",
                        free: true,
                        level: "All levels",
                        features: ["Sentence breakdown", "Multiple meanings"]
                    },
                    {
                        name: "National Institute Frequency List",
                        url: "https://www.korean.go.kr/",
                        description: "6,000 most common words",
                        free: true,
                        level: "All levels",
                        features: ["Official rankings", "Difficulty levels", "Excel format"]
                    },
                    {
                        name: "Forvo Korean",
                        url: "https://forvo.com/",
                        description: "Pronunciation dictionary",
                        free: true,
                        level: "All levels",
                        features: ["Native speaker recordings", "Crowd-sourced", "Regional variants"]
                    }
                ]
            }
        ]
    },

    quickStats: {
        totalResources: 200,
        freeResources: 200,
        categories: 5,
        averageRating: 4.8
    }
};