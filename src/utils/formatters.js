// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount)
}

// Format date
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Format date for display (short format)
export const formatDateShort = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

// Calculate totals from transactions
export const calculateTotals = (transactions) => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = income - expenses

  return { income, expenses, balance }
}

// Calculate spending by category
export const calculateSpendingByCategory = (transactions) => {
  const spending = {}

  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      spending[t.category] = (spending[t.category] || 0) + t.amount
    })

  return Object.entries(spending)
    .map(([category, amount]) => ({
      name: category,
      value: amount,
    }))
    .sort((a, b) => b.value - a.value)
}

// Get balance trend over months
export const getBalanceTrend = (transactions) => {
  const monthlyData = {}

  transactions.forEach(t => {
    const date = new Date(t.date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { income: 0, expenses: 0 }
    }

    if (t.type === 'income') {
      monthlyData[monthKey].income += t.amount
    } else {
      monthlyData[monthKey].expenses += t.amount
    }
  })

  // Convert to array and calculate balance
  const trendArray = Object.entries(monthlyData)
    .map(([month, data]) => ({
      month: month.split('-').join('-'),
      balance: data.income - data.expenses,
      income: data.income,
      expenses: data.expenses,
    }))
    .sort((a, b) => a.month.localeCompare(b.month))

  return trendArray
}

// Get highest spending category
export const getHighestSpendingCategory = (transactions) => {
  const spending = calculateSpendingByCategory(transactions)
  return spending[0] || null
}

// Get insight about expenses vs income
export const getExpenseInsight = (transactions) => {
  const { income, expenses } = calculateTotals(transactions)

  if (expenses > income) {
    return {
      type: 'warning',
      message: `Expenses (${formatCurrency(expenses)}) exceed income (${formatCurrency(income)}) by ${formatCurrency(expenses - income)}`,
    }
  } else if (expenses > income * 0.8) {
    return {
      type: 'caution',
      message: `Expenses are ${((expenses / income) * 100).toFixed(1)}% of income. Consider reducing spending.`,
    }
  } else {
    return {
      type: 'good',
      message: `You're saving ${formatCurrency(income - expenses)} monthly. Good job!`,
    }
  }
}

// Export transactions as CSV
export const exportToCSV = (transactions) => {
  if (transactions.length === 0) {
    alert('No transactions to export')
    return
  }

  const headers = ['Date', 'Amount', 'Category', 'Type', 'Description']
  const rows = transactions.map(t => [
    t.date,
    t.amount,
    t.category,
    t.type,
    t.description || '',
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', `transactions-${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
