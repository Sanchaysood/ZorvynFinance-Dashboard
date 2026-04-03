import { Briefcase, TrendingUp, TrendingDown } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { calculateTotals, formatCurrency } from '../utils/formatters'

export default function SummaryCardsNew() {
  const { transactions } = useAppContext()
  const { income, expenses } = calculateTotals(transactions)
  const balance = income - expenses

  const cards = [
    {
      label: 'Total Balance',
      value: formatCurrency(balance),
      icon: Briefcase,
      trend: '+12.5% vs last month',
      trendPositive: true,
      bgIcon: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
    },
    {
      label: 'Total Income',
      value: formatCurrency(income),
      icon: TrendingUp,
      trend: '+8.2% vs last month',
      trendPositive: true,
      bgIcon: 'bg-green-500/20',
      iconColor: 'text-green-400',
    },
    {
      label: 'Total Expenses',
      value: formatCurrency(expenses),
      icon: TrendingDown,
      trend: '+3.1% vs last month',
      trendPositive: false,
      bgIcon: 'bg-red-500/20',
      iconColor: 'text-red-400',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <div
            key={index}
            className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-5 flex flex-col gap-3 card-glow hover:bg-gray-50 dark:hover:bg-white/7 hover:scale-[1.01] transition-all duration-300 shadow-sm dark:shadow-none"
          >
            {/* Icon */}
            <div className={`${card.bgIcon} p-2 rounded-lg w-fit`}>
              <Icon size={20} className={card.iconColor} />
            </div>

            {/* Label & Value */}
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide transition-colors duration-300">
                {card.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2 transition-colors duration-300">
                {card.value}
              </p>
            </div>

            {/* Trend */}
            <p
              className={`text-xs font-medium transition-colors duration-300 ${
                card.trendPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}
            >
              {card.trendPositive ? '↑' : '↓'} {card.trend}
            </p>
          </div>
        )
      })}
    </div>
  )
}
