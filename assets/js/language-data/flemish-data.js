const flemishResources = {
    name: "Flemish",
    nativeName: "Vlaams",
    flag: "🇧🇪",
    learners: "500K+",
    speakers: "6.5M native (Flanders region of Belgium)",
    highlights: [
        "Complete free resources specifically for Flemish (Belgian Dutch) rather than general Dutch",
        "NedBox: KU Leuven's platform with 500+ exercises using TV fragments and newspaper articles",
        "Goesting in Taal: Specialized platform teaching informal Flemish (tussentaal)",
        "Het Vlaams Woordenboek: 38,224+ Flemish-specific terms with user voting and media examples",
        "VRT MAX: Complete free streaming platform with all Flemish public broadcaster content",
        "Government support from Flanders with VDAB offering 300+ free courses and Agentschap Integratie"
    ],
    resources: {
        courses: [
            {
                category: "Online Courses and Learning Platforms",
                items: [
                    {
                        name: "Goesting in Taal",
                        url: "https://www.goestingintaal.be/nl/",
                        features: ["Teaches informal Flemish tussentaal", "Free 10-lesson email course", "Audio fragments included", "B1+ intermediate level focus"],
                        free: true,
                        level: "B1+ (Intermediate)"
                    },
                    {
                        name: "NedBox",
                        url: "https://www.nedbox.be/",
                        features: ["KU Leuven's interactive platform", "500+ exercises available", "TV fragments and articles", "Mobile app included", "No registration required"],
                        free: true,
                        level: "A1 to B1+"
                    },
                    {
                        name: "NedBox Alfa",
                        url: "https://www.nedbox.be/",
                        features: ["Special NedBox version", "Low-literate learner focus", "Adapted literacy exercises", "Beginner-friendly content"],
                        free: true,
                        level: "Beginner"
                    },
                    {
                        name: "VDAB Online Learning",
                        url: "https://www.vdab.be/opleidingen/onlineleren",
                        features: ["Flemish government employment agency", "300+ free courses", "Grammar and vocabulary", "Professional Dutch included"],
                        free: true,
                        level: "A1 to B1+"
                    },
                    {
                        name: "Agentschap Integratie en Inburgering",
                        url: "https://www.integratie-inburgering.be/en",
                        features: ["Official government language guidance", "Free consultation services", "Placement and testing", "All proficiency levels"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Ik spreek Vlaams (Podcast Course)",
                        url: "https://podcasts.apple.com/us/podcast/ik-spreek-vlaams/id1479304922",
                        features: ["Beginner-friendly podcast series", "10 episodes covering basics", "Available on all platforms", "A1-A2 level focus"],
                        free: true,
                        level: "A1 to A2"
                    }
                ]
            },
            {
                category: "Government and Institutional Resources",
                items: [
                    {
                        name: "CVO Centers (Adult Education)",
                        url: "https://www.vlaanderen.be/",
                        features: ["Adult education centers", "Face-to-face and online", "Blended course options", "Regional accessibility"],
                        free: false,
                        level: "All levels"
                    },
                    {
                        name: "University Language Centers",
                        url: "https://www.ugent.be/",
                        features: ["Academic Dutch courses", "Three major universities", "A1-C1 proficiency levels", "Free library resources"],
                        free: false,
                        level: "A1 to C1"
                    },
                    {
                        name: "meemoo - Flemish Audiovisual Archive",
                        url: "https://meemoo.be/en",
                        features: ["Flemish audiovisual heritage archive", "Educational materials for teachers", "Various proficiency levels", "Cultural heritage focus"],
                        free: true,
                        level: "Various"
                    }
                ]
            }
        ],
        books: [
            {
                category: "Educational Resources and Textbooks",
                items: [
                    {
                        name: "KlasCement",
                        url: "https://www.klascement.net/",
                        features: ["Official educational resources network", "20,000+ active members", "Free lesson materials", "Presentations and exercises"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Onderwijs Vlaanderen",
                        url: "https://onderwijs.vlaanderen.be/",
                        features: ["Ministry of Education resources", "Het Archief voor Onderwijs", "Thousands of audio/video", "Various proficiency levels"],
                        free: true,
                        level: "Various"
                    },
                    {
                        name: "Wikibooks Dutch/Flemish Lesson",
                        url: "https://en.wikibooks.org/wiki/Dutch/Lesson_Flemish",
                        features: ["Flemish vs Standard Dutch", "Pronunciation guides included", "Grammar differences explained", "Creative Commons license"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "DBNL (Digital Library for Dutch Literature)",
                        url: "https://www.dbnl.org",
                        features: ["Digital literature library", "Historical texts included", "Academic journals available", "Literary criticism resources"],
                        free: true,
                        level: "Advanced"
                    },
                    {
                        name: "Flandrica.be",
                        url: "http://flandrica.be",
                        features: ["Digital heritage library portal", "Medieval manuscripts included", "Historical books collection", "Literary works archive"],
                        free: true,
                        level: "Intermediate to Advanced"
                    }
                ]
            },
            {
                category: "Literature and Cultural Materials",
                items: [
                    {
                        name: "BelgicaPress",
                        url: "https://www.belgicapress.be/?lang=NL",
                        features: ["Historical Belgian newspapers", "1830-1970 time period", "Full-text OCR searchable", "Completely free access"],
                        free: true,
                        level: "Intermediate to Advanced"
                    },
                    {
                        name: "Letterenhuis",
                        url: "https://letterenhuis.be/en",
                        features: ["Literary archive of Flanders", "2 million letters/manuscripts", "Digital materials available", "Advanced learner focus"],
                        free: true,
                        level: "Advanced"
                    },
                    {
                        name: "Strips.be",
                        url: "https://strips.be/",
                        features: ["Digital comics platform", "5 free albums", "Major Flemish series", "Elementary to intermediate"],
                        free: true,
                        level: "Elementary to Intermediate"
                    },
                    {
                        name: "Project Gutenberg Dutch",
                        url: "https://www.gutenberg.org/browse/languages/nl",
                        features: ["Public domain literary works", "Historical Belgian texts", "Flanders-focused content", "Advanced learner material"],
                        free: true,
                        level: "Advanced"
                    },
                    {
                        name: "KBR Digital Collections",
                        url: "https://www.kbr.be/en/collections/digital-collections/",
                        features: ["Royal Library digital resources", "Belgica digital library", "Free MyKBR account", "All proficiency levels"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Erfgoedbibliotheek",
                        url: "https://consciencebibliotheek.be/en",
                        features: ["Heritage library Flemish culture", "1.5 million volumes", "Digital collections available", "All proficiency levels"],
                        free: true,
                        level: "All levels"
                    }
                ]
            }
        ],
        audio: [
            {
                category: "Audio/Video Resources",
                items: [
                    {
                        name: "VRT MAX",
                        url: "https://www.vrt.be/vrtmax/",
                        features: ["Free VRT streaming platform", "Live radio and podcasts", "TV replays available", "Educational content included"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Op z'n Vlaams Podcast",
                        url: "https://podcasts.apple.com/us/podcast/op-zn-vlaams/id1535159546",
                        features: ["Cultural/educational podcast", "Clear Flemish language", "B2-C1 learner focus", "Episode transcripts available"],
                        free: true,
                        level: "B2 to C1"
                    },
                    {
                        name: "Wablieft",
                        url: "https://www.wablieft.be/nl",
                        features: ["Simplified Flemish news", "Clear language no jargon", "A2-B1 learner focus", "Free online content"],
                        free: true,
                        level: "A2 to B1"
                    },
                    {
                        name: "Ketnet",
                        url: "https://www.ketnet.be",
                        features: ["Children's educational content", "Ketnet Junior ages 0-6", "Educational series included", "Elementary level focus"],
                        free: true,
                        level: "Elementary"
                    },
                    {
                        name: "VRT Podcasts",
                        url: "https://www.vrt.be/vrtnws/nl/luister/podcasts/",
                        features: ["Extensive VRT podcast catalog", "News and culture", "Educational content included", "Authentic Flemish language"],
                        free: true,
                        level: "B2 to C2"
                    },
                    {
                        name: "Radio 1 Podcasts",
                        url: "https://www.vrt.be/vrtmax/",
                        features: ["In-depth audio content", "Culture politics science", "Personal stories included", "C1-C2 advanced level"],
                        free: true,
                        level: "C1 to C2"
                    }
                ]
            }
        ],
        apps: [
            {
                category: "Dictionaries and Language Tools",
                items: [
                    {
                        name: "Het Vlaams Woordenboek",
                        url: "https://www.vlaamswoordenboek.be/",
                        features: ["Collaborative Flemish dictionary", "38,224+ terms available", "User voting system", "Belgian media examples"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Dialectloket",
                        url: "https://www.dialectloket.be/woord/",
                        features: ["Comprehensive dialect dictionary portal", "WVD WLD WBD access", "Phonetic transcriptions included", "All proficiency levels"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "e-WVD",
                        url: "https://e-wvd.be/",
                        features: ["University of Ghent dictionary", "1,999,593+ entries available", "Electronic dialect resource", "All proficiency levels"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Team Taaladvies",
                        url: "https://www.vlaanderen.be/taaladvies",
                        features: ["Official government language advice", "Phone and email support", "Clear language initiative", "All proficiency levels"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "ANW (Algemeen Nederlands Woordenboek)",
                        url: "https://anw.ivdnt.org/search",
                        features: ["Scholarly online dictionary", "Flemish usage included", "297,099+ entries available", "Daily updates provided"],
                        free: true,
                        level: "Advanced"
                    },
                    {
                        name: "Van Dale Gratis",
                        url: "https://www.vandale.nl/pages/gratis-woordenboek/vlaams",
                        features: ["Limited free version", "Flemish entries included", "Reliable vocabulary authority", "All proficiency levels"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Taaladvies.net",
                        url: "https://taaladvies.net/",
                        features: ["Multi-partner advice portal", "Searchable database included", "Expert responses available", "All proficiency levels"],
                        free: true,
                        level: "All levels"
                    }
                ]
            },
            {
                category: "Mobile Applications",
                items: [
                    {
                        name: "NedBox App",
                        url: "https://apps.apple.com/",
                        features: ["Mobile NedBox platform", "Interactive city map", "Offline capability included", "iOS and Android"],
                        free: true,
                        level: "A1 to A2"
                    },
                    {
                        name: "VRT MAX App",
                        url: "https://apps.apple.com/",
                        features: ["Complete VRT content platform", "Live streaming included", "Chromecast support available", "iOS and Android"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "VRT Radio Apps",
                        url: "https://apps.apple.com/",
                        features: ["Radio 1 Studio Brussel", "Live streaming included", "Podcast access available", "iOS and Android"],
                        free: true,
                        level: "Various"
                    }
                ]
            },
            {
                category: "Flemish Sign Language Resources",
                items: [
                    {
                        name: "Woordenboek VGT",
                        url: "https://woordenboek.vlaamsegebarentaal.be",
                        features: ["Flemish Sign Language dictionary", "10,025 video signs", "Keyword searchable interface", "All proficiency levels"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "CVO Semper VGT Course",
                        url: "https://www.cvosemper.be/en/opleidingen/vakgebied/205/cursus-vlaamse-gebarentaal-vgt",
                        features: ["Comprehensive VGT training course", "120 teaching periods", "Community interaction included", "All proficiency levels"],
                        free: false,
                        level: "All levels"
                    }
                ]
            }
        ],
        practice: [
            {
                category: "Language Exchange and Community Platforms",
                items: [
                    {
                        name: "HelloTalk",
                        url: "https://www.hellotalk.com/",
                        features: ["Language exchange app", "40+ million users worldwide", "Text voice video chat", "Translation tools included"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Tandem",
                        url: "https://www.tandem.net/",
                        features: ["Swipe-based language matching", "Voice and video calls", "Message correction feature", "User review system"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "ConversationExchange",
                        url: "https://www.conversationexchange.com/",
                        features: ["Traditional language exchange website", "Face-to-face meetings available", "Pen-pal connections included", "Various chat options"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "MyLanguageExchange",
                        url: "http://mylanguageexchange.com/",
                        features: ["Language exchange AI tools", "Speech recognition included", "Inline translation feature", "Lesson plans available"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Vlaamse Podcast Gids",
                        url: "https://vlaamsepodcasts.be/",
                        features: ["Complete Flemish podcast directory", "Various proficiency levels", "All topics covered", "Comprehensive listing provided"],
                        free: true,
                        level: "Various"
                    }
                ]
            }
        ]
    }
};

if (typeof languageData !== 'undefined') {
    languageData.flemish = flemishResources;
}
// ES6 Module Export
export { flemishResources };
export default flemishResources;
