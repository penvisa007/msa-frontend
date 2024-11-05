import React, { useEffect, useState } from "react";
import Table from "../../component/Table";
import axios from "axios";
import API from "../../Helper/API";
import DesignColumnActionButton from "../../component/DesignColumnActionButton";
import Swal_Helper from "../../Helper/Swal_Helper";
import { FaChartBar, FaEye } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { width } from "@mui/system";

function Event_Coming(props) {
  //Decalre===>>>>>>>>>>>>>
var api = new API();
var token = props.login.data_server.token;
var swal_Helper = new Swal_Helper();
const [isLoading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [showPerPage, setShowPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);



const columns = [

  {
    name: "No",
    selector: (row) => info_row_no(row),
    width: '50px',
    style: {
      textAlign: 'center',
      justifyContent: 'center',
    },
  },

  {
    name: "Event",
    selector: (row) => row.name,

     cell: (row) => design_name(row),
  },


  {
    name: "Registered",
    selector: (row) => row.guest_register_count,

     cell: (row) => Deisgn_Register(row),
  },
 

 {
   name: "Coming",
   selector: (row) => {
     const eventDate = new Date(`${row.start_date.year}-${row.start_date.month}-${row.start_date.date}`);
     const now = new Date();
     const diffTime = Math.abs(eventDate - now);
     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
     return `${diffDays} day${diffDays > 1 ? 's' : ''} left`;
   } ,  style: {
     textAlign: 'center',
     width: '100%',
     justifyContent: 'center'
   }
 },
  {
    name: "Date",
    selector: (row) => {
      const date = new Date(`${row.start_date.year}-${row.start_date.month}-${row.start_date.date}`);
      return date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    },
    style: {
      textAlign: 'center',
      width: '100%',
      justifyContent: 'center'
    }
  },

  {
    name: "Chart",
    width: "60px",
    selector: (row) => design_Chart(row),
    cell: (row) => design_Chart(row),
  },

  {
    name: "Action",
    selector: (row) => designColumnAction(row),
    cell: (row) => designColumnAction(row),
  },
];


function info_row_no(row) {
  for (let i = 0; i < data.length; i++) {
    if (data[i] === row) {
      return i + 1;
    }
  }
  return null;
}

function design_Chart(row) {  
  return(
    <div className="div"
    style={{ width: "100%",
      justifyContent: "center",
      display: "flex",
      alignItems: "center", }}>
      <Button variant="btn btn-outline-primary" size="sm" onClick={(e) => event_chart(row)}> <FaChartBar /> </Button>
    </div>
  )
}

function event_chart(row){

  window.location.href=('/msa/admin/event/detail-all/' + row.key)

}
function Deisgn_Register(row){
  return (
    <div style={{ width: "100%",
      justifyContent: "center",
      display: "flex",
      alignItems: "center", }}>
        <a  style={{
          fontSize: "14px",
          paddingLeft: "0",
          textAlign: "center",
        }}href='/msa/admin/guest/list/by-event'>
         {row.guest_register_count} Guest{row.guest_register_count > 1 ? 's' : ''}
        </a>
    </div>
  );
}

function design_name(row) {
  return (
    <div style={{ width: "100%",
      justifyContent: "center",
      display: "flex",
      alignItems: "center", }}>
      <label
        style={{
          fontSize: "14px",
          paddingLeft: "0",
          textAlign: "center",
        }}
      >
        {row.name}
      </label>
    </div>
  );
}

function designColumnAction(row) {
  return (
    <div
      style={{
        width: "100%",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      <DesignColumnActionButton
        is_delete={false}
        is_view={true}
        is_edit={false}
        event_delete={(e) => handleDelete(e, row)}
        event_view={(e) => handleView(e, row)}
      />
    </div>
  );
}

function handleDelete(e, row) {

 
  
  if(row.guest_register_count == 0){
  

    if(row.guest_joined == 0){

      setLoading(true);

      axios.get(api.URL_Event_Link_QR() + "/" + row.key,
      {headers: {Authorization: token}})
      .then((response)=>{

        console.log(response.data.status)

       if(response.data.status == true){

        swal_Helper.Swal_Custom_Toast_Failed("You can not delete this event!")

        setLoading(false);

       }else{
        //Lub

        axios.delete(api.URL_Event() + "/" + row.key,
        {headers: {Authorization: token}})
        .then((response)=>{
          swal_Helper.Swal_Custom_Toast_Success("Event Deleted Successfully!");
          setTimeout(() => {
              loadData();
              setLoading(false);
          },2000)
          
        

        })

       }

      })


    }else{
      swal_Helper.Swal_Custom_Toast_Failed("You can not delete this event!")

    }

  }else{

    swal_Helper.Swal_Custom_Toast_Failed("You can not delete this event!")


  }



}


function handleView(e, row) {
  
  window.location.href = `/msa/admin/event/details?data=` + encodeURIComponent(JSON.stringify(row));

}

  
  function loadData() {

   

    axios
    .get(
      api.URL_UpComing() +
        `?current_page=${currentPage}&show_per_page=${showPerPage}`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => {
      setData(response.data.data);
      setLoading(false);
    });

  
  axios
    .get(api.URL_UpComing(), {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      setTotalCount(response.data.total);
      console.log(response.data.total);
      setLoading(false);
    });

  }
  useEffect(() => {
    loadData();
  }, [currentPage, showPerPage]);
  



  return (
    <div style={{backgroundColor: '#dedede',height:'100vh'}}>
      <Table
        title="Event Coming"
        columns={columns}
        data={data}
        loading_progress={isLoading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        showPerPage={showPerPage}
        setShowPerPage={setShowPerPage}
        totalData={totalData}
      />
    </div>
  )
}
 
export default Event_Coming
