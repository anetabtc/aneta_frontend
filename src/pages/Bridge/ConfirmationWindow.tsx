import {useEffect, useState} from "react";
import CheckMark from "./CheckMark";
import Mint from "./Mint.tsx";
import React from 'react';
import sendFeeFunction from "./sendFee";
import ErrorPayment from "./ErrorPayment";

///////////////////////////////
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAnalytics} from "firebase/analytics";
// Add a second document with a generated ID.
import {addDoc, collection, getDocs} from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

/////////////////////////////////



function ConfirmationWindow({eBTC, bridgeFeeUsd, bridgeFee, btcAddress}) {

    const [nautilusAddress, setNautilusAddress] = useState(JSON.parse(localStorage.getItem('address')));


    const [conf, setConf] = useState("info");
    const [txInfo, setTxInfo] = useState('');
    const [disable, setDisable] = useState(false)
    const [anetaId, setAnetaId] = useState('')


    const refreshPage = () => {
        window.location.reload();
    }

    function NameTrans() {
        if (eBTC > 0.000000001) {
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
    
        const explorerUrl = `https://explorer.ergoplatform.com/en/addresses/${txInfo}`

        function closeDiv(){
            const info = document.getElementById("txInfo");
            const father = info.parentNode;
            father.removeChild(info);
        }

        if (eBTC > 0.000000001) {
            if (conf === "info") {
                return (
                    <ConfirmationInfo/>
                )
            } else if (conf === "subm") {
                return (
                    <div>
                        <div id="txInfo">
                            <div id="close"><img src={require('../img/dark_close.png').default} alt="X" onClick={closeDiv} />
                            </div>
                            <div className="txLeft">
                                <img src={require('../img/success.png').default} alt="success" />
                            </div>
                            <div className="txRight">
                                <h3>Transaction Successful</h3>
                                <button><a href={explorerUrl} target="_blank">View on Explorer</a></button>
                            </div>
                             
                        </div>
                        <ConfirmationSubmission/>  
                    </div>
                                 
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

    if (conf === "mint") {
        return (
            <Mint eBTC={eBTC} bridgeFee={bridgeFee} nautilusaddress={nautilusAddress} btcAddress={btcAddress}/>
        )
    } else if(conf === "error") {
        return(
            <ErrorPayment/>
        )
    }else {
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
    }

    function ConfirmationInfo() {
        return (
            <div>
                <div id="close"><img src={require('../img/dark_close.png').default} alt="X" onClick={refreshPage} /></div>
                <div className="confInfo">
                    <div className="flex-containerB">
                        <div className="left"><b>Request:</b></div>
                        <div className="right">
                            <img id="bit1" src={require('../img/werg.png').default}
                                 alt="eBTC"/> Mint {Math.round(eBTC * 1000000) / 1000000} eBTC
                        </div>
                    </div>
                    <div className="flex-containerB">
                        <div className="left">Bridge Fee:</div>
                        <div className="right">
                            <img id="bit" src={require('../img/Ergo_dark.png').default}alt="aneta" className='dark__mode'/>
                            <img id="bit" src={require('../img/Ergo.png').default}alt="aneta" className='sun__mode'/>
                            <b>{Math.round(bridgeFee * 1000000) / 1000000}</b> ERG <div id="usd"
                                                                                                  className="confBF">=
                            $ {Math.round(1000000 * bridgeFeeUsd) / 1000000}</div>
                        </div>
                    </div>
                </div>
                <button disabled={disable} type="button" id="confButton"onClick={() => send()}><b>Confirm</b></button>

            </div>
        )
    }

    async function send(){
        setDisable(true)
        const result = await sendFeeFunction(bridgeFee, nautilusAddress)
        setTxInfo(result)
        console.log("Tx ID: ", txInfo, "res: ", result)
        result ? setConf("subm") : setConf("error")
    }

    function ConfirmationSubmission() {

        /////////////////////
        console.log("Writing to Firebase")
        console.log("Tx ID:", txInfo)
        // TODO Write to DB
        useEffect(() => {
            writeToDB(nautilusAddress, eBTC, txInfo)
        })
        /////////////////////////

        return (
            <div className="confSubmission">
                <div className="paymentSucces">
                    <div>Bridge Fee Payment Submitted</div>
                    <CheckMark/>
                    <button type="button" id="confButton1" className="confWRS"
                            onClick={() => setConf("mint")}
                    ><b>Continue</b></button>
                </div>
            </div>
        )
    }




}

async function writeToDB(nautilusAddress, eBTC, txID) {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            erg_address: nautilusAddress,
            amount: eBTC,
            datetime: new Date().toUTCString(),
            erg_txid: txID,
            info: "Mint Order Submitted"
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }


}


export default ConfirmationWindow;