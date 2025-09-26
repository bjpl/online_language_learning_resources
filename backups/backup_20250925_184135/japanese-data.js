// Japanese Language Resources Data
(function(global) {
    'use strict';

    const japaneseData = {
        name: 'Japanese',
        nativeName: '日本語',
        code: 'ja',
        flag: '🇯🇵',
        speakers: '125M native',
        difficulty: 'Very Hard',
        description: 'A unique language with three writing systems, Japanese offers exceptional free resources from official government institutions and a vibrant learning community.',

        resources: {
            courses: [
                {
                    category: 'Online Courses & Learning Platforms',
                    items: [
                        {
                            name: 'JF Japanese e-Learning Minato',
                            url: 'https://minato-jf.jp/',
                            description: 'Japan Foundation\'s official platform with free self-study and tutor-support courses',
                            free: true,
                            level: 'A1-B1',
                            features: ['Marugoto coursebook integration', 'Cultural activities', 'Global community features']
                        },
                        {
                            name: 'Marugoto Plus',
                            url: 'https://marugotoplus.jp/en/',
                            description: 'Supplementary site for Marugoto coursebooks with grammar, vocabulary, kanji exercises',
                            free: true,
                            level: 'A1-A2',
                            features: ['Challenge Drama videos', 'Cultural skits', 'Interactive practice']
                        },
                        {
                            name: 'Irodori: Japanese for Life in Japan',
                            url: 'https://www.irodori.jpf.go.jp/',
                            description: 'Free textbooks for daily life communication in Japan',
                            free: true,
                            level: 'A1-A2',
                            features: ['PDF downloads', 'Audio files', 'Practical everyday situations']
                        },
                        {
                            name: 'Duolingo Japanese',
                            url: 'https://www.duolingo.com/course/ja/en/Learn-Japanese',
                            description: 'Gamified learning with bite-sized lessons',
                            free: true,
                            level: 'A1-B1',
                            features: ['Completely free with ads', 'Mobile apps', 'Spaced repetition']
                        },
                        {
                            name: 'MIT OpenCourseWare Japanese',
                            url: 'https://ocw.mit.edu/courses/21g-501-japanese-i-fall-2019/',
                            description: 'Complete university-level Japanese courses I-IV',
                            free: true,
                            level: 'Beginner-Intermediate',
                            features: ['Full course materials', 'Lecture notes', 'Assignments', 'Free downloads']
                        },
                        {
                            name: 'Alison Japanese Courses',
                            url: 'https://alison.com/tag/japanese-language',
                            description: 'Certificate and diploma courses',
                            free: true,
                            level: 'All levels',
                            features: ['Free certificates', '5-hour certificate courses', '15-20 hour diplomas']
                        },
                        {
                            name: 'FreeJapaneseLessons.com',
                            url: 'https://freejapaneselessons.com/',
                            description: '10-lesson course focusing on grammar basics',
                            free: true,
                            level: 'Beginner',
                            features: ['Verb conjugation focus', 'Sentence structure emphasis']
                        },
                        {
                            name: 'Loecsen Japanese',
                            url: 'https://www.loecsen.com/en/learn-japanese',
                            description: 'Practical phrase-based course with audio',
                            free: true,
                            level: 'Beginner',
                            features: ['No signup required', 'Pronunciation focus', 'Visual dictionary']
                        },
                        {
                            name: 'Busuu Japanese',
                            url: 'https://www.busuu.com/en/course/learn-japanese-online',
                            description: 'AI-powered learning platform',
                            free: false,
                            level: 'All levels',
                            features: ['Basic free lessons', 'Community feedback', 'Speech recognition']
                        },
                        {
                            name: 'Erin\'s Challenge',
                            url: 'Japan Foundation',
                            description: 'Interactive video lessons with cultural content',
                            free: true,
                            level: 'Beginner',
                            features: ['Skits', 'Cultural content', 'Multiple languages']
                        },
                        {
                            name: 'Hirogaru',
                            url: 'Japan Foundation site',
                            description: 'Cultural topics with videos and articles',
                            free: true,
                            level: 'Intermediate',
                            features: ['12 topics', 'Community comments', 'Visual learning']
                        }
                    ]
                },
                {
                    category: 'Grammar Resources',
                    items: [
                        {
                            name: 'Tae Kim\'s Grammar Guide',
                            url: 'https://guidetojapanese.org/learn/grammar',
                            description: 'Comprehensive online grammar guide from Japanese perspective',
                            free: true,
                            level: 'Beginner-Advanced',
                            features: ['Clear explanations', 'Logical progression', 'Mobile-friendly']
                        },
                        {
                            name: 'IMABI',
                            url: 'https://imabi.org/',
                            description: '450+ detailed grammar lessons with linguistic approach',
                            free: true,
                            level: 'All levels',
                            features: ['Classical Japanese', 'Okinawan', 'Extensive examples']
                        },
                        {
                            name: 'Wasabi Japanese',
                            url: 'https://www.wasabi-jpn.com/',
                            description: 'Professional teacher-created lessons',
                            free: true,
                            level: 'All levels',
                            features: ['Balanced detail', 'JLPT-aligned content', 'Clear structure']
                        },
                        {
                            name: 'Maggie Sensei',
                            url: 'https://maggiesensei.com/',
                            description: 'Fun, example-heavy grammar site',
                            free: true,
                            level: 'All levels',
                            features: ['Casual explanations', 'Cultural notes', 'Dog mascot']
                        },
                        {
                            name: 'Bunpro',
                            url: 'https://bunpro.jp/',
                            description: 'Grammar SRS platform',
                            free: false,
                            level: 'All levels',
                            features: ['Free trial', 'Structured paths', 'Example sentences']
                        }
                    ]
                },
                {
                    category: 'JLPT Preparation',
                    items: [
                        {
                            name: 'JLPT Sensei',
                            url: 'https://jlptsensei.com/',
                            description: 'Free JLPT study materials for all levels',
                            free: true,
                            level: 'N5-N1',
                            features: ['Grammar lists', 'Vocabulary', 'Practice tests']
                        },
                        {
                            name: 'Nihongo Library JLPT',
                            url: 'https://nihongolibrary.com/',
                            description: 'JLPT-focused materials with interactive PDFs',
                            free: true,
                            level: 'N5-N4',
                            features: ['Interactive PDFs', 'Answer keys', 'Topic-wise questions']
                        },
                        {
                            name: 'JapanesePod101 JLPT',
                            url: 'https://www.japanesepod101.com/',
                            description: 'JLPT preparation podcasts',
                            free: true,
                            level: 'N5-N1',
                            features: ['Audio lessons', 'PDF supplements', 'Free basic access']
                        }
                    ]
                }
            ],

            apps: [
                {
                    name: 'Anki',
                    url: 'https://ankiweb.net/',
                    description: 'Spaced repetition flashcard system',
                    free: true,
                    platform: 'All platforms',
                    features: ['Customizable', 'Community decks', 'Proven effectiveness']
                },
                {
                    name: 'WaniKani',
                    url: 'https://www.wanikani.com/',
                    description: 'Kanji and vocabulary learning system',
                    free: false,
                    platform: 'Web, iOS, Android',
                    features: ['Free first 3 levels', 'Mnemonics', '2000+ kanji']
                },
                {
                    name: 'Memrise',
                    url: 'https://www.memrise.com/en/learn-japanese',
                    description: 'Community-created Japanese courses',
                    free: true,
                    platform: 'iOS, Android, Web',
                    features: ['Free basic version', 'Spaced repetition', 'Native speaker videos']
                },
                {
                    name: 'Clozemaster',
                    url: 'https://www.clozemaster.com/',
                    description: 'Vocabulary learning in context',
                    free: true,
                    platform: 'Web, Mobile',
                    features: ['Free 30 sentences/day', 'Gamified learning', 'Context-based']
                },
                {
                    name: 'Drops Japanese',
                    url: 'https://languagedrops.com/',
                    description: 'Visual vocabulary learning',
                    free: true,
                    platform: 'iOS, Android',
                    features: ['Free 5 minutes/day', 'Beautiful illustrations', 'Quick sessions']
                },
                {
                    name: 'Kanji Memory Hint',
                    url: 'App stores',
                    description: 'Japan Foundation\'s kanji learning apps',
                    free: true,
                    platform: 'iOS, Android',
                    features: ['Mnemonic pictures', 'Stroke order', 'Official resource']
                },
                {
                    name: 'Todaii/Easy Japanese News',
                    url: 'App stores',
                    description: 'News reading app with dictionary',
                    free: true,
                    platform: 'iOS, Android',
                    features: ['Daily articles', 'JLPT levels', 'Furigana toggle']
                },
                {
                    name: 'Renshuu',
                    url: 'https://www.renshuu.org/',
                    description: 'Comprehensive study platform',
                    free: true,
                    platform: 'Web, Mobile',
                    features: ['Free version available', 'Community features', 'Games']
                },
                {
                    name: 'Real Kana',
                    url: 'https://realkana.com/',
                    description: 'Hiragana/Katakana practice',
                    free: true,
                    platform: 'Web',
                    features: ['Customizable drills', 'Font variations', 'No signup']
                },
                {
                    name: 'Kanji Study',
                    url: 'Web/Apps',
                    description: 'Comprehensive kanji learning tools',
                    free: true,
                    platform: 'Various',
                    features: ['Stroke order', 'Mnemonics', 'Practice sheets']
                }
            ],

            books: [
                {
                    category: 'Open Educational Textbooks',
                    items: [
                        {
                            name: 'Tae Kim\'s Guide to Japanese (PDF)',
                            url: 'https://www.guidetojapanese.org/grammar_guide.pdf',
                            description: 'Complete grammar guide PDF (353 pages)',
                            free: true,
                            level: 'Beginner-Intermediate',
                            features: ['Free PDF download', 'Android/iOS apps', 'Creative Commons license']
                        },
                        {
                            name: 'Beginning Japanese for Professionals',
                            url: 'https://pdxscholar.library.pdx.edu/pdxopen/9',
                            description: 'Business-focused textbook by Emiko Konomi',
                            free: true,
                            level: 'Beginner',
                            features: ['Free PDF/Word/webbook', 'Workplace scenarios', 'CC BY license']
                        },
                        {
                            name: 'Genki Textbooks',
                            url: 'https://archive.org/details/Genki',
                            description: 'Popular textbook series on Internet Archive',
                            free: true,
                            level: 'Beginner-Intermediate',
                            features: ['Complete PDFs with bookmarks', 'Widely-used curriculum']
                        },
                        {
                            name: 'IRODORI Textbooks',
                            url: 'https://www.irodori.jpf.go.jp/en/',
                            description: 'Japan Foundation\'s practical Japanese series',
                            free: true,
                            level: 'A1-A2',
                            features: ['Free PDFs', 'Audio files', 'Life-in-Japan focus']
                        },
                        {
                            name: 'Nihongo Library',
                            url: 'https://nihongolibrary.com/',
                            description: 'Free study materials and interactive PDFs',
                            free: true,
                            level: 'N5-N4',
                            features: ['Grammar books', 'Vocabulary lists', 'JLPT practice with audio']
                        },
                        {
                            name: 'OER Commons Japanese',
                            url: 'https://oercommons.org/browse?f.keyword=japanese',
                            description: 'Collection of open educational resources',
                            free: true,
                            level: 'All levels',
                            features: ['Creative Commons materials', 'Educator-created content']
                        }
                    ]
                },
                {
                    category: 'Reading Materials & Literature',
                    items: [
                        {
                            name: 'Aozora Bunko',
                            url: 'https://www.aozora.gr.jp/',
                            description: 'Japanese public domain literature (15,000+ works)',
                            free: true,
                            level: 'Intermediate-Advanced',
                            features: ['Classic literature', 'Ruby text', 'Multiple formats']
                        },
                        {
                            name: 'NHK News Web Easy',
                            url: 'https://www3.nhk.or.jp/news/easy/',
                            description: 'Simplified Japanese news with furigana',
                            free: true,
                            level: 'Beginner-Intermediate',
                            features: ['Audio for articles', 'Updated daily', 'Dictionary tooltips']
                        },
                        {
                            name: 'Tadoku Free Books',
                            url: 'https://tadoku.org/japanese/en/free-books-en/',
                            description: 'Graded readers for extensive reading',
                            free: true,
                            level: 'All levels',
                            features: ['Level-appropriate stories', 'PDF downloads', 'YouTube versions']
                        },
                        {
                            name: 'Project Gutenberg Japanese',
                            url: 'https://www.gutenberg.org/browse/languages/ja',
                            description: 'Classic Japanese literature collection',
                            free: true,
                            level: 'Advanced',
                            features: ['Hundreds of books', 'EPUB/Kindle formats']
                        },
                        {
                            name: 'Aozora Bunko Portal',
                            url: 'https://www.aozora-bunko-portal.com/',
                            description: 'Categorized Aozora texts by difficulty',
                            free: true,
                            level: 'All levels',
                            features: ['Vocabulary coverage levels', 'Reading recommendations']
                        },
                        {
                            name: 'NHK Easier',
                            url: 'https://nhkeasier.com/',
                            description: 'Alternative interface for NHK Easy News',
                            free: true,
                            level: 'Beginner-Intermediate',
                            features: ['Touch/hover dictionary', 'RSS feed', 'Clean interface']
                        }
                    ]
                },
                {
                    category: 'Dictionaries & Reference',
                    items: [
                        {
                            name: 'Jisho.org',
                            url: 'https://jisho.org/',
                            description: 'Most popular online Japanese dictionary',
                            free: true,
                            features: ['Kanji search by radicals', 'Example sentences', 'Free API']
                        },
                        {
                            name: 'WWWJDIC',
                            url: 'http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic',
                            description: 'Jim Breen\'s comprehensive dictionary',
                            free: true,
                            features: ['Extensive word lists', 'Multiple search options', 'Academic standard']
                        },
                        {
                            name: 'Takoboto',
                            url: 'https://takoboto.jp/',
                            description: 'Online and app dictionary',
                            free: true,
                            features: ['Android/Web versions', 'Offline capability', 'Clean interface']
                        },
                        {
                            name: 'Tangorin',
                            url: 'https://tangorin.com/',
                            description: 'Dictionary with example sentences',
                            free: true,
                            features: ['WWWJDIC data', 'Clean interface', 'Word lists feature']
                        },
                        {
                            name: 'JapanDict',
                            url: 'https://www.japandict.com/',
                            description: 'Dictionary with stroke order animations',
                            free: true,
                            features: ['Verb conjugations', 'Kanji graphs', 'Visual learning']
                        },
                        {
                            name: 'Weblio',
                            url: 'https://www.weblio.jp/',
                            description: 'Comprehensive Japanese dictionary',
                            free: true,
                            features: ['Japanese interface', 'Multiple dictionary sources', 'Professional grade']
                        },
                        {
                            name: 'Rikaichamp',
                            url: 'Browser extension',
                            description: 'Popup dictionary for browsers',
                            free: true,
                            features: ['Hover translations', 'Multiple language support', 'Instant access']
                        },
                        {
                            name: 'Yomichan',
                            url: 'Browser extension',
                            description: 'Advanced popup dictionary',
                            free: true,
                            features: ['Anki integration', 'Custom dictionaries', 'Power user tool']
                        }
                    ]
                }
            ],

            audio: [
                {
                    category: 'Podcasts',
                    items: [
                        {
                            name: 'Nihongo con Teppei (Beginners)',
                            url: 'https://nihongoconteppei.com/',
                            description: 'Popular podcast for beginners (1400+ episodes)',
                            free: true,
                            level: 'Beginner',
                            features: ['4-minute episodes', 'Natural speed', 'Patreon transcripts']
                        },
                        {
                            name: 'JapanesePod101',
                            url: 'https://www.japanesepod101.com/',
                            description: 'Comprehensive podcast-based learning',
                            free: true,
                            level: 'All levels',
                            features: ['Free basic access', 'Structured curriculum', 'PDF materials']
                        },
                        {
                            name: 'Learn Japanese Pod',
                            url: 'Podcast platforms',
                            description: 'Bilingual hosts teaching practical Japanese',
                            free: true,
                            level: 'Beginner-Intermediate',
                            features: ['English explanations', 'Cultural topics', 'Clear teaching']
                        },
                        {
                            name: 'Japanese with Teppei and Noriko',
                            url: 'Podcast platforms',
                            description: 'Conversational podcast between teachers',
                            free: true,
                            level: 'Intermediate',
                            features: ['400+ episodes', 'Authentic conversations', 'Natural Japanese']
                        },
                        {
                            name: 'Nihongo con Teppei Z',
                            url: 'Podcast platforms',
                            description: 'Intermediate version of popular podcast',
                            free: true,
                            level: 'Intermediate',
                            features: ['Longer episodes', 'More complex topics', 'Natural speed']
                        }
                    ]
                },
                {
                    category: 'Video Resources',
                    items: [
                        {
                            name: 'Japanese From Zero',
                            url: 'YouTube',
                            description: 'Comprehensive video course',
                            free: true,
                            level: 'Beginner',
                            features: ['Free YouTube course', 'Community support', 'Structured lessons']
                        },
                        {
                            name: 'Anime & Manga Learning',
                            url: 'https://anime-manga.jf.go.jp/en/',
                            description: 'Japan Foundation\'s anime/manga learning site',
                            free: true,
                            level: 'All levels',
                            features: ['Character-specific language', 'Genre-based learning', 'Cultural context']
                        },
                        {
                            name: 'Comprehensible Japanese',
                            url: 'YouTube',
                            description: 'TPRS method videos',
                            free: true,
                            level: 'Beginner-Intermediate',
                            features: ['Visual storytelling', 'No English', 'Gradual difficulty']
                        },
                        {
                            name: 'Miku Real Japanese',
                            url: 'YouTube',
                            description: 'Real-life Japanese situations',
                            free: true,
                            level: 'Intermediate',
                            features: ['Street interviews', 'Natural speech', 'Cultural insights']
                        },
                        {
                            name: 'Dogen Japanese Phonetics',
                            url: 'YouTube/Patreon',
                            description: 'Pitch accent and pronunciation',
                            free: false,
                            level: 'All levels',
                            features: ['Some free content', 'Professional phonetics', 'Native-like pronunciation']
                        }
                    ]
                }
            ],

            practice: [
                {
                    category: 'Language Exchange & Community',
                    items: [
                        {
                            name: 'HelloTalk',
                            url: 'https://www.hellotalk.com/',
                            description: 'Language exchange app with 18+ million users',
                            free: true,
                            features: ['Voice messages', 'Moments feature', 'Corrections']
                        },
                        {
                            name: 'Tandem',
                            url: 'https://tandem.net/',
                            description: 'Video chat language exchange',
                            free: true,
                            features: ['4000+ Japanese speakers', 'In-app tools', 'Topic cards']
                        },
                        {
                            name: 'ConversationExchange',
                            url: 'https://www.conversationexchange.com/',
                            description: 'Traditional exchange platform',
                            free: true,
                            features: ['Face-to-face options', 'Pen-pals', 'Long-term partners']
                        },
                        {
                            name: 'MyLanguageExchange',
                            url: 'https://www.mylanguageexchange.com/',
                            description: 'Email-based language exchanges',
                            free: true,
                            features: ['Detailed profiles', 'Long-term partnerships', 'Structured approach']
                        },
                        {
                            name: 'r/LearnJapanese',
                            url: 'Reddit',
                            description: 'Reddit learning community',
                            free: true,
                            features: ['800k+ members', 'Daily questions', 'Resource sharing']
                        },
                        {
                            name: 'Minato Communities',
                            url: 'https://minato-jf.jp/',
                            description: 'Virtual learning communities',
                            free: true,
                            features: ['Topic-focused groups', 'Global interaction', 'Official support']
                        },
                        {
                            name: 'WaniKani Community',
                            url: 'https://community.wanikani.com/',
                            description: 'Kanji learning forum',
                            free: true,
                            features: ['Scripts', 'Resources', 'Study logs']
                        },
                        {
                            name: 'Discord Japanese Servers',
                            url: 'Discord',
                            description: 'Real-time chat communities',
                            free: true,
                            features: ['Voice chat', 'Study groups', 'Native speakers']
                        }
                    ]
                },
                {
                    category: 'Writing & Kanji Practice',
                    items: [
                        {
                            name: 'Lang-8',
                            url: 'https://lang-8.com/',
                            description: 'Native speaker corrections for writing',
                            free: true,
                            features: ['Peer corrections', 'Journal format', 'Community feedback']
                        },
                        {
                            name: 'HiNative',
                            url: 'https://hinative.com/',
                            description: 'Q&A with native speakers',
                            free: true,
                            features: ['Quick responses', 'Audio recordings', 'Grammar questions']
                        },
                        {
                            name: 'Kanji Damage',
                            url: 'http://www.kanjidamage.com/',
                            description: 'Alternative kanji learning with humor',
                            free: true,
                            features: ['Mnemonics', 'Yo-mama jokes', '1700+ kanji']
                        },
                        {
                            name: 'JLPT Kanji Lists',
                            url: 'Various sites',
                            description: 'JLPT-organized kanji study materials',
                            free: true,
                            features: ['Level-appropriate lists', 'Stroke order', 'Practice sheets']
                        },
                        {
                            name: 'Kanji Koohii',
                            url: 'https://kanji.koohii.com/',
                            description: 'RTK-based kanji learning community',
                            free: true,
                            features: ['Shared mnemonics', 'SRS system', 'Community stories']
                        },
                        {
                            name: 'Skritter',
                            url: 'https://skritter.com/',
                            description: 'Handwriting practice app',
                            free: false,
                            features: ['Free trial', 'Stroke recognition', 'Muscle memory training']
                        }
                    ]
                },
                {
                    category: 'Online Tutoring',
                    items: [
                        {
                            name: 'italki',
                            url: 'https://www.italki.com/',
                            description: 'Professional teachers and community tutors',
                            free: false,
                            features: ['Trial lessons', 'Various price points', 'Certified teachers']
                        },
                        {
                            name: 'Preply',
                            url: 'https://preply.com/',
                            description: 'One-on-one Japanese tutoring',
                            free: false,
                            features: ['Flexible scheduling', 'Trial lessons', 'All levels']
                        },
                        {
                            name: 'Verbling',
                            url: 'https://www.verbling.com/',
                            description: 'Live video lessons with native speakers',
                            free: false,
                            features: ['Professional teachers', 'Structured courses', 'Flexible times']
                        },
                        {
                            name: 'Cafetalk',
                            url: 'https://cafetalk.com/',
                            description: 'Japanese platform for online lessons',
                            free: false,
                            features: ['Many Japanese teachers', 'Various subjects', 'Points system']
                        },
                        {
                            name: 'Amazing Talker',
                            url: 'https://amazingtalker.com/',
                            description: 'Asian language focus platform',
                            free: false,
                            features: ['No contracts', 'Trial lessons', 'Transparent pricing']
                        }
                    ]
                }
            ]
        }
    };

    // Register Japanese data globally
    if (typeof languageData !== 'undefined') {
        languageData.japanese = japaneseData;
    } else {
        global.languageData = { japanese: japaneseData };
    }

})(window);