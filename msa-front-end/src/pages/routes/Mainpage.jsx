import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './Homepage'
import MyHelper from '../Helper/MyHelper'
import "../component/font_khmer.css"
import ErrorPage from './ErrorPage'
import Login from '../login/Login'
import Summary from '../dashboard/summary_dashboard/Summary'
import User_List from '../dashboard/user/User_List'
import CookieAndSession from '../Helper/CookieAndSession'
import Footer from '../component/Footer'
import Header from '../component/Header'
import SidebarLeft from '../component/SidebarLeft'
import Breadcrumb from '../component/Breadcrumb'
import Generate_QR from '../dashboard/generate_qr/Generate_QR'
import Main_Report from '../dashboard/report/Main_Report'
import Client_Join_Event from '../dashboard/client/Client_Join_Event'
import Public_Registraion_URL from '../dashboard/public_registration_url/Public_Registration_URL'
import Client_Not_Joing_Event from '../dashboard/client/Client_Not_Joing_Event'
import Event_Coming from '../dashboard/Events/Event_Coming'
import Event_Coomplete from '../dashboard/Events/Event_Complete'
import Event_Session_Tracking from '../dashboard/Events/Session_Tracking'
import Registratin_URL from '../dashboard/registration_url/Registration_URL'
import Event_New from '../dashboard/Events/Event_New'
import Event_Coming_Detail from '../dashboard/Events/Event_Coming_Detail'
import Create_URL_QR_Code  from '../dashboard/registration_url/Create_URL_QR_Code'  
import Dashbord from '../dashboard/summary_dashboard/Dashboard'
import Event_Detail_Chart from '../dashboard/Events/Event_Detail_Chart'
import All_URL from '../dashboard/registration_url/All_URL'
import URL_QR_Code_Generator from '../dashboard/registration_url/URL_QR_Code_Generator'
import Online_Registration_Form from '../dashboard/registration_url/Online_Registration_Form'
import Generate_QR_For_Guest from '../dashboard/registration_url/Generate_QR_For_Guest'
import Scanning_QR_Entrance from '../dashboard/registration_url/Scanning_QR_Entrance'
import Guest_Registered from '../dashboard/client/Guest_Registered'
import Guest_Detail from '../dashboard/client/Guest_Detail'
import Dashboard_SendBox from '../../sendbox_page/Dashboard_SendBox'
import Step_1_Generate_QRCode_Registration from '../dashboard/registration_url/Step_1_Generate_QRCode_Registration'
import Step_2_Registration_From from '../dashboard/registration_url/Step_2_Registration_From'
import Step_3_Generate_QR_Ticket_For_Guest from '../dashboard/registration_url/Step_3_Generate_QR_Ticket_For_Guest'
import Step_4_Entrance_Ticket_Scan_QRCode from '../dashboard/registration_url/Step_4_Entrance_Ticket_Scan_QRCode'
import Event_Detail_All from '../dashboard/Events/Event_Detail_All'
import Guest_By_Event from '../dashboard/client/Guest_By_Event'
import QR_Scanner from '../dashboard/setting/QR_Scanner'
import AuthorizationPage from '../dashboard/setting/AuthorizationPage'
import Event_Both_Report from '../dashboard/All_Event_Report/Event_Both_Report'


const myHelper = new MyHelper()
const cookieAndSession = new CookieAndSession()
function Mainpage(props) {

  const file_login = cookieAndSession.Cookie_Get_As_Object('login')
  
  const routes = [
 
    { path: "/msa/admin/qr_scanner", element: <QR_Scanner login={file_login} />, breadcrumb: ['Setting','QR Scanner'] },
    { path: "/msa/admin/dashbord", element: <Dashbord login={file_login} />, breadcrumb: ['Dashboard','Summary'] },
    { path: "/msa/admin/customization/event/guest/both-pending", element: <Event_Both_Report login={file_login} />, breadcrumb: ['Setting','All Event','Report'] },
     { path: "/msa/admin/event", element: <Event_Coming login={file_login}  />, breadcrumb: ['Events','All','List'] },
    { path: "/msa/admin/event/detail-all/:key_of_event", element: <Event_Detail_All login={file_login}  />, breadcrumb: ['Events','All','Detail'] },
    { path: "/msa/admin/guest/list/by-event", element: <Guest_By_Event login={file_login}  />, breadcrumb: ['Guests','Event' ,'List'] },
    // { path: "/event-completed", element: <Event_Coomplete login={file_login}  />  , breadcrumb: breadcrumb_event_complete },
    // { path: "/event-session-tracking", element: <Event_Session_Tracking login={file_login}  />, breadcrumb: breadcrumb_event_session_tracking },
    // { path: "/registration-url", element: <Registratin_URL login={file_login}  />, breadcrumb: breadcrumb_registration_url },
    // { path: "/public-registration-url", element: <Public_Registraion_URL login={file_login}  />, breadcrumb: breadcrumb_public_registration_url },
    // { path: "/generate-qr", element: <Generate_QR login={file_login} />, breadcrumb: breadcrumb_generate_qr },
    
     { path: "/msa/admin/user/list", element: <User_List login={file_login} />, breadcrumb: ['Users','List'] },
     { path: "/msa/admin/event-new", element: <Event_New login={file_login} />, breadcrumb: ['Events','Event_New'] },
     { path: "/msa/admin/event/details", element: <Event_Coming_Detail login={file_login} />, breadcrumb: ['Events','Detail'] },
    // { path: "/create-url-qr-code", element: <Create_URL_QR_Code login={file_login} />, breadcrumb: breadcrumb_create_url_qr },
     { path: "/msa/admin/event/detail/chart", element: <Event_Detail_Chart login={file_login} />, breadcrumb: ['Events','Detail_Chart']  },
     { path: "/msa/admin/url/all", element: <All_URL login={file_login} />, breadcrumb: ['URL','All','List'] },
     { path: "/msa/admin/url-and-link/generate/registration-form/:key_of_url_and_link", element: <Step_1_Generate_QRCode_Registration login={file_login} />, breadcrumb: ['URL','URL Detail'] },
   
    // { path: "/qr-code-generate", element: <URL_QR_Code_Generator login={file_login} />, breadcrumb: breadcrumb_url_generate },
    // { path: "/event/registration", element: <Online_Registration_Form login={file_login} />, breadcrumb: breadcrumb_url_online_registration },
    // { path: "/completed/registration-event", element: <Generate_QR_For_Guest login={file_login} />, breadcrumb: breadcrumb_generate_qr_for_guest },
    // { path: "/guest/qr-code/event/scan", element: <Scanning_QR_Entrance login={file_login} />, breadcrumb: breadcrumb_scan_qr_entrance},
     { path: "/msa/admin/guests/registered", element: <Guest_Registered login={file_login} />, breadcrumb: ['Guest',"Registered",'List'] },
     { path: "/msa/admin/guest/detail/:key_of_guest", element: <Guest_Detail login={file_login} />, breadcrumb: ['Guest','Detail'] },
    // { path: "/sendbox/v1/dashboard_sendbox", element: <Dashboard_SendBox login={file_login} />, breadcrumb: ''},


  ];
  function check_login_with_routes(){
    if(file_login){
       return routes.map((route, index) => (
      <Route key={index} path={route.path} element={Design_Route(route.path, route.element, route.breadcrumb)} />
    ))
    }
   
  }
  return (
    
    <BrowserRouter>
    <Routes>
      {check_login_with_routes()}
      
      <Route path="/msa/guest/fill/register-form/:key_of_url_and_link" element={<Step_2_Registration_From />} />
      <Route
          path="/msa/guest/ticket-qr/registration"
          element={<Step_3_Generate_QR_Ticket_For_Guest />}
          
        />
         <Route
          path="/msa/user/authorization/camera/guest/:key_of_camera_authorization"
          element={<AuthorizationPage />}
          
        />
        <Route
          path="/msa/guest/authorization/scan/registration"
          element={<Step_4_Entrance_Ticket_Scan_QRCode />  } 
        />
        <Route path="/msa/admin/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>


  )

  

  function Design_Route(path, component, breadcrumb) {
    return (


      <div  className="container-fluid w-100 h-100 px-0 overflow-hidden">
        <div className="row">
          <div className="col-12">
            <Header width={'100%'} position={'fixed'} backgroundColor={'whitesmoke'} height={'60px'}  />

            <SidebarLeft path={path} width={'250px'} position={'fixed'}  height={'calc(100vh - 60px - 40px)'} marginTop={'60px'} />

              <div style={{
                position: 'fixed',
                width: 'calc(100% - 250px)',
                marginLeft: '250px',
                marginTop: '60px',
                height: 'calc(100vh - 60px - 40px)'
              }}>
                <Breadcrumb breadcrumb={breadcrumb} width={'100%'} position={'fixed'} backgroundColor={'#dedede'} height={'40px'} padding={'10px'} />

                <div style={{
                   height: 'calc(100vh - 60px',
                  overflowY: 'auto', // Add this line
                }} className="div">
                   {component}
                </div>

              
              </div>

            <Footer width={'100%'} position={'fixed'} backgroundColor={'white'} height={'40px'} padding={'10px'} color ={'orange'} />
          </div>
        </div>
        
      </div>


    )



  }
}

export default Mainpage;