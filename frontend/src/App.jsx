
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
// import Jobs from "./components/admin/AdminJobs"
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'

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


      element:<ProtectedRoute> <Companies/> </ProtectedRoute>  
    },
    {
      path: "/admin/companies/create",
      element: <CompanyCreate />
    },
    {
      path: "/admin/companies/:id",
      element: <CompanySetup />
    },
    {
      path: "/admin/jobs",
      element: <AdminJobs />
    }, {
      path: "/admin/jobs/create",
      element: <PostJob />
    },

    {
      path: "/admin/jobs/:id/applicants",
      element: <Applicants/>
    }




  ])


  return (
    <div>


      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
