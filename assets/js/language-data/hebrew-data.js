// Hebrew Language Data
const hebrewResources = {
    name: "Hebrew",
    nativeName: "עברית",
    flag: "🇮🇱",
    learners: "2M+",
    speakers: "9M native",
    highlights: ["Official language of Israel", "Ancient and modern forms", "Right-to-left script", "Biblical and modern Hebrew"],

    resources: {
        courses: [
            {
                category: "Online Courses and Learning Platforms",
                items: [
                    {
                        name: "HebrewPod101",
                        url: "https://www.hebrewpod101.com/",
                        level: "Beginner-Advanced",
                        features: ["Audio/video lessons", "PDF materials", "Mobile app", "7-day free trial"],
                        free: true
                    },
                    {
                        name: "Duolingo Hebrew",
                        url: "https://www.duolingo.com/course/he/en/Learn-Hebrew",
                        level: "Beginner-Intermediate",
                        features: ["Free course", "Gamified learning", "Mobile app", "Stories feature"],
                        free: true
                    },
                    {
                        name: "Mondly Hebrew",
                        url: "https://www.mondly.com/learn-hebrew-online",
                        level: "All levels",
                        features: ["Speech recognition", "AR features", "Chatbot practice", "Daily lessons"],
                        free: false
                    }
                ]
            }
        ],

        apps: [
            {
                category: "Mobile Apps",
                items: [
                    {
                        name: "Duolingo",
                        url: "https://www.duolingo.com/",
                        level: "Beginner-Intermediate",
                        features: ["Free app", "Gamified lessons", "Stories", "Hebrew script practice"],
                        free: true
                    },
                    {
                        name: "Memrise Hebrew",
                        url: "https://www.memrise.com/",
                        level: "Beginner-Intermediate",
                        features: ["Video clips", "Native speakers", "Spaced repetition", "Free basic"],
                        free: true
                    },
                    {
                        name: "Drops Hebrew",
                        url: "https://languagedrops.com/",
                        level: "Beginner-Intermediate",
                        features: ["Visual learning", "5-min sessions", "Script practice", "Premium features"],
                        free: false
                    },
                    {
                        name: "Nemo Hebrew",
                        url: "https://www.nemolanguageapps.com/",
                        level: "Beginner",
                        features: ["Essential phrases", "Offline mode", "Speech studio", "Free core"],
                        free: true
                    },
                    {
                        name: "Write It! Hebrew",
                        url: "https://apps.apple.com/app/write-it-hebrew/id1268225916",
                        level: "Beginner",
                        features: ["Hebrew alphabet", "Writing practice", "Stroke order", "Free with ads"],
                        free: true
                    },
                    {
                        name: "Rosetta Stone Hebrew",
                        url: "https://www.rosettastone.com/",
                        level: "All levels",
                        features: ["Immersion method", "Speech recognition", "Live tutoring", "Subscription"],
                        free: false
                    }
                ]
            }
        ],

        books: [
            {
                category: "Textbooks and Grammar",
                items: [
                    {
                        name: "Hebrew from Scratch",
                        url: "https://www.amazon.com/Hebrew-Scratch-Part-Ivrit-Hatchala/dp/9653500120",
                        level: "Beginner",
                        features: ["Standard textbook", "Used in Ulpan", "Audio available"],
                        free: false
                    }
                ]
            }
        ],

        audio: [
            {
                category: "Podcasts and Audio",
                items: [
                    {
                        name: "Streetwise Hebrew",
                        url: "https://www.streetwisehebrew.com/",
                        level: "Intermediate-Advanced",
                        features: ["Slang and idioms", "Cultural context", "Free podcast"],
                        free: true
                    }
                ]
            }
        ]
    }
};

if (typeof languageData !== 'undefined') {
    languageData.hebrew = hebrewResources;
}
