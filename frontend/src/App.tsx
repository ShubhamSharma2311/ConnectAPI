
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/authPage'
import LearnMorePage from './pages/LearnMorePage'

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
