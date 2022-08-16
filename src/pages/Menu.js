import react from "react";
import {Link} from "react-router-dom"

function Menu() {
    return (
        <div className="sidebar">
            <div className="sidebar_content">
                <ul className="menuList">
            <Link to="/" className="menu-item">
                <div className="menu-icon">
                    <img src={require('./img/bridge.png')} id="Vector" />
                </div>
                <li className="btnM">
                    Bridge
                </li></Link>
            <Link to="/transactions" className="menu-item">
                <div className="menu-icon">
                    <img src={require('./img/transactions.png' )} id="Vector"/>
                </div>
                <li className="btnM">
                    Transactions
                </li></Link>
            <Link to="/dashboard" className="menu-item">
                <div className="menu-icon">
                    <img src={require('./img/dashboard.png')} id="Vector"/>
                </div>
                <li className="btnM">
                    Dashboard
                </li></Link>
            <Link to="/vault" className="menu-item">
                <div className="menu-icon">
                    <img src={require('./img/vault.png')} id="Vector"/>
                </div>
                <li className="btnM">
                    Vault
                </li></Link>
            </ul>
                <br/>
            <hr id="menuHR"></hr>
            <ul>
            <Link to="/feedback" className="menu-item">
                <div className="menu-icon">
                    <img src={require('./img/feedback.png')} id="Vector"/>
                </div>
                <li className="btnM">
                    Feedback
                </li></Link>
            <Link to="/docs" className="menu-item">
                <div className="menu-icon">
                    <img src={require('./img/docs.png')} id="Vector"/>
                </div>
                <li className="btnM">
                    Docs
                </li></Link>
            </ul>
            </div>
        </div>
    )
}
export default Menu;
