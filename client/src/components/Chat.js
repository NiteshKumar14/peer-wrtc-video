import React from 'react'

function Chat(chats) {
    
    return (
       
        <div className="content" ref={messageRef}>
          {chats.map(chat => {
            return (
              <p key={chat.time} className={chat.classType}>
                {chat.person_id}
                {chat.message}
              </p>
            );
          })}
        </div>
    )
}

export default Chat
