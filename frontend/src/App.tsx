
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import LearnMorePage from './pages/LearnMorePage'
import AdminHomePage from './pages/AdminHomePage'
import AdminLayout from './layout/AdminLayout'
import MyAPIs from './pages/MyApi'
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
    path : '/admin/',
    element : <AdminLayout/>,
    children : [{
      path : "",
      element : <AdminHomePage/>
    },{
      path : 'my-apis',
      element : <MyAPIs/>
    },{
      path : 'create-api',
      element : <AdminListApiPage/>
    }]
    
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
