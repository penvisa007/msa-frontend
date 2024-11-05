import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from "../../component/Table";
import API from '../../Helper/API'
import { IoQrCodeSharp } from "react-icons/io5";
import { Button } from 'react-bootstrap';



function All_URL(props) {

  const [loading, setLoading] = useState(true);
    
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
      name: "Name",
       selector: (row) => info_row_name(row),
       style: {
        textAlign: 'left',
        justifyContent: 'left',
      },
   
     },

    {
      name: "Action",
       selector: (row) => designColumnAction(row),
       style: {
        textAlign: 'center',
        justifyContent: 'center',
      },
    },
  ];


  function designColumnAction(row) {
    return(
      <div className="div"
      style={{ width: "100%",
        justifyContent: "center",
        display: "flex",
        alignItems: "center", }}>
        <Button variant="btn btn-outline-primary" size="sm" onClick={(e) => event_QR(row)}> <IoQrCodeSharp /> </Button>
      </div>
    )
  }

  function event_QR(row){

    
    window.location.href = ('/msa/admin/url-and-link/generate/registration-form/' + row.key)

  }



  function info_row_name(row){

    return row.url_name
    
  }

  function info_row_no(row) {
    for (let i = 0; i < list_of_url.length; i++) {
      if (list_of_url[i] === row) {
        return i + 1;
      }
    }
    return null;
  }

      //Decalre===>>>>>>>>>>>>>
    const [list_of_url,set_list_of_url]=useState([])
    var api = new API();
    var token = props.login.data_server.token;

    useEffect(()=>{
        loading_all_url()
    },[])


    function loading_all_url(){

        axios.get(api.URL_Registration_url(),
        {headers:{Authorization:token}
    }).then((response)=>{ 

            set_list_of_url(response.data.data)
            setLoading(false)
    })
    }

    function event_View(row){
        window.location.href = ('/qr-code-generate/?key=' + row.key)
    }
    
  return (
    <div style={{backgroundColor:'#dedede', height:'100vh'}}>
        <Table

        columns={columns}
        data={list_of_url}
        loading_progress={loading}
        />
    </div>
  
  )
}

export default All_URL
