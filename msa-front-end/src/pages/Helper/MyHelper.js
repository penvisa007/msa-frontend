import { IoIosMore } from "react-icons/io";
import { AiOutlineFrown } from "react-icons/ai";
class MyHelper {
  returnCurrentDate() {
    var create_date = {
      date: this.dateTime_Get_Current_Date(),
      month: this.dateTime_Get_Current_Month() ,
      year: this.dateTime_Get_Current_Year(),
      hh: this.dateTime_Get_Current_Hour(),
      mm: this.dateTime_Get_Current_Minute(),
      ss: this.dateTime_Get_Current_Second(),
    };

    return create_date;
  }



  dateTime_Get_Current_Date() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    var result = day.toString();
    if (month.toString().length == 1) {
      result = "0" + day;
    }
    return result;
  }


  dateTime_Get_Current_Month() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    var result = month.toString();
    if (month.toString().length == 1) {
      result = "0" + result;
    }
    return result;
  }

  dateTime_Get_Current_Year() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return year.toString();
  }

  dateTime_Get_Current_Hour() {
    const date = new Date();

    let value = date.getHours();

    var resuldCheck = value.toString();
    if (resuldCheck.length == 1) {
      resuldCheck = "0" + value.toString();
    }

    return resuldCheck;
  }

  dateTime_Get_Current_Minute() {
    const date = new Date();

    let value = date.getMinutes();
    var resuldCheck = value.toString();
    if (resuldCheck.length == 1) {
      resuldCheck = "0" + value.toString();
    }

    return resuldCheck;
  }

  dateTime_Get_Current_Second() {
    const date = new Date();

    let value = date.getSeconds();

    var resuldCheck = value.toString();
    if (resuldCheck.length == 1) {
      resuldCheck = "0" + value.toString();
    }

    return resuldCheck;
  }

   Template_Defualt_Style(headerTitle, body, isLoading, isNull, titleNullData) {


    return (
      <div
        style={{
          backgroundColor: "white",
          width: "100%",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "lightgray",
          padding: "10px",
          boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.4)",

          borderRadius: "0px",
        }}
      >
        <h5 style={{ color: "gray" }}>{headerTitle}</h5>
        <hr />

        {isLoading == true? this.Template_LoadingSpinner() : isNull == true? this.Template_Null(titleNullData) : body}
       
      </div>
    );
  }

   Template_LoadingSpinner() {
    return (
      <div style={{ width: "100%", textAlign: "center" }}>
        <br />
        <IoIosMore
          style={{ width: "80px", height: "80px", color: "lightgray" }}
        />
        <br />

        <label style={{ color: "lightgray" }}>
          {"Please wait a momnet..."}
        </label>
        <br />
        <br />
        <br />
      </div>
    );
  }

   Template_Null(title) {
    return (
      <div style={{ width: "100%", textAlign: "center" }}>
        <br />
        <AiOutlineFrown
          style={{ width: "80px", height: "80px", color: "lightgray" }}
        />
        <br />
        <label style={{ color: "lightgray" }}>{title}</label>
        <br />
        <br />
        <br />
      </div>
    );
  }

   countdown(endDate) {
    const now = new Date();
    const end = new Date(endDate);
    const difference = end.getTime() - now.getTime();
  
    if (difference <= 0) {
      return "Today";
    }
  
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  }

   formatDateLong(date) {
    const year = date.year;
    const month = date.month;
    const day = date.date;
    const dateObject = new Date(year, month - 1, day);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const formattedMonth = monthNames[dateObject.getMonth()];
    return `${formattedMonth} ${day}, ${year}`;
  }
   checkTimeFormat(hour, minute) {
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    return date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  }


    cookie_Set(name, value, daysToLive) {
        // Encode value in order to escape semicolons, commas, and whitespace
        var cookie = name + "=" + encodeURIComponent(value);
    
        if (typeof daysToLive === "number") {
          /* Sets the max-age attribute so that the cookie expires
                  after the specified number of days */
          cookie += "; max-age=" + daysToLive * 24 * 60 * 60;
    
          document.cookie = cookie;
        }
      }
    
      cookie_Set_Temp_id(value) {
        this.cookie_Set("temp-id", this.encrypt(value), 1);
      }
    
      cookie_Get_Temp_id() {
        var data = this.decrypt(this.cookie_Get("temp-id"));
        //remove
        this.cookie_remove("temp-id");
        return data;
      }
    
      cookie_Get(name) {
        // Split cookie string and get all individual name=value pairs in an array
        var cookieArr = document.cookie.split(";");
    
        // Loop through the array elements
        for (var i = 0; i < cookieArr.length; i++) {
          var cookiePair = cookieArr[i].split("=");
    
          /* Removing whitespace at the beginning of the cookie name
                    and compare it with the given string */
          if (name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
          }
        }
    
        // Return null if not found
        return null;
      }
    
      cookie_remove(name) {
        document.cookie = name + "=; Max-Age=0";
      }

      encrypt(value) {
        var dataInLeft = "DE";
        var dataInRight = "EN";
    
        var encodeString = this.m_encrypt(value, dataInLeft, dataInRight);
        return encodeString;
      }
    
      decrypt(value) {
        try {
          var decodeString = this.m_decrypt(value);
          let arr = this.m_decrypt2(decodeString);
          return arr[1];
        } catch {
          return null;
        }
      }
    
      m_encrypt(value, dataInLeft, dataInRight) {
        return window.btoa(dataInLeft + "---(" + value + "---(" + dataInRight);
      }
    
      m_decrypt(value) {
        return window.atob(value);
      }
    
      m_decrypt2(decodeString) {
        return decodeString.split("---(");
      }
    
      session_Set(name, value) {
        sessionStorage.setItem(name, value);
      }
    
      session_Get(name) {
        return sessionStorage.getItem(name);
      }
      dateTime_GetPeroid(dateAdd, monthAdd, yearAdd) {
        const date = new Date();
        let days = date.getDate();
        let months = date.getMonth() + 1;
        let years = date.getFullYear();
    
        return this.dateTime_GetPeroid_2_Date(
          days,
          months,
          years,
          dateAdd,
          monthAdd,
          yearAdd
        );
      }
    
       dateTime_GetPeroid_2_Date(
        start_Date,
        start_Month,
        start_Year,
        end_Data,
        end_Month,
        end_year
      ) {
        var firstDate = start_Month + "/" + start_Date + "/" + start_Year;
        var endData = end_Month + "/" + end_Data + "/" + end_year;
    
        return this.datediff(this.parseDate(firstDate), this.parseDate(endData));
      }
    
       parseDate(str) {
        var mdy = str.split("/");
        return new Date(mdy[2], mdy[0] - 1, mdy[1]);
      }

       datediff(first, second) {
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
      }

}

export default MyHelper