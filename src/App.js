import Layout from './components/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Dashboard from './pages/MIS'
import Previous from "./pages/CheckingLogs"
import Profile from './pages/Subscription'
import Login from './pages/Login'
import ViewContext from "./pages/ViewContext"
import Contest from './pages/Unsubscription'
import CheckSpecificLogs from './pages/CheckSpecificLogs'
import CheckDailyBillingLogs from './pages/CheckDailyBillingLogs'
import CheckHourlyLogs from './pages/CheckHourlyLogs'
import Price from './pages/Price'
function App() {
    return (
        <BrowserRouter>
       
                <Routes>
                    <Route path='/Home' element={<Home />} />
                    <Route path='/mis-data' element={<Dashboard />} />
                    <Route path='/Previous' element={<Previous />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path="/ViewContext/:id" element={<ViewContext />} />
                    <Route path='/' element={<Login />} />
                    <Route path='/checkHourlylogs' element={<CheckHourlyLogs />} />
                    <Route path='/Contest' element={<Contest />} />
                    <Route path='/price' element={<Price />} />
                    <Route path='/checkSpecificLogs' element={<CheckSpecificLogs />} />
                    <Route path='/checkDailyBillingLogs' element={<CheckDailyBillingLogs />} />
                
                </Routes>
        
        </BrowserRouter>

        
        
    )
}

export default App
