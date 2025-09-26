// Swedish Language Resources Data
(function(global) {
    'use strict';

    const swedishData = {
        name: 'Swedish',
        nativeName: 'Svenska',
        code: 'sv',
        flag: '🇸🇪',
        speakers: '10M native',
        difficulty: 'Easy',
        description: 'A North Germanic language with exceptional government support, Swedish offers comprehensive free education through SFI programs and world-class public media resources.',

        resources: {
            courses: [
                {
                    category: 'University & Academic Courses',
                    items: [
                        {
                            name: 'Uppsala University Swedish',
                            url: 'https://www.uu.se/en/department/scandinavian-languages/study/swedish-courses',
                            description: 'Basic Swedish 1-4, qualifying courses for university',
                            free: true,
                            level: 'A1-C2',
                            features: ['Free for non-tuition students', 'TISUS prep', 'Cultural integration']
                        },
                        {
                            name: 'Stockholm University Swedish',
                            url: 'https://www.su.se/department-of-swedish-language-and-multilingualism/education/',
                            description: 'Swedish for International Students/Researchers',
                            free: true,
                            level: 'A1-C1',
                            features: ['Free for enrolled students', '4.5-9 credits each', 'Academic focus']
                        },
                        {
                            name: 'Lund University Swedish Package',
                            url: 'https://www.lunduniversity.lu.se/admissions/swedish-language-studies',
                            description: 'Study Abroad Swedish levels 1-8, intensive program',
                            free: true,
                            level: 'A1-C2',
                            features: ['Full 2-semester program', 'Cultural immersion', 'IELTS 6.5 required']
                        },
                        {
                            name: 'Duolingo Swedish',
                            url: 'https://www.duolingo.com/course/sv/en/Learn-Swedish',
                            description: 'Gamified comprehensive Swedish course',
                            free: true,
                            level: 'A1-B2',
                            features: ['Completely free with ads', 'Mobile/desktop', 'Offline access', 'Streak tracking']
                        },
                        {
                            name: 'Svenska för alla',
                            url: 'https://swedish-for-all.se/',
                            description: 'Free course for newly arrived immigrants',
                            free: true,
                            level: 'A1-B1',
                            features: ['HTML-based', 'Audio recordings', 'Akelius videos', 'Government funded']
                        },
                        {
                            name: 'EU Academy - Learn Swedish with OLS',
                            url: 'https://academy.europa.eu/',
                            description: 'EU official Swedish resources',
                            free: true,
                            level: 'A1-B1',
                            features: ['Free registration', 'EU context focus', 'Cultural content']
                        },
                        {
                            name: 'SwedishPod101',
                            url: 'https://www.swedishpod101.com/',
                            description: 'Comprehensive audio/video lessons',
                            free: true,
                            level: 'All levels',
                            features: ['Free account tier', '24/7 live stream', 'Extensive podcast library']
                        },
                        {
                            name: 'Memrise Swedish',
                            url: 'https://www.memrise.com/en/learn-swedish',
                            description: 'Video-based learning with native speakers',
                            free: true,
                            level: 'All levels',
                            features: ['Free tier available', 'Immersive videos', 'Pronunciation practice']
                        },
                        {
                            name: 'Clozemaster',
                            url: 'https://www.clozemaster.com/',
                            description: 'Context-based vocabulary learning',
                            free: true,
                            level: 'All levels',
                            features: ['Free 30 sentences/day', 'Fill-in-the-blank format', 'Gamification']
                        },
                        {
                            name: 'LingQ',
                            url: 'https://www.lingq.com/en/learn-swedish-online/',
                            description: 'Import and learn from authentic content',
                            free: true,
                            level: 'All levels',
                            features: ['Free tier available', 'Custom lesson creation', 'Content library']
                        },
                        {
                            name: 'Beelinguapp',
                            url: 'https://beelinguapp.com/courses/learn-swedish',
                            description: 'Audiobooks with parallel text',
                            free: true,
                            level: 'All levels',
                            features: ['Free tier', 'Karaoke-style highlighting', 'Story-based learning']
                        }
                    ]
                },
                {
                    category: 'Government SFI Programs',
                    items: [
                        {
                            name: 'NTI-skolan SFI Distance',
                            url: 'https://nti.se/sfi-pa-distans/',
                            description: 'Government SFI paths 2-3, courses B-D',
                            free: true,
                            level: 'A2-B2',
                            features: ['Free through municipality', 'Self-paced', 'Teacher support']
                        },
                        {
                            name: 'Hermods SFI',
                            url: 'https://hermods.se/sfi/',
                            description: 'All SFI levels with distance options',
                            free: true,
                            level: 'A1-B2',
                            features: ['Free municipal enrollment', 'Novo platform', 'Flexible scheduling']
                        },
                        {
                            name: 'Folkuniversitetet SFI',
                            url: 'https://www.folkuniversitetet.se/vara-skolor/sfi-svenska-for-invandrare/',
                            description: 'Standard and academic track SFI',
                            free: true,
                            level: 'A1-B2',
                            features: ['Free with personnummer', 'Specialized programs', 'Hearing impaired support']
                        },
                        {
                            name: 'Informationsverige.se',
                            url: 'https://www.informationsverige.se/en/',
                            description: 'Official integration platform',
                            free: true,
                            level: 'All levels',
                            features: ['Hej svenska! app', '11 languages', 'Offline access']
                        },
                        {
                            name: 'SFI Municipal Programs',
                            url: 'Municipal websites',
                            description: 'Free Swedish education for immigrants',
                            free: true,
                            level: 'A1-B2',
                            features: ['Government funded', 'Paths 1-3', 'Courses A-D', 'Age 16+']
                        },
                        {
                            name: 'Komvux',
                            url: 'Municipal adult education',
                            description: 'Secondary level Swedish education',
                            free: true,
                            level: 'Various',
                            features: ['Free for residents', 'Flexible scheduling', 'Distance options']
                        }
                    ]
                }
            ],

            apps: [
                {
                    name: 'Duolingo',
                    url: 'https://www.duolingo.com/',
                    description: 'Most popular language learning app',
                    free: true,
                    platform: 'Web/iOS/Android',
                    features: ['Completely free core', 'Gamification', 'Offline mode']
                },
                {
                    name: 'Memrise',
                    url: 'https://www.memrise.com/',
                    description: 'Video-based vocabulary learning',
                    free: true,
                    platform: 'Web/iOS/Android',
                    features: ['Free tier', 'Native speaker videos', 'Spaced repetition']
                },
                {
                    name: 'Anki + Swedish Decks',
                    url: 'https://ankiweb.net/shared/decks?search=Swedish',
                    description: 'Flashcard system with shared decks',
                    free: true,
                    platform: 'All platforms',
                    features: ['Free', 'Thousands of shared decks', 'Customizable']
                },
                {
                    name: 'Beelinguapp',
                    url: 'https://beelinguapp.com/',
                    description: 'Parallel text stories with audio',
                    free: true,
                    platform: 'iOS/Android',
                    features: ['Free tier', 'Audiobooks', 'Karaoke-style reading']
                },
                {
                    name: 'Clozemaster',
                    url: 'https://www.clozemaster.com/',
                    description: 'Context-based learning game',
                    free: true,
                    platform: 'Web/Mobile',
                    features: ['Free 30 sentences/day', 'Gamified', 'Cloze deletion']
                },
                {
                    name: 'LingQ',
                    url: 'https://www.lingq.com/',
                    description: 'Import and learn content',
                    free: true,
                    platform: 'All platforms',
                    features: ['Free tier limited', 'Create lessons from any content']
                },
                {
                    name: 'Drops',
                    url: 'https://languagedrops.com/language/learn-swedish',
                    description: 'Visual vocabulary builder',
                    free: true,
                    platform: 'iOS/Android',
                    features: ['Free 5 min/day', 'Beautiful illustrations', 'Quick sessions']
                },
                {
                    name: 'HelloTalk',
                    url: 'https://www.hellotalk.com/',
                    description: 'Language exchange app',
                    free: true,
                    platform: 'iOS/Android',
                    features: ['25M+ users', 'Translation tools', 'Voice/video chat']
                },
                {
                    name: 'Tandem',
                    url: 'https://tandem.net/',
                    description: 'Language partner matching',
                    free: true,
                    platform: 'iOS/Android',
                    features: ['550+ Swedish speakers in Stockholm', 'Video calls', 'Corrections']
                },
                {
                    name: 'Hej svenska!',
                    url: 'Via Informationsverige.se',
                    description: 'Official government app',
                    free: true,
                    platform: 'iOS/Android',
                    features: ['11 languages', 'Offline access', 'Government content']
                }
            ],

            books: [
                {
                    category: 'Open Educational Textbooks',
                    items: [
                        {
                            name: 'Internet Archive Swedish Learning',
                            url: 'https://archive.org/details/swedish-learning',
                            description: '3.6GB comprehensive textbook collection',
                            free: true,
                            level: 'A1-C2',
                            features: ['Public domain', '201 Swedish Verbs', 'Essential Swedish Grammar']
                        },
                        {
                            name: 'Wikibooks Swedish Course',
                            url: 'https://en.wikibooks.org/wiki/Swedish',
                            description: 'Complete 27-lesson structured course',
                            free: true,
                            level: 'A1-B2',
                            features: ['CC licensed', 'Pronunciation guides', 'Cultural context', 'Printable']
                        },
                        {
                            name: 'SwedishPod101 Free PDFs',
                            url: 'https://www.swedishpod101.com/swedish-workbooks/',
                            description: '16+ workbooks and worksheets',
                            free: true,
                            level: 'A1-A2',
                            features: ['Free with registration', 'Alphabet practice', 'Vocabulary building']
                        },
                        {
                            name: 'Swedish Grammar (Archive.org)',
                            url: 'https://archive.org/details/SwedishGrammar',
                            description: 'Comprehensive grammar reference PDF',
                            free: true,
                            level: 'B1-C2',
                            features: ['Public domain', 'Well-organized', 'Index and glossary']
                        },
                        {
                            name: 'Swedish: Essentials of Grammar',
                            url: 'https://archive.org/details/swedishessential0000vibe',
                            description: '159-page grammar guide by Åke Viberg',
                            free: true,
                            level: 'A2-B2',
                            features: ['Systematic instruction', 'Practical approach', 'Lending library']
                        },
                        {
                            name: '201 Swedish Verbs',
                            url: 'https://archive.org/details/swedish-learning',
                            description: 'Complete verb conjugation reference',
                            free: true,
                            level: 'B1-C2',
                            features: ['All conjugations', 'Usage examples', 'Part of Archive collection']
                        },
                        {
                            name: 'Colloquial Swedish',
                            url: 'https://archive.org/details/swedish-learning',
                            description: 'Complete beginner textbook series',
                            free: true,
                            level: 'A1-B1',
                            features: ['Audio included', 'Conversational approach', 'Exercises']
                        },
                        {
                            name: 'Advanced Spoken Swedish',
                            url: 'https://archive.org/details/swedish-learning',
                            description: 'Advanced conversation guide',
                            free: true,
                            level: 'C1-C2',
                            features: ['Natural expressions', 'Idioms', 'Colloquialisms']
                        },
                        {
                            name: 'Scriveremo Vocabulary PDFs',
                            url: 'https://www.scriveremo.com/pdfwordlist.php?l=swe',
                            description: 'Categorized vocabulary lists',
                            free: true,
                            level: 'All levels',
                            features: ['Free downloads', 'English-Swedish translations', 'Printable']
                        }
                    ]
                },
                {
                    category: 'Literature & Reading Materials',
                    items: [
                        {
                            name: 'Litteraturbanken',
                            url: 'https://litteraturbanken.se/om/english.html',
                            description: '2,000+ Swedish literary works',
                            free: true,
                            level: 'Advanced',
                            features: ['Medieval to contemporary', '100M+ words', 'TEI-encoded', 'EPUB/PDF']
                        },
                        {
                            name: 'Project Gutenberg Swedish',
                            url: 'https://www.gutenberg.org/browse/languages/sv',
                            description: 'Classic Swedish literature',
                            free: true,
                            level: 'Advanced',
                            features: ['Strindberg', 'Lagerlöf', 'Multiple formats', 'No registration']
                        },
                        {
                            name: 'Project Runeberg',
                            url: 'https://runeberg.org/',
                            description: '200+ Nordic literature editions',
                            free: true,
                            level: 'Advanced',
                            features: ['Facsimile editions', 'Volunteer proofreading', 'Pre-1920s focus']
                        },
                        {
                            name: '8 Sidor',
                            url: 'https://8sidor.se/',
                            description: 'Easy-read daily newspaper since 1984',
                            free: true,
                            level: 'A2-B1',
                            features: ['Simplified vocabulary', '8-page format', 'Audio versions', 'Current events']
                        },
                        {
                            name: 'Lingua.com Swedish Texts',
                            url: 'https://lingua.com/swedish/reading/',
                            description: 'Graded reading texts',
                            free: true,
                            level: 'A1-B1',
                            features: ['Audio files', 'Comprehension questions', 'PDF downloads']
                        },
                        {
                            name: 'Fairytalez Swedish',
                            url: 'https://fairytalez.com/region/swedish/',
                            description: 'Classic Swedish fairy tales',
                            free: true,
                            level: 'A2-B1',
                            features: ['Traditional stories', 'Audio via app', 'Simple language']
                        },
                        {
                            name: 'Open Library Swedish',
                            url: 'https://openlibrary.org/subjects/swedish_literature',
                            description: 'Extensive Swedish catalog',
                            free: true,
                            level: 'All levels',
                            features: ['2,988 literature works', 'Borrowing options', 'Multiple formats']
                        }
                    ]
                },
                {
                    category: 'Academic Resources',
                    items: [
                        {
                            name: 'DiVA Portal',
                            url: 'https://www.diva-portal.org/',
                            description: 'Swedish university repository system',
                            free: true,
                            level: 'Academic',
                            features: ['50+ universities', 'Open access theses', 'Research papers']
                        },
                        {
                            name: 'SwePub',
                            url: 'https://swepub.kb.se/',
                            description: 'National scholarly publication database',
                            free: true,
                            level: 'Academic',
                            features: ['Research articles', 'Dissertations', 'Swedish academic output']
                        },
                        {
                            name: 'Språkbanken',
                            url: 'https://spraakbanken.gu.se/',
                            description: 'Language resources from Gothenburg University',
                            free: true,
                            level: 'All levels',
                            features: ['Dictionaries', 'Concordances', 'Linguistic tools', 'Corpus data']
                        }
                    ]
                }
            ],

            audio: [
                {
                    category: 'Swedish Public Media',
                    items: [
                        {
                            name: 'SVT Play',
                            url: 'https://www.svtplay.se/',
                            description: 'Swedish public television streaming',
                            free: true,
                            level: 'All levels',
                            features: ['Free', 'Subtitles in 29+ languages', 'Offline viewing', 'All programs']
                        },
                        {
                            name: 'SVT Språkplay',
                            url: 'https://sprakplay.svt.se/',
                            description: 'Interactive language learning version of SVT',
                            free: true,
                            level: 'All levels',
                            features: ['Click-for-translation', 'Progress tracking', 'Sweden-only features']
                        },
                        {
                            name: 'UR Play',
                            url: 'https://www.urplay.se/',
                            description: 'Educational broadcasting',
                            free: true,
                            level: 'All levels',
                            features: ['Free', 'Educational focus', 'Teacher resources', 'Long-term availability']
                        },
                        {
                            name: 'UR Språkplay',
                            url: 'https://ursprakplay.se/',
                            description: 'Language learning features for UR',
                            free: true,
                            level: 'All levels',
                            features: ['Interactive subtitles', 'Learning tools', 'Educational content']
                        },
                        {
                            name: 'SR Play',
                            url: 'https://sverigesradio.se/',
                            description: 'Swedish Radio streaming',
                            free: true,
                            level: 'All levels',
                            features: ['P1-P4 channels', 'Podcasts', 'Offline downloads', 'Multiple languages']
                        },
                        {
                            name: 'Radio Sweden på lätt svenska',
                            url: 'https://www.sverigesradio.se/radioswedenpalattsvenska',
                            description: 'Daily easy Swedish news',
                            free: true,
                            level: 'A2-B1',
                            features: ['5-10 min episodes', 'Text + audio', 'Clear pronunciation']
                        }
                    ]
                },
                {
                    category: 'Podcasts',
                    items: [
                        {
                            name: 'Simple Swedish Podcast',
                            url: 'https://arhus12.podbean.com/',
                            description: '200+ episodes natural Swedish',
                            free: true,
                            level: 'B1-B2',
                            features: ['Slower pace', 'Varied topics', 'Transcripts on Patreon']
                        },
                        {
                            name: 'Coffee Break Swedish',
                            url: 'https://coffeebreaklanguages.com/coffeebreakswedish/',
                            description: '15-20 minute structured lessons',
                            free: true,
                            level: 'A1-B1',
                            features: ['Teacher-student format', 'Cultural insights', 'Free podcast tier']
                        },
                        {
                            name: 'Say It In Swedish',
                            url: 'https://www.sayitinswedish.com/',
                            description: 'English explanations with Swedish',
                            free: true,
                            level: 'A2-B2',
                            features: ['Level indicators', 'Slow Swedish episodes', 'Clear explanations']
                        },
                        {
                            name: 'Svenska med Anastasia',
                            url: 'Podcast platforms',
                            description: 'Intermediate Swedish podcast',
                            free: true,
                            level: 'B1-B2',
                            features: ['Natural conversations', 'Cultural topics', 'Native speaker']
                        },
                        {
                            name: 'News in Slow Swedish',
                            url: 'Various platforms',
                            description: 'Current events at slower pace',
                            free: true,
                            level: 'B1-B2',
                            features: ['Weekly episodes', 'Vocabulary support', 'Topical content']
                        },
                        {
                            name: 'Språket i P1',
                            url: 'SR Play',
                            description: 'Language and linguistics',
                            free: true,
                            level: 'C1-C2',
                            features: ['Academic discussions', 'Swedish language evolution', 'Expert interviews']
                        },
                        {
                            name: 'Lär dig svenska med Oskar',
                            url: 'Podcast platforms',
                            description: 'Beginner-friendly content',
                            free: true,
                            level: 'A1-A2',
                            features: ['Simple vocabulary', 'Clear pronunciation', 'Basic topics']
                        },
                        {
                            name: 'UR Samtiden',
                            url: 'UR Play',
                            description: 'Educational lectures',
                            free: true,
                            level: 'B2-C2',
                            features: ['University lectures', 'Seminars', 'Academic Swedish']
                        }
                    ]
                },
                {
                    category: 'YouTube Channels',
                    items: [
                        {
                            name: 'Learn Easy Swedish',
                            url: 'YouTube search',
                            description: 'Beginner-focused channel',
                            free: true,
                            level: 'A1-A2',
                            features: ['Dual subtitles', 'Slow speech', 'Daily topics', 'Travel vlogs']
                        },
                        {
                            name: 'Peter SFI',
                            url: 'YouTube search',
                            description: 'SFI teacher\'s grammar channel',
                            free: true,
                            level: 'B1-B2',
                            features: ['No subtitles', 'Grammar focus', 'Authentic teaching style']
                        }
                    ]
                }
            ],

            practice: [
                {
                    category: 'Language Exchange Platforms',
                    items: [
                        {
                            name: 'Tandem',
                            url: 'https://tandem.net/',
                            description: 'Popular exchange app',
                            free: true,
                            features: ['550+ Swedish speakers Stockholm', 'Text/voice/video', 'In-app tools']
                        },
                        {
                            name: 'HelloTalk',
                            url: 'https://www.hellotalk.com/',
                            description: 'Largest language exchange',
                            free: true,
                            features: ['25M+ users', '150+ languages', 'Translation', 'Anti-dating policy']
                        },
                        {
                            name: 'ConversationExchange',
                            url: 'https://www.conversationexchange.com/',
                            description: 'Traditional exchange site',
                            free: true,
                            features: ['Face-to-face meetings', 'Pen-pals', 'Video chat options']
                        },
                        {
                            name: 'MyLanguageExchange',
                            url: 'https://www.mylanguageexchange.com/',
                            description: 'Long-term partnerships',
                            free: true,
                            features: ['Email exchanges', 'Detailed profiles', 'Established community']
                        },
                        {
                            name: 'Bilingua',
                            url: 'https://bilingua.io/',
                            description: 'AI-powered matching',
                            free: true,
                            features: ['Personality matching', 'Chat interface', 'Cultural exchange']
                        },
                        {
                            name: 'Speaky',
                            url: 'https://www.speaky.com/',
                            description: 'Global language exchange',
                            free: true,
                            features: ['180+ countries', 'Instant chat', 'Language practice rooms']
                        },
                        {
                            name: 'Language.Exchange',
                            url: 'https://language.exchange/',
                            description: 'Modern exchange platform',
                            free: true,
                            features: ['Video chat focus', 'Schedule matching', 'Structured sessions']
                        }
                    ]
                },
                {
                    category: 'Online Communities',
                    items: [
                        {
                            name: 'r/Svenska Reddit',
                            url: 'https://reddit.com/r/svenska',
                            description: 'Largest Swedish learning subreddit',
                            free: true,
                            features: ['55,000+ members', 'Grammar Q&A', 'Resource sharing', 'Weekly threads']
                        },
                        {
                            name: 'r/Svenska Discord',
                            url: 'Discord invite via Reddit',
                            description: 'Official Discord server',
                            free: true,
                            features: ['5,000+ members', 'Voice practice', 'Native speakers', 'Topic channels']
                        },
                        {
                            name: 'Language Cafe Discord',
                            url: 'https://www.languagecafe.world/',
                            description: 'Multilingual community',
                            free: true,
                            features: ['50+ language channels', 'Study events', 'Game nights']
                        },
                        {
                            name: 'WordReference Swedish',
                            url: 'https://forum.wordreference.com/forums/swedish.49/',
                            description: 'Translation and grammar forum',
                            free: true,
                            features: ['Native speaker answers', 'Detailed explanations', 'Search archive']
                        },
                        {
                            name: 'LangCorrect',
                            url: 'https://www.langcorrect.com/',
                            description: 'Writing correction platform',
                            free: true,
                            features: ['Native corrections', 'Journals', 'Prompts', 'Ranking system']
                        },
                        {
                            name: 'Swedish Conversation Club',
                            url: 'https://onlineswedish.org/swedish-conversation-club/',
                            description: 'Weekly video conversations',
                            free: true,
                            features: ['Free MS Teams sessions', 'Structured topics', 'Professional facilitation']
                        },
                        {
                            name: 'Svenska Språkcafé',
                            url: 'https://sprakcafe.se/',
                            description: 'Digital language café',
                            free: true,
                            features: ['Regular sessions', 'Cultural discussions', 'Free participation']
                        },
                        {
                            name: 'Facebook Swedish Groups',
                            url: 'Facebook search',
                            description: 'Various learning groups',
                            free: true,
                            features: ['Swedish Learning Group (30k+)', 'Daily practice', 'Native speakers']
                        },
                        {
                            name: 'Polyglot Club Swedish',
                            url: 'https://polyglotclub.com/language/swedish',
                            description: 'Language exchange events',
                            free: true,
                            features: ['Online/offline meetings', 'City-specific groups', 'Event calendar']
                        }
                    ]
                },
                {
                    category: 'Dictionaries & Tools',
                    items: [
                        {
                            name: 'Svenska Akademiens Ordbok (SAOB)',
                            url: 'https://www.saob.se/',
                            description: 'Historical dictionary 1521-present',
                            free: true,
                            features: ['500,000+ entries', 'Etymology', 'Full-text search']
                        },
                        {
                            name: 'Svenska.se',
                            url: 'https://svenska.se/',
                            description: 'Three academy dictionaries combined',
                            free: true,
                            features: ['SAOL/SO/SAOB', 'Pronunciation audio', 'Simultaneous search']
                        },
                        {
                            name: 'Lexin Dictionaries',
                            url: 'https://lexin.nada.kth.se/',
                            description: 'Multilingual for immigrants',
                            free: true,
                            features: ['16 language pairs', '5,000-22,000 entries', 'Mobile apps']
                        },
                        {
                            name: 'Folkets Lexikon',
                            url: 'https://folkets-lexikon.csc.kth.se/',
                            description: 'Crowd-sourced Swedish-English',
                            free: true,
                            features: ['CC licensed', 'Downloadable', 'Virtual keyboard', 'XML format']
                        },
                        {
                            name: 'Wiktionary Swedish',
                            url: 'https://en.wiktionary.org/wiki/Category:Swedish_language',
                            description: 'Community dictionary',
                            free: true,
                            features: ['Pronunciation', 'Etymology', 'Conjugations']
                        },
                        {
                            name: 'LanguageTool Swedish',
                            url: 'https://languagetool.org/',
                            description: 'Grammar checker',
                            free: true,
                            features: ['Free tier', 'Browser extensions', '30+ languages']
                        },
                        {
                            name: 'Bab.la Swedish Conjugator',
                            url: 'https://en.bab.la/conjugation/swedish/',
                            description: 'Verb conjugation tool',
                            free: true,
                            features: ['Comprehensive conjugations', 'Examples', 'Free']
                        }
                    ]
                },
                {
                    category: 'Testing & Assessment',
                    items: [
                        {
                            name: 'TISUS Test',
                            url: 'https://www.su.se/tisus/english/',
                            description: 'University admission test',
                            free: false,
                            level: 'C1',
                            features: ['Twice yearly', '7 Swedish cities', 'International locations']
                        },
                        {
                            name: 'SWEDEX',
                            url: 'Folkuniversitetet',
                            description: 'Standardized Swedish exam',
                            free: false,
                            level: 'A2-B2',
                            features: ['CEFR aligned', 'EU funded', 'All skills tested']
                        },
                        {
                            name: 'Biblioteken (Libraries)',
                            url: 'Local library websites',
                            description: 'Free courses and conversation',
                            free: true,
                            features: ['Språkcafé', 'Book clubs', 'Digital resources', 'Conversation groups']
                        }
                    ]
                }
            ]
        }
    };

    // Register Swedish data globally
    if (typeof languageData !== 'undefined') {
        languageData.swedish = swedishData;
    } else {
        global.languageData = { swedish: swedishData };
    }

})(window);