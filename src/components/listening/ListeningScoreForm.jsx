import { useState } from 'react'
import { ListPlus } from 'lucide-react'
import { Card } from '../shared/Card.jsx'
import { Field, BandSelect } from '../shared/Field.jsx'
import { CopyJsonButton } from '../shared/CopyJsonButton.jsx'
import { useLogs } from '../../lib/LogsContext.jsx'

export function ListeningScoreForm() {
  const { addEntry } = useLogs()
  const [testName, setTestName] = useState('')
  const [sections, setSections] = useState({ s1: 8, s2: 8, s3: 8, s4: 8 })
  const [band, setBand] = useState(7.0)

  const totalQuestions = Object.values(sections).reduce((a, b) => a + Number(b || 0), 0)

  const entry = {
    id: `l-${Date.now()}`,
    date: new Date().toISOString().slice(0, 10),
    testName: testName || 'Untitled test',
    sections: {
      s1: Number(sections.s1),
      s2: Number(sections.s2),
      s3: Number(sections.s3),
      s4: Number(sections.s4),
    },
    totalQuestions: 40,
    band,
  }

  return (
    <Card title="Log a Listening Test" icon={ListPlus}>
      <Field label="Test name">
        <input className="input" value={testName} onChange={(e) => setTestName(e.target.value)} placeholder="e.g. Cambridge 21 Test 2" />
      </Field>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {['s1', 's2', 's3', 's4'].map((s, i) => (
          <Field key={s} label={`Section ${i + 1} correct`}>
            <input
              type="number"
              min="0"
              max="10"
              className="input"
              value={sections[s]}
              onChange={(e) => setSections((prev) => ({ ...prev, [s]: e.target.value }))}
            />
          </Field>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 items-end">
        <Field label="Overall band">
          <BandSelect value={band} onChange={setBand} />
        </Field>
        <div className="text-xs text-slate-500">
          Raw score: <span className="font-mono text-slate-300">{totalQuestions}/40</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button className="btn-primary" onClick={() => addEntry('listeningEntries', entry)}>
          Add to this session
        </button>
        <CopyJsonButton value={entry} label="Copy JSON → listeningEntries" />
      </div>
    </Card>
  )
}
