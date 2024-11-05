import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from "../../component/Table";
import API from '../../Helper/API'
import { Button } from 'react-bootstrap';
import { FaEye } from "react-icons/fa";
import MyHelper from '../../Helper/MyHelper';
import { IoQrCode } from "react-icons/io5";
import Pagination from '../../component/Pagination';
function Guest_Registered(props) {

  

    //Decalre===>>>>>>>>>>>>>
    const [list_guest,set_list_guest]=useState([])
    const [loading,set_loading]=useState(true)
    var api = new API();
    var myhelper = new MyHelper()
    var token = props.login.data_server.token;

    const columns = [

       {
         name: "No",
         selector: (row) => index(row),
         width: '50px', // adjust the width as needed
         style: {
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
         }
       },
       {
         name: "Information",
         selector: (row) => info_row(row),
         width: '700px', // adjust the width as needed
         style: {
           textAlign: 'left'
         }
       },

       {
        name: "Type",
        selector: (row) => info_row_type(row),
        width: '100px', // adjust the width as needed
        style: {
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }
      },
    
        {
          name: "Action",
          selector: (row) => designColumnAction(row),
         
          style: {
            justifyContent: 'center',
            textAlign: 'center'
          }
       
        },
      ];

    useEffect(()=>{
        loading_guest_registered()
    },[])


    function info_row_type(row){

      var value = row.url_and_link_type
      if(value == "qrcode"){
        value = "QR Code"
      }else{
        value = "PR"
      }
      return value
      }

       
    

    function  index(row){

        return list_guest.indexOf(row) + 1
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

            <Button
              variant="btn btn-outline-primary"
              size="sm"
              onClick={(e) => Event_DetailQR(row)}
            >
             <IoQrCode />
            </Button>

            <Button style={{marginLeft:"5px"}}
              variant="btn btn-outline-primary"
              size="sm"
              onClick={(e) => Event_Detail_Guest(row)}
            >
              
             <FaEye />
            </Button>
          </div>
        );
      }


    function Event_DetailQR(row){

      window.location.replace(
        "/msa/guest/authorization/scan/registration/?key=" +
          myhelper.encrypt(row.key) +
          "&authorization=" +
          myhelper.encrypt("msa") +
          "&type=" +
          myhelper.encrypt(row.url_and_link_type) +
          "&urlkey=" +
          myhelper.encrypt(row.url_and_link_key)
      );
    }

    function info_row(row){

      var value = '';
      row.form.map((rowF,iF)=>{
        if (iF === row.form.length - 1) {
          value += rowF.value;
        } else {
          value += rowF.value + ', ';
        }
      });

        return value
    }

    function loading_guest_registered(){
        axios.get(api.URL_Guest_Receiving(),
        {headers:
            {Authorization:token}
        }).then((response)=>{

           // console.log(response.data.data)
            set_list_guest(response.data.data)
            set_loading(false)

        })
    }
    
      
    function Event_Detail_Guest(row){

        window.location.href = ('/msa/admin/guest/detail/' + row.key) 
    }

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    

  

  return (
    <div style={{backgroundColor:'#dedede', height:'100vh'}} >
        <Table

        columns={columns}
        data={list_guest}
        loading_progress={loading}

        />
      
      
      
    </div>
  )
}

export default Guest_Registered
