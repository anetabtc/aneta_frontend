import {useState} from "react";
import CheckMark from "./CheckMark";
import Mint from "./Mint";


function ConfirmationWindowRedeem({eBTC, btcNetworkFeeUsd, btcNetworkFee, btcAddress}) {

    const refreshPage = () => {
        window.location.reload();
    }

    const [conf, setConf] = useState("info");

    function Conf() {
        if (eBTC !== "0" || btcAddress!=='') {
            if (conf === "info") {
                return (
                    <ConfirmationInfo/>
                )
            } else if (conf === "subm") {
                return (
                    <ConfirmationSubmission/>
                )
            } else if (conf === "concl") {
                return (
                    <DontWorryMess/>
                )
            }
        } else {
            return (
                <div>
                    <div className="error">
                        Address and amount of eBTC cannot be null. Please, try again!
                    </div>
                    <button type="button" id="confButton1" onClick={refreshPage}><b>Try again</b></button>
                </div>
            )

        }
    }


        return (
            <div className="mainPopup">
                <div className="confContent">

                    <div className="confWindow">
                        <div className="confTitle">
                            UnwrapRequest
                        </div>
                        <Conf/>
                    </div>
                </div>
            </div>
        )


        function ConfirmationInfo() {
            return (
                <div>
                    <div className="confInfo">
                        <div className="flex-containerB">
                            <div className="left"><b>Request:</b></div>
                            <div className="right">
                                Unwrap {eBTC} eBTC
                            </div>
                        </div>
                        <div className="flex-containerB" id="confBA">
                            <div className="left">BTC Network Fee:</div>
                            <div className="right">
                                <img id="bit" src={require('../img/Ergo.png')}
                                     alt="aneta"/><b>{btcNetworkFee}</b> ERG <div id="usd" className="confBF">=
                                $ {btcNetworkFeeUsd}</div>
                            </div>
                        </div>
                        <div className="flex-containerB" id="confBA">
                            <div className="left"><b>BTC Address:</b> <br/>
                                <div className="confBF">{btcAddress}</div>
                            </div>
                            <div className="right"/>

                        </div>
                    </div>
                    <button type="button" id="confButton" onClick={() => setConf("subm")}><b>Confirm</b></button>

                </div>
            )
        }

        function ConfirmationSubmission() {
            return (
                <div className="confSubmission">
                    <div className="textUR"></div>
                    <CheckMark/>
                    <button type="button" id="confButton1" className="confWRS" onClick={() => setConf("concl")}>
                        <b>Continue</b></button>
                </div>
            )
        }

        function DontWorryMess() {
            return (
                <div>
                    <div className="dntwrr">Your BTC will be sent to your BTC wallet shortly</div>
                    <div className="dntwrr">This may take up to 24 hours. Don’t worry, your funds are safe :)</div>
                    <div className="dntwrr">
                        The status of your wrap and unwrap requests can be found under the transaction tab on the menu
                    </div>
                    <button type="button" id="confButton1" onClick={refreshPage}><b>Continue</b></button>
                </div>
            )
        }


    }


    export default ConfirmationWindowRedeem;