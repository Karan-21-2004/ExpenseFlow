import { useMemo, useState } from 'react'

export default function ExpenseList({ expenses, onDelete }) {
  const [search, setSearch] = useState('')
  const filtered = useMemo(() => expenses.filter(item => item.name.toLowerCase().includes(search.toLowerCase())), [expenses, search])
  const grouped = useMemo(() => filtered.reduce((acc, item) => {
    const d = new Date(`${item.date}T00:00:00`)
    const key = d.toLocaleString('en-IN', { month: 'long', year: 'numeric' })
    ;(acc[key] ||= []).push(item)
    return acc
  }, {}), [filtered])

  return <section className="panel transactions-panel">
    <div className="panel-heading list-heading"><div><span className="eyebrow">YOUR ACTIVITY</span><h2>Recent expenses</h2></div><input className="search-input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search expenses..." aria-label="Search expenses" /></div>
    {Object.keys(grouped).length ? Object.entries(grouped).map(([month, items]) => <div className="month-group" key={month}>
      <div className="month-heading"><h3>{month}</h3><span>₹{items.reduce((sum, item) => sum + Number(item.price), 0).toLocaleString('en-IN')}</span></div>
      {items.map(item => <div className="expense-row" key={item.id}>
        <div className="expense-symbol">{item.name.slice(0, 1).toUpperCase()}</div>
        <div className="expense-info"><strong>{item.name}</strong><small>{new Date(`${item.date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</small></div>
        <strong className="expense-amount">− ₹{Number(item.price).toLocaleString('en-IN')}</strong>
        <button className="delete-btn" onClick={() => onDelete(item.id)} aria-label={`Delete ${item.name}`} title="Delete expense">×</button>
      </div>)}
    </div>) : <div className="empty-list"><span>✦</span><p>{search ? 'No matching expenses found.' : 'No expenses yet. Add one above to get started.'}</p></div>}
  </section>
}