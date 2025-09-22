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
    }
};