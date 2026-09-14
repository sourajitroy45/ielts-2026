// Original listening scripts, read aloud in-app via the Web Speech API to
// simulate the 4 IELTS Listening sections. Each includes at least one
// classic IELTS distractor (information stated, then corrected) and
// questions that paraphrase the text rather than quoting it directly.

export const LISTENING_SCRIPTS = [
  {
    id: 'ls-1',
    section: 1,
    title: 'Booking a Hotel Room',
    type: 'Everyday conversation',
    text: `Good morning, Lakeside Hotel, how can I help you? Hi, I'd like to book a room for three nights, arriving on the twelfth of March. Let me check. We do have availability — would you like a single or a double room? A double, please, with a view of the lake if possible. Okay, so that would be our Deluxe Lake View room. The rate is one hundred and thirty dollars a night — actually, sorry, let me correct that, the lake view rooms went up last week, it's one hundred and forty five a night now. That's fine. Would you like breakfast included? That's normally an extra fifteen dollars per person per day. Yes, please add breakfast for one. Right, so with breakfast that brings your total to four hundred and sixty five dollars for the three nights. Can I take your name and a contact number? Yes, it's Daniel Osei — O, S, E, I. And the number is oh seven nine, double two five, one one four four. And could I get an email for the confirmation? It's daniel dot osei, all one word, at fastmail dot com — not gmail, fastmail. Got it. One more thing, is there parking available? Yes, there's a car park, but note it's not free — it's an extra eight dollars a night, paid at reception. Understood. So to confirm: Deluxe Lake View, three nights from the twelfth, breakfast for one included, total four hundred sixty five dollars, and parking is separate if needed. That's correct. You'll get a confirmation email shortly. Thank you.`,
    questions: [
      { id: 'q1', type: 'short', prompt: 'How many nights is the booking for?', answer: '3' },
      { id: 'q2', type: 'short', prompt: 'What is the nightly rate finally confirmed for the room (not the first price mentioned)?', answer: '$145' },
      { id: 'q3', type: 'short', prompt: 'What is the total cost quoted, including breakfast?', answer: '$465' },
      { id: 'q4', type: 'short', prompt: "How is the guest's surname spelled?", answer: 'OSEI' },
      { id: 'q5', type: 'mcq', prompt: 'What does the receptionist say about parking?', options: ['It is free for guests', 'It costs an extra $8 a night', 'It is not available at all', 'It must be booked in advance'], answer: 'It costs an extra $8 a night' },
    ],
  },
  {
    id: 'ls-2',
    section: 1,
    title: 'Joining a Gym',
    type: 'Everyday conversation',
    text: `Hi there, I'm interested in joining the gym. Sure, we currently have three membership options. There's Basic, at thirty five dollars a month, which covers pool and gym access only. Then Standard, which is fifty dollars and adds unlimited group classes — yoga, spin, boxing, that sort of thing. And Premium at eighty five dollars, which includes two personal training sessions a month on top of everything in Standard. I think Standard sounds right for me. Great choice, that's actually our most popular plan. Now, is there a joining fee? There is normally — it's twenty dollars — but we're waiving that this month if you sign up before Friday. Oh, hang on, actually I need to check that, I think the promotion might have ended yesterday — let me look — no, you're fine, it runs until the end of the month after all, so the fee is waived. Good timing then. Can I take a few details? Date of birth? The third of July, nineteen ninety eight. And any existing injuries we should know about, for the induction? I had a knee injury last year, but it's fully healed now. Noted — we'll still have a trainer check in during your first session just as a precaution, that's standard for anyone with a previous injury, not just you. Understood. Your membership will start this coming Monday, not today, since our system processes new sign-ups overnight. Perfect, thank you.`,
    questions: [
      { id: 'q1', type: 'mcq', prompt: 'Which plan does the caller choose?', options: ['Basic', 'Standard', 'Premium', 'None — they decide to wait'], answer: 'Standard' },
      { id: 'q2', type: 'short', prompt: 'How much does the chosen plan cost per month?', answer: '$50' },
      { id: 'q3', type: 'short', prompt: 'Is the joining fee being charged to this caller?', answer: 'No' },
      { id: 'q4', type: 'short', prompt: 'Which part of the body did the caller previously injure?', answer: 'Knee' },
      { id: 'q5', type: 'short', prompt: 'On what day does the membership actually begin?', answer: 'Monday' },
    ],
  },
  {
    id: 'ls-3',
    section: 2,
    title: 'Museum Tour Introduction',
    type: 'Public announcement / monologue',
    text: `Welcome to the City History Museum. Before we start, a quick overview of today's route. We'll begin on the ground floor in the Ancient Trade gallery, home to artifacts recovered from the old harbor — coins, pottery, that kind of thing, dating back over a thousand years. From there we'll head up to the Industrial Revolution wing on the second floor. Normally we'd take the lift, but it's out of service for maintenance today, so we'll use the staircase near the main entrance instead. Now, I did say we'd finish in the Modern City exhibit on the third floor — actually, that's changed for today only, since that room is being used for a private event this afternoon, so instead we'll finish back on the ground floor in the Maritime Room. Apologies for the change. Photography is permitted throughout, but please switch off your camera flash — it can damage some of the older textiles, particularly in the Trade gallery. The tour runs about ninety minutes, with a short break in the café roughly halfway through, after the Industrial Revolution wing. If you need to step out at any point, exit signs are marked in green throughout the building. Restrooms are on the ground floor, next to the gift shop — not the café, which is where people often look first. One last thing: the gift shop closes thirty minutes before the museum, so if you want souvenirs, don't leave it until the very end of the tour. Let's begin.`,
    questions: [
      { id: 'q1', type: 'short', prompt: 'Which gallery does the tour start in?', answer: 'Ancient Trade' },
      { id: 'q2', type: 'short', prompt: 'Why will the group use the stairs instead of the lift?', answer: 'Maintenance' },
      { id: 'q3', type: 'short', prompt: 'Where does the tour actually finish today (not the room originally planned)?', answer: 'Maritime Room' },
      { id: 'q4', type: 'mcq', prompt: 'Where exactly are the restrooms located?', options: ['Next to the café', 'On the third floor', 'Next to the gift shop', 'Near the main entrance'], answer: 'Next to the gift shop' },
      { id: 'q5', type: 'short', prompt: 'When does the break happen relative to the Industrial Revolution wing?', answer: 'After it' },
    ],
  },
  {
    id: 'ls-4',
    section: 2,
    title: 'Community Center Program Overview',
    type: 'Public announcement / monologue',
    text: `Thanks for coming to this evening's session about our new programs. Starting next month, we're running four new weekly activities. Monday evenings, six to eight, there's a beginner pottery class — that one's capped at twelve people, and I'll be honest, based on the interest tonight it will probably fill up fastest. Wednesday afternoons, three to four thirty, we have a gardening club in the community garden behind the building, open to all ages, no registration cap. Thursday evenings is a conversation group for people learning English as a second language — and this is the one that's free, unlike the others, which are fifteen dollars a session. Actually, I should clarify — the pottery class is fifteen dollars per session, but gardening is only ten, since materials are cheaper. So to be clear: Thursday's group is free, gardening is ten dollars, and pottery is fifteen. Finally, Saturday mornings, ten till noon, there's a coding workshop for ages ten to fifteen. Registration for everything opens this Friday through our website — not in person, we've had issues with paper sign-up sheets in the past. If a class fills up, you can join a waiting list and we'll email you if a spot opens. One more note: the center will be closed on the last Monday of the month for the public holiday, so that particular week's pottery class moves to Tuesday instead, same time.`,
    questions: [
      { id: 'q1', type: 'short', prompt: 'On which day does the pottery class run?', answer: 'Monday' },
      { id: 'q2', type: 'short', prompt: 'Which program has no participant cap at all?', answer: 'Gardening club' },
      { id: 'q3', type: 'short', prompt: 'How much does the gardening club cost per session?', answer: '$10' },
      { id: 'q4', type: 'short', prompt: 'How should people register for the programs?', answer: 'Through the website' },
      { id: 'q5', type: 'mcq', prompt: 'Why is that week\'s pottery class rescheduled to Tuesday?', options: ['Low enrollment', 'A public holiday', 'The instructor is unavailable', 'Room maintenance'], answer: 'A public holiday' },
    ],
  },
  {
    id: 'ls-5',
    section: 3,
    title: 'Discussing a Group Assignment',
    type: 'Academic discussion (students)',
    text: `Hey, did you look at the brief for our sociology project? Yeah — I think we need to study one specific community, not just write generally about urbanization. Right, and didn't the tutor also say we need primary data, like an interview? I thought that was optional, actually — let me check my notes — no, you're right, it's required, at least one interview. Good thing you caught that. So what should we study? What about the night market near campus — informal economy, community networks, all of that fits well. I like it, but can we actually approach vendors directly? Some might not want to go on record. Fair point — we could offer anonymity in the write-up, just refer to them as Vendor A, Vendor B. We could also pull data from the city council's informal trading report for context — that gives us secondary data alongside the interview. Good, so primary and secondary both covered. Now, how do we split the work — by section, or just work through it together in the same room? I'd rather split it, my schedule's tight this week — actually, wait, I just remembered I'm free Thursday after all, so maybe we could meet then instead of splitting everything. Okay, let's do a bit of both — I'll do the interview and background research alone, then we meet Thursday to draft the analysis together once you've sent me your notes. Sounds fair. Let's aim to have a rough draft by Friday, then, giving us the weekend to revise before the deadline.`,
    questions: [
      { id: 'q1', type: 'short', prompt: 'What subject is the assignment for?', answer: 'Sociology' },
      { id: 'q2', type: 'short', prompt: 'What location do they decide to study?', answer: 'Night market' },
      { id: 'q3', type: 'mcq', prompt: 'Is including an interview required or optional, according to the tutor?', options: ['Required', 'Optional', 'Not mentioned', 'Only for extra credit'], answer: 'Required' },
      { id: 'q4', type: 'short', prompt: 'On what day will they meet in person to draft the analysis?', answer: 'Thursday' },
      { id: 'q5', type: 'short', prompt: 'By what day do they now want a rough draft?', answer: 'Friday' },
    ],
  },
  {
    id: 'ls-6',
    section: 3,
    title: 'Meeting with a Thesis Supervisor',
    type: 'Academic discussion (student & tutor)',
    text: `Come in, have a seat. You wanted to talk through your thesis structure? Yes, I've drafted an outline, but I'm unsure about where the literature review fits. Let's see — ah, you've placed it after the methodology. Generally we'd expect it first, since it's what justifies your research questions in the first place. I thought it might feel repetitive placed first. That's a common worry, but as long as your methodology explicitly references gaps the literature review identified, it reads as connected rather than repetitive. Should I bring in more recent sources? Your newest citation is from four years ago — actually, hold on, I'm looking again, it's five years, not four. Either way, try to include at least two or three studies from the last two years — this field moves quickly. I'll search the database again this week. Also, your research question currently spans three age groups, which is broad for a project this size. I'd narrow it to one. That's helpful — I'll focus on university students specifically, then. Good. One more thing — your sample size target of fifty seems low for the statistical test you're proposing; I'd aim for at least eighty if you can manage recruitment. Noted, I'll revise that too. Send me an updated outline by next Friday, and we'll meet again the week after.`,
    questions: [
      { id: 'q1', type: 'mcq', prompt: 'Where does the supervisor say the literature review should go?', options: ['After the methodology', 'Before the methodology', 'At the very end', 'It doesn\'t matter'], answer: 'Before the methodology' },
      { id: 'q2', type: 'short', prompt: "How old is the student's most recent citation, according to the corrected figure?", answer: '5' },
      { id: 'q3', type: 'short', prompt: 'Which single group will the student now focus the research question on?', answer: 'University students' },
      { id: 'q4', type: 'short', prompt: 'What minimum sample size does the supervisor recommend?', answer: '80' },
      { id: 'q5', type: 'short', prompt: 'By when should the revised outline be sent?', answer: 'Next Friday' },
    ],
  },
  {
    id: 'ls-7',
    section: 4,
    title: 'Lecture: Principles of Urban Planning',
    type: 'Academic lecture',
    text: `Today I want to introduce three core principles shaping modern urban planning. The first is density — how many people or buildings occupy a given area. Higher density is often linked to more efficient public transport and lower per-person infrastructure cost, though it has to be balanced against overcrowding and the loss of green space. The second is mixed-use development: combining residential, commercial, and recreational space within one neighborhood rather than separating them strictly, as most twentieth-century zoning did. This reduces commute times and supports local business. The third is connectivity — how easily people move between parts of a city, whether walking, cycling, or by public transport. Now, you might assume that connectivity mainly refers to road networks — that was actually the assumption for most of the twentieth century — but contemporary planners define it more broadly, to include pedestrian and cycling infrastructure specifically, since a city can have excellent roads and still be poorly connected for anyone not driving. Cities with poor connectivity, in this broader sense, tend to see heavier reliance on private cars, increasing both congestion and emissions. It's worth stressing that these three principles interact rather than operate independently: a dense, mixed-use neighborhood with poor connectivity can still function badly, since residents may be unable to reach nearby services efficiently. Planners increasingly treat density, mixed-use design, and connectivity as one integrated framework, rather than three separate goals to pursue one at a time.`,
    questions: [
      { id: 'q1', type: 'short', prompt: 'What is the first principle mentioned in the lecture?', answer: 'Density' },
      { id: 'q2', type: 'mcq', prompt: 'What does mixed-use development combine within one neighborhood?', options: ['Only residential and commercial spaces', 'Residential, commercial, and recreational spaces', 'Only public transport routes', 'Historic and modern buildings'], answer: 'Residential, commercial, and recreational spaces' },
      { id: 'q3', type: 'short', prompt: 'According to contemporary planners, what does connectivity include beyond roads?', answer: 'Pedestrian and cycling infrastructure' },
      { id: 'q4', type: 'short', prompt: 'What two problems does heavy car reliance increase, according to the lecture?', answer: 'Congestion and emissions' },
      { id: 'q5', type: 'short', prompt: 'How does the lecturer say planners now treat the three principles — separately or as what?', answer: 'One integrated framework' },
    ],
  },
  {
    id: 'ls-8',
    section: 4,
    title: 'Lecture: Coral Reef Ecosystems',
    type: 'Academic lecture',
    text: `Coral reefs cover less than one percent of the ocean floor, yet support roughly a quarter of all known marine species — making them among the most biodiverse ecosystems on the planet. This productivity depends on a partnership between coral polyps — tiny animals that build the reef's calcium carbonate structure — and microscopic algae called zooxanthellae living inside their tissue. The algae photosynthesize, providing the coral with energy, while the coral offers a protected, sunlit environment in return. This relationship is highly sensitive to temperature. When water becomes too warm — even just one or two degrees above the normal seasonal maximum — coral polyps expel their algae, a stress response known as bleaching. Now, a common misconception is that bleached coral is already dead — it isn't, not immediately; without the algae the coral loses its color and its main energy source, but it can still recover if temperatures drop again within a few weeks. It's only if warm conditions persist for an extended period that the coral actually dies. Large-scale bleaching events have become more frequent as ocean temperatures rise, with some reef systems losing more than half their coral cover within a single decade. Conservation strategies now include selectively breeding heat-tolerant coral strains, and establishing marine protected areas to reduce additional stressors such as pollution and overfishing — giving reefs a better chance to recover in the gap between successive heat events.`,
    questions: [
      { id: 'q1', type: 'short', prompt: 'Roughly what share of marine species do coral reefs support?', answer: 'A quarter' },
      { id: 'q2', type: 'mcq', prompt: 'What do zooxanthellae provide to coral?', answer: 'Energy through photosynthesis', options: ['Protection from predators', 'Energy through photosynthesis', 'Calcium carbonate', 'Oxygen only'] },
      { id: 'q3', type: 'short', prompt: 'What is the process called when coral expels its algae?', answer: 'Bleaching' },
      { id: 'q4', type: 'short', prompt: 'Is bleached coral necessarily already dead, according to the lecture?', answer: 'No' },
      { id: 'q5', type: 'short', prompt: 'Name one conservation strategy mentioned.', answer: 'Breeding heat-tolerant coral' },
    ],
  },
]
