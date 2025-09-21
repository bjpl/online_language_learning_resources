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

    // Portuguese placeholder - full data loaded from portuguese-data.js
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
                { name: "Live Lingua", url: "https://www.livelingua.com/portuguese/courses", description: "15 courses with 686 audio files", free: true },
                { name: "Duolingo", url: "https://www.duolingo.com/", description: "Gamified Brazilian Portuguese", free: true }
            ],
            courses: [
                { name: "MIT OpenCourseWare", url: "https://ocw.mit.edu/", description: "Complete university course", free: true },
                { name: "Instituto Camões", url: "https://www.instituto-camoes.pt/", description: "Official Portuguese institute", free: true }
            ]
            // Note: No practice array here - will be added by portuguese-data.js
        }
    }
};