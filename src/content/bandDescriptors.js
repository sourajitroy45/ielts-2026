// Condensed from the official IELTS Writing Band Descriptors (public
// version, updated May 2023, ielts.org/cdn/Guides/ielts-writing-band-descriptors.pdf)
// and the official IELTS Speaking Band Descriptors (public version,
// ielts.org). Used as a self-assessment calibration reference — read the
// Band 9 and Band 7 wording side by side and ask honestly which one
// describes what you just wrote/said, not which one you'd like to be true.

export const WRITING_BAND_DESCRIPTORS = {
  tr: {
    label: 'Task Response',
    9: 'The prompt is addressed and explored in depth. A clear, fully developed position directly answers the question. Ideas are relevant, fully extended, and well supported. Lapses in content are extremely rare.',
    7: 'The main parts of the prompt are addressed. A clear position is presented, but there may be a tendency to over-generalise, or a lack of focus and precision in supporting ideas.',
  },
  cc: {
    label: 'Coherence & Cohesion',
    9: 'The message can be followed effortlessly. Cohesion very rarely attracts attention on its own. Paragraphing is skilfully managed.',
    7: 'Information is logically organised with a clear progression, though a few lapses may occur. A range of cohesive devices is used flexibly, but with some inaccuracy or over/under-use.',
  },
  lr: {
    label: 'Lexical Resource',
    9: 'A wide range of vocabulary is used accurately and appropriately, with very natural and sophisticated control. Minor spelling/word-formation errors are extremely rare.',
    7: 'The resource allows some flexibility and precision, with some ability to use less common or idiomatic items. An awareness of style and collocation is evident, though inappropriacies occur.',
  },
  gra: {
    label: 'Grammatical Range & Accuracy',
    9: 'A wide range of structures is used with full flexibility and control. Punctuation and grammar are used appropriately throughout; minor errors are extremely rare.',
    7: 'A variety of complex structures is used with some flexibility and accuracy. Grammar and punctuation are generally well controlled, and error-free sentences are frequent, but a few errors may persist.',
  },
}

export const SPEAKING_BAND_DESCRIPTORS = {
  fc: {
    label: 'Fluency & Coherence',
    9: 'Fluent with only very occasional repetition or self-correction; hesitation, if any, is only to prepare content, not to search for words or grammar. Speech is fully coherent and appropriately extended.',
    7: 'Speaks at length without noticeable effort, with some flexibility and use of connectives and discourse markers, though not always appropriately.',
  },
  lr: {
    label: 'Lexical Resource',
    9: 'Total flexibility and precise, natural use in all contexts, with sustained use of accurate and idiomatic language.',
    7: 'Flexible vocabulary to discuss a variety of topics; uses some less common and idiomatic vocabulary, with some awareness of style, though inappropriate choices occur.',
  },
  gra: {
    label: 'Grammatical Range',
    9: 'Structures are precise and accurate at all times, apart from slips characteristic of native-speaker speech.',
    7: 'A range of structures flexibly used; error-free sentences are frequent, though some grammatical mistakes persist.',
  },
  pron: {
    label: 'Pronunciation',
    9: 'Uses a full range of phonological features with precision and subtlety; effortlessly understood throughout.',
    7: 'Shows all the positive features of Band 6, and some, but not all, of the positive features of Band 8 — generally easy to understand, with L1 accent having minimal effect.',
  },
}

// The 5 official Task 2 essay types — used to label prompts and help you
// recognise which pattern you're facing before you plan your response.
export const TASK2_ESSAY_TYPES = {
  opinion: 'Opinion (Agree/Disagree)',
  discussion: 'Discussion (Discuss both views)',
  'problem-solution': 'Problem & Solution',
  'advantage-disadvantage': 'Advantages & Disadvantages',
  'two-part': 'Two-Part / Direct Question',
}
