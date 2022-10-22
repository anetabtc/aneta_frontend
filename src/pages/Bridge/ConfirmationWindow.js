import {useState} from "react";
import CheckMark from "./CheckMark";
import Mint from "./Mint";



function ConfirmationWindow({eBTC, bridgeFeeUsd, bridgeFee}) {

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
                    <div className="flex-containerB">
                        <div className="left"><b>Request:</b></div>
                        <div className="right">
                            Mint {eBTC} eBTC
                        </div>
                    </div>
                    <div className="flex-containerB">
                        <div className="left">Bridge Fee:</div>
                        <div className="right">
                            <img id="bit" src={require('../img/Ergo.png')}
                                 alt="aneta"/><b>{bridgeFee}</b> ERG <div id="usd" className="confBF">= $ {bridgeFeeUsd}</div>
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
                <button type="button" id="confButton1" className="confWRS"  onClick={() => setConf("mint")}><b>Continue</b></button>
            </div>
        )
    }



}





export default ConfirmationWindow;