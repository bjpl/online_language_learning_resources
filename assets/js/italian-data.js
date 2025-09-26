// ===================================
// Italian Language Resources Data
// ===================================

// Add Italian to the global languageData object
if (typeof languageData === 'undefined') {
    window.languageData = {};
}

languageData.italian = {
    name: "Italian",
    nativeName: "Italiano",
    flag: "🇮🇹",
    code: "it",
    description: "The beautiful language of Italy, spoken by over 85 million people worldwide. Known for its musicality, rich cultural heritage, and connection to art, cuisine, and classical history.",
    speakers: "85 million native speakers",
    countries: ["Italy", "San Marino", "Vatican City", "Switzerland", "Slovenia", "Croatia"],
    difficulty: "Easy for English speakers",

    resources: {
        courses: [
            {
                category: "Complete Courses",
                items: [
                    {
                        name: "edX - WellesleyX Italian Series",
                        url: "https://www.edx.org/learn/italian/wellesley-college-italian-language-and-culture-beginner-2025-2026",
                        description: "Comprehensive Italian courses from Wellesley College with videos, podcasts, and cultural readings",
                        free: true,
                        level: "A1-B2",
                        features: ["12 weeks free access", "Mobile app", "Downloadable podcasts", "Grammar charts with audio"]
                    },
                    {
                        name: "MIT OpenCourseWare",
                        url: "https://ocw.mit.edu/courses/es-s41-speak-italian-with-your-mouth-full-spring-2012/",
                        description: "Unique course combining Italian language with Mediterranean cooking",
                        free: true,
                        level: "A1-A2",
                        features: ["Completely free", "Lecture videos", "Cultural integration through cooking"]
                    },
                    {
                        name: "FutureLearn Italian Series",
                        url: "https://www.futurelearn.com/courses/italian-for-beginners-1",
                        description: "Six-course series from The Open University covering basics to travel Italian",
                        free: true,
                        level: "A1-A2",
                        features: ["Free core content", "4-week structured courses", "Audio resources"]
                    },
                    {
                        name: "Language Transfer Italian",
                        url: "https://www.languagetransfer.org",
                        description: "Audio-based course focusing on thinking through language",
                        free: true,
                        level: "A1-A2",
                        features: ["Completely free", "No registration", "Unique teaching methodology"]
                    },
                    {
                        name: "The Italian Experiment",
                        url: "https://www.theitalianexperiment.com/",
                        description: "Free resource with grammar lessons and children's stories",
                        free: true,
                        level: "A1-B1",
                        features: ["Native speaker audio", "Cultural content", "Completely free"]
                    },
                ]
            },
            {
                category: "Open Educational Resources",
                items: [
                    {
                        name: "EU Academy - Learn Italian with OLS",
                        url: "https://academy.europa.eu/courses/learn-italian-with-ols/view/",
                        description: "EU-funded platform with videos and interactive modules",
                        free: true,
                        level: "A1-C2",
                        features: ["Free tutorial materials", "Available in 5 languages", "Real-life scenarios"]
                    },
                    {
                        name: "OER Commons Italian",
                        url: "https://oercommons.org/browse?f.keyword=italian",
                        description: "Comprehensive collection of open Italian resources",
                        free: true,
                        level: "A1-C2",
                        features: ["Spunti series", "D'accordo textbook", "Multiple CC licenses"]
                    },
                    {
                        name: "MERLOT Italian Collection",
                        url: "https://www.merlot.org/merlot/WorldLanguages.htm",
                        description: "Peer-reviewed Italian learning materials",
                        free: true,
                        level: "A1-C1",
                        features: ["Open textbooks", "Videos and quizzes", "Peer-reviewed by scholars"]
                    },
                    {
                        name: "COERLL Italian Materials",
                        url: "https://coerll.utexas.edu/coerll/materials/language/italian/",
                        description: "University of Texas resources including podcasts",
                        free: true,
                        level: "B1-C1",
                        features: ["Radio Arlecchino series", "Commedia dell'arte integration"]
                    },
                ]
            },
            {
                category: "Government Resources",
                items: [
                    {
                        name: "RAI Educational",
                        url: "https://www.italiano.rai.it",
                        description: "Courses for foreign learners from Italian public broadcaster",
                        free: true,
                        level: "A1-B2",
                        features: ["Two main sections", "Government-sponsored", "Professional quality"]
                    },
                    {
                        name: "Study in Italy Portal",
                        url: "https://studyinitaly.esteri.it/",
                        description: "Ministry of University and Research portal",
                        free: true,
                        level: "Various",
                        features: ["Official pathways", "Higher education focus", "Language requirements"]
                    }
                ]
            }
        ],

        apps: [
            {
                name: "Duolingo Italian",
                url: "https://www.duolingo.com/course/it/en/Learn-Italian",
                description: "Gamified language platform with 51 units covering comprehensive Italian",
                free: true,
                level: "A1-B2",
                features: ["100% free core content", "Mobile offline mode", "Speech recognition", "Stories feature"]
            },
            {
                name: "Anki",
                url: "https://apps.ankiweb.net",
                description: "Open source spaced repetition flashcards",
                free: true,
                level: "A1-C2",
                features: ["Customizable", "Sync across devices", "Extensive Italian decks"]
            },
            {
                name: "HelloTalk",
                url: "https://www.hellotalk.com",
                description: "Language exchange with native speakers",
                free: true,
                level: "A1-C2",
                features: ["Chat and voice calls", "Correction tools", "Moments feature"]
            },
            {
                name: "Language Reactor",
                url: "https://www.languagereactor.com",
                description: "Dual subtitles for Netflix/YouTube",
                free: true,
                level: "A1-C2",
                features: ["Popup dictionary", "Precise playback control", "Chrome extension"]
            },
            {
                name: "Toucan",
                url: "https://jointoucan.com",
                description: "Replaces words on websites with Italian",
                free: true,
                level: "A1-B2",
                features: ["Passive learning", "Progress tracking", "Browser integration"]
            },
            {
                name: "Memrise Italian",
                url: "https://www.memrise.com",
                description: "AI-powered platform with native videos",
                free: true,
                level: "A1-C2",
                features: ["Learn with Locals videos", "Scenario-based", "Spaced repetition"]
            },
            {
                name: "Busuu Italian",
                url: "https://www.busuu.com",
                description: "Structured course with community feedback",
                free: true,
                level: "A1-B2",
                features: ["120 million native speakers", "Speech recognition", "Community feedback"]
            },
            {
                name: "15000 Italian Sentences (Anki)",
                url: "https://ankiweb.net/shared/info/1713927804",
                description: "Large Anki deck sorted by difficulty",
                free: true,
                level: "A1-C1",
                features: ["Progressive difficulty", "Context-based learning", "15000 sentences"]
            },
            {
                name: "OpenTeacher",
                url: "https://openteacher.org",
                description: "Open source vocabulary trainer",
                free: true,
                level: "A1-B2",
                features: ["Multiple question types", "Portable", "Progress tracking"]
            },
            {
                name: "WordReference Dictionary App",
                url: "https://www.wordreference.com",
                description: "Comprehensive Italian-English dictionary",
                free: true,
                level: "All levels",
                features: ["200,000 translations", "Audio pronunciations", "User forums", "Mobile apps"]
            },
            {
                name: "LanguageTool",
                url: "https://languagetool.org",
                description: "Grammar and spell checker for Italian",
                free: true,
                level: "All levels",
                features: ["Browser extensions", "API access", "Style suggestions"]
            }
        ],

        books: [
            {
                category: "Free Textbooks",
                items: [
                    {
                        name: "Italian with Elisa (2015)",
                        url: "https://pdf.flyingpublisher.com/ItalianWithElisa2015.pdf",
                        description: "Complete 215+ page multimedia course with story-based learning",
                        free: true,
                        level: "A1-B2",
                        features: ["Free PDF download", "Audio at 4Elisa.com", "Cooking recipes integrated"]
                    },
                    {
                        name: "Piacere! Elementary Italian",
                        url: "https://open.umn.edu/opentextbooks/textbooks/piacere-elementary-italian-at-the-university-of-iowa",
                        description: "University of Iowa open textbook with 21 thematic units",
                        free: true,
                        level: "A1-A2",
                        features: ["CC BY-NC-SA license", "Flexible e-textbook", "Cultural content"]
                    },
                    {
                        name: "D'accordo! Intermediate Italian",
                        url: "https://open.umn.edu/opentextbooks/textbooks/d-accordo-subtitle-intermediate-italian-at-the-university-of-iowa",
                        description: "Comprehensive intermediate textbook",
                        free: true,
                        level: "B1-B2",
                        features: ["Four main grammar sections", "Cultural modules", "Bridge to advanced"]
                    },
                    {
                        name: "Spunti: Italiano elementare 1",
                        url: "https://open.umn.edu/opentextbooks/textbooks/806",
                        description: "Muhlenberg College elementary program",
                        free: true,
                        level: "A1",
                        features: ["Interactive exercises", "Printable activity packets", "Complete lesson plans"]
                    },
                    {
                        name: "Spunti: Italiano intermedio",
                        url: "https://open.umn.edu/opentextbooks/textbooks/spunti-italiano-intermedio",
                        description: "Intermediate Italian program",
                        free: true,
                        level: "B1-B2",
                        features: ["Songs and videos", "14-15 week structure", "Canvas Commons"]
                    },
                    {
                        name: "Basic Italian: A Grammar and Workbook",
                        url: "https://svmilanovn.files.wordpress.com/2017/12/08-basic-italian-a-grammar-and-workbook.pdf",
                        description: "Complete grammar with exercises",
                        free: true,
                        level: "A1-A2",
                        features: ["PDF download", "Systematic explanations", "Workbook format"]
                    },
                    {
                        name: "Italian Wikibooks Course",
                        url: "https://en.wikibooks.org/wiki/Italian",
                        description: "Collaborative complete Italian course",
                        free: true,
                        level: "A1-C2",
                        features: ["Free collaborative content", "Printable", "Continuously updated"]
                    },
                ]
            },
            {
                category: "Literature & Reading",
                items: [
                    {
                        name: "Project Gutenberg Italian",
                        url: "https://www.gutenberg.org/browse/languages/it",
                        description: "1,000+ classic Italian texts",
                        free: true,
                        level: "C1-C2",
                        features: ["Major Italian authors", "Multiple formats", "EPUB, PDF, Kindle"]
                    },
                    {
                        name: "Internet Culturale",
                        url: "https://www.internetculturale.it/",
                        description: "Official Italian digital library portal",
                        free: true,
                        level: "All levels",
                        features: ["20+ million data points", "Advanced search", "Multimedia resources"]
                    },
                    {
                        name: "Lingua.com Italian Reading",
                        url: "https://lingua.com/italian/reading/",
                        description: "Purpose-built reading exercises",
                        free: true,
                        level: "A1-B2",
                        features: ["Comprehension questions", "PDF downloads", "Level-marked"]
                    },
                    {
                        name: "Learn Italian Online Stories",
                        url: "https://learn-italian-online.net/resources/italian-short-stories.html",
                        description: "50+ adapted Italian stories",
                        free: true,
                        level: "A1-C1",
                        features: ["CEFR tagged", "Glossaries", "Some with audio"]
                    },
                    {
                        name: "Portalebambini.it",
                        url: "https://portalebambini.it/storie/",
                        description: "Children's stories and fairy tales",
                        free: true,
                        level: "A1-A2",
                        features: ["Simple Italian", "Audio versions", "PDF downloads"]
                    },
                    {
                        name: "Ti Racconto Una Fiaba",
                        url: "https://www.tiraccontounafiaba.it/",
                        description: "Large collection of fairy tales",
                        free: true,
                        level: "A1-B1",
                        features: ["Traditional Italian tales", "User contributions", "Simple language"]
                    },
                    {
                        name: "Poetry in Translation",
                        url: "https://www.poetryintranslation.com/PITBR/Italian/Italianpoetry.php",
                        description: "Italian poetry 1200-1600",
                        free: true,
                        level: "B2-C2",
                        features: ["Bilingual format", "Historical coverage", "Major poets"]
                    }
                ]
            }
        ],

        audio: [
            {
                category: "Podcasts",
                items: [
                    {
                        name: "Italy Made Easy Podcast",
                        url: "https://www.italymadeeasy.com/podcast",
                        description: "100% Italian content with slower speech",
                        free: true,
                        level: "A2-B2",
                        features: ["Free PDF transcripts", "Comprehension exercises", "Slow Italian"]
                    },
                ]
            },
            {
                category: "YouTube Channels",
                items: [
                    {
                        name: "Learn Italian with Lucrezia",
                        url: "https://www.youtube.com/@lucreziaoddone",
                        description: "Native Roman teacher's extensive video library",
                        free: true,
                        level: "A1-C2",
                        features: ["Italian subtitles", "Vlogs", "Cooking videos", "Cultural content"]
                    },
                    {
                        name: "Italy Made Easy",
                        url: "https://www.youtube.com/@italymadeeasy",
                        description: "English explanations of Italian grammar",
                        free: true,
                        level: "A1-B1",
                        features: ["Slow Italian videos", "PDF resources", "Beginner-focused"]
                    },
                    {
                        name: "Easy Italian",
                        url: "https://www.youtube.com/@EasyItalian",
                        description: "Street interviews with native speakers",
                        free: true,
                        level: "A2-C1",
                        features: ["Captions and translations", "Authentic conversations", "Real Italian"]
                    },
                    {
                        name: "ItalianPod101",
                        url: "https://www.youtube.com/@ItalianPod101",
                        description: "Structured lessons for all levels",
                        free: true,
                        level: "A1-C2",
                        features: ["Lesson notes", "Vocabulary lists", "Progressive curriculum"]
                    },
                    {
                        name: "Italiano Automatico",
                        url: "https://www.youtube.com/@italianoautomatico",
                        description: "Slow Italian about culture and events",
                        free: true,
                        level: "A2-B2",
                        features: ["Clear pronunciation", "Cultural content", "Listening focus"]
                    }
                ]
            },
            {
                category: "TV & Radio",
                items: [
                    {
                        name: "RaiPlay",
                        url: "https://www.raiplay.it",
                        description: "On-demand Italian TV streaming",
                        free: true,
                        level: "B1-C2",
                        features: ["Authentic media", "Current programs", "Cultural content"]
                    },
                    {
                        name: "La Repubblica",
                        url: "https://www.repubblica.it/",
                        description: "Major Italian newspaper",
                        free: true,
                        level: "B1-C2",
                        features: ["Current events", "Authentic Italian", "Various sections"]
                    }
                ]
            }
        ],

        practice: [
            {
                category: "Language Exchange",
                items: [
                    {
                        name: "MyLanguageExchange",
                        url: "https://www.mylanguageexchange.com",
                        description: "Safe effective practice community",
                        free: true,
                        level: "All levels",
                        features: ["Lesson plans", "Structured activities", "Safety focus"]
                    },
                ]
            },
            {
                category: "Language Tools",
                items: [
                    {
                        name: "PAISÀ Corpus",
                        url: "https://www.corpusitaliano.it/en/",
                        description: "250 million word Italian corpus",
                        free: true,
                        level: "B1-C2",
                        features: ["Fully annotated", "Lemmatized", "Creative Commons texts"]
                    }
                ]
            },
            {
                category: "Text-to-Speech Tools",
                items: [
                    {
                        name: "ElevenLabs Italian TTS",
                        url: "https://elevenlabs.io/text-to-speech/italian",
                        description: "AI-powered text-to-speech",
                        free: true,
                        level: "All levels",
                        features: ["10,000 free characters monthly", "Regional dialects", "High quality"]
                    },
                    {
                        name: "Crikk Italian TTS",
                        url: "https://crikk.com/text-to-speech/italian/",
                        description: "Free unlimited text-to-speech",
                        free: true,
                        level: "All levels",
                        features: ["No registration", "MP3 downloads", "Male/female voices"]
                    },
                ]
            }
        ]
    },

    quickStats: {
        totalResources: 100,
        freeResources: 100,
        categories: 5,
        averageRating: 4.7
    }
};