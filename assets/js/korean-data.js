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
    speakers: "80 million native speakers",
    countries: ["South Korea", "North Korea", "China (Yanbian)", "USA (Korean diaspora)"],
    resources: {
        courses: [
            {
                category: "Government & Official Resources",
                items: [
                    {
                        name: "Online King Sejong Institute",
                        url: "https://www.iksi.or.kr/lms/main/about.do",
                        free: true,
                        level: "Introductory to Advanced (1-6)",
                        features: ["Mobile/PC compatible", "Culture courses included", "24/7 availability"]
                    },
                    {
                        name: "Nuri-Sejong Institute Materials",
                        url: "https://nuri.iksi.or.kr/front/main/main.do",
                        free: true,
                        level: "All levels",
                        features: ["YumYum Korean comic", "7 mobile apps", "News reading exercises"]
                    },
                    {
                        name: "National Institute of Korean Language",
                        url: "https://www.korean.go.kr/front_eng/main.do",
                        free: true,
                        level: "All levels",
                        features: ["10-language learner's dictionary", "Urimalsaem collaborative dictionary"]
                    },
                    {
                        name: "EPS-TOPIK Standard Textbooks",
                        url: "https://www.eps.go.kr/",
                        free: true,
                        level: "Beginner",
                        features: ["9 languages", "Workplace vocabulary", "MP3 audio included"]
                    },
                    {
                        name: "TOPIK Past Papers Collection",
                        url: "https://www.topikguide.com/previous-papers/",
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
                        free: true,
                        level: "Beginner",
                        features: ["17 hours content", "20 assignments", "Free audit access"]
                    },
                    {
                        name: "Korean for Beginners (Sungkyunkwan)",
                        url: "https://www.coursera.org/learn/korean-beginners",
                        free: true,
                        level: "Beginner",
                        features: ["4 weeks", "K-MOOC funded", "Colloquial Korean focus"]
                    },
                    {
                        name: "Learn Korean: Introduction (Hanyang)",
                        url: "https://www.futurelearn.com/courses/introduction-to-korean",
                        free: true,
                        level: "Beginner",
                        features: ["Cultural context", "Real conversation practice"]
                    },
                    {
                        name: "K-MOOC Platform",
                        url: "http://www.kmooc.kr/",
                        free: true,
                        level: "All levels",
                        features: ["Completely free", "Multiple universities", "Seoul National University courses"]
                    },
                    {
                        name: "Learn to Speak Korean 1 (Yonsei)",
                        url: "https://www.coursera.org/learn/learn-speak-korean1",
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
                        free: true,
                        level: "Beginner to Advanced (Levels 1-10)",
                        features: ["Audio lessons", "Downloadable PDFs", "Community features"]
                    },
                    {
                        name: "How to Study Korean",
                        url: "https://www.howtostudykorean.com/",
                        free: true,
                        level: "Absolute Beginner to Advanced",
                        features: ["Audio for every word/sentence", "Quizzes", "Mobile app", "20-30 vocab per lesson"]
                    },
                    {
                        name: "GO! Billy Korean",
                        url: "https://gobillykorean.com/",
                        free: true,
                        level: "Beginner to Intermediate",
                        features: ["6 cheat sheets", "CC BY-NC-ND 4.0 license", "YouTube integration"]
                    },
                    {
                        name: "90 Day Korean",
                        url: "https://www.90daykorean.com/korean-grammar/",
                        free: true,
                        level: "Beginner",
                        features: ["SOV structure", "Particles", "Verb conjugations"]
                    }
                ]
            }
        ],

        apps: [


                {


                    category: "Mobile Apps and Software",


                    items: [
                    {
                        name: "Duolingo Korean",
                        url: "https://www.duolingo.com/",
                        free: true,
                        level: "Beginner to Lower-intermediate",
                        features: ["2200+ words", "Completely free core", "Mobile/web sync"]
                    },
                    {
                        name: "Drops Korean",
                        url: "https://languagedrops.com/",
                        free: true,
                        level: "Beginner to Intermediate",
                        features: ["2700+ words", "150+ topics", "5 min daily free"]
                    },
                    {
                        name: "Naver Dictionary/Papago",
                        url: "https://papago.naver.com/",
                        free: true,
                        level: "All levels",
                        features: ["14 languages", "OCR", "Offline mode", "Honorific understanding"]
                    },
                    {
                        name: "Dongsa Verb Conjugator",
                        url: "https://koreanverb.app/",
                        free: true,
                        level: "All levels",
                        features: ["Step-by-step explanations", "Irregular verbs", "Offline capability"]
                    }


                    ]


                }


            ],

        books: [
            {
                category: "Open Textbooks",
                items: [
                    {
                        name: "Beginning Korean 1 (U of Iowa)",
                        url: "https://open.umn.edu/opentextbooks/textbooks/1195",
                        free: true,
                        level: "Beginner (Novice Low to High)",
                        features: ["YouTube lectures per chapter", "Audio files", "CC BY-NC license"]
                    },
                    {
                        name: "You Speak Korean! Book 1 (UPenn)",
                        url: "https://ysk.upenn.domains/ysk1/",
                        free: true,
                        level: "Beginner",
                        features: ["Backward design methodology", "Async practice materials", "CC BY-NC 4.0"]
                    },
                    {
                        name: "Korean From Zero Book 1",
                        url: "https://archive.org/details/KoreanFromZeroBook1",
                        free: true,
                        level: "Beginner",
                        features: ["Multiple formats (PDF, EPUB)", "22,910+ views"]
                    },
                    {
                        name: "Sogang Korean Collection",
                        url: "https://archive.org/details/sogang-korean-students-books",
                        free: true,
                        level: "Multiple levels",
                        features: ["932.0M content", "20,639+ views", "University quality"]
                    },
                    {
                        name: "Let's Chat! Korean (OER Commons)",
                        url: "https://oercommons.org/courses/let-s-chat-korean",
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
                        name: "Tammy Korean PDFs",
                        url: "https://learning-korean.com/pdf/",
                        free: true,
                        level: "Beginner to Intermediate",
                        features: ["1,671 TOPIK I vocab", "2,662 TOPIK II vocab", "84 beginner grammar points"]
                    },
                    {
                        name: "JAEM Korean Grammar",
                        url: "https://jaem.io/korean-grammar-guide-download-free-pdf/",
                        free: true,
                        level: "Beginner to Intermediate",
                        features: ["TOPIK test focus", "Example sentences", "Clear explanations"]
                    },
                    {
                        name: "Basic Korean Grammar Workbook",
                        url: "https://archive.org/details/BasicKoreanAGrammarAndWorkbook",
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
                        free: true,
                        level: "Beginner to Intermediate",
                        features: ["Current events", "Comics", "News-themed learning"]
                    },
                    {
                        name: "TTMIK Stories",
                        url: "https://ttmikstories.app/",
                        free: true,
                        level: "Beginner to Advanced (Level 1-7+)",
                        features: ["Professional voice acting", "Quizzes", "Progress tracking"]
                    },
                    {
                        name: "Naver Webtoon",
                        url: "https://comic.naver.com/index",
                        free: true,
                        level: "Intermediate to Advanced",
                        features: ["Thousands of comics", "Offline download", "Modern slang"]
                    },
                    {
                        name: "VOA Korean Service",
                        url: "https://www.voakorea.com/",
                        free: true,
                        level: "Intermediate to Advanced",
                        features: ["Audio versions available", "Current news"]
                    },
                    {
                        name: "National Library of Korea",
                        url: "https://www.nl.go.kr/EN/main/index.do",
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
                        free: true,
                        level: "All levels",
                        features: ["3-level structure", "English/Korean mix for beginners"]
                    },
                    {
                        name: "SpongeMind Podcast",
                        url: "https://spongemind.org/",
                        free: true,
                        level: "Beginner to Intermediate",
                        features: ["Each topic in English then Korean"]
                    },
                    {
                        name: "IYAGI (이야기)",
                        url: "https://talktomeinkorean.com/",
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
                        free: true,
                        level: "All levels",
                        features: ["Celebrity guests", "Street interviews", "Structured lessons"]
                    },
                    {
                        name: "GO! Billy Korean",
                        url: "https://www.youtube.com/c/GoBillyKorean",
                        free: true,
                        level: "Beginner to Intermediate",
                        features: ["Classroom-style instruction", "Clear explanations"]
                    },
                    {
                        name: "Korean Englishman",
                        url: "https://www.youtube.com/user/koreanenglishman",
                        free: true,
                        level: "Intermediate to Advanced",
                        features: ["Celebrity interviews", "Dual subtitles", "Cultural content"]
                    },
                    {
                        name: "Seemile Korean",
                        url: "https://www.youtube.com/user/seemile",
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
                        name: "KBS Cool FM",
                        url: "https://www.kbs.co.kr/",
                        free: true,
                        level: "Intermediate to Advanced",
                        features: ["Live streaming", "Music and talk shows"]
                    },
                    {
                        name: "MBC Radio",
                        url: "https://www.imbc.com/",
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
                        name: "Let's Learn Korean Discord",
                        url: "https://discord.com/invite/MxVYDEE",
                        free: true,
                        level: "All levels",
                        features: ["Placement tests", "Mentors", "Korean-only channels"]
                    },
                    {
                        name: "r/Korean",
                        url: "https://reddit.com/r/Korean",
                        free: true,
                        level: "All levels",
                        features: ["Native speakers", "Weekly challenges", "Resource sharing"]
                    },
                    {
                        name: "HanE Discord",
                        url: "https://discord.com/invite/hanelanguage",
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
                        free: true,
                        level: "All levels",
                        features: ["Community contributions", "Regularly updated"]
                    },
                    {
                        name: "Korean Wiki Project",
                        url: "https://www.koreanwikiproject.com/",
                        free: true,
                        level: "All levels",
                        features: ["Grammar explanations", "Hangeul Assistant tool", "Cultural insights"]
                    },
                    {
                        name: "TTMIK Community",
                        url: "https://talktomeinkorean.com/",
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
                        free: true,
                        level: "All levels",
                        features: ["Example sentences", "Pronunciation", "Hanja"]
                    },
                    {
                        name: "Daum Dictionary",
                        url: "https://dic.daum.net/",
                        free: true,
                        level: "All levels",
                        features: ["Sentence breakdown", "Multiple meanings"]
                    },
                    {
                        name: "National Institute Frequency List",
                        url: "https://www.korean.go.kr/",
                        free: true,
                        level: "All levels",
                        features: ["Official rankings", "Difficulty levels", "Excel format"]
                    },
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