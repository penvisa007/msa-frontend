import axios from "axios";
import React, { useEffect, useState } from "react";
import CookieAndSession from "../../Helper/CookieAndSession";
import "bootstrap/dist/css/bootstrap.css";
import loading from "../../asset/insta-cam-camera.gif";
import imgInvalid from "../../asset/photo_2024-10-27_14-50-43.jpg";
import imgAuth from "../../asset/3696461.png";
import { useParams } from "react-router";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Html5Qrcode } from "html5-qrcode";
import Theme_Invalid_QR_Code_Scane from "../setting/Theme_Invalid_QR_Code_Scane";
import Theme_Authorization_Scan_CheckIn from "../setting/Theme_Authorization_Scan_CheckIn";
import LocalHelper from "../../Helper/LocalHelper";
import MyHelper from "../../Helper/MyHelper";
import loadDer from "../../asset/qr-code-animation.gif";
function AuthorizationPage() {
  //===============================
  //Declaration

  var myHelper = new MyHelper();
  var host = "https://us-central1-msa-server-db.cloudfunctions.net";
  var userParm = useParams();
  var key_of_camera_authorization = userParm.key_of_camera_authorization;
  var [is_authorizationPage, set_is_authorizationPage] = useState(false);
  var [is_Laoding, set_is_Laoding] = useState(true);

  //===============================
  //Loading
  useEffect(() => {
    LoadingData();
  }, []);

  const [name_Of_Authorization, set_name_Of_Authorization] = useState("");
  function LoadingData() {
    axios
      .get(host + "/api/v1/camera-authorization/" + key_of_camera_authorization)
      .then((res) => {
        if (res.data.message == "No Data!") {
          set_is_authorizationPage(false);
        } else {
          if (res.data.data) {
            set_name_Of_Authorization(res.data.data.name);
            set_is_authorizationPage(true);
          } else {
            set_is_authorizationPage(false);
          }
        }

        set_is_Laoding(false);
      });
  }

  function LoadingSpinner() {
    return (
      <div style={{ textAlign: "center" }}>
        <br />
        <img
          style={{ width: "100%", height: "100px", objectFit: "contain" }}
          src={loading}
          alt=""
        />
        <label htmlFor="" style={{ color: "gray" }}>
          Please wait a moment ...
        </label>
        <br />
        <label htmlFor="" style={{ color: "gray" }}>
          Authorizing Camera Mode For MSA Team!
        </label>
      </div>
    );
  }

  function unAuthorizationPage() {
    return (
      <div style={{ textAlign: "center" }}>
        <br />
        <br />
        <img
          style={{ width: "100%", height: "200px", objectFit: "contain" }}
          src={imgInvalid}
          alt=""
        />
        <label htmlFor="" style={{ color: "gray" }}>
          Invalid Request
        </label>
        <br />
        <label htmlFor="" style={{ color: "gray" }}>
          Failed to open camera mode!
        </label>
      </div>
    );
  }

  var scanner = null;
  useEffect(() => {
    if (is_Laoding == false) {
      if (document.getElementById("reader")) {
        scanner = new Html5QrcodeScanner("reader", {
          qrbox: {
            width: 250,
            height: 250,
          },
          fps: 5,
        });
        scanner.render(success, error);
      }
    }
  }, [is_Laoding]);

  const [is_scanResult, setScanResult] = useState("");
  function success(result) {
    scanner.clear();
    setScanResult(result);
    ResultCatchFromCamera(result);
  }
  function error(error) {
    console.log(error);
  }

  function authorizationPage() {
    return (
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <div>
          <br />
          <div id="reader" style={{ width: "100%", height: "250px" }}></div>
          <br />
          <br />
          <img
            style={{ width: "100%", height: "200px", objectFit: "contain" }}
            src={imgAuth}
            alt=""
          />
          <label htmlFor="" style={{ color: "gray", fontWeight: "bolder" }}>
            Approved use camera mode.
          </label>
          <br />
          <label htmlFor="" style={{ color: "gray" }}>
            Authorized name : {name_Of_Authorization}
          </label>
        </div>
      </div>
    );
  }

  const [
    is_Loading_Authorzied_Checking_Guest_Data,
    set_is_Loading_Authorzied_Checking_Guest_Data,
  ] = useState(false);

  const [is_Switch_From_Scan_To_CheckIn, set_is_Switch_From_Scan_To_CheckIn] =
    useState(false);

  const [dataWillSendToCheckIn, set_dataWillSendToCheckIn] = useState({});
  function ApprovedCheckKeyGuest(url) {
    var data_url = new URL(url);
    var key_of_guest = data_url.searchParams.get("key");
    key_of_guest = myHelper.decrypt(key_of_guest);

    if (key_of_guest == null) {
      // No Key Found
      set_is_InvalidQRCodeShow(true);
    } else {
      set_is_Loading_Authorzied_Checking_Guest_Data(true);
      axios.get(host + "/api/v1/guest/public/" + key_of_guest).then((res) => {
        if (res.data.event_originals) {
          // update list of page
          set_value_Type_Theme(res.data.url_and_link.theme);
          set_dataWillSendToCheckIn(res.data);
          set_is_Switch_From_Scan_To_CheckIn(true);
          set_is_Loading_Authorzied_Checking_Guest_Data(false);
        } else {
          //Invalid Key
          set_is_InvalidQRCodeShow(true);
        }
      });
    }
  }

  // Camera Mode if Scanning Completed
  const [is_InvalidQRCodeShow, set_is_InvalidQRCodeShow] = useState(false);
  const [value_Type_Theme, set_value_Type_Theme] = useState("");
  function ResultCatchFromCamera(result) {
    var subResult = result.substring(0, 30);
    if ("https://msa-server-db.web.app/" == subResult) {
      ApprovedCheckKeyGuest(result);
    } else {
      console.log("Invalid QR Code");
      set_is_InvalidQRCodeShow(true);
    }
  }

  function PageInvalidQRCode() {
    return (
      <div
        style={{
          textAlign: "center",
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Theme_Invalid_QR_Code_Scane
          switchTOCanMode={() => {
            set_is_InvalidQRCodeShow(false);
            set_is_Laoding(false);
            set_is_Switch_From_Scan_To_CheckIn(false);

            setTimeout(() => {
              if (document.getElementById("reader")) {
                scanner = new Html5QrcodeScanner("reader", {
                  qrbox: {
                    width: 250,
                    height: 250,
                  },
                  fps: 5,
                });
                scanner.render(success, error);
              }
            }, 500);
          }}
          link={is_scanResult}
        />
      </div>
    );
  }

  /// Check Condtion Here
  function CheckPageSwitch() {
    if (is_InvalidQRCodeShow == true) {
      return PageInvalidQRCode();
    } else {
      if (is_Loading_Authorzied_Checking_Guest_Data == true) {
        return LoadingSpinner();
      } else {
        return is_Switch_From_Scan_To_CheckIn == true ? (
          <div style={{ textAlign: "center" }}>
            <Theme_Authorization_Scan_CheckIn
            event_from_themes={() => event_FromTheme_BackTOScanner()}
              type={value_Type_Theme}
              data={dataWillSendToCheckIn}
            />
          </div>
        ) : (
          authorizationPage()
        );
      }
    }
  }

  function LoadingSpinner() {
    return (
      <div>
        <div style={{ width: "100%", textAlign: "center" }}>
          <center>
            <img
              src={loadDer}
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


  function event_FromTheme_BackTOScanner(){
    set_is_InvalidQRCodeShow(false);
    set_is_Laoding(false);
    set_is_Switch_From_Scan_To_CheckIn(false);

    setTimeout(() => {
      if (document.getElementById("reader")) {
        scanner = new Html5QrcodeScanner("reader", {
          qrbox: {
            width: 250,
            height: 250,
          },
          fps: 5,
        });
        scanner.render(success, error);
      }
    }, 500);
  }

  return (
    <div>
      {is_Laoding == true
        ? LoadingSpinner()
        : is_authorizationPage == true
        ? CheckPageSwitch()
        : unAuthorizationPage()}
    </div>
  );
}

export default AuthorizationPage;