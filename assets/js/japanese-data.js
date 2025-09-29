// Japanese Language Resources Data
(function(global) {
    'use strict';

    const japaneseData = {
        name: 'Japanese',
        nativeName: '日本語',
        code: 'ja',
        flag: '🇯🇵',
        speakers: '125M native',
    resources: {
            courses: [
                {
                    category: 'Online Courses & Learning Platforms',
                    items: [
                        {
                            name: 'JF Japanese e-Learning Minato',
                            url: 'https://minato-jf.jp/',
                            free: true,
                            level: 'A1-B1',
                            features: ['Marugoto coursebook integration', 'Cultural activities', 'Global community features']
                        },
                        {
                            name: 'Irodori: Japanese for Life in Japan',
                            url: 'https://www.irodori.jpf.go.jp/',
                            free: true,
                            level: 'A1-A2',
                            features: ['PDF downloads', 'Audio files', 'Practical everyday situations']
                        },
                        {
                            name: 'Duolingo Japanese',
                            url: 'https://www.duolingo.com/course/ja/en/Learn-Japanese',
                            free: true,
                            level: 'A1-B1',
                            features: ['Completely free with ads', 'Mobile apps', 'Spaced repetition']
                        },
                        {
                            name: 'MIT OpenCourseWare Japanese',
                            url: 'https://ocw.mit.edu/courses/21g-501-japanese-i-fall-2019/',
                            free: true,
                            level: 'Beginner-Intermediate',
                            features: ['Full course materials', 'Lecture notes', 'Assignments', 'Free downloads']
                        },
                        {
                            name: 'Alison Japanese Courses',
                            url: 'https://alison.com/tag/japanese-language',
                            free: true,
                            level: 'All levels',
                            features: ['Free certificates', '5-hour certificate courses', '15-20 hour diplomas']
                        },
                        {
                            name: 'Loecsen Japanese',
                            url: 'https://www.loecsen.com/en/learn-japanese',
                            free: true,
                            level: 'Beginner',
                            features: ['No signup required', 'Pronunciation focus', 'Visual dictionary']
                        },
                        {
                            name: 'Busuu Japanese',
                            url: 'https://www.busuu.com/en/course/learn-japanese-online',
                            free: false,
                            level: 'All levels',
                            features: ['Basic free lessons', 'Community feedback', 'Speech recognition']
                        }]
                },
                {
                    category: 'Grammar Resources',
                    items: [
                        {
                            name: 'Tae Kim\'s Grammar Guide',
                            url: 'https://guidetojapanese.org/learn/grammar',
                            free: true,
                            level: 'Beginner-Advanced',
                            features: ['Clear explanations', 'Logical progression', 'Mobile-friendly']
                        },
                        {
                            name: 'IMABI',
                            url: 'https://imabi.org/',
                            free: true,
                            level: 'All levels',
                            features: ['Classical Japanese', 'Okinawan', 'Extensive examples']
                        },
                        {
                            name: 'Maggie Sensei',
                            url: 'https://maggiesensei.com/',
                            free: true,
                            level: 'All levels',
                            features: ['Casual explanations', 'Cultural notes', 'Dog mascot']
                        },
                        {
                            name: 'Bunpro',
                            url: 'https://bunpro.jp/',
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
                            free: true,
                            level: 'N5-N1',
                            features: ['Grammar lists', 'Vocabulary', 'Practice tests']
                        },
                        {
                            name: 'Nihongo Library JLPT',
                            url: 'https://nihongolibrary.com/',
                            free: true,
                            level: 'N5-N4',
                            features: ['Interactive PDFs', 'Answer keys', 'Topic-wise questions']
                        }]
                }
            ],

            apps: [{
                    name: 'WaniKani',
                    url: 'https://www.wanikani.com/',
                    free: false,
                    platform: 'Web, iOS, Android',
                    features: ['Free first 3 levels', 'Mnemonics', '2000+ kanji']
                }, {
                    name: 'Kanji Memory Hint',
                    url: 'App stores',
                    free: true,
                    platform: 'iOS, Android',
                    features: ['Mnemonic pictures', 'Stroke order', 'Official resource']
                }, {
                    name: 'Todaii/Easy Japanese News',
                    url: 'App stores',
                    free: true,
                    platform: 'iOS, Android',
                    features: ['Daily articles', 'JLPT levels', 'Furigana toggle']
                }, {
                    name: 'Renshuu',
                    url: 'https://www.renshuu.org/',
                    free: true,
                    platform: 'Web, Mobile',
                    features: ['Free version available', 'Community features', 'Games']
                }, {
                    name: 'Real Kana',
                    url: 'https://realkana.com/',
                    free: true,
                    platform: 'Web',
                    features: ['Customizable drills', 'Font variations', 'No signup']
                }, {
                    name: 'Kanji Study',
                    url: 'Web/Apps',
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
                            free: true,
                            level: 'Beginner-Intermediate',
                            features: ['Free PDF download', 'Android/iOS apps', 'Creative Commons license']
                        },
                        {
                            name: 'IRODORI Textbooks',
                            url: 'https://www.irodori.jpf.go.jp/en/',
                            free: true,
                            level: 'A1-A2',
                            features: ['Free PDFs', 'Audio files', 'Life-in-Japan focus']
                        },
                        {
                            name: 'Nihongo Library',
                            url: 'https://nihongolibrary.com/',
                            free: true,
                            level: 'N5-N4',
                            features: ['Grammar books', 'Vocabulary lists', 'JLPT practice with audio']
                        },
                        {
                            name: 'OER Commons Japanese',
                            url: 'https://oercommons.org/browse?f.keyword=japanese',
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
                            free: true,
                            level: 'Intermediate-Advanced',
                            features: ['Classic literature', 'Ruby text', 'Multiple formats']
                        },
                        {
                            name: 'NHK News Web Easy',
                            url: 'https://www3.nhk.or.jp/news/easy/',
                            free: true,
                            level: 'Beginner-Intermediate',
                            features: ['Audio for articles', 'Updated daily', 'Dictionary tooltips']
                        },
                        {
                            name: 'Tadoku Free Books',
                            url: 'https://tadoku.org/japanese/en/free-books-en/',
                            free: true,
                            level: 'All levels',
                            features: ['Level-appropriate stories', 'PDF downloads', 'YouTube versions']
                        },
                        {
                            name: 'Project Gutenberg Japanese',
                            url: 'https://www.gutenberg.org/browse/languages/ja',
                            free: true,
                            level: 'Advanced',
                            features: ['Hundreds of books', 'EPUB/Kindle formats']
                        },
                        {
                            name: 'Aozora Bunko Portal',
                            url: 'https://www.aozora-bunko-portal.com/',
                            free: true,
                            level: 'All levels',
                            features: ['Vocabulary coverage levels', 'Reading recommendations']
                        },
                        {
                            name: 'NHK Easier',
                            url: 'https://nhkeasier.com/',
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
                            free: true,
                            features: ['Kanji search by radicals', 'Example sentences', 'Free API']
                        },
                        {
                            name: 'Takoboto',
                            url: 'https://takoboto.jp/',
                            free: true,
                            features: ['Android/Web versions', 'Offline capability', 'Clean interface']
                        },
                        {
                            name: 'Weblio',
                            url: 'https://www.weblio.jp/',
                            free: true,
                            features: ['Japanese interface', 'Multiple dictionary sources', 'Professional grade']
                        }]
                }
            ],

            audio: [
                {
                    category: 'Podcasts',
                    items: [
                        {
                            name: 'Nihongo con Teppei (Beginners)',
                            url: 'https://nihongoconteppei.com/',
                            free: true,
                            level: 'Beginner',
                            features: ['4-minute episodes', 'Natural speed', 'Patreon transcripts']
                        }]
                },
                {
                    category: 'Video Resources',
                    items: [
                        {
                            name: 'Anime & Manga Learning',
                            url: 'https://anime-manga.jf.go.jp/en/',
                            free: true,
                            level: 'All levels',
                            features: ['Character-specific language', 'Genre-based learning', 'Cultural context']
                        }]
                }
            ],

            practice: [
                {
                    category: 'Language Exchange & Community',
                    items: [
                        {
                            name: 'Minato Communities',
                            url: 'https://minato-jf.jp/',
                            free: true,
                            features: ['Topic-focused groups', 'Global interaction', 'Official support']
                        }]
                },
                {
                    category: 'Writing & Kanji Practice',
                    items: [
                        {
                            name: 'Kanji Koohii',
                            url: 'https://kanji.koohii.com/',
                            free: true,
                            features: ['Shared mnemonics', 'SRS system', 'Community stories']
                        },
                        {
                            name: 'Skritter',
                            url: 'https://skritter.com/',
                            free: false,
                            features: ['Free trial', 'Stroke recognition', 'Muscle memory training']
                        }
                    ]
                },
                {
                    category: 'Online Tutoring',
                    items: [
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