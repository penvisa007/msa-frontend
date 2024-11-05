import React from 'react'
import { FaSearch } from "react-icons/fa";

function Search_bar() {
  return (
    <div style={{justifyContent: 'right', display: 'flex' ,padding: '10px'}}>
        <label style={{paddingRight: '10px'}} htmlFor=""><FaSearch /></label>
      <input style={{ borderRadius: '5px' , width: '200px' , border: '1px solid gray' , height: '35px' , padding: '3px' , fontSize: '12px'}} type="search" id="search-bar" placeholder="Search..."></input>
    </div>
  )
}

export default Search_bar
