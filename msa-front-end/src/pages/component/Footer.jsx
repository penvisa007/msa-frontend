import React from "react";

function Footer(props) {
  return (
    <div className="container-fluid">
      <div
        style={{
          height: props.height,
          width: props.width,
          bottom: 0,
          position: "fixed",
          backgroundColor: props.backgroundColor,
          padding: props.padding,
          color: props.color,
          borderTop: "2px solid #dedede", 
          boxShadow: "0 2px 0 rgba(128, 128, 128, 0.2)" // Update this line
        }}
        className="row"
      >
        <div className="col-12 text-center">
          <p style={{ fontWeight: "600" }}>&copy; 2024 Cyber Tech System</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
