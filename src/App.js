import React, {useState} from 'react';
import './App.css';
import Bridge from './pages/Bridge/Bridge'
import Feedback from './pages/Feedback/Feedback'
import {Routes, Route} from "react-router-dom";
import Transactions from './pages/Transactions/Transactions.tsx'
import Dashboard from './pages/Dashboard/Dashboard'
import Navbar from "./layouts/Navbar.tsx";
import Menu from "./layouts/Menu"
import Kya from './Kya';

function App() {

    return (
        <div className="App" >
            <div className="Main">
                <Navbar />
                <Menu />
                <Kya />

                <Routes><Route path="/" element={<Bridge />} /></Routes>
                <Routes><Route path="/transactions" element={<Transactions />} /></Routes>
                <Routes><Route path="/dashboard" element={<Dashboard />} /></Routes>
                <Routes><Route path="/feedback" element={<Feedback />} /></Routes>

            </div>
            <div className="mobile">
                <img src={require('./assets/img/logo.png').default} className="mobLogo sun__mode" alt="aneta"/>
                <img src={require('./assets/img/logo_dark.png').default} className="mobLogo dark__mode" alt="aneta"/>
                <h2 className="textMob">anetaBTC is not yet available on mobile devices. Please use anetaBTC on desktop.</h2>
            </div>
        </div>
    )

}

export default App;
