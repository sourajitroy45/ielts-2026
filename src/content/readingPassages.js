// Original Band-9-calibre reading passages (not sourced from copyrighted
// test material). Paragraphs are lettered (A, B, C...) to support Matching
// Information questions, matching the real test's passage structure.
// Question `label` values name the official IELTS task type for that
// question, even though several share the same underlying UI/grading
// (Matching Information / Matching Sentence Endings / Classification all
// render as a single-choice pick, like Multiple Choice).

export const READING_PASSAGES = [
  {
    id: 'rp-1',
    title: 'The Hidden Life of Urban Bees',
    text: `A  Cities are not the first place people picture when they think of thriving wildlife, yet rooftops and balconies across the world now host thousands of beehives, and municipal apiculture has evolved from a fringe pastime into a genuine policy concern for city planners. The proliferation is driven partly by anxiety over declining bee populations in the countryside, but the underlying ecological logic is more counterintuitive than most newcomers to the hobby expect.

B  Several longitudinal studies now suggest that colonies situated in dense urban cores frequently outperform their rural counterparts on measures of overwinter survival and honey yield. The explanation lies less in the presence of bees than in the absence of monoculture: rural apiaries are often surrounded by a single crop that flowers briefly and is routinely treated with systemic pesticides, whereas urban gardens, verges, and parks sustain a patchwork of flowering species across a far longer season, buffering colonies against the nutritional troughs that plague their rural cousins.

C  This has not gone unnoticed by municipal authorities. A number of major cities now subsidise rooftop hives and have committed to planting pollinator-corridors of native flowering species along arterial roads, framing the initiative as both an ecological and a civic-pride measure. Detractors within the beekeeping fraternity, however, contend that the policy has outpaced the underlying science, and that enthusiasm has begun to curdle into a genuine hazard.

D  Their concern is one of density rather than presence: in postcodes where hive numbers have risen sharply, foraging bees now compete for a finite floral resource, and novice keepers — drawn in by subsidy rather than expertise — can inadvertently become vectors for disease transmission between colonies that would otherwise never interact. Public health entomologists have begun modelling a "carrying capacity" for urban apiculture, a concept borrowed from rangeland ecology and previously unheard of in city planning circles.

E  Most researchers in the field nonetheless remain persuaded that the practice, conducted with appropriate restraint, represents an unusually rare case of a hobby that benefits both the practitioner and the wider ecosystem simultaneously — provided, crucially, that municipal enthusiasm does not once again outstrip the evidence base that ought to guide it.`,
    questions: [
      { id: 'q1', type: 'ynng', label: 'Yes / No / Not Given', prompt: 'Urban bee colonies generally survive winter better than rural colonies, according to the studies mentioned.', answer: 'YES' },
      { id: 'q2', type: 'ynng', label: 'Yes / No / Not Given', prompt: 'The writer believes municipal subsidies for beekeeping should be abolished immediately.', answer: 'NOT GIVEN' },
      { id: 'q3', type: 'mcq', label: 'Matching Information', prompt: 'Which paragraph first introduces a concept borrowed from a different field of ecology?', options: ['Paragraph A', 'Paragraph B', 'Paragraph C', 'Paragraph D'], answer: 'Paragraph D' },
      {
        id: 'q4', type: 'mcq', label: 'Matching Sentence Endings',
        prompt: "Complete the sentence: 'Rural bee colonies are more vulnerable than urban ones partly because...'",
        options: [
          'they are exposed to a wider range of predator species.',
          'they depend on a single crop that blooms briefly and is often treated with pesticides.',
          'they receive less attention from professional beekeepers.',
          'municipal governments do not regulate rural apiaries.',
        ],
        answer: 'they depend on a single crop that blooms briefly and is often treated with pesticides.',
      },
      { id: 'q5', type: 'completion', label: 'Summary Completion', prompt: 'Entomologists have started modelling a "___" for urban beekeeping, adapting a term from rangeland ecology.', answer: 'carrying capacity' },
    ],
  },
  {
    id: 'rp-2',
    title: 'Rethinking Sleep',
    text: `A  For much of the twentieth century, sleep was characterised in physiological textbooks as a passive default state — an absence of wakefulness rather than a process in its own right. Contemporary neuroimaging has overturned this characterisation almost entirely, revealing a brain that is, if anything, more metabolically industrious during certain sleep stages than during ordinary waking cognition.

B  Central to this revision is the glymphatic system, a network of perivascular channels that becomes markedly more active during deep, slow-wave sleep and appears to flush interstitial waste — including misfolded proteins implicated in several neurodegenerative conditions — from brain tissue at a rate roughly commensurate with the rate of production during waking hours. Some researchers now argue, not without controversy, that chronic sleep restriction ought to be reclassified as a public health hazard on a par with poor diet, rather than dismissed as a lifestyle inconvenience.

C  Workplace convention has been slow to absorb this recalibration. Early start times and extended hours persist across most white-collar industries, notwithstanding a substantial evidence base indicating that cognitive performance among adults deteriorates measurably below seven hours of sleep and does not reliably improve beyond nine. A handful of firms have experimented with nap facilities and staggered start times, reporting gains in sustained attention and self-reported mood, though such trials remain a minority practice rather than an emerging norm.

D  Sleep scientists are, however, careful to resist a one-size-fits-all prescription. Individual sleep requirements vary along a distribution wide enough to make any universal numerical target somewhat misleading, and researchers increasingly emphasise sleep architecture — the proportion and timing of deep versus rapid-eye-movement stages — over raw duration as the more reliable predictor of next-day function. Duration alone, in other words, is a coarse proxy for a more intricate underlying process.`,
    questions: [
      { id: 'q1', type: 'tfng', label: 'True / False / Not Given', prompt: 'Neuroimaging research has confirmed that the brain is metabolically less active during deep sleep than while awake.', answer: 'FALSE' },
      { id: 'q2', type: 'tfng', label: 'True / False / Not Given', prompt: 'Every scientist mentioned agrees that sleep deprivation should be treated as a public health hazard.', answer: 'NOT GIVEN' },
      { id: 'q3', type: 'mcq', label: 'Matching Information', prompt: 'In which paragraph does the writer note that individual sleep needs vary too widely for one fixed recommendation?', options: ['Paragraph A', 'Paragraph B', 'Paragraph C', 'Paragraph D'], answer: 'Paragraph D' },
      {
        id: 'q4', type: 'mcq', label: 'Multiple Choice',
        prompt: 'According to the passage, what do sleep scientists now consider a more reliable predictor of next-day function than sleep duration?',
        options: ['Room temperature during sleep', 'The proportion and timing of sleep stages', 'The time of year', 'Caffeine intake the previous day'],
        answer: 'The proportion and timing of sleep stages',
      },
      { id: 'q5', type: 'completion', label: 'Sentence Completion', prompt: 'The glymphatic system removes interstitial waste at a rate roughly commensurate with its rate of ___ during waking hours.', answer: 'production' },
    ],
  },
  {
    id: 'rp-3',
    title: 'The Roads That Built an Empire',
    text: `A  At its territorial peak, the Roman road network extended beyond 400,000 kilometres, linking outposts from northern Britain to the edges of the Sahara. These were not casual dirt tracks: engineers laid successive strata of stone, gravel, and compacted sand, crowning the surface so that rainwater drained laterally — a design principle whose descendants persist in modern highway construction almost unaltered.

B  The network's original impetus was unambiguously military: legions required rapid deployment to defend or extend imperial frontiers, and road-building often preceded, rather than followed, formal annexation of a territory. Commerce and communication, however, colonised the infrastructure almost immediately once it existed, and within a generation the roads had become indispensable to both.

C  Way stations, spaced at calculated intervals, offered fresh mounts and lodging to official couriers, who under favourable conditions could cover roughly eighty kilometres in a single day — a velocity of information transfer unmatched in Europe until the advent of the railway some seventeen centuries later. The economic consequences were considerable: regions with reliable road access saw markets flourish in ways that coastal regions dependent on unpredictable maritime shipping alone could not replicate.

D  Remarkably, fragments of the original paving remain visible in several countries, and short sections are still walked by hikers retracing historic routes. Historians frequently cite the network as among the clearest instances of infrastructure determining the trajectory of a civilisation, having enabled a degree of political and economic cohesion that Europe would not see replicated for well over a millennium after the empire's collapse.`,
    questions: [
      { id: 'q1', type: 'tfng', label: 'True / False / Not Given', prompt: "The road network's primary original purpose was to facilitate trade rather than military movement.", answer: 'FALSE' },
      { id: 'q2', type: 'tfng', label: 'True / False / Not Given', prompt: 'Sections of the original Roman roads can still be seen today.', answer: 'TRUE' },
      { id: 'q3', type: 'tfng', label: 'True / False / Not Given', prompt: 'Road-building always took place only after a territory had been formally annexed.', answer: 'FALSE' },
      { id: 'q4', type: 'mcq', label: 'Matching Information', prompt: 'Which paragraph compares the speed of Roman-era communication to a much later technology?', options: ['Paragraph A', 'Paragraph B', 'Paragraph C', 'Paragraph D'], answer: 'Paragraph C' },
      { id: 'q5', type: 'completion', label: 'Sentence Completion', prompt: 'Official couriers using the network could cover roughly ___ kilometres in a single day under good conditions.', answer: '80' },
    ],
  },
  {
    id: 'rp-4',
    title: 'Grid of the Future',
    text: `A  Electricity grids were architected for a world of predictable, centrally dispatched generation, not the intermittent output characteristic of solar and wind installations. As renewables have shifted from a marginal contributor to the dominant source of new generating capacity in many jurisdictions, grid operators confront a structural problem: supply and demand must be reconciled on a second-by-second basis, yet neither sunlight nor wind can be commanded to arrive on schedule.

B  One widely canvassed solution is the so-called smart grid, which relies on distributed sensors and real-time telemetry to reroute electricity to points of demand and to bank surplus generation in battery storage for later dispatch. Several utilities have begun compensating households equipped with rooftop solar and storage for exporting power during peak demand windows, effectively converting individual residences into micro-generating assets within a decentralised network.

C  Grid-scale battery deployment has likewise expanded at a pace that outstripped most analysts' projections from a decade ago, with per-unit costs falling considerably faster than the equivalent trajectory for early solar panels. Sceptics nonetheless point out, not unreasonably, that current storage capacity covers only a fraction of what would be required to ride through an extended period of overcast, windless weather, and that the transmission upgrades needed to support a genuinely decentralised grid remain both costly and administratively slow to approve.

D  Even allowing for these reservations, the prevailing view among energy planners has shifted from questioning whether flexible, decentralised grids will eventually be built, to debating only the pace at which the transition can be responsibly managed.`,
    questions: [
      { id: 'q1', type: 'ynng', label: 'Yes / No / Not Given', prompt: 'Battery storage costs have fallen more slowly than early solar panel costs did.', answer: 'NO' },
      { id: 'q2', type: 'ynng', label: 'Yes / No / Not Given', prompt: 'Current battery storage is sufficient to cover an extended period without sun or wind.', answer: 'NO' },
      { id: 'q3', type: 'ynng', label: 'Yes / No / Not Given', prompt: 'All energy planners agree on the exact pace at which the grid transition should occur.', answer: 'NOT GIVEN' },
      {
        id: 'q4', type: 'mcq', label: 'Matching Sentence Endings',
        prompt: "Complete the sentence: 'Some utilities now pay households with solar panels...'",
        options: [
          'to disconnect entirely from the grid.',
          'to export surplus power back to the grid during peak demand.',
          'to install a second, larger battery system.',
          'to reduce their household energy use permanently.',
        ],
        answer: 'to export surplus power back to the grid during peak demand.',
      },
      { id: 'q5', type: 'completion', label: 'Sentence Completion', prompt: 'A "___" grid uses distributed sensors and real-time telemetry to reroute electricity where it is needed.', answer: 'smart' },
    ],
  },
  {
    id: 'rp-5',
    title: 'Smarter Than We Thought',
    text: `A  Octopuses have long captivated researchers, not least because their cognitive machinery evolved along a lineage entirely separate from that of mammals and birds — the last common ancestor of octopus and human predates the evolution of anything resembling a centralised brain. Roughly two-thirds of an octopus's neurons reside not in a central brain but distributed across its eight arms, each of which can process sensory input and initiate action with a striking degree of autonomy from the central ganglion.

B  Laboratory studies have documented octopuses manipulating childproof jar lids, navigating multi-branch mazes, and discriminating between individual human keepers — reportedly directing jets of water preferentially at handlers they appear to find disagreeable. Perhaps the most theoretically significant finding concerns observational learning: in a frequently cited experiment, an octopus that merely watched a conspecific solve a puzzle box subsequently solved the identical box considerably faster than a naive control given no demonstration.

C  This is a puzzling result for an organism that is solitary for virtually its entire life and rarely survives beyond eighteen months — traits that, under standard evolutionary reasoning, ought to select against costly, general-purpose intelligence, since there is little opportunity either to transmit learned behaviour culturally or to reap a lifetime's return on the metabolic investment such cognition demands. Some researchers propose that the relevant selective pressure was not social but anatomical: the loss of a protective shell over evolutionary time may have forced reliance on behavioural flexibility and camouflage rather than armour, effectively substituting cunning for a exoskeleton.

D  Whichever explanation ultimately prevails, octopus cognition continues to unsettle any tidy assumption that sophisticated thought requires either a long lifespan, a social existence, or a centralised brain architecture resembling our own.`,
    questions: [
      { id: 'q1', type: 'tfng', label: 'True / False / Not Given', prompt: "Most of an octopus's neurons are located in a centralised brain.", answer: 'FALSE' },
      { id: 'q2', type: 'tfng', label: 'True / False / Not Given', prompt: 'An octopus has been observed learning a task more quickly after watching another octopus perform it.', answer: 'TRUE' },
      {
        id: 'q3', type: 'mcq', label: 'Matching Sentence Endings',
        prompt: "Complete the sentence: 'Standard evolutionary reasoning would predict that solitary, short-lived animals like octopuses...'",
        options: [
          'should develop especially large brains to compensate for isolation.',
          'should not evolve costly, general-purpose intelligence.',
          'should rely entirely on instinct rather than learning.',
          'should be unable to survive in captivity.',
        ],
        answer: 'should not evolve costly, general-purpose intelligence.',
      },
      { id: 'q4', type: 'mcq', label: 'Matching Information', prompt: 'Which paragraph proposes a specific anatomical explanation for the evolution of octopus intelligence?', options: ['Paragraph A', 'Paragraph B', 'Paragraph C', 'Paragraph D'], answer: 'Paragraph C' },
      { id: 'q5', type: 'completion', label: 'Sentence Completion', prompt: 'Each octopus arm can process sensory input and initiate action with a degree of ___ from the central ganglion.', answer: 'autonomy' },
    ],
  },
  {
    id: 'rp-6',
    title: 'The Office Reimagined',
    text: `A  When large segments of the global workforce were dispatched home in 2020, most organisations treated the arrangement as an emergency stopgap rather than a durable shift. Several years on, remote and hybrid work has settled into a permanent feature of professional life for a substantial share of employees, prompting a more fundamental reappraisal of what a physical office is actually for.

B  Survey data consistently indicate that employees value the flexibility remote work affords, particularly the elimination of commuting time, though a meaningful minority report heightened isolation and difficulty maintaining a boundary between professional and personal life. In response, a number of firms have redesigned their premises around collaborative space rather than assigned desks, reasoning that if routine, individual tasks can be performed anywhere, the office's residual function is to support precisely the kind of spontaneous exchange and informal mentorship that videoconferencing struggles to replicate.

C  Other organisations have adopted hybrid mandates requiring attendance on specified days chosen to maximise cross-team overlap. Critics of such mandates argue that fixed attendance requirements feel arbitrary unless explicitly tied to a demonstrable collaborative purpose, and several high-profile mandates have been quietly relaxed following employee pushback.

D  Economists, meanwhile, are tracking the secondary effects on city centres, where reduced footfall has damaged businesses historically dependent on commuters — from sandwich shops to dry cleaners — forcing municipal planners to reconsider the function of downtown districts that were, in many cases, never designed to be anything other than commuter destinations.`,
    questions: [
      { id: 'q1', type: 'ynng', label: 'Yes / No / Not Given', prompt: 'Remote work has remained a purely temporary emergency measure for most organisations.', answer: 'NO' },
      { id: 'q2', type: 'ynng', label: 'Yes / No / Not Given', prompt: 'A minority of employees report feeling more isolated when working remotely.', answer: 'YES' },
      { id: 'q3', type: 'ynng', label: 'Yes / No / Not Given', prompt: 'Every company that introduced a hybrid attendance mandate has kept it unchanged.', answer: 'NO' },
      {
        id: 'q4', type: 'mcq', label: 'Multiple Choice',
        prompt: 'According to the passage, why have some companies redesigned offices around collaborative space?',
        options: [
          'To reduce the total number of employees',
          'Because routine tasks can be done remotely, leaving collaboration as the office\'s main remaining purpose',
          'To lower rental costs',
          'Because employees specifically requested open-plan layouts',
        ],
        answer: "Because routine tasks can be done remotely, leaving collaboration as the office's main remaining purpose",
      },
      { id: 'q5', type: 'completion', label: 'Sentence Completion', prompt: 'Hybrid mandates typically require attendance on days chosen to maximise cross-team ___.', answer: 'overlap' },
    ],
  },
  {
    id: 'rp-7',
    title: 'From Silence to Community',
    text: `A  Public libraries were once governed by a single, largely unspoken convention: silence. Many have since been transformed into some of the busiest civic spaces in a city, hosting everything from coding bootcamps to job-search clinics and children's puppet theatre. This transformation reflects a deeper reconsideration of what a library is fundamentally for.

B  As information became freely and instantly available online, some observers questioned whether physical library buildings retained any real purpose. Librarians and municipal planners responded not by defending the traditional model but by redefining its premise entirely: a library, on this revised understanding, was never primarily about books, but about equitable access to knowledge, technology, and shared civic space regardless of a visitor's means.

C  This redefinition has proven particularly consequential for residents without reliable internet access at home, who rely on library terminals to apply for employment or complete coursework. Many library systems have additionally become informal social-service hubs, with front-line staff trained to assist visitors experiencing homelessness or mental health crises — a responsibility few librarians anticipated when entering the profession, and one that has generated debate about whether libraries are an appropriate venue for such support at all.

D  Not every constituency has welcomed the shift. Traditionalists within the profession worry that libraries risk forfeiting their identity as spaces for quiet reading and sustained reflection amid the newer, noisier programming. Most systems have attempted a compromise, offering both designated quiet zones and louder communal areas, wagering that the institution's future lies in serving a wider range of needs under a single roof rather than in preserving any one historical identity.`,
    questions: [
      { id: 'q1', type: 'tfng', label: 'True / False / Not Given', prompt: 'Libraries today exclusively offer traditional book-lending services.', answer: 'FALSE' },
      { id: 'q2', type: 'tfng', label: 'True / False / Not Given', prompt: 'Some library staff have been trained to support visitors in mental health crises.', answer: 'TRUE' },
      { id: 'q3', type: 'tfng', label: 'True / False / Not Given', prompt: 'Every librarian agrees that acting as a social-service hub is an appropriate role for libraries.', answer: 'NOT GIVEN' },
      { id: 'q4', type: 'mcq', label: 'Matching Information', prompt: 'Which paragraph explicitly mentions disagreement over whether libraries should provide social-service support at all?', options: ['Paragraph A', 'Paragraph B', 'Paragraph C', 'Paragraph D'], answer: 'Paragraph C' },
      { id: 'q5', type: 'completion', label: 'Sentence Completion', prompt: 'Most library systems now offer both quiet zones and louder ___ areas.', answer: 'communal' },
    ],
  },
  {
    id: 'rp-8',
    title: 'The Bitter Bean',
    text: `A  Coffee's ascent from a regional curiosity to the world's second most heavily traded commodity is a narrative shaped as much by politics as by taste. Popular legend attributes its discovery to an Ethiopian goat herder who noticed his animals grew unusually energetic after grazing on certain berries; whatever the story's accuracy, cultivation had reached the Arabian Peninsula by the fifteenth century, where coffeehouses became central to social and intellectual life — hubs of political discussion sufficiently influential that several rulers banned them outright, fearing they incubated dissent.

B  European colonial powers subsequently transplanted cultivation to the Americas and parts of Asia, frequently relying on forced and indentured labour — a legacy that continues to shape contemporary debates over equity within the industry. By the twentieth century, coffee had embedded itself in daily routines across much of the world, and fluctuations in its price could materially affect the economic fortunes of nations dependent on export revenue.

C  In recent decades, fair-trade and direct-trade certification schemes have sought to ensure growers capture a larger share of the retail price. Critics contend that certification, however well-intentioned, cannot by itself resolve the deeper structural inequalities embedded in global supply chains, and some economists argue that certification premiums are too often absorbed by intermediaries rather than reaching smallholder farmers directly.

D  The industry's next disruption may be environmental rather than political: rising temperatures are already shrinking the geographic range suitable for Arabica cultivation, the species responsible for the majority of specialty coffee, prompting growers at lower altitudes to migrate operations upslope or diversify into more heat-tolerant, though generally less prized, Robusta varieties.`,
    questions: [
      { id: 'q1', type: 'tfng', label: 'True / False / Not Given', 'prompt': 'Coffee cultivation is traditionally said to have begun in the Arabian Peninsula.', answer: 'FALSE' },
      { id: 'q2', type: 'tfng', label: 'True / False / Not Given', prompt: 'Some rulers banned coffeehouses because they feared political dissent.', answer: 'TRUE' },
      { id: 'q3', type: 'tfng', label: 'True / False / Not Given', prompt: 'Fair-trade certification has fully resolved inequality within coffee supply chains, according to critics.', answer: 'FALSE' },
      {
        id: 'q4', type: 'mcq', label: 'Multiple Choice',
        prompt: 'According to the passage, what environmental change is already affecting Arabica coffee cultivation?',
        options: [
          'Increased rainfall at high altitudes',
          'Rising temperatures shrinking the range suitable for cultivation',
          'A shortage of agricultural labour',
          'New pest species migrating from Robusta farms',
        ],
        answer: 'Rising temperatures shrinking the range suitable for cultivation',
      },
      { id: 'q5', type: 'completion', label: 'Sentence Completion', prompt: 'Coffee is often described as the world\'s second most heavily traded ___.', answer: 'commodity' },
    ],
  },
]
