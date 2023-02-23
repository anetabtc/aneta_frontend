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
    },6000);

    function closePop(){
        setPopupFixed(false);
    }

    const explorerUrl = `https://ergo-explorer.anetabtc.io/transactions/${txInfo}`



    useEffect(() => {
        writeToDB(nautilusAddress, btcAddress, eBTC, txInfo)
    }, []);

    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <div className="redeemConfWindow">
{/*             <div className="dntwrr">Your BTC will be sent to your BTC wallet shortly</div>
            <div className="dntwrr">This may take up to 24 hours. Don’t worry, your funds are safe :)</div>
            <div className="dntwrr">
                The status of your wrap and unwrap requests can be found under the transaction tab on the menu
            </div>
            <button type="button" id="confButton1" onClick={refreshPage}><b>Continue</b></button> */}
            
                
            <div className="titleBTC">Unwrap Transaction Successful<img src={require('../../../assets/img/success.png').default} alt="success" height="24px"/></div>
                <div id="close">
                    <img src={require('../../../assets/img/dark_close.png').default} alt="X" onClick={refreshPage} />
                </div>
            <div className="resultBridge">
                <div className="amountBridge">
                        <div className="card">
                        <img id="bitcoin" src={require('../../../assets/img/werg.png').default} alt="eBTC"/>
                        <p>eBTC</p>
                    </div>
                    <div>{eBTC}</div>
                </div>
                <div className="arrowBridge"><img src={require('../../../assets/img/arrow_green.png').default} alt="arrow"/></div>
 
                <div className="amountBridge">
                    <div className="card">
                        <img id="bitcoin" src={require('../../../assets/img/Bitcoin.png').default} alt="btc"/>
                        <p>BTC</p>
                    </div>
                    <div>{Math.round(((parseFloat(eBTC)*.995)-.0001)*100000000)/100000000}</div>
                </div>
            </div>


            <div className="text1">Your eBTC payment was successfully submitted.</div>
            <div className="text3">BTC will be sent to your BTC wallet shortly<br/>This may take up to 24 hours. Don’t worry, your funds are safu :).</div>
            <div className="text2 address">BTC Destination Address:
                <br/>{btcAddress}
            </div>
            <div className="text1">The status and details of this transaction can be found in the “Transactions” tab on the side menu.</div>
            <div className="text2"><b><div>Support</div></b><br/>If you need support, your BTC transaction ID will help us assist you.</div>
            <button type="button" id="confButton1" className="confWRS" onClick={refreshPage}><b>Close</b></button>
                
            


            {popupFixed ? <div className="popupFixed">
                <div id="close">
                    <img src={require('../../../assets/img/dark_close.png').default} alt="X" onClick={closePop}/>
                </div>
                <div className="result">
                    <div>
                        <img src={require('../../../assets/img/success.png').default} alt="success" height="80px"/>
                    </div>
                    <div className="resultTx">
                        <p>Transaction Successful</p>
                        <a className="txInfo" href={explorerUrl} target="_blank">View on Explorer</a>
                    </div>
                </div>
            </div> : ""}
        </div>
    )

    async function writeToDB(nautilusAddress, btcAddress, eBTC, txInfo) {
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