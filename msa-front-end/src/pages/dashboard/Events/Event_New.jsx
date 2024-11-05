import React, { useEffect, useState } from "react";
import Table from "../../component/Table";
import axios from "axios";
import API from "../../Helper/API";
import Form_Input from "../../component/Form_Input";
import DesignColumnActionButton from "../../component/DesignColumnActionButton";

//Declare===>>>>>>>>>>>>>
var api = new API();









/////=========================================

function Event_New(props) {

    // const [isLoading, setLoading] = useState(true);
    // const [data, setData] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [showPerPage, setShowPerPage] = useState(10);
    // const [totalData, setTotalData] = useState(0);

    // function loadData() {

    //   var token = props.login.data_server.token;

    //   axios
    //     .get(api.URL_Event(),{
    //       headers: {
    //         Authorization: token,
    //       },
    //     })
    //     .then((response) => {
    //       setData(response.data.total);
    //       console.log(response.data.total);
    //       setLoading(false);
    //     });
        

    


    // }
  
    // useEffect(() => {
    //   loadData();
    // }, [currentPage, showPerPage]);
  
  
  return (
    <Form_Input login={props.login}/>
  )
}

export default Event_New
