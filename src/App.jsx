import { AppProvider } from './context/AppContext'
import DashboardNew from './pages/DashboardNew'

export default function App() {
  return (
    <AppProvider>
      <DashboardNew />
    </AppProvider>
  )
}
