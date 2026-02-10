
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/shared/Navbar'
import Home from './components/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Jobs from './components/Jobs'
import Browse from './components/Browse'

function App() {

  const appRouter = createBrowserRouter([

    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/register',
      element:<Register/>
    },{
      path:'/login',
      element:<Login/>
    },
    {
      path:'/jobs',
      element:<Jobs/>

    },
     {
      path:'/browse',
      element:<Browse/>

    }
  ])
  

  return (
    <div>


      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
