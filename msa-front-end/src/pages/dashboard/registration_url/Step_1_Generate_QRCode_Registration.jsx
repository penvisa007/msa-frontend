import axios from "axios";
import React, { useEffect, useState } from "react";
import ExcelExport from "../../dashboard/summary_dashboard/ExcelExport";
import { useParams } from "react-router";
import LocalHelper from "../../Helper/LocalHelper";
import { IoQrCodeSharp } from "react-icons/io5";
import html2canvas from "html2canvas";
import MyHelper from "../../Helper/MyHelper";
import font_khmer from "../../component/font_khmer.css";
import { FaEye } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import QRCode from "react-qr-code";
import "bootstrap/dist/css/bootstrap.css";
import Theme_Invitation_QR from "./Theme_Invitation_QR";

function Step_1_Generate_QRCode_Registration() {
  //=======================================
  // Declaration
  var localHelper = new LocalHelper();
  var myhelper = new MyHelper();
  var host = "https://us-central1-msa-server-db.cloudfunctions.net";
  //var host_name_Website = "https://msa-server-db.web.app";
  var host_name_Website = "https://msa-server-db.web.app";
  const params = useParams();
  var key_of_url_and_link = params.key_of_url_and_link;

  const [value_data_Of_URL_Registration, set_value_data_Of_URL_Registration] =
    useState({});
  const [valueTitle_Body_Type, set_valueTitle_Body_Type] = useState("");
  const [value_List_Of_Event, set_value_List_Of_Event] = useState([]);
  const [is_Loading, set_is_Loading] = useState(true);
  const [value_show_in_Qr, set_value_show_in_Qr] = useState("");
  const [
    value_show_in_Qr_Fronted,
    set_value_show_in_Qr_value_show_in_Qr_Fronted,
  ] = useState("");

  const [value_Type_Theme, set_Value_Type_Themes] = useState("");

  const [is_Loading_list_Of_Excel_Guest, set_is_Loading_list_Of_Excel_Guest] =
    useState(true);
  const [list_Of_Excel_Guest, set_list_Of_Excel_Guest] = useState([]);

  const [text_header_title, set_text_header_title] = useState("");
  const [text_title_on_qr, set_text_title_on_qr] = useState("");
  const [text_title_sub, set_text_title_sub] = useState("");
  const [text_footer_below_qr, set_text_footer_below_qr] = useState("");
  const [text_footer_subr, set_text_footer_sub] = useState("");
  const [text_url_name, set_text_url_name] = useState("");

  //=======================================
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
          host +
            "/" +
            "api/v1/url-and-link/event-detail/" +
            key_of_url_and_link,
          {
            headers: {
              Authorization: localHelper.Token(),
            },
          }
        )
        .then((res) => {
          if (res.data.status == false) {
            alert("Invalid Key URL and Link");
          } else {
            set_Value_Type_Themes(res.data.url_and_link.theme);
            set_value_data_Of_URL_Registration(res.data.url_and_link);
            set_value_List_Of_Event(res.data.event_full.list);
            qrCodeShow(res.data.url_and_link, res.data.event_full.list);
            Loading_Excel_Event_Upcoming_Guest(res.data.event_full.list);
            set_is_Loading(false);
          }
        });
    }
  }
  function Loading_Excel_Event_Upcoming_Guest(listEvent) {
    var listExcel = [];
    listEvent.map((row, ind) => {
      axios
        .get(host + "/api/v1/event/guest-registered/" + row.key, {
          headers: {
            Authorization: localHelper.Token(),
          },
        })
        .then((guest) => {
          if (guest.data.status == false) {
            set_is_Loading_list_Of_Excel_Guest(false);
          } else {
            var data = [];
            guest.data.list_guest.map((guestData) => {
              var item = {};
              guestData.form.map((guestForm, k) => {
                item[guestForm.title] = guestForm.value;
              });
              data.push(item);
            });
            var dataAdd = (
              <ExcelExport
                key={ind}
                fileName={row.name + " (" + guest.data.total + " Guests)"}
                data={data}
                title={row.name + " (" + guest.data.total + " Guests)"}
              />
            );

            listExcel.push(dataAdd);
            if (ind + 1 == listEvent.length) {
              set_list_Of_Excel_Guest(listExcel);
              set_is_Loading_list_Of_Excel_Guest(false);
            }
          }
        });
    });
  }

  //=======================================
  // Function
  function qrCodeShow(urlCreate, event) {
    // Make Sure Configuration this round
    var qr =
    host_name_Website +
      "/msa/guest/fill/register-form/" +
      myhelper.encrypt(urlCreate.key) +
      "/?key=" +
      myhelper.encrypt(urlCreate.key) +
      "&authorization=" +
      urlCreate.key +
      "msa";

    set_value_show_in_Qr_value_show_in_Qr_Fronted(
      host_name_Website +
        "/msa/guest/fill/register-form/" +
        myhelper.encrypt(urlCreate.key) +
        "/?key=" +
        myhelper.encrypt(urlCreate.key) +
        "&authorization=" +
        urlCreate.key +
        "msa"
    );

    set_value_show_in_Qr(qr);

    // Add Data TO Image
    var eventName = [];
    event.map((row, index) => {
      return eventName.push(
        <label style={{ width: "100%" }}> {row.name}</label>
      );
    });

    set_text_header_title(eventName);
    set_text_title_on_qr(urlCreate.pre_register_form.title_on_qr);
    set_text_title_sub(urlCreate.pre_register_form.title_sub);
    set_text_footer_below_qr(urlCreate.pre_register_form.footer_below_qr);
    set_text_footer_sub(urlCreate.pre_register_form.footer_sub);
    set_text_url_name(urlCreate.url_name);

    if (urlCreate.type) {
      if (urlCreate.type == "pr") {
        // Type Public Registration
        set_valueTitle_Body_Type(
          "PR : Public Registration is an QR Scan for walk in guest on event date. Guest only scan and fill form require and join the event."
        );
      } else {
        // Type URL QR Code
        set_valueTitle_Body_Type(
          "QR-Code : Guest will be registered by QR Scan or URL Link and get Unique QR Code to show on event day and need to approved scan from MSA Team."
        );
      }
    }
  }

  //************************************/
  //Event
  function action_eventDetail(row) {
    window.location.href = '/msa/admin/event/detail-all/' + row.key
   
  }
  function bodyRowEvent(row, i) {
    var isRequire = "";
    if (value_data_Of_URL_Registration.event) {
      for (let i of value_data_Of_URL_Registration.event) {
        if (i.key == row.key && i.is_required == true) {
          isRequire = " (Required Register)";
          break;
        }
      }
    }

    var p = myhelper.dateTime_GetPeroid(
      row.start_date.date,
      row.start_date.month,
      row.start_date.year
    );
    var dateevent = "";
    if (p == 0) {
      dateevent =
        " Today, " +
        row.start_date.hh +
        ":" +
        row.start_date.mm +
        localHelper.AM_PM(row.start_date.hh);
    } else if (p > 0) {
      dateevent =
        " Start In  " +
        p +
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
    } else {
      dateevent =
        p +
        " day ago (" +
        row.start_date.date +
        "/" +
        row.start_date.month +
        "/" +
        row.start_date.year +
        ")";

      dateevent = dateevent.substring(1);
      dateevent = " " + dateevent;
    }

    return (
      <div key={i}>
        <div
          style={{
            display: "flex",
            marginBottom: "50px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <MdEvent
              style={{
                width: "70px",
                height: "70px",
                marginRight: "10px",
                marginTop: "10px",
              }}
            />

            <div>
              <label
                style={{
                  color: "gray",
                  fontWeight: "normal",
                  marginTop: "5px",
                  fontWeight: "bolder",
                }}
              >
                {row.name}{" "}
                <label
                  style={{ color: "red", width: "auto", fontWeight: "normal" }}
                >
                  {isRequire}
                </label>
              </label>
              <br />
              <label>Event :{dateevent} </label>
              <br />
              <label htmlFor="" style={{ color: "darkblue" }}>
                Regerstered : {row.guest_register_count} Guests
              </label>
            </div>
          </div>

          <button
            onClick={() => action_eventDetail(row)}
            type="button"
            style={{
              height: "30px",
              width: "50px",
              marginTop: "25px",
              marginRight: "10px",
            }}
            className="btn btn-outline-primary"
          >
            <FaEye style={{ marginTop: "-10px" }} />
          </button>
        </div>
      </div>
    );
  }

  function CopyURL() {
    navigator.clipboard.writeText(value_show_in_Qr_Fronted);
    alert("URL Copied! : " + value_show_in_Qr_Fronted);
  }

  async function PrintDiv() {
    const element = document.getElementById("print"),
      canvas = await html2canvas(element),
      data = canvas.toDataURL("image/jpg"),
      link = document.createElement("a");

    link.href = data;
    var title = "";
    value_List_Of_Event.map((row, index) => {
      title +=
        index + 1 == value_List_Of_Event.length ? row.name : row.name + ", ";
    });

    link.download = "QRCode Registration - " + title + ".jpg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function mainBOdyLeft() {
    return (
      <div>
        <label style={{ color: "gray" }}>{text_url_name}</label>
        <hr />
        <div style={{ width: "100%", textAlign: "left" }}>
          {value_List_Of_Event.map((row, index) => {
            return <div key={index}>{bodyRowEvent(row, index)}</div>;
          })}
        </div>
      </div>
    );
  }

  function mainBodyRight() {
    return (
      <div>
        <div
          style={{
            
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "10px",
              width: "400px",
            }}
          >
            <div style={{}}>
              <Theme_Invitation_QR
                qrcode={value_show_in_Qr_Fronted}
                type={value_Type_Theme}
              />
            </div>
          </div>
        </div>

        <br />
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => CopyURL()}
            style={{ marginLeft: "5px", marginRight: "5px" }}
            type="button"
            className="btn btn-outline-primary"
          >
            Copy URL
          </button>

         <button
           onClick={() => window.open(value_show_in_Qr_Fronted, '_blank')}
           style={{ marginLeft: "10px" }}
           type="button"
           className="btn btn-outline-secondary"
         >
            View Form
         </button>
        </div>

        <br />
      </div>
    );
  }

  function mainBOdyLeftExport() {
    return (
      <div>
        <h5>Registered Guest</h5>
        {list_Of_Excel_Guest}
      </div>
    );
  }

  //=======================================
  // SubView
  function mainBOdyType() {
    return (
      <div
        style={{
          paddingLeft: "10px",
          paddingRight: "10px",
          paddingBottom: "10px",
          display: "flex",
        }}
      >
        <IoQrCodeSharp
          style={{ width: "40px", height: "40px", marginTop: "3px" }}
        />
        <div style={{ padding: "10px" }}>{valueTitle_Body_Type}</div>
      </div>
    );
  }

  return (
    <div>
      <div style={{fontFamily: 'Khmer', backgroundColor: "#dedede", height: "100vh" }}>
        <br />
        <br />
        <div style={{backgroundColor : "#dedede"}} className="container">
          <div style={{backgroundColor : "#dedede"}}  className="row">
            <div style={{backgroundColor : "#dedede"}}  className="col-6">
              {myhelper.Template_Defualt_Style(
                "Type Of URL/Link",
                mainBOdyType(),
                is_Loading,
                false
              )}
              <br />
              {myhelper.Template_Defualt_Style(
                "Event",
                mainBOdyLeft(),
                is_Loading,
                value_List_Of_Event.length > 0 ? false : true,
                "No event link!"
              )}
              <br />

              {myhelper.Template_Defualt_Style(
                "Export",
                mainBOdyLeftExport(),
                is_Loading_list_Of_Excel_Guest,
                value_List_Of_Event.length > 0 ? false : true,
                "No event link!"
              )}
            </div>

            <div className="col-6">
              {myhelper.Template_Defualt_Style(
                "URL Registration",
                mainBodyRight(),
                is_Loading,
                false
              )}
            </div>
          </div>
          <div style={{backgroundColor : "#dedede"}}  className="row">
            <div style={{backgroundColor : "#dedede"}}  className="col-12">
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step_1_Generate_QRCode_Registration;