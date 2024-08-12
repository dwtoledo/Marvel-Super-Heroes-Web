import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'

import './reset.css'
import './global.css'

createRoot(document.getElementById('root')!).render(
  <App />,
)
