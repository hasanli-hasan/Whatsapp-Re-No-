import React from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import { IconButton } from '@material-ui/core'
import { Avatar } from '@material-ui/core'
import SidebarChat from './SidebarChat'

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                 <Avatar src="https://avatars0.githubusercontent.com/u/1299233?s=400&v=4"/>

                <div className="sidebar__headerRight">
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

            <div className="sidebar__search">
            <div className="sidebar__searchContainer">
              <SearchOutlined/>
              <input placeholder="Start or search new chat" type="text"/>
            </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
            </div>
        </div>

    )
}

export default Sidebar
