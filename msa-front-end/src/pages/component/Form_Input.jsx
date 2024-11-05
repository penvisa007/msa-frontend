import React  , { useState } from 'react';
import Simple_Input from './Simple_Input';
import Button from './Button';
import Input_Helper from '../Helper/Input_Helper ';
import axios from 'axios';
import API from '../Helper/API';
import Swal_Helper from '../Helper/Swal_Helper';
import Loading from '../component/Loading';


function FormInput(props) {

    var input_helper = new Input_Helper();
    var api = new API();
    var swal_helper = new Swal_Helper();
    const [isLoading, setLoading] = useState(false);



   function event_save(){

        var token = props.login.data_server.token

        var inp_name = input_helper.Input_Custom("inp_name", true);
        var inp_URL = input_helper.Input_Custom("inp_URL", false);
        var inp_note = input_helper.Input_Custom("inp_note", true);
        var inp_start_date = input_helper.Input_Custom("inp_start_date", true);
        var inp_end_date = input_helper.Input_Custom("inp_end_date", true);

        inp_URL = inp_URL == "" ? "NA" : inp_URL
    
        if(inp_name != false || inp_note != false || inp_start_date != false || inp_end_date != false){

            
            var for_start_date = new Date(inp_start_date);
            var for_end_date = new Date(inp_end_date);

            if(for_start_date >= for_end_date){
                swal_helper.Swal_Custom_Toast_Failed("Please choose valid start date-time / end date-time..!");
               
            }else{

                var data = {
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
                    "info_url": inp_URL,
                    "is_active": true,
                    "not_finish": "yes",
                    "guest_joined": 0,
                    "guest_register_count": 0
                }

                setLoading(true)
    
            axios.post(api.URL_Event(), data , {
                headers: {
                    Authorization: token
                }   
            }).then((response) => { 

                axios.get(api.URL_Event() +"/" + response.data.key , {
                    headers: {
                        Authorization: token
                    }   
                }).then((response) => { 
                   
                    swal_helper.Swal_Custom_Toast_Success("Event " + inp_name + " Created Successfully!");
                    setTimeout(() => {
                        window.location.href = `/msa/admin/event/details/?data=` + encodeURIComponent(JSON.stringify(response.data.data));
                    },2000)
                    
                })
                
               
                

            })

            }

        }

        }

        
  return (
    <div style={{justifyContent: 'center', display: 'flex'}}>
        <div style={{width: '80%' , height : 'auto' , marginTop: '50px'}} className="div">
            <h4>Event Information</h4>

            <form style={{marginTop: '20px'}} className="row g-3">

            <div className="col-md-6">
                <Simple_Input id="inp_name" title="Event Name" error_text="Please Enter Event Name" required={true} />
            </div>

            <div className="col-md-6">
                <Simple_Input id="inp_URL" title="Event URL" error_text="Please Enter Event URL"  />
            </div>

            <div className="col-12">
                <Simple_Input id="inp_note" title="Event Note" error_text="Please Enter Event Note" required={true} />
            </div>

            <div className="col-md-6">
                <Simple_Input id="inp_start_date" title="Start Date-Time" type={"datetime-local"} required={true} />
           
            </div>
            <div className="col-md-6">
                <Simple_Input id="inp_end_date" title="End Date-Time" type={"datetime-local"} required={true} />
            </div>

          
            
            <div style={{justifyContent: isLoading  == true ? 'center' : 'right', marginTop: '40px' , display: 'flex'}} className="col-12">
                <div style={{width: isLoading  == true ? '100%' : '120px' , textAlign:'center'}}>
                    {isLoading == true ? <Loading title={'Creating New Event, Please wait a moment...!'} /> : <Button event={() => event_save()}  style={2} title={"Save"} />}
                
                </div>
            </div>

        </form>
        </div>
     
    </div>
  );

   
    }







export default FormInput;