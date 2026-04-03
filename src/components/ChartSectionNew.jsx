import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { useAppContext } from '../context/AppContext'
import { formatCurrency } from '../utils/formatters'

export default function ChartSectionNew() {
  const { transactions } = useAppContext()

  // Balance trend data
  const balanceTrendData = [
    { date: 'Mar 1', balance: 3200 },
    { date: 'Mar 5', balance: 3800 },
    { date: 'Mar 10', balance: 3400 },
    { date: 'Mar 15', balance: 4200 },
    { date: 'Mar 20', balance: 3900 },
    { date: 'Mar 25', balance: 4500 },
    { date: 'Mar 30', balance: 4800 },
  ]

  // Spending by category
  const categorySpending = [
    { name: 'Rent', value: 1200, fill: '#3b82f6' },
    { name: 'Food', value: 450, fill: '#06b6d4' },
    { name: 'Entertainment', value: 200, fill: '#a855f7' },
    { name: 'Shopping', value: 380, fill: '#ec4899' },
    { name: 'Other', value: 270, fill: '#eab308' },
  ]

  const totalSpend = categorySpending.reduce((sum, cat) => sum + cat.value, 0)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      {/* LEFT: Balance Trend */}
      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col transition-all duration-300 h-full shadow-sm dark:shadow-none">
        <div className="mb-4">
          <h3 className="text-sm text-gray-900 dark:text-white font-medium transition-colors duration-300">Balance Trend</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-300">March 2026</p>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={balanceTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                color: '#e0e7ff',
                border: '2px solid #3b82f6',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                padding: '10px 14px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
              }}
              formatter={(value) => `₹${value?.toFixed(0) || 0}`}
              labelStyle={{ color: '#e0e7ff', fontWeight: '600' }}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorBalance)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* RIGHT: Spending Breakdown */}
      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col relative transition-all duration-300 h-full shadow-sm dark:shadow-none">
        <div className="mb-4">
          <h3 className="text-sm text-gray-900 dark:text-white font-medium transition-colors duration-300">Spending by Category</h3>
        </div>

        <div className="flex items-center justify-center mb-4 sm:mb-6 relative h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categorySpending}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                dataKey="value"
                isAnimationActive={false}
              >
                {categorySpending.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [`₹${value}`, props.payload.name]}
                contentStyle={{
                  backgroundColor: '#000a1a',
                  border: '2px solid #3b82f6',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6)',
                }}
                wrapperStyle={{
                  outline: 'none',
                }}
                cursor="pointer"
                itemStyle={{
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: '700',
                  lineHeight: '1.5',
                }}
                labelStyle={{
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '14px',
                  marginBottom: '4px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Total Spend text - centered inside donut */}
          <div className="absolute flex flex-col items-center justify-center gap-1">
            <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300">Total Spend</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">{formatCurrency(totalSpend)}</p>
          </div>
        </div>

        {/* Category legend - single column, right aligned values */}
        <div className="space-y-2 sm:space-y-2.5">
          {categorySpending.map((cat, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cat.fill }}
                />
                <span className="text-xs text-gray-700 dark:text-gray-300 transition-colors duration-300">{cat.name}</span>
              </div>
              <span className="text-xs text-gray-700 dark:text-gray-300 font-medium transition-colors duration-300">{formatCurrency(cat.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
