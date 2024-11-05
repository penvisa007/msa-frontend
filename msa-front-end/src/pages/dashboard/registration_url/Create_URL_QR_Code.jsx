import React, { useState } from "react";

import { BiQrScan } from "react-icons/bi";
import MyHelper from "../../Helper/MyHelper";
import Simple_Input from "../../component/Simple_Input";
import { Button } from "react-bootstrap";
import { CiExport } from "react-icons/ci";
import Input_Helper from "../../Helper/Input_Helper ";
import axios from "axios";
import API from "../../Helper/API";
import Swal_Helper from "../../Helper/Swal_Helper";
import Loading from "../../component/Loading";


function Create_URL_QR_Code(props) {
  const [isLoading, setLoading] = useState(false);
  var api = new API();
  var myHelper = new MyHelper();
  var swal_helper = new Swal_Helper();
  var input_helper = new Input_Helper();
  const [inputs, setInputs] = useState([{ id: 1, title: "" }]);

  const handleAddInput = () => {
    setInputs([...inputs, { id: inputs.length + 1, title: "" }]);
  };

  function body_info_url() {
    return (
      <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
        <div className="row justify-content-center">
          <div className="col-12">
            <Simple_Input
              id="info_name_url"
              title="Name URL: "
              error_text="Please Enter Name"
              required={true}
            />
          </div>
        </div>

        <div
          style={{ marginTop: "10px" }}
          className="row justify-content-center"
        >
          <div className="col-12">
            <label htmlFor="">Active: </label>

            <div style={{ width: "100%", marginTop: "10px" }} className="div">
              <input
                checked
                id="active_radio_yes"
                type="radio"
                value={"radio_yes_active"}
                for="radio_yes_active"
                name="inlineRadioOptions10"
              />
              <label style={{ marginLeft: "10px" }} htmlFor="">
                Yes
              </label>
              <input
                id="active_radio_no"
                style={{ marginLeft: "10px" }}
                type="radio"
                value={"radio_no_active"}
                for="radio_no_active"
                name="inlineRadioOptions10"
              />
              <label style={{ marginLeft: "10px" }} htmlFor="">
                No
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function body_deletion_url(inputs, handleAddInput) {
    return (
      <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
        <div className="row justify-content-center">
          <div className="col-12">
            <label htmlFor="">Auto Deletion: </label>

            <div style={{ width: "100%", marginTop: "10px" }} className="div">
              <input
                id="deletion_radio_yes"
                type="radio"
                value={"radio_yes"}
                for="radio_yes"
                name="inlineRadioOptions"
              />
              <label style={{ marginLeft: "10px" }} htmlFor="">
                Yes
              </label>
              <input
                id="deletion_radio_no"
                checked
                style={{ marginLeft: "10px" }}
                type="radio"
                value={"radio_no"}
                for="radio_no"
                name="inlineRadioOptions"
              />
              <label style={{ marginLeft: "10px" }} htmlFor="">
                No
              </label>
            </div>
          </div>
        </div>
        <div
          style={{ marginTop: "10px" }}
          className="row justify-content-center"
        >
          <div className="col-12">
            <Simple_Input
              id="delecion_date_time"
              title="Date-Time: "
              type="datetime-local"
              required={true}
            />
          </div>
        </div>
      </div>
    );
  }

  function body_pre_registration() {
    return (
      <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
        <div
          style={{ marginTop: "10px" }}
          className="row justify-content-center"
        >
          <div className="col-12">
            <Simple_Input
              id="inp_title-pre-registration"
              title="Title: "
              type="text"
              required={true}
            />
            <Simple_Input
              id="inp_sub_title-pre-registration"
              title="Sub Title: "
              type="text"
              required={true}
            />
            <Simple_Input
              id="inp_text_below-pre-registration"
              title="Text Below: "
              type="text"
              required={true}
            />
            <Simple_Input
              id="inp_sub_text_below-pre-registration"
              title="Sub Text Below: "
              type="text"
              required={true}
            />
          </div>
        </div>
      </div>
    );
  }

  function body_success_registration() {
    return (
      <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
        <div
          style={{ marginTop: "10px" }}
          className="row justify-content-center"
        >
          <div className="col-12">
            <Simple_Input
              id="inp_title-success-registration"
              title="Title: "
              type="text"
              required={true}
            />
            <Simple_Input
              id="inp_sub_title-success-registration"
              title="Sub Title: "
              type="text"
              required={true}
            />
            <Simple_Input
              id="inp_text_below-success-registration"
              title="Text Below: "
              type="text"
              required={true}
            />
            <Simple_Input
              id="inp_sub_text_below-success-registration"
              title="Sub Text Below: "
              type="text"
              required={true}
            />
          </div>
        </div>
      </div>
    );
  }

  function body_on_registration() {
    return (
      <div style={{ paddingLeft: "25px", paddingRight: "25px", paddingBottom: "160px" }}>
        <div
          style={{ marginTop: "10px" }}
          className="row justify-content-center"
        >
          <div className="col-12">
            <Simple_Input
              id="inp_contact_us-on-registration"
              title="Contect Us: "
              type="text"
              required={true}
            />
            <Simple_Input
              id="inp_footer_note-on-registration"
              title="Footer Note: "
              type="text"
              required={true}
            />
          </div>
        </div>
      </div>
    );
  }

  function body_form_registration() {
    return (
      <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
        {inputs.map((input, index) => (
          <div key={input.id} className="row justify-content-center">
            <div className="col-12">
              <label htmlFor="">#{index + 1}</label>
            </div>

            <div className="col-md-6">
              <Simple_Input
                id={`input_title_${input.id}`}
                title="Title: "
                error_text="Please Enter Name"
                required={true}
              />
            </div>

            <div className="col-md-6">
              <Simple_Input
                id={`input_error_text_${input.id}`}
                title="Error Text: "
                error_text="Please Enter Name"
                required={true}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="">Required: </label>
              <div style={{ width: "100%", marginTop: "10px" }} className="div">
                <input
                  checked
                  id={`input_radio_required_yes${input.id}`}
                  type="radio"
                  value={"radio_yes"}
                  name={`required_${input.id}`}
                />
                <label style={{ marginLeft: "10px" }} htmlFor="">
                  Yes
                </label>
                <input
                  id={`input_radio_required_no${input.id}`}
                  style={{ marginLeft: "10px" }}
                  type="radio"
                  value={"radio_no"}
                  name={`required_${input.id}`}
                />
                <label style={{ marginLeft: "10px" }} htmlFor="">
                  No
                </label>
              </div>
            </div>

            <div
              style={{ justifyContent: "space-between", display: "flex" }}
              className="col-md-6"
            >
              <label style={{ width: "20%", marginTop: "8px" }} htmlFor="">
                Text type:{" "}
              </label>
              <div style={{ width: "35%", marginTop: "10px" }} className="div">
                <input
                  checked
                  id={`inp_radio_input${input.id}`}
                  type="radio"
                  name={`text_type_${input.id}`}
                />
                <label style={{ marginLeft: "10px" }} htmlFor="">
                  Input
                </label>

                <input
                  id={`inp_radio_select${input.id}`}
                  style={{ marginLeft: "10px" }}
                  type="radio"
                  name={`text_type_${input.id}`}
                />
                <label style={{ marginLeft: "10px" }} htmlFor="">
                  Select
                </label>
              </div>
              <div style={{ width: "40%" }} className="div">
                <Simple_Input
                  id={`inp_text_type_input_value_Select_${input.id}`}
                  placeholder={"Example: Male , Female , Other"}
                  error_text="Please Enter Select Input"
                  required={true}
                />
              </div>
            </div>

            {index < inputs.length - 1 && <hr style={{ marginTop: "20px" }} />}
          </div>
        ))}
        <div className="row">
          <Button
            style={{ marginTop: "20px" }}
            variant="primary"
            onClick={handleAddInput}
          >
            Add More
          </Button>
        </div>
        <br />
      </div>
    );
  }

  function body_url_pr() {
    return (
      <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
        <div
          style={{ marginTop: "10px" }}
          className="row justify-content-center"
        >
          <div className="col-12">
            <label htmlFor="">Select Type URL/QR-Code or PR : </label>

            <div
              style={{ width: "100%", marginTop: "10px", marginLeft: "5px" }}
              className="div"
            >
              <input
                checked
                id="type_radio_url"
                type="radio"
                value={"radio_yes_active"}
                for="radio_yes_active"
                name="inlineRadioOptions1"
              />
              <label style={{ marginLeft: "10px" }} htmlFor="">
                URL / QR-Code
              </label>
              <input
                id="type_radio_pr"
                style={{ marginLeft: "10px" }}
                type="radio"
                value={"radio_no_active"}
                for="radio_no_active"
                name="inlineRadioOptions1"
              />
              <label style={{ marginLeft: "10px" }} htmlFor="">
                PR
              </label>
            </div>

            <hr />

            <div style={{ marginLeft: "15px" }} className="div">
              <label
                style={{ color: "darkred", fontWeight: "bold" }}
                htmlFor=""
              >
                Noted:
              </label>
              <label style={{ marginLeft: "15px", color: "gray" }} htmlFor="">
                - URL/QR : Guest will be registered by QR Scan or URL Link and
                get Unique QR Code to show on event day and need to approved
                scan from MSA Team.
              </label>
              <label style={{ marginLeft: "15px", color: "gray" }} htmlFor="">
                - PR : Public Registration is an QR Scan for walk in guest on
                event date. Guest only scan and fill form require and join the
                event.
              </label>
            </div>

            <br />
          </div>
        </div>
      </div>
    );
  }

  function event_save() {
    //On Register
    var inp_contact_us = input_helper.Input_Custom(
      "inp_contact_us-on-registration",
      true
    );
    var inp_footer_note = input_helper.Input_Custom(
      "inp_footer_note-on-registration",
      true
    );

    //Pre Regsitration
    var inp_sub_text_bellow_pre = input_helper.Input_Custom(
      "inp_sub_text_below-pre-registration",
      true
    );
    var inp_sub_title_pre = input_helper.Input_Custom(
      "inp_sub_title-pre-registration",
      true
    );
    var inp_text_below_pre = input_helper.Input_Custom(
      "inp_text_below-pre-registration",
      true
    );
    var inp_title_pre = input_helper.Input_Custom(
      "inp_title-pre-registration",
      true
    );
    //Success Registration
    var inp_sub_text_bellow_success = input_helper.Input_Custom(
      "inp_sub_text_below-success-registration",
      true
    );
    var inp_sub_title_success = input_helper.Input_Custom(
      "inp_sub_title-success-registration",
      true
    );
    var inp_text_below_success = input_helper.Input_Custom(
      "inp_text_below-success-registration",
      true
    );
    var inp_title_success = input_helper.Input_Custom(
      "inp_title-success-registration",
      true
    );
    //Delection
    var delection_radio_yes = input_helper.Input_Custom(
      "deletion_radio_yes",
      true
    );
    var delection_radio_no = input_helper.Input_Custom(
      "deletion_radio_no",
      true
    );
    var delecion_date_time = input_helper.Input_Custom(
      "delecion_date_time",
      false
    );

    //Information
    var info_name_url = input_helper.Input_Custom("info_name_url", true);
    var info_url_active_yes = document.getElementById("active_radio_yes");
    var info_url_active_no = input_helper.Input_Custom("active_radio_no", true);
    //Choose Type
    var type_radio_url = document.getElementById("type_radio_url");
    var type_radio_pr = document.getElementById("type_radio_pr");

    var deletion_date = new Date(delecion_date_time);
    var check_delection_date = "NA";
    var check_delection_month = "NA";
    var check_delection_year = "NA";
    var check_delection_hh = "NA";
    var check_delection_mm = "NA";
    //Check Permission ===>>>>>
    var check_delection = false;

    var list_form_register = [];
    var list_data_get_from_select = [];
    var arrayList_split_select_Input = [];
    arrayList_split_select_Input.length = 0; 
    var inp_text_type_value = ''
    var inp_text_type_array = ''
    inputs.forEach((input) => {
      // Form_Register
      var inp_title_form_register = input_helper.Input_Custom(
        `input_title_${input.id}`,
        true
      );
      var inp_error_text = input_helper.Input_Custom(
        `input_error_text_${input.id}`,
        true
      );

      var inp_text_type = document.getElementById(
        `inp_text_type_input_value_Select_${input.id}`
      );

      var inp_radio_required_yes = document.getElementById(
        `input_radio_required_yes${input.id}`
      );
      var inp_radio_required_no = document.getElementById(
        `input_radio_required_no${input.id}`
      );
      var inp_radio_input = document.getElementById(
        `inp_radio_input${input.id}`
      );
      var inp_radio_select = document.getElementById(
        `inp_radio_select${input.id}`
      );

      if (delection_radio_yes.checked) {
        check_delection = true;
      } else {
        check_delection = false;
      }
      var is_input_type = inp_radio_input.checked ? "input" : "select";
 
      var is_required = inp_radio_required_yes.checked ? true : false;
   
    

      if (inp_radio_select.checked) {

        inp_text_type_value = inp_text_type.value.trim();
        inp_text_type_array = inp_text_type_value.split(" ");
      
 
       arrayList_split_select_Input =
       arrayList_split_select_Input.concat(inp_text_type_array);
 

 
       
        
      arrayList_split_select_Input.map((item) => {
        list_data_get_from_select.push({
          value: item,
          label: item,
        });
      });
        list_form_register.push({
          error_text: inp_error_text,
          input_type: is_input_type,
          is_required: is_required,
          title: inp_title_form_register,
          data: list_data_get_from_select,
        });
      } else {
        list_form_register.push({
          error_text: inp_error_text,
          input_type: is_input_type,
          is_required: is_required,
          title: inp_title_form_register,
        });
      }
    });

    if (check_delection == true) {
      check_delection = true;
      check_delection_date = deletion_date.getDate().toString();
      check_delection_month = (deletion_date.getMonth() + 1).toString();
      check_delection_year = deletion_date.getFullYear().toString();
      check_delection_hh = deletion_date.getHours().toString();
      check_delection_mm = deletion_date.getMinutes().toString();
    } else {
    }

    var is_Active = info_url_active_yes.checked ? true : false;

    var is_url_QR_Or_PR = type_radio_url.checked ? "qrcode" : "pr";

    //Prepare Data

    var date_prepare = {
      header_icon_path: "N/A",
      url_name: info_name_url,
      type: is_url_QR_Or_PR, // qrcode/url or pr
      create_by_user: "-O93udIg8diYz2Yg0uBg",
      form: list_form_register,
      deletion: {
        is_auto_delete: check_delection,
        delete_date: {
          date: check_delection_date,
          month: check_delection_month,
          year: check_delection_year,
          hh: check_delection_hh,
          mm: check_delection_mm,
        },
      },

      is_active: is_Active,

      pre_register_form: {
        title_on_qr: inp_title_pre,
        title_sub: inp_sub_title_pre,
        footer_below_qr: inp_text_below_pre,
        footer_sub: inp_sub_text_bellow_pre,
      },

      success_register_form: {
        title_on_qr: inp_title_success,
        title_sub: inp_sub_title_success,
        footer_below_qr: inp_text_below_success,
        footer_sub: inp_sub_text_bellow_success,
      },

      on_register_form: {
        footer_note: inp_footer_note,
        contact_us: inp_contact_us,
        translation: {
          footer_note: "ចំណងជើងធំ",
          contact_us: "010 / 089 288 105",
        },
      },
    };
    setLoading(true);
    var token = props.login.data_server.token;

    axios
      .post(api.URL_Registration_url(), date_prepare, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        swal_helper.Swal_Custom_Toast_Success("URL " + info_name_url + " Created Successfully!");
          setTimeout(() => {
            setLoading(false);
            //window.location.href = `/event-coming/details/?data=` + encodeURIComponent(JSON.stringify(response.data.data));
          },2000)
                    
      });
  }

  return (
    <div
      style={{ height: "100vh", backgroundColor: "#dedede" }}
      class="container"
    >
      <div className="row justify-content-center">
        <div className="col-12">
          <h4
            id="title_name"
            style={{ color: "black", marginTop: "20px", marginLeft: "20px" }}
          >
            {" "}
            <BiQrScan /> Create URL QR Code
          </h4>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#dedede",
          height: "80vh",
          overflowY: "auto",
          padding: "10px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        class="row justify-content-between"
      >
        <div className="col-md-6">
          {myHelper.Template_Defualt_Style(
            "Information",
            body_info_url(),
            isLoading,
            false,
            "No Data Found..!"
          )}
        </div>

        <div className="col-md-6">
          {myHelper.Template_Defualt_Style(
            "Deletion",
            body_deletion_url(),
            isLoading,
            false,
            "No Data Found..!"
          )}
        </div>

        <div style={{ marginTop: "20px" }} className="col-md-12">
          {myHelper.Template_Defualt_Style(
            "Choose Type",
            body_url_pr(),
            isLoading,
            false,
            "No Data Found..!"
          )}
        </div>

        <div style={{ marginTop: "20px" }} className="col-md-12">
          {myHelper.Template_Defualt_Style(
            "Form Registration",
            body_form_registration(inputs, handleAddInput),
            isLoading,
            false,
            "No Data Found..!"
          )}
        </div>
        <br />
        <div
          style={{ marginTop: "20px", paddingBottom: "100px" }}
          className="col-md-4"
        >
          {myHelper.Template_Defualt_Style(
            "QR - Pre Registration",
            body_pre_registration(),
            isLoading,
            false,
            "No Data Found..!"
          )}
        </div>
        <div style={{ marginTop: "20px" }} className="col-md-4">
          {myHelper.Template_Defualt_Style(
            "QR - On Registration",
            body_on_registration(),
            isLoading,
            false,
            "No Data Found..!"
          )}
        </div>
        <div style={{ marginTop: "20px" }} className="col-md-4">
          {myHelper.Template_Defualt_Style(
            "QR - Success Registration",
            body_success_registration(),
            isLoading,
            false,
            "No Data Found..!"
          )}
        </div>

        <div
          style={{ marginBottom: "100px", marginTop: "-50px" }}
          className="col-md-12"
        >
          <div style={{ width: "100%", textAlign: "right" }} className="div">
            <Button
              style={{ margin: "0px", height: "45px" }}
              variant="secondary"
              size="sm"
              onClick={() => event_save()}
            >
              {" "}
              <CiExport style={{ marginRight: "5px" }} />
              Save Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create_URL_QR_Code;
