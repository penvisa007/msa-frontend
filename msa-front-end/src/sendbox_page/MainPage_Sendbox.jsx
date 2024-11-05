import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main_Routes from './Main_Routes';
import Dashboard_SendBox from './Dashboard_SendBox';
import Generate_QrCode_Sendbox from './Generate_QrCode_Sendbox';
import Registration_SendBox from './Registration_SendBox';
import Success_Registration from './Success_Registration';


function MainPage_Sendbox() {
    return (
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<Main_Routes />} />
         <Route path="/sandbox/v1/dashbord" element={<Dashboard_SendBox />} />
         <Route path="/sandbox/v1/generate_qr" element={<Generate_QrCode_Sendbox />} />
         <Route path="/sandbox/v1/registration" element={<Registration_SendBox />} />
         <Route path="/sandbox/v1/completed/registration-event" element={<Success_Registration />} />
       </Routes>
     </BrowserRouter>
      );
}

export default MainPage_Sendbox
