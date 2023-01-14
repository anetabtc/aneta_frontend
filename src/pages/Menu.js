import {Link} from "react-router-dom"
import React, {useState, useEffect} from 'react';
import { constants } from "buffer";
import Navbar from "./Navbar";

function Menu() {
    //const [dark, setDark] = useState("");
    //const reactUseState = ()=>{ 
    //    setInterval(()=>document.body.classList.contains('dark') ? setDark(true): setDark(false),200)
    //    }; colocar como onLoad


    return (
        <div className="sidebar" id="sidebar">
            <div className="menuTop">
                <img src={require('./img/logo.png').default} alt="aneta" className="imgLogoMenu"/>
                <div className="net">
                    Testnet
                </div>
            </div>
            <div className="sidebar_content">
                <ul className="menuList">
            <Link to="/" className="menu-item">
                <div className="menu-icon">
                    <img src={require('./img/bridge_dark.png').default} alt="aneta" id="Vector" className="dark__mode"/>
                    <img src={require('./img/bridge.png').default} alt="aneta" id="Vector" className="sun__mode"/>
                </div>
                <li className="btnM">
                    Bridge
                </li></Link>
            <Link to="/transactions" className="menu-item">
                <div className="menu-icon">
                    <img src={require('./img/transactions_dark.png').default} alt="aneta" id="Vector" className="dark__mode"/>
                    <img src={require('./img/transactions.png').default} alt="aneta" id="Vector" className="sun__mode"/>
                </div>
                <li className="btnM">
                    Transactions
                </li></Link>
            <Link to="/dashboard" className="menu-item">
                <div className="menu-icon">
                    <img src={require('./img/dashboard_dark.png').default} alt="aneta" id="Vector" className="dark__mode"/>
                    <img src={require('./img/dashboard.png').default} alt="aneta" id="Vector" className="sun__mode"/>
                </div>
                <li className="btnM">
                    Dashboard
                </li></Link>


            </ul>
                <br/>
            <hr id="menuHR"></hr>
            <ul>
            <Link to="/feedback" className="menu-item">
                <div className="menu-icon">
                    <img src={require('./img/feedback_dark.png').default} alt="aneta" id="Vector" className="dark__mode"/>
                    <img src={require('./img/feedback.png').default} alt="aneta" id="Vector" className="sun__mode"/>
                </div>
                <li className="btnM">
                    Feedback
                </li>
            </Link>
                <a href="https://docs.anetabtc.io/" target="_blank"  className="menu-item">
            <div className="menu-icon">
                    <img src={require('./img/docs_dark.png').default} alt="aneta" id="Vector" className="dark__mode"/>
                    <img src={require('./img/docs.png').default} alt="aneta" id="Vector" className="sun__mode"/>
                </div>
                <li className="btnM">
                    Docs
                    <img src={require('./img/link_dark.png').default} alt="aneta" id="linkImg" className="dark__mode"/>
                    <img src={require('./img/link.png').default} alt="aneta" id="linkImg" className="sun__mode"/>
                </li>
            </a>
            </ul>
            <div className="socialMedia">
                <a href="https://twitter.com/anetaBTC" className="menu-icon">
                    <img src={require('./img/twitter.png').default} alt="aneta" id="Vector-sm"/>
                </a>
                <a href="https://discord.com/invite/ScXG76dJXM" className="menu-icon">
                    <img src={require('./img/discord.png').default} alt="aneta" id="Vector-sm"/>
                </a>
                <a href="https://t.me/anetaBTC" className="menu-icon">
                    <img src={require('./img/telegram.png').default} alt="aneta" id="Vector-sm"/>
                </a>
                <a href="https://github.com/anetabtc" className="menu-icon">
                    <img src={require('./img/git.png').default} alt="aneta" id="Vector-sm"/>
                </a>
            </div>
            </div>
        </div>
    )
}
export default Menu;
