import React, {useState} from 'react';
import './App.css';
import Bridge from './pages/Bridge/Bridge'
import Feedback from './pages/Feedback/Feedback'
import {Routes, Route} from "react-router-dom";
import Transactions from './pages/Transactions/Transactions.tsx'
import Dashboard from './pages/Dashboard/Dashboard'
import Navbar from "./layouts/Navbar.tsx";
import Menu from "./layouts/Menu"
import Kya from './layouts/Kya.js';

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
                {/* <img src={require('./assets/img/logo.png').default} className="mobLogo sun__mode" alt="aneta"/> */}
                <img src={require('./assets/img/logo_dark.png').default} className="mobLogo" alt="aneta"/>
                <div className="textMob">
                    <h2>The anetaBTC bridge is not yet available on mobile devices.</h2>
                </div>
                <div className="infoMob">
                    <h3>The Moonshine BTC wallet is required for wrapping BTC and is only available as a mobile wallet. Moonshine wallet can be downloaded below.</h3>
                </div>

                <div className="buttonMob">
                    <a target="_blank" href="https://moonshinewallet.com/">Get Moonshine BTC wallet</a>
                </div>

                <div>
                    <img src={require('./assets/img/back_mob.png').default} className="mobBack" alt="aneta"/>
                </div>
                
            </div>
        </div>
    )

}

export default App;
