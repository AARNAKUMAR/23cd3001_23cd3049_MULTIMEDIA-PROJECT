import type { Quiz, QuizQuestion } from './types';
import { badgesData } from './levels';

// Helper function to create quiz for each day
const createQuiz = (
    day: number,
    title: string,
    description: string,
    questions: Omit<QuizQuestion, 'id'>[]
): Quiz => ({
    day,
    title,
    description,
    passingScore: 70,
    timeLimit: 300,
    thematicBadge: badgesData[day - 1],
    questions: questions.map((q, index) => ({
        ...q,
        id: `day${day}-q${index + 1}`
    }))
});

export const quizzesData: Quiz[] = [
    // Day 1: Dawn of Communication
    createQuiz(1, 'Dawn of Communication Mastery', "Test your knowledge of humanity's first communication methods", [
        {
            question: "What did Arin notice about the cave paintings that made them seem alive?",
            options: ["They were painted in bright colors", "They looked like they were moving", "They glowed in the dark", "They changed with the seasons"],
            correctAnswer: 1,
            explanation: "Arin observed that the animals in the cave paintings 'look like they're moving,' showing how ancient artists captured motion and life.",
            difficulty: 'easy'
        },
        {
            question: "How old are the oldest known cave paintings found in Indonesia?",
            options: ["Over 10,000 years old", "Over 25,000 years old", "Over 44,000 years old", "Over 100,000 years old"],
            correctAnswer: 2,
            explanation: "The oldest known cave paintings are over 44,000 years old, depicting hunting scenes and mythical beings.",
            difficulty: 'medium'
        },
        {
            question: "How many distinct characters did the Mesopotamian Cuneiform script contain?",
            options: ["Over 100", "Over 500", "Over 1,000", "Over 5,000"],
            correctAnswer: 2,
            explanation: "The Mesopotamian Cuneiform script contained over 1,000 distinct characters and was used for more than 3,000 years.",
            difficulty: 'hard'
        },
        {
            question: "What progression does Day 1 represent in communication evolution?",
            options: ["Individual to group", "Temporary to permanent record-keeping", "Visual to auditory to written to symbolic", "Simple to complex"],
            correctAnswer: 2,
            explanation: "Day 1 shows progression from visual (cave paintings) to auditory (oral traditions) to written (cuneiform) to symbolic (hieroglyphs).",
            difficulty: 'medium'
        },
        {
            question: "How long could a complete papyrus scroll be?",
            options: ["Up to 10 feet", "Up to 30 feet", "Up to 100 feet", "Up to 200 feet"],
            correctAnswer: 2,
            explanation: "A single papyrus scroll could be up to 100 feet (30 meters) long, requiring two hands to unroll.",
            difficulty: 'easy'
        }
    ]),

    // Day 2: Rise of Alphabets
    createQuiz(2, 'Rise of Alphabets & Early Books', "Master the revolutionary alphabets that democratized writing", [
        {
            question: "How many letters did the Phoenician alphabet have?",
            options: ["26 letters", "22 letters", "30 letters", "18 letters"],
            correctAnswer: 1,
            explanation: "The Phoenician alphabet had only 22 letters, all consonants. It's the ancestor of almost all modern alphabets.",
            difficulty: 'easy'
        },
        {
            question: "Why did the codex replace the scroll?",
            options: ["It was cheaper", "It was easier to carry", "It allowed quick flipping for cross-referencing", "It lasted longer"],
            correctAnswer: 2,
            explanation: "The codex was perfect for early Christians who needed to quickly flip between Bible passages for study and reference.",
            difficulty: 'medium'
        },
        {
            question: "Where does the English word 'book' come from?",
            options: ["Latin for 'paper'", "Greek for 'writing'", "Old Germanic for 'beech tree'", "French for 'pages'"],
            correctAnswer: 2,
            explanation: "The word 'book' comes from Old Germanic 'bōk' meaning 'beech tree,' as early Germanic peoples carved runes on beech wood.",
            difficulty: 'hard'
        },
        {
            question: "What was the primary purpose of Chinese oracle bones?",
            options: ["Trade records", "Divine communication and prophecies", "Teaching writing", "Art and decoration"],
            correctAnswer: 1,
            explanation: "Oracle bones were used for divination - interpreting cracks from heated turtle shells as messages from the divine.",
            difficulty: 'medium'
        },
        {
            question: "What innovation did the Phoenician alphabet bring?",
            options: ["Added pictures to words", "Made writing based on sound, not meaning", "Created the first paper", "Invented punctuation"],
            correctAnswer: 1,
            explanation: "The Phoenician alphabet was revolutionary because it was phonetic (based on sound), making literacy accessible beyond scribes.",
            difficulty: 'easy'
        }
    ]),

    // Day 3: Classical & Medieval Writing
    createQuiz(3, 'Classical & Medieval Writing', "Explore tactile and monumental writing methods", [
        {
            question: "How many sheep or calves were needed for a single medieval Bible?",
            options: ["About 50", "About 100", "Over 200", "Over 500"],
            correctAnswer: 2,
            explanation: "Crafting a single medieval Bible required the prepared skins (vellum) of over 200 sheep or calves.",
            difficulty: 'medium'
        },
        {
            question: "What made Roman inscriptions legible from a distance?",
            options: ["Bright colors", "Very large letters", "V-shaped cuts creating light and shadow", "Very deep carving"],
            correctAnswer: 2,
            explanation: "Roman inscriptions used V-shaped cuts that created a play of light and shadow, making them legible from afar.",
            difficulty: 'medium'
        },
        {
            question: "What is technically incorrect about the 'Bayeux Tapestry'?",
            options: ["It's not from Bayeux", "It's not old enough", "It's actually an embroidery", "It doesn't depict the Conquest"],
            correctAnswer: 2,
            explanation: "The Bayeux Tapestry is technically a massive 230-foot-long embroidery, not a tapestry.",
            difficulty: 'hard'
        },
        {
            question: "What was the purpose of Greek wax tablets?",
            options: ["Permanent records", "Religious ceremonies", "Reusable note-taking", "Artistic expression"],
            correctAnswer: 2,
            explanation: "Greek wax tablets were reusable 'notepads' - you could write with a stylus and erase by smoothing the wax.",
            difficulty: 'easy'
        },
        {
            question: "How did the Bayeux Tapestry serve as communication?",
            options: ["A book for scholars", "Visual narrative for illiterate population", "Teaching reading", "Religious text"],
            correctAnswer: 1,
            explanation: "The Bayeux Tapestry was a visual narrative for a largely illiterate population, a precursor to comics and film.",
            difficulty: 'easy'
        }
    ]),

    // Day 4: Print Revolution
    createQuiz(4, 'The Print Revolution', "Witness how Gutenberg's press changed the world", [
        {
            question: "How many more pages could Gutenberg's press produce vs a monk?",
            options: ["10 times more", "50 times more", "90 times more", "200 times more"],
            correctAnswer: 2,
            explanation: "A monk could copy 40 pages/day. Gutenberg's press could produce 3,600 pages in the same time - 90x more!",
            difficulty: 'medium'
        },
        {
            question: "How many books were printed in the first 50 years after 1450?",
            options: ["Over 1 million", "Over 5 million", "Over 20 million", "Over 50 million"],
            correctAnswer: 2,
            explanation: "Over 20 million books were printed in 50 years - more than all manuscripts in the previous millennium.",
            difficulty: 'easy'
        },
        {
            question: "What was unique about the earliest 17th century newspapers?",
            options: ["Colorful illustrations", "No headlines, just dates and cities", "Printed on silk", "Included ads"],
            correctAnswer: 1,
            explanation: "Early newspapers had no headlines, just dates and city names, presenting news as letters from distant places.",
            difficulty: 'hard'
        },
        {
            question: "What was the purpose of pamphlets like 'Common Sense'?",
            options: ["Entertainment", "Teaching literacy", "Spreading political ideas and inciting action", "Advertising"],
            correctAnswer: 2,
            explanation: "Pamphlets were instruments of radical change, spreading political ideas and designed to persuade and incite action.",
            difficulty: 'easy'
        },
        {
            question: "What made almanacs like 'Poor Richard's Almanack' important?",
            options: ["First books with pictures", "Free for everyone", "Practical guides with weather, dates, and wisdom", "Multiple languages"],
            correctAnswer: 2,
            explanation: "Almanacs were 'utility media' - practical guides with weather, planting dates, and advice, essential household books.",
            difficulty: 'medium'
        }
    ]),

    // Day 5: Mass Media Industrial Age
    createQuiz(5, 'Mass Media in the Industrial Age', "Experience steam-driven mass communication", [
        {
            question: "How fast could a transatlantic telegraph send a message by the 1870s?",
            options: ["Under 1 minute", "Under 10 minutes", "Under 1 hour", "Under 1 day"],
            correctAnswer: 1,
            explanation: "By the 1870s, a transatlantic cable could send a message from London to New York in under 10 minutes.",
            difficulty: 'medium'
        },
        {
            question: "How many sheets per hour could the steam-powered rotary press produce?",
            options: ["Over 1,000", "Over 4,000", "Over 8,000", "Over 15,000"],
            correctAnswer: 2,
            explanation: "The steam-powered rotary press could print on both sides, producing over 8,000 sheets per hour.",
            difficulty: 'easy'
        },
        {
            question: "What was the first telegraph message sent by Samuel Morse in 1844?",
            options: ["'Hello World'", "'What hath God wrought'", "'The future is now'", "'This is a test'"],
            correctAnswer: 1,
            explanation: "The first official telegraph message was 'What hath God wrought,' marking near-instantaneous communication.",
            difficulty: 'medium'
        },
        {
            question: "What made the 'Penny Press' revolutionary?",
            options: ["Printed in color", "Funded by advertising, accessible to working class", "Delivered to homes", "Included photos"],
            correctAnswer: 1,
            explanation: "Penny Press newspapers were funded by advertising rather than subscriptions, making news accessible for just one cent.",
            difficulty: 'medium'
        },
        {
            question: "What allowed images to be mass-reproduced with text?",
            options: ["Photography", "Engraving and lithography", "Painting", "Digital printing"],
            correctAnswer: 1,
            explanation: "Engravings and lithographs allowed images to be mass-reproduced alongside text, bringing visual news to the public.",
            difficulty: 'easy'
        }
    ]),

    // Day 6: Electronic & Personal Media
    createQuiz(6, 'Electronic & Personal Media', "Discover personal electronic communication", [
        { question: "What were Alexander Graham Bell's first telephone words?", options: ["'Hello, can you hear me?'", "'Mr. Watson - Come here - I want to see you'", "'This is a test'", "'The future is calling'"], correctAnswer: 1, explanation: "Bell's first words on March 10, 1876 were: 'Mr. Watson - Come here - I want to see you.'", difficulty: 'medium' },
        { question: "What was the first sound captured by Edison's phonograph?", options: ["A song", "'Mary Had a Little Lamb'", "The national anthem", "A speech"], correctAnswer: 1, explanation: "Edison's first recording in 1877 was him reciting 'Mary Had a Little Lamb.'", difficulty: 'easy' },
        { question: "Why was the QWERTY keyboard designed this way?", options: ["Make typing faster", "Slow typists down to prevent key jamming", "Match alphabetical order", "Be ergonomic"], correctAnswer: 1, explanation: "QWERTY was designed to slow typists down, placing common letter pairs far apart to prevent mechanical key jamming.", difficulty: 'hard' },
        { question: "What shift did the telephone represent vs telegraph?", options: ["Public to private", "Impersonal dots to direct personal voice", "Expensive to cheap", "Slow to fast"], correctAnswer: 1, explanation: "The telephone shifted from impersonal telegraph dots to direct, personal voice connection.", difficulty: 'medium' },
        { question: "What did the phonograph conquer for the first time?", options: ["Distance", "Time", "The ephemeral nature of sound", "Language barriers"], correctAnswer: 2, explanation: "The phonograph conquered sound's ephemeral nature - sound could now be captured and replayed.", difficulty: 'easy' }
    ]),

    createQuiz(7, 'The Broadcast Era', "Experience mass broadcast entertainment", [
        { question: "What caused panic during the 1938 'War of the Worlds' broadcast?", options: ["Announced a real war", "Performed as realistic news bulletins about Martians", "Predicted the future", "Was too loud"], correctAnswer: 1, explanation: "Orson Welles' broadcast was so realistic as news bulletins that thousands believed a real Martian invasion was happening.", difficulty: 'medium' },
        { question: "Where does the movie term 'blockbuster' come from?", options: ["Blocking streets with crowds", "WWII bombs destroying a city block", "Breaking box office records", "Blocking out other films"], correctAnswer: 1, explanation: "From WWII bombs powerful enough to destroy a block, later used for films with lines stretching around the block.", difficulty: 'hard' },
        { question: "Who was the first TV star?", options: ["A news anchor", "Felix the Cat", "Mickey Mouse", "A comedian"], correctAnswer: 1, explanation: "In 1928, RCA used a Felix the Cat statue for their first experimental TV broadcasts.", difficulty: 'medium' },
        { question: "What made silent films a 'universal language'?", options: ["Subtitles in all languages", "Only visual composition without spoken words", "Shown worldwide", "Free to watch"], correctAnswer: 1, explanation: "Silent films relied entirely on visual composition and motion without spoken words, captivating audiences worldwide.", difficulty: 'easy' },
        { question: "What innovation did 'talkies' bring to cinema?", options: ["Color film", "Synchronized sound revolutionizing the industry", "3D effects", "Longer films"], correctAnswer: 1, explanation: "Talkies brought synchronized sound, completely changing the language of cinema overnight.", difficulty: 'easy' }
    ]),

    createQuiz(8, 'Media, War & Persuasion', "Understand media's power to shape opinion", [
        { question: "What percentage of American homes had TV in 1950 vs 1960?", options: ["9% to 50%", "9% to 90%", "25% to 75%", "50% to 100%"], correctAnswer: 1, explanation: "In 1950, only 9% had TV. By 1955 it was 64%, and by 1960 nearly 90%.", difficulty: 'medium' },
        { question: "What was significant about the 1960 Kennedy-Nixon debate?", options: ["First debate ever", "Radio listeners thought Nixon won, TV viewers thought Kennedy won", "It was in color", "It lasted 5 hours"], correctAnswer: 1, explanation: "Radio listeners thought Nixon won on arguments, but TV viewers saw a calm Kennedy vs sweating Nixon.", difficulty: 'hard' },
        { question: "When did the first singing radio commercial air?", options: ["1920", "1926", "1935", "1945"], correctAnswer: 1, explanation: "The first jingle aired Christmas Eve 1926 for Wheaties cereal, saving the brand from discontinuation.", difficulty: 'medium' },
        { question: "What did newsreels represent in media evolution?", options: ["First newspapers", "Beginning of video journalism shaping public opinion", "First movies", "Radio news"], correctAnswer: 1, explanation: "Newsreels were the beginning of video journalism, using edited moving images to shape public opinion.", difficulty: 'easy' },
        { question: "What was the purpose of propaganda posters?", options: ["Decoration", "Instant emotional impact bypassing rational thought", "Teaching art", "Selling products"], correctAnswer: 1, explanation: "Propaganda posters used simple imagery for instant emotional impact, designed to control thought and behavior.", difficulty: 'easy' }
    ]),

    createQuiz(9, 'The Technicolor Age', "Experience the shift to color media", [
        { question: "What percentage of homes had color TV in 1964 vs 1972?", options: ["3% to 25%", "3% to 50%", "10% to 75%", "25% to 90%"], correctAnswer: 1, explanation: "In 1964, only 3% had color TV. By 1972, 50% did, marking the end of the black-and-white era.", difficulty: 'medium' },
        { question: "What drove color TV sales in the 1960s?", options: ["Lower prices", "Disney's 'Wonderful World of Color' showing vibrant content", "Government mandate", "Sports broadcasts"], correctAnswer: 1, explanation: "NBC's 'Walt Disney's Wonderful World of Color' showcased vibrant nature docs and cartoons that looked dull in B&W.", difficulty: 'medium' },
        { question: "What did glossy magazines like Life create?", options: ["First magazines", "Golden age of photojournalism using powerful images", "First color printing", "Digital photography"], correctAnswer: 1, explanation: "Glossy magazines created the golden age of photojournalism, using powerful images to tell stories and shape culture.", difficulty: 'easy' },
        { question: "What was the purpose of radio soap operas?", options: ["Sell soap", "Serialized drama keeping loyal audiences tuning in daily", "Teach morals", "News reporting"], correctAnswer: 1, explanation: "Soap operas were serialized dramas with cliffhangers, keeping audiences tuning in daily - the beginning of targeted programming.", difficulty: 'medium' },
        { question: "What did Saturday morning cartoons create?", options: ["First animations", "Powerful lifelong connections to characters and brands", "Educational content", "News for children"], correctAnswer: 1, explanation: "Cartoons became a cultural ritual creating powerful, lifelong connections to characters and brands for generations.", difficulty: 'easy' }
    ]),

    createQuiz(10, 'The Digital Dawn', "Enter the age of computers and internet", [
        { question: "Why was the @ symbol chosen for email in 1971?", options: ["It looked cool", "It was uncommon and wouldn't appear in names", "It meant 'at'", "It was easy to type"], correctAnswer: 1, explanation: "Ray Tomlinson chose @ because it was uncommon and wouldn't appear in anyone's name, perfect for separating user from server.", difficulty: 'hard' },
        { question: "Why did the first Pong arcade game stop working?", options: ["Power failure", "Coin mechanism jammed full of quarters", "Broken screen", "Software bug"], correctAnswer: 1, explanation: "Pong stopped working because the coin mechanism was so jammed full of quarters it couldn't accept any more!", difficulty: 'medium' },
        { question: "What was the first photo uploaded to the World Wide Web?", options: ["A landscape", "Les Horribles Cernettes band at CERN", "A cat", "The CERN logo"], correctAnswer: 1, explanation: "The first web photo was of 'Les Horribles Cernettes,' a comedy band made up of CERN employees where the web was invented.", difficulty: 'hard' },
        { question: "What did Pong represent in media evolution?", options: ["First video game", "First time actively interacting with screen pixels in real-time", "First computer", "First arcade"], correctAnswer: 1, explanation: "Pong was revolutionary - for the first time, you weren't just consuming media but actively interacting with it in real-time.", difficulty: 'medium' },
        { question: "What was the 'killer app' that drove internet adoption?", options: ["Web browsing", "Email - instant written communication", "Online shopping", "Social media"], correctAnswer: 1, explanation: "Email was the killer app, blending the immediacy of phone calls with the thoughtfulness of written letters.", difficulty: 'easy' }
    ]),

    createQuiz(11, 'Web 2.0 Revolution', "Master user-generated content era", [
        { question: "What was the first video uploaded to YouTube?", options: ["A music video", "'Me at the zoo' with co-founder Jawed Karim", "A cat video", "A news clip"], correctAnswer: 1, explanation: "The first YouTube video (April 23, 2005) was 'Me at the zoo,' an 18-second clip of co-founder Jawed Karim at an elephant enclosure.", difficulty: 'medium' },
        { question: "What was Facebook's Like button originally called?", options: ["Love", "Awesome", "Cool", "Great"], correctAnswer: 1, explanation: "Facebook's Like button was originally developed under the name 'Awesome' before the team settled on 'Like.'", difficulty: 'hard' },
        { question: "How did Wikipedia compare to Britannica in a 2005 study?", options: ["Much less accurate", "Remarkably close in accuracy", "Exactly the same", "Much more accurate"], correctAnswer: 1, explanation: "A 2005 Nature study found Wikipedia remarkably close to Britannica: 4 errors per article vs 3 for Britannica.", difficulty: 'medium' },
        { question: "What did YouTube represent in media evolution?", options: ["First videos online", "Democratization of television - anyone could broadcast", "First streaming", "First user content"], correctAnswer: 1, explanation: "YouTube democratized television - the barrier to broadcasting was eliminated, anyone with a camera could have a global audience.", difficulty: 'easy' },
        { question: "What did blogs give to individuals?", options: ["Free websites", "A voice and challenge to mainstream media authority", "Money", "Fame"], correctAnswer: 1, explanation: "Blogs gave individuals a voice and directly challenged mainstream media authority, decentralizing public discourse.", difficulty: 'easy' }
    ]),

    createQuiz(12, 'Mobile Revolution', "Experience communication in your pocket", [
        { question: "What was the first SMS text message?", options: ["'Hello'", "'Merry Christmas'", "'Test message'", "'Happy New Year'"], correctAnswer: 1, explanation: "The first SMS was sent December 3, 1992, from an engineer's computer to a director's phone: 'Merry Christmas.'", difficulty: 'medium' },
        { question: "What does 'emoji' mean in Japanese?", options: ["'Happy face'", "'Picture character'", "'Small icon'", "'Digital symbol'"], correctAnswer: 1, explanation: "Emoji is Japanese for e ('picture') + moji ('character'). The original 176 emojis from 1999 are now in MoMA.", difficulty: 'hard' },
        { question: "How many apps did the Apple App Store launch with in 2008?", options: ["50 apps", "500 apps", "5,000 apps", "50,000 apps"], correctAnswer: 1, explanation: "The App Store launched with just 500 apps. Today there are millions, with 200 billion downloads annually.", difficulty: 'medium' },
        { question: "What did SMS force with its 160-character limit?", options: ["Shorter messages", "A new abbreviated language (LOL, BRB)", "Less communication", "Phone calls instead"], correctAnswer: 1, explanation: "SMS's 160-character limit forced a new abbreviated language ('LOL,' 'BRB'), creating the mobile-first era.", difficulty: 'easy' },
        { question: "What did Instagram represent in visual culture?", options: ["First photo app", "Pinnacle of visual personal branding and highlight reel culture", "First filters", "First social media"], correctAnswer: 1, explanation: "Instagram was the pinnacle of visual personal branding, creating a 'highlight reel' culture with curated, filtered moments.", difficulty: 'easy' }
    ]),

    createQuiz(13, 'Immersive Media', "Explore VR, AR, and on-demand content", [
        { question: "Where does the term 'podcast' come from?", options: ["'Pod' + 'cast'", "'iPod' + 'broadcast'", "'Portable' + 'broadcast'", "'Personal' + 'podcast'"], correctAnswer: 1, explanation: "Coined in 2004, 'podcast' blends 'iPod' and 'broadcast.' Today there are 3+ million podcasts in 100+ languages.", difficulty: 'medium' },
        { question: "What was the first VR headset called and why?", options: ["'The Future' - it was futuristic", "'The Sword of Damocles' - so heavy it hung from ceiling", "'The Vision' - it showed visions", "'The Helmet' - it looked like one"], correctAnswer: 1, explanation: "The 1968 'Sword of Damocles' was so enormous and heavy it had to be suspended from the ceiling by a mechanical arm.", difficulty: 'hard' },
        { question: "What impact did Pokémon Go have in 2016?", options: ["Made AR popular", "Downloaded 500M times, increased physical activity and traffic accidents", "First mobile game", "Invented AR"], correctAnswer: 1, explanation: "Pokémon Go was downloaded 500M+ times in 2 months, causing measurable increases in physical activity and, unfortunately, traffic accidents.", difficulty: 'medium' },
        { question: "What did podcasts represent as a medium?", options: ["First audio content", "Return to 'theater of the mind' but personalized and on-demand", "Radio replacement", "Music streaming"], correctAnswer: 1, explanation: "Podcasts were a return to the 'theater of the mind' like radio, but now personalized, portable, and on-demand.", difficulty: 'easy' },
        { question: "What did livestreaming create?", options: ["First live content", "Fusion of broadcast and community with interactive creator-fan relationships", "First video", "TV replacement"], correctAnswer: 1, explanation: "Livestreaming fused broadcast with community, creating powerful interactive relationships between creators and fans in real-time.", difficulty: 'easy' }
    ]),

    createQuiz(14, 'Future of Communication', "Envision AI, neural interfaces, and beyond", [
        { question: "How much data will be created worldwide in 2025?", options: ["18 zettabytes", "181 zettabytes", "1,810 zettabytes", "18,100 zettabytes"], correctAnswer: 1, explanation: "In 2025, 181 zettabytes of data will be created. On Blu-rays, that stack would reach the moon 23 times!", difficulty: 'hard' },
        { question: "How fast can modern AI create a high-resolution image?", options: ["Under 10 seconds", "Under 60 seconds", "Under 5 minutes", "Under 30 minutes"], correctAnswer: 1, explanation: "Modern AI can create a completely novel, high-resolution image from text in under 60 seconds - a task taking humans hours or days.", difficulty: 'medium' },
        { question: "How fast can experimental BCIs decode thoughts into speech?", options: ["10 words per minute", "30 words per minute", "Over 60 words per minute", "Over 100 words per minute"], correctAnswer: 2, explanation: "Experimental Brain-Computer Interfaces can decode thoughts into speech at over 60 words per minute, approaching natural conversation speed.", difficulty: 'medium' },
        { question: "What does the personalized AI feed in 2050 represent?", options: ["Better recommendations", "Ultimate filter bubble knowing what you need before you do", "Faster internet", "More content"], correctAnswer: 1, explanation: "The future personalized feed is the ultimate 'filter bubble' - AI understanding your state in real-time, knowing what you need before you do.", difficulty: 'easy' },
        { question: "What is the ultimate purpose of all media throughout history?", options: ["Entertainment", "To conquer forgetting and share experience", "Making money", "Education"], correctAnswer: 1, explanation: "The ultimate purpose of all media has been to conquer forgetting and share experience - from cave handprints to living holographic memories.", difficulty: 'easy' }
    ])
];
