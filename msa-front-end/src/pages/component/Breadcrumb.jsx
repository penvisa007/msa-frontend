import React from 'react';
import { AiTwotoneFolderOpen } from "react-icons/ai";

const Breadcrumb = (props) => {
  
  return (
    <div style={{  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px', height: props.height, width: props.width, backgroundColor: props.backgroundColor, padding: props.padding }}>
        {props.breadcrumb.map((item, index) => {
          return (
            
           
              
               <label>
                 {(index === 0) ? (
                   <AiTwotoneFolderOpen style={{width: '18px', height: '18px' , marginBottom: '5px'}}/>
                 ) : null}
                 <label style={{marginLeft: '5px'}} htmlFor="">
                   {item} {index == props.breadcrumb.length - 1 ? "" : "/"}
                 </label>
                 {/* <a style={{textDecoration: 'none', color : index == props.breadcrumb.length - 1 ? "gray" : "darkblue" }} key={index} href={item.route}>{item.name} {index == props.breadcrumb.length - 1 ? "" : "/ "}</a> */}
               </label>
               
          
              
            
            
          )

        })}
    </div>
  );
};

export default Breadcrumb;