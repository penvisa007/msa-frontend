import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { MdEvent } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { useParams } from "react-router";
import logo from "../pages/asset/msa_logo_jpg.png";
import { IoQrCodeSharp } from "react-icons/io5";
import LocalHelper from "../pages/Helper/LocalHelper";

const Generate_QrCode_Sendbox = () => {
    //************************************/
    //Declaration
    var localHelper = new LocalHelper();
    var url_string = window.location.href;
    var url = new URL(url_string);
    var data = url.searchParams.get("key");
  
    const host_name_Server = 'https://us-central1-msa-server-db.cloudfunctions.net';
    const host_name_Website = 'https://msa-server-db.web.app';
    const api_registration_url = "/api/registration-url";
    const api_event = "/api/event";
    const key_of_url_registation = data;
    const [value_data_Of_URL_Registration, set_value_data_Of_URL_Registration] =
      useState({});
    const [value_List_Of_Event, set_value_List_Of_Event] = useState([]);
    const [is_Loading, set_is_Loading] = useState(true);
    const [value_show_in_Qr, set_value_show_in_Qr] = useState("");
    const [
      value_show_in_Qr_Fronted,
      set_value_show_in_Qr_value_show_in_Qr_Fronted,
    ] = useState("");
  
    //************************************/
    //Loading
    useEffect(() => {
      //Loading_URL_Detail();
      loading_qpi_ur_qr();
    }, []);
  
    //************************************/
    //Function

    function loading_qpi_ur_qr(){
        axios.get('https://us-central1-msa-server-db.cloudfunctions.net' + '/api/sandbox/generate/qr-code/url/' + key_of_url_registation)
        .then((response)=>{
            if(response.data){
                //console.log(response.data.list_event)
                set_value_data_Of_URL_Registration(response.data.url_date)
                set_value_List_Of_Event(response.data.list_event)
                qrCodeShow(response.data.url_date, response.data.list_event)

                set_is_Loading(false)
                
            }else{
                alert('Invalid Key!');

            }
        })
    }
  
  
  
    function qrCodeShow(urlCreate, event) {
      // Make Sure Configuration this round
      var qr =
        host_name_Server + "/sandbox/v1/registration/?key=" + urlCreate.key;

      set_value_show_in_Qr_value_show_in_Qr_Fronted(
        host_name_Website + "/sandbox/v1/registration/?key=" + urlCreate.key
      );
      set_value_show_in_Qr(qr);
  
      // Add Data TO Image
      var eventName = [];
      event.map((row, index) => {
        return eventName.push(
          <label style={{ width: "100%" }}> {row.name}</label>
        );
      });
  
      set_text_header_title(eventName);
      set_text_title_on_qr(urlCreate.pre_register_form.title_on_qr);
      set_text_title_sub(urlCreate.pre_register_form.title_sub);
      set_text_footer_below_qr(urlCreate.pre_register_form.footer_below_qr);
      set_text_footer_sub(urlCreate.pre_register_form.footer_sub);
      set_text_url_name(urlCreate.url_name);
  
      if (urlCreate.type) {
        if (urlCreate.type == "pr") {
          // Type Public Registration
          set_valueTitle_Body_Type(
            "PR : Public Registration is an QR Scan for walk in guest on event date. Guest only scan and fill form require and join the event."
          );
        } else {
          // Type URL QR Code
          set_valueTitle_Body_Type(
            "QR-Code : Guest will be registered by QR Scan or URL Link and get Unique QR Code to show on event day and need to approved scan from MSA Team."
          );
        }
      }
    }
  
    const [text_header_title, set_text_header_title] = useState("");
    const [text_title_on_qr, set_text_title_on_qr] = useState("");
    const [text_title_sub, set_text_title_sub] = useState("");
    const [text_footer_below_qr, set_text_footer_below_qr] = useState("");
    const [text_footer_subr, set_text_footer_sub] = useState("");
    const [text_url_name, set_text_url_name] = useState("");
  
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
  
    function bodyRowEvent(row) {
      var isRequire = "";
      for (let i of value_data_Of_URL_Registration.event) {
        if (i.event_key == row.key && i.is_required == true) {
          isRequire = " (Required Register)";
          break;
        }
      }
  
      var p = dateTime_GetPeroid(
        row.start_date.date,
        row.start_date.month,
        row.start_date.year
      );
      var dateevent = "";
      if (p == 0) {
        dateevent = " Today, " + row.start_date.hh + ":" + row.start_date.mm  + localHelper.AM_PM(row.start_date.hh)
      } else if (p > 0) {
        dateevent =
          " Start In  " +
          p +
          " day (" +
          row.start_date.date +
          "/" +
          row.start_date.month +
          "/" +
          row.start_date.year +
          "), " +
          row.start_date.hh +
          ":" +
          row.start_date.mm + localHelper.AM_PM(row.start_date.hh)
      } else {
        dateevent =
          
          p +
          " day ago (" +
          row.start_date.date +
          "/" +
          row.start_date.month +
          "/" +
          row.start_date.year +
          ")"
  
          dateevent = dateevent.substring(1)
          dateevent = " " + dateevent
        
      }
  
      return (
        <div>
          <div
            style={{
              display: "flex",
              marginBottom: "30px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex" }}>
              <MdEvent
                style={{ width: "60px", height: "60px", marginRight: "10px" }}
              />
  
              <div>
                <label
                  style={{
                    color: "gray",
                    fontWeight: "normal",
                    marginTop: "5px",
                    fontWeight: "bolder",
                  }}
                >
                  {row.name}{" "}
                  <label
                    style={{ color: "red", width: "auto", fontWeight: "normal" }}
                  >
                    {isRequire}
                  </label>
                </label>
                <br />
                <label>Event :{dateevent} </label>
              </div>
            </div>
  
            <button
              onClick={() => action_eventDetail(row)}
              type="button"
              style={{ height: "30px", width: "50px", marginTop: "12px" }}
              className="btn btn-outline-primary"
            >
              <FaEye style={{ marginTop: "-10px" }} />
            </button>
          </div>
        </div>
      );
    }
  
    function dateTime_GetPeroid(dateAdd, monthAdd, yearAdd) {
      const date = new Date();
      let days = date.getDate();
      let months = date.getMonth() + 1;
      let years = date.getFullYear();
  
      return dateTime_GetPeroid_2_Date(
        days,
        months,
        years,
        dateAdd,
        monthAdd,
        yearAdd
      );
    }
  
    function dateTime_GetPeroid_2_Date(
      start_Date,
      start_Month,
      start_Year,
      end_Data,
      end_Month,
      end_year
    ) {
      var firstDate = start_Month + "/" + start_Date + "/" + start_Year;
      var endData = end_Month + "/" + end_Data + "/" + end_year;
  
      return datediff(parseDate(firstDate), parseDate(endData));
    }
  
    function parseDate(str) {
      var mdy = str.split("/");
      return new Date(mdy[2], mdy[0] - 1, mdy[1]);
    }
  
    // Date Sort
    function datediff(first, second) {
      return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }
  
    function LoadingSpinner() {
      return (
        <div style={{ width: "100%", textAlign: "center" }}>
          <br />
          <IoIosMore
            style={{ width: "80px", height: "80px", color: "lightgray" }}
          />
          <br />
  
          <label style={{ color: "lightgray" }}>
            {"Please wait a momnet..."}
          </label>
          <br />
          <br />
          <br />
        </div>
      );
    }
  
    //************************************/
    //Event
    function action_eventDetail(row) {
      alert(row.name);
    }
  
    function CopyURL() {
      navigator.clipboard.writeText(value_show_in_Qr_Fronted);
      alert("URL Copied! : " + value_show_in_Qr_Fronted);
    }
  
    async function PrintDiv() {
      const element = document.getElementById("print"),
        canvas = await html2canvas(element),
        data = canvas.toDataURL("image/jpg"),
        link = document.createElement("a");
  
      link.href = data;
      var title = "";
      value_List_Of_Event.map((row, index) => {
        title +=
        index + 1 == value_List_Of_Event.length ? row.name : row.name + ", ";
      });
  
      link.download = "QRCode Registration - " + title + ".jpg";
  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  
    function TemplateColumn(header, bodyView) {
      return (
        <div
          style={{
            
            width: "100%",
            backgroundColor: "white",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "lightgray",
            padding: "10px",
            boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.4)",
  
            borderRadius: "0px",
          }}
        >
          <h5 style={{ color: "gray" }}>{header}</h5>
          <hr />
          {bodyView}
        </div>
      );
    }
  
    function mainBOdyLeft() {
      return (
        <div>
          <label style={{ color: "gray" }}>{text_url_name}</label>
          <hr />
          <div style={{ width: "100%", textAlign: "left" }}>
            {value_List_Of_Event.map((row, index) => {
              return <div key={index}>{bodyRowEvent(row)}</div>;
            })}
          </div>
        </div>
      );
    }
  
    function mainBodyRight() {
      return (
        <div >
          <div
            style={{
              height: "100%",
              textAlign: "center",
              justifyContent: "center",
              display: "flex",
              
            }}
          >
            <div
              id="print"
              style={{
                textAlign: "center",
                width: "400px",
              }}
            >
              <div
                style={{
                  borderStyle: "solid",
                  borderRadius: "12px",
                  borderWidth: "0.1px",
                  borderColor: "lightgray",
                  boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.4)",
                  paddingTop: "20px",
                }}
              >
                <img
                  src={localHelper.Logo_MSA()}
                  style={{
                    marginBottom: '15px',
                    width: "28%",
                    height: "28%",
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
                  style={{ height: "33%", maxWidth: "100%", width: "33%" }}
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
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => PrintDiv()}
              style={{ marginRight: "10px" }}
              type="button"
              className="btn btn-outline-success"
            >
              Save QR Code
            </button>
            <button
              onClick={() => CopyURL()}
              style={{ marginLeft: "5px", marginRight: "5px" }}
              type="button"
              className="btn btn-outline-primary"
            >
              Copy URL
            </button>
  
            <button
              onClick={() => (window.location.href = value_show_in_Qr_Fronted)}
              style={{ marginLeft: "10px" }}
              type="button"
              className="btn btn-outline-secondary"
            >
              View Form
            </button>
          </div>
  
          <br />
        </div>
      );
    }
  
    const [valueTitle_Body_Type, set_valueTitle_Body_Type] = useState("");
    function mainBOdyType() {
      return (
        <div
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingBottom: "10px",
            display: "flex",
          }}
        >
          <IoQrCodeSharp
            style={{ width: "40px", height: "40px", marginTop: "3px" }}
          />
          <div style={{ padding: "10px" }}>{valueTitle_Body_Type}</div>
        </div>
      );
    }
  
    return is_Loading == true ? (
      LoadingSpinner()
    ) : (
      <div style={{ backgroundColor: "#dedede", height: "100vh" }}>
        <br />
        <br />
        <div  className="container">
          <div className="row">
            <div className="col-md-6">
              {TemplateColumn("Type Of Registration", mainBOdyType())}
              <br />
              {TemplateColumn(
                "Event QR Code - Registration Form",
                mainBOdyLeft()
              )}
            </div>
  
            <div className="col-md-6">
              {TemplateColumn("URL Registration", mainBodyRight())}
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Generate_QrCode_Sendbox
