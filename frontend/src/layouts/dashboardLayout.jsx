import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar'
import { useState, useEffect } from 'react'
export default function DashboardLayout() {
    const [userInfo, setUserInfo] = useState(null)
    const [loading, setLoading] = useState(true)
    const [render, triggerRender] = useState(0)
    useEffect(() => {
        async function getInfo() {
            const response = await fetch('https://lifepod-production.up.railway.app/api/user', {
                method: 'POST',
                credentials: 'include',
            })
            const userInfo = await response.json()
            console.log(userInfo)
            setUserInfo(userInfo)
        }
        getInfo()
        console.log('pog')
    }, [render])

    useEffect(() => {
        if (userInfo) {
            setLoading(false)
        } else {
            setLoading(true)
        }
    }, [userInfo, render])

    function rerender() {
        triggerRender((prevState) => (prevState += 1))
    }
    if (!loading) {
        return (
            <div className="dashboard-page-container">
                <Sidebar />
                <Outlet context={[userInfo, setUserInfo, render, rerender]} />
            </div>
        )
    }

    if (loading) {
        return (
            <div className="dashboard-page-container">
                <Sidebar />
            </div>
        )
    }
}
