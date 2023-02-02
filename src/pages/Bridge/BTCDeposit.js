import CheckMark from "./CheckMark";
import React from 'react';
import {useEffect, useRef, useState} from "react";
import redeem from "./redeem";


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

    const mint = () => {

        console.log(anetaID, "aneta Id")
        // calling into the /mint endpoint in the backend
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                amount: eBTC.toString(),

                network: "testnet",
                wallet_addr: nautilusaddress.toString(),
                doc_id: anetaID.toString()
            }).toString()
        };

        fetch("http://localhost:5004/mint", requestOptions)
            .then(res => res.json())
            .then((response) => {
                console.log("Response from /mint endpoint: " + JSON.stringify(response))
                let taskId = response['data']['task_id']
                const interval = setInterval(() => {
                    fetch("http://localhost:5004/statusMint/" + taskId)
                        .then(res1 => res1.json())
                        .then((statusResponse) => {
                            console.log("Status response: " + JSON.stringify(statusResponse))
                            if (statusResponse['data']['task_status'] == 'finished') {
                                clearInterval(interval);
                                if (statusResponse['data']['task_result']['success'] === true) {
                                    console.log("Resulting operation is success!")
                                    refreshPage()
                                } else {
                                    console.log("Resulting operation did not complete successfully!")
                                }
                            } else if (statusResponse['data']['task_status'] == 'failed') {
                                clearInterval(interval);
                                console.log("Resulting operation has failed to finish!")
                            } else {
                                console.log("trying again...")
                            }
                        })
                }, 5000);
            })
    }



    useEffect(() => {


        mint()


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

