import dynamic from 'next/dynamic'
import { LoadingPage } from '@/components/ui/loading-states'

// Lazy load the settings page component
const AdminSettingsPage = dynamic(
  () => import('./page').then(mod => ({ default: mod.default })),
  {
    loading: () => <LoadingPage />,
    ssr: false // Disable SSR for admin pages
  }
)

export default AdminSettingsPage