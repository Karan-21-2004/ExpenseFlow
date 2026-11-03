export default function SummaryCard({ label, amount, icon, accent }) {
  return <article className={`summary-card ${accent ? 'accent-card' : ''}`}>
    <div className="summary-top"><span>{label}</span><span className="summary-icon">{icon}</span></div>
    <strong>₹{Number(amount).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong>
    <small>{label === 'Total expenses' ? 'Across all recorded transactions' : 'Based on expense date'}</small>
  </article>
}