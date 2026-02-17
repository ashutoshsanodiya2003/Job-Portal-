
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/shared/Navbar'
import Home from './components/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'

function App() {

  const appRouter = createBrowserRouter([

    {
      path: '/',
      element: <Home />
    },
    {
      path: '/register',
      element: <Register />
    }, {
      path: '/login',
      element: <Login />
    },
    {
      path: '/jobs',
      element: <Jobs />

    },
    {
      path: '/browse',
      element: <Browse />

    },
    {
      path: '/profile',
      element: <Profile />

    },
    {
      path: '/description/:id',

      element: <JobDescription />

    }
    // admin ke liye yaha se start hoga 
    ,
    {
      path: "/admin/companies",


      element: <Companies />
    },
    {
      path: "/admin/companies/create",
      element: <CompanyCreate />
    },
    {
      path: "/admin/companies/:id",
      element: <CompanySetup />
    }

  ])


  return (
    <div>


      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
