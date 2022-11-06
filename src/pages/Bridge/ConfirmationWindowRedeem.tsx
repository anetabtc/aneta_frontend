import {useState} from "react";
import CheckMark from "./CheckMark";
import React from 'react';
import {ErgoAddress, OutputBuilder, TransactionBuilder} from "@fleet-sdk/core";

const DEFAULT_EXPLORER_URL = "https://api-testnet.ergoplatform.com";

function ConfirmationWindowRedeem({eBTC, btcNetworkFeeUsd, btcNetworkFee, btcAddress}) {

    const refreshPage = () => {
        window.location.reload();
    }


    const [conf, setConf] = useState("info");

    function NameTrans() {
        if (eBTC !== "0") {
            return (
                <div>
                    Pay Bridge Fee
                </div>
            )
        } else {
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
        if (eBTC !== "0" || btcAddress !== '') {
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
                        Your requested transaction is not within current quantity limits. Please try again.
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
                <button type="button" id="confButton"
                        onClick={() => setConf("subm")}
                ><b>Confirm</b></button>

            </div>
        )
    }

    function ConfirmationSubmission() {
        sendTransaction(eBTC, "9fsYtXufgnv65JRDMWEHqGcgSRwBxdfkJbmD6tUozxE1J9zE8Dw", btcAddress).then(r => {
            setConf("subm")
        })
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

export async function sendTransaction(price, receiverAddress, btcAddress, explorerUrl = DEFAULT_EXPLORER_URL) {

    const [nautilusAddress, setNautilusAddress] = useState('');

    const address1 = ergo.get_change_address();
    address1.then((value) => {
        setNautilusAddress(value)
    });

    console.log("Start")
    console.log(price + " Price")
    console.log(receiverAddress + " address")
    let currentHeight = await getCurrentHeight(explorerUrl);
    let amountToSend = price * 1000000000;
    let tokenAmountToSend = price * 100000000;
    let feeAmount = price * 33 * 1000000000;
    let fee = feeAmount;
    console.log(amountToSend + " Amount to send")
    console.log(feeAmount + " Fee to send")
    let inputs = await ergo.get_utxos();


    console.log(inputs + "Input")


    const unsignedTransaction = new TransactionBuilder(currentHeight)
        .from(inputs)
        .to(new OutputBuilder(amountToSend, receiverAddress)
            .addTokens([
                {tokenId: "60da81069ae38c78bda38a738abcfb6c31b58d2269b25db596f5783b19f77690", amount: tokenAmountToSend}
            ])
        )
        .sendChangeTo(nautilusAddress).payFee(fee)
        .build("EIP-12");

    console.log(unsignedTransaction)


    let signedTransaction = await ergo.sign_tx(unsignedTransaction);
    console.log(signedTransaction)

    let outputZeroBoxId = signedTransaction.outputs[0].boxId;
    let txInfo = await ergo.submit_tx(signedTransaction);

    console.log(txInfo, outputZeroBoxId)



    const redeem = () => {
        // calling into the /mint endpoint in the backend

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                amount: price.toString(),
                btc_wallet_addr: btcAddress,
                network: "testnet",
                wallet_addr: nautilusAddress.toString(),
                txId: txInfo.toString()
            }).toString()
        };

        fetch("http://localhost:5004/redeem", requestOptions)
            .then(res => res.json())
            .then((response) => {
                console.log("Response from /redeem endpoint: " + JSON.stringify(response))
                let taskId = response['data']['task_id']
                const interval = setInterval(() => {
                    fetch("http://localhost:5004/statusRedeem/" + taskId)
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

    if(txInfo){
        redeem()
    }

}

async function getCurrentHeight(explorerUrl = DEFAULT_EXPLORER_URL) {
    console.log("currentheight")
    let url = `${explorerUrl}/api/v1/blocks?limit=1`;
    let response = await fetch(url);
    let json = await response.json();
    console.log(json)
    return json.total;
}




export default ConfirmationWindowRedeem;