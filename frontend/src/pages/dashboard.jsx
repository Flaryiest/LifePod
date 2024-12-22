import { useState, useEffect, useRef } from "react"
import { useOutletContext } from "react-router-dom"
import ws from "ws"
import "../style/dashboard.css"

export default function Dashboard() {
    const [userInfo, setUserInfo, render, rerender] = useOutletContext()
    console.log(userInfo, "in dashboard")

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
            <div className="dashboard-page-header-container">
                <h1 className="dashboard-page-header">Welcome Back</h1>
                <h2 className="dashboard-page-sub-header">Good look and do your best!</h2>
            </div>
            <div className="dashboard-top-row-container">
                <div className="dashboard-top-row">
                    <div className="dashboard-card">Card 1</div>
                    <div className="dashboard-card">Card 2</div>
                </div>
            </div>
            <div className="dashboard-main">
                <div className="dashboard-left-column">
                    <h2>Connected Boxes</h2>
                    <div className="dashboard-card">Box 1</div>
                    <div className="dashboard-card">Box 2</div>
                    <div className="dashboard-card">Box 3</div>
                </div>
                <div className="dashboard-center-content">
                    <div className="dashboard-current-events">
                        <h2>Current Events</h2>
                        <div className="dashboard-event">Event 1</div>
                        <div className="dashboard-event">Event 2</div>
                        <div className="dashboard-event">Event 3</div>
                    </div>
                </div>
                <div className="dashboard-right-column">
                    <div className="dashboard-alerts">
                        <h2 className="dashboard-sub-header">Alerts</h2>
                        <div className="dashboard-alert">Alert 1</div>
                        <div className="dashboard-alert">Alert 2</div>
                    </div>
                    <div className="dashboard-notes">
                        <h2 classname="dashboard-sub-header">Notes</h2>
                        <div className="dashboard-note">Note 1</div>
                        <div className="dashboard-note">Note 2</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

