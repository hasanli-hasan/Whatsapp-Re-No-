import React from 'react'
import './SidebarChat.css'
import { Avatar } from '@material-ui/core'



const SidebarChat = () => {
    return (
        <div className="sidebarChat">
            <Avatar src="https://avatars0.githubusercontent.com/u/1299233?s=400&v=5"/>
            <div className="sidebarChat__info">
                <h2>Room name</h2>
                <p>messages</p>
            </div>
        </div>
    )
}

export default SidebarChat
