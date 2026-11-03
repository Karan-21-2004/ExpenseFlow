import { useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

export default function ExpenseChart({ expenses }) {
  const data = useMemo(() => ({
    labels: expenses.map(item => item.name),
    datasets: [{
      data: expenses.map(item => Number(item.price)),
      backgroundColor: ['#ff5268', '#ff9f43', '#7c72ff', '#35c9a5', '#55a6ff', '#e879f9'],
      borderColor: '#151720',
      borderWidth: 4,
      hoverOffset: 8
    }]
  }), [expenses])

  return <section className="panel chart-panel">
    <div className="panel-heading"><div><span className="eyebrow">SPENDING OVERVIEW</span><h2>Where your money goes</h2></div><span className="chart-tag">BY EXPENSE</span></div>
    {expenses.length ? <div className="chart-wrap"><Doughnut data={data} options={{ maintainAspectRatio: false, cutout: '68%', plugins: { legend: { position: 'bottom', labels: { color: '#a5a7b5', padding: 18, usePointStyle: true, pointStyle: 'circle' } } } }} /></div> : <div className="empty-chart"><span>◌</span><p>Your chart will appear here</p><small>Add your first expense to see the breakdown.</small></div>}
  </section>
}