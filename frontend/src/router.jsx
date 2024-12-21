import {
    Route,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';
import Layout from './layouts/layout.jsx';
import OnboardLayout from './layouts/onboardLayout.jsx';
import DashboardLayout from './layouts/dashboardLayout.jsx';

import IndexPage from './pages/index.jsx';
import ErrorPage from './pages/404.jsx';
import AboutPage from "./pages/about.jsx";
import SignUpPage from "./pages/signUp.jsx";
import LoginPage from "./pages/signIn.jsx";
import DashboardPage from "./pages/dashboard.jsx"
import ChatPage from './pages/chat.jsx';


const Router = createBrowserRouter(
    createRoutesFromElements(<>
        <Route element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/about" element={<AboutPage/>} />
            <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route element={<OnboardLayout/>}>
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
        </Route>
        <Route element={<DashboardLayout/>}>
            <Route path="/dashboard" element={<DashboardPage/>} />
            <Route path="/chat/:chatID" element={<ChatPage/>} />
        </Route>
        </>
    )
);

export default Router;