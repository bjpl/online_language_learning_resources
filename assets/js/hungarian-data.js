const hungarianResources = {
    name: "Hungarian",
    nativeName: "Magyar",
    flag: "🇭🇺",
    learners: "3M+",
    speakers: "13M native, 15M+ total (Hungary, Romania, Slovakia, Serbia, diaspora)",
    highlights: [
        "200+ free resources spanning FSI government courses, university materials, and extensive digital libraries",
        "MEK (Magyar Elektronikus Könyvtár): 11,000+ digital books, 220+ audiobooks, newspapers with full-text search",
        "FSI Hungarian Basic Course: Complete 2-volume professional course originally for diplomats with audio support and cultural notes",
        "Hungarian National Film Archive: 40+ classic films with English subtitles including literary adaptations",
        "HungarianPod101: Extensive audio/video lesson library with weekly updates for absolute beginner to advanced levels",
        "Strong institutional support from Balassi Institute (26 branches in 24 countries) and government scholarship programs"
    ],
    resources: {
        courses: [
            {
                category: "Online Courses and MOOCs",
                items: [
                    {
                        name: "Live Lingua FSI Hungarian",
                        url: "https://www.livelingua.com/project/fsi/Hungarian",
                        description: "Complete government-developed course originally for diplomats with downloadable materials, online recorder, no registration required for beginner to intermediate.",
                        free: true,
                        level: "Beginner to Intermediate"
                    },
                    {
                        name: "50languages/Goethe Verlag",
                        url: "https://www.50languages.com/hungarian-for-free",
                        description: "100 structured lessons with native speaker audio available as web course, mobile app, and downloadable MP3s for A1-A2 learners.",
                        free: true,
                        level: "A1-A2"
                    },
                    {
                        name: "Loecsen Hungarian",
                        url: "https://www.loecsen.com/en/learn-hungarian",
                        description: "Essential expressions for travelers and beginners with voice recognition technology and cultural context for A1 level.",
                        free: true,
                        level: "A1"
                    },
                    {
                        name: "HungarianPod101 Free Tier",
                        url: "https://www.hungarianpod101.com/welcome-to-free/",
                        description: "Extensive audio/video lesson library with 7-day trial and selected permanent free lessons for absolute beginner to advanced.",
                        free: true,
                        level: "Absolute Beginner to Advanced"
                    },
                    {
                        name: "Duolingo Hungarian",
                        url: "https://www.duolingo.com/course/hu/en/Learn-Hungarian",
                        description: "Gamified lessons with bite-sized exercises featuring completely free core access and speech recognition for beginner to intermediate.",
                        free: true,
                        level: "Beginner to Intermediate"
                    },
                    {
                        name: "Hungarotips",
                        url: "https://www.hungarotips.com/hungarian/",
                        description: "Comprehensive lessons with cultural content since 1997 including quizzes, audio files, and cultural information for beginner to advanced.",
                        free: true,
                        level: "Beginner to Advanced"
                    },
                    {
                        name: "Stipendium Hungaricum Online",
                        url: "https://stipendiumhungaricum.hu/practice-your-hungarian/",
                        description: "22-module online course for independent study with videos, quizzes, flashcards, and workplace scenarios for A1 level.",
                        free: true,
                        level: "A1"
                    }
                ]
            }
        ],
        books: [
            {
                category: "Textbooks, Grammar Guides and OER",
                items: [
                    {
                        name: "FSI Hungarian Basic Course",
                        url: "https://archive.org/details/Fsi-HungarianBasicCourse-StudentText",
                        description: "Complete 2-volume course with 24 units featuring audio support, pronunciation training, and cultural notes for A1-B1.",
                        free: true,
                        level: "A1-B1"
                    },
                    {
                        name: "Wikibooks Hungarian",
                        url: "https://en.wikibooks.org/wiki/Hungarian",
                        description: "Free collaborative online textbook that is community-maintained with multiple formats available for A1-B1.",
                        free: true,
                        level: "A1-B1"
                    },
                    {
                        name: "Hungarian Reference Grammar",
                        url: "http://www.hungarianreference.com/",
                        description: "Complete online grammar reference with systematic coverage and search functionality for B1-C2 learners.",
                        free: true,
                        level: "B1-C2"
                    },
                    {
                        name: "Complete Practical Grammar (1853)",
                        url: "https://archive.org/details/completepractica00csinuoft",
                        description: "Historical comprehensive grammar with 508 pages featuring exercises and literary selections for A2-C1.",
                        free: true,
                        level: "A2-C1"
                    },
                    {
                        name: "Simplified Grammar",
                        url: "https://archive.org/details/simplifiedgramma00singrich",
                        description: "Concise introduction to Hungarian with 88 pages using simplified approach for A1-A2.",
                        free: true,
                        level: "A1-A2"
                    },
                    {
                        name: "Vékey's Grammar (1889)",
                        url: "https://archive.org/details/grammarofhungari00vkey",
                        description: "Traditional grammar with poetry including vocabulary and poetry specimens for A2-B2.",
                        free: true,
                        level: "A2-B2"
                    },
                    {
                        name: "Wikipedia Hungarian Grammar",
                        url: "https://en.wikipedia.org/wiki/Hungarian_grammar",
                        description: "Comprehensive grammatical overview with academic reference quality for B1-C2 learners.",
                        free: true,
                        level: "B1-C2"
                    }
                ]
            },
            {
                category: "Digital Libraries and Reading Materials",
                items: [
                    {
                        name: "MEK (Hungarian Electronic Library)",
                        url: "https://mek.oszk.hu/indexeng.phtml",
                        description: "11,000+ books, 220+ audiobooks, newspapers with full-text search and multiple formats including MP3 audiobooks at all levels.",
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "Project Gutenberg Hungarian",
                        url: "https://www.gutenberg.org/browse/languages/hu",
                        description: "200+ Hungarian classic works with multiple download formats that are public domain for intermediate-advanced learners.",
                        free: true,
                        level: "Intermediate-Advanced"
                    },
                    {
                        name: "Digitális Irodalmi Akadémia",
                        url: "https://dia.hu",
                        description: "Contemporary Hungarian literature with 78+ authors featuring full-text search, manuscripts, and audio recordings for intermediate-advanced.",
                        free: true,
                        level: "Intermediate-Advanced"
                    },
                    {
                        name: "National Széchényi Library",
                        url: "https://oszk.hu/en/digital_library",
                        description: "Historical documents, manuscripts, maps with copyright-compliant access and multilingual materials at all levels.",
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "Easy Hungarian Magazine",
                        url: "https://www.easyhungarian.com/",
                        description: "Magazine articles rewritten for learners with audio files, online exercises, and vocabulary lists for B1 level.",
                        free: true,
                        level: "B1"
                    },
                    {
                        name: "FSI Graded Reader",
                        url: "https://www.livelingua.com/course/fsi/hungarian_-_graded_reader",
                        description: "56 reading selections with audio featuring progressive difficulty and pronunciation tools for beginner-intermediate.",
                        free: true,
                        level: "Beginner-Intermediate"
                    },
                    {
                        name: "Hungarian Kati News",
                        url: "https://www.hungariankati.com/",
                        description: "Simplified news at multiple levels with vocabulary lists, audio exercises, and comprehension questions for beginner-intermediate.",
                        free: true,
                        level: "Beginner-Intermediate"
                    },
                    {
                        name: "Farkas Translations",
                        url: "https://farkastranslations.com/bilingual_books.php",
                        description: "Bilingual parallel texts with sentence-aligned texts and e-book generator at all levels.",
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "Hungaricana",
                        url: "https://hungaricana.hu/",
                        description: "Comprehensive Hungarian cultural database with historical materials and cultural resources at all levels.",
                        free: true,
                        level: "All Levels"
                    }
                ]
            }
        ],
        audio: [
            {
                category: "Audio and Video Resources",
                items: [
                    {
                        name: "HungarianPod101 YouTube",
                        url: "https://www.youtube.com/user/HungarianPod101/videos",
                        description: "Structured lessons, vocabulary, grammar with weekly updates featuring under 10-minute videos for beginner-advanced learners.",
                        free: true,
                        level: "Beginner-Advanced"
                    },
                    {
                        name: "Hungarian Lesson with Zsuzsi",
                        url: "https://www.youtube.com/channel/UCRoQDAv2nDyCejTOuS9RbKg",
                        description: "Basic Hungarian lessons with clear explanations and structured approach for beginner-intermediate.",
                        free: true,
                        level: "Beginner-Intermediate"
                    },
                    {
                        name: "Hungarian National Film Archive",
                        url: "https://filmarchiv.hu/en/news/hungarian-classics-free-to-watch",
                        description: "40+ classic films with English subtitles including literary adaptations and historical films for intermediate-advanced learners.",
                        free: true,
                        level: "Intermediate-Advanced"
                    },
                    {
                        name: "HungarianPod101 Podcast",
                        url: "https://podcasts.apple.com/us/podcast/learn-hungarian-hungarianpod101-com/id448503629",
                        description: "Comprehensive audio lessons with PDF transcripts, mobile app, and offline downloads at all levels.",
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "Let's Learn Hungarian!",
                        url: "https://podcasts.apple.com/us/podcast/lets-learn-hungarian/id271212839",
                        description: "Basic Hungarian with native speaker featuring 20 lessons with transcripts available for beginners.",
                        free: true,
                        level: "Beginner"
                    },
                    {
                        name: "Hungarian with Sziszi",
                        url: "https://www.hungarianwithsziszi.com/podcast",
                        description: "Natural speech patterns and colloquial language with PDF transcripts and vocabulary lists for A2-B2.",
                        free: true,
                        level: "A2-B2"
                    },
                    {
                        name: "LibriVox Hungarian",
                        url: "https://librivox.org/",
                        description: "Public domain Hungarian audiobooks with 20,648+ titles featuring free download and streaming apps at all levels.",
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "Hungarian Audiobooks App",
                        url: "https://play.google.com/store/apps/details?id=com.murati.oszk.audiobook",
                        description: "Hundreds of Hungarian classics with offline listening and Chromecast support for intermediate-advanced.",
                        free: true,
                        level: "Intermediate-Advanced"
                    }
                ]
            }
        ],
        apps: [
            {
                category: "Apps and Software",
                items: [
                    {
                        name: "Duolingo Hungarian Course",
                        url: "https://www.duolingo.com/course/hu/en/Learn-Hungarian",
                        description: "Gamified Hungarian course with 4 units and 78 topics including definite/indefinite conjugation practice for beginner-intermediate.",
                        free: true,
                        level: "Beginner-Intermediate"
                    },
                    {
                        name: "Drops Hungarian",
                        url: "https://apps.apple.com/us/app/learn-hungarian-language-fast/id1227950613",
                        description: "Visual vocabulary learning with 5-minute daily sessions and word-image associations for beginner-intermediate.",
                        free: true,
                        level: "Beginner-Intermediate"
                    },
                    {
                        name: "Simply Learn Hungarian",
                        url: "https://play.google.com/store/apps/details?id=simply.learn.hungarian",
                        description: "300+ phrases with native audio featuring spaced repetition and quiz system for beginners.",
                        free: true,
                        level: "Beginner"
                    },
                    {
                        name: "Language Reactor",
                        url: "https://www.languagereactor.com/",
                        description: "Browser extension for Netflix/YouTube with dual subtitles, popup dictionary, and vocabulary saving at all levels.",
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "Toucan Extension",
                        url: "https://jointoucan.com/",
                        description: "Translates words while browsing for passive exposure to Hungarian vocabulary at all levels.",
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "Cooljugator",
                        url: "https://cooljugator.com/hu",
                        description: "Hungarian verb conjugator that handles definite/indefinite conjugations with examples at all levels.",
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "Verbix",
                        url: "https://www.verbix.com/languages/hungarian",
                        description: "Online verb conjugation covering 23 irregular verbs and verb particles at all levels.",
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "Digital Dialects Games",
                        url: "https://www.digitaldialects.com/Hungarian.htm",
                        description: "Interactive games and flashcards with audio practice quizzes and vocabulary games for beginners.",
                        free: true,
                        level: "Beginner"
                    },
                    {
                        name: "Anki Hungarian Decks",
                        url: "https://ankiweb.net/shared/info/1298664319",
                        description: "Top 2000 Hungarian words deck with spaced repetition and customizable flashcards at all levels.",
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "FunEasyLearn Hungarian",
                        url: "https://www.funeasylearn.com/learn-hungarian",
                        description: "30 games with 15,000 words across 350 topic categories featuring hand-drawn illustrations for beginner-advanced.",
                        free: true,
                        level: "Beginner-Advanced"
                    }
                ]
            },
            {
                category: "Dictionaries and Language Tools",
                items: [
                    {
                        name: "SZTAKI Szótár",
                        url: "https://szotar.sztaki.hu/en",
                        description: "Multilingual Hungarian dictionary with 93,206 words and 208,926 translations, community-driven at all levels.",
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "DictZone",
                        url: "https://dictzone.com/english-hungarian-dictionary/",
                        description: "English-Hungarian dictionary with 500,000+ meaning pairs featuring audio pronunciation and IPA at all levels.",
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "Szotar.net",
                        url: "https://www.szotar.net/",
                        description: "Professional dictionary collection with 15 languages, 40+ dictionaries, and 2M+ entries at all levels.",
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "Magyar Értelmező Szótár",
                        url: "https://mek.oszk.hu/adatbazis/magyar-nyelv-ertelmezo-szotara/",
                        description: "Monolingual explanatory dictionary with 60,000+ headwords and comprehensive definitions for advanced learners.",
                        free: true,
                        level: "Advanced"
                    },
                    {
                        name: "Forvo Hungarian",
                        url: "https://forvo.com/languages/hu/",
                        description: "Pronunciation dictionary with native speaker recordings that are crowd-sourced at all levels.",
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "HungarianReference.com",
                        url: "http://www.hungarianreference.com/",
                        description: "Complete grammar reference written for English speakers with conjugation tables for B1-C2.",
                        free: true,
                        level: "B1-C2"
                    },
                    {
                        name: "Hungarian National Corpus",
                        url: "http://corpus.nytud.hu/mnsz/index_eng.html",
                        description: "Linguistic corpus with 180+ million words and free query system for academic purposes.",
                        free: true,
                        level: "Academic"
                    },
                    {
                        name: "Sketch Engine Hungarian",
                        url: "https://www.sketchengine.eu/corpora-and-languages/hungarian-text-corpora/",
                        description: "Corpus analysis tools with 3.4B words featuring collocations and terminology extraction for academic use.",
                        free: true,
                        level: "Academic"
                    },
                    {
                        name: "Wiktionary Hungarian",
                        url: "https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Hungarian_wordlist",
                        description: "Frequency lists with 5,000 most common words based on subtitles at all levels.",
                        free: true,
                        level: "All Levels"
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
                        description: "Global language exchange app with translation tools, grammar correction, and voice-to-text at all levels.",
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "Tandem Budapest",
                        url: "https://tandem.net/language-exchange/hungary/budapest",
                        description: "1,217+ members in Budapest with in-app correction and location-based search at all levels.",
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "ConversationExchange",
                        url: "https://www.conversationexchange.com/s_map/learn.php?language=Hungarian",
                        description: "Face-to-face and online exchange with three exchange types and profile matching at all levels.",
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "Speaky",
                        url: "https://www.speaky.com/",
                        description: "5+ million language learners with virtual events and cultural exchange focus at all levels.",
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "MyLanguageExchange",
                        url: "https://www.mylanguageexchange.com/Search.asp?selX3=27",
                        description: "Email and chat exchange with structured learning guidelines at all levels.",
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "r/hungarian Reddit",
                        url: "https://reddit.com/r/hungarian",
                        description: "Main Hungarian learning subreddit with native speaker participation and resource sharing at all levels.",
                        free: true,
                        level: "All Levels"
                    },
                    {
                        name: "InterPals",
                        url: "https://www.interpals.net/app/langex",
                        description: "54,195+ Hungarian speakers for cultural exchange and travel connections at all levels.",
                        free: true,
                        level: "All Levels"
                    }
                ]
            },
            {
                category: "Government and Regional Programs",
                items: [
                    {
                        name: "Balassi Institute Budapest",
                        url: "https://balassieducation.hu/en/hungarian-language-courses/",
                        description: "Free language courses in Budapest with morning/evening classes and ECL exam preparation for beginner-advanced.",
                        free: true,
                        level: "Beginner-Advanced"
                    },
                    {
                        name: "Stipendium Hungaricum",
                        url: "https://stipendiumhungaricum.hu/practice-your-hungarian/",
                        description: "Online course plus mandatory university programs with 22 modules online and 2-semester mandatory courses for A1-C2.",
                        free: true,
                        level: "A1-C2"
                    },
                    {
                        name: "Erasmus+ Programs",
                        url: "https://erasmus-plus.ec.europa.eu/",
                        description: "Student exchange with language support featuring €26.2 billion budget 2021-2027 at university level.",
                        free: true,
                        level: "University Level"
                    },
                    {
                        name: "Balassi Institute Global",
                        url: "https://balassi.hu/",
                        description: "26 branches in 24 countries with cultural centers and scholarship programs at all levels.",
                        free: true,
                        level: "All Levels"
                    }
                ]
            }
        ]
    }
};

if (typeof languageData !== 'undefined') {
    languageData.hungarian = hungarianResources;
}