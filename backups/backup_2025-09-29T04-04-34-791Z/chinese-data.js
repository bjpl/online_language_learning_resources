const chineseResources = {
    name: "Chinese",
    nativeName: "中文 (Zhōngwén)",
    flag: "🇨🇳",
    learners: "200M+",
    speakers: "1.3B+ (918M native + 200M+ second language)",
    highlights: [
        "250+ comprehensive free resources from all Chinese-speaking regions",
        "Complete coverage of Mandarin, Cantonese, Taiwanese, Shanghainese, Hakka, and other major dialects",
        "10,000+ free MOOCs from China University MOOC and XuetangX platforms",
        "Chinese Text Project: 30,000+ classical texts with 5 billion+ characters",
        "HSK 1-9, TOCFL, YCT, BCT complete test preparation materials",
        "Both simplified and traditional character systems fully supported"
    ],
    resources: {
        courses: [
            {
                category: "Major MOOC Platforms",
                items: [
                    {
                        name: "XuetangX (学堂在线)",
                        url: "https://www.xuetangx.com/",
                        features: ["Tsinghua University MOOC platform", "HSK preparation courses", "Video lectures and exercises", "Certificates for all levels"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "China University MOOC",
                        url: "https://www.icourse163.org/",
                        features: ["Ministry of Education platform", "10,000+ free courses", "800+ universities across China", "Language and culture coverage"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Peking University on Coursera - Chinese for HSK",
                        url: "https://www.coursera.org/learn/hsk-1",
                        features: ["Complete HSK 1-5 series", "30+ video lectures per course", "Quizzes and preparation", "Official proficiency tests"],
                        free: true,
                        level: "Beginner to Advanced"
                    },
                    {
                        name: "Shanghai Jiao Tong University - Learn Mandarin Chinese",
                        url: "https://www.coursera.org/specializations/learn-mandarin",
                        features: ["5-course specialization", "Capstone project included", "Beginner to intermediate", "Cultural context integration"],
                        free: true,
                        level: "Beginner to Intermediate"
                    },
                    {
                        name: "Tsinghua Chinese on edX",
                        url: "https://www.edx.org/learn/language/tsinghua-university-tsinghua-chinese-start-talking-with-1-3-billion-people",
                        features: ["Comprehensive beginner course", "Pinyin system coverage", "Essential cultural elements", "Connect with 1.3B people"],
                        free: true,
                        level: "Beginner"
                    },
                    {
                        name: "National Taiwan University - Learning Chinese",
                        url: "https://www.coursera.org/learn/learn-chinese-mandarin",
                        features: ["Start from scratch approach", "Immersive Mandarin method", "Complete beginners focused", "Traditional characters used"],
                        free: true,
                        level: "Complete Beginner"
                    },
                    {
                        name: "MIT OpenCourseWare - Foundation Course in Mandarin",
                        url: "https://ocw.mit.edu/courses/res-21g-003-learning-chinese-a-foundation-course-in-mandarin-spring-2011/",
                        features: ["4-semester curriculum", "Audio materials included", "Beginner to intermediate", "Both character systems"],
                        free: true,
                        level: "Beginner to Intermediate"
                    }
                ]
            },
            {
                category: "Government and Institutional Resources",
                items: [
                    {
                        name: "Confucius Institute Online",
                        url: "https://ci.cn/en/gywm",
                        features: ["Global education network", "Live classes offered", "HSK preparation", "Cultural programs included"],
                        free: false,
                        level: "All levels"
                    },
                    {
                        name: "CCTV Learn Chinese",
                        url: "https://english.cctv.com/program/learnchinese/01/index.shtml",
                        features: ["Official CCTV portal", "100+ Growing up episodes", "Completely free content", "Beginner to intermediate"],
                        free: true,
                        level: "Beginner to Intermediate"
                    },
                    {
                        name: "Hanban HSK Resources",
                        url: "http://english.hanban.org/node_7581.htm",
                        features: ["Official HSK testing body", "Official vocabulary lists", "Sample tests provided", "All HSK levels covered"],
                        free: true,
                        level: "All HSK levels"
                    },
                    {
                        name: "China Radio International",
                        url: "https://radio.cgtn.com/",
                        features: ["State broadcaster programs", "Radio shows and podcasts", "News content included", "Free streaming available"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Taiwan MOE Resources",
                        url: "https://lmit.edu.tw/lc/learning",
                        features: ["Taiwan MOE platform", "Self-study resources", "TOCFL preparation", "Foreign language testing"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Speak Mandarin Campaign (Singapore)",
                        url: "https://www.languagecouncils.sg/mandarin/en",
                        features: ["Singapore government initiative", "Since 1979", "Mandarin database", "Competitions and programs"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Hong Kong Education Bureau Chinese Resources",
                        url: "https://www.edb.gov.hk/en/curriculum-development/kla/chi-edu/second-lang/student.html",
                        features: ["Non-Chinese speakers focused", "Character recognition tools", "Audio storybooks", "All proficiency levels"],
                        free: true,
                        level: "All levels"
                    }
                ]
            },
            {
                category: "Cantonese Language Courses",
                items: [
                    {
                        name: "HK Education University Cantonese Course",
                        url: "https://corpus.eduhk.hk/cantonese/e_index.html",
                        features: ["Corpus-based learning platform", "Hong Kong Education University", "Authentic language examples", "Exercises included"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "VTC Survival Cantonese",
                        url: "https://www.vtc.edu.hk/vlpo/eng/info_ncs.html",
                        features: ["Hong Kong government course", "Non-Chinese speakers", "Survival Cantonese phrases", "Cultural orientation"],
                        free: true,
                        level: "Beginner"
                    },
                    {
                        name: "Yale-China Academy Cantonese Program",
                        url: "https://yccla.cuhk.edu.hk/",
                        features: ["Intensive 12-month program", "Chinese University HK", "Comprehensive curriculum", "Cultural immersion"],
                        free: false,
                        level: "Beginner to Advanced"
                    },
                    {
                        name: "Cantonese with Brittany",
                        url: "https://www.youtube.com/c/CantonesewithBrittany",
                        features: ["YouTube channel", "20+ comprehensive lessons", "Jyutping romanization", "Cultural context"],
                        free: true,
                        level: "Beginner to Intermediate"
                    },
                    {
                        name: "CantoneseClass101",
                        url: "https://www.cantoneseclass101.com/",
                        features: ["Comprehensive Cantonese course", "YouTube and podcasts", "Cultural education materials", "Bi-weekly updates"],
                        free: false,
                        level: "All levels"
                    }
                ]
            },
            {
                category: "Other Chinese Dialects",
                items: [
                    {
                        name: "LearnTaigi.com - Taiwanese Hokkien",
                        url: "https://www.learntaigi.com/",
                        features: ["Taiwanese/Min Nan/Hokkien", "Vocabulary platform", "Categorized lists", "Tâi-lô romanization"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Taiwan MOE Taiwanese Dictionary",
                        url: "https://english.moe.gov.tw/",
                        features: ["Official Taiwan MOE dictionary", "25,000 Taiwanese entries", "Audio recordings", "Tâi-lô romanization"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Taiwan Hakka Dictionary",
                        url: "https://english.moe.gov.tw/",
                        features: ["Official Hakka resources", "Taiwan MOE", "Comprehensive dictionary", "Audio support"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Wu-Chinese.com - Shanghainese",
                        url: "http://wu-chinese.com/",
                        features: ["Shanghainese/Wu dialect", "2,500+ words", "30-lesson curriculum", "Major regional variety"],
                        free: true,
                        level: "Beginner to Intermediate"
                    },
                    {
                        name: "Mogher.com - Teochew Dictionary",
                        url: "https://mogher.com/",
                        features: ["Teochew/Chaozhou dialect", "6,500+ words", "Dictionary format", "Multiple language support"],
                        free: true,
                        level: "All levels"
                    }
                ]
            }
        ],
        books: [
            {
                category: "Open Source Textbooks",
                items: [
                    {
                        name: "Elementary Chinese I & II (Michigan State University)",
                        url: "https://openbooks.lib.msu.edu/chs101/",
                        features: ["8 lessons per volume", "Beginning Mandarin Chinese", "CC BY-NC 4.0 license", "Multiple formats available"],
                        free: true,
                        level: "Beginning"
                    },
                    {
                        name: "Elementary Mandarin (University of Minnesota)",
                        url: "https://open.umn.edu/opentextbooks/textbooks/1106",
                        features: ["Interactive online textbook", "Multiple sections", "Beginning Mandarin", "Open educational license"],
                        free: true,
                        level: "Beginning"
                    },
                    {
                        name: "Chinese WikiBooks - Mandarin",
                        url: "https://en.wikibooks.org/wiki/Chinese_(Mandarin)",
                        features: ["Community-maintained course", "Mandarin Chinese", "CC BY-SA 4.0 license", "Beginner to intermediate"],
                        free: true,
                        level: "Beginner to Intermediate"
                    },
                    {
                        name: "FSI Standard Chinese Course",
                        url: "https://fsi-languages.yojik.eu/languages/FSI/fsi-chinese.html",
                        features: ["Public domain course", "Foreign Service Institute", "Beginning to advanced", "Extensive audio materials"],
                        free: true,
                        level: "Beginning to Advanced"
                    },
                    {
                        name: "Chinese Rhetoric and Writing (University of Minnesota)",
                        url: "https://open.umn.edu/opentextbooks/textbooks/297",
                        features: ["Graduate-level text", "Chinese rhetoric and composition", "Open license", "PDF and EPUB formats"],
                        free: true,
                        level: "Advanced"
                    },
                    {
                        name: "Classical Chinese WikiBook",
                        url: "https://en.wikibooks.org/wiki/Classical_Chinese",
                        features: ["Classical Chinese guide", "Multiple lessons", "Advanced literary Chinese", "CC BY-SA 4.0 license"],
                        free: true,
                        level: "Advanced"
                    }
                ]
            },
            {
                category: "Grammar References",
                items: [
                    {
                        name: "Chinese Grammar Wiki (AllSet Learning)",
                        url: "https://resources.allsetlearning.com/chinese/grammar/",
                        features: ["2,125+ grammar articles", "A1-C1 / HSK 1-6", "Examples and explanations", "All proficiency levels"],
                        free: true,
                        level: "A1 to C1 (HSK 1-6)"
                    },
                    {
                        name: "CC-CEDICT Grammar Guide",
                        url: "https://cc-cedict.org/wiki/",
                        features: ["Community-maintained patterns", "Grammar usage guide", "All proficiency levels", "Searchable examples"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "COERLL Chinese Materials (University of Texas)",
                        url: "https://coerll.utexas.edu/coerll/materials/language/chinese/",
                        features: ["University of Texas resources", "Interactive grammar exercises", "Beginning to intermediate", "Learner focused"],
                        free: true,
                        level: "Beginning to Intermediate"
                    },
                    {
                        name: "MERLOT Chinese Materials",
                        url: "https://www.merlot.org/merlot/materials.htm?category=2446",
                        features: ["Peer-reviewed resources", "Open educational materials", "Quality-assured content", "Various proficiency levels"],
                        free: true,
                        level: "Various"
                    }
                ]
            },
            {
                category: "Graded Reading Materials",
                items: [
                    {
                        name: "Mandarin Companion Graded Readers",
                        url: "https://mandarincompanion.com/",
                        features: ["34 graded novels", "150-600 characters", "Western classics adapted", "Strict vocabulary control"],
                        free: false,
                        level: "Beginner to Lower Intermediate"
                    },
                    {
                        name: "Chinese Breeze Graded Reader Series",
                        url: "https://www.cheng-tsui.com/browse/chinese-breeze",
                        features: ["60+ original stories", "300-3000 characters graded", "Cultural context", "Comprehension questions"],
                        free: false,
                        level: "300-3000 characters"
                    },
                    {
                        name: "Chinese Graded Reader",
                        url: "https://chinesegradedreader.com/",
                        features: ["50+ HSK-leveled stories", "Strict vocabulary control", "HSK 1-6 aligned", "Both character systems"],
                        free: true,
                        level: "HSK 1-6"
                    },
                    {
                        name: "HSK Reading",
                        url: "https://hskreading.com/",
                        features: ["100+ graded articles", "HSK level 1-6", "Comprehension questions", "Audio support included"],
                        free: true,
                        level: "HSK 1-6"
                    }
                ]
            },
            {
                category: "Digital Libraries and Classical Texts",
                items: [
                    {
                        name: "Chinese Text Project (ctext.org)",
                        url: "https://ctext.org/",
                        features: ["30,000+ pre-modern texts", "5 billion+ characters", "English translations", "World's largest database"],
                        free: true,
                        level: "Advanced"
                    },
                    {
                        name: "Project Gutenberg Chinese Collection",
                        url: "https://www.gutenberg.org/browse/languages/zh",
                        features: ["100+ classical titles", "Multiple download formats", "EPUB, Kindle, HTML", "All public domain"],
                        free: true,
                        level: "Advanced"
                    },
                    {
                        name: "Internet Archive Chinese Books",
                        url: "https://archive.org/details/booksbylanguage_chinese",
                        features: ["1,000+ digitized books", "Historical texts included", "Modern literature", "Full-text search"],
                        free: true,
                        level: "Mixed levels"
                    },
                    {
                        name: "National Library of China Digital Collection",
                        url: "https://www.nlc.cn/enweb/",
                        features: ["32,000+ ancient books", "60% digitized", "Rare manuscripts", "China's national collection"],
                        free: true,
                        level: "Research level"
                    },
                    {
                        name: "Kangxi Dictionary Online",
                        url: "https://ctext.org/kangxi-zidian",
                        features: ["47,035 character entries", "Authoritative Kangxi Dictionary", "Free access", "Search functionality"],
                        free: true,
                        level: "Advanced"
                    }
                ]
            },
            {
                category: "Children's Educational Materials",
                items: [
                    {
                        name: "JoJo Bilingual Learning Books",
                        url: "https://www.jojochinesebooks.com/",
                        features: ["Chinese-English parallel text", "Early childhood learners", "Engaging stories", "Illustrations included"],
                        free: false,
                        level: "Early Childhood"
                    },
                    {
                        name: "Internet Archive Chinese Kids Books",
                        url: "https://archive.org/details/booksbylanguage_chinese",
                        features: ["365 bedtime stories", "Pinyin included", "Elementary-level books", "Digital accessibility"],
                        free: true,
                        level: "Elementary"
                    }
                ]
            }
        ],
        audio: [
            {
                category: "Video Learning Platforms - Mandarin",
                items: [
                    {
                        name: "ChinesePodTV",
                        url: "https://www.youtube.com/c/ChinesePodTV",
                        features: ["Thousands of lessons", "All HSK levels", "English/Chinese subtitles", "Practical daily conversations"],
                        free: true,
                        level: "All HSK levels"
                    },
                    {
                        name: "Yoyo Chinese",
                        url: "https://www.youtube.com/c/YoyoChinese",
                        features: ["200+ videos", "Beginner to intermediate", "Street interviews", "Cultural content"],
                        free: true,
                        level: "Beginner to Intermediate"
                    },
                    {
                        name: "Mandarin Corner",
                        url: "https://www.mandarincorner.org/",
                        features: ["200+ immersive videos", "Little to no English", "Street interviews", "Natural conversations"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "MandarinBean",
                        url: "https://mandarinbean.com/",
                        features: ["HSK-graded content", "5-10 minute videos", "Slow and normal speed", "YouTube channel"],
                        free: true,
                        level: "HSK 1-6+"
                    },
                    {
                        name: "Chinese Zero to Hero",
                        url: "https://www.youtube.com/c/ChineseZeroToHero",
                        features: ["Grammar-focused content", "All HSK levels", "Organized playlists", "Comprehensive explanations"],
                        free: true,
                        level: "All HSK levels"
                    },
                    {
                        name: "ChineseFor.Us",
                        url: "https://www.youtube.com/c/ChineseForUs",
                        features: ["College-style courses", "40-60 lesson series", "Beginner to lower intermediate", "Mandarin Chinese"],
                        free: true,
                        level: "Beginner to Lower Intermediate"
                    },
                    {
                        name: "Mandarin Click",
                        url: "https://www.youtube.com/c/MandarinClick",
                        features: ["Slow Chinese stories", "HSK 1-4 level", "Visual support", "Comprehensible input methodology"],
                        free: true,
                        level: "HSK 1-4"
                    },
                    {
                        name: "Everyday Chinese",
                        url: "https://www.youtube.com/c/EverydayChinese",
                        features: ["350K+ subscribers", "HSK level 1-4", "Daily life situations", "Conversation focused"],
                        free: true,
                        level: "HSK 1-4"
                    }
                ]
            },
            {
                category: "Podcast Resources - Mandarin",
                items: [
                    {
                        name: "ChinesePod Network",
                        url: "https://chinesepod.com/",
                        features: ["Free lesson playlist", "Beginner to advanced", "PDF notes included", "All podcast platforms"],
                        free: false,
                        level: "Beginner to Advanced"
                    },
                    {
                        name: "Slow Chinese Podcast",
                        url: "https://podcasts.apple.com/podcast/slow-chinese/id1234567890",
                        features: ["26+ episodes", "HSK 3+ learners", "Clear narration", "Cultural topics"],
                        free: true,
                        level: "HSK 3+"
                    },
                    {
                        name: "Stories in Slow Chinese",
                        url: "https://podcasts.apple.com/podcast/stories-in-slow-chinese",
                        features: ["Daily storytime", "Intermediate learners", "Comprehension quizzes", "Cultural explanations"],
                        free: true,
                        level: "Intermediate"
                    },
                    {
                        name: "BearTalk (狗熊有话说)",
                        url: "https://voice.beartalking.com/",
                        features: ["iTunes award-winning", "Intermediate to advanced", "Tech and productivity", "Natural Mandarin"],
                        free: true,
                        level: "Intermediate to Advanced"
                    },
                    {
                        name: "Haike Mandarin",
                        url: "https://haikemandarin.com/",
                        features: ["20-30 minute episodes", "Taiwanese Mandarin", "Natural conversations", "Advanced learners"],
                        free: true,
                        level: "Advanced"
                    },
                    {
                        name: "Coffee Break Chinese",
                        url: "https://coffeebreaklanguages.com/chinese/",
                        features: ["40 beginner lessons", "15-20 minute episodes", "Essential phrases", "Grammar coverage"],
                        free: true,
                        level: "Beginner"
                    }
                ]
            },
            {
                category: "Cantonese Audio and Video",
                items: [
                    {
                        name: "Cantonese Corner YouTube",
                        url: "https://www.youtube.com/c/CantoneseCorner",
                        features: ["Video course", "Yale romanization", "Cultural context", "Practical conversations"],
                        free: true,
                        level: "Beginner to Intermediate"
                    },
                    {
                        name: "Chatty Cantonese Podcast",
                        url: "https://podcasts.apple.com/podcast/chatty-cantonese",
                        features: ["Cultural content", "Intermediate Cantonese", "Full transcripts", "Spotify and Apple"],
                        free: true,
                        level: "Intermediate"
                    },
                    {
                        name: "Mama Cheung Cooking",
                        url: "https://www.youtube.com/c/MamaCheungCooking",
                        features: ["Cooking channel", "Natural Cantonese conversations", "Traditional recipes", "Hong Kong focused"],
                        free: true,
                        level: "Intermediate to Advanced"
                    }
                ]
            },
            {
                category: "Audiobook and Radio Resources",
                items: [
                    {
                        name: "Ximalaya (喜马拉雅)",
                        url: "https://www.ximalaya.com/",
                        features: ["Thousands of audiobooks", "Intermediate to advanced", "Harry Potter included", "Daily news broadcasts"],
                        free: true,
                        level: "Intermediate to Advanced"
                    },
                    {
                        name: "LibriVox Chinese Collection",
                        url: "https://librivox.org/",
                        features: ["Public domain literature", "Multiple narrators", "Classical Chinese", "Advanced learners"],
                        free: true,
                        level: "Advanced"
                    },
                    {
                        name: "TuneIn Chinese Radio",
                        url: "https://tunein.com/",
                        features: ["Live radio broadcasts", "News and music", "Talk shows", "Chinese-speaking regions"],
                        free: true,
                        level: "Advanced"
                    },
                    {
                        name: "CCTV Kids (少儿频道)",
                        url: "https://tv.cctv.com/kids/",
                        features: ["Daily educational shows", "Children aged 3-12", "Proper pronunciation", "Cultural content"],
                        free: true,
                        level: "Elementary"
                    },
                    {
                        name: "BabyBus (宝宝巴士)",
                        url: "https://www.youtube.com/c/BabyBus",
                        features: ["Educational songs", "Ages 2-6", "Apps and YouTube", "Fundamental Chinese"],
                        free: true,
                        level: "Early Childhood"
                    }
                ]
            },
            {
                category: "News and Contemporary Media",
                items: [
                    {
                        name: "VOA Chinese",
                        url: "https://www.voachinese.com/",
                        features: ["Daily international news", "Intermediate to advanced", "Broadcasts included", "Written articles"],
                        free: true,
                        level: "Intermediate to Advanced"
                    },
                    {
                        name: "Chinese-Tools News",
                        url: "https://www.chinese-tools.com/news",
                        features: ["Hourly news updates", "Pinyin annotations", "Intermediate to advanced", "Current events"],
                        free: true,
                        level: "Intermediate to Advanced"
                    },
                    {
                        name: "Chinese in Levels",
                        url: "https://chineseinlevels.com/",
                        features: ["Daily news articles", "3 difficulty levels", "1000-3000 words", "Controlled vocabulary"],
                        free: true,
                        level: "3 levels"
                    }
                ]
            }
        ],
        apps: [
            {
                category: "Dictionary Applications",
                items: [
                    {
                        name: "Pleco Chinese Dictionary",
                        url: "https://www.pleco.com/",
                        features: ["235,000+ entries", "Free CC-CEDICT", "Handwriting recognition", "Both character systems"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "MDBG Chinese Dictionary",
                        url: "https://www.mdbg.net/chinese/dictionary",
                        features: ["Complete free dictionary", "Stroke order animations", "Radical search", "Both character types"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Hanping Chinese Dictionary (Android)",
                        url: "https://hanpingchinese.com/",
                        features: ["Android dictionary", "AnkiDroid integration", "Idioms database", "Both character systems"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "CC-CEDICT Open Source Dictionary",
                        url: "https://cc-cedict.org/",
                        features: ["110,000+ entries", "Community-maintained", "Open source", "Both character systems"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "ArchChinese Character Tools",
                        url: "https://www.archchinese.com/",
                        features: ["Character etymology", "Stroke worksheets generator", "Detailed character info", "Both writing systems"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "StrokeOrder.com",
                        url: "http://www.strokeorder.com/",
                        features: ["Animated stroke order", "Handwriting recognition", "Practice included", "Both character types"],
                        free: true,
                        level: "All levels"
                    }
                ]
            },
            {
                category: "Learning Applications",
                items: [
                    {
                        name: "HelloChinese",
                        url: "https://www.hellochinese.cc/",
                        features: ["200+ game-based lessons", "HSK 1-4", "Speech recognition", "Four skills covered"],
                        free: true,
                        level: "HSK 1-4"
                    },
                    {
                        name: "Duolingo Chinese",
                        url: "https://www.duolingo.com/course/zh/en/Learn-Chinese",
                        features: ["Complete gamified course", "Beginner focused", "Streak system", "Simplified characters"],
                        free: true,
                        level: "Beginner"
                    },
                    {
                        name: "AnkiDroid + Chinese Decks",
                        url: "https://ankidroid.org/",
                        features: ["Spaced repetition system", "Thousands of decks", "All proficiency levels", "Android/Web platforms"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "ChineseSkill",
                        url: "https://www.chineseskill.com/",
                        features: ["500+ lessons", "Speaking assessment", "Gamified progression", "Fundamental skills"],
                        free: true,
                        level: "Beginner"
                    },
                    {
                        name: "Memrise Chinese Courses",
                        url: "https://www.memrise.com/courses/english/chinese/",
                        features: ["Video-based learning", "User-created courses", "Various proficiency levels", "All platforms"],
                        free: true,
                        level: "Various"
                    }
                ]
            },
            {
                category: "Reading Platforms",
                items: [
                    {
                        name: "The Chairman's Bao",
                        url: "https://www.thechairmansbao.com/",
                        features: ["9,500+ news lessons", "HSK 1-6+", "Daily updates", "Human-recorded audio"],
                        free: false,
                        level: "HSK 1-6+"
                    },
                    {
                        name: "Du Chinese",
                        url: "https://duchinese.net/",
                        features: ["3,000+ articles", "HSK 1-6", "Tap-to-translate", "Pleco integration"],
                        free: false,
                        level: "HSK 1-6"
                    },
                    {
                        name: "Chinese Reading Practice",
                        url: "https://chinesereadingpractice.com/",
                        features: ["100+ articles", "HSK 2-6", "Cultural context", "Vocabulary support"],
                        free: true,
                        level: "HSK 2-6"
                    },
                    {
                        name: "TODAI Easy Chinese News",
                        url: "https://play.google.com/store/apps/details?id=link.life.todai.zh",
                        features: ["Daily news app", "HSK 1-6", "Color-coded vocabulary", "OCR functionality"],
                        free: true,
                        level: "HSK 1-6"
                    },
                    {
                        name: "RealTime Mandarin Newsletter",
                        url: "https://www.realtimemandarin.com/",
                        features: ["Weekly newsletter", "Advanced learners", "Internet slang", "Contemporary expressions"],
                        free: true,
                        level: "Advanced (HSK 5-6+)"
                    }
                ]
            },
            {
                category: "Input Methods and Typing Tools",
                items: [
                    {
                        name: "Google Pinyin IME",
                        url: "https://chrome.google.com/webstore/detail/google-input-tools",
                        features: ["Chrome extension", "Fuzzy phonetic mapping", "Chinese character typing", "Pinyin input"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Microsoft Chinese IME",
                        url: "https://www.microsoft.com/",
                        features: ["Windows built-in", "Pinyin and Wubi", "Shape-based input", "Both character types"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "ChineseInput.net",
                        url: "http://chineseinput.net/",
                        features: ["Online typing tool", "No installation required", "Quick character input", "Pinyin romanization"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Chinese-Tools IME",
                        url: "https://www.chinese-tools.com/tools/ime.html",
                        features: ["Web-based typing tool", "No installation required", "Both character systems", "Easy access"],
                        free: true,
                        level: "All levels"
                    }
                ]
            }
        ],
        practice: [
            {
                category: "Language Exchange Platforms",
                items: [
                    {
                        name: "HelloTalk",
                        url: "https://www.hellotalk.com/",
                        features: ["18+ million users", "Text/voice/video exchange", "Correction tools", "Social moments"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Tandem",
                        url: "https://www.tandem.net/",
                        features: ["Millions of learners", "Swipe matching", "Professional tutors", "Group audio chats"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "ConversationExchange",
                        url: "https://www.conversationexchange.com/",
                        features: ["Global reach", "Face-to-face meetups", "Correspondence options", "Online chat"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "MyLanguageExchange",
                        url: "https://www.mylanguageexchange.com/",
                        features: ["Established since 2000", "AI speech recognition", "Translation features", "Chinese learner community"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Language.Exchange",
                        url: "https://en.language.exchange/",
                        features: ["Growing community", "200+ languages", "Cultural exchange focus", "Chinese learning resources"],
                        free: true,
                        level: "All levels"
                    }
                ]
            },
            {
                category: "HSK and Test Preparation",
                items: [
                    {
                        name: "Culture Yard HSK Resources",
                        url: "https://www.cultureyard.net/blog/hsk-exam-pdf-free-download",
                        features: ["Complete HSK 1-6 exams", "MP3 audio files", "All sections covered", "Offline study"],
                        free: true,
                        level: "HSK 1-6"
                    },
                    {
                        name: "Mandarin Bean HSK Tests",
                        url: "https://mandarinbean.com/hsk-chinese-test-online/",
                        features: ["HSK 1-6 and 3.0", "18 free mock tests", "Online access", "Comprehensive preparation"],
                        free: true,
                        level: "HSK 1-6, new HSK 3.0"
                    },
                    {
                        name: "HSK Academy",
                        url: "https://hsk.academy/",
                        features: ["HSK 1-6 vocabulary", "Flashcards included", "Practice tests", "Systematic preparation"],
                        free: true,
                        level: "HSK 1-6"
                    },
                    {
                        name: "ImproveMandarin HSK Practice",
                        url: "https://improvemandarin.com/hsk-practice-test/",
                        features: ["70+ official tests", "HSK levels 1-6", "Detailed explanations", "Scoring included"],
                        free: true,
                        level: "HSK 1-6"
                    },
                    {
                        name: "Panda Chinese Test Platform",
                        url: "https://pandachinese.online/en/",
                        features: ["HSK 1-9 materials", "HSKK speaking", "YCT youth", "BCT business"],
                        free: true,
                        level: "HSK 1-9, HSKK, YCT, BCT"
                    },
                    {
                        name: "China Education Center HSK Vocabulary",
                        url: "https://www.chinaeducenter.com/en/hsk/hskvocabulary.php",
                        features: ["Official vocabulary lists", "HSK 2.0 and 3.0", "Both standards", "Downloadable resources"],
                        free: true,
                        level: "HSK 2.0 and 3.0"
                    }
                ]
            },
            {
                category: "TOCFL and Traditional Character Testing",
                items: [
                    {
                        name: "TOCFL Official Mock Tests",
                        url: "https://tocfl.edu.tw/",
                        features: ["Official TOCFL tests", "Taiwan based", "All levels covered", "Traditional characters"],
                        free: true,
                        level: "All TOCFL levels"
                    },
                    {
                        name: "TOCFL Anki Deck",
                        url: "https://ankiweb.net/shared/info/956460973",
                        features: ["TOCFL vocabulary deck", "Spaced repetition", "Flashcard format", "Traditional characters"],
                        free: true,
                        level: "All levels"
                    }
                ]
            },
            {
                category: "Academic Resources",
                items: [
                    {
                        name: "Chinese-Tools Chengyu Dictionary",
                        url: "https://www.chinese-tools.com/chinese/chengyu/dictionary",
                        features: ["30,000+ Chinese idioms", "English translations", "Examples included", "Cultural explanations"],
                        free: true,
                        level: "Advanced"
                    },
                    {
                        name: "MOE Idiom Dictionary (Taiwan)",
                        url: "https://dict.idioms.moe.edu.tw/",
                        features: ["Official idiom dictionary", "Etymology included", "Usage examples", "Advanced study"],
                        free: true,
                        level: "Advanced"
                    },
                    {
                        name: "Paper Republic",
                        url: "https://paper-republic.org/",
                        features: ["Contemporary literature", "Translations included", "Writer profiles", "Advanced readers"],
                        free: true,
                        level: "Advanced"
                    },
                    {
                        name: "GitHub HSK Frequency Lists",
                        url: "https://github.com/alyssabedard/chinese-hsk-and-frequency-lists",
                        features: ["11,092 words", "3,000 characters", "Frequency organized", "Data-driven study"],
                        free: true,
                        level: "All HSK levels"
                    }
                ]
            }
        ]
    }
};

if (typeof languageData !== 'undefined') {
    languageData.chinese = chineseResources;
}