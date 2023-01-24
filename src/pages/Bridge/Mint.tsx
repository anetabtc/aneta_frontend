import CountdownTimer from "./CountdownTimer";
import QRCode from "react-qr-code";
import React from 'react';
import {useState} from "react";
import {useEffect, useRef} from "react";
import {formatData} from "./Utils";
import BTCDeposit from "./BTCDeposit";

///////////////////////////////
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// Add a second document with a generated ID.
import { addDoc, collection, getDocs } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

/////////////////////////////////

function Mint({eBTC, bridgeFee, nautilusaddress, anetaID}) {

    const [address, setAddress] = useState('');
    const [window, setWindow] = useState(true);
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
        console.log('payment is done!')

        console.log("Writing to Firebase")
        // TODO Write to DB
        try {
            const docRef = await addDoc(collection(db, "payments"), {
                erg_address: nautilusaddress,
                amount: eBTC,
                datetime: new Date().toUTCString(),
                btc_tx_id: btcTxId.toString(),
                info: "Mint Order Paid"
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        setPaymentWindow(false);

    }

    const getVaultAddress = () => {

        fetch("http://localhost:5004/getVaultAddress")
            .then(res1 => res1.json())
            .then((vaultAddress) => {
                console.log("Vault address: " + JSON.stringify(vaultAddress))
                setAddress(vaultAddress.address)
            })
    }


    useEffect(() => {
        getVaultAddress()

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

    const handleChangeBtcTxId = event => {
        setBTCTxId(event.target.value);
    }

    return (
        <div>
            {paymentWindow ? <PaymentInfo/> : <BTCDeposit eBTC={eBTC} bridgeFee={bridgeFee} nautilusaddress={nautilusaddress} btcTxID={btcTxId} anetaID={anetaID}/>}
        </div>
    )
    



    function PaymentInfo() {


        const [copy, setCopy] = useState(false)

        function btnCopy(){
            const btnCopy = document.querySelector(".labelAdd").childNodes[0]
                 navigator.clipboard.writeText(btnCopy.innerHTML)
                 setCopy(true);
                setTimeout(()=>{
                    setCopy(false);
                },1500);
                }



        return (
            <div className="mainPopup">
                <div className="popup">
                    <div className="divLabel">
                        <img id="bitcoin" src={require('../img/Bitcoin.png').default} alt="aneta"/> <label
                        className="labelMain"> BTC Deposit</label>
                    </div>
                    <div className="menuPopup">
                        <label className="SingleTrans1">Using Moonshine Wallet,<br/>Send {eBTC} BTC</label>
                        <p></p>
                        <label className="SingleTrans2">In a single transaction to: </label>
                        <div type="text" className="addressBTC">
                            <p className="labelAdd" onClick={btnCopy}>
                                {/* {address} */}
                                <p>tb1q03i4ngjso93ld8ehtksnf5mndlds8rndnmqoe</p>
                                <img id="copy" className="sun__mode" src={require('../img/copy.png').default} alt="copy"/>
                                <img id="copy" className="dark__mode" src={require('../img/copy_dark.png').default} alt="copy"/>
                                {copy ? <p id="copyPop">Copied</p>: ""}
                            </p>
                        </div>
                        <div className="timing">
                            <p/><CountdownTimer targetDate={dateTimeAfterThreeDays}></CountdownTimer><p/>
                        </div>
                        <div className="information"><b>
                            Add the ERG address used to pay the bridge fee in the metadata of this BTC transaction in your Moonshine Wallet. This ERG address will receive eBTC.</b>
                        </div>
                        <div className="attention">
                            <span><b className="warning">Attention:</b> The ERG address you add to the metadata of your BTC deposit <b>must be the same</b> as the ERG address you used to pay the bridge fee</span>
                        </div>
                        <div className='qrCode'>
                            <QRCode
                                id="qrCode"
                                // value={address}
                                value="tb1q03i4ngjso93ld8ehtksnf5mndlds8rndnmqoe"
                                size={120}
                                level={"L"}
                                includeMargin={false}
                            />
                        </div>
                        <div className="note">
                            <span><b>Next: Enter the BTC Transaction ID from the BTC deposit transaction you just submitted.</b></span>
                        </div>


                        <input type="text" className="btctxid" size="30" placeholder="BTC Transaction ID (from Moonshine Wallet)"  value={btcTxId} onChange={handleChangeBtcTxId}
                               required/><br/>
                        <button className="btnPayment" onClick={navigateToBTCDeposit}>I completed these steps.</button>
                        {/*<button type="button" id="confButton1"  onClick={refreshPage}><b>Continue</b></button> */}
                    </div>
                </div>
            </div>
        )
    }
}


export default Mint