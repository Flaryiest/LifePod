import { useState, useEffect, useRef } from "react"
import ws from "ws"
import "../style/dashboard.css"
export default function Dashboard() {
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        async function getInfo() {
            const response = await fetch("http://localhost:3000/api/user", {
                method: "POST",
                credentials: "include"
            })
            console.log(response, "test")
            setUserInfo(response)
        }
        getInfo()
        console.log("pog")

    }, [])

    useEffect(() => {
        ws.current = new WebSocket("http://localhost:8080")
        ws.current.onopen = () => {
            console.log("websocket opened")
        }
        ws.current.onmessage = (event) => {
            console.log("received message")
            triggerRender(prevRender => prevRender + 1)
        }
        ws.current.onclose = () => {
            console.log("websocket closed")
        }
        ws.current.onerror = (error) => {
            console.log(error)    
        }
        return () => {
            ws.current.close()
        }
        
    }, [])
    return (
        <div className="dashboard-page">
          <div className="dashboard-connected-boxes">
            <h2>Connected Boxes</h2>
            <div className="dashboard-card">Box 1</div>
            <div className="dashboard-card">Box 2</div>
            <div className="dashboard-card">Box 3</div>
          </div>
          <div className="dashboard-current-events">
            <h2>Current Events</h2>
            <div className="dashboard-event">Event 1</div>
            <div className="dashboard-event">Event 2</div>
            <div className="dashboard-event">Event 3</div>
          </div>
          <div className="dashboard-alerts">
            <h2>Alerts</h2>
            <div className="dashboard-alert">Alert 1</div>
            <div className="dashboard-alert">Alert 2</div>
          </div>
        </div>
      );
}