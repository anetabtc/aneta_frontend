import CountdownTimer from "./CountdownTimer";
import QRCode from "react-qr-code";
import {Link} from "react-router-dom"

import {useState} from "react";
import {useEffect, useRef} from "react";
import {formatData} from "./Utils";
import BTCDeposit from "./BTCDeposit";

function Mint(args) {
    const [address, setAddress] = useState('');

    const [window, setWindow] = useState(true);
    let data = {
        amount: 0,
        btc_vault_id: 0,
        btc_wallet_id: "Wallet1-testnet",
        network: "testnet",
        vault_id: 0,
        wallet_id: 0
    };
    console.log(JSON.stringify(data));
    (async () => {
        const rawResponse = await fetch('http://localhost:5004/mint', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            mode: 'cors',
            cache: 'default',
            body: 'amount=1&btc_vault_id=0&btc_wallet_id=Wallet1-testnet&network=testnet&vault_id=0&wallet_id=0',
        });


        const content = await rawResponse.json()

        setAddress(content.address)

        console.log(content);
    })();

    const [currencies, setcurrencies] = useState([]);
    const [pair, setpair] = useState("");
    const [price, setprice] = useState("0.00");
    const [pastData, setpastData] = useState({});
    const ws = useRef(null);
    let first = useRef(false);
    const url = "https://api.pro.coinbase.com";

    useEffect(() => {
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
    }, []);

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

    return(
        <div>
            {window ? <PaymentInfo/> : <BTCDeposit/>}
        </div>
    )


    function PaymentInfo() {
        return (
            <div className="mainPopup">
                <div className="popup">
                    <div className="divLabel">
                        <img id="bitcoin" src={require('../img/Bitcoin.png')} alt="aneta"/> <label
                        className="labelMain"> BTC Deposit </label>
                    </div>
                    <div className="menuPopup">
                        <br/>
                        <label className="SingleTrans1">Send 1 BTC =</label>
                        <p></p>


                        <p/>


                        <p/>
                        <label className="SingleTrans2">In a single transaction to: </label> <p/>
                        <div type="text" className="addressBTC">
                            <p className="labelAdd">
                                {address}
                            </p>
                        </div>
                        <div className="timing">
                            <p/><CountdownTimer targetDate={dateTimeAfterThreeDays}></CountdownTimer><p/>
                        </div>
                        <br/>
                        <div className="attention">
                            <span><b>Attention:</b> Some Bitcoin wallets display values in mBTC. In </span><br/><span>this case, ensure you send the correct amount: <b>1000mBTC</b></span>
                        </div>
                        <br/>
                        <QRCode
                            id="qrCode"
                            value={address}
                            size={154}
                            level={"H"}
                        />
                        <br/><br/>
                        <div className="note">
                            <b>Note:</b> Payments may take over 10 minutes to confirm. Don’t worry, your funds are
                            safe :)
                        </div>
                        <p/>
                        <button className="btnPayment" onClick={setWindow(false)}>I have made the payment</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Mint