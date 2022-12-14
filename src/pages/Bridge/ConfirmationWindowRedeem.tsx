import {useState} from "react";
import CheckMark from "./CheckMark";
import React from 'react';
import sendPaymentFunction from "./sendPayment";
import redeem from "./redeem";
import ErrorPayment from "./ErrorPayment";


function ConfirmationWindowRedeem({eBTC, btcNetworkFeeUsd, btcNetworkFee, btcAddress}) {

    const [nautilusAddress, setNautilusAddress] = useState('');

    const address1 = ergo.get_change_address();
    address1.then((value) => {
        setNautilusAddress(value)
    });

    const refreshPage = () => {
        window.location.reload();
    }

    const [txInfo, setTxInfo] = useState('');


    const [conf, setConf] = useState("info");
    const [error, setError] = useState(false);

    const [disable, setDisable] = useState(false);

    const [contDisable, setContDisable] = useState(true);


    function NameTrans() {
        if (eBTC > 0.000000001) {
            return (
                <div>
                    Pay Bridge Fee
                </div>
            )
        }  else {
            return (
                <div>
                    <div className="error1">
                        Unavailable Quantity
                    </div>
                </div>
            )
        }
    }

    function Conf() {
        if (eBTC > 0.000000001) {
            if (conf === "info") {
                return (
                    <ConfirmationInfo/>
                )
            }
            else if (conf === "concl") {
                console.log("txInfo before redeem", txInfo)
                redeem(eBTC, btcAddress, nautilusAddress, txInfo)
                setTimeout(function() {
                    setContDisable(false)
                }, 20000);
                return (
                    <DontWorryMess/>
                )
            }

        } else {
            return (
                <div>
                    <div className="error">
                        Your requested transaction is not within current quantity limits. Please try again.
                    </div>
                    <button type="button" id="confButton1" onClick={refreshPage}><b>Try again</b></button>
                </div>
            )

        }

    }


    return (
        error ? <ErrorPayment/> : <div className="mainPopup">
            <div className="confContent">

                <div className="confWindow">
                    <div className="confTitle">
                        <NameTrans/>
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
                            <img id="bit" src={require('../img/Ergo.png').default}
                                 alt="aneta"/><b>{Math.round(btcNetworkFee * 1000) / 1000}</b> ERG <div id="usd"
                                                                                                        className="confBF">=
                            $ {Math.round(100 * btcNetworkFeeUsd) / 100}</div>
                        </div>
                    </div>
                    <div className="flex-containerB" id="confBA">
                        <div className="left"><b>BTC Address:</b> <br/>
                            <div className="confBF">{btcAddress}</div>
                        </div>
                        <div className="right"/>

                    </div>
                </div>
                <button type="button" id="confButton" disabled={disable}
                        onClick={() => send()}
                ><b>Confirm</b></button>

            </div>
        )
    }

    async function send() {
        setDisable(true)
        const result = await sendPaymentFunction(eBTC, btcAddress, nautilusAddress)
        setTxInfo(result)
        console.log("res", result)
        result ? setConf("concl") : setError(true)
    }

    function DontWorryMess() {
        return (
            <div>
                <div className="dntwrr">Your BTC will be sent to your BTC wallet shortly</div>
                <div className="dntwrr">This may take up to 24 hours. Don???t worry, your funds are safe :)</div>
                <div className="dntwrr">
                    The status of your wrap and unwrap requests can be found under the transaction tab on the menu
                </div>
                <button type="button" id="confButton1" disabled={contDisable} onClick={refreshPage} ><b>Continue</b></button>
            </div>
        )
    }


}





export default ConfirmationWindowRedeem;
