import {
    Route,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';
import Layout from './layouts/layout.jsx';
import OnboardLayout from './layouts/onboardLayout.jsx';

import IndexPage from './pages/index.jsx';
import ErrorPage from './pages/404.jsx';
import AboutPage from "./pages/about.jsx";
import SignUpPage from "./pages/signUp.jsx";
import LoginPage from "./pages/signIn.jsx";


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
        </>
    )
);

export default Router;