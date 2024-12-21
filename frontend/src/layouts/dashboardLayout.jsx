import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar'
export default function DashboardLayout() {
    return <div className="dashboard-page-container">
        <Sidebar/>
        <Outlet/>
    </div>

}