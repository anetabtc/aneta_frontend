import {useEffect, useState} from "react";
import CheckMark from "./CheckMark";
import QRWindow from "./QRWindow.tsx";
import React from 'react';
import ErrorPayment from "./ErrorPayment";

///////////////////////////////
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAnalytics} from "firebase/analytics";
// Add a second document with a generated ID.
import {addDoc, collection, getDocs} from "firebase/firestore";
import firebaseConfig from "../../../firebase/firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

/////////////////////////////////


function ConfirmationWindow({eBTC, bridgeFeeUsd, bridgeFee, btcAddress}) {

    const [nautilusAddress, setNautilusAddress] = useState(JSON.parse(localStorage.getItem('address')));


    const [conf, setConf] = useState("info");
    const [disable, setDisable] = useState(false);


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

        if (eBTC > 0.000000001) {
            if (conf === "info") {
                return (
                    <ConfirmationInfo/>
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
            <QRWindow eBTC={eBTC} bridgeFee={bridgeFee} nautilusaddress={nautilusAddress}/>
        )
    } else if (conf === "error") {
        return (
            <ErrorPayment/>
        )
    } else {
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
                <div id="close"><img src={require('../../../assets/img/dark_close.png').default} alt="X" onClick={refreshPage}/>
                </div>
                <div className="confInfo">
                    <div className="flex-containerB">
                        <div className="left"><b>Request:</b></div>
                        <div className="right">
                            <img id="bit1" src={require('../../../assets/img/werg.png').default}
                                 alt="eBTC"/> Mint {Math.round(eBTC * 1000000) / 1000000} eBTC
                        </div>
                    </div>
                    <div className="flex-containerB">
                        <div className="left">Bridge Fee:</div>
                        <div className="right">
                            <img id="bit" src={require('../../../assets/img/Ergo_dark.png').default} alt="aneta"
                                 className='dark__mode'/>
                            <img id="bit" src={require('../../../assets/img/Ergo.png').default} alt="aneta" className='sun__mode'/>
                            <b>{Math.round(bridgeFee * 1000000) / 1000000}</b> ERG <div id="usd"
                                                                                        className="confBF">=
                            $ {Math.round(1000000 * bridgeFeeUsd) / 1000000}</div>
                        </div>
                    </div>
                </div>
                <button disabled={disable} type="button" id="confButton"
                        onClick={() => writeToDB(nautilusAddress, eBTC)}><b>Confirm</b></button>

            </div>
        )
    }


    async function writeToDB(nautilusAddress, eBTC) {
        
        setDisable(true);
        
        try {
            const docRef = await addDoc(collection(db, "users"), {
                erg_address: nautilusAddress,
                amount: eBTC,
                datetime: new Date().toUTCString(),
                info: "Mint Order Submitted"
            });
            setConf("mint")

        } catch (e) {
            console.error("Error adding document: ", e);
            setDisable(false);
        }

    }

}


export default ConfirmationWindow;