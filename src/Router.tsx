import { createBrowserRouter } from 'react-router-dom'

import { NotFound404 } from './pages/NotFound404'
import { Home } from './pages/Home'
import { Details } from './pages/Details'
import { DefaultLayout } from './layouts/DefautLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <NotFound404 />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/details/:characterId',
        element: <Details />,
      },
    ],
  },
])
