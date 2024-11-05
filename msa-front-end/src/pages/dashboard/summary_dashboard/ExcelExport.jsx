import React from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx/xlsx";
import "bootstrap/dist/css/bootstrap.css";
import { SiMicrosoftexcel } from "react-icons/si";

const ExcelExport = ({ data, fileName, title }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <button
      style={{
        fontSize: "14px",
        textAlign: "left",
        width: "100%",
        marginBottom: "10px",
        justifyContent: "space-between",
        color: "green",
      }}
      type="button"
      onClick={exportToExcel}
      class="btn btn-outline-light"
    >
      <SiMicrosoftexcel style={{ marginRight: "10px", color: "green" , width: '18px', height: '18px'}} />
      {title}
    </button>
  );
};

export default ExcelExport;
