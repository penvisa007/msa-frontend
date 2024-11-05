import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Loading from '../component/Loading';
import axios from 'axios';
import Swal_Helper from '../Helper/Swal_Helper';
import logo from '../asset/msa_logo_jpg.png'
import google_icon from '../asset/google_icon.png'
import Button_const from '../component/Button_const';
import API from '../Helper/API';
import CookieAndSession from '../Helper/CookieAndSession';


function Login() {

  useEffect(()=>{
    Homepage()
  },[])     

  const swal_helper = new Swal_Helper();
  const cookieAndSession = new CookieAndSession();

  const [is_loading, set_isLoading] = useState(false);

  const api = new API()

 

  function Homepage(){
    
    const file_login = cookieAndSession.Cookie_Get_As_Object('login')

    if (file_login) {

    // console.log(file_login)
      
     window.location.replace("/msa/admin/dashbord")

    }
  }
 
    const login = useGoogleLogin({
        onSuccess: async (response) => {
          console.log(response.access_token);
          try {
            const res = await axios.get(
              "https://www.googleapis.com/oauth2/v3/userinfo",
              {
                
                headers: {
                  Authorization:`Bearer ${response.access_token}` 
                },
              }
            );
    
            set_isLoading(true);

            check_api_google_login(res.data,response.access_token);
            

          } catch (e) {
            console.log(e);
          }
        },
        onError: (rers) => {
          console.log(rers)
    
        }
      });


      function check_api_google_login(data_user,token_google) {

  //      console.log(data_user.email);


        const data = {
          "email" : data_user.email
      }


        axios.post(api.URL_login() + '/' + data_user.email, data)
          .then(function (response) {

           

            if(response.data.status_login == true){
              // Save Cookie For Go to Next Page

              complete_login(data_user,response.data,token_google);
            }else{

              //Failed Login
              set_isLoading(false);
              swal_helper.Swal_Custom_Toast_Failed("Invalid Gmail, Please contact your administrator!");
            }
        
            

          })
      }


      function complete_login(api_google,api_server,token_google) {
        // Save Cookie For Go to Next Page

        var data = {data_google:[
                    {
                      data_user: api_google},
                      {token_google: token_google}
                      
                  ],
                    data_server:api_server,
                  }

        cookieAndSession.Cookie_Set_As_Object("login", data, 30);

        Homepage()
       // console.log(cookieAndSession.Cookie_Get_As_Object("login"));


      }



  return (

    <div className='container-fluid p-4 background-radial-gradient overflow-hidden'>
      <div className='row justify-content-center'>
 

          <div className='col-6 position-relative'>

          <div className="card my-5 bg-glass" style={{borderRadius: "15px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}> 
              <div className="card-body p-5">
                <div className="text-center">
                <img style={{width: "100%", height: "100px" , objectFit: "contain"}} src={logo} alt="" />
                    <h4>MSA Maketing Solutions Asia Ltd </h4>
                      <br />
                    <label htmlFor="">Let's Login</label>
                   <p>You need to sign in with google.</p>

                  <hr />
                 
                    <img style={{width: "100%", height: "40px" , objectFit: "contain"}} src={google_icon} alt="" />
                    <br /><br />
                    

                  {is_loading == true ? <Loading title="Please wait a moment...." /> : is_loading == false ? <Button_const event={login}style={0} title="Sign In With Google"/> : <Button_const event={login}style={0} title="Sign In With Google"/>}

                      

                    
               

                </div>
     
              </div>

          </div>


          {/* <div style={{position: "fixed", bottom: "0", marginBottom: "20px", textAlign: "center", width: "100%"}} className="footer">

            <label style={{width:"100%" , backgroundColor: "red", textAlign: "center"}} htmlFor="">Hii</label>

          </div> */}
          </div>

      </div>
    </div>
    
  )
}

export default Login
