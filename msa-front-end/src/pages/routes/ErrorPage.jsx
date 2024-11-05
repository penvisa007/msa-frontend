import React from 'react'
import errorpage from '../asset/404_page-not-found.png'

function ErrorPage() {
  return (
    <div>
      <img style={{width:"100%",height:'100%'}} src={errorpage} alt="" />
    </div>
  )
}

export default ErrorPage
