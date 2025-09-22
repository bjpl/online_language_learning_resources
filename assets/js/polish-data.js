// Polish Language Learning Resources Data
(function(global) {
    'use strict';

    const polishData = {
        name: "Polish",
        nativeName: "Polski",
        code: 'pl',
        flag: "🇵🇱",
        speakers: "45M",
        difficulty: "Hard",
        description: "A Slavic language with rich history, Polish offers exceptional free resources through government initiatives and EU funding. Poland leads globally in open educational resources.",

        resources: {
            courses: [
                {
                    category: "Major Learning Platforms",
                    items: [
                        {
                            name: "Duolingo Polish",
                            url: "https://www.duolingo.com/course/pl/en/Learn-Polish",
                            description: "Comprehensive gamified course with 43 units, 402 crowns total",
                            level: "A1-A2",
                            free: true,
                            features: ["Mobile app", "Spaced repetition", "Streak tracking", "Offline mode (premium)"]
                        },
                        {
                            name: "EU Online Language Support",
                            url: "https://academy.europa.eu/courses/discover-the-polish-language-with-online-language-support/view",
                            description: "EU's official platform with cultural content",
                            level: "A1-A2",
                            free: true,
                            features: ["29 language subtitles", "Placement test", "Certificates", "Cultural content"]
                        },
                        {
                            name: "Live Lingua FSI Polish",
                            url: "https://www.livelingua.com/project/fsi/Polish",
                            description: "Complete Foreign Service Institute materials",
                            level: "Comprehensive",
                            free: true,
                            features: ["No registration", "Audio recordings", "Government materials", "PDF downloads"]
                        },
                        {
                            name: "LingoHut",
                            url: "https://www.lingohut.com/en/l83/learn-polish",
                            description: "125+ lessons completely free, no registration needed",
                            level: "A1-B1",
                            free: true,
                            features: ["No registration", "125+ lessons", "Audio support", "Games included"]
                        },
                        {
                            name: "Alison Polish for Beginners",
                            url: "https://alison.com/course/polish-for-beginners",
                            description: "Comprehensive beginner course covering alphabet and grammar",
                            level: "A1",
                            free: true,
                            features: ["Certificate available", "Multimedia content", "Structured curriculum", "Assessment tests"]
                        },
                        {
                            name: "e-Polish.eu",
                            url: "https://e-polish.eu/",
                            description: "Specialized platform with teaching materials",
                            level: "Multiple levels",
                            free: true,
                            features: ["Teacher resources", "Student materials", "Interactive exercises", "Grammar guides"]
                        }
                    ]
                },
                {
                    category: "University Courses",
                    items: [
                        {
                            name: "University of Warsaw - Polonicum",
                            url: "https://en.uw.edu.pl/online-course-on-the-polish-language/",
                            description: "30-hour free courses by Centre of Polish Language and Culture",
                            level: "A1.3-C1.1",
                            free: true,
                            features: ["University certification", "Cultural activities", "Film screenings", "Professional instruction"]
                        },
                        {
                            name: "Jagiellonian University",
                            url: "https://en.uj.edu.pl/studying/around-poland-in-polish",
                            description: "Interactive course combining language with regional culture",
                            level: "Beginner-friendly",
                            free: true,
                            features: ["Virtual tour format", "Comic panels", "Audio recordings", "Cultural immersion"]
                        },
                        {
                            name: "SEA-EU Language Exchange",
                            url: "https://sea-eu.org/language-offers/",
                            description: "European university alliance Polish courses",
                            level: "Various",
                            free: true,
                            features: ["Virtual tandem", "Native speakers", "University support", "Cross-cultural exchange"]
                        }
                    ]
                },
                {
                    category: "Government Programs",
                    items: [
                        {
                            name: "NAWA Summer Courses",
                            url: "https://nawa.gov.pl/en/the-polish-language/nawa-summer-courses",
                            description: "Government-funded intensive courses - COMPLETELY FREE",
                            level: "A1-C2",
                            free: true,
                            features: ["Free accommodation", "Free meals", "2-4 weeks", "Materials included"]
                        },
                        {
                            name: "NAVOICA Platform",
                            url: "https://navoica.pl/",
                            description: "Government MOOCs for Polish",
                            level: "Various",
                            free: true,
                            features: ["3 specialized courses", "Certificates", "60% completion required", "Government-backed"]
                        },
                        {
                            name: "Office for Foreigners",
                            url: "https://www.gov.pl/web/udsc-en/teaching-materials-for-learning-polish",
                            description: "Integration materials for immigrants",
                            level: "A1-B2",
                            free: true,
                            features: ["Immigration focus", "Practical content", "Official materials", "Integration support"]
                        }
                    ]
                },
                {
                    category: "Open Educational Resources",
                    items: [
                        {
                            name: "Digital School Program",
                            url: "https://www.scholaris.pl/",
                            description: "World's first national open textbook initiative",
                            level: "K-12",
                            free: true,
                            features: ["60+ modular textbooks", "CC licensing", "€24M saved annually", "Government initiative"]
                        },
                        {
                            name: "Polish Wikibook",
                            url: "https://en.wikibooks.org/wiki/Polish",
                            description: "Free online Polish course",
                            level: "A1-A2",
                            free: true,
                            features: ["GNU License", "Community-edited", "Printable version", "Always updated"]
                        },
                        {
                            name: "OER Commons - Polish",
                            url: "https://oercommons.org/",
                            description: "Global OER repository with Polish materials",
                            level: "Various",
                            free: true,
                            features: ["Open licensing", "Remixable content", "Quality assured", "Searchable"]
                        }
                    ]
                }
            ],

            apps: [
                {
                    name: "Duolingo",
                    url: "https://www.duolingo.com/",
                    description: "Full course with ads, 43 units, 402 crowns",
                    level: "A1-A2",
                    free: true,
                    features: ["Mobile app", "Web version", "Stories feature", "Leagues system"]
                },
                {
                    name: "Clozemaster",
                    url: "https://www.clozemaster.com/",
                    description: "30 sentences/day free, 10,000+ sentences yearly",
                    level: "A2-C1",
                    free: true,
                    features: ["Context learning", "Spaced repetition", "Grammar challenges", "Progress tracking"]
                },
                {
                    name: "Memrise",
                    url: "https://www.memrise.com/",
                    description: "Basic vocabulary courses, Polish 1-7 series",
                    level: "A1-B2",
                    free: true,
                    features: ["Video clips", "Native speakers", "Offline mode", "Community courses"]
                },
                {
                    name: "Drops",
                    url: "https://languagedrops.com/",
                    description: "5 minutes daily free, 2,000+ words, 45+ topics",
                    level: "A1-B1",
                    free: true,
                    features: ["Visual learning", "5-min sessions", "Minimalist design", "Topic-based"]
                },
                {
                    name: "Anki",
                    url: "https://ankiweb.net/",
                    description: "Completely free flashcard system with Polish decks",
                    level: "A1-C2",
                    free: true,
                    features: ["Thousands of decks", "Custom cards", "Spaced repetition", "Cross-platform"]
                },
                {
                    name: "LingoHut",
                    url: "https://www.lingohut.com/",
                    description: "125+ lessons completely free, browser-based",
                    level: "A1-B1",
                    free: true,
                    features: ["No app needed", "No registration", "Games included", "Audio support"]
                }
            ],

            books: [
                {
                    category: "Digital Libraries",
                    items: [
                        {
                            name: "Polona.pl",
                            url: "https://polona.pl/",
                            description: "2+ million digitized objects, daily additions",
                            level: "All levels",
                            free: true,
                            features: ["English interface", "High-res downloads", "2,000 daily additions", "Historical materials"]
                        },
                        {
                            name: "Wolne Lektury",
                            url: "https://wolnelektury.pl/",
                            description: "6,714+ books, 1,000+ audiobooks",
                            level: "All levels",
                            free: true,
                            features: ["School readings", "Mobile apps", "API available", "Professional narration"]
                        },
                        {
                            name: "FBC Digital Libraries",
                            url: "https://fbc.pionier.net.pl/en",
                            description: "8+ million objects from 130+ institutions",
                            level: "All levels",
                            free: true,
                            features: ["Cross-library search", "Europeana integration", "Academic materials", "Regional collections"]
                        },
                        {
                            name: "Project Gutenberg Polish",
                            url: "https://www.gutenberg.org/browse/languages/pl",
                            description: "Extensive collection of Polish classics",
                            level: "All levels",
                            free: true,
                            features: ["Multiple formats", "Public domain", "Classic literature", "No registration"]
                        },
                        {
                            name: "Open Library Polish",
                            url: "https://openlibrary.org/languages/pol",
                            description: "5,149+ Polish works",
                            level: "All levels",
                            free: true,
                            features: ["Borrowable books", "Downloadable", "Search features", "User reviews"]
                        }
                    ]
                },
                {
                    category: "Textbooks and Grammar",
                    items: [
                        {
                            name: "Polish For Dummies",
                            url: "https://archive.org/details/polish-for-dummies_daria-gabryanczyk",
                            description: "Complete coursebook by Daria Gabryanczyk",
                            level: "Beginner",
                            free: true,
                            features: ["PDF/EPUB", "Complete course", "Audio files", "Practice exercises"]
                        },
                        {
                            name: "Elementary Polish Grammar",
                            url: "https://archive.org/details/elementarypolis00ssym",
                            description: "Classic grammar by Paul Ssymank (1884)",
                            level: "All levels",
                            free: true,
                            features: ["Public domain", "Historical approach", "Comprehensive rules", "Examples"]
                        },
                        {
                            name: "Practical Handbook of Polish",
                            url: "https://archive.org/details/practicalhandboo00balurich",
                            description: "288-page comprehensive handbook",
                            level: "All levels",
                            free: true,
                            features: ["Public domain", "Practical focus", "Complete grammar", "Usage examples"]
                        },
                        {
                            name: "Basic Polish: Grammar & Workbook",
                            url: "https://languageadvisor.net/",
                            description: "Grammar workbook by Dana Bielec",
                            level: "Beginner",
                            free: true,
                            features: ["PDF download", "Exercises", "Answer keys", "Progressive lessons"]
                        },
                        {
                            name: "Polish: Comprehensive Grammar",
                            url: "https://languageadvisor.net/",
                            description: "Systematic description by Iwona Sadowska",
                            level: "Intermediate-Advanced",
                            free: true,
                            features: ["Academic approach", "Complete reference", "Linguistic analysis", "Examples"]
                        }
                    ]
                },
                {
                    category: "Reading Materials",
                    items: [
                        {
                            name: "Lingua Polish Reading Texts",
                            url: "https://lingua.com/polish/reading/",
                            description: "Well-organized beginner reading texts",
                            level: "A1-B1",
                            free: true,
                            features: ["Graded texts", "Comprehension questions", "Audio support", "Topic-based"]
                        },
                        {
                            name: "Polski Daily PDF Exercises",
                            url: "https://polskidaily.eu/learn-polish-pdf/",
                            description: "Printable exercises with answer keys",
                            level: "Beginner-Intermediate",
                            free: true,
                            features: ["PDF downloads", "Answer keys", "Interactive exercises", "Daily practice"]
                        },
                        {
                            name: "Selected Polish Tales",
                            url: "https://www.gutenberg.org/",
                            description: "Gutenberg collection by various authors",
                            level: "Intermediate",
                            free: true,
                            features: ["Historical stories", "Classic authors", "Multiple formats", "Cultural insights"]
                        },
                        {
                            name: "Polish Fairy Tales",
                            url: "https://www.gutenberg.org/",
                            description: "A.J. Gliński collection of traditional folklore",
                            level: "Intermediate",
                            free: true,
                            features: ["Traditional folklore", "Cultural stories", "Illustrated versions", "Audio available"]
                        }
                    ]
                }
            ],

            audio: [
                {
                    category: "YouTube Channels",
                    items: [
                        {
                            name: "PolishPod101",
                            url: "https://www.youtube.com/channel/UC3b6n6hqQPXmSCin87BYxwg",
                            description: "235+ hours of content, 120K subscribers",
                            level: "A1-C2",
                            free: true,
                            features: ["Structured lessons", "All levels", "Regular uploads", "Subtitles"]
                        },
                        {
                            name: "Easy Polish",
                            url: "https://www.youtube.com/channel/UCPG9JpJITL7xETpVylMyrqA",
                            description: "Street interviews with dual subtitles, 73.4K subscribers",
                            level: "A1-A2",
                            free: true,
                            features: ["Street interviews", "Dual subtitles", "Real speech", "Cultural content"]
                        },
                        {
                            name: "Learn Polish with Monika",
                            url: "https://www.youtube.com/channel/UCxfpnfI-_43wmFyjgnKHVwQ",
                            description: "Pronunciation focus, 60.6K subscribers",
                            level: "A1-A2",
                            free: true,
                            features: ["Clear pronunciation", "Beginner-friendly", "Systematic approach", "Practice exercises"]
                        },
                        {
                            name: "MrRealPolish",
                            url: "https://www.youtube.com/channel/UC08Pyl-LVr2aKiREeY6zh-w",
                            description: "Grammar and culture, 26.1K subscribers",
                            level: "A2-B2",
                            free: true,
                            features: ["Grammar focus", "Cultural insights", "Real-life situations", "Practical Polish"]
                        },
                        {
                            name: "Polski z Anią",
                            url: "https://www.youtube.com/channel/UCOJ8InFS6bdCVzsZKIdmK4w",
                            description: "University professor instruction",
                            level: "A1-B2",
                            free: true,
                            features: ["Academic approach", "Structured lessons", "Clear explanations", "Professional teaching"]
                        }
                    ]
                },
                {
                    category: "Podcasts",
                    items: [
                        {
                            name: "Real Polish Podcast",
                            url: "https://realpolish.pl",
                            description: "500+ episodes, transcripts for premium members",
                            level: "A2-C1",
                            free: true,
                            features: ["500+ episodes", "Cultural topics", "Natural speech", "Transcripts available"]
                        },
                        {
                            name: "Learn Polish Podcast",
                            url: "https://learnpolishpodcast.com",
                            description: "400+ episodes with transcripts available",
                            level: "A1-B2",
                            free: true,
                            features: ["400+ episodes", "Transcripts", "Progressive difficulty", "Grammar explanations"]
                        },
                        {
                            name: "Polish with John",
                            url: "https://ioannesoculus.com",
                            description: "Short ~4 minute episodes",
                            level: "A2-B1",
                            free: true,
                            features: ["Bite-sized", "Daily vocabulary", "Clear speech", "Practical focus"]
                        },
                        {
                            name: "Super Easy Polish",
                            url: "https://easypolish.org/podcast",
                            description: "Bite-sized episodes for beginners",
                            level: "A1",
                            free: true,
                            features: ["Super slow speed", "Simple vocabulary", "Interactive membership", "Beginner-friendly"]
                        },
                        {
                            name: "Polski Daily Stories",
                            url: "https://polskidaily.eu",
                            description: "Story-based learning podcast",
                            level: "A2-B1",
                            free: true,
                            features: ["Story format", "Engaging content", "Membership option", "Regular episodes"]
                        },
                        {
                            name: "Swojski Język Polski",
                            url: "https://swojskijezykpolski.com",
                            description: "Various topics with free transcripts",
                            level: "A2-C1",
                            free: true,
                            features: ["Free transcripts", "Diverse topics", "Natural speech", "Cultural content"]
                        }
                    ]
                },
                {
                    category: "Public Media",
                    items: [
                        {
                            name: "TVP World",
                            url: "https://tvpworld.com/",
                            description: "English-language Polish content",
                            level: "B1-C2",
                            free: true,
                            features: ["International perspective", "News coverage", "Live streaming", "Archives"]
                        },
                        {
                            name: "Polskie Radio",
                            url: "https://www.polskieradio.pl/395,english-section",
                            description: "40+ digital channels with archives",
                            level: "B1-C2",
                            free: true,
                            features: ["40+ channels", "Live streaming", "Archived broadcasts", "Various genres"]
                        },
                        {
                            name: "Radio Poland",
                            url: "https://www.polskieradio.pl/",
                            description: "External service in multiple languages",
                            level: "B1-C2",
                            free: true,
                            features: ["24/7 English", "Polish lessons", "News programs", "Cultural shows"]
                        }
                    ]
                },
                {
                    category: "Audiobooks",
                    items: [
                        {
                            name: "Wolne Lektury Audiobooks",
                            url: "https://wolnelektury.pl/katalog/audiobooki/",
                            description: "1,000+ titles with professional narration by actors",
                            level: "B1-C2",
                            free: true,
                            features: ["Professional actors", "Classic literature", "Mobile apps", "Download option"]
                        },
                        {
                            name: "LibriVox Polish",
                            url: "https://librivox.org/",
                            description: "Public domain books read by volunteers",
                            level: "B2-C2",
                            free: true,
                            features: ["Volunteer readers", "Classic works", "Multiple formats", "No registration"]
                        },
                        {
                            name: "LoyalBooks Polish",
                            url: "https://www.loyalbooks.com/language/Polish",
                            description: "Free MP3 audiobooks",
                            level: "B1-C2",
                            free: true,
                            features: ["MP3 format", "Classic literature", "Direct download", "Various quality"]
                        }
                    ]
                }
            ],

            practice: [
                {
                    category: "Language Exchange",
                    items: [
                        {
                            name: "Tandem",
                            url: "https://tandem.net/language-exchange/poland",
                            description: "7,940 Polish speakers in Poland",
                            level: "All levels",
                            free: true,
                            features: ["Video calls", "Text chat", "Voice messages", "Profile verification"]
                        },
                        {
                            name: "HelloTalk",
                            url: "https://www.hellotalk.com/",
                            description: "Part of 30M+ user community",
                            level: "All levels",
                            free: true,
                            features: ["Voice messages", "Corrections", "Moments feed", "Translation tools"]
                        },
                        {
                            name: "r/learnpolish",
                            url: "https://reddit.com/r/learnpolish",
                            description: "Active Reddit community for Polish learners",
                            level: "All levels",
                            free: true,
                            features: ["Q&A threads", "Practice posts", "Resource sharing", "Native speakers"]
                        },
                        {
                            name: "MyLanguageExchange",
                            url: "https://www.mylanguageexchange.com/",
                            description: "Active Polish language exchange community",
                            level: "All levels",
                            free: true,
                            features: ["Email exchange", "Text chat", "Voice chat", "Lesson plans"]
                        },
                        {
                            name: "Language.Exchange",
                            url: "https://en.language.exchange/language/PL-Polish/",
                            description: "250 countries covered, interest-based matching",
                            level: "All levels",
                            free: true,
                            features: ["Interest matching", "Global reach", "Various formats", "Safe platform"]
                        },
                        {
                            name: "Learn Polish Discord",
                            url: "Discord community",
                            description: "Active Discord server with Polish classes and movie nights",
                            level: "All levels",
                            free: true,
                            features: ["Polish classes", "Movie nights", "Voice channels", "Daily chat"]
                        }
                    ]
                },
                {
                    category: "Language Tools",
                    items: [
                        {
                            name: "PONS Dictionary",
                            url: "https://en.pons.com/translate/polish-english",
                            description: "600,000+ words with audio",
                            level: "All levels",
                            free: true,
                            features: ["Virtual keyboards", "Mobile apps", "Audio pronunciation", "Example sentences"]
                        },
                        {
                            name: "Glosbe",
                            url: "https://glosbe.com/pl/en",
                            description: "Community-built dictionary with translation memory",
                            level: "All levels",
                            free: true,
                            features: ["Translation memory", "Offline packs", "Community input", "Context examples"]
                        },
                        {
                            name: "Cambridge Polish-English",
                            url: "https://dictionary.cambridge.org/us/dictionary/polish-english",
                            description: "88,000+ definitions with 30,000+ real examples",
                            level: "All levels",
                            free: true,
                            features: ["Real examples", "Audio support", "Grammar notes", "Usage guides"]
                        },
                        {
                            name: "Cooljugator",
                            url: "https://cooljugator.com/pl",
                            description: "Complete verb conjugation tool",
                            level: "All levels",
                            free: true,
                            features: ["All conjugations", "Search function", "Examples", "Mobile-friendly"]
                        },
                        {
                            name: "Bab.la Conjugator",
                            url: "https://en.bab.la/conjugation/polish/",
                            description: "Comprehensive conjugation system",
                            level: "All levels",
                            free: true,
                            features: ["All tenses", "Irregular verbs", "Examples", "Audio"]
                        },
                        {
                            name: "TastingPoland Verb Tables",
                            url: "https://www.tastingpoland.com/language/verb/",
                            description: "474 fully conjugated Polish verbs",
                            level: "All levels",
                            free: true,
                            features: ["474 verbs", "Complete tables", "Searchable", "Printable"]
                        },
                        {
                            name: "Forvo Polish",
                            url: "https://forvo.com/languages/pl/",
                            description: "Native speaker pronunciation database",
                            level: "All levels",
                            free: true,
                            features: ["Native speakers", "Multiple recordings", "Regional variants", "User ratings"]
                        },
                        {
                            name: "PolishCorrector",
                            url: "https://www.polishcorrector.com/",
                            description: "Free grammar checker",
                            level: "All levels",
                            free: true,
                            features: ["No registration", "Instant check", "Error explanations", "Suggestions"]
                        }
                    ]
                },
                {
                    category: "Games and Interactive",
                    items: [
                        {
                            name: "Digital Dialects Polish",
                            url: "https://www.digitaldialects.com/Polish.htm",
                            description: "Vocabulary games for Polish learners",
                            level: "A1-B1",
                            free: true,
                            features: ["Multiple games", "Audio support", "No registration", "Immediate feedback"]
                        },
                        {
                            name: "Polish Games on LingoHut",
                            url: "https://www.lingohut.com/",
                            description: "Interactive games integrated with lessons",
                            level: "A1-B1",
                            free: true,
                            features: ["Multiple game types", "Progress tracking", "Audio support", "No registration"]
                        }
                    ]
                },
                {
                    category: "Text-to-Speech",
                    items: [
                        {
                            name: "ttsMP3",
                            url: "https://ttsmp3.com/text-to-speech/Polish/",
                            description: "Free MP3 download with 3,000 character limit",
                            level: "All levels",
                            free: true,
                            features: ["MP3 download", "3,000 char limit", "Multiple voices", "No registration"]
                        },
                        {
                            name: "FreeTTS Polish",
                            url: "https://freetts.com/text-to-speech/PolishTTS",
                            description: "Completely free TTS service",
                            level: "All levels",
                            free: true,
                            features: ["Unlimited use", "Multiple voices", "Download option", "No registration"]
                        },
                        {
                            name: "Crikk TTS",
                            url: "https://crikk.com/text-to-speech/polish/",
                            description: "100% free, unlimited, no registration",
                            level: "All levels",
                            free: true,
                            features: ["Unlimited text", "No registration", "Download MP3", "Multiple voices"]
                        }
                    ]
                }
            ]
        }
    };

    // Register Polish data globally
    if (typeof languageData !== 'undefined') {
        languageData.polish = polishData;
    } else {
        global.languageData = { polish: polishData };
    }

})(window);