import react from "react";
import {Link} from "react-router-dom"

function Menu() {
    return (
        <div className="sidebar">
            <div className="sidebar_content">
                <ul className="menuList">
            <Link to="/"><li className="btnM">Bridge</li></Link>
            <Link to="/transactions"><li className="btnM">Transactions</li></Link>
            <Link to="/dashboard"><li className="btnM">Dashboard</li></Link>
            <Link to="/vault"><li className="btnM">Vault</li></Link>
            </ul>
            <hr id="menuHR"></hr>
            <ul>
            <Link to="/feedback"><li className="btnM">Feedback</li></Link>
            <Link to="/docs"><li className="btnM">Docs</li></Link>
            </ul>
            </div>
        </div>
    )
}
export default Menu;
