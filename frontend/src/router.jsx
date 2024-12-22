import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom'
import Layout from './layouts/layout.jsx'
import OnboardLayout from './layouts/onboardLayout.jsx'
import DashboardLayout from './layouts/dashboardLayout.jsx'

import IndexPage from './pages/index.jsx'
import ErrorPage from './pages/404.jsx'
import AboutPage from './pages/about.jsx'
import SignUpPage from './pages/signUp.jsx'
import LoginPage from './pages/signIn.jsx'
import DashboardPage from './pages/dashboard.jsx'
import ChatPage from './pages/chat.jsx'
import HistoryPage from './pages/history.jsx'
import SettingsPage from './pages/settings.jsx'

const Router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<Layout />}>
                <Route index element={<IndexPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Route>
            <Route element={<OnboardLayout />}>
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/dashboard/chat/:chatid" element={<ChatPage />} />
                <Route path="/dashboard/history" element={<HistoryPage />} />
                <Route path="/dashboard/settings" element={<SettingsPage />} />
            </Route>
        </>
    )
)

export default Router
