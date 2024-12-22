import { useOutletContext } from "react"
import "../style/chat.css"
export default function ChatPage() {
    const [userInfo, setUserInfo, render, rerender] = useOutletContext()
    return <div className="chat-page">
        <div className="chat-container">
            <div className="chat">

            </div>
            <div classname="control-panel">
                
            </div>
        </div>
    </div>
}