import { useState } from 'react'
import { LogsProvider } from './lib/LogsContext.jsx'
import { ProgressProvider } from './lib/progressStore.jsx'
import { NavigationProvider } from './lib/NavigationContext.jsx'
import { Sidebar } from './components/layout/Sidebar.jsx'
import { Overview } from './components/overview/Overview.jsx'
import { StudyPlanModule } from './components/studyplan/StudyPlanModule.jsx'
import { VocabularyModule } from './components/vocabulary/VocabularyModule.jsx'
import { WritingModule } from './components/writing/WritingModule.jsx'
import { ReadingModule } from './components/reading/ReadingModule.jsx'
import { ListeningModule } from './components/listening/ListeningModule.jsx'
import { SpeakingModule } from './components/speaking/SpeakingModule.jsx'
import { ProgressModule } from './components/progress/ProgressModule.jsx'

const PAGES = {
  overview: Overview,
  studyplan: StudyPlanModule,
  vocabulary: VocabularyModule,
  writing: WritingModule,
  reading: ReadingModule,
  listening: ListeningModule,
  speaking: SpeakingModule,
  progress: ProgressModule,
}

export default function App() {
  const [active, setActive] = useState('overview')
  const Page = PAGES[active] ?? Overview

  return (
    <LogsProvider>
      <ProgressProvider>
        <NavigationProvider active={active} setActive={setActive}>
          <div className="flex h-screen w-full overflow-hidden">
            <Sidebar active={active} onSelect={setActive} />
            <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-10 lg:py-8">
              <div className="mx-auto max-w-6xl">
                <Page />
              </div>
            </main>
          </div>
        </NavigationProvider>
      </ProgressProvider>
    </LogsProvider>
  )
}
