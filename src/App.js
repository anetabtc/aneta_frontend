import React, {useState} from 'react';
import './App.css';
import Bridge from './pages/Bridge/Bridge'
import Feedback from './pages/Feedback/Feedback'
import Vault from './pages/Vault/Vault'
import {Routes, Route} from "react-router-dom";
import Navbar from './pages/Navbar.tsx'
import Transactions from './pages/Transactions/Transactions.tsx'
import Dashboard from './pages/Dashboard/Dashboard'
import Menu from './pages/Menu'
import Mint from "./pages/Bridge/Mint";
import CountdownTimer from "./pages/Bridge/CountdownTimer";
import QRCode from "react-qr-code";

function App() {

    return (
        <div className="App" >
            <div className="Main">
                <Navbar />
                <Menu />

                <Routes><Route path="/" element={<Bridge />} /></Routes>
                <Routes><Route path="/transactions" element={<Transactions />} /></Routes>
                <Routes><Route path="/dashboard" element={<Dashboard />} /></Routes>
                <Routes><Route path="/feedback" element={<Feedback />} /></Routes>
                <Routes><Route path="/vault" element={<Vault />} /></Routes>

            </div>
            <div className="mobile">
                <img src={require('./pages/img/logo.png').default} className="mobLogo sun__mode" alt="aneta"/>
                <img src={require('./pages/img/logo_dark.png').default} className="mobLogo dark__mode" alt="aneta"/>
                <h2 className="textMob">anetaBTC is not yet available on mobile devices. Please use anetaBTC on desktop.</h2>
            </div>
        </div>
    )

}

export default App;
