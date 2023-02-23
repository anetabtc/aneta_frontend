import CountdownTimer from "./CountdownTimer";
import QRCode from "react-qr-code";
import React from 'react';
import {useState} from "react";
import {useEffect, useRef} from "react";
import {formatData} from "../services/utils/Utils";
import BTCDeposit from "./BTCDeposit";

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
const VAULT_BTC_WALLET_ADDRESS = "n4YDfMoo1i3rzF8XEq9zyfo8TFfnroLjy6"

function QRWindow({eBTC}) {


    const [nautilusAddress, setNautilusAddress] = useState(JSON.parse(localStorage.getItem('address')));

    const [address, setAddress] = useState('');
    const [windows, setWindows] = useState(true);
    const [currencies, setcurrencies] = useState([]);
    const [pair, setpair] = useState("");
    const [price, setprice] = useState("0.00");
    const [pastData, setpastData] = useState({});
    const ws = useRef(null);
    let first = useRef(false);
    const url = "https://api.pro.coinbase.com";
    const [btcTxId, setBTCTxId] = useState('');

    const [paymentWindow, setPaymentWindow] = useState(true)

    const navigateToBTCDeposit = async () => {

        // TODO Write to DB

        try {
            const docRef = await addDoc(collection(db, "payments"), {
                erg_address: nautilusAddress,
                amount: eBTC,
                datetime: new Date().toUTCString(),

                info: "Mint Order Paid"
            });

        } catch (e) {
            console.error("Error adding document: ", e);
        }

        setPaymentWindow(false);

    }




    const getVaultAddress = () => {
        setAddress(VAULT_BTC_WALLET_ADDRESS)
    }


    useEffect(() => {
        getVaultAddress()
        
        writeToDB()

        ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
        let pairs = [];

        const apiCall = async () => {
            await fetch(url + "/products")
                .then((res) => res.json())
                .then((data) => (pairs = data));

            let filtered = pairs.filter((pair) => {
                if (pair.quote_currency === "USD") {
                    return pair;
                }
            });

            filtered = filtered.sort((a, b) => {
                if (a.base_currency < b.base_currency) {
                    return -1;
                }
                if (a.base_currency > b.base_currency) {
                    return 1;
                }
                return 0;
            });

            setcurrencies(filtered);

            first.current = true;
        };

        apiCall();
    }, [])


    useEffect(() => {
        if (!first.current) {
            return;
        }

        let msg = {
            type: "subscribe",
            product_ids: [pair],
            channels: ["ticker"]
        };
        let jsonMsg = JSON.stringify(msg);
        ws.current.send(jsonMsg);

        let historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`;
        const fetchHistoricalData = async () => {
            let dataArr = [];
            await fetch(historicalDataURL)
                .then((res) => res.json())
                .then((data) => (dataArr = data));

            let formattedData = formatData(dataArr);
            setpastData(formattedData);
        };

        fetchHistoricalData();

        ws.current.onmessage = (e) => {
            let data = JSON.parse(e.data);
            if (data.type !== "ticker") {
                return;
            }

            if (data.product_id === pair) {
                setprice(data.price);
            }
        };
    }, [pair]);

    const handleSelect = (e) => {
        let unsubMsg = {
            type: "unsubscribe",
            product_ids: ["BTC-USD"],
            channels: ["ticker"]
        };
        let unsub = JSON.stringify(unsubMsg);

        ws.current.send(unsub);

        setpair(e.target.value);
    };

    const THREE_DAYS_IN_MS = 1 * 24 * 60 * 60 * 1000;
    const NOW_IN_MS = new Date().getTime();

    const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

    /* const handleChangeBtcTxId = event => {
         setBTCTxId(event.target.value);
     } */

    return (
        <div>
            {paymentWindow ? <PaymentInfo/> : <BTCDeposit eBTC={eBTC}/>}
        </div>
    )


    function PaymentInfo() {

        const [domTxId, setDomTxId] = useState("");
        const [copy, setCopy] = useState("");
        const [confirmation, setConfirmation] = useState("");

        const [spinQR, setSpinQR] = useState(false)


        function check(text) {
            let regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{10,60}$/;
            return (regex.test(text));
        }

        const btnConfirmation = () => {
            const inputBTCTx = document.querySelector(".btctxid").value;
            if (check(inputBTCTx)) {
                setBTCTxId(inputBTCTx);
            } else {
                setConfirmation("false")
            }

        }

        function btnCopy() {
            const btnCopy = document.querySelector(".labelAdd").childNodes[0]
            navigator.clipboard.writeText(btnCopy.innerHTML)
            setCopy("true");
            setTimeout(() => {
                setCopy("false");
            }, 1500);
        }

        function btnDomTxIdOn() {
            setDomTxId("true")
            setConfirmation("true")
        }

        function btnDomTxIdOff() {
            setDomTxId("false")
        }

        function confirmQR(){

                setSpinQR(true)
                setTimeout(()=>{
                    setSpinQR(false);
                },3000);
                setTimeout(()=>{
                    navigateToBTCDeposit()
                },2000);
                
            
        }

        const refreshPage = () => {
            window.location.reload();
        }


        return (
            <div className="mainPopup">
                <div className="popup">
                    <div className="divLabel">
                        <img id="bitcoin" src={require('../../../assets/img/Bitcoin.png').default} alt="aneta"/> <label
                        className="labelMain"> BTC Deposit</label>
                        <div id="close">
                            <img src={require('../../../assets/img/dark_close.png').default} alt="X" onClick={refreshPage} />
                        </div>
                    </div>
                    <div className="menuPopup">
                        <label className="SingleTrans1">Using Moonshine Wallet,<br/>Send {eBTC} BTC</label>
                        <p></p>
                        <label className="SingleTrans2">In a single transaction to: </label>
                        <div type="text" className="addressBTC">
                            <p className="labelAdd" onClick={btnCopy}>
                                <p>{address}</p>
                                <img id="copy" className="sun__mode"
                                     src={require('../../../assets/img/copy.png').default} alt="copy"/>
                                <img id="copy" className="dark__mode"
                                     src={require('../../../assets/img/copy_dark.png').default} alt="copy"/>
                                {copy === "true" ? <p id="copyPop">Copied</p> : ""}
                            </p>
                        </div>
                        <div className="timing">
                            <p/><CountdownTimer targetDate={dateTimeAfterThreeDays}></CountdownTimer><p/>
                        </div>
                        <div className="attention">
                            <span><b className="warning">Attention:</b></span>
                        </div>
                        <div className="information">
                            <b>Add your ERG address</b> in the “Message (Optional)” section in your Moonshine Wallet
                            before sending this deposit. This ERG address will receive eBTC. If you do not add your ERG
                            address into the message section of this transaction, you will not receive eBTC.
                        </div>
                        <div className="backgroundQR">
                            <div className='qrCode'>
                                <QRCode
                                    id="qrCode"
                                    value={address}
                                    size={120}
                                    level={"L"}
                                />
                            </div>
                        </div>
                        <div className="note">
                            <span><b>Note:</b> Payments may take over 10 minutes to confirm. Don't worry, your funds are safe :)</span>
                        </div>

                        <button className="btnPayment" onClick={confirmQR}>{spinQR ? <div className='spinner QR'></div>:""}I have sent the deposit</button>


                    </div>
                </div>

            </div>
        )
    }

    async function writeToDB() {
        // TODO Write to DB

        try {
            const docRef = await addDoc(collection(db, "users"), {
                erg_address: nautilusAddress,
                amount: eBTC,
                datetime: new Date().toUTCString(),
                info: "Mint Order Submitted"
            });

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}


export default QRWindow