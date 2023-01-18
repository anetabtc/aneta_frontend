import CheckMark from "./CheckMark";
import React from 'react';
import {useEffect, useRef, useState} from "react";
function BTCDeposit({eBTC, bridgeFee, nautilusaddress, btcTxID}) {





    let data = {
        amount: 0,
        btc_vault_id: 0,
        btc_wallet_id: "Wallet1-testnet",
        network: "testnet",
        vault_id: 0,
        wallet_id: 0
    };
    console.log(JSON.stringify(data));



    const mint = () => {

        console.log(btcTxID, "BTC Tx Id")
        // calling into the /mint endpoint in the backend
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                amount: eBTC.toString(),
                // btc_tx_addr: btcAddress.toString(),
                network: "testnet",
                wallet_addr: nautilusaddress.toString()
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
            <div className="confContent">
                <div className="confWindow">
                    <div className="confTitle">
                        <div>
                            {/*<img id="bit" src={require('../img/Bitcoin.png').default}*/}
                            {/*      alt="aneta"/>*/}
                            BTC Deposit</div>
                    </div>
                    <div className="confSubmission">
                        <div className="textBTC"></div>
                        <CheckMark/>
                        <button type="button" id="confButton1" className="confWRS" onClick={refreshPage}><b>Continue</b></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BTCDeposit