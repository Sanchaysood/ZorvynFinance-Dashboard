import { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function AddTransactionModal({ isOpen, onClose }) {
  const { addTransaction, editTransaction, role, editingTransaction, setEditingTransaction } = useAppContext()
  const isEditMode = !!editingTransaction
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: 'Food',
    type: 'expense',
    description: '',
  })

  const [error, setError] = useState('')

  useEffect(() => {
    if (isEditMode && editingTransaction) {
      setFormData({
        date: editingTransaction.date,
        amount: editingTransaction.amount.toString(),
        category: editingTransaction.category,
        type: editingTransaction.type,
        description: editingTransaction.description || '',
      })
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        amount: '',
        category: 'Food',
        type: 'expense',
        description: '',
      })
    }
    setError('')
  }, [isEditMode, editingTransaction])

  const categories = {
    income: ['Salary', 'Freelance', 'Bonus', 'Investment'],
    expense: ['Food', 'Rent', 'Travel', 'Entertainment', 'Utilities', 'Shopping', 'Healthcare'],
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    setError('')
  }

  const handleTypeChange = e => {
    setFormData(prev => ({
      ...prev,
      type: e.target.value,
      category: categories[e.target.value][0],
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setError('')

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Amount must be greater than 0')
      return
    }

    if (isEditMode) {
      editTransaction(editingTransaction.id, {
        ...formData,
        amount: parseFloat(formData.amount),
      })
    } else {
      addTransaction({
        ...formData,
        amount: parseFloat(formData.amount),
      })
    }

    setFormData({
      date: new Date().toISOString().split('T')[0],
      amount: '',
      category: 'Food',
      type: 'expense',
      description: '',
    })
    setEditingTransaction(null)
    onClose()
  }

  const handleClose = () => {
    setEditingTransaction(null)
    onClose()
  }

  if (role !== 'Admin') return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-2xl transition-colors duration-300">
              <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                      {isEditMode ? '✏️ Edit Transaction' : '➕ Add Transaction'}
                    </h2>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">
                      {isEditMode ? 'Update transaction details' : 'Record a new transaction'}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClose}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-2xl transition-colors"
                  >
                    ✕
                  </motion.button>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-gray-200 dark:from-slate-700 via-gray-300 dark:via-slate-600 to-gray-200 dark:to-slate-700 mb-6 transition-colors duration-300" />

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 dark:bg-red-500/20 text-red-700 dark:text-red-300 p-4 rounded-xl mb-6 text-sm border border-red-200 dark:border-red-500/30 backdrop-blur-sm transition-colors duration-300"
                  >
                    ⚠️ {error}
                  </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Type */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                      Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleTypeChange}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white border border-gray-300 dark:border-white/50 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none appearance-none pr-10 cursor-pointer transition-all font-medium hover:bg-gray-50 dark:hover:bg-slate-600 focus:bg-gray-50 dark:focus:bg-slate-600"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg fill='%239ca3af' viewBox='0 0 20 20'%3E%3Cpath d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L5.707 10.707a1 1 0 01-1.414-1.414l6-6z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.75rem center',
                        backgroundSize: '1.25em 1.25em',
                        paddingRight: '2.5rem',
                      }}
                    >
                      <option value="expense">📉 Expense</option>
                      <option value="income">📈 Income</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white border border-gray-300 dark:border-white/50 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none appearance-none pr-10 cursor-pointer transition-all font-medium hover:bg-gray-50 dark:hover:bg-slate-600 focus:bg-gray-50 dark:focus:bg-slate-600"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg fill='%239ca3af' viewBox='0 0 20 20'%3E%3Cpath d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L5.707 10.707a1 1 0 01-1.414-1.414l6-6z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.75rem center',
                        backgroundSize: '1.25em 1.25em',
                        paddingRight: '2.5rem',
                      }}
                    >
                      {categories[formData.type].map(cat => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                      Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300 text-lg font-semibold transition-colors duration-300">₹</span>
                      <input
                        type="number"
                        name="amount"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full pl-8 pr-4 py-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white border border-gray-300 dark:border-white/50 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all placeholder-gray-400 dark:placeholder-gray-400 font-medium hover:bg-gray-50 dark:hover:bg-slate-600 focus:bg-gray-50 dark:focus:bg-slate-600"
                        step="0.01"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white border border-gray-300 dark:border-white/50 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all font-medium hover:bg-gray-50 dark:hover:bg-slate-600 focus:bg-gray-50 dark:focus:bg-slate-600 [&::-webkit-calendar-picker-indicator]:filter dark:[&::-webkit-calendar-picker-indicator]:invert"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                      Description (optional)
                    </label>
                    <input
                      type="text"
                      name="description"
                      placeholder="Add notes..."
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white border border-gray-300 dark:border-white/50 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all placeholder-gray-400 dark:placeholder-gray-400 font-medium hover:bg-gray-50 dark:hover:bg-slate-600 focus:bg-gray-50 dark:focus:bg-slate-600"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 mt-8 pt-6 border-t transition-colors duration-300 border-gray-200 dark:border-slate-700">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleClose}
                      className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-900 dark:text-white font-medium rounded-lg transition-all duration-300 border border-gray-300 dark:border-slate-600 hover:border-gray-400 dark:hover:border-slate-500"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 border border-blue-500/50 hover:border-blue-400 shadow-lg hover:shadow-blue-500/50"
                    >
                      {isEditMode ? 'Save Changes' : 'Add Transaction'}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
