const urduResources = {
    name: "Urdu",
    nativeName: "اردو",
    flag: "🇵🇰",
    learners: "1M+",
    speakers: "230M (70M native + 160M second language)",
    highlights: [
        "422,000+ digitized texts across major platforms",
        "Rekhta Foundation: 100,000+ free ebooks and interactive learning tools",
        "Creative Commons textbooks from Michigan State and University of Minnesota",
        "NCPUL India: Government-sponsored comprehensive digital library",
        "Virtual University Pakistan: Complete open courseware with video lectures"
    ],
    resources: {
        courses: [
            {
                category: "Major Learning Platforms",
                items: [
                    {
                        name: "Rekhta Learning",
                        url: "https://rekhtalearning.com/",
                        features: ["Non-profit comprehensive platform with 29,000+ active learners offering free certificates","live expert support","bite-sized lessons","script courses (Rasmul-Khat)","and poetry writing courses"],
                        free: true,
                        level: "Beginner to Advanced"
                    },
                    {
                        name: "LingoHut",
                        url: "https://www.lingohut.com/en/l128/learn-urdu",
                        features: ["125 free 5-minute lessons with voice recordings","designed specifically for immigrants and refugees","no registration required"],
                        free: true,
                        level: "Beginner"
                    },
                    {
                        name: "UrduPod101",
                        url: "https://www.urdupod101.com/",
                        features: ["Audio and video lessons with PDF notes","free lifetime account with weekly new lessons","voice-recording tools","and mobile app access"],
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "Urdu Seekhiye",
                        url: "https://urduseekhiye.com/",
                        features: ["Podcast and YouTube channel by Shireen featuring collaborative audio lessons","complete writing course","and new 2025 community feature"],
                        free: true,
                        level: "Beginner to Intermediate"
                    }
                ]
            },
            {
                category: "University MOOCs and Formal Courses",
                items: [
                    {
                        name: "SWAYAM Urdu Script Learning",
                        url: "https://onlinecourses.swayam2.ac.in/nce19_sc27/preview",
                        features: ["12-16 week NCERT course from Government of India initiative","free with optional paid certificate ($10-20 USD)"],
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "LUMS Beginning Urdu",
                        url: "https://ces.lums.edu.pk/course-details.php?cid=128",
                        features: ["10-week blended course from Pakistan covering four skills with cultural context and English medium instruction for complete beginners"],
                        free: false,
                        level: "Complete Beginner"
                    },
                    {
                        name: "Virtual University Pakistan Open Courseware",
                        url: "https://ocw.vu.edu.pk/",
                        features: ["Complete open courseware with free video lectures and downloadable materials","no registration required for access"],
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "NUML Online Courses",
                        url: "https://numl.edu.pk/olc",
                        features: ["8-16 week certificate courses from Pakistan's National University of Modern Languages with digital certifications and global access"],
                        free: false,
                        level: "All Levels"
                    },
                    {
                        name: "Allama Iqbal Open University",
                        url: "https://www.aiou.edu.pk/department-urdu",
                        features: ["Distance learning from Matriculation to PhD with Teaching Urdu to Foreigners program and comprehensive distance materials"],
                        free: false,
                        level: "All Levels"
                    },
                    {
                        name: "MANUU Hyderabad",
                        url: "https://manuu.edu.in/",
                        features: ["Central University offering B.A","to PhD programs","distance education","and SWAYAM MOOCs"],
                        free: false,
                        level: "University Level"
                    },
                    {
                        name: "Jamia Millia Islamia Correspondence",
                        url: "https://jmi.ac.in/urdu",
                        features: ["Established university program with correspondence courses (₹500)","global access","and 143,000 book library"],
                        free: false,
                        level: "All Levels"
                    }
                ]
            },
            {
                category: "India - Government Institutions",
                items: [
                    {
                        name: "NCPUL (National Council for Promotion of Urdu Language)",
                        url: "http://urducouncil.nic.in/",
                        features: ["Ministry of Education resource with 45+ online lessons","grammar tutorials","and e-library access","completely free with no registration"],
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "Urdu Academy Delhi",
                        url: "https://urduacademydelhi.com/",
                        features: ["NCT Delhi institution established 1981 offering Delhi University recognized certificates and calligraphy courses"],
                        free: false,
                        level: "All Levels"
                    }
                ]
            }
        ],
        books: [
            {
                category: "Creative Commons & Open Source Textbooks",
                items: [
                    {
                        name: "Basic Urdu (Michigan State University)",
                        url: "https://openbooks.lib.msu.edu/urdu/",
                        features: ["CC BY-NC 4.0 interactive textbook with 8 thematic chapters","multiple download formats (EPUB","PDF","XML)","Chapter 1 focuses on script learning"],
                        free: true,
                        level: "Beginner to Intermediate"
                    },
                    {
                        name: "Hindi-Urdu (University of Minnesota)",
                        url: "https://open.lib.umn.edu/hindiurdu/",
                        features: ["CC BY-NC 4.0 combined language learning textbook by four scholars","comprehensive approach from beginning to intermediate"],
                        free: true,
                        level: "Beginning to Intermediate"
                    },
                    {
                        name: "UT Austin Script Guide",
                        url: "https://urdu.la.utexas.edu/wp-content/uploads/sites/10/2023/07/Urdu-Script-and-Pronunciation-UT-Urdu-OER.pdf",
                        features: ["CC BY 4.0 comprehensive guide with detailed friendly/unfriendly letters explanation and pronunciation rules"],
                        free: true,
                        level: "Beginner to Intermediate"
                    },
                    {
                        name: "Zer o Zabar (Northwestern University)",
                        url: "https://openbooks.library.northwestern.edu/zerozabar/",
                        features: ["Script reading and writing introduction for post-beginners with first-year Hindi/Urdu familiarity"],
                        free: true,
                        level: "Post-Beginner"
                    }
                ]
            },
            {
                category: "Government Educational Resources",
                items: [
                    {
                        name: "NCPUL E-Library",
                        url: "https://www.urducouncil.nic.in/urdu-e-library",
                        features: ["India's comprehensive digital library with PDF books","audio books","e-magazines","dictionaries","and encyclopedia"],
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "NCERT Urdu Books",
                        url: "https://www.ncertbooks.guru/ncert-urdu-books/",
                        features: ["Classes 1-12 complete curriculum with free PDF downloads for all grades","government textbooks"],
                        free: true,
                        level: "Elementary to Secondary"
                    },
                    {
                        name: "Pakistan Textbook Board Archive",
                        url: "https://archive.org/details/PAKISTANITEXTBOOKS",
                        features: ["FSC textbooks from all provinces including Federal","Punjab","Sindh","Balochistan","and KPK boards"],
                        free: true,
                        level: "Secondary Education"
                    },
                    {
                        name: "Khan Academy Urdu Grammar",
                        url: "https://khansacademy.in/wp-content/uploads/2021/02/URDU-Grammar.pdf",
                        features: ["Complete grammar guide PDF for educational use with English/Urdu instruction"],
                        free: true,
                        level: "Multiple Levels"
                    }
                ]
            },
            {
                category: "Archive.org Educational Materials",
                items: [
                    {
                        name: "Urdu Essential Grammar",
                        url: "https://archive.org/details/UrduEssentialGrammer",
                        features: ["Grammar rules and structures available in PDF","EPUB","and full text formats for beginning to intermediate learners"],
                        free: true,
                        level: "Beginning to Intermediate"
                    },
                    {
                        name: "Teach Yourself Urdu In Two Months",
                        url: "https://archive.org/details/TeachYourselfUrduInTwoMonths",
                        features: ["Self-study comprehensive grammar guide (83.4M file size)","complete course for beginners"],
                        free: true,
                        level: "Beginner"
                    },
                    {
                        name: "Urdu Learning through English",
                        url: "https://archive.org/details/UrduLearningThroughEnglish",
                        features: ["Comprehensive guide for English speakers (88.5M file size) covering fundamentals to intermediate"],
                        free: true,
                        level: "Beginning"
                    },
                    {
                        name: "Complete Urdu by David Matthews",
                        url: "https://archive.org/details/completeurdu0000matt",
                        features: ["Textbook and audio course (393 pages + audio) covering A1 to B2 CEFR levels","borrowing available"],
                        free: true,
                        level: "A1 to B2 CEFR"
                    }
                ]
            },
            {
                category: "Digital Libraries and Authentic Literature",
                items: [
                    {
                        name: "Rekhta.org Ebooks",
                        url: "https://www.rekhta.org/ebooks",
                        features: ["100,000+ free Urdu ebooks spanning classical to contemporary works including poetry","drama","biographies","novels with annotations available"],
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "Internet Archive Urdu Collection",
                        url: "https://archive.org/details/booksbylanguage_urdu",
                        features: ["32,000+ Urdu books from Digital Library of India with multiple collections (5.4G to 10.5G)","PDF downloads","and full-text search"],
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "Punjab University Library",
                        url: "https://www.pulibrary.edu.pk/urdu.php",
                        features: ["24,000+ manuscripts","largest collection in Pakistan covering Arabic","Persian","Urdu","and Turkish"],
                        free: true,
                        level: "Research-Oriented"
                    },
                    {
                        name: "HEC National Digital Library",
                        url: "https://digitallibrary.edu.pk/",
                        features: ["75,000+ electronic resources from Pakistan's Higher Education Commission"],
                        free: true,
                        level: "University Level"
                    },
                    {
                        name: "UrduPoint Books",
                        url: "https://www.urdupoint.com/books/",
                        features: ["13+ genres including novels","history","Islamic books","autobiographies","health"],
                        free: true,
                        level: "General Audience"
                    },
                    {
                        name: "KitabGhar",
                        url: "https://kitaabghar.com/",
                        features: ["Romantic novels","Imran Series crime thrillers","adventure stories in PDF format"],
                        free: true,
                        level: "Popular Fiction"
                    },
                    {
                        name: "Kutubistan",
                        url: "https://kutubistan.blogspot.com/",
                        features: ["Contemporary novels and Islamic books with regular updates and MediaFire download links"],
                        free: true,
                        level: "Mixed Levels"
                    },
                    {
                        name: "Project Gutenberg Urdu",
                        url: "https://www.gutenberg.org/ebooks/subject/32592",
                        features: ["Classical translations and historical texts in EPUB and Kindle formats"],
                        free: true,
                        level: "Academic/Literary"
                    },
                    {
                        name: "Al-Qalam Institute Resources",
                        url: "https://www.alqalaminstitute.org/resources/urdu-resources",
                        features: ["Entry-level reading materials including First Steps series via Google Drive"],
                        free: true,
                        level: "Complete Beginner"
                    }
                ]
            },
            {
                category: "Newspapers and Magazines",
                items: [
                    {
                        name: "Daily Jang",
                        url: "https://e.jang.com.pk/",
                        features: ["Pakistan's most circulated Urdu daily covering current affairs with multiple editions"],
                        free: true,
                        level: "Intermediate+"
                    },
                    {
                        name: "Daily Express",
                        url: "https://www.express.com.pk/",
                        features: ["Major Pakistani newspaper with news","features","and opinion pieces"],
                        free: true,
                        level: "Intermediate+"
                    },
                    {
                        name: "Akhbar-e-Jehan",
                        url: "https://akhbar-e-jehan.com/",
                        features: ["58-year-old weekly magazine","ABC certified as largest circulated weekly"],
                        free: false,
                        level: "General Audience"
                    },
                    {
                        name: "Akhbar Urdu Portal",
                        url: "https://akhbarurdu.com/",
                        features: ["Links to dozens of Indian Urdu newspapers with regional coverage across India"],
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "NCPUL Magazines",
                        url: "https://www.urducouncil.nic.in/e-library/ncpul-magazines",
                        features: ["Government literary magazines including quarterly criticism","children's","and women's magazines"],
                        free: true,
                        level: "Various"
                    }
                ]
            }
        ],
        audio: [
            {
                category: "Dedicated Urdu Podcasts",
                items: [
                    {
                        name: "UrduPod101 Podcast",
                        url: "https://podcasts.apple.com/us/podcast/learn-urdu-urdupod101-com/id1078788972",
                        features: ["100+ comprehensive lessons with PDF notes","transcripts","vocabulary lists","slowed audio","updated 2x weekly"],
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "Urdu Seekhiye Podcast",
                        url: "https://urduseekhiye.com/",
                        features: ["20+ collaborative episodes under 30 minutes each","with community platform and live Q&A sessions"],
                        free: true,
                        level: "Beginner to Intermediate"
                    },
                    {
                        name: "Urdu Aaj Kal",
                        url: "https://www.spreaker.com/show/urdu-aaj-kal",
                        features: ["Literature and language discussion with interviews featuring poets and writers","modern literature focus"],
                        free: true,
                        level: "Intermediate to Advanced"
                    },
                    {
                        name: "Doorbeen",
                        url: "https://www.podcast.com/",
                        features: ["Children's educational content with under 10-minute episodes on politics","science","and culture"],
                        free: true,
                        level: "Beginner-Friendly"
                    },
                    {
                        name: "Urdu Adab",
                        url: "https://www.podcast.com/",
                        features: ["Short stories podcast with 15-minute average episodes covering various genres"],
                        free: true,
                        level: "Intermediate"
                    },
                    {
                        name: "SBS Urdu",
                        url: "https://tunein.com/podcasts/World-News/SBS-Urdu-p414659/",
                        features: ["News and cultural content with daily releases and music features for native speakers"],
                        free: true,
                        level: "Advanced"
                    }
                ]
            },
            {
                category: "YouTube Learning Channels",
                items: [
                    {
                        name: "UrduPod101 YouTube",
                        url: "https://www.youtube.com/@UrduPod101",
                        features: ["Professional video lessons with 158K subscribers covering grammar","vocabulary","cultural insights","and survival phrases"],
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "Urdu With Zia",
                        url: "https://www.youtube.com/@UrduWithZia",
                        features: ["Most extensive collection with 2000+ videos","organized playlists","everyday vocabulary (some member-only content)"],
                        free: true,
                        level: "Beginner to Intermediate"
                    },
                    {
                        name: "Urdu Academy Jakarta",
                        url: "https://www.youtube.com/@urduacademyjakarta",
                        features: ["Conversational instruction with 75.9K subscribers","106 videos covering grammar rules and sentence construction"],
                        free: true,
                        level: "Beginner to Intermediate"
                    },
                    {
                        name: "BBC Urdu",
                        url: "https://www.youtube.com/@BBCUrdu",
                        features: ["News and current affairs with professional pronunciation and daily uploads"],
                        free: true,
                        level: "Intermediate+"
                    },
                    {
                        name: "Urdu Kids",
                        url: "https://www.youtube.com/@UrduKids",
                        features: ["Children-focused content with 1.4M subscribers","massive educational entertainment library"],
                        free: true,
                        level: "Beginner"
                    }
                ]
            },
            {
                category: "Audio Courses and Resources",
                items: [
                    {
                        name: "LingoHut Audio Lessons",
                        url: "https://www.lingohut.com/en/l128/learn-urdu",
                        features: ["125 × 5-minute lessons with voice recordings","no registration required","mobile-friendly interface"],
                        free: true,
                        level: "Beginner"
                    },
                    {
                        name: "Complete Urdu Audio Course",
                        url: "https://library.teachyourself.com/id004325096/Complete-Urdu",
                        features: ["Professional course audio covering four skills","accessible via browser or app"],
                        free: false,
                        level: "Beginner to Intermediate"
                    },
                    {
                        name: "Learn101 MP3 Lessons",
                        url: "http://learn101.org/urdu_audio.php",
                        features: ["Downloadable audio lessons in MP3 format that work with any player"],
                        free: true,
                        level: "Beginner to Intermediate"
                    },
                    {
                        name: "Pimsleur Urdu Unit 1",
                        url: "https://www.learnoutloud.com/Free-Audio-Video/Languages/Other-Languages/Urdu-Unit-1/41750",
                        features: ["30-minute professional quality introduction sample to the Pimsleur method"],
                        free: true,
                        level: "Beginner"
                    },
                    {
                        name: "VOA Urdu",
                        url: "https://www.urduvoa.com/",
                        features: ["Educational radio programs with live streaming","cultural programming","and daily updates"],
                        free: true,
                        level: "Intermediate+"
                    }
                ]
            }
        ],
        apps: [
            {
                category: "Online Dictionaries",
                items: [
                    {
                        name: "Rekhta Dictionary",
                        url: "https://rekhtadictionary.com/",
                        features: ["Trilingual (Urdu-Hindi-English) with 350k+ words","etymologies","poetry examples","and word of the day"],
                        free: true
                    },
                    {
                        name: "Platts Dictionary",
                        url: "https://dsal.uchicago.edu/dictionaries/platts/",
                        features: ["Classic 1884 dictionary with multiple scripts","University of Chicago sponsored","offline mobile app available"],
                        free: true
                    },
                    {
                        name: "Cambridge Urdu Dictionary",
                        url: "https://dictionary.cambridge.org/dictionary/english-urdu/",
                        features: ["24,000+ real examples with CEFR level support and professional translations"],
                        free: true
                    },
                    {
                        name: "HamariWeb Dictionaries",
                        url: "https://hamariweb.com/dictionaries/",
                        features: ["Multi-language support including Urdu","English","Arabic","French","German"],
                        free: true
                    },
                    {
                        name: "UrduPoint Dictionary",
                        url: "https://www.urdupoint.com/dictionary/",
                        features: ["Bidirectional translation with sentence translation and Roman Urdu support"],
                        free: true
                    }
                ]
            },
            {
                category: "Typing Tools and Keyboards",
                items: [
                    {
                        name: "Easy Urdu Typing",
                        url: "https://www.easyurdutyping.com/",
                        features: ["English-to-Urdu transliteration with auto-save","email integration","and downloadable version for PC/Mac"],
                        free: true
                    },
                    {
                        name: "Branah Keyboard",
                        url: "https://www.branah.com/urdu",
                        features: ["Virtual keyboard with mouse/keyboard input and layout toggle"],
                        free: true
                    },
                    {
                        name: "Google Input Tools",
                        url: "https://www.google.com/inputtools/try/",
                        features: ["Multiple input methods with transliteration that works across websites","Chrome extension available"],
                        free: true
                    },
                    {
                        name: "UrduPoint Online Editor",
                        url: "https://www.urdupoint.com/online-urdu-editor.html",
                        features: ["InPage-style editor with Noori Nastaleeq font and copy/paste functionality"],
                        free: true
                    },
                    {
                        name: "Write-Urdu.com",
                        url: "https://www.write-urdu.com/",
                        features: ["English to Urdu typing with HTML editor functionality"],
                        free: true
                    }
                ]
            },
            {
                category: "Open-Source NLP Tools",
                items: [
                    {
                        name: "UrduHack",
                        url: "https://github.com/urduhack/urduhack",
                        features: ["Complete NLP pipeline with POS tagging","NER","sentiment analysis","MIT License Python library"],
                        free: true
                    },
                    {
                        name: "LughaatNLP",
                        url: "https://github.com/MuhammadNoman76/LughaatNLP",
                        features: ["First comprehensive preprocessing library with tokenization","lemmatization","and TTS/STT support"],
                        free: true
                    },
                    {
                        name: "Awesome Urdu",
                        url: "https://github.com/urduhack/awesome-urdu",
                        features: ["Curated resource list on GitHub with datasets","tools","and comprehensive collection"],
                        free: true
                    },
                    {
                        name: "NLP for Urdu",
                        url: "https://github.com/anuragshas/nlp-for-urdu",
                        features: ["State-of-the-art models including tokenizers","language models","and classifiers"],
                        free: true
                    },
                    {
                        name: "Urdu Datasets",
                        url: "https://github.com/mirfan899/Urdu",
                        features: ["Dataset repository with POS","NER","sentiment datasets","and SpaCy model"],
                        free: true
                    }
                ]
            },
            {
                category: "Mobile Learning Apps",
                items: [
                    {
                        name: "Simply Learn Urdu",
                        url: "https://simyasolutions.com/simply-learn-urdu/",
                        features: ["300+ phrases with audio from native speakers","spaced repetition system","offline support"],
                        free: true
                    },
                    {
                        name: "Ling - Learn Urdu",
                        url: "https://ling-app.com/learn-urdu/",
                        features: ["Four skills coverage with mini-games","alphabet tracing","60+ UI languages","partial offline mode"],
                        free: true
                    },
                    {
                        name: "Learn Urdu 3000 Words",
                        url: "https://play.google.com/store/apps/details?id=com.funeasylearnurdu",
                        features: ["3000+ words in 32 categories with native audio","works in 32 languages","offline capable"],
                        free: true
                    },
                    {
                        name: "Urdu 101 - Learn to Write",
                        url: "https://www.urdu101.com/",
                        features: ["Alphabet learning with guided tracing and multiple difficulty modes","offline support"],
                        free: true
                    },
                    {
                        name: "Dict Box",
                        url: "https://play.google.com/store/apps/details?id=com.grandsons.dictbox",
                        features: ["Multiple dictionaries with fast translations and web browser integration","offline mode"],
                        free: true
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
                        features: ["Native speaker connections with text/voice/video chat","transliteration support","125+ languages"],
                        free: true
                    },
                    {
                        name: "Tandem",
                        url: "https://tandem.net/",
                        features: ["Millions of language partners with in-app corrections and video/audio calls"],
                        free: true
                    },
                    {
                        name: "My Language Exchange",
                        url: "http://mylanguageexchange.com/",
                        features: ["Text and voice chat with lesson plans in a safe environment"],
                        free: true
                    },
                    {
                        name: "Language.Exchange",
                        url: "https://language.exchange/language/UR-Urdu/",
                        features: ["Location-based partner search with cultural exchange focus"],
                        free: true
                    },
                    {
                        name: "The Mixxer",
                        url: "https://www.language-exchanges.org/",
                        features: ["Virtual exchanges with Zoom/WhatsApp integration for structured practice"],
                        free: true
                    }
                ]
            },
            {
                category: "Cultural Institutions",
                items: [
                    {
                        name: "Rekhta Foundation",
                        url: "https://rekhtafoundation.org/",
                        features: ["World's largest Urdu digital repository with 322,415+ ebooks","interactive tools","crosswords","Taqti poetry analysis","mobile apps"],
                        free: true
                    },
                    {
                        name: "Iqbal Academy Pakistan",
                        url: "https://www.iqbalcyberlibrary.net/",
                        features: ["Government cultural institution with 2,746 holdings in 28 languages","Kuliyat-e-Iqbal Urdu app","complete works with translations"],
                        free: true
                    },
                    {
                        name: "Anjuman Taraqqi-e-Urdu",
                        url: "https://urdu.atup.org.pk/",
                        features: ["Oldest Urdu organization (est","1886) with 2,000+ manuscripts","Qaumi Zaban monthly","Urdu Adab quarterly","600+ Indian branches"],
                        free: true
                    },
                    {
                        name: "Ghalib Institute Delhi",
                        url: "https://ghalib-institute.com/",
                        features: ["Established 1965 with 20,733+ documents","rare manuscripts","Delhi University recognized courses","calligraphy training","Jahan-e-Ghalib journal"],
                        free: false
                    },
                    {
                        name: "Osmania University Urdu Department",
                        url: "http://arts.osmania.ac.in/DeptUrdu.php",
                        features: ["First Urdu-medium university (1918) with historical collections and rich legacy resources"],
                        free: false
                    }
                ]
            },
            {
                category: "Pakistan Government Resources",
                items: [
                    {
                        name: "Virtual University Open Courseware",
                        url: "https://ocw.vu.edu.pk/",
                        features: ["Completely free access to all materials","YouTube lectures","and DVDs available at cost"],
                        free: true
                    },
                    {
                        name: "Allama Iqbal Open University",
                        url: "https://www.aiou.edu.pk/department-urdu",
                        features: ["Distance learning from Matriculation to PhD with Teaching Urdu to Foreigners program and Daftri Urdu course"],
                        free: false
                    },
                    {
                        name: "FUUAST (Federal Urdu University)",
                        url: "https://www.fuuastisb.edu.pk/",
                        features: ["First university using Urdu as main instruction language with standard admission process"],
                        free: false
                    },
                    {
                        name: "NUML (National University of Modern Languages)",
                        url: "https://numl.edu.pk/olc",
                        features: ["8-16 week courses accepting global learners with digital certifications"],
                        free: false
                    }
                ]
            }
        ]
    }
};

if (typeof languageData !== 'undefined') {
    languageData.urdu = urduResources;
}