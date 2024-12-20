import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenContext } from '../context/TokenAuth'


const Header = ({insideDashboard}) => {
  const {authorisedUser,setAuthorisedUser}= useContext(tokenContext)
 const navigate= useNavigate()
 const logout = ()=>{
  sessionStorage.clear()
 setAuthorisedUser(false)
  navigate('/')
}
  return (
    <Navbar style={{zIndex:1}} className="shadow border rounded position-fixed w-100">
    <Container>
      <Navbar.Brand href="#home">
      <Link to={'/'} className='text-decoration-none fw-bolder'><i className='fa-brands fa-docker'></i>Project Fair</Link>
      </Navbar.Brand>
      {
        insideDashboard &&
        <button onClick={logout} className='btn btn-link fw-bolder text-decoration-none'>Logout<i className='fa-solid fa-right-from-bracket ms-1'></i></button>
      }
    </Container>
  </Navbar>
  )
}

export default Header