import React, { useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import '../style/chat.css'
const ChatRoom = () => {
    const [userInfo, setUserInfo, render, rerender] = useOutletContext()
    const [messages, setMessages] = useState([])
    const [messageInput, setMessageInput] = useState('')
    const params = useParams()
    const chatid = params.chatid

    const handleSendMessage = async () => {
        if (messageInput.trim()) {
            const newMessage = {
                message: messageInput,
                time: new Date().toLocaleTimeString(),
            }

            setMessages([...messages, newMessage])
            const response = await fetch('http://localhost:3000/api/send/message', {
                method: 'POST',
                body: JSON.stringify({
                    chatid: chatid,
                    sender: 'user',
                    message: messageInput,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).catch((err) => console.error('Error sending message:', err))

            setMessageInput('')
        }
    }

    return (
        <div className="chatroom">
            <div className="message-container">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <span>{msg.time}</span>: {msg.message}
                    </div>
                ))}
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    )
}
const ToggleDashboard = () => {
    const [toggleItems, setToggleItems] = useState({
        gauze: false,
        gloves: false,
        aspirin: false,
        epi_pen: false,
        benadryl: false,
        scissors: false,
        medical_tape: false,
        rubbing_alcohol: false,
    })

    const handleToggleChange = (itemName) => {
        console.log(toggleItems)
        setToggleItems((prevState) => {
            const updatedState = {
                ...prevState,
                [itemName]: !prevState[itemName],
            }
            fetch('/update-toggle', {
                method: 'POST',
                body: JSON.stringify({
                    item: itemName,
                    status: updatedState[itemName],
                }),
                headers: { 'Content-Type': 'application/json' },
            }).catch((err) => console.error('Error updating toggle:', err))

            return updatedState
        })
    }

    return (
        <div className="dashboard">
            <h2>Toggle Dashboard</h2>
            <div className="toggle-container">
                {Object.keys(toggleItems).map((item) => (
                    <div key={item} className="toggle-card">
                        <h3>{item.charAt(0).toUpperCase() + item.slice(1)}</h3>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={toggleItems[item]}
                                onChange={() => handleToggleChange(item)}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function ChatPage() {
    return (
        <div className="chat-page">
            <div className="left-panel">
                <ChatRoom />
            </div>
            <div className="right-panel">
                <ToggleDashboard />
            </div>
        </div>
    )
}
