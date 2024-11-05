
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import LocalHelper from "../pages/Helper/LocalHelper";


function Success_Registration() {
    //=================================================
    //Declaration
    var localHelper = new LocalHelper();
    const host_name_Website = localHelper.Hostname_Website();
    var url_string = window.location.href;
    var url = new URL(url_string);
    var data = JSON.parse(url.searchParams.get("data"));
  
    const [text_header_title, set_text_header_title] = useState("");
    const [text_title_on_qr, set_text_title_on_qr] = useState(
      data.url_qr_data.success_register_form.title_on_qr
    );
    const [text_title_sub, set_text_title_sub] = useState(
      data.url_qr_data.success_register_form.title_sub
    );
    const [text_footer_below_qr, set_text_footer_below_qr] = useState(
      data.url_qr_data.success_register_form.footer_below_qr
    );
    const [text_footer_subr, set_text_footer_sub] = useState(
      data.url_qr_data.success_register_form.footer_sub
    );
    const [text_url_name, set_text_url_name] = useState(
      data.url_qr_data.url_name
    );
  
    const [value_data_Of_URL_Registration, set_value_data_Of_URL_Registration] =
      useState({});
    const [value_List_Of_Event, set_value_List_Of_Event] = useState([]);
    const [is_Loading, set_is_Loading] = useState(true);
    const [value_show_in_Qr, set_value_show_in_Qr] = useState("");
    const [
      value_show_in_Qr_Fronted,
      set_value_show_in_Qr_value_show_in_Qr_Fronted,
    ] = useState("");
  
    //=================================================
    //Funtion
    async function PrintDiv() {
      const element = document.getElementById("print"),
        canvas = await html2canvas(element),
        data = canvas.toDataURL("image/jpg"),
        link = document.createElement("a");
  
      link.href = data;
      var title = "";
      value_List_Of_Event.map((row, index) => {
        for (let i of value_List_Of_Event) {
          title +=
            index + 1 == value_List_Of_Event.length ? row.name : row.name + ", ";
        }
      });
  
      link.download = "Ticket QR - " + text_title_on_qr + ".jpg";
  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  
    //=================================================
    //Loading
    useEffect(() => {
      addDataToQR();
    }, []);
  
    function addDataToQR() {
      // Add Data TO Image
      var eventName = [];
      var eventNameQR = "";
      data.event_full.map((row, index) => {
        eventNameQR += row.name;
        return eventName.push(
          <label style={{ width: "100%" }}> {row.name}</label>
        );
      });
  
      set_text_header_title(eventName);
  
      // set QR Code
      var qr = 'Maintain'
         
  
      set_value_show_in_Qr_value_show_in_Qr_Fronted(qr);
  
      // console.log(qr)
    }
  
  
    //=================================================
    //Function
    function encrypt(value) {
      var dataInLeft = "DE";
      var dataInRight = "EN";
  
      var encodeString = m_encrypt(value, dataInLeft, dataInRight);
      return encodeString;
    }
  
    
    function decrypt(value) {
      var decodeString = m_decrypt(value);
      let arr = m_decrypt2(decodeString);
  
      return arr[1];
    }
  
    function m_encrypt(value, dataInLeft, dataInRight) {
      return window.btoa(dataInLeft + "---(" + value + "---(" + dataInRight);
    }
  
    function m_decrypt(value) {
      return window.atob(value);
    }
  
    function m_decrypt2(decodeString) {
      return decodeString.split("---(");
    }
  
    //=================================================
    //View
    return (
      <div>
        <br />
        <div className="container">
          <div className="row">
            <div className="col-12" style={{ textAlign: "center" }}>
              <div
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <div
                  id="print"
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    width: "400px",
                  }}
                >
                  <div
                    style={{
                      borderStyle: "solid",
                      borderRadius: "12px",
                      borderWidth: "0.1px",
                      borderColor: "red",
                      boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.4)",
                      paddingTop: "20px",
                    }}
                  >
                    <img
                      src={localHelper.Logo_MSA()}
                      style={{
                        width: "50%",
                        height: "50px",
                        objectFit: "contain",
                      }}
                      alt=""
                    />
                    <br />
                    {text_header_title}
                    <br /> <br />
                    <h5 style={{ marginBottom: "-1px" }}>{text_title_on_qr}</h5>
                    <label style={{ color: "gray", fontSize: "12px" }}>
                      {text_title_sub}
                    </label>
                    <br />
                    <br />
                    <QRCode
                      size={256}
                      style={{ height: "auto", maxWidth: "100%", width: "60%" }}
                      value={value_show_in_Qr_Fronted}
                      viewBox={`0 0 256 256`}
                    />
                    <br /> <br />
                    <h6 style={{ width: "100%", marginBottom: "-2px" }}>
                      {text_footer_below_qr}
                    </h6>
                    <label
                      style={{
                        color: "gray",
                        marginBottom: "20px",
                        width: "100%",
                        fontSize: "12px",
                      }}
                    >
                      {text_footer_subr}
                    </label>
                    <label
                      style={{
                        color: "gray",
                        marginBottom: "20px",
                        width: "100%",
                        fontSize: "7px",
                      }}
                    >
                      Powered by Cyber Tech System
                    </label>
                  </div>
                </div>
              </div>
  
              <br />
              <div>
                <button
                  onClick={() => PrintDiv()}
                  style={{ marginRight: "10px" }}
                  type="button"
                  className="btn btn-outline-success"
                >
                  Save QR Ticket
                </button>
              </div>
  
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }

export default Success_Registration
