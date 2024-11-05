import React, { useEffect, useState } from "react";
import LocalHelper from "../../Helper/LocalHelper";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { IoIosPeople } from "react-icons/io";
import ExcelExport from "../../dashboard/summary_dashboard/ExcelExport";
import { FaUserAlt } from "react-icons/fa";
import MyHelper from "../../Helper/MyHelper";
import { FaEye } from "react-icons/fa";
function Event_Both_Report() {
  var localHelper = new LocalHelper();
  var host = "https://us-central1-msa-server-db.cloudfunctions.net";
  const [list_Of_Event, set_list_Of_Event] = useState([]);
  const [list_Of_Guest, set_list_Of_Guest] = useState([]);
  const [is_Loading, set_is_Loading] = useState(true);
  var myHelper = new MyHelper();

  //==============================
  // Loading
  useEffect(() => {
    LoadingData();
  }, []);
  function LoadingData() {
    axios.get(host + "/api/v1/customization").then((res) => {
      if (res.data.status == true) {
        set_list_Of_Guest(res.data.guest.list);
        set_list_Of_Event(res.data.event.list);
        set_is_Loading(false);
      } else {
        // No list
      }
    });
  }

  //==============================
  // Sub View
  function bodyOfEvent() {
    return (
      <div>
        <div>
          <h6>
            <IoIosPeople
              style={{
                width: "30px",
                height: "30px",
                marginTop: "-5px",
                marginLeft: "10px",
              }}
            />{" "}
            Total Registered : {list_Of_Guest.length} Guests
          </h6>
        </div>

        <hr />
        {list_Of_Event.map((row, i) => {
          return (
            <div key={i} style={{ padding: "20px", marginBottom: "20px" }}>
              {rowBody_Info("Name(en)", row.name)}
              {rowBody_Info("Name(kh)", row.name_kh)}
              {rowBody_Info(
                "Start",
                row.start_date.date +
                  "/" +
                  row.start_date.month +
                  "/" +
                  row.start_date.year +
                  ", " +
                  row.start_date.hh +
                  ":" +
                  row.start_date.mm +
                  localHelper.AM_PM(row.start_date.hh)
              )}
              {rowBody_Info(
                "End",
                row.end_date.date +
                  "/" +
                  row.end_date.month +
                  "/" +
                  row.end_date.year +
                  ", " +
                  row.end_date.hh +
                  ":" +
                  row.end_date.mm +
                  localHelper.AM_PM(row.end_date.hh)
              )}
            </div>
          );
        })}
      </div>
    );
  }

  function bodyOfExcelGuest() {
    var title = "";
    list_Of_Event.map((row, i) => {
      title += row.name + (i + 1 == list_Of_Event.length ? "" : ", ");
    });
    title = title + " (" + list_Of_Guest.length + " Guests)";

    var list = [];
    list_Of_Guest.map((row, i) => {
      var frm = {};
      if (row.form) {
        row.form.map((rowFrm, k) => {
          frm[rowFrm.title] = rowFrm.value;
        });
      }
      list.push(frm);
    });

    return (
      <div>
        <ExcelExport fileName={title} title={title} data={list} />
      </div>
    );
  }

  function bodyOfChartGuest() {
    var totalRegistered = list_Of_Guest.length;
    var totalJoinedAll = 0;
    list_Of_Guest.map((row, i) => {
      var isCanJoinAll = true;
      if (row.event) {
        var listJoin = [];
        row.event.map((k, j) => {
          if (k.status == "joined") {
            listJoin.push(true);
          }
        });

        var isTrueAll = true;
        listJoin.map((s, l) => {
          if (s == false) {
            isTrueAll = false;
          }
        });

        if (isTrueAll == true) {
          isCanJoinAll = true;
        }

        if (listJoin.length == 0) {
          isCanJoinAll = false;
        }
      } else {
        isCanJoinAll = false;
      }

      if (isCanJoinAll == true) {
        totalJoinedAll = totalJoinedAll + 1;
      }
    });

    return (
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
          <h6>Registerd</h6>
          <FaUserAlt />
          <br />
          <label htmlFor="">{totalRegistered} Guests</label>
        </div>

        <div style={{ padding: "20px", textAlign: "center", color: "green" }}>
          <h6>Joined All</h6>
          <FaUserAlt />
          <br />
          <label htmlFor="">{totalJoinedAll} Guests</label>
        </div>
      </div>
    );
  }

  function bodyOfGuestList() {
    return (
      <div style={{ padding: "20px"}}>
        {list_Of_Guest.map((row, i) => {
          var name = "";
          if (row.form) {
            row.form.map((frm, p) => {
              name += frm.value + ", ";
            });
          }
          name = name.slice(0, -2);

          return (
            <div style={{paddingTop: '5px', paddingLeft: '20px', paddingRight: '20px'}}>
              <div
                key={i}
                style={{
                  marginBottom: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <label style={{ width: "50px" }}>{i + 1}</label>
                <div style={{ width: "100%" }}>
                  <label style={{ textAlign: "left" }}>{name}</label>
                </div>

                <label style={{ width: "100px" }}>
                  {row.url_and_link_type == "qrcode" ? "QR Code" : "PR"}
                </label>

                <button
                  type="button"
                  className="btn btn-outline-primary"
                  style={{ marginTop: "-5px" }}
                >
                  <FaEye
                    onClick={() =>
                      (window.location.href =
                        "/msa/admin/guest/detail/" + row.key)
                    }
                    style={{ marginTop: "-5px", width: "30px" }}
                  />
                </button>
              </div>
              <hr />
            </div>
          );
        })}
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
        <label htmlFor="" style={{ width: "130px" }}>
          {title}
        </label>
        <label htmlFor="" style={{ width: "20px", textAlign: "left" }}>
          :
        </label>
        <label
          htmlFor=""
          style={{ textAlign: "left", width: "100%", marginLeft: "10px" }}
        >
          {value}
        </label>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#dedede" }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-7">
            {myHelper.Template_Defualt_Style(
              "Event",
              bodyOfEvent(),
              is_Loading,
              list_Of_Event.length > 0 ? false : true,
              "No Event Found!"
            )}
          </div>

          <div className="col-5">
            {myHelper.Template_Defualt_Style(
              "Export",
              bodyOfExcelGuest(),
              is_Loading,
              list_Of_Guest.length > 0 ? false : true,
              "No Export Found!"
            )}

            <br />
            {myHelper.Template_Defualt_Style(
              "Registered vs Joined",
              bodyOfChartGuest(),
              is_Loading,
              list_Of_Guest.length > 0 ? false : true,
              "No Export Found!"
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <br />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            {myHelper.Template_Defualt_Style(
              "Guests List",
              bodyOfGuestList(),
              is_Loading,
              list_Of_Guest.length > 0 ? false : true,
              "No Guest Found!"
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

export default Event_Both_Report;
