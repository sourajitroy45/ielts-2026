// Concise, technique-level study material per section — synthesized from
// converging advice across established IELTS prep sources, expert write-ups
// (IELTS Liz, IELTS Buddy, Cathoven, ieltsetc), and community discussion
// (Reddit r/IELTS threads on timing/prediction). These are stable,
// well-corroborated techniques, not "2026 pattern" claims — see the
// research note in CLAUDE.md for why that distinction matters here.

export const TECHNIQUES = {
  reading: {
    title: 'Faster Reading Techniques',
    timeManagement: '~20 min/passage (60 min ÷ 3) — but bank extra time for Passage 3: try 17 / 20 / 23 min, since difficulty rises through the test. Leave last 1-2 min to transfer answers.',
    items: [
      {
        name: 'Questions before passage',
        description: 'Read the questions first, not the passage. You read far more efficiently when you already know what you\'re hunting for.',
      },
      {
        name: 'Skim for the map, not the meaning',
        description: 'Spend 30-45 seconds reading only the first sentence of each paragraph before answering anything. You\'re building a mental map of where things are, not understanding every detail yet.',
      },
      {
        name: 'Predict the paraphrase',
        description: 'The passage almost never uses the question\'s exact wording. Before scanning, ask "what synonym or rephrasing might they use for this?" — that\'s the actual skill being tested.',
      },
      {
        name: 'True/False vs. Not Given',
        description: 'The single most common error at Band 6-7: False means the passage contradicts the statement. Not Given means the passage simply never addresses it. If you can\'t point to the sentence that contradicts it, it\'s Not Given, not False.',
      },
      {
        name: 'Matching Headings ≠ keyword spotting',
        description: 'Distractor headings deliberately reuse a keyword from the paragraph without capturing its main idea. Identify what the paragraph is actually arguing, not just which words appear in it.',
      },
      {
        name: 'Scan once per passage, not once per question',
        description: 'For Matching Information questions, work through the passage once in order and note which paragraph answers which question as you go, rather than re-scanning from the top for every question.',
      },
    ],
  },

  listening: {
    title: 'Faster Listening Techniques',
    timeManagement: 'Use every gap before a section starts to read ahead — you get set-up time before each section and a short pause between Sections 2→3 and 3→4. That reading-ahead window is the highest-leverage moment in the whole test.',
    items: [
      {
        name: 'Predict before you hear it',
        description: 'From the question\'s grammar alone, predict what kind of answer is coming: a blank after "in ___" often wants a year or month; "the total cost is ___" wants a number; "she is training to be a ___" wants a job title.',
      },
      {
        name: 'Listen for signposts',
        description: 'Discourse markers like "however", "actually", "the main thing is" flag a shift toward the real answer, often right after a distractor has just been mentioned.',
      },
      {
        name: 'Take the correction, not the first answer',
        description: "This test loves the pattern 'it's $130 — actually, sorry, it's $145.' Always write down the corrected, final value, not the first one you hear.",
      },
      {
        name: "Don't freeze on a miss",
        description: "If your prediction was wrong or you missed an answer, let it go immediately and refocus on the next question. Dwelling on one blank costs you the next two.",
      },
      {
        name: 'Respect the word limit exactly',
        description: '"NO MORE THAN TWO WORDS" is graded literally — a correct answer that breaks the limit is marked wrong. Count before you write.',
      },
      {
        name: 'Never leave a blank',
        description: "There's no penalty for a wrong answer, so a best guess always beats an empty box — guess the word type (noun/number/name) even under time pressure.",
      },
    ],
  },

  writing: {
    title: 'Faster Writing Techniques',
    timeManagement: 'Task 1: ~20 min (5 plan, 13 write, 2 check). Task 2: ~40 min (4-5 plan — write your thesis + 2 topic sentences first, ~30 write, ~5 check). Planning feels like lost time; it saves far more than it costs.',
    items: [
      {
        name: 'Overview first in Task 1',
        description: "State the 1-2 biggest overall trends in their own short paragraph before any supporting detail. Skipping this is one of the most common ways candidates lose Task Achievement marks even with accurate detail.",
      },
      {
        name: 'PEEL your body paragraphs',
        description: 'Point (your claim) → Explain (why it\'s true) → Example (specific evidence) → Link (back to the question). This structure maps directly onto what the Coherence & Task Response descriptors reward.',
      },
      {
        name: 'Precision over length',
        description: 'Target ~270-290 words for Task 2, not 400+. Band 9 rewards ideas that are "fully extended and well supported" — padding with repetition doesn\'t raise Task Response, and it eats time you need for checking.',
      },
      {
        name: 'No visible templates',
        description: 'Examiners are specifically trained to penalize memorised openings ("Nowadays, it is often argued that...") and formulaic structures. A response that sounds rehearsed gets capped on Task Response regardless of grammar quality.',
      },
      {
        name: 'Vary your sentence openings',
        description: "If every sentence starts with 'I think' or 'Firstly/Secondly/Thirdly', it reads as mechanical. Mix subject position, use participle clauses, front an adverbial occasionally.",
      },
      {
        name: 'Save 2 minutes to proofread',
        description: 'At every band level, the most common slips are articles (a/the), prepositions, and subject-verb agreement — quick to fix if you budget time to actually look for them.',
      },
    ],
  },

  speaking: {
    title: 'Faster Speaking Techniques',
    timeManagement: 'Part 2 prep is only 60 seconds — use it for 4-5 keyword notes against each bullet point, not full sentences. Writing sentences wastes prep time you need for thinking, and reading from notes sounds scripted.',
    items: [
      {
        name: 'Replace fillers with thinking phrases',
        description: '"Um" and "uh" register as hesitation. A phrase like "That\'s an interesting question, let me think about that for a second" buys the same time but is itself fluent, natural English.',
      },
      {
        name: 'Extend with reason + example',
        description: "A one-sentence answer to a Part 1 or Part 3 question caps Fluency & Coherence regardless of grammar. Add why, then a specific example — that's the extension the criteria actually reward.",
      },
      {
        name: "Self-correction is fine — suppressing it isn't the goal",
        description: 'The official Band 9 descriptor explicitly allows "very occasional self-correction." Sounding robotically perfect is not what\'s being tested — natural, in-flight correction ("actually, I mean...") is normal fluent speech.',
      },
      {
        name: 'Commit to a position in Part 3',
        description: 'Abstract, hypothetical questions reward a specific, developed opinion, not a hedge like "it depends on the situation" left unexplained. Pick a side, then explain the reasoning.',
      },
      {
        name: 'Pace over speed',
        description: "Talking fast doesn't raise Fluency & Coherence — clarity and natural rhythm do. A measured pace also reduces pronunciation slips that creep in under rushed delivery.",
      },
      {
        name: 'Use precise vocabulary, not impressive vocabulary',
        description: 'A common, exactly-right word choice outscores a rare word used slightly wrong. Lexical Resource rewards accurate, natural use — not vocabulary for its own sake.',
      },
    ],
  },
}
