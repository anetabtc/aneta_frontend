import react from "react";
import {Link} from "react-router-dom"

function Navbar() {
    return (
        <div id="navbar_menu"> 
        <div id="imgLogonav">
           <img src={require('./img/logo.png')} className="imgLogo" />
           </div>
           <div id="head">
           <button type="button" id="notConnect_wallet">Connect Wallet</button>
        <button type="button" id="menuButton">Wallet(backend)</button>
        <button type="button" id="menuButton">Address</button>
        <button type="button" id="menuButton_sun"><img src={require('./img/Vector.png')} id="Vector" /></button>
           </div>
        </div>


    )
}
export default Navbar;
