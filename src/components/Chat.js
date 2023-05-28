import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, user, room, onClose }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
        const messageData = {
            room: room,
            author: user._id,
            username: user.name,
            message: currentMessage,
            time:(new Date(Date.now()).getHours()) + ":" + new Date(Date.now()).getMinutes(),
        };

        await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    const exitRoom = async () => {
        onClose(true)
        const messageData = {
            room: room,
            author: user._id,
            username: user.name,
            message: currentMessage,
            time:  (new Date(Date.now()).getHours()) + ":" + new Date(Date.now()).getMinutes(),
        };
        await socket.emit("exit_room", messageData);
        setCurrentMessage("");
        setMessageList([]);
    }

    useEffect(() => {
        const handler = (item) => {
            setMessageList((oldPosts) => [...oldPosts, item]);
          };
        socket.on("receive_message", handler);
        return () => socket.off('receive_message', handler);
    }, []);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <div className="flex">
                    <div class="blob green"></div> 
                    <p>
                        Sala: {room}
                    </p>
                </div>
                <button onClick={exitRoom}>&#x2715;</button>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                {messageList.map((messageContent, index) => {
                    return (
                    <div
                        className={ (user._id === messageContent.author ? "you" : (messageContent.author != null ? "other" : "system")) + ' message' }
                        key={index}
                    >
                        <div>
                            <div className="message-content">
                                <p>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                                <p id="time">{messageContent.time}</p>
                                <p id="author">{messageContent.username}</p>
                            </div>
                        </div>
                    </div>
                    );
                })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Escreva uma mensagem"
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={() => sendMessage()}>&#9658;</button>
            </div>
        </div>
     );
}

export default Chat;