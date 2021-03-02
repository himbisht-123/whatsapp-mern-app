import React from 'react';
import './sidebar.css';
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Avatar,IconButton} from "@material-ui/core";
import {SearchOutlined} from "@material-ui/icons";
import SidebarChat from './sidebarChat';
function Sidebar(){
    return(
    <div className="sidebar">
      
      <div className="sidebar-header">
          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMbD4dkcvEoxPY9ASpzE5flD5UxXDwKpqMhA&usqp=CAU"/>
         <div className="sidebar-headerRight">
         <IconButton>
           <DonutLargeIcon/>
         </IconButton>
         <IconButton>
           <ChatIcon/>
         </IconButton>
         <IconButton>
           <MoreVertIcon/>
         </IconButton>
                  
         </div>
      </div>
      <div className="sidebar-search">
       <div className="sidebar-searchcontainer">
       <SearchOutlined/>
       <input placeholder="Search or start new chat" type="text"></input>
       </div>

      </div>

      <div className="sidebar-chats">
        <SidebarChat/>
        <SidebarChat/>
        <SidebarChat/>
      </div>
    
    </div>

    )
}
export default Sidebar;