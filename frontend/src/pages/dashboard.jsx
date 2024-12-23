import { useState, useEffect, useRef } from 'react'
import { useOutletContext, Link } from 'react-router-dom'
import ws from 'ws'
import '../style/dashboard.css'

export default function Dashboard() {
    const [userInfo, setUserInfo, render, rerender] = useOutletContext()
    console.log(userInfo, 'in dashboard')

    useEffect(() => {
        ws.current = new WebSocket('http://localhost:8080')
        ws.current.onopen = () => {
            console.log('websocket opened')
        }
        ws.current.onmessage = (event) => {
            console.log('received message')
            triggerRender((prevRender) => prevRender + 1)
        }
        ws.current.onclose = () => {
            console.log('websocket closed')
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
                <h2 className="dashboard-page-sub-header">
                    Good look and do your best!
                </h2>
            </div>
            <div className="dashboard-top-row-container">
                <div className="dashboard-top-row">
                    <div className="dashboard-card">
                        <h3 className="dashboard-stat-header">0</h3>
                        <p className="dashboard-stat-sub-header">
                            People Helped Today
                        </p>
                    </div>
                    <div className="dashboard-card">
                        <h3 className="dashboard-stat-header">88</h3>
                        <p className="dashboard-stat-sub-header">
                            Total People Helped
                        </p>
                    </div>
                </div>
            </div>
            <div className="dashboard-main">
                <div className="dashboard-left-column">
                    <h2 className="dashboard-card-header">Connected Boxes</h2>
                    <div className="dashboard-card">
                        <h2 className="dashboard-box-header">Box 1</h2>
                        <p className="dashboard-card-text">
                            Connection Status: Connected
                        </p>
                        <div className="dashboard-box-icon-container">
                            <Link to="/dashboard/settings/box/1">
                                <img src="/assets/connection.svg"></img>
                            </Link>
                            <Link to="/dashboard/chat/1">
                                <img
                                    src="/assets/chat.svg"
                                    className="chat-icon"
                                ></img>{' '}
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="dashboard-center-content">
                    <div className="dashboard-current-events">
                        <h2 className="dashboard-card-header dashboard-event-header">
                            Urgent Events
                        </h2>
                        <div className="dashboard-event">Event 1</div>
                    </div>
                </div>
                <div className="dashboard-right-column">
                    <div className="dashboard-alerts">
                        <h2 className="dashboard-sub-header">Alerts</h2>
                        <div className="dashboard-alert">Alert 1</div>
                        <div className="dashboard-alert">Alert 2</div>
                    </div>
                    <div className="dashboard-notes">
                        <h2 className="dashboard-sub-header">Notes</h2>
                        <div className="dashboard-note">Note 1</div>
                        <div className="dashboard-note">Note 2</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
