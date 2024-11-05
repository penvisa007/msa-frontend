import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Mainpage from './pages/routes/Mainpage';
import Login from './pages/login/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import "./pages/login/login.css";
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Generate_QrCode_Sendbox from './sendbox_page/Generate_QrCode_Sendbox';
import Dashboard_SendBox from './sendbox_page/Dashboard_SendBox';
import MainPage_Sendbox from './sendbox_page/MainPage_Sendbox';
const google_client_id = "383213298703-08kqiagq0uie39rm06jgg4vc5llcuokq.apps.googleusercontent.com"
const client_secret = "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"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  // <Dashboard_SendBox/>
  <React.StrictMode>
    <GoogleOAuthProvider clientId={google_client_id}>
      <Mainpage />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
