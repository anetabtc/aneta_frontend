import CheckMark from "./CheckMark";
import React from 'react';
import {useEffect, useRef, useState} from "react";


function BTCDeposit({eBTC, bridgeFee, nautilusaddress, btcTxID, anetaID}) { 

    const [contDisable, setContDisable] = useState(true)


    let data = {
        amount: 0,
        btc_vault_id: 0,
        btc_wallet_id: "Wallet1-testnet",
        network: "testnet",
        vault_id: 0,
        wallet_id: 0
    };
    console.log(JSON.stringify(data));



    useEffect(() => {
        setTimeout(function() {
            setContDisable(false)
        }, 20000);
    }, []);
    

    const refreshPage = () => {
        window.location.reload();
    }

     return(
        <div className="mainPopup">
            <div className="confContent" id="top_card">
                <div className="confWindow">
                    <div className="confTitle">
                        <div>
                        <img id="bitcoin" src={require('../img/Bitcoin.png').default} alt="aneta"/>
                            BTC Deposit</div>
                    </div>
                    <div className="confSubmission">
                    <div className="depositBTC">
                        <div>Bridge Fee Payment Submitted</div>
                        <div>eBTC will arrive in your wallet shortly.</div>
                        <div>Transactions can take around 10 minutes to process.</div>
                        <CheckMark/>
                        <button type="button" id="confButton1" disabled={contDisable} className="confWRS" onClick={refreshPage}><b>Continue</b></button>
                    </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}


export default BTCDeposit

