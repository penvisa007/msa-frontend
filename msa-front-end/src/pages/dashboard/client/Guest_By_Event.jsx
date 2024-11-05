import React, { useEffect, useState } from "react";
import LocalHelper from "../../Helper/LocalHelper";
import Simple_Select from "../../component/Simple_Select";
import "bootstrap/dist/css/bootstrap.css";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import ExcelExport from "../summary_dashboard/ExcelExport";
import { IoQrCode } from "react-icons/io5";
import MyHelper from "../../Helper/MyHelper";
import axios from "axios";
function Guest_By_Event() {
  // =========================
  //Declaration
  var localHelper = new LocalHelper();
  var myHelper = new MyHelper()
  var host = "https://us-central1-msa-server-db.cloudfunctions.net";
  const [data_List_Of_Event, set_data_List_Of_Event] = useState([]);
  const [data_List_Of_Guest_Joined, set_data_List_Of_Guest_Joined] = useState(
    []
  );
  const [data_List_Of_Guest_Registered, set_data_List_Of_Guest_Registered] =
    useState([]);

  const [data_Event_Simple_Select, set_data_Event_Simple_Select] = useState([]);
  const [id_of_Event_InSelect, set_id_of_Event_InSelect] = useState("");
  const [value_Excel_Name, set_value_Excel_Name] = useState("");
  const [is_Loading_Guest, set_is_Loading_Guest] = useState(true);

  // =========================
  //Loading
  useEffect(() => {
    Loading_Event();
    LoadingEventData_Guest();
  }, [id_of_Event_InSelect]);

  function Loading_Event() {
    axios
      .get(host + "/api/v1/event", {
        headers: {
          Authorization: localHelper.Token(),
        },
      })
      .then((res) => {
        set_data_List_Of_Event(res.data.data);

        // Defualut Key
        var list = [];
        res.data.data.map((row, i) => {
          if (i == 0) {
            //  set_id_of_Event_InSelect(row.key);
          }

          list.push({
            value: row.key,
            label: row.name,
          });
        });
        set_data_Event_Simple_Select(list);
      });
  }

  function LoadingEventData_Guest() {
    axios
      .get(host + "/api/v1/event/guest-registered/" + id_of_Event_InSelect, {
        headers: {
          Authorization: localHelper.Token(),
        },
      })
      .then((res) => {
        if (res.data.status == false) {
          set_data_List_Of_Guest_Registered([]);
        } else {
          if (res.data.list_guest) {
            if (res.data.list_guest.length > 0) {
              set_data_List_Of_Guest_Registered(res.data.list_guest);
            } else {
              set_data_List_Of_Guest_Registered([]);
            }
          } else {
            set_data_List_Of_Guest_Registered([]);
          }
        }
        set_is_Loading_Guest(false);
      });

    axios
      .get(host + "/api/v1/event/guest-joined/" + id_of_Event_InSelect, {
        headers: {
          Authorization: localHelper.Token(),
        },
      })
      .then((res) => {
        if (res.data.status == false) {
          set_data_List_Of_Guest_Joined([]);
        } else {
          if (res.data.list_guest) {
            if (res.data.list_guest.length > 0) {
              set_data_List_Of_Guest_Joined(res.data.list_guest);
            } else {
              set_data_List_Of_Guest_Joined([]);
            }
          } else {
            set_data_List_Of_Guest_Joined([]);
          }
        }
        set_is_Loading_Guest(false);
      });
  }

  // =========================
  //EVent
  function action_OnChangeEvent(e) {
    set_is_Loading_Guest(true);
    set_id_of_Event_InSelect(e.value);
    set_value_Excel_Name(e.label);
  }

  function action_ViewEventDetail() {
    if (id_of_Event_InSelect != "") {
      window.location.href =
        "/msa/admin/event/detail-all/" + id_of_Event_InSelect;
    } else {
      alert("Please choose event!");
    }
  }

  //=========================
  //sub View
  function body_ChooseEvent() {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <Simple_Select
            title={"Select Event Below : "}
            senderOnChange={(e) => action_OnChangeEvent(e)}
            options={data_Event_Simple_Select}
          />
        </div>
        <button
          onClick={() => action_ViewEventDetail()}
          style={{
            height: "40px",
            width: "55px",
            marginTop: "29px",
            marginLeft: "20px",
          }}
          type="button"
          className="btn btn-outline-primary"
        >
          <FaEye style={{ marginTop: "-3px" }} />
        </button>
      </div>
    );
  }

  function body_GuestSummary() {
    return (
      <div style={{ height: "140px" }}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ textAlign: "center" }}>
            <FaPeopleGroup style={{ width: "70px", height: "70px" }} />
            <br />
            <label htmlFor="">Registered</label>
            <h5>{data_List_Of_Guest_Registered.length} Guests</h5>
          </div>

          <div style={{ textAlign: "center" }}>
            <FaPeopleGroup
              style={{ width: "70px", height: "70px", color: "green" }}
            />
            <br />
            <label htmlFor="">Joined</label>
            <h5>{data_List_Of_Guest_Joined.length} Guests</h5>
          </div>

          <div style={{ textAlign: "center" }}>
            <FaPeopleGroup
              style={{ width: "70px", height: "70px", color: "red" }}
            />
            <br />
            <label htmlFor="">Not Joined</label>
            <h5>
              {data_List_Of_Guest_Registered.length -
                data_List_Of_Guest_Joined.length}{" "}
              Guests
            </h5>
          </div>
        </div>
      </div>
    );
  }

  function body_Excel() {
    var titleNFileNameAll =
      value_Excel_Name +
      " Guest Registered (" +
      data_List_Of_Guest_Registered.length +
      ")";

    var titleNFileNameJoined =
      value_Excel_Name +
      " Guest Joined (" +
      data_List_Of_Guest_Joined.length +
      ")";

    var dataAll = [];
    data_List_Of_Guest_Registered.map((rowMain, i) => {
      var da = [];
      rowMain.form.map((rowForm, k) => {
        da[rowForm.title] = rowForm.value;
      });
      dataAll.push(da);
    });

    var dataJoined = [];
    data_List_Of_Guest_Joined.map((rowMain, i) => {
      var da = [];
      rowMain.form.map((rowForm, k) => {
        da[rowForm.title] = rowForm.value;
      });
      dataJoined.push(da);
    });

    return (
      <div style={{ height: "140px", overflow: "hidden" }}>
        <ExcelExport
          title={titleNFileNameAll}
          fileName={titleNFileNameAll}
          data={dataAll}
        />
        <ExcelExport
          title={titleNFileNameJoined}
          fileName={titleNFileNameJoined}
          data={dataJoined}
        />
      </div>
    );
  }

  function body_ListUser() {
    return (
      <div>
        {headerGuest()}
        {data_List_Of_Guest_Registered.map((row, i) => {
          return rowOfGuest(row, i);
        })}
      </div>
    );
  }

  function headerGuest() {
    return (
      <div style={{ paddingTop: "25px", backgroundColor: "#eeeeee" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{ width: "100px", paddingLeft: "20px", textAlign: "center" }}
          >
            <h5>No</h5>
          </div>

          <div style={{ width: "100%", paddingLeft: "20px" }}>
            <h5>Information</h5>
          </div>

          <div
            style={{ width: "150px", textAlign: "left", paddingLeft: "20px" }}
          >
            <h5>Status</h5>
          </div>

          <div
            style={{ width: "150px", textAlign: "left", paddingLeft: "20px" }}
          >
            <h5>Type</h5>
          </div>

          <div
            style={{
              height: "35px",

              width: "200px",
              display: "flex",
              paddingLeft: "20px",
              textAlign: "center",
            }}
          >
            <h5>Action</h5>
          </div>
        </div>
        <hr />
      </div>
    );
  }

  function rowOfGuest(row, i) {
    // Form
    var frm = "";
    row.form.map((rowFrm, k) => {
      frm += rowFrm.value + ", ";
    });
    frm = frm.slice(0, -2);

    // Status
    var status = "Not Joined";
    var type = "PR";
    if (row.url_and_link_type == "qrcode") {
      type = "QRCode";
    }
    if (row.event) {
      row.event.map((rowEvet, l) => {
        if (rowEvet.key == id_of_Event_InSelect) {
          if (rowEvet.status == "pending") {
            status = "Pending";
          } else if (rowEvet.status == "joined") {
            status = "Joined";
          }
        }
      });
    }

    return (
      <div
        key={i}
        style={{
          marginBottom: "0px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "100px", paddingLeft: "20px" }}>{i + 1}</div>

          <div style={{ width: "100%" }}>{frm}</div>

          <div style={{ width: "150px", textAlign: "center" }}>{status}</div>

          <div style={{ width: "150px", textAlign: "center" }}>{type}</div>

          <div
            style={{
              height: "35px",
              marginTop: "-5px",
              width: "200px",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <button
              onClick={() => action_ViewGuest(row)}
              type="button"
              class="btn btn-outline-primary"
            >
              <FaEye style={{ marginTop: "-5px" }} />
            </button>

            <button
              onClick={() => action_ViewQRGuest(row)}
              type="button"
              class="btn btn-outline-secondary"
            >
              <IoQrCode style={{ marginTop: "-5px" }} />
            </button>
          </div>
        </div>
        <hr />
      </div>
    );
  }

  function action_ViewGuest(row) {
    console.log(row);
    window.location.href = "/msa/admin/guest/detail/" + row.key;
  }

  function action_ViewQRGuest(row) {
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

  // =========================
  //View
  return (
    <div style={{ backgroundColor: "#dedede" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <br />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            {myHelper.Template_Defualt_Style(
              "Choose Event",
              body_ChooseEvent(),
              data_List_Of_Event.length > 0 ? false : true,
              false,
              "No Event Found Yet!"
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <br />
          </div>
        </div>

        <div className="row">
          <div className="col-7">
            {myHelper.Template_Defualt_Style(
              "Guest Summary",
              body_GuestSummary(),
              is_Loading_Guest,
              data_List_Of_Guest_Registered.length > 0 ? false : true,
              "No guest registered!"
            )}
          </div>

          <div className="col-5">
            {myHelper.Template_Defualt_Style(
              "Export",
              body_Excel(),
              is_Loading_Guest,
              data_List_Of_Guest_Registered.length > 0 ? false : true,
              "No file export!"
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
              "Guest List",
              body_ListUser(),
              is_Loading_Guest,
              data_List_Of_Guest_Registered.length > 0 ? false : true,
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

export default Guest_By_Event;