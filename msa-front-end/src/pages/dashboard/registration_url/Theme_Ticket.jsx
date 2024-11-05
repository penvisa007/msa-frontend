import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import frame_header_open from "../../asset/frame_header_open.png";
import frame_header_award from "../../asset/frame_header_award.png";
import frame_header_both from "../../asset/frame_header_both.png";
import frame_footer_open from "../../asset/frame_footer_open.png";
import frame_footer_award from "../../asset/frame_footer_award.png";
import frame_footer_both from "../../asset/frame_footer_both.png";
import img_Design_Open from "../../asset/open.png";
import img_Design_Award from "../../asset/award.png";
import img_Design_Both from "../../asset/both.png";
import logo from "../../asset/logo.png";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";

function Theme_Ticket(props) {
  // type : open, award, both
  function imgFrameHeader() {
    if (props.type == "open") {
      return frame_header_open;
    } else if (props.type == "award") {
      return frame_header_award;
    } else {
      return frame_header_both;
    }
  }

  function imgFrameFooter() {
    if (props.type == "open") {
      return frame_footer_open;
    } else if (props.type == "award") {
      return frame_footer_award;
    } else {
      return frame_footer_both;
    }
  }

  function titleHeader() {
    if (props.type == "open") {
      return (
        <div>
          <img
            src={img_Design_Open}
            style={{ width: "100%", height: "60px", objectFit: "contain", marginBottom: '5px' }}
            alt=""
          />
        </div>
      );
    } else if (props.type == "award") {
      return (
        <div>
          <img
            src={img_Design_Award}
            style={{ width: "100%", height: "57px", objectFit: "contain" }}
            alt=""
          />
        </div>
      );
    } else {
      return (
        <div>
          <img
            src={img_Design_Both}
            style={{ width: "100%", height: "120px", objectFit: "contain",  marginBottom: '5px'}}
            alt=""
          />
        </div>
      );
    }
  }


  function titleFooter() {
    if (props.type == "open") {
      return (
        <div>
          <label style={{ 
            textAlign: "center", 
            wordWrap: "break-word", 
            whiteSpace: "normal", 
            lineBreak: "anywhere"
          }}>
            ជួបគ្នានៅក្នុងពិធីសម្ពោធនៃ ទិវាប្រព័ន្ធអេកូឡូស៊ី 
           
            <br />
            <span>
            សហគ្រិនភាព ឆ្នាំ២០២៤ នៅថ្ងៃទី២៤ ខែវិច្ឆិកា 
            </span>
            <br /><span>
            ឆ្នាំ២០២៤ នៅមជ្ឈមណ្ឌលសន្និបាត​ និងពិព័រណ៍កោះពេជ្រ។
            </span>
          </label>
          
          <label style={{ 
            marginTop: "10px", 
            textAlign: "center", 
            wordWrap: "break-word", 
            lineBreak: "anywhere",
            whiteSpace: "normal"
          }}>
            See you at the opening ceremony
            <br />
            <span> of Entrepreneurial Ecosystem Day 2024</span>
            <br />
            <span>on 24th November 2024 at Diamond Island</span>
            <br /><span>
            Convention and Exhibition Center.
            </span>
          </label>
        </div>
      );
    } else if (props.type == "award") {
      return (
        <div>
          <label style={{ 
            marginTop: "10px", 
            textAlign: "center", 
            wordWrap: "break-word", 
            lineBreak: "anywhere",
            whiteSpace: "normal" 
          }}>
            ជួបគ្នានៅក្នុងកម្មវិធីប្រគល់ពានរង្វាន់ សហគ្រិនខ្មែរ 
            <br />
          <label htmlFor="">ឆ្នាំ២០២៤ នៅថ្ងៃទី២៥ ខែវិច្ឆិកា ឆ្នាំ២០២៤ </label>
          <br />
          <span>
          នៅមជ្ឈមណ្ឌលសន្និបាត
          និងពិព័រណ៍កោះពេជ្រ។
          </span>
            
          </label>
          

          <label style={{ 
            marginTop: "10px", 
            textAlign: "center", 
            wordWrap: "break-word", 
            lineBreak: "anywhere",
            whiteSpace: "normal" 
          }}>
            See you at Khmer Enterprise Award Night 2024
            <br />

            <span>
            on 25th November 2024 at Diamond Island
            
            </span>
            <br />
            <span>
            Convention and Exhibition Center.
            </span>

          </label>
        </div>
      );
    } else {
      return (
        <div>
          <label style={{ 
              marginLeft:'10px',
            marginTop: "10px", 
            textAlign: "left", 
            wordWrap: "break-word", 
            lineBreak: "anywhere",
            whiteSpace: "normal"
          }}>
            ជួបគ្នានៅក្នុង :
            <br />
          <span> - ពិធីសម្ពោធនៃ ទិវាប្រព័ន្ធអេកូឡូស៊ីសហគ្រិនភាព​  <br /><span> ឆ្នាំ២០២៤ នៅថ្ងៃទី២៤ ខែវិច្ឆិកា ឆ្នាំ២០២៤ </span>
          <br /><span>នៅមជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍កោះពេជ្រ។</span>
          </span>
          <br />
          <span>- កម្មវិធីប្រគល់ពានរង្វាន់ សហគ្រិនខ្មែរ ឆ្នាំ២០២៤ នៅថ្ងៃទី២៥
          ខែវិច្ឆិកា ឆ្នាំ២០២៤ </span>
          <br />
          <span>
          នៅមជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍កោះពេជ្រ។
          </span>
            
            
          </label>

          <label style={{ 
            marginLeft:'10px',
            paddingRight: "0px",
            width: "100%",
            marginTop: "10px", 
            textAlign: "justify", 
        
          }}>
          See you at :
          <br />
          <span> - The Opening Ceremony of Entrepreneurial 
            <br /> 
          <span>Ecosystem Day 2024 on 24th November 2024 at</span> 
          <br />
          <span>Diamond Island
          Convention and Exhibition Center.</span>
          </span>
          <br />
           <span> - Khmer Enterprise Award Night 2024
           </span> 
           <br />
           <span>on 25th November 2024 at Diamond Island</span>
           <br />
           <span> Convention and Exhibition Center.</span>
          </label>
        </div>
      );
    }
  }

  async function PrintDiv() {
    const element = document.getElementById("print"),
      canvas = await html2canvas(element),
      data = canvas.toDataURL("image/jpg"),
      link = document.createElement("a");

    link.href = data;
    var title = "";
    if (props.type == "open") {
      title = "ការបើកសម្ពោធទិវាប្រព័ន្ធអេកូឡូស៊ី";
    } else if (props.type == "award") {
      title = "កម្មវិធីប្រគល់ពានរង្វាន់ សហគ្រិនខ្មែរ ឆ្នាំ2024";
    } else {
      title =
        " ការបើកសម្ពោធទិវាប្រព័ន្ធអេកូឡូស៊ី និងកម្មវិធីប្រគល់ពានរង្វាន់ សហគ្រិនខ្មែរ";
    }

    link.download = "សំបុត្រ " + title + ".jpg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div>
      <br />
      <div
        id="print"
        style={{
          width: "370px",
          paddingLeft: "00px",
          paddingRight: "00px",
        }}
      >
        <div
          style={{
            borderStyle: "solid",
            borderColor: "lightgray",
            borderWidth: "0.1px",
          }}
        >
          <img
            src={imgFrameHeader()}
            style={{ objectFit: "contain", width: "100%" }}
          />

          <img
            src={logo}
            style={{
              objectFit: "contain",
              width: "140px",
              height: "100px",
              marginTop: "-90px",
              marginBottom: "30px",
            }}
          />
          <div style={{ paddingLeft: "40px", paddingRight: "40px" }}>
            {titleHeader()}
          </div>

          <div style={{ padding: "10px" }}>
            <QRCode
              size={256}
              style={{
                height: "auto",
                maxWidth: "100%",
                width: "50%",
              }}
              value={props.qrcode}
              viewBox={`0 0 256 256`}
            />
          </div>

          <div
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: "12px",
              paddingLeft: "40px",
              paddingRight: "40px",
              marginTop: "10px",
              color: "gray",
            }}
          >
            <div
              style={{
                width: "100%",

                textAlign: "center",
                display: "flex",
              }}
            >
              <div style={{ width: "270px" }}>{titleFooter()}</div>
            </div>
          </div>

          <img
            src={imgFrameFooter()}
            style={{ objectFit: "contain", width: "100%", marginTop: "-100px" }}
          />
        </div>
      </div>
      <div>
        <label
          style={{
            marginTop: "13px",
            marginBottom: "13px",
            fontSize: "13px",
          }}
        >
          សូមរក្សាទុកលេខកូដ QR ដើម្បីបង្ហាញនៅថ្ងៃកម្មវិធី <br /> Please save (Screenshot)
          the QR code to show it on the event day.
        </label>
      </div>

      <button
        type="button"
        onClick={() => PrintDiv()}
        className="btn btn-outline-success"
      >
        រក្សារទុក / Save Ticket
      </button>

      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Theme_Ticket;
