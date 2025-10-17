// Czech Language Data
const czechResources = {
    name: "Czech",
    nativeName: "Čeština",
    flag: "🇨🇿",
    learners: "1M+",
    speakers: "10.7M native",
    highlights: ["Official language of Czech Republic", "West Slavic language", "Rich literary tradition", "Gateway to Central Europe"],

    resources: {
        courses: [
            {
                category: "Online Courses and Learning Platforms",
                items: [
                    {
                        name: "CzechClass101",
                        url: "https://www.czechclass101.com/",
                        level: "Beginner-Advanced",
                        features: ["Audio/video lessons", "PDF materials", "Mobile app", "7-day free trial"],
                        free: true
                    },
                    {
                        name: "Duolingo Czech",
                        url: "https://www.duolingo.com/course/cs/en/Learn-Czech",
                        level: "Beginner-Intermediate",
                        features: ["Free course", "Gamified learning", "Mobile app", "Stories feature"],
                        free: true
                    },
                    {
                        name: "Mondly Czech",
                        url: "https://www.mondly.com/learn-czech-online",
                        level: "All levels",
                        features: ["Speech recognition", "AR features", "Chatbot practice", "VR experiences"],
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
                        features: ["Free app", "Gamified lessons", "Stories", "Podcasts"],
                        free: true
                    },
                    {
                        name: "Mondly Czech",
                        url: "https://www.mondly.com/",
                        level: "All levels",
                        features: ["Daily lessons", "Speech recognition", "Chatbot", "AR features"],
                        free: false
                    },
                    {
                        name: "Nemo Czech",
                        url: "https://www.nemolanguageapps.com/",
                        level: "Beginner-Intermediate",
                        features: ["Essential phrases", "Offline mode", "Speech studio", "Free core features"],
                        free: true
                    },
                    {
                        name: "Learn Czech by Bravo",
                        url: "https://play.google.com/store/apps/details?id=com.bravolang.czech",
                        level: "All levels",
                        features: ["6000+ words", "Offline mode", "Audio pronunciation", "Free with ads"],
                        free: true
                    },
                    {
                        name: "Drops Czech",
                        url: "https://languagedrops.com/",
                        level: "Beginner-Intermediate",
                        features: ["Visual learning", "5-min sessions", "2600+ words", "Premium features"],
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
                        name: "Czech Step by Step",
                        url: "https://www.czechstepbystep.cz/",
                        level: "Beginner-Intermediate",
                        features: ["Comprehensive textbook", "Online exercises", "Audio materials"],
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
                        name: "CzechPod101",
                        url: "https://www.czechclass101.com/",
                        level: "All levels",
                        features: ["Structured lessons", "PDF transcripts", "Mobile app"],
                        free: true
                    }
                ]
            }
        ]
    }
};

if (typeof languageData !== 'undefined') {
    languageData.czech = czechResources;
}
