import axios from "axios";
import React, { useEffect, useState } from "react";
import LocalHelper from "../../Helper/LocalHelper";
import { useParams } from "react-router";
import "bootstrap/dist/css/bootstrap.css";
import { MdEvent } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import Simple_Input from "../../component/Simple_Input";
import ExcelExport from "../../dashboard/summary_dashboard/ExcelExport";
import MyHelper from "../../Helper/MyHelper";
import { IoQrCode } from "react-icons/io5";
function Guest_Detail() {
  //=================================
  // Declaration
  const params = useParams();
  var key_of_guest = params.key_of_guest;
  var local_Helper = new LocalHelper();
  var myHelper = new MyHelper();
  var host = "https://us-central1-msa-server-db.cloudfunctions.net";
  const [data_List_Of_Event_Full, set_data_List_Of_Event_Full] = useState([]);
  const [data_List_Of_Event_In_Guest, set_data_List_Of_Event_In_Guest] =
    useState([]);
  const [data_List_Of_Guest_Form, set_data_List_Of_Guest_Form] = useState([]);
  const [data_Guest_Detail, set_data_Guest_Detail] = useState({});
  const [is_Loading, set_is_Loading] = useState(true);
  const [is_Loading_Update, set_is_Loading_Update] = useState(true);

  //=================================
  // Loading
  useEffect(() => {
    LoadingData();
  }, []);

  function LoadingData() {
    axios.get(host + "/api/v1/guest/public/" + key_of_guest).then((res) => {
      set_data_List_Of_Event_In_Guest(res.data.event.all.list);
      set_data_List_Of_Event_Full(res.data.event_originals);
      set_data_List_Of_Guest_Form(res.data.url_and_link.form);
      set_data_Guest_Detail(res.data.url_and_link);
      set_is_Loading(false);
      set_is_Loading_Update(false);
    });
  }

  //=================================
  // Sub View
  function body_GuestDetail() {
    return data_List_Of_Guest_Form.map((row, i) => {
      return rowBody_Info(row.title + " : ", row.value, i);
    });
  }

  function rowBody_Info(title, value, i) {
    return (
      <div
        key={i}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px",
        }}
      >
        <label htmlFor="" style={{ width: "50%" }}>
          {title}
        </label>
        <label htmlFor="" style={{ textAlign: "left", width: "50%" }}>
          {value}
        </label>
      </div>
    );
  }

  function body_Event() {
    return data_List_Of_Event_In_Guest.map((row, i) => {
      return rowOfEvent(row, i);
    });
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
      local_Helper.AM_PM(row.event_full.start_date.hh);

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
      local_Helper.AM_PM(row.event_full.end_date.hh);

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

            <button
              onClick={() => action_EventDetailEvent(row)}
              style={{ width: "55px", marginTop: "-2px" }}
              type="button"
              className="btn btn-outline-primary"
            >
              <FaEye style={{ marginTop: "-3px" }} />
            </button>
          </div>
          <hr />

          <div>
            {rowBody_Info("Note : ", row.event_full.note, i + 4)}
            {rowBody_Info("Start : ", startDate, i + 2)}
            {rowBody_Info("End : ", endtDate, i + 3)}
            {rowBody_Info(
              "Status : ",
              row.event_full.not_finish == "yes" ? "Upcoming" : "Finished",
              i + 5
            )}
          </div>
        </div>
      </div>
    );
  }

  function body_Status() {
    return data_List_Of_Event_In_Guest.map((row, i) => {
      return rowOfStatus(row, i);
    });
  }

  function rowOfStatus(row, i) {
    var value = "Not Joined";
    if (row.status == "joined") {
      value = "Joined";
    } else if (row.status == "pending") {
      value = "Pending";
    } else {
      value = "Not Joined";
    }

    var joinedData = "";

    if (row.date_joined) {
      joinedData =
        row.date_joined.date +
        "/" +
        row.date_joined.month +
        "/" +
        row.date_joined.year +
        ", " +
        row.date_joined.hh +
        ":" +
        row.date_joined.mm +
        local_Helper.AM_PM(row.date_joined.hh);
    }

    return (
      <div key={i} style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <MdEvent
              style={{
                width: "20px",
                height: "20px",
                marginRight: "10px",
                marginTop: "3px",
              }}
            />
            <label>{row.event_full.name}</label>
          </div>

          <label
            style={{
              color:
                value == "Pending"
                  ? "oragane"
                  : value == "Joined"
                  ? "green"
                  : "red",
            }}
          >
            {value}
          </label>
        </div>

        <div
          hidden={value == "Joined" ? false : true}
          style={{ marginLeft: "30px", marginTop: "0px" }}
        >
          <label style={{ color: "gray" }}>Joined Date : {joinedData}</label>
        </div>
      </div>
    );
  }

  function body_Update() {
    return data_List_Of_Event_In_Guest.map((row, i) => {
      return row_of_Update(row, i);
    });
  }

  function row_of_Update(row, i) {
    var noteValue = "";
    if (row.note) {
      noteValue = row.note;
    }

    return (
      <div key={i} style={{ padding: "5px", marginBottom: "20px" }}>
        <div style={{ textAlign: "right" }}>
          <Simple_Input
            id={row.event_full.key + "-input"}
            title={row.event_full.name}
            value={noteValue}
          />
          <button
            onClick={() => action_Event_UpdateNote(row)}
            type="button"
            className="btn btn-success"
            style={{ width: "80px" }}
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  function body_ExportGuestAndQR() {
    var data = [];
    var form = "";
    data_List_Of_Guest_Form.map((row, i) => {
      form += row.value + ", ";
    });
    form = form.slice(0, -2);

    var event = "";
    data_List_Of_Event_In_Guest.map((row, i) => {
      event += row.event_full.name + ", ";
    });
    event = event.slice(0, -2);

    // Data
    data.push({ GuestInfo: form, Event: event });
    var scan =
      "/msa/guest/authorization/scan/registration/?key=" +
      myHelper.encrypt(key_of_guest) +
      "&authorization=" +
      myHelper.encrypt("msa") +
      "&type=" +
      myHelper.encrypt("NA") +
      "&urlkey=" +
      myHelper.encrypt("NA");

    return (
      <div style={{ paddingBottom: "20px" }}>
        <ExcelExport
          fileName={"Guest Information"}
          title={"Guest Information"}
          data={data}
        />

        <div style={{ paddingLeft: "15px" }}>
          <IoQrCode />
          <a href={scan} target="_blank" style={{ marginLeft: "10px" }}>
            Guest Scan Mode
          </a>
        </div>
      </div>
    );
  }

  //=================================
  // Event
  function action_EventDetailEvent(row) {
    window.location.href = "/msa/admin/event/detail-all/" + row.event_full.key;
  }

  function action_Event_UpdateNote(row) {
    set_is_Loading_Update(true);
    var value = document.getElementById(row.event_full.key + "-input").value;

    var list = [];
    data_List_Of_Event_Full.map((rowOri, k) => {
      if (rowOri.key == row.event_full.key) {
        if (value == null || value == undefined || value == "") {
          if (rowOri.note) {
            // Remove
            delete rowOri.note;
          }
        } else {
          rowOri.note = value;
        }
      }

      list.push(rowOri);
    });

    // Update Data
    axios
      .put(
        host + "/api/v1/guest/" + key_of_guest + "",
        {
          event: list,
        },
        {
          headers: {
            Authorization: local_Helper.Token(),
          },
        }
      )
      .then((done) => {
        LoadingData();
      });
  }

  //=================================
  // View
  return (
    <div style={{ backgroundColor: "#dedede" }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-5">
            {myHelper.Template_Defualt_Style(
              "Guest Detail",
              body_GuestDetail(),
              is_Loading,
              false,
              "No guest info!"
            )}

            <br />

            {myHelper.Template_Defualt_Style(
              "Status",
              body_Status(),
              is_Loading,
              false,
              "No guest info!"
            )}

            <br />
            {myHelper.Template_Defualt_Style(
              "Note",
              body_Update(),
              is_Loading_Update,
              false,
              "No Update Found!"
            )}
          </div>

          <div className="col-7">
            {myHelper.Template_Defualt_Style(
              "Event",
              body_Event(),
              is_Loading,
              false,
              "No event found!"
            )}

            <br />
            {myHelper.Template_Defualt_Style(
              "Export & QR Code",
              body_ExportGuestAndQR(),
              is_Loading,
              false,
              "No eevnt found!"
            )}
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
}

export default Guest_Detail;
