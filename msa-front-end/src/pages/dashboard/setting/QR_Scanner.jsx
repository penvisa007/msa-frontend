import React, { useEffect , useState } from 'react'
import Table from '../../component/Table'
import axios from 'axios'
import API from '../../Helper/API'
import LocalHelper from '../../Helper/LocalHelper'
import { FaTrashCan } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa";
import Swal from 'sweetalert2'
import Swal_Helper from '../../Helper/Swal_Helper'
import Loading from '../../component/Loading'


function QR_Scanner() {
     //Decalre
     var api = new API()
     var localHelper = new LocalHelper()
     var swal_Helper = new Swal_Helper()
 

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const token = localHelper.Token()


   
    const Culumn = [
        {
            name: "No",
            selector: (row) => info_no(row),
            width: "50px",

        },
        {
            name: "Name",
            selector: (row) => row.name,
        },
        {
            name: "Action",
            selector: (row) => designColumnAction(row),
            style: {
                textAlign: 'center',
                justifyContent: 'center',
              },
        }
    ]

    useEffect(() => {
        loading_data()
    }, [])

   function designColumnAction(row){
     return (
       <div style={{
         width: "100%",
         justifyContent: "center",
         display: "flex",
         alignItems: "center",
       }}>
         <button style={{ margin: "2px" }} type="button" className="btn btn-primary" onClick={() => copy_data(row)}><FaRegCopy /></button>
         <button style={{ margin: "2px" }} type="button" className="btn btn-danger" onClick={() => delete_data(row)} ><FaTrashCan /></button>
         <button style={{ margin: "2px" }} type="button" className="btn btn-success" onClick={() => view_qr_generate(row)}><FaEye /></button>
       </div>
     )
   }

    function copy_data(row){
        var link_url = 'https://msa-server-db.web.app/msa/user/authorization/camera/guest/' + row.key
        navigator.clipboard.writeText(link_url)
        alert("Copied! : " + link_url)
    }
    function view_qr_generate(row){
       window.location.href = ('/msa/user/authorization/camera/guest/' + row.key)
    }

    function delete_data(row){
        Swal.fire({
            title: 'Do you want to delete this?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true)
                axios.delete(api.URL_QR_Scanner() + "/" + row.key, {
                    headers: {
                        Authorization: token
                    }
                }).then((response) => {

                    swal_Helper.Swal_Custom_Toast_Success("Deleted Successfully!")
                    loading_data()
                   
                })
            }
          })
    }

    function info_no(row){
        for(let i = 0; i < data.length; i++){
            if(data[i] === row){
                return i + 1
            }
        }
    }
    function loading_data() {

        //setLoading(true)

        axios.get(api.URL_QR_Scanner(), {
            headers: {
                Authorization: token
            }
        }).then((response) => {
            if(response.data.data){
             setData(response.data.data)
             setLoading(false)
            }
            
        })

    }


    function dialog_create(){
        Swal.fire({
            html: `<input type="text" id="swal-input-name" class="swal2-input" placeholder="Enter Event Name">`,
            text: "Generate Scanner",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, create it!'
        }).then((result)=>{

            if(result.isConfirmed){

                var inp_name = document.getElementById('swal-input-name')
                if(inp_name.value == ""){
                    alert("Please Input Name")
                }else{

                    setLoading(true)
                    axios.post(api.URL_QR_Scanner(), {
                        name : inp_name.value
                    }, {
                        headers: {
                            Authorization: token
                        }
                    }).then((response) => {
                        
                        swal_Helper.Swal_Custom_Toast_Success("QR Scanner Created Successfully!")
                        loading_data()
                        
                    })
                    }
                }

        })
    }

  return (

    <div style={{backgroundColor: '#dedede', height: '100vh'}} className="div">
        <Table
          columns = {Culumn}  
          data = {data}
          is_show_button = {true}
          button_event = {()=>dialog_create()}
          button = "Generate Scanner"
          loading_progress = {loading}
        />
    </div>

    
  )
}

export default QR_Scanner
