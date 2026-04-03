import { useAppContext } from '../context/AppContext'
import { formatCurrency, formatDate } from '../utils/formatters'
import { Edit2, Trash2 } from 'lucide-react'

export default function TransactionsTableNew() {
  const { filteredTransactions, role, deleteTransaction, setEditingTransaction, sortOrder } = useAppContext()

  // STEP 1: Sort transactions FIRST
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

    return sortOrder === 'newest'
      ? dateB - dateA
      : dateA - dateB
  })

  // STEP 2: Group sorted data
  const groupedByDate = sortedTransactions.reduce((acc, tx) => {
    const dateKey = new Date(tx.date).toDateString()

    if (!acc[dateKey]) acc[dateKey] = []
    acc[dateKey].push(tx)

    return acc
  }, {})

  // STEP 3: Get sorted date keys
  const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
    return sortOrder === 'newest'
      ? new Date(b) - new Date(a)
      : new Date(a) - new Date(b)
  })

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction)
  }

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id)
    }
  }

  const isAdmin = role === 'Admin'

  return (
    <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 transition-all duration-300 shadow-sm dark:shadow-none">
      <h2 className="text-sm font-medium text-gray-900 dark:text-white mb-4 transition-colors duration-300">Recent Transactions</h2>

      <div className="space-y-6">
        {sortedDates.map((date) => (
          <div key={date}>
            {/* Date Group Header */}
            <div className="mb-3 px-4 py-2 bg-gray-50 dark:bg-white/5 rounded-lg">
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-400 uppercase tracking-wider transition-colors duration-300">
                {formatDate(date)}
              </p>
            </div>

            {/* Transactions in this date group */}
            <div className="space-y-2">
              {groupedByDate[date].map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 gap-2 sm:gap-0"
                >
                  {/* Left section: Category and Description */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-300">
                          {transaction.category}
                        </p>
                        {transaction.description && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">
                            {transaction.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Middle section: Amount and Type */}
                  <div className="flex items-center gap-2 sm:gap-4 min-w-fit sm:ml-4">
                    <span
                      className={`text-sm font-semibold ${
                        transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </div>

                  {/* Right section: Action buttons (Admin only) */}
                  {isAdmin && (
                    <div className="flex items-center gap-1 sm:gap-2 sm:ml-4 self-end sm:self-auto">
                      <button
                        onClick={() => handleEditClick(transaction)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-all duration-300 text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 hover:text-blue-600"
                        title="Edit transaction"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(transaction.id)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-all duration-300 text-red-500 dark:text-red-400 dark:hover:text-red-300 hover:text-red-600"
                        title="Delete transaction"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">No transactions found</p>
        </div>
      )}
    </div>
  )
}
