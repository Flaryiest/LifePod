import { useState, useEffect } from "react"

export default function Dashboard() {
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

    return <div className="dashboard-page">
        <div className="dashboard">
            
        </div>
    </div>
}