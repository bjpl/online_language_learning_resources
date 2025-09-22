// ===================================
// Simplified Language Data - Core Structure Only
// ===================================

const languageData = {
    dutch: {
        name: "Dutch",
        nativeName: "Nederlands",
        flag: "🇳🇱",
        learners: "5M",
        speakers: "24M native",
        difficulty: "Easy-Moderate",
        description: "The language of innovation and trade, Dutch opens doors to the Netherlands and Belgium's progressive societies.",
        highlights: ["Germanic roots", "Phonetic spelling", "Business language"],
        resources: {
            apps: [
                { name: "Duolingo Dutch", url: "https://www.duolingo.com/", description: "Complete free course from A1-B1", free: true },
                { name: "NT2 TaalMenu", url: "https://nt2taalmenu.nl/", description: "Integration exam preparation", free: true }
            ],
            courses: [
                { name: "University of Groningen MOOC", url: "https://www.futurelearn.com/courses/dutch", description: "Award-winning free course", free: true }
            ]
        }
    },

    danish: {
        name: "Danish",
        nativeName: "Dansk",
        flag: "🇩🇰",
        learners: "5M",
        speakers: "6M native",
        difficulty: "Easy-Moderate",
        description: "Gateway to Scandinavian culture and the concept of 'hygge', Danish offers a melodic introduction to Nordic languages.",
        highlights: ["Soft consonants", "Simple grammar", "Hygge culture"],
        resources: {
            apps: [
                { name: "GroVo Danish", url: "https://grovo.org/grovo-danish/", description: "100% free with 186,000+ sentences", free: true },
                { name: "Duolingo Danish", url: "https://www.duolingo.com/", description: "Gamified learning path", free: true }
            ],
            podcasts: [
                { name: "Simple Danish Podcast", url: "https://denmarkandme.com/podcast/", description: "Clear Danish with transcripts", free: true }
            ]
        }
    },

    portuguese: {
        name: "Portuguese",
        nativeName: "Português",
        flag: "🇵🇹🇧🇷",
        learners: "35M",
        speakers: "260M native",
        difficulty: "Easy-Moderate",
        description: "Gateway to Brazil's vibrant culture and Portugal's historic charm, with resources for both variants.",
        highlights: ["Two major variants (PT-PT & PT-BR)", "Romance language roots", "Growing economic importance"],
        resources: {
            apps: [
                { name: "Duolingo", url: "https://www.duolingo.com/", description: "Gamified Brazilian Portuguese", free: true }
            ],
            courses: [
                { name: "MIT OpenCourseWare", url: "https://ocw.mit.edu/", description: "Complete university course", free: true }
            ]
        }
    },

    italian: {
        name: "Italian",
        nativeName: "Italiano",
        flag: "🇮🇹",
        learners: "20M",
        speakers: "85M native",
        difficulty: "Easy",
        description: "The melodious language of art, cuisine, and history, Italian is one of the easiest languages for English speakers to learn.",
        highlights: ["Musical pronunciation", "Rich cultural heritage", "Straightforward grammar"],
        resources: {
            apps: [
                { name: "Duolingo Italian", url: "https://www.duolingo.com/", description: "51 units of comprehensive Italian", free: true },
                { name: "Online Italian Club", url: "https://onlineitalianclub.com/", description: "Thousands of free exercises", free: true }
            ],
            courses: [
                { name: "edX WellesleyX", url: "https://www.edx.org/", description: "University-level Italian course", free: true },
                { name: "MIT OpenCourseWare", url: "https://ocw.mit.edu/", description: "Italian with Mediterranean cooking", free: true }
            ]
        }
    },

    indonesian: {
        name: "Indonesian",
        nativeName: "Bahasa Indonesia",
        flag: "🇮🇩",
        learners: "45M",
        speakers: "43M native, 270M+ total",
        difficulty: "Easy",
        description: "The lingua franca of Indonesia's 17,000+ islands, Indonesian is surprisingly easy to learn with simple grammar and no tones.",
        highlights: ["No verb conjugations", "Latin alphabet", "Phonetic spelling"],
        resources: {
            apps: [
                { name: "Duolingo Indonesian", url: "https://www.duolingo.com/", description: "Gamified lessons with speaking practice", free: true },
                { name: "Ling App", url: "https://ling-app.com/", description: "Interactive lessons with cultural context", free: true }
            ],
            courses: [
                { name: "Live Lingua Peace Corps", url: "https://www.livelingua.com/", description: "6 complete courses with 190 audio files", free: true },
                { name: "BIPA Daring", url: "https://bipa.kemdikbud.go.id/", description: "Official government platform with 435 books", free: true }
            ]
        }
    },

    korean: {
        name: "Korean",
        nativeName: "한국어",
        flag: "🇰🇷",
        learners: "77M",
        speakers: "80M native",
        difficulty: "Hard",
        description: "Known for its unique Hangul writing system and K-pop culture, Korean offers structured government resources and vibrant online communities.",
        highlights: ["Scientific alphabet", "Rich honorific system", "K-culture immersion"],
        resources: {
            apps: [
                { name: "Duolingo Korean", url: "https://www.duolingo.com/", description: "65 skills covering 2200+ words", free: true },
                { name: "LingoDeer", url: "https://www.lingodeer.com/", description: "Designed specifically for Asian languages", free: true }
            ],
            courses: [
                { name: "Talk To Me In Korean", url: "https://talktomeinkorean.com/", description: "1000+ free lessons with PDFs", free: true },
                { name: "King Sejong Institute", url: "https://www.iksi.or.kr/", description: "Official government Korean education", free: true }
            ]
        }
    },

    hindi: {
        name: 'Hindi',
        nativeName: 'हिन्दी',
        flag: '🇮🇳',
        learners: '120M',
        speakers: '600M+',
        difficulty: 'Hard',
        description: 'An Indo-Aryan language and the official language of India, Hindi opens doors to one of the world\'s largest economies and richest cultures.',
        highlights: ['Devanagari script', 'Government resources', 'Bollywood immersion'],
        resources: {
            apps: [
                { name: 'Duolingo Hindi', url: 'https://www.duolingo.com/', description: 'Free Hindi course with gamified lessons', free: true },
                { name: 'LILA Hindi', url: 'https://rajbhasha.gov.in/', description: 'Government AI-based Hindi learning', free: true }
            ],
            courses: [
                { name: 'University of Texas Hindi', url: 'https://www.laits.utexas.edu/orkelm/hindiscript/', description: 'Interactive Devanagari script lessons', free: true },
                { name: 'SWAYAM Courses', url: 'https://swayam.gov.in/', description: '195+ free government Hindi courses', free: true }
            ]
        }
    },

    swahili: {
        name: 'Swahili',
        nativeName: 'Kiswahili',
        flag: '🇹🇿🇰🇪',
        learners: '50M',
        speakers: '200M+',
        difficulty: 'Easy',
        description: 'The lingua franca of East Africa and an official African Union language, Swahili offers exceptional free resources through government initiatives.',
        highlights: ['No tones', 'Latin script', 'Government support'],
        resources: {
            apps: [
                { name: 'Duolingo Swahili', url: 'https://www.duolingo.com/', description: 'Peace Corps-developed free course', free: true },
                { name: 'Language Transfer', url: 'https://www.languagetransfer.org/', description: 'Complete audio course with logic-based learning', free: true }
            ],
            courses: [
                { name: 'Live Lingua Peace Corps', url: 'https://www.livelingua.com/courses/swahili', description: '3 courses with 146 audio files', free: true },
                { name: 'FSI Swahili', url: 'https://www.fsi-language-courses.org/', description: 'US government comprehensive course', free: true }
            ]
        }
    }
};