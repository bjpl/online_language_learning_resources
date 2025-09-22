// Finnish Language Learning Resources Data
(function() {
    'use strict';

    const finnishData = {
        name: "Finnish",
        nativeName: "Suomi",
        flag: "🇫🇮",
        speakers: "5.5M",
        difficulty: "Hard",
        description: "The language of Finland, Finnish is a unique Uralic language known for its complex grammar and beautiful sound. Government-backed free resources are exceptionally comprehensive.",

        resources: {
            courses: [
                {
                    category: "University Courses",
                    items: [
                        {
                            name: "A Taste of Finnish - University of Helsinki",
                            url: "http://tasteoffinnish.fi/",
                            description: "Complete 10-chapter beginner course with audio and exercises",
                            level: "A1-A2",
                            free: true,
                            features: ["No registration required", "Mobile-friendly", "Cultural context", "Audio support"]
                        },
                        {
                            name: "University of Helsinki Open University",
                            url: "https://www.helsinki.fi/en/admissions-and-education/open-university",
                            description: "Multiple structured Finnish courses from 1A through Media Finnish",
                            level: "A1-B2",
                            free: true,
                            features: ["Free participation", "Optional credits", "Placement test", "Structured progression"]
                        },
                        {
                            name: "Aalto University Introductory Finnish",
                            url: "https://openlearning.aalto.fi/course/view.php?id=59",
                            description: "Self-study course for complete beginners",
                            level: "A1",
                            free: true,
                            features: ["Self-paced", "Additional resources", "Comprehensive introduction"]
                        }
                    ]
                },
                {
                    category: "Online Platforms",
                    items: [
                        {
                            name: "InfoFinland.fi Language Resources",
                            url: "https://www.infofinland.fi/en/finnish-and-swedish/finnish-online",
                            description: "Government-provided comprehensive directory of free online resources",
                            level: "A1-C2",
                            free: true,
                            features: ["12+ languages", "Government-backed", "Integration support", "Comprehensive listings"]
                        },
                        {
                            name: "Digital Dialects Finnish",
                            url: "https://www.digitaldialects.com/Finnish.htm",
                            description: "Interactive games and flashcards for vocabulary learning",
                            level: "A1-B1",
                            free: true,
                            features: ["Gamified learning", "Audio pronunciation", "No registration", "Multiple game types"]
                        },
                        {
                            name: "Duolingo Finnish",
                            url: "https://www.duolingo.com/course/fi/en/Learn-Finnish",
                            description: "Gamified structured course with spaced repetition",
                            level: "A1-B1",
                            free: true,
                            features: ["Mobile/web versions", "Spaced repetition", "Progress tracking", "Stories feature"]
                        },
                        {
                            name: "Clozemaster Finnish",
                            url: "https://clozemaster.com/languages/learn-finnish-online",
                            description: "Context-based cloze exercises with 10,000+ sentences",
                            level: "A2-C2",
                            free: true,
                            features: ["10,000+ free sentences/year", "Spaced repetition", "Context learning", "Progress tracking"]
                        }
                    ]
                },
                {
                    category: "Open Educational Resources",
                    items: [
                        {
                            name: "FSI Conversational Finnish",
                            url: "https://www.livelingua.com/fsi/Fsi-ConversationalFinnish-Textbook.pdf",
                            description: "700+ page comprehensive course from Foreign Service Institute",
                            level: "A1-B2",
                            free: true,
                            features: ["14 units", "Pronunciation guides", "Cultural information", "Public domain"]
                        },
                        {
                            name: "Wikibooks Finnish Course",
                            url: "https://en.wikibooks.org/wiki/Finnish",
                            description: "Complete introductory course with exercises",
                            level: "A1-A2",
                            free: true,
                            features: ["Creative Commons", "Printable version", "Pronunciation guides", "Community-edited"]
                        },
                        {
                            name: "Hyvää päivää Course",
                            url: "https://hyvaa-paivaa.readthedocs.io/_/downloads/en/latest/pdf/",
                            description: "Open-source Finnish course accepting contributions",
                            level: "Beginner",
                            free: true,
                            features: ["CC BY-SA 4.0", "Open contributions", "PDF format", "Structured lessons"]
                        },
                        {
                            name: "FinnishPod101 Workbooks",
                            url: "https://www.finnishpod101.com/finnish-workbooks/",
                            description: "16+ printable PDF workbooks for beginners",
                            level: "A1-A2",
                            free: true,
                            features: ["Free with registration", "Alphabet practice", "Writing exercises", "PDF downloads"]
                        }
                    ]
                },
                {
                    category: "Government Resources",
                    items: [
                        {
                            name: "Kielibuusti.fi",
                            url: "https://www.kielibuusti.fi/en/learn-finnish",
                            description: "Collaborative project by Finnish universities",
                            level: "All levels",
                            free: true,
                            features: ["Self-study materials", "Course directories", "Learning tips", "University-backed"]
                        },
                        {
                            name: "Helsinki Adult Education Centre",
                            url: "https://tyovaenopisto.hel.fi/en/student-services/for-immigrants/",
                            description: "KOTIVA orientation groups and workshops",
                            level: "Basic-Intermediate",
                            free: true,
                            features: ["Free for eligible", "Childcare provided", "Integration focus", "Municipal support"]
                        },
                        {
                            name: "Finnish National Agency for Education",
                            url: "https://www.oph.fi/en/national-certificates-language-proficiency-yki",
                            description: "YKI test information and guidelines",
                            level: "All levels",
                            free: true,
                            features: ["Official framework", "Demo materials", "Test preparation", "Certification info"]
                        },
                        {
                            name: "University of Jyväskylä YKI Demo",
                            url: "https://ykitesti.solki.jyu.fi/en/",
                            description: "Practice exercises for official YKI test",
                            level: "All levels",
                            free: true,
                            features: ["Free demo", "All test sections", "Official preparation", "Self-assessment"]
                        }
                    ]
                }
            ],

            apps: [
                {
                    name: "Anki with Finnish Decks",
                    url: "https://ankiweb.net",
                    description: "Spaced repetition flashcard system with community decks",
                    level: "A1-C2",
                    free: true,
                    features: ["Community decks", "Full offline", "Customizable", "Cross-platform sync"]
                },
                {
                    name: "FunEasyLearn Finnish",
                    url: "https://www.funeasylearn.com/learn-finnish",
                    description: "15,000 words/phrases unlockable through gameplay",
                    level: "A1-C1",
                    free: true,
                    features: ["11 learning games", "Hand-drawn illustrations", "Offline access", "Topic-based"]
                },
                {
                    name: "Drops Finnish",
                    url: "https://languagedrops.com/language/learn-finnish",
                    description: "Visual vocabulary builder with 2600+ words",
                    level: "A1-B1",
                    free: true,
                    features: ["5 min daily free", "Visual learning", "100+ topics", "Minimalist design"]
                },
                {
                    name: "Ba Ba Dum",
                    url: "https://babadum.com",
                    description: "Visual vocabulary games in 21 languages including Finnish",
                    level: "A1-A2",
                    free: true,
                    features: ["Completely free", "5 game types", "1500 words", "Beautiful design"]
                },
                {
                    name: "Voikko",
                    url: "https://voikko.puimula.org/",
                    description: "Open-source spell checker and morphological analyzer",
                    level: "All levels",
                    free: true,
                    features: ["LibreOffice compatible", "Grammar checking", "Open source", "Developer API"]
                },
                {
                    name: "LyricsTraining Finnish",
                    url: "https://lyricstraining.com/fi",
                    description: "Interactive music videos with gap-fill exercises",
                    level: "A2-C2",
                    free: true,
                    features: ["Karaoke mode", "Multiple difficulties", "100% free", "Popular songs"]
                }
            ],

            books: [
                {
                    category: "Easy Reading",
                    items: [
                        {
                            name: "Papunet Easy Finnish",
                            url: "https://papunet.net/materiaalit/selkokieliset-verkkokirjat/",
                            description: "50+ easy Finnish stories with audio support",
                            level: "A1-B1",
                            free: true,
                            features: ["Audio support", "Rich illustrations", "Fairy tales", "Youth stories"]
                        },
                        {
                            name: "YLE Uutiset selkosuomeksi",
                            url: "https://yle.fi/selkouutiset",
                            description: "Daily simplified Finnish news",
                            level: "A2-B1",
                            free: true,
                            features: ["TV broadcasts", "Radio programs", "Archive access", "Daily updates"]
                        },
                        {
                            name: "Selkosanomat",
                            url: "https://selkosanomat.fi/",
                            description: "Biweekly easy Finnish newspaper",
                            level: "A2-B1",
                            free: true,
                            features: ["Audio available", "Pictogram support", "Current events", "Biweekly publication"]
                        },
                        {
                            name: "Selkokeskus Database",
                            url: "https://selkokeskus.fi/selkojulkaisut/",
                            description: "Database of easy Finnish publications",
                            level: "A1-B1",
                            free: true,
                            features: ["Two difficulty levels", "Online materials", "Comprehensive listings", "Quality assured"]
                        }
                    ]
                },
                {
                    category: "Literature",
                    items: [
                        {
                            name: "Project Gutenberg Finnish",
                            url: "https://www.gutenberg.org/browse/languages/fi",
                            description: "Classic Finnish literature including Kalevala",
                            level: "Advanced",
                            free: true,
                            features: ["Multiple formats", "Audio versions", "Classic works", "Public domain"]
                        },
                        {
                            name: "Archive.org Finnish Collection",
                            url: "https://archive.org/details/finnish-50-languages-4h-37-mins_202005",
                            description: "Multiple textbooks including Leila White's grammar books",
                            level: "Various",
                            free: true,
                            features: ["300+ page texts", "Workbooks included", "Public domain", "Downloadable"]
                        },
                        {
                            name: "LibriVox Finnish",
                            url: "https://librivox.org",
                            description: "Public domain Finnish audiobooks",
                            level: "B2-C2",
                            free: true,
                            features: ["Free audiobooks", "Kalevala included", "Volunteer readers", "MP3 downloads"]
                        },
                        {
                            name: "International Children's Digital Library",
                            url: "http://www.childrenslibrary.org/",
                            description: "Limited Finnish children's books collection",
                            level: "Ages 3-13",
                            free: true,
                            features: ["PDF downloads", "Personal use", "Children's literature", "Illustrated"]
                        }
                    ]
                },
                {
                    category: "Digital Libraries",
                    items: [
                        {
                            name: "Finna.fi",
                            url: "https://finna.fi/?lng=en-gb",
                            description: "Unified search across Finnish cultural institutions",
                            level: "All levels",
                            free: true,
                            features: ["450+ organizations", "Millions of items", "Cultural materials", "Advanced search"]
                        },
                        {
                            name: "Digi.kansalliskirjasto.fi",
                            url: "https://digi.kansalliskirjasto.fi/etusivu?set_language=en",
                            description: "30 million pages of digitized Finnish materials",
                            level: "Various",
                            free: true,
                            features: ["Historical newspapers", "Magazines", "Photographs", "Maps"]
                        }
                    ]
                }
            ],

            audio: [
                {
                    category: "Video Lessons",
                    items: [
                        {
                            name: "FinnishPod101 YouTube",
                            url: "https://www.youtube.com/finnishpod101",
                            description: "Hundreds of video lessons with grammar and culture",
                            level: "A1-C2",
                            free: true,
                            features: ["Organized playlists", "Subtitles", "24/7 stream", "Regular updates"]
                        },
                        {
                            name: "Finking Cap YouTube",
                            url: "https://www.youtube.com/c/FinkingCap",
                            description: "Grammar tutorials and spoken Finnish lessons",
                            level: "A1-B2",
                            free: true,
                            features: ["Finnish/English subtitles", "Clear pronunciation", "Grammar focus", "Spoken Finnish"]
                        }
                    ]
                },
                {
                    category: "Podcasts",
                    items: [
                        {
                            name: "Random Finnish Lesson",
                            url: "https://randomfinnishlesson.blogspot.com",
                            description: "Interviews and discussions at slower pace",
                            level: "A2-B2",
                            free: true,
                            features: ["Transcripts available", "Blog support", "Spotify/Apple", "Slower pace"]
                        }
                    ]
                },
                {
                    category: "TV and Radio",
                    items: [
                        {
                            name: "YLE Areena",
                            url: "https://areena.yle.fi",
                            description: "Finnish TV shows, news, documentaries",
                            level: "A2-C2",
                            free: true,
                            features: ["Finnish/English subtitles", "Free access", "Educational content", "Live TV"]
                        },
                        {
                            name: "YLE Radio Suomi",
                            url: "https://areena.yle.fi/radio/ohjelmat/yle-radio-suomi",
                            description: "National Finnish radio with various programs",
                            level: "B1-C2",
                            free: true,
                            features: ["Live streaming", "Podcast archives", "News programs", "Cultural shows"]
                        }
                    ]
                },
                {
                    category: "Pronunciation",
                    items: [
                        {
                            name: "Forvo Finnish",
                            url: "https://forvo.com/languages/fi/",
                            description: "Native speaker pronunciation database",
                            level: "All levels",
                            free: true,
                            features: ["User-contributed", "Quality ratings", "Large database", "Audio downloads"]
                        },
                        {
                            name: "Finnish Text-to-Speech",
                            url: "https://ttsmaker.com",
                            description: "Free TTS services supporting Finnish",
                            level: "All levels",
                            free: true,
                            features: ["MP3/WAV download", "Adjustable speed", "Multiple voices", "No registration"]
                        }
                    ]
                }
            ],

            practice: [
                {
                    category: "Language Exchange",
                    items: [
                        {
                            name: "Reddit r/LearnFinnish",
                            url: "https://www.reddit.com/r/LearnFinnish/",
                            description: "Active community with native speakers",
                            level: "All levels",
                            free: true,
                            features: ["Weekly practice threads", "Discord server", "Native helpers", "Resource sharing"]
                        },
                        {
                            name: "HelloTalk",
                            url: "https://www.hellotalk.com/",
                            description: "20+ million users supporting Finnish",
                            level: "All levels",
                            free: true,
                            features: ["Text/voice/video", "Correction tools", "Moments feed", "Translation support"]
                        },
                        {
                            name: "Tandem Finland",
                            url: "https://tandem.net/language-exchange/finland",
                            description: "875 members in Finland for language exchange",
                            level: "All levels",
                            free: true,
                            features: ["AI grammar check", "Audio parties", "Profile verification", "Topic suggestions"]
                        },
                        {
                            name: "ConversationExchange",
                            url: "https://www.conversationexchange.com/",
                            description: "Traditional language exchange since 2005",
                            level: "All levels",
                            free: true,
                            features: ["Face-to-face", "Correspondence", "Chat options", "Search filters"]
                        },
                        {
                            name: "MyLanguageExchange",
                            url: "https://www.mylanguageexchange.com/",
                            description: "3,451 Finnish members for practice",
                            level: "All levels",
                            free: true,
                            features: ["Lesson plans", "Games", "Translation tools", "Voice chat rooms"]
                        },
                        {
                            name: "InterPals",
                            url: "https://www.interpals.net/",
                            description: "33,432 Finnish language users for cultural exchange",
                            level: "All levels",
                            free: true,
                            features: ["Email/postal/chat", "Cultural focus", "Photo sharing", "Forums"]
                        }
                    ]
                },
                {
                    category: "Exercises and Tests",
                    items: [
                        {
                            name: "Sano suomeksi Exercises",
                            url: "https://sanosuomeksi.com/en/exercises",
                            description: "100+ online exercises with automatic checking",
                            level: "A1-B2",
                            free: true,
                            features: ["Automatic checking", "Level-organized", "Topic-based", "Immediate feedback"]
                        },
                        {
                            name: "Venla.info Exercises",
                            url: "https://venla.info/exercises.html",
                            description: "Interactive Hot Potatoes exercises",
                            level: "All levels",
                            free: true,
                            features: ["14 lessons", "Listening dictation", "All verb types", "Self-checking"]
                        },
                        {
                            name: "Tatoeba Finnish",
                            url: "https://tatoeba.org/en",
                            description: "Example sentences with translations",
                            level: "All levels",
                            free: true,
                            features: ["Audio recordings", "Bulk downloads", "API available", "Community-contributed"]
                        }
                    ]
                },
                {
                    category: "Language Tools",
                    items: [
                        {
                            name: "Wiktionary Finnish",
                            url: "https://en.wiktionary.org/wiki/Category:Finnish_language",
                            description: "~450,000 entries with pronunciations and etymologies",
                            level: "All levels",
                            free: true,
                            features: ["Audio pronunciations", "Inflection forms", "API available", "Etymology"]
                        },
                        {
                            name: "Sanakirja.org",
                            url: "https://www.sanakirja.org/",
                            description: "Multilingual dictionary supporting 20+ languages",
                            level: "All levels",
                            free: true,
                            features: ["AI translator", "600,000+ words", "Offline app", "Multiple languages"]
                        },
                        {
                            name: "Glosbe Finnish",
                            url: "https://glosbe.com/fi/en",
                            description: "Community-built dictionary with context examples",
                            level: "All levels",
                            free: true,
                            features: ["Parallel corpora", "Audio recordings", "API available", "Example sentences"]
                        },
                        {
                            name: "Verbix",
                            url: "https://www.verbix.com/languages/finnish",
                            description: "Complete Finnish verb conjugation system",
                            level: "All levels",
                            free: true,
                            features: ["All tenses/moods", "Dialectal forms", "API available", "Printable tables"]
                        },
                        {
                            name: "Cooljugator",
                            url: "https://cooljugator.com/fi",
                            description: "Modern conjugation tool for verbs, nouns, adjectives",
                            level: "All levels",
                            free: true,
                            features: ["Frequency lists", "Example sentences", "Mobile-friendly", "Quick search"]
                        },
                        {
                            name: "Oikofix",
                            url: "https://oikofix.com/?lang=en",
                            description: "Free online spell and grammar checker",
                            level: "All levels",
                            free: true,
                            features: ["Finnish/English/Sámi", "Three variants", "Grammar check", "Browser extension"]
                        },
                        {
                            name: "TypeIt Finnish",
                            url: "https://finnish.typeit.org/",
                            description: "Browser-based Finnish typing tool",
                            level: "All levels",
                            free: true,
                            features: ["Virtual keyboard", "Special characters", "Copy/paste", "No installation"]
                        },
                        {
                            name: "Language Bank of Finland",
                            url: "https://www.kielipankki.fi/",
                            description: "Frequency lists, n-gram data, corpora",
                            level: "Advanced",
                            free: true,
                            features: ["Academic resources", "Corpora access", "Research tools", "Statistics"]
                        }
                    ]
                },
                {
                    category: "Academic Resources",
                    items: [
                        {
                            name: "Finnish Journal of Linguistics",
                            url: "https://journal.fi/finjol/about",
                            description: "Open access peer-reviewed journal",
                            level: "Academic",
                            free: true,
                            features: ["CC BY 4.0", "DOAJ indexed", "Scopus indexed", "Research articles"]
                        },
                        {
                            name: "University of Helsinki Helda",
                            url: "https://ethesis.helsinki.fi/en",
                            description: "Digital dissertation repository",
                            level: "Academic",
                            free: true,
                            features: ["Full-text access", "2012-present", "Open access", "Research database"]
                        },
                        {
                            name: "Theseus Repository",
                            url: "https://www.theseus.fi/?locale=len",
                            description: "Applied sciences theses and publications",
                            level: "Academic",
                            free: true,
                            features: ["Full text", "Nationwide coverage", "Research use", "Applied sciences"]
                        },
                        {
                            name: "Journal.fi Platform",
                            url: "https://journal.fi",
                            description: "100+ Finnish open access journals",
                            level: "Academic",
                            free: true,
                            features: ["Multilingual", "Free access", "Academic content", "Peer-reviewed"]
                        }
                    ]
                }
            ]
        }
    };

    // Make it available globally
    window.languageData = window.languageData || {};
    window.languageData.finnish = finnishData;
})();