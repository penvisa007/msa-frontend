import React from 'react'
import loading_orange from '../asset/loading_orange.gif'

function Loading(props) {
  return (
    <div style={{width : '100%', justifyContent:'center' , margin:'10px'}}>

      <img src={loading_orange} style={{width: "100%", height: "50px", objectFit: "contain"}}/>
      <br />
        <label style={{color: "gray", fontSize: "12px", marginTop: "10px", textAlign: "center"}}>{props.title}</label>

    </div>
  )
}

export default Loading
