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
                            name: 'Takoboto',
                            url: 'https://takoboto.jp/',
                            description: 'Online and app dictionary',
                            free: true,
                            features: ['Android/Web versions', 'Offline capability', 'Clean interface']
                        },
                        {
                            name: 'Weblio',
                            url: 'https://www.weblio.jp/',
                            description: 'Comprehensive Japanese dictionary',
                            free: true,
                            features: ['Japanese interface', 'Multiple dictionary sources', 'Professional grade']
                        },
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
                    ]
                },
                {
                    category: 'Video Resources',
                    items: [
                        {
                            name: 'Anime & Manga Learning',
                            url: 'https://anime-manga.jf.go.jp/en/',
                            description: 'Japan Foundation\'s anime/manga learning site',
                            free: true,
                            level: 'All levels',
                            features: ['Character-specific language', 'Genre-based learning', 'Cultural context']
                        },
                    ]
                }
            ],

            practice: [
                {
                    category: 'Language Exchange & Community',
                    items: [
                        {
                            name: 'MyLanguageExchange',
                            url: 'https://www.mylanguageexchange.com/',
                            description: 'Email-based language exchanges',
                            free: true,
                            features: ['Detailed profiles', 'Long-term partnerships', 'Structured approach']
                        },
                        {
                            name: 'Minato Communities',
                            url: 'https://minato-jf.jp/',
                            description: 'Virtual learning communities',
                            free: true,
                            features: ['Topic-focused groups', 'Global interaction', 'Official support']
                        },
                    ]
                },
                {
                    category: 'Writing & Kanji Practice',
                    items: [
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
                            url: 'https://www.italki.com/en/teachers/portuguese',
                            description: 'Professional teachers and community tutors',
                            free: false,
                            features: ['Trial lessons', 'Various price points', 'Certified teachers']
                        },
                        {
                            name: 'Preply',
                            url: 'https://preply.com/en/get-started?subject=portuguese&source=HOME_PAGE',
                            description: 'One-on-one Japanese tutoring',
                            free: false,
                            features: ['Flexible scheduling', 'Trial lessons', 'All levels']
                        },
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