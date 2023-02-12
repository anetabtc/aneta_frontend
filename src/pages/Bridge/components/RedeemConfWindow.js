import React, {useEffect, useState} from "react";

//////////////////////////////
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

function RedeemConfWindow({eBTC, btcAddress, nautilusAddress, txInfo}) {

    const [popupFixed, setPopupFixed] = useState(true);

    setTimeout(()=>{
        setPopupFixed(false);
    },5000);

    function closePop(){
        setPopupFixed(false);
    }



    useEffect(() => {
        writeToDB(nautilusAddress, btcAddress, eBTC, txInfo)
        console.log("tx id nautilus: ", txInfo)
    }, []);

    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <div>
            <div className="dntwrr">Your BTC will be sent to your BTC wallet shortly</div>
            <div className="dntwrr">This may take up to 24 hours. Don’t worry, your funds are safe :)</div>
            <div className="dntwrr">
                The status of your wrap and unwrap requests can be found under the transaction tab on the menu
            </div>
            <button type="button" id="confButton1" onClick={refreshPage}><b>Continue</b></button>
            {popupFixed ? <div className="popupFixed">
                <div id="close">
                    <img src={require('../../../assets/img/dark_close.png').default} alt="X" onClick={closePop}/>
                </div>
                <div className="result">
                    <div>
                        <img src={require('../../../assets/img/success.png').default} alt="success" height="50px"/>
                    </div>
                    <div>
                        <p>Transaction Successful</p>
                        <a href="#">Please Try Again</a>
                    </div>
                </div>
            </div> : ""}
        </div>
    )

    async function writeToDB(nautilusAddress, btcAddress, eBTC, txInfo) {
        console.log("txID", txInfo)
        try {
            const docRef = await addDoc(collection(db, "users"), {
                erg_address: nautilusAddress,
                btc_address: btcAddress,
                amount: eBTC,
                datetime: new Date().toUTCString(),
                erg_txid: txInfo,
                info: "Redeem Order Submitted"
            });

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}



export default RedeemConfWindow