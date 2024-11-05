import React from 'react'
import { FaTrashCan } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import Button from 'react-bootstrap/Button';

function DesignColumnActionButton(props) {
  return (

    <div className="div">
        <Button hidden = {props.is_delete == true ? false : true} variant="danger" size="sm" onClick={(e) => props.event_delete(e)}> <FaTrashCan /> </Button>{' '}
        <Button hidden = {props.is_edit == true ? false : true} variant="primary" size="sm" onClick={(e) => props.event_edit(e)}> <FaPen/> </Button>{' '}
        <Button hidden = {props.is_view == true ? false : true} variant="secondary" size="sm" onClick={(e) => props.event_view(e)}><FaEye /> </Button>{' '}
    </div>

  )
}   

export default DesignColumnActionButton
