import React, { useEffect, useState } from "react";
import CookieAndSession from '../../Helper/CookieAndSession.js';
import "bootstrap/dist/css/bootstrap.css";
import { CiFaceFrown } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { AiOutlineFrown } from "react-icons/ai";
import axios from "axios";
import { MdEvent } from "react-icons/md";
import "../../component/Scanning_QR_Entrance.css";
import logo from "../../asset/msa_logo_jpg.png";
import { SlNote } from "react-icons/sl";
import loading from "../../asset/qr-code-animation.gif";

import Swal from "sweetalert2";
import { MdOutlineDomainVerification } from "react-icons/md";
import LocalHelper from "../../Helper/LocalHelper.js";

function Scanning_QR_Entrance() {
  //=================================================
  //Declaration
  var localHelper = new LocalHelper();
  const host_name_Website = localHelper.Hostname_Website();
  const host_name_Server = localHelper.Hostname_Server();

  var url_string = window.location.href;
  var url = new URL(url_string);
  var key = decrypt(url.searchParams.get("data"));
  var authorization = decrypt(url.searchParams.get("authorization"));
  
  var cookie = new CookieAndSession();

  var [isAuthozired, set_isAuthozired] = useState(false);
  var [data_user_Data_Form, set_data_user_Data_Form] = useState([]);
  var [data_main_Data, set_data_main_Data] = useState({});
  var [data_event_joined, set_data_event_joined] = useState([]);
  const [data_List_Event_All, set_data_List_Event_All] = useState([]);
  const [data_List_Event_UpComing, set_data_List_Event_UpComing] = useState([]);
  const [data_List_Event_End, set_data_List_Event_End] = useState([]);
  const [data_List_Event_Progress, set_data_List_Event_Progress] = useState([]);
  const [is_Loading, set_is_Loading] = useState(false);

  const [is_Null_Event_Started, set_is_Null_Event_Started] = useState(true);
  const [is_Null_Event_Upcoming, set_is_Null_Event_Upcoming] = useState(true);
  const [is_Null_Event_End, set_is_Null_Event_End] = useState(true);

  const [is_ShowPageFor_Guest, set_is_ShowPageFor_Guest] = useState(true);

  //=================================================
  //Loading
  useEffect(() => {
    CheckPermmission();
  }, []);

  function CheckPermmission() {
    cookie.Cookie_Set("camera-scan", "false", 1);
    if (authorization == "msa-camera-2024") {
      if (key == null || key == undefined || key == "") {
        set_isAuthozired(false);
      } else {
        // Check Cookie Scan
        var checkAuthorizationCookieScan = cookie.Cookie_Get("camera-scan");

        if (
          checkAuthorizationCookieScan == undefined ||
          checkAuthorizationCookieScan == null ||
          checkAuthorizationCookieScan == "" ||
          checkAuthorizationCookieScan == "false"
        ) {
          set_is_ShowPageFor_Guest(true);
          LoadingData();
        } else {
          // Check Key
          if (checkAuthorizationCookieScan == "true") {
            set_is_ShowPageFor_Guest(false);
            set_isAuthozired(true);
            LoadingData();
          } else {
            set_isAuthozired(false);
            set_is_ShowPageFor_Guest(false);
          }
        }
      }
    } else {
      set_isAuthozired(false);
    }
  }

  function LoadingData() {
    set_is_Loading(true);
    axios
      .get(host_name_Server + "/api/guest/registred-by-id/" + key)
      .then((data) => {
        if (data.data.status == true) {
          set_data_user_Data_Form(data.data.data.guest_info.form);
          set_data_main_Data(data.data);

          // Add List Event
          set_data_List_Event_All(data.data.data.event_full.all.list);
          set_data_List_Event_UpComing(data.data.data.event_full.upcoming.list);
          set_data_List_Event_End(data.data.data.event_full.end.list);
          set_data_List_Event_Progress(data.data.data.event_full.progress.list);

          // check null
          if (data.data.data.event_full.upcoming.total > 0) {
            set_is_Null_Event_Upcoming(false);
          }

          if (data.data.data.event_full.end.total > 0) {
            set_is_Null_Event_End(false);
          }

          if (data.data.data.event_full.progress.total > 0) {
            set_is_Null_Event_Started(false);
          }
        } else {
          set_isAuthozired(false);
        }
        set_is_Loading(false);
      });
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

  function unAuthorizedPage() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <br />
              <br />
              <br /> <br />
              <CiFaceFrown style={{ width: "100%", height: "130px" }} />
              <label
                style={{
                  width: "100%",
                  textAlign: "center",
                  color: "gray",
                  padding: "10px",
                }}
                htmlFor=""
              >
                You don't have permission <br /> to scan this QR-Code!
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Design
  function bodyGuestInfo() {
    return data_user_Data_Form.map((data, i) => {
      return row(
        <MdEditNote style={{ width: "20px", height: "20px" }} />,
        data.title,
        data.value,
        i
      );
    });
  }
  function row(icon, title, body, i) {
    return (
      <div key={i} style={{ display: "flex" }}>
        <div style={{ paddingLeft: "10px", width: "30px" }}>{icon}</div>
        <label style={{ marginLeft: "10px", width: "40%" }}>{title} : </label>
        <label htmlFor="" style={{ width: "60%" }}>
          {body}
        </label>
      </div>
    );
  }

  function bodyEvent_Start_or_Progress() {
    // Row
    return (
      <div>
        {data_List_Event_Progress.map((row, i) => {
          return rowOfEvent(row, i, "started");
        })}
      </div>
    );
  }

  function bodyEvent_Up_Coming() {
    // Row
    return (
      <div>
        {data_List_Event_UpComing.map((row, i) => {
          return rowOfEvent(row, i, "upcoming");
        })}
      </div>
    );
  }

  function bodyEvent_End() {
    // Row
    return (
      <div>
        {data_List_Event_End.map((row, i) => {
          return rowOfEvent(row, i, "end");
        })}
      </div>
    );
  }

  function rowOfEvent(row, i, type) {
    // check button if already join will be close
    var isAlreadyJoin = false;
    var dateJoin = "";
    for (let k of data_main_Data.data.guest_info.event) {
      if (k.event_key == row.key) {
        if (k.staute == "joined") {
          isAlreadyJoin = true;
          dateJoin =
            k.date_joined.date +
            "/" +
            k.date_joined.month +
            "/" +
            k.date_joined.year +
            ", " +
            k.date_joined.hh +
            ":" +
            k.date_joined.mm  + localHelper.AM_PM(row.start_date.hh)
        }
        break;
      }
    }

    var dateLeft = "";
    if (type == "upcoming") {
      dateLeft = " (" + row.more.start + " days left)";
    } else if (type == "started") {
      dateLeft = " (Started now)";
    } else if (type == "end") {
      dateLeft = " (" + row.more.end.substring(1) + " days ago)";
    }
    return (
      <div key={i}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div>
            <div style={{ display: "flex" }}>
              <MdEvent
                style={{ width: "28px", height: "28px", marginRight: "10px" }}
              />
              <h5 htmlFor="">{row.name}</h5>
              <label htmlFor="" style={{ color: "gray" }}>
                &nbsp;{dateLeft}
              </label>
            </div>

            <label style={{ paddingLeft: "40px" }}>
              Start :
              {row.start_date.date +
                "/" +
                row.start_date.month +
                "/" +
                row.start_date.year +
                ", " +
                row.start_date.hh +
                ":" +
                row.start_date.mm + localHelper.AM_PM(row.start_date.hh)}
            </label>
            <br />
            <label style={{ paddingLeft: "40px" }}>
              End :
              {row.end_date.date +
                "/" +
                row.end_date.month +
                "/" +
                row.end_date.year +
                ", " +
                row.end_date.hh +
                ":" +
                row.end_date.mm +  localHelper.AM_PM(row.start_date.hh)}
            </label>

            <div
              hidden={row.more.note == "NA" ? true : false}
              style={{
                display: "flex",
                paddingLeft: "40px",
                marginTop: "5px",
                color: "red",
              }}
            >
              <SlNote style={{ marginTop: "3px" }} />
              <label style={{ paddingLeft: "5px" }}>{row.more.note}</label>
            </div>
          </div>

          <div hidden={isAlreadyJoin == true ? true : false}>
            <div
              hidden={is_ShowPageFor_Guest == false ? false : true}
              style={{ paddingTop: "20px" }}
            >
              <button
                onClick={() => eventClickedJoin(row)}
                hidden={type == "end" || type == "upcoming" ? true : false}
                type="button"
                className="btn btn-primary"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>

        <div
          hidden={isAlreadyJoin == true ? false : true}
          style={{ paddingLeft: "30px", display: "flex" }}
        >
          <MdOutlineDomainVerification
            style={{ color: "green", width: "70px", height: "70px" }}
          />

          <div>
            <label style={{ color: "darkgreen", marginTop: "10px" }}>
              Event : Joined
            </label>
            <br />
            <label style={{ color: "darkgreen" }}>Date : {dateJoin}</label>
          </div>
        </div>

        <hr />
      </div>
    );
  }

  function eventClickedJoin(row) {
    var name = "";
    data_user_Data_Form.map((item, i) => {
      if (i < 2) {
        name += item.value + ",";
      }
    });

    Swal.fire({
      title: "Approved Confirmation!",
      text:
        "Do you want to approved : " +
        name +
        " to join event : " +
        row.name +
        " ?",

      showCancelButton: true,
      confirmButtonColor: "green",
      confirmButtonText: "Join",
    }).then((result) => {
      if (result.isConfirmed) {
        set_is_Loading(true);

        var newListEventInGuest = []; // list will send
        for (let i of data_main_Data.data.guest_info.event) {
          if (i.event_key == row.key) {
            i.staute = "joined";
            i.date_joined = {
              date: dateTime_Get_Current_Day(),
              month: dateTime_Get_Current_Month(),
              year: dateTime_Get_Current_Year(),
              hh: dateTime_Get_Current_Hour(),
              mm: dateTime_Get_Current_Minute(),
              ss: dateTime_Get_Current_Second(),
            };
          }
          newListEventInGuest.push(i);
        }

        // Change Event Count
        var updateEvent = {
          guest_joined: row.guest_joined + 1,
        };

        // repare Data
        var data = {
          key_event: row.key,
          key_guest: data_main_Data.data.guest_info.key,
          guest_update: newListEventInGuest,
          event_update: updateEvent,
        };

        axios
          .post(host_name_Server + "/api/guest/apprroved/registration/", data)
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "Guest has been approved to join event!",
              showCancelButton: false,
              confirmButtonColor: "green",
              confirmButtonText: "Done",
            }).then((d) => {
              window.location.reload();
            });
          });
      }
    });
  }

  function AuthorizationPage() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {Template_Defualt_Style(
                "Guest Information",
                bodyGuestInfo(),
                is_Loading,
                false,
                "No info guest found!"
              )}
              <br />
              {Template_Defualt_Style(
                "Started Event",
                bodyEvent_Start_or_Progress(),
                is_Loading,
                is_Null_Event_Started,
                "No event start yet!"
              )}

              <br />
              {Template_Defualt_Style(
                "Upcoming Event",
                bodyEvent_Up_Coming(),
                is_Loading,
                is_Null_Event_Upcoming,
                "No upcoming event yet!"
              )}

              <br />
              {Template_Defualt_Style(
                "End Event",
                bodyEvent_End(),
                is_Loading,
                is_Null_Event_End,
                "No end event yet!"
              )}
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++
  // Guest Funtion
  function GuestPageView() {
    return (
      <div
        className="scanning_qr_entrance_main"
        style={{ width: "100%", height: "100vh" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <br />
            </div>
          </div>

          <div className="row">
            <div
              className="col-12"
              style={{ textAlign: "right", display: "flex" }}
            >
              <img
                src={logo}
                alt=""
                style={{
                  width: "100%",
                  height: "100px",
                  objectFit: "contain",
                  padding: "10px",
                }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div>
                <br />
                <h4 style={{ marginBottom: "20px" }}>Guest Information</h4>

                {data_user_Data_Form.map((data, i) => {
                  return rowOfGuest_Mode(data.title, data.value, i);
                })}
              </div>
              <hr />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <h4 style={{ marginBottom: "20px" }}>Event Information</h4>

              <div style={{ paddingLeft: "10px" }}>
                {bodyEvent_Start_or_Progress()}
                {bodyEvent_Up_Coming()}
                {bodyEvent_End()}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <label
                htmlFor=""
                style={{
                  width: "100%",
                  textAlign: "center",
                  color: "gray",
                  fontSize: "12px",
                }}
              >
                Powered by Cyber Tech System
              </label>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }

  function GuestLoading() {
    return (
      <div>
        <div style={{ width: "100%", textAlign: "center" }}>
          <center>
            <img
              src={loading}
              style={{
                marginTop: window.screen.height / 4.5,
                width: "100%",
                height: "300px",
                objectFit: "contain",
              }}
            />
          </center>
        </div>
      </div>
    );
  }

  function rowOfGuest_Mode(title, body, i) {
    return (
      <div key={i} style={{ display: "flex" }}>
        <label style={{ marginLeft: "10px", width: "40%" }}>{title} : </label>
        <label htmlFor="" style={{ width: "60%" }}>
          {body}
        </label>
      </div>
    );
  }

  return (
    <div>
      {isAuthozired == true
        ? AuthorizationPage()
        : is_ShowPageFor_Guest == true
        ? is_Loading == true
          ? GuestLoading()
          : GuestPageView()
        : unAuthorizedPage()}
    </div>
  );

  function Template_Defualt_Style(
    headerTitle,
    body,
    isLoading,
    isNull,
    titleNullData
  ) {
    return (
      <div
        style={{
          backgroundColor: "white",
          width: "100%",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "lightgray",
          padding: "10px",
          boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.4)",

          borderRadius: "0px",
        }}
      >
        <h5 style={{ color: "gray" }}>{headerTitle}</h5>
        <hr />

        {isLoading == true
          ? Template_LoadingSpinner()
          : isNull == true
          ? Template_Null(titleNullData)
          : body}
      </div>
    );
  }

  function Template_LoadingSpinner() {
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

  function Template_Null(title) {
    return (
      <div style={{ width: "100%", textAlign: "center" }}>
        <br />
        <AiOutlineFrown
          style={{ width: "80px", height: "80px", color: "lightgray" }}
        />
        <br />
        <label style={{ color: "lightgray" }}>{title}</label>
        <br />
        <br />
        <br />
      </div>
    );
  }

  function dateTime_Get_Current_Day() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    var result = day.toString();
    if (day.toString().length == 1) {
      result = "0" + result;
    }
    return result;
  }

  function dateTime_Get_Current_Month() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    var result = month.toString();
    if (month.toString().length == 1) {
      result = "0" + result;
    }
    return result;
  }

  function dateTime_Get_Current_Year() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return year.toString();
  }

  function dateTime_Get_Current_Hour() {
    const date = new Date();

    let value = date.getHours();

    var resuldCheck = value.toString();
    if (resuldCheck.length == 1) {
      resuldCheck = "0" + value.toString();
    }

    return resuldCheck;
  }

  function dateTime_Get_Current_Minute() {
    const date = new Date();

    let value = date.getMinutes();
    var resuldCheck = value.toString();
    if (resuldCheck.length == 1) {
      resuldCheck = "0" + value.toString();
    }

    return resuldCheck;
  }

  function dateTime_Get_Current_Second() {
    const date = new Date();

    let value = date.getSeconds();

    var resuldCheck = value.toString();
    if (resuldCheck.length == 1) {
      resuldCheck = "0" + value.toString();
    }

    return resuldCheck;
  }
}

export default Scanning_QR_Entrance;
