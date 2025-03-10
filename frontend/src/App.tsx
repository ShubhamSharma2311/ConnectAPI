
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import LearnMorePage from './pages/LearnMorePage'
import AdminListApiPage from './pages/AdminPage'

const router = createBrowserRouter([
  {
    path : '/',
    element : <LandingPage/>
  },
  {
    path : '/login',
    element : <AuthPage/>
  },
  {
    path : '/signup',
    element : <AuthPage/>
  },{
    path : '/learn-more',
    element : <LearnMorePage/>
  },{
    path : '/admin-page',
    element : <AdminListApiPage/>
  }
])

function App() {
  

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
