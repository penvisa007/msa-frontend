import React from 'react'
import { Button } from 'react-bootstrap'

function Main_Routes() {
  return (
    <div style={{padding: "20px"}}>
       <h3>Sandbox V1</h3>
       <hr />
       <h5>This is Version Test</h5>

       <button style={{marginBottom: "20px"}} type="button" onClick={() => window.location.href = "/sandbox/v1/dashbord"} class="btn btn-outline-info">1.Dashboard </button>
       <a style={{marginLeft:'10px'}} href="">https://msa-server-db.web.app/sandbox/v1/dashbord</a>
       
       <br />
       <button style={{marginBottom: "20px"}} type="button"  onClick={() => window.location.href = "/sandbox/v1/generate_qr/?key=-O9Z5yR_Fpb0-KcL4W3y"} class="btn btn-outline-info">2.Genrate QR Code Event Openceremony </button>
       <a style={{marginLeft:'10px'}} href="">https://msa-server-db.web.app/sandbox/v1/generate_qr/?key=-O9Z5yR_Fpb0-KcL4W3y</a>
       <br />
       <button style={{marginBottom: "20px"}} type="button" onClick={() => window.location.href = "/sandbox/v1/generate_qr/?key=-O9Z6AVkkyeUGrviXfR4"} class="btn btn-outline-info">3.Genrate QR Code Event Award Night </button>
       <a style={{marginLeft:'10px'}} href="">https://msa-server-db.web.app/sandbox/v1/generate_qr/?key=-O9Z6AVkkyeUGrviXfR4</a>
       <br />
       <button style={{marginBottom: "20px"}} type="button" onClick={() => window.location.href = "/sandbox/v1/generate_qr/?key=-O9Z6P1tHGfAZDBWUp8T"} class="btn btn-outline-info">4.Genrate QR Code Event Openceremony & Award Night Optional </button>
       <a style={{marginLeft:'10px'}} href="">https://msa-server-db.web.app/sandbox/v1/generate_qr/?key=-O9Z6P1tHGfAZDBWUp8T</a>
       <br />
       <h5>Noted: Please Test it on chrome.</h5>
       <div style={{color:'darkgray'}} className="div"><h6>- The Link 1 Dashbord is show data summary abot event and guest join event.</h6>
       <h6>- The Link 2 Genrate QR Code is show QR Code Open Ceremony.</h6>
       <h6>- The Link 3 Genrate QR Code is show QR Code Award Night.</h6>
       <h6>- The Link 4 Genrate QR Code is show QR Code Openceremony/Award Night.</h6></div>
    </div>
  )
}

export default Main_Routes
