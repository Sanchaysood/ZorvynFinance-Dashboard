import React, { createContext, useContext, useState, useEffect } from 'react'
import { getInitialTransactions } from '../data/mockData.js'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [role, setRole] = useState('Viewer')
  const [theme, setTheme] = useState('light')
  const [filterType, setFilterType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('newest')
  const [editingTransaction, setEditingTransaction] = useState(null)

  // Initialize from localStorage
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions')
    const savedTheme = localStorage.getItem('theme') || 'dark'
    const savedRole = localStorage.getItem('role') || 'Viewer'

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions))
    } else {
      const initialTransactions = getInitialTransactions()
      setTransactions(initialTransactions)
      localStorage.setItem('transactions', JSON.stringify(initialTransactions))
    }

    setTheme(savedTheme)
    setRole(savedRole)

    // Apply theme to document
    const htmlElement = document.documentElement
    if (savedTheme === 'dark') {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }
  }, [])

  // Filter and sort transactions
  useEffect(() => {
    let filtered = transactions

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(t => t.type === filterType)
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(t =>
        t.category.toLowerCase().includes(term) ||
        t.amount.toString().includes(term)
      )
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        
        if (sortOrder === 'newest') {
          return dateB - dateA
        } else {
          return dateA - dateB
        }
      } else if (sortBy === 'amount') {
        return b.amount - a.amount
      }
      return 0
    })

    setFilteredTransactions(filtered)
  }, [transactions, filterType, searchTerm, sortBy, sortOrder])

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    }
    const updated = [newTransaction, ...transactions]
    setTransactions(updated)
    localStorage.setItem('transactions', JSON.stringify(updated))
  }

  const deleteTransaction = (id) => {
    const updated = transactions.filter(t => t.id !== id)
    setTransactions(updated)
    localStorage.setItem('transactions', JSON.stringify(updated))
  }

  const editTransaction = (id, updatedData) => {
    const updated = transactions.map(t =>
      t.id === id ? { ...t, ...updatedData } : t
    )
    setTransactions(updated)
    localStorage.setItem('transactions', JSON.stringify(updated))
    setEditingTransaction(null)
  }

  const exportToCSV = () => {
    const headers = ['Date', 'Category', 'Amount', 'Type', 'Description']
    const rows = transactions.map(t => [
      t.date,
      t.category,
      t.amount,
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
    link.setAttribute('download', `zorvyn-transactions-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(transactions, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `zorvyn-transactions-${new Date().toISOString().split('T')[0]}.json`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme)
      
      // Update DOM immediately
      const htmlElement = document.documentElement
      if (newTheme === 'dark') {
        htmlElement.classList.add('dark')
      } else {
        htmlElement.classList.remove('dark')
      }
      
      return newTheme
    })
  }

  // Sync theme changes to document whenever theme state updates
  useEffect(() => {
    const htmlElement = document.documentElement
    if (theme === 'dark') {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }
  }, [theme])

  const switchRole = (newRole) => {
    setRole(newRole)
    localStorage.setItem('role', newRole)
  }

  const value = {
    transactions,
    filteredTransactions,
    role,
    theme,
    filterType,
    searchTerm,
    sortBy,
    sortOrder,
    editingTransaction,
    addTransaction,
    deleteTransaction,
    editTransaction,
    exportToCSV,
    exportToJSON,
    toggleTheme,
    switchRole,
    setFilterType,
    setSearchTerm,
    setSortBy,
    setSortOrder,
    setEditingTransaction,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}
