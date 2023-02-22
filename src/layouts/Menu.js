import {Link} from "react-router-dom"
import React, {useState, useEffect} from 'react';
import { constants } from "buffer";

function Menu() {

/*     const [activeB, setActiveB] = useState(true);
    const [activeT, setActiveT] = useState(false);
    const [activeD, setActiveD] = useState(false);
    const [activeF, setActiveF] = useState(false); */

    window.addEventListener("load", function(){

        let menuActive = document.querySelectorAll(".menu-item")


            for(let i=0; i<menuActive.length; i++){
                
                if(menuActive[i] == window.location.href){
                    menuActive[i].classList.add("active")
                }
        
                menuActive[i].addEventListener("click", function(){
                    for(const items of menuActive){
                        
                        items.classList.remove("active")
                    }
                    this.classList.add("active");
                    })
                }
    })

/*     useEffect(()=>{



    }) */


    //{`menu-item ${active?'active':''}`}
    

    return (
        <div className="sidebar" id="sidebar">
            <div className="menuTop">
                <img src={require('../assets/img/logo.png').default} alt="aneta" className="imgLogoMenu"/>
                <div className="net">
                    Testnet
                </div>
            </div>
            <div className="sidebar_content">
                <ul className="menuList">
            <Link to="/" className="menu-item">
                <div className="menu-icon">
                    <img src={require('../assets/img/bridge_dark.png').default} alt="aneta" id="Vector" className="dark__mode"/>
                    <img src={require('../assets/img/bridge.png').default} alt="aneta" id="Vector" className="sun__mode"/>
                </div>
                <li className="btnM">
                    Bridge
                </li></Link>
            <Link to="/transactions" className="menu-item">
                <div className="menu-icon">
                    <img src={require('../assets/img/transactions_dark.png').default} alt="aneta" id="Vector" className="dark__mode"/>
                    <img src={require('../assets/img/transactions.png').default} alt="aneta" id="Vector" className="sun__mode"/>
                </div>
                <li className="btnM">
                    Transactions
                </li></Link>
            <Link to="/dashboard" className="menu-item">
                <div className="menu-icon">
                    <img src={require('../assets/img/dashboard_dark.png').default} alt="aneta" id="Vector" className="dark__mode"/>
                    <img src={require('../assets/img/dashboard.png').default} alt="aneta" id="Vector" className="sun__mode"/>
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
                    <img src={require('../assets/img/feedback_dark.png').default} alt="aneta" id="Vector" className="dark__mode"/>
                    <img src={require('../assets/img/feedback.png').default} alt="aneta" id="Vector" className="sun__mode"/>
                </div>
                <li className="btnM">
                    Feedback
                </li>
            </Link>
                <a href="https://docs.anetabtc.io/" target="_blank" className="menu-item">
            <div className="menu-icon">
                    <img src={require('../assets/img/docs_dark.png').default} alt="aneta" id="Vector" className="dark__mode"/>
                    <img src={require('../assets/img/docs.png').default} alt="aneta" id="Vector" className="sun__mode"/>
                </div>
                <li className="btnM">
                    Docs
                    <img src={require('../assets/img/link_dark.png').default} alt="aneta" id="linkImg" className="dark__mode"/>
                    <img src={require('../assets/img/link.png').default} alt="aneta" id="linkImg" className="sun__mode"/>
                </li>
            </a>
            </ul>
            <div className="socialMedia">
                <a href="https://twitter.com/anetaBTC" className="menu-icon">
                    <img src={require('../assets/img/twitter.png').default} alt="aneta" id="Vector-sm"/>
                </a>
                <a href="https://discord.com/invite/ScXG76dJXM" className="menu-icon">
                    <img src={require('../assets/img/discord.png').default} alt="aneta" id="Vector-sm"/>
                </a>
                <a href="https://t.me/anetaBTC" className="menu-icon">
                    <img src={require('../assets/img/telegram.png').default} alt="aneta" id="Vector-sm"/>
                </a>
                <a href="https://github.com/anetabtc" className="menu-icon">
                    <img src={require('../assets/img/git.png').default} alt="aneta" id="Vector-sm"/>
                </a>
            </div>
            </div>
        </div>
    )
}
export default Menu;
