import React, { useEffect , useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaHome } from "react-icons/fa";
import { FaCalendarPlus } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { TbBrandDatabricks } from "react-icons/tb";
import { LuClipboardSignature } from "react-icons/lu";
import { IoPeopleOutline } from "react-icons/io5";
import { RiUserSearchLine } from "react-icons/ri";
import { BiSolidCustomize } from "react-icons/bi";
import { IoQrCodeOutline } from "react-icons/io5";
import { BiSolidReport } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";

import { Fragment } from 'react';
import { MdEvent } from "react-icons/md";
import { FaUserTie } from "react-icons/fa6";
import { CiLink } from "react-icons/ci";
import { IoSettings } from "react-icons/io5";
import { LuScanLine } from "react-icons/lu";
import Event_Both_Report from "../dashboard/All_Event_Report/Event_Both_Report";
import CookieAndSession from "../Helper/CookieAndSession";

function SidebarLeft(props) {

  var cookieAndSession = new CookieAndSession()

  const file_login = cookieAndSession.Cookie_Get_As_Object('login')


  function is_active(localPath) {
    var isCurrentPage = window.location.pathname;

    if (isCurrentPage == localPath) {
      return true;
    } else {
      return false;
    }

  }

  const [menuItems , set_menuItems] = useState([])

  useEffect(() => {

    check_permission()

  },[])

  function check_permission(){
    var temp = []
    temp.push(  
      { label: "Summary",
          icon: <FaHome />,
          active: is_active("/msa/admin/dashbord"),
          onClick: () => (window.location.href = "/msa/admin/dashbord"),
        }
      )
      temp.push(
        {
          label: "URL/Link",
          submenu: [
            {
              label: "All URL/Link",
              icon: <CiLink />,
              active: is_active("/msa/admin/url/all"),
              onClick: () => (window.location.href = "/msa/admin/url/all"),
            },
          
          ],
          icon: <LuClipboardSignature />,
          active: is_active("/registration-url"),
          onClick: () => (window.location.href = "/registration-url"),
        },
      )

      temp.push(
        {
          label: "Guest",
          icon: <FaUsers />,
          submenu: [
            {
              label: "Registered",
              icon: <IoPeopleOutline />,
              active: is_active("/msa/admin/guests/registered"),
              onClick: () => (window.location.href = "/msa/admin/guests/registered"),
            },
            {
              label: "Event",
              icon: <RiUserSearchLine />,
              active: is_active("/msa/admin/guest/list/by-event"),
              onClick: () => (window.location.href = "/msa/admin/guest/list/by-event"),
            },
          ],
        },
      )
      if(file_login.data_server.user.role == "Administrator"){
        //Push all
        temp.push(
          {
            label: "User",
            icon: <FaUserTie />,
            active: is_active("/msa/admin/user/list"),
            onClick: () => (window.location.href = "/msa/admin/user/list"),
          },
          {
            label: "Events",
            icon: <MdEvent />,
            submenu: [
              // {
              //   label: "New Event",
              //   icon: <FaCalendarPlus />,
              //   active: is_active("/msa/admin/event-new"),
              //   onClick: () => (window.location.href = "/msa/admin/event-new"),
              // },
              // {
              //   label: "Coming",
              //   icon: <GrInProgress />,
              //   active: is_active("/event-coming"),
              //   onClick: () => (window.location.href = "/event-coming"),
              // },
              // {
              //   label: "Completed",
              //   icon: <AiOutlineCheck />,
              //   active: is_active("/event-completed"),
              //   onClick: () => (window.location.href = "/event-completed"),
              // },
              {
                label: "All Event",
                icon: <TbBrandDatabricks />,
                active: is_active("/msa/admin/event"),
                onClick: () => (window.location.href = "/msa/admin/event"),
              },
            ],
          },
        
          {
            label: "Setting",
            icon: <IoSettings />,
            
            submenu: [
              {
                label: "QR Scanner",
                icon: <LuScanLine  />,
                active: is_active("/msa/admin/qr_scanner"),
                onClick: () => (window.location.href = "/msa/admin/qr_scanner"),
                
              }
            ],
          },

        )
      }

      temp.push(
        {
          label: "Customization",
          icon: <BiSolidCustomize />,
          submenu: [
            {
              label: "All Event Report",
              icon: <BiSolidReport />,
              active: is_active("/msa/admin/customization/event/guest/both-pending"),
              onClick: () => (window.location.href = "/msa/admin/customization/event/guest/both-pending"),
            },
           
          ],
        },
      )
       

        //Complete

    set_menuItems(temp)

  }

  

  const renderMenuItems = (items) => {
    return items.map((item, index) => (
      <Fragment key={index}>
        {item.submenu ? (
          <SubMenu  label={item.label} icon={item.icon} style={{ display: 'flex', justifyContent: 'space-between' }}>
            {renderMenuItems(item.submenu)}
          </SubMenu>
        ) : (
          <MenuItem  {...item}>{item.label}</MenuItem>
        )}
      </Fragment>
    ));
  };
  
 


  return (
   <div
     style={{
      height: props.height,
    width: props.width,
    position: props.position,
    backgroundColor: props.backgroundColor,
    paddingTop: props.paddingTop,
    paddingBottom: props.paddingBottom,
    justifyContent: "center",
    alignItems: "center",
    marginTop: props.marginTop,
    overflowY: "auto",
    boxShadow: "10 10 10px rgba(0, 0, 0, 0.1)", // Add this line
    borderRight: "1px solid #ddd", // Optional
    scrollbarWidth: "none", // Add this line
    msOverflowStyle: "none", // Add this line
     }}
   >
     <Sidebar style={{ backgroundColor: "white", fontSize: "15px", padding: "0px" }}>
       <Menu style={{ backgroundColor: "white" }}
         menuItemStyles={{
           button: ({ level, active, disabled }) => {
             if (level === 0)
               return {
                 color: disabled ? "gray" : "dark",
                 backgroundColor: active ? "lightgray" : undefined,
               };
           },
         }}
       >
         {renderMenuItems(menuItems)}
       </Menu>
     </Sidebar>
   </div>
  );
}

export default SidebarLeft;
