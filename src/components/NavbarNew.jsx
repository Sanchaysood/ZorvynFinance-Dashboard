import { Download, Moon, Sun, FileJson, ChevronDown } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { useState, useEffect } from 'react'

export default function NavbarNew() {
  const { role, theme, toggleTheme, switchRole, exportToCSV, exportToJSON } = useAppContext()
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false)
  const [roleAnimating, setRoleAnimating] = useState(false)
  const [navbarVisible, setNavbarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show navbar when at top of page
      if (currentScrollY < 50) {
        setNavbarVisible(true)
        setLastScrollY(currentScrollY)
        return
      }

      // Compare scroll direction
      if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setNavbarVisible(true)
      } else {
        // Scrolling down - hide navbar
        setNavbarVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleExportCSV = () => {
    exportToCSV()
    setExportDropdownOpen(false)
  }

  const handleExportJSON = () => {
    exportToJSON()
    setExportDropdownOpen(false)
  }

  const handleRoleToggle = () => {
    setRoleAnimating(true)
    const newRole = role === 'Admin' ? 'Viewer' : 'Admin'
    switchRole(newRole)
    setTimeout(() => setRoleAnimating(false), 600)
  }

  return (
    <nav className={`sticky top-0 z-50 flex items-center justify-between h-16 px-6 bg-white dark:bg-white/5 border-b border-gray-200 dark:border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.05)] dark:shadow-none overflow-visible transform transition-transform duration-300 ease-in-out ${
      navbarVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      {/* Left: Logo */}
      <div className="flex items-center">
        <img
          src={theme === 'light' ? '/assets/zorvynfulllogolight.png' : '/assets/zorvynfulllogo.png'}
          alt="Zorvyn"
          className="h-7 w-auto object-contain transition-all duration-300"
        />
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Export Dropdown */}
        <div className="relative inline-block">
          <button
            onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
            className="px-4 py-2 rounded-lg text-sm flex items-center gap-2 bg-gray-100 text-gray-900 dark:bg-white/10 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-300"
          >
            <Download size={16} className="text-gray-600 dark:text-gray-300" />
            Export
            <ChevronDown size={14} className="text-gray-600 dark:text-gray-300" />
          </button>

          {exportDropdownOpen && (
            <div className="absolute left-0 top-full mt-2 w-48 rounded-xl shadow-lg z-[999] bg-white dark:bg-[#0b1220] border border-gray-200 dark:border-white/10">
              <button
                onClick={handleExportCSV}
                className="w-full rounded-lg flex items-center gap-2 px-4 py-2 text-sm cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300"
              >
                <Download size={14} className="text-gray-600 dark:text-gray-300" />
                Export as CSV
              </button>
              <button
                onClick={handleExportJSON}
                className="w-full rounded-lg flex items-center gap-2 px-4 py-2 text-sm cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 border-t border-gray-200 dark:border-white/10"
              >
                <FileJson size={14} className="text-gray-600 dark:text-gray-300" />
                Export as JSON
              </button>
            </div>
          )}
        </div>

        {/* Role Toggle Button */}
        <button
          onClick={handleRoleToggle}
          className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
            role === 'Admin'
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-900 dark:bg-white/10 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20'
          } transform ${
            roleAnimating ? 'scale-95' : 'scale-100'
          }`}
          style={{
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transformOrigin: 'center',
          }}
        >
          {roleAnimating ? (
            <span className="inline-block" style={{
              animation: 'spin 0.6s ease-in-out',
            }}>
              ⟳
            </span>
          ) : (
            role
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-300"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <Moon size={18} />
          ) : (
            <Sun size={18} />
          )}
        </button>
      </div>
    </nav>
  )
}
