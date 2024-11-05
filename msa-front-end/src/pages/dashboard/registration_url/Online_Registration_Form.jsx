import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Simple_Input from "../../component/Simple_Input";
import { MdEvent } from "react-icons/md";
import loading from "../../asset/qr-code-animation.gif";
import Simple_Select from "../../component/Simple_Select"
import "../../component/Online_Registration_Form.css"
import Input_Helper from "../../Helper/Input_Helper ";

import Swal from "sweetalert2";
import LocalHelper from "../../Helper/LocalHelper";

const Registration = () => {
  //************************************/
  //Declration
  var localHelper = new LocalHelper();
  const host_name = localHelper.Hostname_Server();
  const host_name_Website = localHelper.Hostname_Website();

  var url_string = window.location.href;
  var url = new URL(url_string);
  var c = url.searchParams.get("key");
  var keyURLRegistration = decrypt(c);
  const [data_URL_Registration, set_data_URL_Registration] = useState({});
  const [data_URL_Registration_Form, set_data_URL_Registration_Form] = useState(
    []
  );
  const [is_Loading, set_is_Loading] = useState(true);
  const [data_List_Of_Event, set_data_List_Of_Event] = useState([]);
  const [value_HeaderTitle, set_value_HeaderTitle] = useState("");
  const [value_Footer_Note, set_value_Footer_Note] = useState("");
  const [value_Footer_Contact, set_value_Footer_Contact] = useState("");
  var input_Helper = new Input_Helper();

  //************************************/
  //Loading
  useEffect(() => {
    LoadingData();
  }, []);

  const [data_Type_of_URL, set_data_Type_of_URL] = useState("");
  const [isCanRegister, setisCanRegister] = useState(true);
  function LoadingData() {
    axios
      .get(host_name + "/api/url-public-qr-registration/" + keyURLRegistration)
      .then((data) => {
        if (data.data.status == false) {
          alert("Invalid QR Request!");
        } else {
          if (data.data.data_qr_url.type == "pr") {
            set_data_Type_of_URL("pr");
          } else {
            set_data_Type_of_URL("qrcode/url");
          }
          set_data_URL_Registration(data.data.data_qr_url);
          set_data_URL_Registration_Form(data.data.data_qr_url.form);
          set_value_HeaderTitle(data.data.data_qr_url.url_name);
          set_value_Footer_Note(
            data.data.data_qr_url.on_register_form.footer_note
          );
          set_value_Footer_Contact(
            data.data.data_qr_url.on_register_form.contact_us
          );

          set_is_Loading(false);

          var listEvent = [];
          for (let i of data.data.event_in_url) {
            var p = dateTime_GetPeroid(
              i.end_date.date,
              i.end_date.month,
              i.end_date.year
            );
   

            if (p > 0) {
              listEvent.push(i);
            }
          
          }

          set_data_List_Of_Event(listEvent);
        }
      });
  }

  //************************************/
  //Function
  function rowOfForm() {
    return data_URL_Registration_Form.map((row, index) => {
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
    var p_Start = dateTime_GetPeroid(
      row.start_date.date,
      row.start_date.month,
      row.start_date.year
    );

    var p_End = dateTime_GetPeroid(
      row.end_date.date,
      row.end_date.month,
      row.end_date.year
    );


    var dateevent = "";
    if (p_Start == 0) {
      dateevent = " Today, " + row.start_date.hh + ":" + row.start_date.mm;
    } else if (p_Start > 0) {
      dateevent =
        " Coming   " +
        p_Start +
        " day (" +
        row.start_date.date +
        "/" +
        row.start_date.month +
        "/" +
        row.start_date.year +
        "), " +
        row.start_date.hh +
        ":" +
        row.start_date.mm  + localHelper.AM_PM(row.start_date.hh)
    } else if (p_Start < 0 && p_End > 0) {
      dateevent =
        p_Start +
        " day (" +
        row.start_date.date +
        "/" +
        row.start_date.month +
        "/" +
        row.start_date.year +
        "), " +
        row.start_date.hh +
        ":" +
        row.start_date.mm + localHelper.AM_PM(row.start_date.hh)

      dateevent = "Started " + dateevent.substring(1);
    }else {

      dateevent =
        p_Start +
        " day ago (" +
        row.start_date.date +
        "/" +
        row.start_date.month +
        "/" +
        row.start_date.year +
        "), " +
        row.start_date.hh +
        ":" +
        row.start_date.mm  + localHelper.AM_PM(row.start_date.hh)

      dateevent = "Ended " + dateevent.substring(1);

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
            paddingTop: "10px",
            paddingBottom: "10px",
            display: "flex",
            marginBottom: "20px",
            justifyContent: "space-between",
          }}
        >
          <div for={"id-checkbox-" + row.key} style={{ display: "flex" }}>
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
                {row.name}
              </label>
              <br />
              <label for={"id-checkbox-" + row.key}>{dateevent} </label>
            </div>
          </div>

          <div class="form-check">
            <input
              defaultChecked={row.is_required_event == true ? true : false}
              className="form-check-input"
              type="checkbox"
              onChange={(e) =>
                row.is_required_event == true
                  ? (document.getElementById(
                      "id-checkbox-" + row.key
                    ).checked = true)
                  : null
              }
              id={"id-checkbox-" + row.key}
              style={{
                width: "20px",
                height: "20px",
                marginTop: "15px",
                marginRight: "10px",
              }}
            />
          </div>
        </div>
      </div>
    );
  }

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

  function dateTime_GetPeroid(dateAdd, monthAdd, yearAdd) {
    const date = new Date();
    let days = date.getDate();
    let months = date.getMonth() + 1;
    let years = date.getFullYear();

    return dateTime_GetPeroid_2_Date(
      days,
      months,
      years,
      dateAdd,
      monthAdd,
      yearAdd
    );
  }

  function dateTime_GetPeroid_2_Date(
    start_Date,
    start_Month,
    start_Year,
    end_Data,
    end_Month,
    end_year
  ) {
    var firstDate = start_Month + "/" + start_Date + "/" + start_Year;
    var endData = end_Month + "/" + end_Data + "/" + end_year;

    return datediff(parseDate(firstDate), parseDate(endData));
  }

  function parseDate(str) {
    var mdy = str.split("/");
    return new Date(mdy[2], mdy[0] - 1, mdy[1]);
  }

  // Date Sort
  function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
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

  function mainFormBody() {
    return (
      <div
        style={{
          position: "absolute",
          width: "100%",
          padding: "20px",
        }}
      >
        <div className="container-fluid registration_css_main_form">
          <div className="row">
            <div className="col-12">
              <br />
              <img
                src={localHelper.Logo_MSA()}
                style={{
                  width: "100%",
                  height: "50px",
                  objectFit: "contain",
                  padding: "0px",
                }}
                alt=""
              />
              <br />
              <br />
              <h4 style={{ textAlign: "center" }}>{value_HeaderTitle}</h4>
              <hr />
              <h6 style={{ textAlign: "center" }}>Online Registration Form</h6>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <br />
              {rowOfForm()}
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <br />
              <h5>{data_List_Of_Event.length > 1 ? "Choose event :" : ""} </h5>
              <div style={{ marginTop: "20px" }}>
                {data_List_Of_Event.map((row, index) => {
                  return <div key={index}>{bodyRowEvent(row)}</div>;
                })}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <label style={{ color: "gray" }}>{value_Footer_Note}</label>
              <br />
              <label style={{ color: "gray" }}>{value_Footer_Contact}</label>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <br />
              <button
                onClick={() =>
                  data_Type_of_URL == "pr"
                    ? action_EventSaveAndJoinNowForPR()
                    : action_EventSave()
                }
                type="button"
                style={{ width: "100%" }}
                className={
                  data_Type_of_URL == "pr"
                    ? "btn btn-outline-primary"
                    : "btn btn-outline-success"
                }
              >
                {data_Type_of_URL == "pr" ? "Register Now" : "Get QR Entrance"}
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <br />
              <label
                style={{
                  color: "gray",
                  marginBottom: "20px",
                  width: "100%",
                  fontSize: "10px",
                  textAlign: "center",
                }}
              >
                Powered by Cyber Tech System
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //************************************/
  //Event
  function action_EventSave() {
    var listOfApprovedInput = [];
    data_URL_Registration_Form.map((row, index) => {
      var id =
        row.input_type == "input"
          ? input_Helper.Input_Custom("id-form-input-" + index, row.is_required)
          : input_Helper.Select_Custom(
              "id-form-input-" + index,
              row.is_required
            );

      listOfApprovedInput.push({ index: index, data: id });
    });

    var isApprved = true;
    for (let i of listOfApprovedInput) {
      if (i.data == false) {
        isApprved = false;
        break;
      }
    }

    if (isApprved == true) {
      // Prepare Data
      PrepareWriteToServer(listOfApprovedInput);
    }
  }

  function PrepareWriteToServer(listOfApprovedInput) {
    // Form
    var listOfForm = [];
    data_URL_Registration_Form.map((row, index) => {
      for (let j of listOfApprovedInput) {
        if (j.index == index) {
          row.value = j.data;
          break;
        }
      }
      listOfForm.push(row);
    });

    // event
    var listEvent = [];
    var listEventFullData = [];
    for (let i of data_List_Of_Event) {
      var checkBox = document.getElementById("id-checkbox-" + i.key);

      if (checkBox.checked == true) {
        var data = {
          event_key: i.key,
          staute: "pending",
        };
        listEvent.push(data);
        listEventFullData.push(i);
      }
    }

    if (listEvent.length > 0) {
      set_is_Loading(true);
      var data = {
        registration_key: keyURLRegistration,
        event: listEvent,
        form: listOfForm,
        registered_date: {
          day: dateTime_Get_Current_Day(),
          month: dateTime_Get_Current_Month(),
          year: dateTime_Get_Current_Year(),
          hh: dateTime_Get_Current_Hour(),
          mm: dateTime_Get_Current_Minute(),
          ss: dateTime_Get_Current_Second(),
        },
      };

      axios
        .post(host_name + "/api/registration-public-url", data)
        .then((data) => {
          var sendData = {
            registration_data: data.data,
            url_qr_data: data_URL_Registration,
            event_full: listEventFullData,
          };

          window.location.replace(
            "/completed/registration-event/?data=" +
              encodeURIComponent(JSON.stringify(sendData))
          );
        });
    } else {
      alert("Please choose event at least 1!");
    }
  }

  function action_EventSaveAndJoinNowForPR() {
    var listOfApprovedInput = [];
    data_URL_Registration_Form.map((row, index) => {
      var id =
        row.input_type == "input"
          ? input_Helper.Input_Custom("id-form-input-" + index, row.is_required)
          : input_Helper.Select_Custom(
              "id-form-input-" + index,
              row.is_required
            );

      listOfApprovedInput.push({ index: index, data: id });
    });

    var isApprved = true;
    for (let i of listOfApprovedInput) {
      if (i.data == false) {
        isApprved = false;
        break;
      }
    }

    if (isApprved == true) {
      // Prepare Data
      PrepareWriteToServer_ForPR(listOfApprovedInput);
    }
  }

  function PrepareWriteToServer_ForPR(listOfApprovedInput) {
    // Form
    var listOfForm = [];
    data_URL_Registration_Form.map((row, index) => {
      for (let j of listOfApprovedInput) {
        if (j.index == index) {
          row.value = j.data;
          break;
        }
      }
      listOfForm.push(row);
    });

    // event
    var listEvent = [];
    var listEventFullData = [];
    for (let i of data_List_Of_Event) {
      var checkBox = document.getElementById("id-checkbox-" + i.key);

      if (checkBox.checked == true) {
        var data = {
          event_key: i.key,
          staute: "pending",
        };
        listEvent.push(data);
        listEventFullData.push(i);
      }
    }

    if (listEvent.length > 0) {
      set_is_Loading(true);
      var data = {
        registration_key: keyURLRegistration,
        event: listEvent,
        form: listOfForm,
        registered_date: {
          day: dateTime_Get_Current_Day(),
          month: dateTime_Get_Current_Month(),
          year: dateTime_Get_Current_Year(),
          hh: dateTime_Get_Current_Hour(),
          mm: dateTime_Get_Current_Minute(),
          ss: dateTime_Get_Current_Second(),
        },
      };

      axios
        .post(host_name + "/api/registration-public-url", data)
        .then((dataResponse) => {
          var sendData = {
            registration_data: dataResponse.data,
            url_qr_data: data_URL_Registration,
            event_full: listEventFullData,
          };

          // Change data to joined event
          // Joined Data Update
          listEventFullData.map((rowEventFull, k) => {
            var newListEventInGuest = []; // list will send
            sendData.registration_data.data.event.map((row, i) => {
              row.staute = "joined";
              row.date_joined = {
                date: dateTime_Get_Current_Day(),
                month: dateTime_Get_Current_Month(),
                year: dateTime_Get_Current_Year(),
                hh: dateTime_Get_Current_Hour(),
                mm: dateTime_Get_Current_Minute(),
                ss: dateTime_Get_Current_Second(),
              };

              newListEventInGuest.push(row);
            });

            // Change Event Count
            var updateEvent = {
              guest_joined: rowEventFull.guest_joined + 1,
            };

            // repare Data
            var data = {
              key_event: rowEventFull.key,
              key_guest: dataResponse.data.key,
              guest_update: newListEventInGuest,
              event_update: updateEvent,
            };

            axios
              .post(host_name + "/api/guest/apprroved/registration/", data)
              .then((response) => {
                if (k + 1 == listEventFullData.length) {
                  Swal.fire({
                    icon: "success",
                    title: "Successful Registered",
                    showCancelButton: false,
                    confirmButtonColor: "green",
                    confirmButtonText: "Show Ticket",
                  }).then((d) => {
                    var qr =
                      host_name_Website +
                      "/guest/qr-code/event/scan/?data=" +
                      encrypt(dataResponse.data.key) +
                      "&authorization=" +
                      encrypt("msa-camera-2024");

                    window.location.replace(qr);
                  });
                }
              });
          });
        });
    } else {
      alert("Please choose event at least 1!");
    }
  }

  return (
    <div style={{ position: "relative", backgroundColor: " white" }}>
      <div
        className="registration_css_main_bg_fix"
        style={{ width: "100%", height: "100vh", position: "fixed" }}
      ></div>

      {is_Loading == true ? LoadingSpinner() : mainFormBody()}
    </div>
  );

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
};

export default Registration;
