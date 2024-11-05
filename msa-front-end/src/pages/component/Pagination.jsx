import React, { useState } from "react";




const Pagination = ({ data, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const pages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  const calculatePageNumbers = (currentPage, itemsPerPage, data) => {
    const pages = Math.ceil(data.length / itemsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handleNextPage = () => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
      handlePageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      handlePageChange(currentPage -  1);
    }
  };
  const renderPages = () => {
    const pagesArray = [];
    for (let i = 1; i <= pages; i++) {
      pagesArray.push(
        <button
          style={{
            margin: "0 5px",
            backgroundColor: currentPage === i ? "lightgray" : "white",
            borderRadius: "5px",
            borderWidth: "1px",
            fontSize: "12px",
            height: "25px",
            width: "25px",
          }}
          key={i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pagesArray;
  };


  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
    
  };


  return (
    <div>
      <div
        style={{
        width: "100%",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
          marginTop: "10px",
        }}
        className="pagination"
      >

        <div>
            <label style={{ fontSize: "12px" }} htmlFor="">Rows Per Page</label>
            <select
            style={{
                borderColor: "black",
                borderRadius: "5px",
                borderWidth: "1px",
                fontSize: "12px",
                height: "25px",
                width: "auto",
                color: "gray",
                marginRight: "10px",
                marginLeft: "10px",
            }}
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            </select>


            <label style={{ fontSize: "12px" }} htmlFor="">Total: {data.length}</label>
        </div>

        <div>
        <button
          style={{
            borderColor: "black",
            borderRadius: "5px",
            borderWidth: "1px",
            fontSize: "12px",
            height: "25px",
            width: "auto",
            color: "gray",
          }}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPages()}
        <button
          style={{
            borderColor: "black",
            borderRadius: "5px",
            borderWidth: "1px",
            fontSize: "12px",
            height: "25px",
            width: "auto",
            color: "gray",
          }}
          onClick={handleNextPage}
          disabled={currentPage === pages}
        >
          Next
        </button>
        
        </div>

       
      </div>
    </div>
  );
};

export default Pagination;