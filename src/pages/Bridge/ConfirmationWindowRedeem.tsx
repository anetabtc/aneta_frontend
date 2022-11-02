import {useState} from "react";
import CheckMark from "./CheckMark";
import { ErgoAddress, OutputBuilder, SColl, SByte, SConstant, SLong, TransactionBuilder } from "@fleet-sdk/core";
import * as buffer from "buffer";
window.Buffer = buffer.Buffer;



function ConfirmationWindowRedeem({eBTC, btcNetworkFeeUsd, btcNetworkFee, btcAddress}) {

    const refreshPage = () => {
        window.location.reload();
    }


    const [nautilusAddress, setNautilusAddress] = useState('');

    const address1 = ergo.get_change_address();
    address1.then((value) => {
        setNautilusAddress(value)
    });


    console.log(nautilusAddress + " NAUTILUS ADDRESS")




    const redeem = () => {
        // calling into the /mint endpoint in the backend




        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                amount: eBTC.toString(),
                btc_wallet_addr: btcAddress,
                network: "testnet",
                wallet_addr: nautilusAddress.toString()
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
        setConf("subm")
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
                            <img id="bit" src={require('../img/Ergo.png')}
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
                        // onClick={() => sendTransaction(eBTC, "9fsYtXufgnv65JRDMWEHqGcgSRwBxdfkJbmD6tUozxE1J9zE8Dw")}
                ><b>Confirm</b></button>

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

// export async function HandleVote() {
//     const tx = new Transaction([
//         {
//             funds: {
//                 ERG: 0,
//                 tokens: [ { amount: eBTC, tokenId: '60da81069ae38c78bda38a738abcfb6c31b58d2269b25db596f5783b19f77690'}]
//             },
//             toAddress: '9fsYtXufgnv65JRDMWEHqGcgSRwBxdfkJbmD6tUozxE1J9zE8Dw',
//             additionalRegisters: {}
//         }
//     ]);
//
//     const unsignedTx = await tx.build();
//
//     const signedTx = await ergo.sign_tx(unsignedTx.toJSON());
//
//     await ergo.submit_tx(signedTx);
// }



// const DEFAULT_EXPLORER_URL = "https://api-testnet.ergoplatform.com";
// const ERGONAMES_CONTRACT_ADDRESS = "gyGWQNQZJQ1qvJobi3aP6XGPd8vSAKAJwZowKLMhFQowQjCToww199LT2p7tpeZzJaWDfCeYUhWsw2qaEhCbpcxXpb898WPGz7LxKTWrscMrw8LLeJ6k7UTXDWznrnmkidBbXKVwGfCaHuUyyBBdTyf5rZREH1hw2bdky4hbGnDwjCVpsGnpNgY1ASwwsiDJGJ8GXyvfaZbuT5PaNKYqZxLBbUzRR2bLvm2aVEEBh5AWG77Mzy54nVxMAh1omNRgR8uf2MrMzficmqDPF9hrrk52fDyw6ixxMpwoMoaMovcqkhE3zreWdq3QetW758WPCTu6cEGLMhfMXXqB7jaCh3STPqtp8YayvXNcYBiStFTh2gfG9MSK6fdDdMPZ3QVN1gEhCkmuV2jF713JMRLaWiXTZTHTBr9XM6ympxNDGJpgVWb";
//
// export async function sendTransaction(price, receiverAddress, explorerUrl = DEFAULT_EXPLORER_URL) {
//     let currentHeight = await getCurrentHeight(explorerUrl);
//     let amountToSend = price + (1000000 * 2);
//     let inputs = await ergo.get_utxos(amountToSend);
//
//     const unsignedTransaction = new TransactionBuilder(currentHeight)
//         .from(inputs)
//         .to(new OutputBuilder(amountToSend, ERGONAMES_CONTRACT_ADDRESS)
//             .addTokens([
//                 { tokenId: "60da81069ae38c78bda38a738abcfb6c31b58d2269b25db596f5783b19f77690", amount: 1n }
//             ])
//         )
//         .sendChangeTo(receiverAddress)
//         .payMinFee()
//         .build("EIP-12");
//
//     let signedTransaction = await ergo.sign_tx(unsignedTransaction);
//     let outputZeroBoxId = signedTransaction.outputs[0].boxId;
//     let txInfo = await ergo.submit_tx(signedTransaction);
//     return { txId: txInfo, boxId: outputZeroBoxId };
// }
//
// async function getCurrentHeight(explorerUrl = DEFAULT_EXPLORER_URL) {
//     let url = `${explorerUrl}/api/v1/blocks?limit=1`;
//     let response = await fetch(url);
//     let json = await response.json();
//     return json.total;
// }


export default ConfirmationWindowRedeem;