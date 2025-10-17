const nahuatlResources = {
    name: "Nahuatl",
    nativeName: "Nāhuatl",
    flag: "🇲🇽",
    learners: "100K+",
    speakers: "1.7M native (30+ varieties across Mexico and Central America)",
    highlights: [
        "Complete coverage of Classical Nahuatl and 30+ modern varieties including Huasteca, Guerrero, Puebla, and Pipil",
        "UT Austin Nāhuatlahtolli: Comprehensive multimedia course from beginner to advanced with native audio",
        "Florentine Codex: Complete 12-book manuscript with 2,500 pages, 2,000+ illustrations from Getty Museum",
        "INALI Lectura del Náhuatl: 488-page comprehensive textbook by David Charles Wright Carr",
        "itwêwina-style dictionaries with 40,000+ words and morphological analysis",
        "Strong government support from Mexico (INALI, INPI, SEP) with official language status"
    ],
    resources: {
        courses: [
            {
                category: "Online Courses and MOOCs",
                items: [
                    {
                        name: "UT Austin Nāhuatlahtolli",
                        url: "https://tlahtolli.coerll.utexas.edu/",
                        features: ["Self-paced multimedia course", "Huasteca Veracruz variant", "Interactive lessons with audio", "Grammar and reading exercises", "IDIEZ collaboration"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "David Bowles Classical Nahuatl 101",
                        url: "https://nahuatl.thinkific.com/courses/freenahuatl2020",
                        features: ["13-module Classical Nahuatl course", "Video presentations and quizzes", "Exercises and downloadable PDFs", "Beginner-focused content"],
                        free: true,
                        level: "Beginner"
                    },
                    {
                        name: "7000 Languages Platform",
                        url: "https://www.7000.org/nahuatl",
                        features: ["Elementary Modern Nahuatl course", "English/Spanish speakers targeted", "Tlahtoltapazolli community created", "Native audio recordings"],
                        free: true,
                        level: "Beginner"
                    },
                    {
                        name: "I Kinda Like Languages",
                        url: "https://ikindalikelanguages.com/learn/Nahuatl",
                        features: ["Interactive Classical Nahuatl course", "Grammar focus", "Interactive exercises", "Beginner-friendly format"],
                        free: true,
                        level: "Beginner"
                    },
                    {
                        name: "University of Utah Nahuatl Program",
                        url: "https://languages.utah.edu/undergraduate/languages-offered/nahuatl.php",
                        features: ["6-course academic sequence", "Huasteca Veracruzana variety", "FLAS fellowships $7,500", "Distance learning available", "Native speaker instruction"],
                        free: false,
                        level: "All levels"
                    },
                    {
                        name: "Universidad Veracruzana Nahuatl",
                        url: "https://www.uv.mx/eee/cursos/curso-de-nahuatl-i-y-ii/",
                        features: ["Nahuatl I & II courses", "Central Veracruz variant", "Distance learning options", "Academic credit available"],
                        free: false,
                        level: "Beginner to Intermediate"
                    },
                    {
                        name: "UNAM ENALLT Nahuatl",
                        url: "https://enallt.unam.mx/lenguas/cursos-lenguas-ciudad-universitaria/nahuatl",
                        features: ["Multiple variant coverage", "All levels supported", "Published textbooks included", "100-hour structured courses"],
                        free: false,
                        level: "All levels"
                    },
                    {
                        name: "BUAP Puebla Nahuatl Course",
                        url: "https://buap.mx/content/curso-de-náhuatl-de-puebla",
                        features: ["Seasonal online courses", "Puebla variant focus", "Beginner to intermediate", "Online modality"],
                        free: false,
                        level: "Beginner to Intermediate"
                    },
                    {
                        name: "Stanford University Nahuatl",
                        url: "https://clas.stanford.edu/outreach/indigenous-language-resources/introduction-nahuatl",
                        features: ["Three-quarter academic sequence", "Huasteca region variety", "Distance learning supported", "IDIEZ collaboration"],
                        free: false,
                        level: "Beginning to Intermediate"
                    }
                ]
            },
            {
                category: "Government and Institutional Resources",
                items: [
                    {
                        name: "INALI Prontuarios",
                        url: "https://site.inali.gob.mx/Micrositios/Prontuarios/nahuatlV.html",
                        features: ["Basic phrases and greetings", "Huasteca variety", "Official government resource", "PDF downloads available"],
                        free: true,
                        level: "Beginner"
                    },
                    {
                        name: "INALI Catalog of Indigenous Languages",
                        url: "https://site.inali.gob.mx/pdf/catalogo_lenguas_indigenas.pdf",
                        features: ["Comprehensive language catalog", "All Nahuatl varieties", "Official classification system", "Reference resource"],
                        free: true,
                        level: "Reference"
                    },
                    {
                        name: "INPI Illustrated Book",
                        url: "https://www.gob.mx/inpi/articulos/nahuatlahtolli-lengua-nahuatl-libro-ilustrado",
                        features: ["103-page illustrated introduction", "General Nahuatl", "Bilingual Spanish-Nahuatl content", "Beginner-oriented"],
                        free: true,
                        level: "Beginner"
                    },
                    {
                        name: "SEP Teacher's Book",
                        url: "https://www.gob.mx/sep/documentos/libro-para-el-maestro-nahuatl",
                        features: ["Educational methodology guide", "Teacher-focused resource", "Pedagogical approach", "General Nahuatl"],
                        free: true,
                        level: "Teachers"
                    },
                    {
                        name: "CONALITEG Textbooks",
                        url: "https://libros.conaliteg.gob.mx/indigena.html",
                        features: ["Free indigenous textbooks", "Various Nahuatl varieties", "Elementary level focus", "Online viewing available"],
                        free: true,
                        level: "Elementary"
                    },
                    {
                        name: "Hidalgo State Manual",
                        url: "https://memoria.culturahidalgo.gob.mx/biblioteca-publica-digital/manual-para-aprender-nahuatl/",
                        features: ["Regional learning manual", "Hidalgo variety", "State government resource", "Beginner-targeted"],
                        free: true,
                        level: "Beginner"
                    }
                ]
            },
            {
                category: "Community Projects and Language Preservation",
                items: [
                    {
                        name: "Tlahtoltapazolli LA",
                        url: "https://www.facebook.com/groups/Tlahtoltapazolli/",
                        features: ["Weekly free classes", "Various varieties coverage", "LA Plaza Sundays 12-2", "PDF downloads included"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "IDIEZ Resources Hub",
                        url: "https://tlahtoltapazolli.com/idiez-resources/",
                        features: ["Free workbooks and dictionaries", "Modern Huasteca variety", "Picture dictionary included", "Grammar charts and stories"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "SpeakNahuatl Collective",
                        url: "https://speaknahuatl.com/",
                        features: ["Online Zoom classes", "30+ varieties covered", "BBIPOC-centered community", "27K Instagram followers"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Huiquipedia (Nahuatl Wikipedia)",
                        url: "https://nah.wikipedia.org/",
                        features: ["Nahuatl Wikipedia", "Classical/Modern varieties", "4,000+ articles", "Community editing platform"],
                        free: true,
                        level: "All levels"
                    }
                ]
            }
        ],
        books: [
            {
                category: "Digital Libraries and Books",
                items: [
                    {
                        name: "Florentine Codex (Getty Museum)",
                        url: "https://florentinecodex.getty.edu/",
                        features: ["Complete 12-book manuscript", "2,500 pages content", "2,000+ illustrations", "Searchable with zoom tools"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "INALI Lectura del Náhuatl",
                        url: "https://site.inali.gob.mx/publicaciones/libro_lectura_nahuatl/pdf/lectura_del_nahuatl.pdf",
                        features: ["488-page comprehensive textbook", "David Charles Wright Carr", "Complete grammar and morphology", "Translation methods included"],
                        free: true,
                        level: "Advanced"
                    },
                    {
                        name: "Project Gutenberg Nahuatl",
                        url: "https://www.gutenberg.org/browse/languages/nah",
                        features: ["Ancient Nahuatl poetry", "Classical variety texts", "Multiple formats available", "PDF, EPUB, HTML, Kindle"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Internet Archive Nahuatl Collection",
                        url: "https://archive.org",
                        features: ["Karttunen Dictionary included", "Bancroft Dialogues", "Historical texts collection", "No registration required"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "SEPI Mexico City Manual",
                        url: "https://www.sepi.cdmx.gob.mx/storage/app/media/Libro%20Nahuatl%202017.pdf",
                        features: ["58-page complete course", "Milpa Alta variety", "Exercises included", "Beginner-focused content"],
                        free: true,
                        level: "Beginner"
                    },
                    {
                        name: "Wikibooks Classical Nahuatl",
                        url: "https://en.wikibooks.org/wiki/Classical_Nahuatl",
                        features: ["Comprehensive grammar guide", "Classical Nahuatl", "Creative Commons licensed", "PDF downloadable"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Early Nahuatl Library",
                        url: "https://enl.wired-humanities.org/",
                        features: ["Florentine Codex excerpts", "Academic-level analysis", "Transcriptions included", "Translations provided"],
                        free: true,
                        level: "Academic"
                    }
                ]
            },
            {
                category: "Grammar Guides and Textbooks",
                items: [
                    {
                        name: "UCSD Grammar Notes",
                        url: "https://pages.ucsd.edu/~dkjordan/nahuatl/NahuatlGrammarNotes.pdf",
                        features: ["19-page reference grammar", "Verb conjugation tables", "Morphology coverage", "PDF format available"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "UNAM Compendio Grammar",
                        url: "https://historicas.unam.mx/publicaciones/publicadigital/libros/gramatica/cgnahuatl.html",
                        features: ["Thelma D. Sullivan grammar", "Academic-level content", "Comprehensive morphological analysis", "Classical variety focus"],
                        free: true,
                        level: "Academic"
                    },
                    {
                        name: "Wikibooks Classical Nahuatl Grammar",
                        url: "https://en.wikibooks.org/wiki/Classical_Nahuatl/Grammar",
                        features: ["Free collaborative textbook", "Open-source platform", "Continuously updated", "Classical Nahuatl focus"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "University of Oregon Foundation Course",
                        url: "https://bpb-us-e1.wpmucdn.com/blogs.uoregon.edu/dist/7/5151/files/2023/04/CK-Book1-1.pdf",
                        features: ["Academic textbook series", "2 volumes included", "Comprehensive course material", "Academic-level content"],
                        free: true,
                        level: "Academic"
                    },
                    {
                        name: "Arte de la lengua mexicana (Carochi)",
                        url: "https://archive.org/details/artedelalenguam00caro",
                        features: ["1645 colonial grammar", "Historical linguistic approach", "Classical Nahuatl", "Advanced level content"],
                        free: true,
                        level: "Advanced"
                    }
                ]
            }
        ],
        audio: [
            {
                category: "Audio/Video Resources",
                items: [
                    {
                        name: "CanalNahuatl YouTube",
                        url: "https://www.youtube.com/channel/UC9gSRFjOqzhSqzbPJQEN5Lw",
                        features: ["Educational videos in Spanish", "Various varieties covered", "Tlahtoltapazolli association", "All levels supported"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "NÁHUATL Podcast (Maximiliano Cruz)",
                        url: "https://podcasts.apple.com/gb/podcast/náhuatl/id1555913997",
                        features: ["5 episodes podcast", "General Nahuatl content", "Dialogues and numbers", "Apple Podcasts and Spotify"],
                        free: true,
                        level: "Beginner"
                    },
                    {
                        name: "Nahuatl with Ixchel",
                        url: "https://www.italki.com/en/podcast/channel/946f5ezflbrpkujweaiwh1",
                        features: ["Short useful dialogues", "General Nahuatl", "Self-introduction focus", "Beginner-targeted"],
                        free: true,
                        level: "Beginner"
                    },
                    {
                        name: "UNAM Huasteca Multimedia",
                        url: "http://avanthooft.net/vocablos.html",
                        features: ["Interactive vocabulary resource", "All 3 Huasteca sub-varieties", "Audio/video content", "Daily life photos"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Cuitlahuac A. Martinez YouTube",
                        url: "https://www.youtube.com/",
                        features: ["Language teaching videos", "Cultural education content", "Various varieties", "Indigenous language activism"],
                        free: true,
                        level: "All levels"
                    }
                ]
            }
        ],
        apps: [
            {
                category: "Mobile Apps (Nahuatl-Specific Content)",
                items: [
                    {
                        name: "Totlahtol Dictionary",
                        url: "https://apps.apple.com/us/app/totlahtol-nahuatl/id1182991493",
                        features: ["Comprehensive dictionary app", "Huasteca Veracruz variety", "English-Nahuatl-Spanish", "iOS and Android"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Let's Learn Náhuatl (Vamos a Aprender)",
                        url: "https://apps.apple.com/",
                        features: ["10 interactive multimedia lessons", "Acatlán, Guerrero variety", "INALI collaboration", "Cultural content included"],
                        free: true,
                        level: "Beginner"
                    },
                    {
                        name: "Nawatlahtolli Dictionary",
                        url: "https://apps.apple.com/us/app/nawatlahtolli/id1611289115",
                        features: ["40,000 word dictionary", "Multiple varieties covered", "iOS only", "Comprehensive coverage"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Nahuatl with Axolotl",
                        url: "https://play.google.com/store/apps/details?id=com.mycompany.nahuatldecks",
                        features: ["Educational flashcard app", "Huasteca Veracruz variety", "Native pronunciations", "Images included"],
                        free: true,
                        level: "Beginner"
                    },
                    {
                        name: "Beginner Nahuatl",
                        url: "https://play.google.com/store/",
                        features: ["Word-a-day vocabulary app", "1000 common words", "Spaced repetition system", "Android platform"],
                        free: true,
                        level: "Beginner"
                    },
                    {
                        name: "Aprende náhuatl (INPI)",
                        url: "https://play.google.com/store/apps/details?id=com.nahuatlpuebla.app",
                        features: ["Interactive learning app", "Puebla variety", "UNESCO Mexico collaboration", "Beginner to intermediate"],
                        free: true,
                        level: "Beginner to Intermediate"
                    }
                ]
            },
            {
                category: "Dictionaries and Reference Tools",
                items: [
                    {
                        name: "Online Nahuatl Dictionary",
                        url: "https://nahuatl.wired-humanities.org/",
                        features: ["Comprehensive multilingual dictionary", "Classical/Historical varieties", "Advanced search features", "Etymological information"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Gran Diccionario Náhuatl (GDN)",
                        url: "https://gdn.iib.unam.mx/",
                        features: ["UNAM historical dictionary", "16th-21st century varieties", "Molina, Carochi included", "Normalized spellings"],
                        free: true,
                        level: "Academic"
                    },
                    {
                        name: "Aulex Nahuatl Dictionary",
                        url: "https://aulex.org/nahuatl/",
                        features: ["10,890 entries bidirectional", "Multiple modern varieties", "Downloadable database", "Modern orthography"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Glosbe Nahuatl Dictionaries",
                        url: "https://glosbe.com/en/nah",
                        features: ["Community-based translations", "Modern and Classical varieties", "Audio pronunciations", "Visual translations"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Alonso de Molina Dictionary (1571)",
                        url: "https://archive.org/details/vocabularioenlen00moli_0",
                        features: ["First indigenous American dictionary", "39,100+ entries", "Colonial Classical variety", "Spanish-Nahuatl"],
                        free: true,
                        level: "Advanced"
                    }
                ]
            },
            {
                category: "Interactive Learning Tools and Games",
                items: [
                    {
                        name: "Memrise Nahuatl Courses",
                        url: "https://www.memrise.com/",
                        features: ["Community-created courses", "Classical and modern varieties", "Spaced repetition system", "All levels supported"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Anki Nahuatl Decks",
                        url: "https://ankiweb.net/shared/decks/nahuatl",
                        features: ["User-created decks", "Various varieties", "AnkiWeb searchable", "All levels"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "Zentetl Card Game",
                        url: "https://www.thegamecrafter.com/games/zentetl:-a-nawatl-language-card-game1",
                        features: ["Physical card game", "2-4 players", "Numbers and colors", "Beginner focus"],
                        free: false,
                        level: "Beginner"
                    }
                ]
            }
        ],
        practice: [
            {
                category: "Regional Variety-Specific Resources",
                items: [
                    {
                        name: "UNAM Huasteca Multimedia Resources",
                        url: "http://avanthooft.net/vocablos.html",
                        features: ["Interactive vocabulary resource", "Three Huasteca varieties", "Audio, video, photos", "Daily life content"],
                        free: true,
                        level: "All levels"
                    },
                    {
                        name: "INPI Atlas Guerrero",
                        url: "http://atlas.inpi.gob.mx/nahuas-de-guerrero-etnografia/",
                        features: ["Ethnographic information", "4 Guerrero variants", "Detailed regional data", "Reference resource"],
                        free: true,
                        level: "Reference"
                    },
                    {
                        name: "INPI Sierra Norte Monograph",
                        url: "https://www.gob.mx/inpi/documentos/monografia-de-los-nahuas-de-la-sierra-norte-de-puebla",
                        features: ["Ethnographic monograph", "Sierra Norte region", "218,000 speakers", "Comprehensive regional info"],
                        free: true,
                        level: "Reference"
                    },
                    {
                        name: "INPI Tlaxcala Monograph",
                        url: "https://www.gob.mx/inpi/documentos/monografia-de-los-nahuas-de-tlaxcala",
                        features: ["55-page monograph", "Tlaxcala Nahuatl variety", "Maps and cultural context", "Glossary included"],
                        free: true,
                        level: "Reference"
                    },
                    {
                        name: "Pipil/Nahuat Resources (El Salvador)",
                        url: "https://www.facebook.com/",
                        features: ["Language recovery materials", "El Salvador Pipil", "Video lessons", "Critically endangered variety"],
                        free: true,
                        level: "All levels"
                    }
                ]
            }
        ]
    }
};

if (typeof languageData !== 'undefined') {
    languageData.nahuatl = nahuatlResources;
}

// ES6 Module Export
export { nahuatlResources };
export default nahuatlResources;
