import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import frame_header_open from "../../asset/frame_header_open.png";
import frame_header_award from "../../asset/frame_header_award.png";
import frame_header_both from "../../asset/frame_header_both.png";
import frame_footer_open from "../../asset/frame_footer_open.png";
import frame_footer_award from "../../asset/frame_footer_award.png";
import frame_footer_both from "../../asset/frame_footer_both.png";
import img_title_Open_Ceremony_Kh from "../../asset/open_ceremony_kh.png";
import img_title_Open_Ceremony_En from "../../asset/open_ceremony_en.png";
import img_title_Open_Ceremony_En_With_and from "../../asset/open_eng_with_and.png";
import img_title_Open_Award_Kh from "../../asset/award_night_kh.png";
import img_title_Open_Award_En from "../../asset/award_night_en.png";
import img_Design_Open from "../../asset/open.png";
import img_Design_Award from "../../asset/award.png";
import img_Design_Both from "../../asset/both.png";
import logo from "../../asset/logo.png";

function Theme_Invalid_QR_Code_Scane(props) {
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


  return (
    <div>
      <div
        id="print"
        style={{
          width: "100%",
          paddingLeft: "00px",
          paddingRight: "00px",
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
          <button onClick={() => props.switchTOCanMode()} type="button" className="btn btn-danger">Switch to scan mode</button>
          <br /><br />
          <br />
          <div
            style={{
              padding: "5px",
              borderStyle: "solid",
              borderRadius: "6px",
              borderColor: "lightgray",
              borderWidth: "1px",
              marginLeft: "40px",
              marginRight: "40px",
            }}
          >
            <h5>THIS CODE IS NOT FOUND</h5>
          </div>

          <br />
          <div
            style={{
              padding: "5px",
              borderStyle: "solid",
              borderRadius: "6px",
              borderColor: "lightgray",
              borderWidth: "1px",
              marginLeft: "40px",
              marginRight: "40px",
            }}
          >
            <label>
              Invalid : QR Code <br />
              {props.link}
            </label>
          </div>

        

          <img
            src={imgFrameFooter()}
            style={{ objectFit: "contain", width: "100%", marginTop: "-70px" }}
          />
        </div>
      </div>

      
    </div>
  );
}

export default Theme_Invalid_QR_Code_Scane;