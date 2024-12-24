import { useState, useEffect, useRef } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import '../style/chat.css'

const ChatRoom = () => {
    const [messages, setMessages] = useState([])
    const [messageInput, setMessageInput] = useState('')
    const params = useParams()
    const chatid = params.chatid
    const ws = useRef(null)

    useEffect(() => {
        ws.current = new WebSocket('wss://lifepod-server.up.railway.app')
        ws.current.onopen = () => {
            console.log('websocket opened')
        }
        ws.current.onmessage = async (event) => {
            const data = await event.data.text()
            const receivedMessage = JSON.parse(data)
            setMessages((prevMessages) => [...prevMessages, receivedMessage])
        }
        ws.current.onclose = () => {
            console.log('websocket closed')
        }
        ws.current.onerror = (error) => {
            console.log(error)
        }
        return () => {
            if (ws.current) {
                ws.current.close()
            }
        }
    }, [])

    const handleSendMessage = async () => {
        if (messageInput.trim()) {
            const newMessage = {
                message: messageInput,
                sender: 'helper',
                time: new Date().toLocaleTimeString(),
            }
            setMessageInput('')
            try {
                const response = await fetch(
                    'https://lifepod-production.up.railway.app/api/send/message',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            chatid: chatid,
                            sender: 'user',
                            message: messageInput,
                        }),
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )

                if (response.ok && ws.current && ws.current.readyState === WebSocket.OPEN) {
                    ws.current.send(JSON.stringify(newMessage))
                }
            } catch (err) {
                console.error('Error sending message:', err)
            }
        }
    }

    return (
        <div className="chatroom">
            <div className="message-container">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <span>{msg.time}</span> - <b>{msg.sender}:</b> {msg.message}
                    </div>
                ))}
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Message Box 1"
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    )
}

const ToggleDashboard = () => {
    const [userInfo, setUserInfo, render, rerender] = useOutletContext()
    const [toggleItems, setToggleItems] = useState(() => {
        return Object.fromEntries(
            Object.entries(userInfo.item_information).map(([key, value]) => [
                key,
                value === 'true',
            ])
        )
    })

    const handleToggleChange = async (itemName) => {
        setToggleItems((prevState) => {
            const updatedState = {
                ...prevState,
                [itemName]: !prevState[itemName],
            }
            return updatedState
        })

        try {
            const updatedState = {
                ...toggleItems,
                [itemName]: !toggleItems[itemName],
            }

            const convertedState = Object.fromEntries(
                Object.entries(updatedState).map(([key, value]) => [
                    key,
                    value ? 'true' : 'false',
                ])
            )

            const response = await fetch(
                'https://lifepod-production.up.railway.app/api/update/box/contents',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        boxid: 1,
                        boxContents: convertedState,
                    }),
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                }
            )

            if (response.ok) {
                rerender()
            }
        } catch (err) {
            console.error('Error updating toggle:', err)
        }
    }

    return (
        <div className="dashboard">
            <h2>Light Switches</h2>
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
