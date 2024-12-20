import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Footer from './components/Footer'
import Pnf from './pages/Pnf'
import { useContext } from 'react'
import { tokenContext } from './context/TokenAuth'

function App() {
const{authorisedUser,setAuthorisedUser} = useContext(tokenContext)
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Auth/>}></Route>
      <Route path='/register' element={<Auth insideRegister={true}/>}></Route>
     {authorisedUser &&
      <>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/projects' element={<Projects/>}></Route>
     </>}
      <Route path='/*' element={<Pnf/>}></Route>
    </Routes>
     <Footer/>
    </>
  )
}

export default App
