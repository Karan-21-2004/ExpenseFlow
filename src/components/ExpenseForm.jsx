import { useState } from 'react'

export default function ExpenseForm({ onAdd }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

  function handleSubmit(event) {
    event.preventDefault()
    if (!name.trim() || Number(price) <= 0 || !date) return
    onAdd({ name: name.trim(), price: Number(price), date })
    setName('')
    setPrice('')
  }

  return (
    <form className="panel expense-form" onSubmit={handleSubmit}>
      <div className="panel-heading">
        <div><span className="eyebrow">NEW TRANSACTION</span><h2>Add an expense</h2></div>
        <span className="heading-icon">＋</span>
      </div>
      <label>Expense name<input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Groceries" maxLength="60" required /></label>
      <div className="form-row">
        <label>Amount (₹)<input type="number" min="0.01" step="0.01" value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" required /></label>
        <label>Date<input type="date" value={date} onChange={e => setDate(e.target.value)} required /></label>
      </div>
      <button className="primary-btn" type="submit">Add expense <span>→</span></button>
    </form>
  )
}