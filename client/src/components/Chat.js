import React from 'react'

function Chat(chats) {
    const messageRef = useRef();
    useEffect(() => {
        if (messageRef) {
          messageRef.current.addEventListener("DOMNodeInserted", event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: "smooth" });
          });
        }
        
      }, []);
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
