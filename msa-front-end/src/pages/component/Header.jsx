import React, { useEffect, useState } from 'react'
import logo from '../asset/msa_logo_jpg.png'
import { Button } from 'react-bootstrap';
import CookieAndSession from '../Helper/CookieAndSession';
import { CiLogout } from "react-icons/ci";
import Swal from 'sweetalert2';

function Header(props) {

  var cookieAndSession = new CookieAndSession()
  var file_logiin = cookieAndSession.Cookie_Get_As_Object('login')

  const [picture_pf , set_picture_pf] = useState('')
  const [name , set_name] = useState('')
  const [role , set_role] = useState('')

  useEffect(()=>{
    if(file_logiin){
      set_picture_pf(file_logiin.data_google[0].data_user.picture)
      set_name(file_logiin.data_google[0].data_user.name)
      set_role(file_logiin.data_server.user.role)
      


    }
  },[])

  function event_logout(){

    Swal.fire({
      title: 'Do you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {
        cookieAndSession.Cookie_Remove('login')
        setTimeout(() => {
          window.location.replace('/msa/admin/login')
        },500)
      }
    })
   


  }


 return (
   
     <div style={{
       height: props.height,
       width: props.width,
       position: props.position,
       backgroundColor: props.backgroundColor,
      borderBottom: "2px solid #dedede", 
       padding: "10px",
       boxShadow: "0 2px 0 rgba(128, 128, 128, 0.2)" // Update this line
     }}>
       <div className="container-fluid m-0 p-0 ">
         <div className="row">
           <div className="col-12">
             <nav className="navbar">
   

               <div style={{marginLeft:'10px', marginTop:'25px', position: "absolute", justifyContent: "space-between",display: "flex" , width:'100%'   }} className="" id="navbarSupportedContent">
               
                   <a className="" href="#"><img width={"100px"} height={"50px"} style={{ objectFit: 'contain', }}  onClick={()=> window.location.reload()} src={logo} alt="" /></a>

                  <a
                    style={{ marginTop: "0px", marginRight: "10px" }}
                    className="nav-link"
                    href="#"
                  >
                     <span className="sr-only"><label style={{color:'gray',fontSize:'12px' , marginRight:'10px' , textAlign:'right'}} htmlFor="">{name} <br />Login As: {role}</label></span>
                     
                    
                    <img
                      style={
                        {borderRadius:'50%', marginRight:'10px',borderWidth:"1px", borderColor:'gray'}
                      }
                      width={"40px"}
                      height={"40px"}
                      referrerPolicy='no-referrer'
                      src={picture_pf}
                      alt=""
                    />
                   
                    <Button
                      type="button"
                      onClick={()=>event_logout()}
                      className="btn btn-primary"
                      style={{
                        padding: '10px 20px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        borderRadius: '5px',
                        borderColor: '#337ab7',
                        backgroundColor: '#337ab7',
                        color: '#fff',
                        cursor: 'pointer',
                      }}
                    >
                      <CiLogout /> Logout
                    </Button>
                  </a>
            
               </div>
             </nav>
           </div>
         </div>
       </div>
     </div>
   
 );
}

export default Header
