import React, { useState, useEffect } from "react";
import LocalHelper from "../../Helper/LocalHelper";
import CookieAndSession from "../../Helper/CookieAndSession";
import { CiFaceFrown } from "react-icons/ci";
import { MdEvent } from "react-icons/md";
import { SlNote } from "react-icons/sl";
import "bootstrap/dist/css/bootstrap.css";
import { MdOutlineDomainVerification } from "react-icons/md";
import loading from "../../asset/qr-code-animation.gif";
import { MdEditNote } from "react-icons/md";
import Swal from "sweetalert2";
import Theme_Client_View from "./Theme_Client_View";
import MyHelper from "../../Helper/MyHelper";
import axios from "axios";

function Step_4_Entrance_Ticket_Scan_QRCode() {
  //=================================================
  //Declaration
  var localHelper = new LocalHelper();
  var myHelper = new MyHelper();
  var url_string = window.location.href;
  var url = new URL(url_string);
  var data = url.searchParams.get("key");
  var Authorized = url.searchParams.get("authorization");
  var key_of_guest = myHelper.decrypt(data);
  var cookie = new CookieAndSession();

  var [isAuthozired, set_isAuthozired] = useState(false);
  var host = "https://us-central1-msa-server-db.cloudfunctions.net";
  const [data_List_Event_All, set_data_List_Event_All] = useState([]);
  const [data_List_Event_UpComing, set_data_List_Event_UpComing] = useState([]);
  const [data_List_Event_End, set_data_List_Event_End] = useState([]);
  const [data_List_Event_Progress, set_data_List_Event_Progress] = useState([]);
  const [is_Loading, set_is_Loading] = useState(true);
  var [data_user_Data_Form, set_data_user_Data_Form] = useState([]);
  var [data_main_Data, set_data_main_Data] = useState({});
  var [data_list_Event_Guest_Original, set_data_list_Event_Guest_Original] =
    useState([]);
  var [value_Theme, set_value_Theme] = useState("");
  var [value_Form_Title_Value, set_value_Form_Title_Value] = useState([]);
  const [is_guest_not_joined_all_event, set_is_guest_not_joined_all_event] = useState(false)
  //=================================================
  //Loading
  useEffect(() => {
    // cookie.Cookie_Set("camera-scan", "false", 1);
    CheckPermmission();
  }, []);

  function CheckPermmission() {
    if (
      key_of_guest == null ||
      key_of_guest == "" ||
      key_of_guest == undefined
    ) {
      set_isAuthozired(false);
    } else {
      if (myHelper.decrypt(Authorized) == "msa") {
        // Check User
        axios
          .get(host + "/api/v1/guest/public/" + key_of_guest)
          .then((resDataURL) => {
            if (resDataURL.data.status == false) {
              set_isAuthozired(false);
            } else {
              var keyCameraAuthorization = 'true'
              //console.log(keyCameraAuthorization);

              var camera_Fuction = false;

             

              if (camera_Fuction == true) {
                set_isAuthozired(true);
                set_is_ShowPageFor_Guest(false);
                Add_Data_Guest(resDataURL.data);
              } else {
                set_isAuthozired(false);
                set_is_ShowPageFor_Guest(true);
                Add_Data_Guest(resDataURL.data);
              }
            }
          })
      } else {
        set_isAuthozired(false);
      }
    }
  }

  const [is_ShowPageFor_Guest, set_is_ShowPageFor_Guest] = useState(false);
  function Add_Data_Guest(data) {
    //console.log(data);
    //+++++++++++++++++
    // check list before add
    var listtemp_All = [];
    var listCheckNotJoinAll = []
    if (data.event.all.list) {
      for (let i of data.event.all.list) {
        if (i.status == "not_join") {
          // skip
          listCheckNotJoinAll.push(true)
        } else {
          listtemp_All.push(i);
        }
      }
    }

    //console.log(listtemp_All)
    set_data_List_Event_All(listtemp_All);

    // check notejoing 
    var isNotJoin = true

    listCheckNotJoinAll.map((row, i) => {
      
        if(row == false){
          isNotJoin = false
        }
    })
    if(listCheckNotJoinAll.length == 0){
      isNotJoin = false
    }
    set_is_guest_not_joined_all_event(isNotJoin)

    console.log(listCheckNotJoinAll)
    console.log(data.event.all.list)

    var listtemp_Upcoming = [];
    if (data.event.upcoming.list) {
      for (let i of data.event.upcoming.list) {
        if (i.status == "not_join") {
          // skip
        } else {
          listtemp_Upcoming.push(i);
        }
      }
    }
    set_data_List_Event_UpComing(listtemp_Upcoming);

    var listtemp_End = [];
    if (data.event.finished.list) {
      for (let i of data.event.finished.list) {
        if (i.status == "not_join") {
          // skip
        } else {
          listtemp_End.push(i);
        }
      }
    }
    set_data_List_Event_End(listtemp_End);

    var listtemp_progress = [];
    if (data.event.progress.list) {
      for (let i of data.event.progress.list) {
        if (i.status == "not_join") {
          // skip
        } else {
          listtemp_progress.push(i);
        }
      }
    }
    set_data_List_Event_Progress(listtemp_progress);

    set_data_user_Data_Form(data.url_and_link.form);
    set_data_main_Data(data.url_and_link);
    set_data_list_Event_Guest_Original(data.event_originals);
    set_value_Theme(data.url_and_link.theme);

    var listfrm = [];
    if (data.url_and_link.form) {
      data.url_and_link.form.map((row, i) => {
        listfrm.push({ title: row.title, value: row.value });
      });
    }
    set_value_Form_Title_Value(listfrm);

    set_is_Loading(false);
  }


  //=================================================
  //Sub View
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
  function GuestLoading() {
    return <div></div>;
  }

  function GuestPageView() {
    return (
      <div style={{ textAlign: "center" }}>
        <Theme_Client_View
          is_guest_not_joined_all_event={is_guest_not_joined_all_event}
          user={value_Form_Title_Value}
          type={value_Theme}
          body_event={
            <div>
              <div style={{ paddingLeft: "10px" }}>
                {bodyEvent_Start_or_Progress()}
                {bodyEvent_Up_Coming()}
                {bodyEvent_End()}
              </div>
            </div>
          }
        />
      </div>
    );
    // return (
    // <div
    // className="scanning_qr_entrance_main"
    // style={{ width: "100%", height: "100vh" }}
    // >
    // <div className="container">
    // <div className="row">
    // <div className="col-12">
    // <br />
    // </div>
    // </div>

    // <div className="row">
    // <div
    // className="col-12"
    // style={{ textAlign: "right", display: "flex" }}
    // >
    // <img
    // src={localHelper.Logo_MSA()}
    // alt=""
    // style={{
    // width: "100%",
    // height: "100px",
    // objectFit: "contain",
    // padding: "10px",
    // }}
    // />
    // </div>
    // </div>

    // <div className="row">
    // <div className="col-12">
    // <div>
    // <br />
    // <h4 style={{ marginBottom: "20px" }}>Guest Information</h4>

    // {data_user_Data_Form.map((data, i) => {
    // return rowOfGuest_Mode(data.title, data.value, i);
    // })}
    // </div>
    // <hr />
    // </div>
    // </div>

    // <div className="row">
    // <div className="col-12">
    // <h4 style={{ marginBottom: "20px" }}>Event Information</h4>

    // <div style={{ paddingLeft: "10px" }}>
    // {bodyEvent_Start_or_Progress()}
    // {bodyEvent_Up_Coming()}
    // {bodyEvent_End()}
    // </div>
    // </div>
    // </div>

    // <div className="row">
    // <div className="col-12">
    // <label
    // htmlFor=""
    // style={{
    // width: "100%",
    // textAlign: "center",
    // color: "gray",
    // fontSize: "12px",
    // }}
    // >
    // Powered by Cyber Tech System
    // </label>
    // <br />
    // <br />
    // </div>
    // </div>
    // </div>
    // </div>
    // );
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
    var event_full = row.event_full;
    var name_event_eng = event_full.name;
    var name_event_kh = event_full.name_kh;

    if (row.status == "joined") {
      isAlreadyJoin = true;
      dateJoin =
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

    // check note
    var note = "NA";
    if (row.note) {
      note = row.note;
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
                style={{ width: "30px", height: "30px", marginRight: "0px" }}
              />
              <label htmlFor="">{row.name}</label>
              <label htmlFor="">{row.name_kh}</label>
              <label
                htmlFor=""
                style={{
                 
                  color: "gray",
                  fontWeight: "bolder",
                  fontSize: "14px",
                }}
              >
                &nbsp;{name_event_eng}
                <br />
                &nbsp;{name_event_kh}
              </label>
            </div>

            <label style={{ paddingLeft: "35px",}} >
              Start :
              {event_full.start_date.date +
                "/" +
                event_full.start_date.month +
                "/" +
                event_full.start_date.year +
                ", " +
                event_full.start_date.hh +
                ":" +
                event_full.start_date.mm +
                localHelper.AM_PM(event_full.start_date.hh)}
            </label>
            <br />
            <label style={{ paddingLeft: "35px",}} >
              End :
              {event_full.end_date.date +
                "/" +
                event_full.end_date.month +
                "/" +
                event_full.end_date.year +
                ", " +
                event_full.end_date.hh +
                ":" +
                event_full.end_date.mm +
                localHelper.AM_PM(event_full.end_date.hh)}
            </label>

            <div
              hidden={note == "NA" ? true : false}
              style={{
                display: "flex",
                paddingLeft: "40px",
                marginTop: "5px",
                color: "red",
              }}
            >
              <SlNote style={{ marginTop: "3px" }} />
              <label style={{ paddingLeft: "5px" }}>{note}</label>
            </div>
          </div>

          <div hidden={is_ShowPageFor_Guest == false ? false : true}>
            <div hidden={isAlreadyJoin == false ? false : true}>
              <button
                onClick={() => eventClickedJoin(row)}
                style={{ height: "40px", marginTop: "30px" }}
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
              Status : Joined
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
    name = name.slice(0, -1);

    Swal.fire({
      title: "Approved Confirmation!",
      text:
        "Do you want to approved : " +
        name +
        " to join event : " +
        row.event_full.name +
        " ?",

      showCancelButton: true,
      confirmButtonColor: "green",
      confirmButtonText: "Join",
    }).then((result) => {
      if (result.isConfirmed) {
        set_is_Loading(true);

        var newListEventInGuest = []; // list will send
        for (let i of data_list_Event_Guest_Original) {
          if (i.key == row.key) {
            if (i.status == "pending") {
              i.status = "joined";
              i.date_joined = localHelper.returnCurrentDate();
            }
          }

          newListEventInGuest.push(i);
        }

        var updateEvent = {
          guest_joined: row.event_full.guest_joined + 1,
        };

        var data = {
          key_event: row.key,
          key_guest: key_of_guest,
          guest_update: newListEventInGuest,
          event_update: updateEvent,
        };

        axios
          .post(host + "/api/v1/guest/public/registration/approval", data)
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

  function LoadingSpinner() {
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
              {localHelper.Template_Defualt_Style(
                "Guest Information",
                bodyGuestInfo(),
                is_Loading,
                false,
                "No info guest found!"
              )}
              <br />
              {localHelper.Template_Defualt_Style(
                "Started Event",
                bodyEvent_Start_or_Progress(),
                is_Loading,
                false,
                "No event start yet!"
              )}

              <br />
              {localHelper.Template_Defualt_Style(
                "Upcoming Event",
                bodyEvent_Up_Coming(),
                is_Loading,
                false,
                "No upcoming event yet!"
              )}

              <br />
              {localHelper.Template_Defualt_Style(
                "End Event",
                bodyEvent_End(),
                is_Loading,
                false,
                "No end event yet!"
              )}
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
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

  return is_Loading == true ? (
    <LoadingSpinner />
  ) : (
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
}

export default Step_4_Entrance_Ticket_Scan_QRCode;
