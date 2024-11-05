import axios from "axios";
import React, { useEffect, useState } from "react";
import LocalHelper from "../../Helper/LocalHelper";
import "bootstrap/dist/css/bootstrap.css";
import "../../component/dashbord.css";
import ExcelExport from "../../dashboard/summary_dashboard/ExcelExport";
import { Chart } from "react-google-charts";
import { IoMdPerson } from "react-icons/io";
import { MdAppRegistration } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import MyHelper from "../../Helper/MyHelper";
function Dashboard(props) {
  // ======================================
  // Declaration
  var localHelper = new LocalHelper();
  var myHelper = new MyHelper();
  var host = "https://us-central1-msa-server-db.cloudfunctions.net";

  var token = props.login.data_server.token;

  //list
  const [list_Lastest_Event_Chart, set_list_Lastest_Event_Chart] = useState([]);
  const [list_Lastest_Guest, set_list_Lastest_Guest] = useState([]);
  const [list_list_Event_Upcoming_All, set_list_list_Event_Upcoming_All] =
    useState([]);
  const [list_Of_All_Event, set_list_Of_All_Event] = useState([]);
  const [list_Of_Event_Finished, set_list_Of_Event_Finished] = useState([]);

  const [list_Of_Excel_Guest, set_list_Of_Excel_Guest] = useState([]);

  // loading
  const [
    is_Loading_list_Lastest_Event_Chart,
    set_is_Loading_list_Lastest_Event_Chart,
  ] = useState(true);
  const [is_Loading_list_Lastest_Guest, set_is_Loading_list_Lastest_Guest] =
    useState(true);
  const [
    is_Loading_list_list_Event_Upcoming_All,
    set_is_Loading_list_list_Event_Upcoming_All,
  ] = useState(true);

  const [
    is_Loading_list_Of_Event_Finished,
    set_is_Loading_list_Of_Event_Finished,
  ] = useState(true);

  const [is_Loading_list_Of_Excel_Guest, set_is_Loading_list_Of_Excel_Guest] =
    useState(true);

  // ======================================
  // Loading
  useEffect(() => {
    Loading_All_Event_List();
    Loading_Lastest_Event_Chart();
    Loading_Lastest_Guest();
    Loading_Event_Upcoming_All();
    Loading_Lastest_Event_Finished();
  }, []);

  function Loading_All_Event_List() {
    axios
      .get(host + "/api/v1/event", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data.data) {
          set_list_Of_All_Event(res.data.data);
        }
      });
  }

  function Loading_Lastest_Event_Chart() {
    axios
      .get(host + "/api/v1/event?show_per_page=5&current_page=1", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data) {
          var mainList = [];
          mainList.push(["Event", "Registration Guests"]);
          for (let i of res.data.data) {
            var data = [i.name, i.guest_register_count];
            mainList.push(data);
          }

          set_list_Lastest_Event_Chart(mainList);
        } else {
          set_list_Lastest_Event_Chart([]);
        }
        set_is_Loading_list_Lastest_Event_Chart(false);
      });
  }

  function Loading_Lastest_Guest() {
    axios
      .get(host + "/api/v1/guest?show_per_page=10&current_page=1", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data.data) {
          set_list_Lastest_Guest(res.data.data);
        } else {
          set_list_Lastest_Guest([]);
        }

        set_is_Loading_list_Lastest_Guest(false);
      });
  }

  function Loading_Event_Upcoming_All() {
    axios
      .get(host + "/api/v1/event-type/upcoming", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data.data) {
          set_list_list_Event_Upcoming_All(res.data.data);
          Loading_Excel_Event_Upcoming_Guest(res.data.data);
        } else {
        }
        set_is_Loading_list_list_Event_Upcoming_All(false);
      });
  }

  function Loading_Excel_Event_Upcoming_Guest(listEvent) {
    var listExcel = [];
    listEvent.map((row, ind) => {
      axios
        .get(host + "/api/v1/event/guest-registered/" + row.key, {
          headers: {
            Authorization: token,
          },
        })
        .then((guest) => {
          var data = [];
          if(guest.data.list_guest){
            guest.data.list_guest.map((guestData) => {
              var item = {};
              guestData.form.map((guestForm, k) => {
                item[guestForm.title] = guestForm.value;
              });
              data.push(item);
            });
          }
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
        });
    });
  }

  function Loading_Lastest_Event_Finished() {
    axios
      .get(
        host + "/api/v1/event-type/completed?show_per_page=5&current_page=1",
        {
          headers: {
            Authorization: localHelper.Token(),
          },
        }
      )
      .then((res) => {
        if (res.data) {
          set_list_Of_Event_Finished(res.data.data);
        }
        

        set_is_Loading_list_Of_Event_Finished(false);
      });
  }

  // ======================================
  // Sub View
  function bodySubView_Lastest_Event_Chart() {
    const options = {
      title: "Lastest 5 events : Total Registration",
      legend: "none",
    };

    return (
      <div>
        <Chart
          options={options}
          chartType="ColumnChart"
          width="100%"
          height="500px"
          data={list_Lastest_Event_Chart}
        />
      </div>
    );
  }
  function bodySubView_Lastest_Guest() {
    return (
     <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
       {list_Lastest_Guest.map((item, index) => (
         <div key={index} style={{ marginBottom: "30px", display: "flex", flexDirection: "column", alignItems: "center" }}>
           <div style={{ display: "flex", justifyContent: "space-between", width: "100%", flexWrap: "wrap" }}>
             <div style={{ display: "flex", alignItems: "center" }}>
               <IoMdPerson style={{ width: "18px", height: "18px", marginRight: "5px", marginTop: "-5px" }} />
               <label style={{ paddingTop: "1px", fontSize: "13px" }}>
                 {item.form.slice(0, 2).map(formData => formData.value).join(", ")}
               </label>
               {viewButton(
                 <FaEye style={{ width: "15px", height: "15px", marginRight: "0px", marginTop: "-5px" }} />,
                 () => event_Recent_UserDetail(item),
                 "btn-outline-primary"
               )}
             </div>
             
             <div style={{ display: "flex", alignItems: "center" , justifyContent:"space-between"  }}>
               <MdAppRegistration style={{ width: "18px", height: "18px", marginRight: "0px", marginTop: "0px" }} />
               {item.event.map((row, ind) => (
                 <span style={{ fontSize: "13px", width: '200px', wordWrap: 'break-word', overflowWrap: 'break-word' }} key={ind}>
                   {list_Of_All_Event.find(event => event.key === row.key).name}
                   {viewButton(
                     "",
                     () => event_ViewDetail(row),
                  
                     ind
                   )}
                 </span>
               ))}
             </div>
           </div>
         </div>
       ))}
       <div style={{ width: "100%", textAlign: "center" }}>
         {viewButton("VIEW MORE", () => viewMore_Guest(), "btn-primary", 0)}
       </div>
       <br />
     </div>
    );
  }
 function bodySubView_Event_Upcoming_All() {
   return (
    <div>
      {list_list_Event_Upcoming_All.map((item, index) => (
        <div key={index} style={{ width: "100%", padding: "10px", marginBottom: "0px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <MdEvent style={{ width: "20px", height: "20px", marginTop: "-2px" }} />
              <label style={{ paddingLeft: "10px", fontWeight: "bold" }}>{item.name}</label>
            </div>
            <div style={{ marginLeft: "auto" }}>
              {viewButton(<FaEye />, () => event_UpComing(item), "btn-outline-primary")}
            </div>
          </div>
          <div>
            <label style={{ fontStyle: "italic", color: "gray", fontSize: "14px" }}>
              {myHelper.dateTime_GetPeroid(item.start_date.date, item.start_date.month, item.start_date.year) === 0
                ? "Today, " + item.start_date.hh + ":" + item.start_date.mm
                : `${myHelper.dateTime_GetPeroid(item.start_date.date, item.start_date.month, item.start_date.year)} days left (${item.start_date.date}/${item.start_date.month}/${item.start_date.year}, ${item.start_date.hh}:${item.start_date.mm})`}
            </label>
            <label style={{ fontStyle: "normal", color: "gray" }}>
              Note: {item.note}
              <br />
              <div style={{ marginTop: "5px" }}>
                <label>Registered: </label>
                <label style={{ color: "darkblue", marginLeft: "10px", textDecoration: "underline", fontWeight: "bold" }}>
                  {item.guest_register_count} Guests
                </label>
              </div>
            </label>
          </div>
        </div>
      ))}
    </div>
   );
 }

  function bodySubView_Event_Finished_Lastest() {
    return (
      <div>
        <br />
        {list_Of_Event_Finished.map((item, index) => {
          return (
            <div key={index} style={{ width: "100%", marginBottom: "30px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <MdEventAvailable style={{ width: "20px", height: "20px" }} />
                  <label style={{ paddingLeft: "10px", fontWeight: "bolder" }}>
                    {item.name}
                  </label>
                </div>

                {viewButton(
                  "Check",
                  () => event_Completed(item),
                  "btn-outline-secondary"
                )}
              </div>

              <label
                style={{
                  marginTop: "10px",
                  paddingLeft: "10px",
                  width: "100%",
                  marginLeft: "20px",
                }}
              >
                Registered : {item.guest_register_count} Guests
              </label>
              <label
                style={{
                  paddingLeft: "10px",
                  width: "100%",
                  marginLeft: "20px",
                }}
              >
                Joined : {item.guest_joined} Guests
              </label>
            </div>
          );
        })}
        <br />
      </div>
    );
  }

 function bodySubView_Export() {
   const excelList_UpcomingEvent = list_list_Event_Upcoming_All.map((row, i) => {
     const data = [
       {
         Event: row.name,
         Registered: row.guest_register_count,
         Note: row.note,
         Start: `${row.start_date.date}/${row.start_date.month}/${row.start_date.year}, ${row.start_date.hh}:${row.start_date.mm}`,
         End: `${row.end_date.date}/${row.end_date.month}/${row.end_date.year}, ${row.end_date.hh}:${row.end_date.mm}`,
       },
     ];
 
     return (
       <ExcelExport
         key={i}
         fileName={row.name}
         data={data}
         title={row.name}
       />
     );
   });
 
   return (
     <div>
       <h6>Upcoming Event Info</h6>
       {excelList_UpcomingEvent}
 
       <br />
 
       <h6>Guest Registered Info</h6>
       {list_Of_Excel_Guest}
     </div>
   );
 }

  // ======================================
  //event
  function event_UpComing(row) {
    window.location.href = ('/msa/admin/event/detail-all/'+ row.key)
  }

  function event_Completed(row) {
    alert(row.name);
  }

  function event_Recent_UserDetail(row) {
    window.location.href = ('/msa/admin/guest/detail/'+ row.key)
  }

  function event_ViewDetail(row) {
   

  }

  function viewButton(title, event, type, index) {
    return (
      <button
        key={index}
        onClick={event}
        type="button"
        className={"btn " + type}
        style={{
          paddingTop: "2px",
          paddingBottom: "2px",
          paddingLeft: "15px",
          paddingRight: "15px",
          marginLeft: "10px",
        }}
      >
        {title}
      </button>
    );
  }

  function viewMore_Guest() {
    window.location.href = ('/msa/admin/guests/registered')
  }

  // ======================================
  // View
  return (
  <div>
    <div style={{backgroundColor:'#dedede'}} className="container">
     
      <div className="row">
        <div  className="col-md-4 col-sm-6 col-xs-12">
          {myHelper.Template_Defualt_Style(
            "Upcoming Event",
            bodySubView_Event_Upcoming_All(),
            is_Loading_list_list_Event_Upcoming_All,
            list_list_Event_Upcoming_All.length > 0 ? false : true,
            "No event upcoming found yet!"
          )}
          <br />
          {myHelper.Template_Defualt_Style(
            "Finished Event",
            bodySubView_Event_Finished_Lastest(),
            is_Loading_list_Of_Event_Finished,
            list_Of_Event_Finished.length > 0 ? false : true,
            "No event finished found yet!"
          )}
          <br />
          {myHelper.Template_Defualt_Style(
            "Export",
            bodySubView_Export(),
            is_Loading_list_Of_Excel_Guest,
            list_list_Event_Upcoming_All.length > 0 ? false : true,
            "Export data!"
          )}
        </div>
        <div className="col-md-8 col-sm-6 col-xs-12">
          {myHelper.Template_Defualt_Style(
            "Lastest 5 Event",
            bodySubView_Lastest_Event_Chart(),
            is_Loading_list_Lastest_Event_Chart,
            list_Lastest_Event_Chart.length > 0 ? false : true,
            "No event found yet!"
          )}
          <br />
          {myHelper.Template_Defualt_Style(
            "Lastest 10 Guests Registed",
            bodySubView_Lastest_Guest(),
            is_Loading_list_Lastest_Guest,
            list_Lastest_Guest.length > 0 ? false : true,
            "No guest register yet!"
          )}
        </div>
      </div>
    </div>
  </div>
  );
}

export default Dashboard;
