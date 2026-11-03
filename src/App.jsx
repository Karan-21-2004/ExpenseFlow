import { useEffect, useMemo, useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import SummaryCard from './components/SummaryCard'
import ExpenseChart from './components/ExpenseChart'
import ExpenseList from './components/ExpenseList'

const API_URL = '/ExpenseFlow/api/expenses'
const STORAGE_KEY = 'expenseflow-react-expenses'

function readLocalExpenses() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}

export default function App() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [storageMode, setStorageMode] = useState(false)

  async function loadExpenses() {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('API unavailable')
      const data = await response.json()
      setExpenses(data.map(item => ({ ...item, id: String(item.id), price: Number(item.price) })))
      setStorageMode(false)
    } catch {
      setExpenses(readLocalExpenses())
      setStorageMode(true)
    } finally { setLoading(false) }
  }

  useEffect(() => { loadExpenses() }, [])

  useEffect(() => {
    if (storageMode) localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  }, [expenses, storageMode])

  async function addExpense(expense) {
    if (storageMode) {
      setExpenses(current => [{ ...expense, id: String(Date.now()) }, ...current])
      return
    }
    const body = new URLSearchParams(expense)
    try {
      const response = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })
      if (!response.ok) throw new Error('Save failed')
      await loadExpenses()
    } catch {
      setStorageMode(true)
      setExpenses(current => [{ ...expense, id: String(Date.now()) }, ...current])
    }
  }

  async function deleteExpense(id) {
    if (storageMode) {
      setExpenses(current => current.filter(item => String(item.id) !== String(id)))
      return
    }
    try {
      const body = new URLSearchParams({ action: 'delete', id })
      const response = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })
      if (!response.ok) throw new Error('Delete failed')
      await loadExpenses()
    } catch {
      setStorageMode(true)
      setExpenses(current => current.filter(item => String(item.id) !== String(id)))
    }
  }

  const now = new Date()
  const total = useMemo(() => expenses.reduce((sum, item) => sum + Number(item.price || 0), 0), [expenses])
  const monthTotal = useMemo(() => expenses.filter(item => {
    const d = new Date(`${item.date}T00:00:00`)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).reduce((sum, item) => sum + Number(item.price || 0), 0), [expenses])
  const yearTotal = useMemo(() => expenses.filter(item => new Date(`${item.date}T00:00:00`).getFullYear() === now.getFullYear()).reduce((sum, item) => sum + Number(item.price || 0), 0), [expenses])

  return <main className="app-shell">
    <header className="app-header">
      <a className="brand" href="#"><span className="brand-mark">₹</span><span>Expense<span className="brand-light">Flow</span><small>PERSONAL FINANCE TRACKER</small></span></a>
      <div className="header-right"><span className="live-dot"></span><span>{storageMode ? 'Local mode' : 'Expense dashboard'}</span><div className="avatar">EF</div></div>
    </header>
    <section className="welcome">
      <div><span className="eyebrow">YOUR MONEY, IN CONTROL</span><h1>Good to see you<span>.</span></h1><p>Track your spending. Build better habits. Stay in control.</p></div>
      <div className="date-chip">◷ &nbsp; {now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
    </section>
    {storageMode && <div className="notice">You're using browser storage because the Java backend is not connected. Your entries will still be saved on this device.</div>}
    <section className="summary-grid">
      <SummaryCard label="Total expenses" amount={total} icon="↗" />
      <SummaryCard label="This month" amount={monthTotal} icon="▦" accent />
      <SummaryCard label="This year" amount={yearTotal} icon="◷" />
    </section>
    <section className="main-grid">
      <ExpenseForm onAdd={addExpense} />
      <ExpenseChart expenses={expenses} />
    </section>
    {loading ? <div className="loading">Loading your expenses...</div> : <ExpenseList expenses={expenses} onDelete={deleteExpense} />}
    <footer>ExpenseFlow <span>•</span> Built to make every rupee count.</footer>
  </main>
}