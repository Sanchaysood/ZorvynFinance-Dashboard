import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { useScrollObserver } from '../hooks/useScrollObserver'
import NavbarNew from '../components/NavbarNew'
import HeaderNew from '../components/HeaderNew'
import SummaryCardsNew from '../components/SummaryCardsNew'
import ChartSectionNew from '../components/ChartSectionNew'
import FilterBarNew from '../components/FilterBarNew'
import TransactionsTableNew from '../components/TransactionsTableNew'
import InsightsNew from '../components/InsightsNew'
import FooterNew from '../components/FooterNew'
import AddTransactionModal from '../components/AddTransactionModal'

export default function DashboardNew() {
  const { role } = useAppContext()
  const [modalOpen, setModalOpen] = useState(false)
  const isAdmin = role === 'Admin'

  // Scroll animation refs
  const summaryRef = useScrollObserver()
  const chartsRef = useScrollObserver()
  const filterRef = useScrollObserver()
  const transactionsRef = useScrollObserver()
  const insightsRef = useScrollObserver()
  return (
    <div className="min-h-screen w-full flex flex-col transition-colors duration-300">
      {/* Navbar */}
      <NavbarNew />

      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
          {/* Header */}
          <HeaderNew />

          {/* Summary Cards */}
          <section ref={summaryRef} className="scroll-animate">
            <SummaryCardsNew />
          </section>

          {/* Charts Section */}
          <section ref={chartsRef} className="scroll-animate">
            <ChartSectionNew />
          </section>

          {/* Filter Bar */}
          <section ref={filterRef} className="scroll-animate overflow-visible">
            <FilterBarNew />
          </section>

          {/* Add Transaction Button - Admin only */}
          {isAdmin && (
            <div className="flex justify-end">
              <button
                onClick={() => setModalOpen(true)}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg text-sm sm:text-base"
              >
                + Add Transaction
              </button>
            </div>
          )}

          {/* Transactions Table */}
          <section ref={transactionsRef} className="scroll-animate overflow-visible">
            <TransactionsTableNew />
          </section>

          {/* Insights */}
          <section ref={insightsRef} className="scroll-animate">
            <InsightsNew />
          </section>

          {/* Footer */}
          <FooterNew />
        </div>
      </main>

      {/* Add/Edit Transaction Modal */}
      <AddTransactionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
