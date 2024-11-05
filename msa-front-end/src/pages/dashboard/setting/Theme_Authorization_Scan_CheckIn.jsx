import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import frame_header_open from "../../asset/frame_header_open.png";
import frame_header_award from "../../asset/frame_header_award.png";
import frame_header_both from "../../asset/frame_header_both.png";
import frame_footer_open from "../../asset/frame_footer_open.png";
import frame_footer_award from "../../asset/frame_footer_award.png";
import frame_footer_both from "../../asset/frame_footer_both.png";
import logo from "../../asset/logo.png";
import img_Design_Open from "../../asset/open.png";
import img_Design_Award from "../../asset/award.png";
import img_Design_Both from "../../asset/both.png";
import { MdEvent } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import LocalHelper from "../../Helper/LocalHelper";
import { IoIosMore } from "react-icons/io";
import MyHelper from "../../Helper/MyHelper";
import axios from "axios";
function Theme_Authorization_Scan_CheckIn(props) {
  var localHelper = new LocalHelper();
  var myhelper = new MyHelper();
  var host = "https://us-central1-msa-server-db.cloudfunctions.net";

  const [data_Form, set_data_Form] = useState([]);
  const [data_List_UnJoined, set_data_List_UnJoined] = useState([]);
  const [data_List_Joined, set_data_List_Joined] = useState([]);
  const [is_Loading, set_is_Loading] = useState(false);
  useEffect(() => {
    // add form
    if (props.data.url_and_link.form) {
      var listFrm = [];
      props.data.url_and_link.form.map((row, i) => {
        listFrm.push({ title: row.title, value: row.value });
      });
      set_data_Form(listFrm);
    }

    // add list
    if (props.data.event_originals) {
      var listPending = [];
      var listJoined = [];
      props.data.url_and_link.event.map((row, i) => {
        if (row.status == "pending") {
          listPending.push(row);
        } else if (row.status == "joined") {
          listJoined.push(row);
        }
      });

      set_data_List_UnJoined(listPending);
      set_data_List_Joined(listJoined);
    }
  }, []);

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
          ដើម្បីបង្ហាញនៅថ្ងៃកម្មវិធី ដើម្បីបញ្ជាក់អ្នកចូលរួមរបស់អ្នក។
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

  function rowOfEvent(row, i) {
    var startDate =
      row.event_full.start_date.date +
      "/" +
      row.event_full.start_date.month +
      "/" +
      row.event_full.start_date.year +
      ", " +
      row.event_full.start_date.hh +
      ":" +
      row.event_full.start_date.mm +
      localHelper.AM_PM(row.event_full.start_date.hh);

    var endtDate =
      row.event_full.end_date.date +
      "/" +
      row.event_full.end_date.month +
      "/" +
      row.event_full.end_date.year +
      ", " +
      row.event_full.end_date.hh +
      ":" +
      row.event_full.end_date.mm +
      localHelper.AM_PM(row.event_full.end_date.hh);

    var dateJoined = "";
    if (row.date_joined) {
      dateJoined =
        row.date_joined.date +
        "/" +
        row.date_joined.month +
        "/" +
        row.date_joined.year +
        ", " +
        row.date_joined.hh +
        ":" +
        row.date_joined.mm +
        localHelper.AM_PM(row.date_joined.hh);
    }

    return (
      <div key={i} style={{ padding: "20px" }}>
        <div
          style={{
            padding: "10px",
            width: "100%",
            borderColor: "lightgray",
            borderStyle: "solid",
            marginBottom: "00px",
            borderRadius: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              marginBottom: "-10px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex" }}>
              <MdEvent
                style={{ width: "24px", height: "24px", marginRight: "5px" }}
              />
              <h5>{row.event_full.name}</h5>
            </div>
          </div>
          <hr />

          <div>
            {rowBody_Info("Start : ", startDate, i + 2)}
            {rowBody_Info("End : ", endtDate, i + 3)}
            {rowBody_Info(
              "Status : ",
              row.event_full.not_finish == "yes" ? "Upcoming" : "Finished",
              i + 5
            )}
          </div>

          <div hidden={row.event_full.not_finish == "no" ? true : false}>
            <button
              hidden={row.status == "joined" ? true : false}
              style={{
                height: "50px",
                width: "150px",
                marginBottom: "20px",
                marginTop: "20px",
              }}
              onClick={() => event_ActionClick_CheckedIn(row, i)}
              type="button"
              className="btn btn-success"
            >
              CHECK IN
            </button>
          </div>

          <div
            hidden={row.status == "joined" ? false : true}
            style={{ textAlign: "left", padding: "20px" }}
          >
            <hr />
            <div style={{ display: "flex" }}>
              <FaCheckSquare
                style={{
                  color: "green",
                  height: "20px",
                  width: "20px",
                  marginTop: "3px",
                }}
              />
              <div style={{ paddingLeft: "10px", color: "green" }}>
                <label htmlFor="">Status : Joined</label>
                <br />
                <label htmlFor="">Date : {dateJoined}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function event_ActionClick_CheckedIn(row, i) {
    set_is_Loading(true);
    // New List update
    var list = [];
    props.data.event_originals.map((row2, i) => {
      if (row2.key == row.key) {
        row2.status = "joined";
        row2.date_joined = myhelper.returnCurrentDate();
      }
      list.push(row2);
    });

    var totalNewGuestJoined = 0;
    if (props.data.event.all.list) {
      props.data.event.all.list.map((row2, i) => {
        if (row2.event_full.key == row.key) {
          if (row2.event_full.guest_joined) {
            totalNewGuestJoined = row2.event_full.guest_joined + 1;
          }
        }
      });
    }

    var dataSend = {
      guest_update: list,
      event_update: {
        guest_joined: totalNewGuestJoined,
      },
      key_event: row.key,
      key_guest: props.data.url_and_link.key,
    };

    axios
      .post(host + "/api/v1/guest/public/registration/approval", dataSend)
      .then((res) => {
        LoadingData(res);
      });
  }

  function LoadingData(res) {
    axios
      .get(host + "/api/v1/guest/public/" + props.data.url_and_link.key)
      .then((props) => {
        // add form
        if (props.data.url_and_link.form) {
          var listFrm = [];
          props.data.url_and_link.form.map((row, i) => {
            listFrm.push({ title: row.title, value: row.value });
          });
          set_data_Form(listFrm);
        } 

        // add list
        if (props.data.event_originals) {
          var listPending = [];
          var listJoined = [];
          props.data.url_and_link.event.map((row, i) => {
            if (row.status == "pending") {
              listPending.push(row);
            } else if (row.status == "joined") {
              listJoined.push(row);
            }
          });

          set_data_List_UnJoined(listPending);
          set_data_List_Joined(listJoined);
        }

        set_is_Loading(false);
      });
  }

  function bodyInside_Loading() {
    return (
      <div>
        <br />
        <IoIosMore style={{ width: "60px", height: "60px", color: "green" }} />
        <br />
        <label htmlFor="" style={{ color: "green" }}>
          Checking QR Code ... <br />
          Please wait a moment
        </label>
      </div>
    );
  }
  function bodyInside_EventList() {
    return (
      <div>
        {data_List_UnJoined.map((row, i) => {
          return rowOfEvent(row, i);
        })}

        {data_List_Joined.map((row, i) => {
          return rowOfEvent(row, i);
        })}
      </div>
    );
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

          <div
            style={{
              textAlign: "left",
              paddingLeft: "30px",
              paddingRight: "30px",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <button
              onClick={() => props.event_from_themes()}
              type="button"
              className="btn btn-outline-danger"
              style={{ marginBottom: "0px" }}
            >
              Back To Scanner
            </button>

            <button
              onClick={() => window.location.reload()}
              type="button"
              className="btn btn-outline-info"
              style={{ marginBottom: "0px" }}
            >
              Refresh
            </button>
          </div>
          <br />
          <div
            style={{
              textAlign: "left",
              padding: "5px",
              borderStyle: "solid",
              borderRadius: "6px",
              borderColor: "lightgray",
              borderWidth: "1px",
              marginLeft: "40px",
              marginRight: "40px",
            }}
          >
            {data_Form.map((row, i) => {
              return rowBody_Info(row.title, row.value);
            })}
          </div>

          <br />

          {is_Loading == true ? bodyInside_Loading() : bodyInside_EventList()}

          <br />

          <img
            src={imgFrameFooter()}
            style={{ objectFit: "contain", width: "100%", marginTop: "-70px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Theme_Authorization_Scan_CheckIn;