import React, { useEffect, useState } from "react";
import LocalHelper from "../../Helper/LocalHelper";
import html2canvas from "html2canvas";
import axios from "axios";
import QRCode from "react-qr-code";
import MyHelper from "../../Helper/MyHelper";
import "bootstrap/dist/css/bootstrap.css";
import loading from "../../asset/qr-code-animation.gif";
import Theme_Ticket from "./Theme_Ticket";

function Step_3_Generate_QR_Ticket_For_Guest() {

  var url_string = window.location.href;
  var url = new URL(url_string);
  var key_of_guest = url.searchParams.get("key_guest");
  var key_of_url = url.searchParams.get("key_url");
  var host = "https://us-central1-msa-server-db.cloudfunctions.net";

  //=================================================
  // //Declaration
 
  var myhelper = new MyHelper();

  const [text_header_title, set_text_header_title] = useState("");
  const [text_title_on_qr, set_text_title_on_qr] = useState("");
  const [text_title_sub, set_text_title_sub] = useState("");
  const [text_footer_below_qr, set_text_footer_below_qr] = useState("");
  const [text_footer_subr, set_text_footer_sub] = useState("");
  const [text_url_name, set_text_url_name] = useState("");

  const [value_data_Of_URL_Registration, set_value_data_Of_URL_Registration] =
    useState({});
  const [value_List_Of_Event, set_value_List_Of_Event] = useState([]);
  const [is_Loading, set_is_Loading] = useState(true);
  const [value_show_in_Qr, set_value_show_in_Qr] = useState("");
  const [
    value_show_in_Qr_Fronted,
    set_value_show_in_Qr_value_show_in_Qr_Fronted,
  ] = useState("");

  const [value_Theme, set_value_Theme] = useState("");

  //=================================================
  //Funtion

  useEffect(() => {
    if (
      key_of_guest == null ||
      key_of_guest == "" ||
      key_of_guest == undefined
    ) {
      alert("Invalid Key Guest");
    } else {
      axios.get(host + "/api/v1/guest/public/" + key_of_guest).then((data) => {
        axios
          .get(host + "/api/v1/url-and-link/event-detail/" + key_of_url)
          .then((url) => {
            var data_URL = url.data.url_and_link;
            set_value_data_Of_URL_Registration(data_URL);
            set_text_title_on_qr("Ticket QR Code");

            set_value_Theme(data.data.url_and_link.theme)

            set_text_title_sub(data_URL.success_register_form.title_sub);
            set_text_footer_below_qr(
              data_URL.success_register_form.footer_below_qr
            );
            set_text_footer_sub(data_URL.success_register_form.footer_sub);
            set_text_url_name(data_URL.url_name);

            // Get List
            var listEvent = [];
            var event = [];
            if (data.data.url_and_link.event) {
              data.data.url_and_link.event.map((row, i) => {
                if (row.status == "pending") {
                  listEvent.push(row.event_full);
                  event.push(
                    <label style={{ width: "100%" }}>
                      {row.event_full.name}
                    </label>
                  );
                }
              });
            }

            set_text_header_title(event);
            set_value_List_Of_Event(listEvent);

            var qr =
              "https://msa-server-db.web.app/msa/guest/authorization/scan/registration/?key=" +
              myhelper.encrypt(key_of_guest) +
              "&authorization=" +
              myhelper.encrypt("msa") +
              "&type=" +
              myhelper.encrypt(data_URL.type) +
              "&urlkey=" +
              myhelper.encrypt(data_URL.key);
            set_value_show_in_Qr_value_show_in_Qr_Fronted(qr);
            set_is_Loading(false);
          });
      });
    }
  }, []);

  //=================================================
  //View
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

  return is_Loading == true ? (
    LoadingSpinner()
  ) : (
    <div style={{textAlign:'center', display:'flex', justifyContent:'space-evenly'}}>
      <Theme_Ticket type={value_Theme} qrcode={value_show_in_Qr_Fronted} />
    </div>
    // <div>
    //   <br />
    //   <div className="container">
    //     <div className="row">
    //       <div className="col-12" style={{ textAlign: "center" }}>
    //         <div
    //           style={{
    //             textAlign: "center",
    //             justifyContent: "center",
    //             display: "flex",
    //           }}
    //         >
    //           <div
    //             id="print"
    //             style={{
    //               textAlign: "center",
    //               padding: "10px",
    //               width: "400px",
    //             }}
    //           >
    //             <div
    //               style={{
    //                 borderStyle: "solid",
    //                 borderRadius: "12px",
    //                 borderWidth: "0.1px",
    //                 borderColor: "red",
    //                 boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.4)",
    //                 paddingTop: "20px",
    //               }}
    //             >
    //               <img
    //                 src={localHelper.Logo_MSA()}
    //                 style={{
    //                   width: "50%",
    //                   height: "50px",
    //                   objectFit: "contain",
    //                 }}
    //                 alt=""
    //               />
    //               <br />
    //               <br />
    //               {text_header_title}
    //               <br /> <br />
    //               <h5 style={{ marginBottom: "-1px" }}>{text_title_on_qr}</h5>
    //               <label style={{ color: "gray", fontSize: "12px" }}>
    //                 {text_title_sub}
    //               </label>
    //               <br />
    //               <br />
    //               <QRCode
    //                 size={256}
    //                 style={{ height: "auto", maxWidth: "100%", width: "60%" }}
    //                 value={value_show_in_Qr_Fronted}
    //                 viewBox={`0 0 256 256`}
    //               />
    //               <br /> <br />
    //               <h6 style={{ width: "100%", marginBottom: "-2px" }}>
    //                 {text_footer_below_qr}
    //               </h6>
    //               <label
    //                 style={{
    //                   color: "gray",
    //                   marginBottom: "20px",
    //                   width: "100%",
    //                   fontSize: "12px",
    //                 }}
    //               >
    //                 {text_footer_subr}
    //               </label>
    //               <label
    //                 style={{
    //                   color: "gray",
    //                   marginBottom: "20px",
    //                   width: "100%",
    //                   fontSize: "7px",
    //                 }}
    //               >
    //                 Powered by Cyber Tech System
    //               </label>
    //             </div>
    //           </div>
    //         </div>

    //         <br />
    //         <div>
    //           <button
    //             onClick={() => PrintDiv()}
    //             style={{ marginRight: "10px" }}
    //             type="button"
    //             className="btn btn-outline-success"
    //           >
    //             Save QR Ticket
    //           </button>
    //         </div>

    //         <br />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Step_3_Generate_QR_Ticket_For_Guest;