export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
    </label>
  )
}

export function BandSelect({ value, onChange }) {
  const options = []
  for (let b = 0; b <= 9; b += 0.5) options.push(b)
  return (
    <select
      className="input"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
    >
      {options.map((b) => (
        <option key={b} value={b}>
          {b.toFixed(1)}
        </option>
      ))}
    </select>
  )
}
