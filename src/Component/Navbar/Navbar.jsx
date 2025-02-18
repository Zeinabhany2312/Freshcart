import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import { UserContext } from '../Context/UserContext'
import { CartContext } from '../Context/CartContext'



export default function Navbar() {
  let { numsItem } = useContext(CartContext)
  let { userToken, setUserToken } = useContext(UserContext)
  let navg = useNavigate()

  function Logout() {
    localStorage.removeItem('userToken')
    setUserToken(null)
    navg('/login')
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="home"><img src={logo}></img></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userToken != null ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <NavLink className="nav-link" to="home">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="prouducts">prouducts</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="categories">categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="brands">Brands</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="cart">cart</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="allOrders">All Orders</NavLink>
              </li>
            </ul> : ''}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center">
                <i className='fa-brands fa-facebook-f mx-2'></i>
                <i className='fa-brands fa-twitter mx-2'></i>
                <i className='fa-brands fa-instagram mx-2'></i>
                <i className='fa-brands fa-youtube mx-2'></i>
                <i className='fa-brands fa-pinterest mx-2'></i>
              </li>

              {userToken != null ? <>

                <li className="nav-item d-flex">
                  <NavLink to='/cart'>
                    <div className='position-relative'>
                      <i className='fa-solid fa-cart-shopping  nav-link text-main'></i>
                      <span className='position-absolute top-0 end-0 translate-middle-y fs-6'>{numsItem}</span>
                    </div>
                  </NavLink>
                </li>

                <li> <span className='nav-link cursor-pointer' onClick={Logout}>logOut</span></li>  </> : <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="login">login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="register">register</NavLink>
                </li>
              </>}


            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
