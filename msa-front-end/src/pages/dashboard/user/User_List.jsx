import React, { useEffect, useState } from "react";
import Table from "../../component/Table";
import axios from "axios";
import API from "../../Helper/API";
import DesignColumnActionButton from "../../component/DesignColumnActionButton";
import Swal from "sweetalert2";
import LocalHelper from "../../Helper/LocalHelper";
import Swal_Helper from "../../Helper/Swal_Helper";


var api = new API();

function User_List(props) {
  var localHelper = new LocalHelper()
  var swal_Helper = new Swal_Helper()
  const token = localHelper.Token()
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPerPage, setShowPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);

  const columns = [

    {
      name: "No",
      selector: (row) => info_row_no(row),
      width: "50px",
      style: {
        textAlign: "center",
        justifyContent: "center",
      },
    },

    {
      name: "Email",
      selector: (row) => row.email,

      cell: (row) => design_Email(row),
    },
    {
      name: "Role",
      selector: (row) => row.role,
      style: {
        textAlign: "center",
        justifyContent: "center",
      },
      
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

  function design_Email(row) {
    return (
      <div style={{ width: "100%" }}>
        <label
          style={{
            fontSize: "14px",
            paddingLeft: "10px",
            textAlign: "left",
          }}
        >
          {row.email}
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
          is_delete={true}
          is_view={false}
          is_edit={false}
          event_delete={(e) => handleDelete(e, row)}
        />
      </div>
    );
  }

  function handleDelete(e, row) {

    Swal.fire({
      title: "Delete User",
      text: "Are you sure to delete this user?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "red",  
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {

        setLoading(true);

        axios.delete(api.URL_User() + "/" + row.key,
        {headers: {Authorization: token}})
        .then((response)=>{
          swal_Helper.Swal_Custom_Toast_Success("User Deleted Successfully!");
          setTimeout(() => {
              loadData();
              setLoading(false);
          },2000)
          
        

        })

      }
    })
  }

  function loadData() {
    var token = props.login.data_server.token;
    setLoading(true);

    axios
      .get(
        api.URL_User() +
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
      .get(api.URL_User(), {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setTotalData(response.data.total);
      });
  }

  useEffect(() => {
    loadData();
  }, [currentPage, showPerPage]);


  function dialog_create(){

    Swal.fire({
      html: `
<div style="margin-bottom: 10px;">
  <div style="text-align: left" class="form-group">
     <label style="margin-bottom: 10px;" for="email" "class="font-weight-bold">Email</label>
  
    <input type="email" id="email" class="form-control" placeholder="Enter Email">
  </div>
  <br/> 
  <div style="text-align: left" class="form-group">
    <label style="margin-bottom: 10px;" for="role" class="font-weight-bold">Role</label>
    
    <select id="role" class="form-control">
    <option value="Client">Client</option>
      <option value="Administrator">Administrator</option>
    </select>
  </div>
</div>` ,
      text: "Generate Scanner",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create it!'
  }).then((result)=>{

      if(result.isConfirmed){

          var inp_email = document.getElementById('email')
          var inp_role = document.getElementById('role')
          if(inp_email.value == "" ){
              alert("Please Input Email!")
          }else{
              setLoading(true)
              var data = {
                  email : inp_email.value,
                  is_super_admin: false,
                  role: inp_role.value,

              }
              axios.post(api.URL_User(), data, {
                  headers: {
                      Authorization: token
                  }
              }).then((response) => {
               
                if(response.data.message == "Email in use!"){
                  
                  alert('Email is in use!')
                  setLoading(false)

                }else{
                  swal_Helper.Swal_Custom_Toast_Success("User Created Successfully!");
                  setTimeout(() => {
                      loadData();
                      setLoading(false);
                  },2000)
                }
                 
              })
          }

       
      }

  })
  }


  return (
    <div style={{height: "100vh" , backgroundColor: "#dedede" }} className="div">
      <Table columns={columns} data={data} loading_progress={isLoading} button={"Create User"} button_event = {()=>dialog_create()}  is_show_button= {true}/>

      <br />

    </div>
  );
}

export default User_List;
