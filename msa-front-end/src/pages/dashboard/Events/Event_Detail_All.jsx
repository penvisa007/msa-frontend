import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import LocalHelper from "../../Helper/LocalHelper";
import "bootstrap/dist/css/bootstrap.css";
import { Chart } from "react-google-charts";
import { FaEye } from "react-icons/fa";
import "../../component/font_khmer.css"
import ExcelExport from "../../dashboard/summary_dashboard/ExcelExport";
import CookieAndSession from "../../Helper/CookieAndSession";
import { IoQrCodeOutline } from "react-icons/io5";
import MyHelper from "../../Helper/MyHelper";
function Event_Detail_All() {
  var host = "https://us-central1-msa-server-db.cloudfunctions.net";
  var cookie = new CookieAndSession();
  var localHelper = new LocalHelper();
  var myHelper = new MyHelper();
  const params = useParams();
  var key_of_event = params.key_of_event;
  var [data_Event_Detail, set_data_Event_Detail] = useState({});
  var [data_Event_Detail_Start_Date, set_data_Event_Detail_Start_Date] =
    useState("");
  var [data_Event_Detail_End_Date, set_data_Event_Detail_End_Date] =
    useState("");
  var [data_List_Of_Guest_Registration, set_data_List_Of_Guest_Registration] =
    useState([]);
  var [data_List_Of_Guest_Joined, set_data_List_Of_Guest_Joined] = useState([]);

  var [data_Excel_Guest_Joined, set_data_Excel_Guest_Joined] = useState([]);
  var [data_Excel_Guest_Registered, set_data_Excel_Guest_Registered] = useState(
    []
  );

  var [is_Loading_body_EventInformation, set_is_Loading_body_EventInformation] =
    useState(true);
  var [is_Loading_Guest_Registration, set_is_Loading_Guest_Registration] =
    useState(true);

  var [is_Loading_Guest_Joined, set_is_Loading_Guest_Joined] = useState(true);

  //===============================
  // Loading
  useEffect(() => {
    LoadingData_Guest_Registration();
    LoadingData_Guest_Joined();
    Loading_Event();
  }, []);

  function Loading_Event() {
    axios
      .get(host + "/api/v1/event/" + key_of_event, {
        headers: {
          Authorization: localHelper.Token(),
        },
      })
      .then((res) => {
        if (res.data.status == false) {
          // Null
        } else {
          set_data_Event_Detail(res.data.data);
          set_data_Event_Detail_Start_Date(
            res.data.data.start_date.date +
              "/" +
              res.data.data.start_date.month +
              "/" +
              res.data.data.start_date.year +
              ", " +
              res.data.data.start_date.hh +
              ":" +
              res.data.data.start_date.mm +
              localHelper.AM_PM(res.data.data.start_date.hh)
          );
          set_data_Event_Detail_End_Date(
            res.data.data.end_date.date +
              "/" +
              res.data.data.end_date.month +
              "/" +
              res.data.data.end_date.year +
              ", " +
              res.data.data.end_date.hh +
              ":" +
              res.data.data.end_date.mm +
              localHelper.AM_PM(res.data.data.end_date.hh)
          );
        }
        set_is_Loading_body_EventInformation(false);
      });
  }

  function LoadingData_Guest_Registration() {
    axios
      .get(host + "/api/v1/event/guest-registered/" + key_of_event, {
        headers: {
          Authorization: localHelper.Token(),
        },
      })
      .then((res) => {
        if (res.data.status == false) {
          // Null
        } else {
          set_data_List_Of_Guest_Registration(res.data.list_guest);

          // add to excel
          var data = [];
          var listExcel = [];
          res.data.list_guest.map((guestData, i) => {
            var item = {};
            guestData.form.map((guestForm, k) => {
              item[guestForm.title] = guestForm.value;
            });
            data.push(item);
          });

          var dataAdd = (
            <ExcelExport
              fileName={
                "Registered (" + res.data.list_guest.length + " Guests)"
              }
              data={data}
              title={"Registered (" + res.data.list_guest.length + " Guests)"}
            />
          );

          listExcel.push(dataAdd);
          set_data_Excel_Guest_Registered(listExcel);
        }
        set_is_Loading_Guest_Registration(false);
      });
  }

  function LoadingData_Guest_Joined() {
    axios
      .get(host + "/api/v1/event/guest-joined/" + key_of_event, {
        headers: {
          Authorization: localHelper.Token(),
        },
      })
      .then((res) => {
        if (res.data.status == false) {
          // Null
        } else {
          set_data_List_Of_Guest_Joined(res.data.list_guest);

          // add to excel
          var data = [];
          var listExcel = [];
          res.data.list_guest.map((guestData, i) => {
            var item = {};
            guestData.form.map((guestForm, k) => {
              item[guestForm.title] = guestForm.value;
            });
            data.push(item);
          });

          var dataAdd = (
            <ExcelExport
              fileName={"Joined (" + res.data.list_guest.length + " Guests)"}
              data={data}
              title={"Joined (" + res.data.list_guest.length + " Guests)"}
            />
          );

          listExcel.push(dataAdd);
          set_data_Excel_Guest_Joined(listExcel);
        }
        set_is_Loading_Guest_Joined(false);
      });
  }

  //====================
  // function
  function body_EventInformation() {
    return (
      <div>
        {rowBody_Info("Name : ", data_Event_Detail.name)}
        {rowBody_Info("Note : ", data_Event_Detail.note)}
        {rowBody_Info("Start : ", data_Event_Detail_Start_Date)}
        {rowBody_Info("End : ", data_Event_Detail_End_Date)}
        {rowBody_Info(
          "Registered : ",
          data_List_Of_Guest_Registration.length + " Guests"
        )}

        {rowBody_Info(
          "Joined : ",
          data_List_Of_Guest_Joined.length + " Guests"
        )}

        {rowBody_Info("Authorized Key : ", data_Event_Detail.key)}
      </div>
    );
  }

  function rowBody_Info(title, value) {
    return (
      <div
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

  function body_Registered_VS_Join() {
    var mainList = [];
    mainList.push(["Event", " Guests"]);

    var data = ["Registered", data_List_Of_Guest_Registration.length];
    mainList.push(data);

    var data2 = ["Joined", data_List_Of_Guest_Joined.length];
    mainList.push(data2);

    const options = {
      title: "Guests Chart",
      legend: "none",
    };

    return (
      <div>
        <Chart
          options={options}
          chartType="ColumnChart"
          width="100%"
          height="500px"
          data={mainList}
        />
      </div>
    );
  }

  function body_Export() {
    return (
      <div>
        {data_Excel_Guest_Joined}
        {data_Excel_Guest_Registered}
      </div>
    );
  }

  function body_Guest_Joined() {
    return (
      <div>
        {data_List_Of_Guest_Joined.map((row, i) => {
          return rowOfUser(row, i);
        })}
      </div>
    );
  }

  function body_Guest_Registered() {
    return (
      <div>
        {data_List_Of_Guest_Registration.map((row, i) => {
          return rowOfUser(row, i);
        })}
      </div>
    );
  }

  function rowOfUser(row, i) {
    var name = "";

    row.form.map((frm, k) => {
      name += frm.value + ", ";
    });

    name = name.slice(0, -2);
    return (
      <div
        key={i}
        style={{
          marginTop: "10px",
          paddingLeft: "10px",
          paddingRight: "10px",
          marginBottom: "20px",
        }}
      >
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <div style={{ paddingTop: "5px" }}>
            <label htmlFor="">{i + 1} - </label>
            <label htmlFor="">{name}</label>
          </div>

          <div style={{ display: "flex", height: "40px", paddingTop: "0px" }}>
            <button
              onClick={() => event_View_QR(row)}
              type="button"
              className="btn btn-outline-secondary"
              style={{ width: "50px", marginRight: "10px" }}
            >
              <IoQrCodeOutline style={{ marginTop: "-5px" }} />
            </button>

            <button
              onClick={() => event_View_Detail(row)}
              type="button"
              className="btn btn-outline-primary"
              style={{ width: "50px" }}
            >
              <FaEye style={{ marginTop: "-5px" }} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  function event_View_Detail(row) {
    window.location.href = "/msa/admin/guest/detail/" + row.key;
  }

  function event_View_QR(row) {
    cookie.Cookie_Set("camera-scan", "false", 1);
    var url =
      "/msa/guest/authorization/scan/registration/?key=" +
      myHelper.encrypt(row.key) +
      "&authorization=" +
      myHelper.encrypt("msa") +
      "&type=" +
      myHelper.encrypt(row.url_and_link_type) +
      "&urlkey=" +
      myHelper.encrypt(row.url_and_link_key);

    window.open(url, "_blank");
  }

  return (
    <div style={{ backgroundColor: "#dedede", paddingBottom: "50px" }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            {myHelper.Template_Defualt_Style(
              "Event Information",
              body_EventInformation(),
              is_Loading_body_EventInformation,
              false
            )}

            <br />
            {myHelper.Template_Defualt_Style(
              "Export",
              body_Export(),
              is_Loading_Guest_Registration,
              data_List_Of_Guest_Registration.length > 0? false : true,
              "No export guest data yet!"
            )}
          </div>

          <div className="col-6">
            {myHelper.Template_Defualt_Style(
              "Registered vs Joined",
              body_Registered_VS_Join(),
              is_Loading_Guest_Registration,
              false
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <br />
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            {myHelper.Template_Defualt_Style(
              "List Guest Joined",
              body_Guest_Joined(),
              is_Loading_Guest_Registration,
                 data_List_Of_Guest_Joined.length > 0? false : true,
              "No export guest data yet!"
            )}
          </div>

          <div className="col-6">
            {myHelper.Template_Defualt_Style(
              "Guests Registered",
              body_Guest_Registered(),
              is_Loading_Guest_Registration,
                 data_Excel_Guest_Registered.length > 0? false : true,
              "No export guest data yet!"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event_Detail_All;