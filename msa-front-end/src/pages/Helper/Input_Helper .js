class Input_Helper {

    Input_Custom(id, required) {
      /* How To Use
      <Simple_Input
        id={"input_name"}
        title={"ឈ្មោះស្ថាប័ន ឬអង្គភាព"}
        error_text={"សូមបំពេញឈ្មោះស្ថាប័ន ឬអង្គភាព"}
        required={true}
      />;
      */
      // Element
      var input = document.getElementById(id);
      var input_holder_Box = document.getElementById(id + "-holder");
      var label_Error = document.getElementById(id + "-error");
  
      // Validation
      if (required == true) {
        if (
          input.value == "" ||
          input.value == undefined ||
          input.value == null
        ) {
          input_holder_Box.style.borderColor = "red";
          label_Error.style.display = "block";
          input.focus();
          return false;
        } else {
          return input.value;
        }
      } else {
        return input.value;
      }
    }
  
  
    Input_Custom_Auto(id) {
      // Element
      var input = document.getElementById(id);
      var input_holder_Box = document.getElementById(id + "-holder");
      var label_Error = document.getElementById(id + "-error");
  
      input_holder_Box.style.borderColor = "red";
      label_Error.style.display = "block";
      input.focus();
    }
  
    Select_Custom(id, required) {
      /* How To Use
      <Simple_Select
        select_index={props.data_update == null ? null : index_Select_Update_Unit}
        options={list_Of_Unit_Select}
        senderOnChange={receivingData_Unit_Select}
        id={"select_unit"}
        title={"ស្ថាប័ន / អង្គភាព"}
        error_text={"សូមជ្រើសយក ស្ថាប័ន / អង្គភាព"}
        required={true}
      />;
      */
  
      var select = document.getElementById(id + "value");
      var label_Error = document.getElementById(id + "-error");
      var border = document.getElementById(id + "border");
      var update = document.getElementById(id + "update");
  
      if (required == true) {
        if (
          update.innerHTML == null ||
          update.innerHTML == "" ||
          update.innerHTML == undefined
        ) {
          if (
            select.innerHTML == "false" ||
            select.innerHTML == null ||
            select.innerHTML == "" ||
            select.innerHTML == undefined
          ) {
            label_Error.style.display = "block";
            border.style.borderColor = "red";
            return false;
          } else {
            return select.innerHTML;
          }
        } else {
          return update.innerHTML;
        }
      } else {
        if (
          update.innerHTML == null ||
          update.innerHTML == "" ||
          update.innerHTML == undefined
        ) {
          return select.innerHTML;
        } else {
          return select.innerHTML;
        }
      }
    }
  
    Select_Multi_Custom(id, required) {
      /* How To Use
      <Simple_Select
        select_index={props.data_update == null ? null : index_Select_Update_Unit}
        options={list_Of_Unit_Select}
        senderOnChange={receivingData_Unit_Select}
        id={"select_unit"}
        title={"ស្ថាប័ន / អង្គភាព"}
        error_text={"សូមជ្រើសយក ស្ថាប័ន / អង្គភាព"}
        required={true}
      />;
      */
  
      var select = document.getElementById(id + "value");
      var label_Error = document.getElementById(id + "-error");
      var border = document.getElementById(id + "border");
      var update = document.getElementById(id + "update");
  
      if (required == true) {
        if (
          select.innerHTML == "false" ||
          select.innerHTML == null ||
          select.innerHTML == "" ||
          select.innerHTML == undefined
        ) {
          label_Error.style.display = "block";
          border.style.borderColor = "red";
          return false;
        } else {
          return this.private_select_multi_return(select.innerHTML);
        }
      } else {
        if (
          update.innerHTML == null ||
          update.innerHTML == "" ||
          update.innerHTML == undefined
        ) {
          return false;
        } else {
          return this.private_select_multi_return(select.innerHTML);
        }
      }
    }
    
    Select_Custom_Auto_Wrong_Input(id){
  
  
      var select = document.getElementById(id + "value");
      var label_Error = document.getElementById(id + "-error");
      var border = document.getElementById(id + "border");
      var update = document.getElementById(id + "update");
      label_Error.style.display = "block";
      border.style.borderColor = "red";
      
    }
  
    private_select_multi_return(data) {
      var myString = data;
      var myWords = myString.split(",");
  
      return myWords;
    }
  
    CheckBox_Custom(id, is_opposite) {
      var select = document.getElementById(id);
      if (is_opposite == true) {
        if (select.checked == true) {
          return false;
        } else {
          return true;
        }
      } else {
        return select.checked;
      }
    }
  }
  
  export default Input_Helper;