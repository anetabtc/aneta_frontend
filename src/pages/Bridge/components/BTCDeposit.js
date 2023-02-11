import CheckMark from "./CheckMark";
import React from 'react';
import {useEffect, useRef, useState} from "react";


function BTCDeposit({eBTC}) {


    let data = {
        amount: 0,
        btc_vault_id: 0,
        btc_wallet_id: "Wallet1-testnet",
        network: "testnet",
        vault_id: 0,
        wallet_id: 0
    };
    console.log(JSON.stringify(data));




    const refreshPage = () => {
        window.location.reload();
    }

     return(
        <div className="mainPopup">
{/*             <div className="confContent" id="top_card">
                <div className="confWindow">
                    <div className="confTitle">
                        <div>
                        <img id="bitcoin" src={require('../../../assets/img/Bitcoin.png').default} alt="aneta"/>
                            BTC Deposit</div>
                    </div>
                    <div className="confSubmission">
                    <div className="depositBTC">
                        <div>Bridge Fee Payment Submitted</div>
                        <div>eBTC will arrive in your wallet shortly.</div>
                        <div>Transactions can take around 10 minutes to process.</div>
                        <CheckMark/>
                        <button type="button" id="confButton1" className="confWRS" onClick={refreshPage}><b>Continue</b></button>
                    </div>
                        
                    </div>
                </div>
            </div> */}
            <div className="confContent" id="top_card">
                <div className="confWindow btcDeposit">
                    <div className="titleBTC">BTC Deposit</div>
                    <div className="resultBridge">
                        <div className="amountBridge">
                            <div className="card">
                                <img id="bitcoin" src={require('../../../assets/img/Bitcoin.png').default} alt="btc"/>
                                <p>BTC</p>
                            </div>
                            <div>{eBTC}</div>
                        </div>
                        <div className="arrowBridge"><img src={require('../../../assets/img/arrow_blue.png').default} alt="arrow"/></div>
                        <div className="amountBridge">
                            <div className="card">
                                <img id="bitcoin" src={require('../../../assets/img/werg.png').default} alt="eBTC"/>
                                <p>eBTC</p>
                            </div>
                            <div>{Math.round((parseFloat(eBTC)*.995)*100000000)/100000000}</div>
                        </div>
                    </div>
                    <div className="text1">Thank you for sending your BTC Deposit.</div>
                    <div className="text1">eBTC will be sent to your Cardano wallet once your BTC deposit is confirmed. This process may take up to 24 hours.</div>
                    <div className="text2">The status and details of this transaction can be found in the “Transactions” tab on the side menu.</div>
                    <div className="text2"><b><div>Support</div></b><br/>If you need support, your BTC transaction ID will help us assist you.</div>
                    <button type="button" id="confButton1" className="confWRS" onClick={refreshPage}><b>Close</b></button>
                </div>
            </div>
        </div>
    )
}


export default BTCDeposit

