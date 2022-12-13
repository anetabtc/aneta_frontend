import {useState} from "react";
import CheckMark from "./CheckMark";
import Mint from "./Mint.tsx";
import React from 'react';
import sendFeeFunction from "./sendFee";
import ErrorPayment from "./ErrorPayment";

///////////////////////////////
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// Add a second document with a generated ID.
import { addDoc, collection, getDocs } from "firebase/firestore"; 
const firebaseConfig = {
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

/////////////////////////////////

function ConfirmationWindow({eBTC, bridgeFeeUsd, bridgeFee}) {

    const [nautilusAddress, setNautilusAddress] = useState('');

    const address1 = ergo.get_change_address();
    address1.then((value) => {
        setNautilusAddress(value)
    });

    const [conf, setConf] = useState("info");
    const [txInfo, setTxInfo] = useState('');
    const [disable, setDisable] = useState(false);


    const refreshPage = () => {
        window.location.reload();
    }

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


        if (eBTC !== "0") {
            if (conf === "info") {
                return (
                    <ConfirmationInfo/>
                )
            } else if (conf === "subm") {
                return (
                    <ConfirmationSubmission/>
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
            <Mint eBTC={eBTC} bridgeFee={bridgeFee} nautilusaddress={nautilusAddress}/>
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
                            <img id="bit" src={require('../img/Ergo.png').default}
                                 alt="aneta"/><b>{Math.round(bridgeFee * 1000000) / 1000000}</b> ERG <div id="usd"
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
        result ? setConf("subm") : setConf("error")
    }

    async function ConfirmationSubmission() {
        /////////////////////
        console.log("Writing to Firebase")
        // TODO Write to DB
        try {
            const docRef = await addDoc(collection(db, "users"), {
            erg_address: nautilusAddress,
            amount: eBTC,
            datetime: new Date().getTime().toString(),
            erg_txid: "",
            info: "Mint Order Submitted"
            });

            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        /////////////////////////
        return (
            <div className="confSubmission">
                <div>Bridge Fee Payment Submitted</div>
                <CheckMark/>
                <button type="button" id="confButton1" className="confWRS"
                        onClick={() => setConf("mint")}
                ><b>Continue</b></button>
            </div>
        )
    }


}


export default ConfirmationWindow;