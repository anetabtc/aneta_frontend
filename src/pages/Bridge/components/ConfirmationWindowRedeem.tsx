import {useState} from "react";
import CheckMark from "./CheckMark";
import React from 'react';
import sendPaymentFunction from "../services/transactions/sendPayment";
import ErrorPayment from "./ErrorPayment";
import RedeemConfWindow from "./RedeemConfWindow";




function ConfirmationWindowRedeem({eBTC, btcNetworkFeeUsd, btcNetworkFee, btcAddress}) {

    const [nautilusAddress, setNautilusAddress] = useState(JSON.parse(localStorage.getItem('address')));


    const refreshPage = () => {
        window.location.reload();
    }

    const [txInfo, setTxInfo] = useState('');


    const [conf, setConf] = useState("info");
    const [error, setError] = useState(false);

    const [disable, setDisable] = useState(false);
    const [contDisable, setContDisable] = useState(true);

    const [spinConf, setSpinConf] = useState(false)
    

/*      function NameTrans() {
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
    } */

    function Conf() {
        //if (eBTC > 0.000000001) {
            if (conf === "info") {
                return (
                    <ConfirmationInfo/>
                )
            }
            else if (conf === "concl") {
                return (
                    <RedeemConfWindow eBTC={eBTC} btcAddress={btcAddress} nautilusAddress={nautilusAddress} txInfo={txInfo}/>
                )
            }else if (conf === "wait"){
                return (
                    <Wait/>
                )
            }

        //} 
        /* else {
            return (
                <div>
                    <div className="error">
                        Your requested transaction is not within current quantity limits. Please try again.
                    </div>
                    <button type="button" id="confButton1" onClick={refreshPage}><b>Try again</b></button>
                </div>
            )

        } */

    }


    return (
        error ? <ErrorPayment/> : <div className="mainPopup">
            <div className="confContent">

                <div className="confWindow">
{/*                     <div className="confTitle">
                        <NameTrans/>
                    </div> */}
                    <Conf/>
                </div>
            </div>
        </div>
    )

    function closeWait(){
        setConf("info")
    }

    function Wait(){
        return (                    
            <div className="redeem waiting">
                <div className="titleBTC underLine">Waiting for confirmation</div>
                <div id="close">
                    <img src={require('../../../assets/img/dark_close.png').default} alt="X" onClick={closeWait} />
                </div>
                <div className='spinner waiting'></div>
                <div className="text">Unwrapping {eBTC} eBTC.</div>
                <div className="text">Confirm this transaction in your wallet.</div>
            </div>)
    }



    function ConfirmationInfo() {

        const [toolTip, setToolTip] = useState(false);

        function onToolTip(){
            setToolTip(true)
        }

        function ofToolTip(){
            setTimeout(()=>{
                setToolTip(false);
            },1000);
        }



        return (
            <div className="redeem">
                <div className="titleBTC">Confirm Unwrap</div>
                    <div id="close">
                        <img src={require('../../../assets/img/dark_close.png').default} alt="X" onClick={refreshPage} />
                    </div>
                <div className="resultBridge">
                    <div className="amountBridge">
                            <div className="card">
                            <img id="bitcoin" src={require('../../../assets/img/werg.png').default} alt="eBTC"/>
                            <p>eBTC</p>
                        </div>
                        <div>{eBTC}</div>
                    </div>
                    <div className="arrowBridge"><img src={require('../../../assets/img/arrow_blue.png').default} alt="arrow"/></div>
 
                    <div className="amountBridge">
                        <div className="card">
                            <img id="bitcoin" src={require('../../../assets/img/Bitcoin.png').default} alt="btc"/>
                            <p>BTC</p>
                        </div>
                        <div>{Math.round(((parseFloat(eBTC)*.995)-.0001)*100000000)/100000000}</div>
                    </div>
                </div>
                
                <div className="bridgeFee unWrap confirm">
                    <div className='feeItem'>
                        <div>Bridge Fee:
                            <img src={require('../../../assets/img/idark_svg.png').default}
                            alt="info" height={"16px"} className='dark__mode' onMouseOver={onToolTip} onMouseOut={ofToolTip}/>
                            <img src={require('../../../assets/img/ilight_svg.png').default}
                            alt="info" height={"16px"} className='sun__mode' onMouseOver={onToolTip} onMouseOut={ofToolTip}/>
                            </div>
                            {toolTip ? <div className="toolTip">
                                0.05% of eBTC Quantity<br/>Uwrapped + 0.0001 eBTC<br/>+ 0.05 ERG 
                                <div className="flecha-down"></div>
                            </div> : ""}
                            

                        <div>
                        {Math.round(((parseFloat(eBTC)*.005)+0.0001)*100000000)/100000000} eBTC + 0.05 ERG
                        </div>
                    </div>
                </div>
                <div className="text2">BTC destination address:
                    <br/>{btcAddress}
                </div>

{/*                 <div className="confInfo">
                    <div className="flex-containerB">
                        <div className="left"><b>Request:</b></div>
                        <div className="right">
                            Unwrap {eBTC} eBTC
                        </div>
                    </div>
                    <div className="flex-containerB" id="confBA">
                        <div className="left">BTC Network Fee:</div>
                        <div className="right">
                            <img id="bit" src={require('../../../assets/img/Ergo.png').default}
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
                </div> */}
                <button type="button" id="confButton" disabled={disable}
                        onClick={() => send()}
                >{spinConf ? <div className='spinner conf'></div>:""}<b>Confirm Unwrap</b></button>

            </div>
        )
    }

    async function send() {
        setSpinConf(true)
        setTimeout(()=>{
            setSpinConf(false);
            setConf("wait")
        },2000);
        setDisable(true)
        const result = await sendPaymentFunction(eBTC, btcAddress, nautilusAddress)
        setTxInfo(result)
        console.log("res", result)
        result ? setConf("concl") : setError(true)
    }




}





export default ConfirmationWindowRedeem;