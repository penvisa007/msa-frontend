import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import LocalHelper from "../../Helper/LocalHelper";
import axios from "axios";
import Simple_Input from "../../component/Simple_Input";
import Simple_Select from "../../component/Simple_Select";
import { MdEvent } from "react-icons/md";
import Input_Helper from "../../Helper/Input_Helper ";
import MyHelper from "../../Helper/MyHelper";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.css";
import Theme_Registration from "./Theme_Registration";
import loading from "../../asset/qr-code-animation.gif";

function Step_2_Registration_From() {
  //====================================
  // Declaration
  var localHelper = new LocalHelper();
  var input_Helper = new Input_Helper();
  var myhelper = new MyHelper();
  const params = useParams();

  var host = "https://us-central1-msa-server-db.cloudfunctions.net";
  var key_of_url_and_link = myhelper.decrypt(params.key_of_url_and_link);

  const [data_URL_Registration, set_data_URL_Registration] = useState({});
  const [data_URL_Registration_Form, set_data_URL_Registration_Form] = useState(
    []
  );
  const [is_Loading, set_is_Loading] = useState(true);
  const [data_List_Of_Event, set_data_List_Of_Event] = useState([]);
  const [data_List_Of_Event_Orignal, set_data_List_Of_Event_Orignal] = useState(
    []
  );
  const [value_HeaderTitle, set_value_HeaderTitle] = useState("");
  const [value_Footer_Note, set_value_Footer_Note] = useState("");
  const [value_Footer_Contact, set_value_Footer_Contact] = useState("");
  const [data_Type_of_URL, set_data_Type_of_URL] = useState("");
  const [data_URL_and_Link, set_data_URL_and_Link] = useState("");
  const [value_Title_Type_URL_Form, set_value_Title_Type_URL_Form] =
    useState("");

  //==================================
  // Loading
  useEffect(() => {
    LoadingData();
  }, []);

  function LoadingData() {
    if (key_of_url_and_link == null) {
      alert("No Key URL and Link");
    } else {
      axios
        .get(
          host + "/" + "api/v1/url-and-link/event-detail/" + key_of_url_and_link
        )
        .then((res) => {
          if (res.data.status == false) {
            alert("Invalid Key URL and Link");
          } else {
            var data_URLand_Link = res.data.url_and_link;
            var list_Event = res.data.event_full.list;

            set_value_Type_Theme(res.data.url_and_link.theme);
            if (data_URLand_Link.type == "pr") {
              set_data_Type_of_URL("pr");
              set_value_Title_Type_URL_Form(
                "Public Registration / ចុះឈ្មោះចូលកម្មវិធី"
              );
            } else {
              set_data_Type_of_URL("qrcode");
              set_value_Title_Type_URL_Form(
                "Online Registration / ចុះឈ្មោះយកសំបុត្រ QRCode"
              );
            }
            set_data_URL_Registration(data_URLand_Link);
            set_data_URL_Registration_Form(data_URLand_Link.form);
            set_value_HeaderTitle(data_URLand_Link.url_name);
            set_value_Footer_Note(
              data_URLand_Link.on_register_form.footer_note
            );
            set_value_Footer_Contact(
              data_URLand_Link.on_register_form.contact_us
            );
            set_data_URL_and_Link(data_URLand_Link);

            set_is_Loading(false);

            var listEvent = [];
            for (let i of list_Event) {
              var p = myhelper.dateTime_GetPeroid(
                i.end_date.date,
                i.end_date.month,
                i.end_date.year
              );

              if (p > 0) {
                listEvent.push(i);
              }
            }

            set_data_List_Of_Event(listEvent);
            set_data_List_Of_Event_Orignal(listEvent);
          }
        });
    }
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
    var p_Start = myhelper.dateTime_GetPeroid(
      row.start_date.date,
      row.start_date.month,
      row.start_date.year
    );

    var p_End = myhelper.dateTime_GetPeroid(
      row.end_date.date,
      row.end_date.month,
      row.end_date.year
    );

    var dateevent = "";
    if (p_Start == 0) {
      dateevent = " Today, " + row.start_date.hh + ":" + row.start_date.mm;
    } else if (p_Start > 0) {
      dateevent =
        " Coming " +
        p_Start +
        " days (" +
        row.start_date.date +
        "/" +
        row.start_date.month +
        "/" +
        row.start_date.year +
        "), " +
        row.start_date.hh +
        ":" +
        row.start_date.mm +
        localHelper.AM_PM(row.start_date.hh);
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
        row.start_date.mm +
        localHelper.AM_PM(row.start_date.hh);

      dateevent = "Started " + dateevent.substring(1);
    } else {
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
        row.start_date.mm +
        localHelper.AM_PM(row.start_date.hh);

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
                {row.name}
              </label>
              <br />
              <label for={"id-checkbox-" + row.key}>{dateevent} </label>
            </div>
          </div>

          <div hidden={data_Type_of_URL == "pr" ? true : false}>
            <hr />
            <div
              style={{ width: "100%", paddingLeft: "10px", marginTop: "10px" }}
            >
              <h5 htmlFor="">អាចចូលរួមបាន / Can join?</h5>
             <div style={{ display: "flex", alignItems: "center" }}>
               <input
                 type="radio"
                 id={"id-checkbox-yes-" + row.key}
                 name={"id-checkbox-" + row.key}
                 value="Yes"
                 defaultChecked
                 style={{ marginRight: "10px" }}
               />
               <label
                 style={{ marginLeft: "5px" }}
                 for={"id-checkbox-yes-" + row.key}
               >
                 ចូលរួម / Yes
               </label>
                
               <br /><br />
             
               <input
                 style={{ marginLeft: "10px" }}
                 type="radio"
                 id={"id-checkbox-no-" + row.key}
                 name={"id-checkbox-" + row.key}
                 value="No" 
                  
               />
               <label
                 style={{ marginLeft: "5px" }}
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

  //************************************/
  //Event
  function action_Event_Save_QRCode() {
    var isNotJoinAll = true;
    var listOfApprovedInput = [];
    data_List_Of_Event.map((row, i) => {
      var inputYes = document.getElementById("id-checkbox-yes-" + row.key);
      var inputNo = document.getElementById("id-checkbox-no-" + row.key);
      row.guest_click_select = inputYes.checked;
      if (inputYes.checked == true) {
        isNotJoinAll = false;
      }
    });

    // Check Input
    data_URL_and_Link.form.map((row, index) => {
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
      PrepareWriteToServer_For_QRCode(isNotJoinAll, listOfApprovedInput);
    }
  }
  function PrepareWriteToServer_For_QRCode(isNotJoinAll, listOfApprovedInput) {
    set_is_Loading(true);
    // Check Form
    var listForm = [];
    data_URL_and_Link.form.map((rowMainFrom, i) => {
      listOfApprovedInput.map((rowIndex, k) => {
        if (i == k) {
          rowMainFrom.value = rowIndex.data;
        }
      });

      listForm.push(rowMainFrom);
    });

    // Check Event
    var listEvent = [];
    if (data_URL_and_Link.event) {
      data_URL_and_Link.event.map((rowEventURL, i) => {
        data_List_Of_Event.map((rowEvent, k) => {
          if (rowEvent.key == rowEventURL.key) {
            var status = "not_join";
            if (rowEvent.guest_click_select == true) {
              status = "pending";
            }

            rowEventURL.status = status;
          }
        });

        listEvent.push(rowEventURL);
      });
    }

    var checkTheme = value_Type_Theme;
    if (listEvent.length == 2) {
      var eventData = [];

      data_List_Of_Event.map((row, i) => {
        var inputYes = document.getElementById("id-checkbox-yes-" + row.key);
        var inputNo = document.getElementById("id-checkbox-no-" + row.key);
        if (inputYes.checked == true) {
          eventData.push({ key: row.key, is_go: inputYes.checked });
        }
      });

      if (eventData.length == 2) {
        checkTheme = "both";
      } else {
        data_List_Of_Event_Orignal.map((rowE, i) => {
          if (eventData.length > 0) {
            if (rowE.key && eventData[0].key) {
              if (rowE.key == eventData[0].key) {
                checkTheme = rowE.theme;
              }
            }
          }
        });
      }
    }

    var data = {
      theme: checkTheme,
      url_and_link_key: key_of_url_and_link,
      url_and_link_type: data_Type_of_URL,
      event: listEvent,
      form: listForm,
    };

    axios
      .post(host + "/api/v1/guest/public", data)
      .then((res) => {
        if (isNotJoinAll == true) {
          // For No Join, Only Registered
          window.location.replace(
            "/msa/guest/authorization/scan/registration/?key=" +
              myhelper.encrypt(res.data.key) +
              "&authorization=" +
              myhelper.encrypt("msa") +
              "&type=" +
              myhelper.encrypt(data_Type_of_URL) +
              "&urlkey=" +
              myhelper.encrypt(key_of_url_and_link)
          );
        } else {
          // Registerd go to QR code Save
          window.location.replace(
            "/msa/guest/ticket-qr/registration/?key_guest=" +
              res.data.key +
              "&key_url=" +
              key_of_url_and_link
          );
        }
      });
  }

  function action_Event_Save_PR() {
    var listOfApprovedInput = [];
    // Check Input
    data_URL_and_Link.form.map((row, index) => {
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
      PrepareWriteToServer_For_PR(listOfApprovedInput);
    }
  }

  function PrepareWriteToServer_For_PR(listOfApprovedInput) {
    // Check Form
    set_is_Loading(true);
    var listForm = [];
    data_URL_and_Link.form.map((rowMainFrom, i) => {
      listOfApprovedInput.map((rowIndex, k) => {
        if (i == k) {
          rowMainFrom.value = rowIndex.data;
        }
      });

      listForm.push(rowMainFrom);
    });

    var listEvent = [];
    if (data_URL_and_Link.event) {
      data_URL_and_Link.event.map((rowEventURL, i) => {
        rowEventURL.status = "joined";
        rowEventURL.date_joined = localHelper.returnCurrentDate();
        listEvent.push(rowEventURL);
      });
    }

    var data = {
      theme: value_Type_Theme,
      url_and_link_key: key_of_url_and_link,
      url_and_link_type: data_Type_of_URL,
      event: listEvent,
      form: listForm,
    };

    axios
      .post(host + "/api/v1/guest/public", data)
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: "Registration have been successful!",
          confirmButtonColor: "green",
          confirmButtonText: "Show Entrance Ticket",
        }).then((r) => {
          // Go to Scan Page
          window.location.replace(
            "/msa/guest/authorization/scan/registration/?key=" +
              myhelper.encrypt(res.data.key) +
              "&authorization=" +
              myhelper.encrypt("msa") +
              "&type=" +
              myhelper.encrypt(data_Type_of_URL) +
              "&urlkey=" +
              myhelper.encrypt(key_of_url_and_link)
          );
        });
      });
  }

  //====================================
  // Sub
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
              <h6 style={{ textAlign: "center" }}>
                {value_Title_Type_URL_Form}
              </h6>
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
              <h5
                hidden={data_Type_of_URL == "pr" ? true : false}
                style={{ marginTop: "10px" }}
              >
                {data_List_Of_Event.length > 1 ? "Choose / ជ្រើសយក :" : ""}{" "}
              </h5>
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
                    ? action_Event_Save_PR()
                    : action_Event_Save_QRCode()
                }
                type="button"
                style={{ width: "100%" }}
                className={
                  data_Type_of_URL == "pr"
                    ? "btn btn-outline-primary"
                    : "btn btn-outline-success"
                }
              >
                {data_Type_of_URL == "pr" ? "Register Now" : "Get QR Code"}
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

  //====================================
  // View
  // return (
  // <div style={{ position: "relative", backgroundColor: " white" }}>
  // <div
  // className="registration_css_main_bg_fix"
  // style={{ width: "100%", height: "100vh", position: "fixed" }}
  // ></div>

  // {is_Loading == true ? LoadingSpinner() : mainFormBody()}
  // </div>
  // );

  const [value_Type_Theme, set_value_Type_Theme] = useState("");
  return is_Loading == true ? (
    LoadingSpinner()
  ) : (
    <div style={{ textAlign: "center" }}>
      <Theme_Registration
        button_title={"ទទួលយក QR code / Get QR code"}
        event_Clicked={() => action_Event_Save_QRCode()}
        url_type={data_Type_of_URL}
        form={data_URL_Registration_Form}
        event={data_List_Of_Event}
        type={value_Type_Theme}
      />
    </div>
  );
}

export default Step_2_Registration_From;
