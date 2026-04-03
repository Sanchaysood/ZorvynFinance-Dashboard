import { Search } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function FilterBarNew() {
  const { filterType, setFilterType, searchTerm, setSearchTerm, sortOrder, setSortOrder } =
    useAppContext()
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })
  const sortButtonRef = useRef(null)

  // Update dropdown position when opened
  useEffect(() => {
    if (sortDropdownOpen && sortButtonRef.current) {
      const rect = sortButtonRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.right - 224, // w-56 = 224px
        width: rect.width,
      })
    }
  }, [sortDropdownOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortButtonRef.current && !sortButtonRef.current.contains(e.target)) {
        setSortDropdownOpen(false)
      }
    }

    if (sortDropdownOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [sortDropdownOpen])

  return (
    <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 transition-all duration-300 shadow-sm dark:shadow-none overflow-visible">
      {/* LEFT: Filter Buttons */}
      <div className="flex gap-2 flex-wrap">
        {[
          { value: 'all', label: 'All' },
          { value: 'income', label: 'Income' },
          { value: 'expense', label: 'Expense' },
        ].map((btn) => (
          <button
            key={btn.value}
            onClick={() => setFilterType(btn.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              filterType === btn.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* RIGHT: Search & Sort */}
      <div className="flex gap-2 sm:gap-3 w-full sm:w-auto flex-wrap sm:flex-nowrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] sm:flex-initial sm:w-auto">
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-3 py-2 bg-white dark:bg-white/10 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg border border-gray-200 dark:border-white/20 focus:border-blue-500 focus:outline-none transition-all duration-300"
          />
        </div>

        {/* Sort */}
        <div className="relative inline-block">
          <button
            ref={sortButtonRef}
            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
            className="px-4 py-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white text-sm rounded-lg border border-gray-200 dark:border-white/20 focus:border-blue-500 focus:outline-none cursor-pointer transition-all duration-200 font-medium flex items-center gap-2"
          >
            📅 Date ({sortOrder === 'newest' ? 'Newest' : 'Oldest'})
            <svg className={`w-4 h-4 transition-transform text-gray-600 dark:text-gray-300 ${sortDropdownOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L5.707 10.707a1 1 0 01-1.414-1.414l6-6z" />
            </svg>
          </button>
        </div>

        {/* Sort Dropdown (Portal) */}
        {sortDropdownOpen &&
          createPortal(
            <div
              className="fixed z-[9999] bg-white dark:bg-[#0b1220] border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl"
              style={{
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                width: '224px', // w-56
              }}
            >
              <button
                onClick={() => {
                  setSortOrder('newest')
                  setSortDropdownOpen(false)
                }}
                className={`w-full px-4 py-3 text-left text-sm cursor-pointer transition-all duration-200 whitespace-nowrap ${
                  sortOrder === 'newest'
                    ? 'bg-blue-600 text-white rounded-t-xl'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-t-xl'
                }`}
              >
                📅 Date (Newest)
              </button>
              <button
                onClick={() => {
                  setSortOrder('oldest')
                  setSortDropdownOpen(false)
                }}
                className={`w-full px-4 py-3 text-left text-sm cursor-pointer transition-all duration-200 whitespace-nowrap ${
                  sortOrder === 'oldest'
                    ? 'bg-blue-600 text-white rounded-b-xl'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-b-xl'
                }`}
              >
                📅 Date (Oldest)
              </button>
            </div>,
            document.body
          )}
      </div>
    </div>
  )
}
