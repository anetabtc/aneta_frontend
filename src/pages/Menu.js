import react from "react";
import {Link} from "react-router-dom"

function Menu() {
    return (
        <div className="sidebar">
            <div className="net">
                Testnet
            </div>
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
                    <img src={require('./img/link.png')} id="linkImg"/>
                </li>
            </Link>
            </ul>
            <div className="socialMedia">
                <a href="https://twitter.com/anetaBTC" className="menu-icon">
                    <img src={require('./img/twitter.png')} id="Vector"/>
                </a>
                <a href="https://discord.com/invite/ScXG76dJXM" className="menu-icon">
                    <img src={require('./img/discord.png')} id="Vector"/>
                </a>
                <a href="https://t.me/anetaBTC" className="menu-icon">
                    <img src={require('./img/telegram.png')} id="Vector"/>
                </a>
                <a href="https://github.com/anetabtc" className="menu-icon">
                    <img src={require('./img/git.png')} id="Vector"/>
                </a>
            </div>
            </div>
        </div>
    )
}
export default Menu;
