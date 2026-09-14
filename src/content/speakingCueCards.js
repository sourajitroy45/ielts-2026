// Speaking practice sets: each bundles a few Part 1 questions, a Part 2 cue
// card, and related Part 3 discussion questions on a shared theme. Part 3
// includes at least one hypothetical or comparative question — the abstract
// reasoning under time pressure that separates Band 7-8 from Band 9 more
// than vocabulary alone does.

export const SPEAKING_SETS = [
  {
    id: 'sp-1',
    theme: 'Hometown & Living',
    band9Tip: 'A Band 9 answer here sounds unrehearsed even on a familiar topic — vary your sentence openings instead of starting every answer the same way.',
    part1: [
      'Can you describe the town or city where you grew up?',
      'What do you like most about living there?',
      'Has your hometown changed much in recent years?',
    ],
    part2: {
      title: 'Describe a place you would like to live in the future.',
      bullets: ['where it is', 'what it is like', 'why you would like to live there', 'and explain how you feel about this place'],
      prepSeconds: 60,
      speakSeconds: 120,
    },
    part3: [
      'What are the advantages and disadvantages of living in a big city compared to a small town?',
      'How do you think cities will change over the next 20 years?',
      'Why do some people prefer to stay in their hometown their whole life?',
      'If you could redesign your hometown from scratch, what is the first thing you would change, and why?',
    ],
  },
  {
    id: 'sp-2',
    theme: 'Work & Study',
    band9Tip: 'Avoid pre-loaded phrases that sound memorised ("Well, that\'s a very interesting question..."). At Band 9, hesitation is used to think, not to stall.',
    part1: [
      'Do you work or are you a student?',
      'What do you like about your job or your studies?',
      'What was your first day like?',
    ],
    part2: {
      title: 'Describe a skill you would like to learn.',
      bullets: ['what the skill is', 'how you would learn it', 'how long it would take', 'and explain why you want to learn this skill'],
      prepSeconds: 60,
      speakSeconds: 120,
    },
    part3: [
      'Do you think adults should keep learning new skills throughout their lives?',
      'How has technology changed the way people learn skills?',
      'Is it better to learn a skill formally, through a course, or informally, by practicing alone?',
      'If schools only had time to teach a handful of skills for the future, which would you prioritise, and why?',
    ],
  },
  {
    id: 'sp-3',
    theme: 'Technology',
    band9Tip: 'Precise, idiomatic language beats impressive-sounding vocabulary used loosely — "take something for granted" used correctly outscores a rare word used wrongly.',
    part1: [
      'How often do you use your smartphone?',
      'What apps do you use most often?',
      'Do you think you spend too much time on technology?',
    ],
    part2: {
      title: 'Describe a piece of technology you find useful.',
      bullets: ['what it is', 'how often you use it', 'how you learned to use it', 'and explain why you find it useful'],
      prepSeconds: 60,
      speakSeconds: 120,
    },
    part3: [
      'How has technology changed the way people communicate with each other?',
      'Do you think older people find it harder to adapt to new technology? Why?',
      'What technology do you think will be common in 20 years that isn\'t common now?',
      'Would society be better or worse off if a major technology like the internet suddenly stopped working for a month? Why?',
    ],
  },
  {
    id: 'sp-4',
    theme: 'Food & Health',
    band9Tip: 'Extend Part 3 answers by adding a reason, then a consequence, then (if relevant) an exception — not just a longer list of examples.',
    part1: [
      'What is your favorite type of food?',
      'Do you prefer cooking at home or eating out?',
      'Have your eating habits changed over the years?',
    ],
    part2: {
      title: 'Describe a meal you really enjoyed.',
      bullets: ['what the meal was', 'where you ate it', 'who you were with', 'and explain why you enjoyed it so much'],
      prepSeconds: 60,
      speakSeconds: 120,
    },
    part3: [
      "Do you think people's diets have become healthier or less healthy in recent years?",
      'Why do you think fast food has become so popular around the world?',
      'Should governments try to influence what people eat? How?',
      'If you compare eating habits today with those of your grandparents\' generation, what would you say is the single biggest difference?',
    ],
  },
  {
    id: 'sp-5',
    theme: 'Environment',
    band9Tip: 'Abstract topics reward a clear structural signal ("There are really two separate issues here...") — this is coherence, one of the 4 official criteria, in action.',
    part1: [
      'Do you do anything to help protect the environment?',
      'What environmental problems are common in your country?',
      'Do you recycle at home?',
    ],
    part2: {
      title: 'Describe an environmental problem in your local area.',
      bullets: ['what the problem is', 'what causes it', 'who is affected by it', 'and explain what could be done to solve it'],
      prepSeconds: 60,
      speakSeconds: 120,
    },
    part3: [
      'Who should be mainly responsible for protecting the environment — individuals, governments, or companies?',
      'Do you think environmental problems will get better or worse in the future?',
      'Are people in your country generally aware of environmental issues?',
      'If protecting the environment meant a noticeably lower standard of living for everyone, do you think most people would still support it?',
    ],
  },
  {
    id: 'sp-6',
    theme: 'Media & Entertainment',
    band9Tip: 'Natural speech includes self-correction ("actually, I think it\'s more that...") — don\'t suppress it chasing a flawless-sounding script.',
    part1: [
      'What kind of films or shows do you enjoy watching?',
      'Do you prefer watching content alone or with others?',
      'How do you usually decide what to watch?',
    ],
    part2: {
      title: 'Describe a film or TV show that made a strong impression on you.',
      bullets: ['what it was about', 'when you watched it', 'who you watched it with', 'and explain why it made a strong impression'],
      prepSeconds: 60,
      speakSeconds: 120,
    },
    part3: [
      'How has the way people watch films and TV changed in recent years?',
      'Do you think streaming services have had a positive or negative effect on the film industry?',
      'Should there be more regulation of content that children can access online?',
      'Imagine streaming services disappeared tomorrow and everyone went back to scheduled broadcast TV — what would change about how people watch things together?',
    ],
  },
  {
    id: 'sp-7',
    theme: 'Travel & Culture',
    band9Tip: 'Idiomatic language should feel effortless, not inserted for effect — if a phrase feels like you\'re "using" it rather than just saying it, simplify instead.',
    part1: [
      'Do you enjoy traveling to new places?',
      'What was the last trip you took?',
      'Do you prefer traveling alone or with other people?',
    ],
    part2: {
      title: 'Describe a place you have visited that you would recommend to others.',
      bullets: ['where it is', 'when you went there', 'what you did there', 'and explain why you would recommend it'],
      prepSeconds: 60,
      speakSeconds: 120,
    },
    part3: [
      'What are the benefits of traveling to other countries?',
      'Do you think tourism can have negative effects on local culture?',
      'How has international travel changed over the past few decades?',
      'Some argue that mass tourism is slowly making destinations around the world feel more similar to each other. Do you agree?',
    ],
  },
  {
    id: 'sp-8',
    theme: 'Society & Change',
    band9Tip: 'This is the most abstract set — resist retreating to vague generalities ("things are changing fast"); a Band 9 answer commits to a specific claim and defends it.',
    part1: [
      'Do you think your society has changed much in the last ten years?',
      'What is one change you would like to see in your community?',
      'Are you generally optimistic about the future?',
    ],
    part2: {
      title: 'Describe a change that has had a positive effect on your community.',
      bullets: ['what the change was', 'when it happened', 'who was involved in making the change', 'and explain why it had a positive effect'],
      prepSeconds: 60,
      speakSeconds: 120,
    },
    part3: [
      'What kinds of changes are hardest for communities to accept?',
      'Should decisions about a local community be made by residents or by the government?',
      'Do you think younger and older generations view change differently? Why?',
      'Is rapid change generally a sign of progress, or can a society change too quickly for its own good?',
    ],
  },
]
