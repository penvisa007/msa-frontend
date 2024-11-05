
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import frame_header_open from "../../asset/frame_header_open.png";
import frame_header_award from "../../asset/frame_header_award.png";
import frame_header_both from "../../asset/frame_header_both.png";
import frame_footer_open from "../../asset/frame_footer_open.png";
import frame_footer_award from "../../asset/frame_footer_award.png";
import frame_footer_both from "../../asset/frame_footer_both.png";
import img_Design_Open from "../../asset/open.png";
import img_Design_Award from "../../asset/award.png";
import img_Design_Both from "../../asset/both.png";
import logo from "../../asset/logo.png";

function Theme_Client_View(props) {
  // type : open, award, both
  function imgFrameHeader() {
    if (props.type == "open") {
      return frame_header_open;
    } else if (props.type == "award") {
      return frame_header_award;
    } else {
      return frame_header_both;
    }
  }

  function imgFrameFooter() {
    if (props.type == "open") {
      return frame_footer_open;
    } else if (props.type == "award") {
      return frame_footer_award;
    } else {
      return frame_footer_both;
    }
  }

  function titleHeader() {
    if (props.type == "open") {
      return (
        <div>
          <img
            src={img_Design_Open}
            style={{ width: "100%", height: "60px", objectFit: "contain", marginBottom: '5px' }}
            alt=""
          />
        </div>
      );
    } else if (props.type == "award") {
      return (
        <div>
          <img
            src={img_Design_Award}
            style={{ width: "100%", height: "57px", objectFit: "contain" }}
            alt=""
          />
        </div>
      );
    } else {
      return (
        <div>
          <img
            src={img_Design_Both}
            style={{ width: "100%", height: "120px", objectFit: "contain",  marginBottom: '5px'}}
            alt=""
          />
        </div>
      );
    }
  }


  function titleFooter() {
    return (
      <div>
        <label style={{ textAlign: "justify" }}>
          សម្គាល់៖ បន្ទាប់ពីចុះឈ្មោះហើយ សូមរក្សាទុកលេខកូដ QR
          ដើម្បីបង្ហាញនៅថ្ងៃកម្មវិធី ដើម្បីបញ្ជាក់អ្នកចូលរួមរបស់អ្ន
        </label>

        <label style={{ marginTop: "10px", textAlign: "justify" }}>
          Note: after registered, please save the QR code to show it on the
          event day to confirm your participant.
        </label>
      </div>
    );
  }

  function rowBody_Info(title, value) {
    return (
      <div
        style={{
          fontWeight: "500",
          display: "flex",
          justifyContent: "space-between",
          padding: "2px",
        }}
      >
        <label htmlFor="" style={{ width: "50%" }}>
          {title}
        </label>
        <label htmlFor="" style={{ width: "20px", textAlign: "left" }}>
          :
        </label>
        <label
          htmlFor=""
          style={{ textAlign: "left", width: "50%", marginLeft: "10px" }}
        >
          {value}
        </label>
      </div>
    );
  }

  //=================
  function PageRegisterdAndGo() {
    return (
      <div>
        <div
          style={{
            textAlign: "left",
            padding: "5px",
            borderStyle: "solid",
            borderRadius: "6px",
            borderColor: "lightgray",
            borderWidth: "1px",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          {props.user.map((row, i) => {
            return rowBody_Info(row.title, row.value);
          })}
        </div>

        <br />
        <div style={{ padding: "10px"  , textAlign: "left"}}>{props.body_event}</div>
      </div>
    );
  }

  function PageOnlyRegistered() {
    return (
      <div style={{paddingLeft: "40px", paddingRight: '40px', paddingBottom: '40px', color: 'gray'}}>
        <label htmlFor="">
          សូមអគុណចំពោះការចំណាយពេលវេលាដ៍មានតម្លៃរបស់អ្នកក្នុងការបំពេញចុះឈ្មោះនេះ។
        </label>
        <br />
        <label htmlFor="">
          Thank you for spending your time to fill in the registration form.
        </label>
 
      </div>
    );
  }

  return (
    <div>
      <div
        id="print"
        style={{
          textAlign:'center',
          height:'100vh',
          width: "100%",
          paddingLeft: "0px",
          paddingRight: "0px",
          marginBottom:'80px',
          maxWidth: "800px", // add a max-width to prevent it from getting too wide
          margin: "0 auto", // center it horizontally
        }}
      >
        <div
          style={{
            
            borderStyle: "solid",
            borderColor: "lightgray",
            borderWidth: "0.1px",
          }}
        >
          <img
            src={imgFrameHeader()}
            style={{ objectFit: "contain", width: "100%" }}
          />

          <img
            src={logo}
            style={{
              objectFit: "contain",
              width: "140px",
              height: "100px",
              marginTop: "-90px",
              marginBottom: "30px",
            }}
          />
          <div style={{ paddingLeft: "40px", paddingRight: "40px" }}>
            {titleHeader()}
          </div>

          <hr style={{ marginLeft: "30px", marginRight: "30px" }} />
          <br />

    

          {props.is_guest_not_joined_all_event == true
            ? PageOnlyRegistered()
            : PageRegisterdAndGo()}

          <img
            src={imgFrameFooter()}
            style={{ objectFit: "contain", width: "100%",paddingBottom: "-400px", marginTop: "-140px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Theme_Client_View;