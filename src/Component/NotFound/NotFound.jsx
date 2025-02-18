import React from 'react'
import notfound from'../../assets/images/error.svg'

export default function Notfound() {
  return (
    <div>
      <img src={notfound} className='d-block m-auto'></img>
    </div>
  )
}
