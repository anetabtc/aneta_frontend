import {useState} from "react";
import CheckMark from "./CheckMark";
import Mint from "./Mint";



function ConfirmationWindow() {

    const [conf, setConf] = useState("info");

    function Conf() {
        if(conf === "info"){
            return(
                <ConfirmationInfo/>
            )
        }else if(conf === "subm"){
            return(
                <ConfirmationSubmission/>
            )
        }
    }

   if (conf === "mint") {
       return (
           <Mint/>
       )
   }else {
       return (
           <div className="mainPopup">
               <div className="confContent">

                   <div className="confWindow">
                       <div className="confTitle">
                           Pay Bridge Fee
                       </div>
                       <Conf/>
                   </div>
               </div>
           </div>
       )
   }

    function ConfirmationInfo() {
        return (
            <div>
                <div className="confInfo">
                    <div className="flex-container">
                        <div className="left"><b>Request:</b></div>
                        <div className="right">
                            Mint 1.00 eBTC
                        </div>
                    </div>
                    <div className="flex-container">
                        <div className="left">Bridge Fee:</div>
                        <div className="right">
                            <img id="bit" src={require('../img/Ergo.png')}
                                 alt="aneta"/><b>3</b> ERG
                        </div>
                    </div>
                </div>
                <button type="button" id="confButton" onClick={() => setConf("subm")}><b>Confirm</b></button>

            </div>
        )
    }

    function ConfirmationSubmission() {
        return (
            <div className="confSubmission">
                <div>Bridge Fee Payment Submitted</div>
                <CheckMark/>
                <button type="button" id="confButton1"  onClick={() => setConf("mint")}><b>Continue</b></button>
            </div>
        )
    }



}





export default ConfirmationWindow;