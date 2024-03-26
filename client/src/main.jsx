import React from 'react'
import ReactDOM from 'react-dom/client'

//Import de routage
import { createBrowserRouter, RouterProvider} from 'react-router-dom'

//Pages
import App from './app.jsx'
import Accueil from '@pages/Accueil.jsx'
import Login from '@pages/Login.jsx'
import Register from '@pages/Register.jsx'
import NoPage from '@pages/NoPage.jsx'

//Router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Accueil />
      },
      {
        path: '/auth/login',
        element: <Login />
      },
      {
        path: '/auth/register',
        element: <Register />
      },
      {
        path: '/*',
        element: <NoPage />
      }
    ]
  }
])

//Appliquer les changements dans la page
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)