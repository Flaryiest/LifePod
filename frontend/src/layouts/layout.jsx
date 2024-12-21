import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar.jsx"
export default function Layout() {    
    return <>
        <Navbar/>
        <Outlet/>
    </>
    
}