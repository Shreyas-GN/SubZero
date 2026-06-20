import { Toaster } from 'react-hot-toast'
import AppRoutes from './routes/AppRoutes'

const App = () => (
  <>
    <AppRoutes />
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: '#18181B',
          color: '#FAFAFA',
          border: '1px solid #27272A',
          borderRadius: '10px',
          fontSize: '14px',
        },
        success: { iconTheme: { primary: '#22C55E', secondary: '#18181B' } },
        error: { iconTheme: { primary: '#EF4444', secondary: '#18181B' } },
      }}
    />
  </>
)

export default App
