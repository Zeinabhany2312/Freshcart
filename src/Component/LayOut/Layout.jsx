import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { UserContext } from '../Context/UserContext'
import { CartContext } from '../Context/CartContext'

export default function Layout() {

  let { getUserCart, setItemNum } = useContext(CartContext)

  let { setUserToken } = useContext(UserContext)
  useEffect(() => {
    if (localStorage.getItem('userToken') != null) {
      setUserToken(localStorage.getItem('userToken'))
      getUserData()

    }
  }, [])

  async function getUserData() {
    let req = await getUserCart().catch((err)=>{
      console.log(err);
    })
    console.log(req);
    if (req?.data?.status == 'success') {
      setItemNum(req.data.numOfCartItems)
    }
  }

  return (
    <>
      <Navbar />
      <div className='container py-5 my-3'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
