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
import Simple_Input from "../../component/Simple_Input";
import Simple_Select from "../../component/Simple_Select";
import { MdEvent } from "react-icons/md";
import "../../component/theame_two.css";
import LocalHelper from "../../Helper/LocalHelper";
import MyHelper from "../../Helper/MyHelper";
function Theme_Registration(props) {
  var localHelper = new LocalHelper();
  var myhelper = new MyHelper();
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
          ដើម្បីបង្ហាញនៅថ្ងៃកម្មវិធី ដើម្បីបញ្ជាក់ការចូលរួមរបស់អ្នក។
        </label>

        <label style={{ marginTop: "10px", textAlign: "justify" }}>
          Note: after registered, please save the QR code to show it on the
          event day to confirm your participant.
        </label>
      </div>
    );
  }

  // Form
  function rowOfForm() {
    return props.form.map((row, index) => {
      return row.input_type == "input"
        ? bodyRowInput(row, index)
        : bodyRowSelect(row, index);
    });
  }

  function bodyRowInput(row, index) {
    return (
      <div style={{ height: "95px" }} key={index}>
        <Simple_Input
          id={"id-form-input-" + index}
          title={row.title}
          error_text={row.error_text}
          required={row.is_required}
        />
      </div>
    );
  }
  function bodyRowSelect(row, index) {
    return (
      <div style={{ height: "95px" }} key={index}>
        <Simple_Select
          id={"id-form-input-" + index}
          title={row.title}
          error_text={row.error_text}
          required={row.is_required}
          options={row.data}
          senderOnChange={() => null}
        />
      </div>
    );
  }

  function bodyRowEvent(row) {
   

    var dateevent = "";
    var date_event_en = ''
   
    console.log(row)

    var open = "-O9hLZYr5_3OnbgsREEb"
    var award = "-O9hLkN9rjW85ktj3OpG"

    if(props.type == 'open'){
    dateevent = 'ថ្ងៃទី២៤ ខែវិច្ឆកា​ ឆ្នាំ២០២៤'
    date_event_en= '24th November 2024 from 9-11am'
    }else if(props.type == 'award'){
    dateevent = 'ថ្ងៃទី២៥​  ខែវិច្ឆកា​ ឆ្នាំ២០២៤'
    date_event_en= '25th November 2024 from 4:30-7:30pm'
    }else{
     
      if(row.key == open){
        dateevent = 'ថ្ងៃទី២៤ ខែវិច្ឆកា​ ឆ្នាំ២០២៤'
        date_event_en= '24th November 2024 from 9-11am'
      }else if(row.key == award){
        dateevent = 'ថ្ងៃទី២៥​  ខែវិច្ឆកា​ ឆ្នាំ២០២៤'
        date_event_en= '25th November 2024 from 4:30-7:30pm'
      }
      
   
    }


    return (
      <div>
        <div
          for={"id-checkbox-" + row.key}
          style={{
            borderRadius: "5px",
            paddingLeft: "5px",
            paddingRight: "5px",
            backgroundColor: "whitesmoke",
            padding: "15px",
            marginBottom: "20px",
          }}
        >
          <div
            for={"id-checkbox-" + row.key}
            style={{ display: "flex", width: "100%" }}
          >
            <MdEvent
              for={"id-checkbox-" + row.key}
              style={{
                width: "20px",
                height: "20px",
                marginRight: "5px",
                marginTop: "7px",
              }}
            />

            <div>
              <label
                for={"id-checkbox-" + row.key}
                style={{
                  marginTop: "5px",
                  fontWeight: "bold",
                }}
              >
                {row.name_kh}
                <br />
                {row.name}
              </label>
              <br /><br />
              <label for={"id-checkbox-" + row.key}>{dateevent}
                <br /> {date_event_en}</label>
            </div>
          </div>

          <div hidden={props.url_type == "pr" ? true : false}>
            <hr />
            <div
              style={{ width: "100%", paddingLeft: "40px", marginTop: "10px" }}
            >
              <h6 htmlFor="">សូមបញ្ជាក់ការចូលរួមរបស់អ្នក/Please confirm your participation</h6>
              <div>
                <input
                  type="radio"
                  id={"id-checkbox-yes-" + row.key}
                  name={"id-checkbox-" + row.key}
                  value="Yes"
                  defaultChecked
                />
                <label
                  style={{ marginLeft: "5px", color: "gray" }}
                  for={"id-checkbox-yes-" + row.key}
                >
                  ចូលរួម / Yes
                </label>
                  <br />
                <input
                  style={{ marginLeft: "0px" }}
                  type="radio"
                  id={"id-checkbox-no-" + row.key}
                  name={"id-checkbox-" + row.key}
                  value="No"
                />
                <label
                  style={{ marginLeft: "5px", color: "gray" }}
                  for={"id-checkbox-no-" + row.key}
                >
                  មិនបានចូលរួម / No
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
    <div
      id="print"
      style={{
        width: "100%",
        paddingLeft: "0px",
        paddingRight: "0px",
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
          <div>
            <label htmlFor="">ទម្រង់ចុះឈ្មោះ / Registration form</label>
          </div>

          <div style={{ padding: "20px", textAlign: "left" }}>
            {rowOfForm()}
          </div>

          <div>
            <div
              style={{
                marginTop: "0px",
                textAlign: "left",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              <br /><br />
              {props.event.map((row, index) => {
                return <div key={index}>{bodyRowEvent(row)}</div>;
              })}
            </div>
          </div>

          <div
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: "12px",
              paddingLeft: "40px",
              paddingRight: "40px",
              color: "gray",
            }}
          >
            <div
              style={{
                width: "100%",
                textAlign: "center",
                justifyContent: "space-evenly",
                display: "flex",
              }}
            >
              <div style={{ width: "100%" }}>{titleFooter()}</div>
            </div>
          </div>

         

         <br /><br />

          <button
            onClick={() => props.event_Clicked()}
            style={{ height: "55px" }}
            type="button"
            className="btn btn-primary"
          >
            {props.button_title}
          
          </button>

       
          <img
            src={imgFrameFooter()}
            style={{ objectFit: "contain", width: "100%", marginTop: "0px" }}
          />


        </div>
      </div>
    </div>
  );
}

export default Theme_Registration;