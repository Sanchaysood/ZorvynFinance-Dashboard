import { TrendingUp, AlertCircle, Target } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import {
  getHighestSpendingCategory,
  calculateTotals,
  formatCurrency,
} from '../utils/formatters'

export default function InsightsNew() {
  const { transactions } = useAppContext()
  const highestCategory = getHighestSpendingCategory(transactions)
  const { income, expenses } = calculateTotals(transactions)
  const savingsRate = income > 0 ? Math.round(((income - expenses) / income) * 100) : 0

  const insights = [
    {
      icon: TrendingUp,
      title: `You spent ${Math.round((expenses / income) * 100)}% of income`,
      description: 'This month',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Target,
      title: highestCategory
        ? `${highestCategory.name} is highest at ${formatCurrency(highestCategory.value)}`
        : 'No spending data',
      description: 'Top category',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: AlertCircle,
      title: `${savingsRate}% savings rate`,
      description: 'Great job!',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {insights.map((insight, idx) => {
        const Icon = insight.icon
        return (
          <div
            key={idx}
            className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 flex items-start gap-3 card-glow hover:bg-gray-50 dark:hover:bg-white/8 transition-all duration-300 cursor-pointer group shadow-sm dark:shadow-none"
          >
            <div className={`flex-shrink-0 p-2 rounded-lg ${insight.bgColor}`}>
              <Icon size={20} className={insight.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-gray-200 leading-snug font-medium group-hover:text-gray-700 dark:group-hover:text-white transition-colors duration-300">
                {insight.title}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors duration-300">
                {insight.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
