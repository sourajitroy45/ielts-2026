import { useState } from 'react'
import { LogsProvider } from './lib/LogsContext.jsx'
import { Sidebar } from './components/layout/Sidebar.jsx'
import { Overview } from './components/overview/Overview.jsx'
import { WritingModule } from './components/writing/WritingModule.jsx'
import { ReadingModule } from './components/reading/ReadingModule.jsx'
import { ListeningModule } from './components/listening/ListeningModule.jsx'
import { SpeakingModule } from './components/speaking/SpeakingModule.jsx'

const PAGES = {
  overview: Overview,
  writing: WritingModule,
  reading: ReadingModule,
  listening: ListeningModule,
  speaking: SpeakingModule,
}

export default function App() {
  const [active, setActive] = useState('overview')
  const Page = PAGES[active]

  return (
    <LogsProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar active={active} onSelect={setActive} />
        <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-10 lg:py-8">
          <div className="mx-auto max-w-6xl">
            <Page />
          </div>
        </main>
      </div>
    </LogsProvider>
  )
}
