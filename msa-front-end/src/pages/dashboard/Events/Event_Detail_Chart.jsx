import React, { useEffect, useState } from "react";
import LocalHelper from "../../Helper/LocalHelper";
import axios from "axios";
import { IoIosMore } from "react-icons/io";
import { AiOutlineFrown } from "react-icons/ai";
import { Chart } from "react-google-charts";

function Event_Detail_Chart() {
  //=============================
  // Declaration
  var localHelper = new LocalHelper();
  var host_name_Server = localHelper.Hostname_Server();
  var url_string = window.location.href;
  var url = new URL(url_string);
  var keyOfEvent = url.searchParams.get("key");
  var [data_Event, set_data_Event] = useState({});
  //=============================
  // Loading

  useEffect(() => {
    axios
      .get(host_name_Server + "/api/event/" + keyOfEvent, {
        headers: {
          Authorization: localHelper.Token(),
        },
      })
      .then((res) => {
        if (res.data.message == "No Data!") {
          alert("Invalid Key or No Event Found ");
        } else {
          set_data_Event(res.data.data);
        }
      });
  }, []);

  //=============================
  // Funtion

  function bodyEventChart() {
    var mainList = [];
    mainList.push(["Registered", "Guests"]);

    var dataRegister = ["Registered (130)", 130];
    var dataJOined = ["Joined (126)", 126];
    mainList.push(dataRegister);
    mainList.push(dataJOined);

    const options = {
      title: "Guest Registerd vs Joined",
      legend: "none",
    };

    return (
      <Chart
        options={options}
        chartType="ColumnChart"
        width="100%"
        height="500px"
        data={mainList}
      />
    );
  }

  //=============================
  // View
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-4">
            {Template_Defualt_Style(
              "Chart",
              bodyEventChart(),
              false,
              false
            )}
          </div>
        </div>
      </div>
    </div>
  );

  //=============================
  // Helper

  function Template_Defualt_Style(
    headerTitle,
    body,
    isLoading,
    isNull,
    titleNullData
  ) {
    return (
      <div
        style={{
          backgroundColor: "white",
          width: "100%",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "lightgray",
          padding: "10px",
          boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.4)",

          borderRadius: "0px",
        }}
      >
        <h5 style={{ color: "gray" }}>{headerTitle}</h5>
        <hr />

        {isLoading == true
          ? Template_LoadingSpinner()
          : isNull == true
          ? Template_Null(titleNullData)
          : body}
      </div>
    );
  }

  function Template_LoadingSpinner() {
    return (
      <div style={{ width: "100%", textAlign: "center" }}>
        <br />
        <IoIosMore
          style={{ width: "80px", height: "80px", color: "lightgray" }}
        />
        <br />

        <label style={{ color: "lightgray" }}>
          {"Please wait a momnet..."}
        </label>
        <br />
        <br />
        <br />
      </div>
    );
  }

  function Template_Null(title) {
    return (
      <div style={{ width: "100%", textAlign: "center" }}>
        <br />
        <AiOutlineFrown
          style={{ width: "80px", height: "80px", color: "lightgray" }}
        />
        <br />
        <label style={{ color: "lightgray" }}>{title}</label>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default Event_Detail_Chart;
