import React, { Component, useEffect, useState } from "react";
import MyHelper from "../../Helper/MyHelper";
import { MdEvent } from "react-icons/md";
import axios from "axios";
import API from "../../Helper/API";
import DesignColumnActionButton from "../../component/DesignColumnActionButton";
import Swal_Helper from "../../Helper/Swal_Helper";
import Swal from "sweetalert2";
import Loading from "../../component/Loading";
import Loading_No_Data from "../../component/Loading_No_Data";
import { FaUser } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import Simple_Input from "../../component/Simple_Input";
import { FaPen } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { MdOutlineSaveAlt } from "react-icons/md";
import Input_Helper from "../../Helper/Input_Helper ";
import { CiExport } from "react-icons/ci";

function Event_Coming_Detail(props) {
  var myHelper = new MyHelper();
  var api = new API();
  var swal_Helper = new Swal_Helper();
  var input_helper = new Input_Helper();

  var url_string = window.location.href;
  var url = new URL(url_string);
  var data = JSON.parse(url.searchParams.get("data"));
  var token = props.login.data_server.token;

  const [list_of_qr_code, setList_of_qr_code] = useState([]);
  const [isLoading_QR, setLoading_QR] = useState(true);
  const [is_Loading_Guests , setIsLoading_Guests] = useState(true);
  const [isNull_QrList, setIsNull_QrList] = useState(false);
  const [list_of_guests, setList_of_guests] = useState([]);
  const [is_Null_Guest , set_is_null_guest] = useState(false);
  const [is_Update, setIsUpdate] = useState(false);
  const [isLoading_Info, setLoading_Info] = useState(false);
  const [countdownString, setCountdownString] = useState('');
  const [value_inp_name , setValue_inp_name] = useState(data.name);


  useEffect(() => {
   // loading_qr_code();
     loading_Guest();
  }, []);

  function loading_Guest() {

    axios
      .get(api.URL_Event_Guest() + `/${data.key}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
       
        if (!response.data.guest_link) {
            set_is_null_guest(true);
        } else {
          setList_of_guests(response.data.guest_link);
          set_is_null_guest(false);
        }
        setIsLoading_Guests(false);
      });
  }

  function loading_qr_code() {
    axios
      .get(api.URL_Event_Link_QR() + `/${data.key}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (!response.data.status) {
          setIsNull_QrList(true);
        } else {
          setList_of_qr_code(response.data.url_link_list);
          setIsNull_QrList(false);
        }
        setLoading_QR(false);
      });
  }

  function design_row_qr(row, index) {
    return (
      <div
        style={{
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
        }}
        className="div"
      >
        <div className="div">
          <p>
            {index + 1}. {row.url_name}{" "}
          </p>
        </div>

        <br />
        <div className="div">
          <DesignColumnActionButton
            is_delete={true}
            is_view={false}
            is_edit={true}
            event_delete={(e) => handleDelete(e, row)}
            event_edit={(e) => handleEdit(e, row)}
          />
        </div>
      </div>
    );
  }

  function handleDelete(e, row) {
    Swal.fire({
      title: "Delete Event Coming",
      text: "Are you sure you want to delete this event ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(data.key + " -" + row.key)
        setLoading_QR(true);
        axios
          .put(
            api.URL_Event_Link_QR() + "/" + data.key + "/" + row.key,
            {},
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((response) => {
            swal_Helper.Swal_Custom_Toast_Success(
              "Event has been Deleted Successfully!"
            );
            setTimeout(() => {
              loading_qr_code();
            }, 2000);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  function handleEdit(e, row) {}

  function Component_list_qr() {
    return list_of_qr_code.map((row, index) => {
      return design_row_qr(row, index);
    });
  }

  function Component_List_Guests() {
    return list_of_guests.map((row, index) => {
      if (index < 10) {
        return design_row_guests(row, index);
      }
    });
  }

  function design_row_guests(row, index) {
    var form = "";

    row.form.map((row2, index) => {
      if (index < 2) {
        form += index == 1 ? row2.value : row2.value + ", ";
      }
    });

    return (
      <div
        style={{
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
        }}
        className="div"
      >
        <div
          style={{
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
          className="div"
        >
          <div style={{ width: "70%" }}>
            <div
              style={{
                justifyContent: "space-between",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
              className="div"
            >
              <div style={{ width: "10%" }} className="div">
                <label>{index + 1}. </label>
              </div>
              <div style={{ width: "90%" }} className="div">
                <p style={{ marginTop: "12px" }}>
                  {" "}
                  <FaUser style={{ width: "10px" }} /> {form}
                </p>
              </div>
            </div>
          </div>

          <div>
            <FaRegEye style={{ color: "darkblue" }} />
          </div>
        </div>

        <br />
      </div>
    );
  }

  function event_update() {

    const inp_start_date = input_helper.Input_Custom("inp_start_date", true);
    const inp_end_date = input_helper.Input_Custom("inp_end_date", true);
    const inp_note = input_helper.Input_Custom("inp_note", true);
    var inp_info_url = input_helper.Input_Custom("inp_info_url", true);
    const inp_name = input_helper.Input_Custom("inp_name", true);

    inp_info_url = inp_info_url == "" ? "NA" : inp_info_url
    
    if(inp_name != false || inp_note != false || inp_start_date != false || inp_end_date != false){

        
        var for_start_date = new Date(inp_start_date);
        var for_end_date = new Date(inp_end_date);

        if(for_start_date >= for_end_date){
            swal_Helper.Swal_Custom_Toast_Failed("Please choose valid start date-time / end date-time..!");
           
        }else{

            setLoading_Info(true)

            var dic = {
                "name": inp_name,
                "note": inp_note,
                "start_date": {
                    "date": for_start_date.getDate().toString(),
                    "month": (for_start_date.getMonth() + 1).toString(),
                    "year": for_start_date.getFullYear().toString(),
                    "hh": for_start_date.getHours().toString(),
                    "mm": for_start_date.getMinutes().toString(),
                },
                "end_date": {
                    "date": for_end_date.getDate().toString(),
                    "month": (for_end_date.getMonth() + 1).toString(),
                    "year": for_end_date.getFullYear().toString(),
                    "hh": for_end_date.getHours().toString(),
                    "mm": for_end_date.getMinutes().toString(),
                },
                "info_url": inp_info_url,
          
            }

           

            axios.put(api.URL_Event() + "/" + data.key, dic , {
                headers: {
                    Authorization: token
                }   
            }).then((response) => {
                swal_Helper.Swal_Custom_Toast_Success("Event " + inp_name + " Updated Successfully!");
                setTimeout(() => {
                    setValue_inp_name(inp_name)
                    document.getElementById('title_name').innerHTML = inp_name
                   setLoading_Info(false)
                },2000)

            })
        

     

        }

    }
  }

  function body_detail(){

        return (
            <div className="div">

            <div
              style={{
                justifyContent: "space-between",
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                height: "auto",
              }}
              className="div"
            >
              <div style={{ width: "35%" }} className="div-left">
                <p
                  style={{ color: "black", marginLeft: "0", height: "45px" }}
                >
                  Event Name :{" "}
                </p>
                <p
                  style={{ color: "black", marginLeft: "0", height: "45px" }}
                >
                  Event Start-Date :{" "}
                </p>
                <p
                  style={{ color: "black", marginLeft: "0", height: "45px" }}
                >
                  Event End-Date :{" "}
                </p>
                <p
                  style={{ color: "black", marginLeft: "0", height: "45px" }}
                >
                  Event URL :
                </p>
                <p
                  style={{ color: "black", marginLeft: "0", height: "45px" }}
                >
                  Event Description :
                </p>
              </div>

              <div style={{ width: "65%" }} className="div-right">
                <Simple_Input
                  id={"inp_name"}
                  readonly={is_Update == false ? true : null}
                  type={"text"}
                  value={value_inp_name}
                />
                <Simple_Input
                  id={"inp_start_date"}
                  readonly={is_Update == false ? true : null}
                  type={"datetime-local"}
                  marginTop={"-20px"}
                  value={`${data.start_date.year}-${String(data.start_date.month).padStart(2, '0')}-${String(data.start_date.date).padStart(2, '0')}T${String(data.start_date.hh).padStart(2, '0')}:${String(data.start_date.mm).padStart(2, '0')}:00`}
                />
                <Simple_Input
                  id={"inp_end_date"}
                  readonly={is_Update == false ? true : null}
                  marginTop={"-20px"}
                  type={"datetime-local"}
                  value={`${data.end_date.year}-${String(data.end_date.month).padStart(2, '0')}-${String(data.end_date.date).padStart(2, '0')}T${String(data.end_date.hh).padStart(2, '0')}:${String(data.end_date.mm).padStart(2, '0')}:00`}

                />
                <Simple_Input
                  id={"inp_info_url"}
                  readonly={is_Update == false ? true : null}
                  marginTop={"-20px"}
                  type={"text"}
                  value={data.info_url}
                />
                <Simple_Input
                  id={"inp_note"}
                  readonly={is_Update == false ? true : null}
                  marginTop={"-20px"}
                  type={"text"}
                  value={data.note}
                  margin={"0px"}
                />
              </div>
            </div>
            {/* <div
              style={{
                height: "40px",
                justifyContent: "right",
                marginTop: "-20px",
                display: "flex",
                alignItems: "right",
                width: "100%",
              }}
              className="div"
            >
              {is_Update == false ? (
                <Button
                  style={{ margin: "5px" }}
                  variant="primary"
                  onClick={() => setIsUpdate(true)}
                  size="sm"
                >
                  <FaPen /> Edit
                </Button>
              ) : (
                <Button
                  style={{ margin: "5px" }}
                  variant="success"
                  onClick={() => event_update()}
                  size="sm"
                >
                  {" "}
                  <MdOutlineSaveAlt /> Save
                </Button>
              )}
            </div> */}

           
          </div>
        )
  }

  function body_Link_QR(){

    return (
        <div className="div">
            { Component_list_qr()}
            </div>
    )
  }

  function body_Guest(){
    return (
        <div
        className="div"
      >
    
        {Component_List_Guests()}
    
        <div
          style={{
            width: "100%",
            height: "45px",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
          className="div"
        >
          <Button style={{ margin: "0px" }} variant="primary" size="sm">
            {" "}
            View More...
          </Button>
        </div>
      </div>
    )

  }

  function body_UpComing(){
    const date = new Date(data.start_date.year, data.start_date.month - 1, data.start_date.date);
    const countdownString = myHelper.countdown(date);
    
    return (
      <div className="div">
        <p>Create Date-Time :</p>
        <p>Countdown : {countdownString}</p>
        <p>Current Registration : <a href=""> {data.guest_register_count} guest{data.guest_register_count > 1 ? 's' : ''}</a></p>
      </div>
    );
  }

  function body_Export(){
    return (
        
        <div
          style={{
            width: "100%",
            height: "45px",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
          className="div"
        >
          <Button style={{ margin: "0px" }} variant="secondary" size="sm">
            {" "}
            <CiExport style={{marginRight: "5px"}} />Export Data
          </Button>
        </div>
    )
  }






  return (

    <div
      style={{ height: "100vh" , backgroundColor: "#dedede" }}
      class="container">

        <div  style={{width: "100%" }} className="row justify-content">
            <div className="col-12">
            <h4 id="title_name" style={{ color: "black" , marginTop: "10px" }}>
                {" "}
                <MdEvent /> {data.name}
            </h4>
            </div>

        </div>
        
      <div style={{ backgroundColor: "#dedede" , height: "80vh", overflowY: "auto" , padding: "10px",scrollbarWidth: "none", // Add this line
    msOverflowStyle: "none"  }}
        class="row justify-content-between" >
        <div class="col-md-6">
          <div
            style={{ paddingBottom: "100px"  }}
          >
            <br />

            {/* Block Up Coming */}

            {myHelper.Template_Defualt_Style("Up Coming", body_UpComing(), false, false, "")}
           
            <br />

            {/* Block Information Detail */}
             { myHelper.Template_Defualt_Style("Information", body_detail(), isLoading_Info, false, "No Data Found..!")}
           

            <br />

            {/* Block Link QR Code */}
            { myHelper.Template_Defualt_Style("Link with QR Code", body_Link_QR(),isLoading_QR, isNull_QrList, "No Data Found..!")}

       
          </div>
        </div>
        <div class="col-md-6">
          <div
            style={{ paddingBottom: "100px" , marginTop: "22px" }}
          >

            {/* Block List Guest */}
            { myHelper.Template_Defualt_Style("Registration Guests", body_Guest(), is_Loading_Guests, is_Null_Guest, "No Data Found..!")}

            <br />

            {/* Block Export data to excel */}

            {myHelper.Template_Defualt_Style("Export Data", body_Export(), false, false, "")}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Event_Coming_Detail;
