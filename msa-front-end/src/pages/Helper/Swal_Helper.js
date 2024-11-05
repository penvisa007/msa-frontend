import Swal from "sweetalert2";
import mark from "../asset/mark.jpg";
import red from "../asset/red.png";

class Swal_Helper {



    Swal_Custom_Toast_Success(title) {
        Swal.close();
        Swal.fire({
          width: "auto",
          position: "top-end",
          html: `
    
          <div style="display:flex">
            <img src="${mark}" style="width: 25px; height: 25px; object-fit: contain; margin-right: 10px; margin-top: -1px"/>
            <label >${title}</label>
          </div>
          
          `,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    
      Swal_Custom_Toast_Failed(title) {
        Swal.close();
        Swal.fire({
          width: "auto",
          position: "top-end",
          html: `
    
          <div style="display:flex">
            <img src="${red}" style="width: 25px; height: 25px; object-fit: contain; margin-right: 10px; margin-top: -1px"/>
            <label >${title}</label>
          </div>
          
          `,
          showConfirmButton: false,
          timer: 2000,
        });
      }
}

export default Swal_Helper