import React , {useState, useEffect} from 'react'
import LocalHelper from '../pages/Helper/LocalHelper';
import MyHelper from '../pages/Helper/MyHelper';
import axios from 'axios';
import { Chart } from "react-google-charts";

import { IoMdPerson } from "react-icons/io";
import { MdAppRegistration } from "react-icons/md";
import { FaEye } from "react-icons/fa";


function Dashboard_SendBox() {

    var localHelper = new LocalHelper();
    var myHelper = new MyHelper();

    const [list_Of_Recent_event, set_list_Of_event] =
    useState([]);
    const [list_Of_Recent_event_origin, set_list_Of_event_orgin] =
    useState([]);
  const [list_Of_Guest_Summary_Chart, set_list_Of_Guest_Summary_Chart] =
    useState([]);
//************************************/
  //Loading
  useEffect(() => {
    Loading_Recent_Registration();
   
 }, []);

 const [
    is_Loading_Guest_Registration_Event,
    set_is_Loading_Guest_Registration_Event,
  ] = useState(true);
  const [is_Loading_Recent_Registration, set_is_Loading_Recent_Registration] =
    useState(true);

    function Loading_Recent_Registration() {
        axios.get('https://us-central1-msa-server-db.cloudfunctions.net' + '/api/sandbox/dashboard')
        .then((response)=>{


          //Working Event
          var mainList = [];
          mainList.push(["Event", "Registration Guest"]);
          for (let i of response.data.event_list.list) {
            var data = [i.name, i.guest_register_count];
            mainList.push(data);
          }


          set_list_Of_Guest_Summary_Chart(response.data.guest_list.list)
          set_list_Of_event(mainList)
          set_list_Of_event_orgin(response.data.event_list.list)

        })
      }
    


      function body_lastest_Event(){
        const options = {
          title: "Lastest events : Total Registration",
          legend: "none",
        };
    
        return (
          <Chart
            options={options}
            chartType="ColumnChart"
            width="100%"
            height="500px"
            data={list_Of_Recent_event}
          />
        );

      }

      function body_guest_summary(){
       
        return (
          <div>
        {list_Of_Guest_Summary_Chart.map((item, index) => {
          var info_user = '';
          var info_event = [];
          item.form.map((data, index) => {
            info_user += data.value;
            if (index < item.form.length - 1) {
              info_user += ', ';
            }
          })
          

          item.event.map((data2) => {
           
              for(let i of list_Of_Recent_event_origin){
                console.log(i, data2.event_key)
                if(i.key == data2.event_key){
                  info_event.push( <button style={{marginRight: '5px', marginLeft: '5px'}} type="button" class="btn btn-outline-secondary">{i.name}</button>)
                  break
                }
              }
          })
          return (
            <div style={{ marginBottom: "30px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <IoMdPerson
                    style={{
                      width: "25px",
                      height: "25px",
                      marginRight: "10px",
                      marginTop: "-5px",
                    }}
                  />
                  <label htmlFor="" style={{ paddingTop: "1px" }}>
                    {info_user}
                  </label>
               
                </div>

                <div>
                  <MdAppRegistration
                    style={{
                      width: "25px",
                      height: "25px",
                      marginRight: "0px",
                      marginTop: "0px",
                    }}
                  />

                {info_event}
                  
                </div>
              </div>
            </div>
          );
        })}

        
        <br />
      </div>
        )
      }



      function event_ViewDetail(row) {
        alert(row.event_name);
      }
    


  return (
    <div
      style={{
        backgroundColor: "#dedede",

        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <br /><br />
      {myHelper.Template_Defualt_Style('lastest event ', body_lastest_Event(), false, false, 'No event found!')}
      <br />
      {myHelper.Template_Defualt_Style(`Latest Event - Total Guest Joined ( ${list_Of_Guest_Summary_Chart.length} )`, body_guest_summary(), false, false, 'No guest found!')}
 
    </div>
  )
}

export default Dashboard_SendBox
