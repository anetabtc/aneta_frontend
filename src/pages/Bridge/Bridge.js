import React, {useState} from 'react'

import ConfirmationWindow from "./ConfirmationWindow";


function Bridge() {

    const [popup, setPopup] = useState(false);
    const handleClickOpen = () => {
        setPopup(!popup);
    }

    const [visible, SetVisible] = useState(true);


    function DownUp() {
        if (visible) {
            return (
                <MintPage/>
            )
        } else {
            return (
                <RedeemPage/>
            )
        }
    }

    return (
        <div>
            {popup ? <ConfirmationWindow/> : ""}
            <div id="content1">
                <div id="radios">
                    <input id="rad1" type="radio" name="radioBtn" onClick={() => SetVisible(true)}/>
                    <label className="labels" htmlFor="rad1"><b>WRAP</b></label>
                    <input id="rad2" type="radio" name="radioBtn" onClick={() => SetVisible(false)}/>
                    <label className="labels" htmlFor="rad2"><b>UNWRAP</b></label>
                    <div id="bckgrnd"></div>
                </div>
                <DownUp/>
            </div>
        </div>
    )

    function MintPage() {

        const [mintAmount, setMintAmount] = useState('');
        const [bridgeFee, setBridgeFee] = useState('0');
        const [ergFee, setErgFee] = useState('0');
        const [anetaBTCAmount, setAnetaBTCAmount] = useState('0');
        const [usdBTC, setUsdBTC] = useState('0');
        const [ergUsd, setErgUsd] = useState('0');
        const [bridgeFeeUsd, setBridgeFeeUsd] = useState('0');
        const [ergFeeUsd, setErgFeeUsd] = useState('0');

        function ErgUsd() {

            (async () => {
                const rawResponse = await fetch('https://min-api.cryptocompare.com/data/price?fsym=ERG&tsyms=USD&api_key=54a8bf7e64887ee6696896672ecc16a5b9ae3e1602f8d5fa687652e23761e8b6', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    mode: 'cors',
                    cache: 'default',
                });
                const content = await rawResponse.json();
                console.log(content.USD + " erg fee")
                setErgUsd(content.USD)
            })();


        }

        ErgUsd();

        const handleChange = event => {
            setMintAmount(event.target.value);
            setErgFee("0.02");
            if(event.target.value !== ''){
                setAnetaBTCAmount(event.target.value);
            }else{
                setAnetaBTCAmount('0');
            }
            setBridgeFee(event.target.value * 33);
            console.log("aaa" + ergUsd);
            setBridgeFeeUsd(event.target.value * 33 * ergUsd);
            setErgFeeUsd(0.02 * ergUsd);

            (async () => {
                const rawResponse = await fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&api_key=54a8bf7e64887ee6696896672ecc16a5b9ae3e1602f8d5fa687652e23761e8b6', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    mode: 'cors',
                    cache: 'default',
                });
                const content = await rawResponse.json();
                setUsdBTC(content.USD * event.target.value)
                console.log(usdBTC)
            })();
        };


        return (
            <div id="WRAP">
                <p className="title">Mint anetaBTC by Wrapping BTC</p>
                <input pattern="[0-9]+" type="text" maxlength="4" placeholder="0.00"
                       className="btcInput"
                       size="30"
                       id="mintAmount"
                       
                       name="mintAmount"
                       onChange={handleChange}
                       value={mintAmount}
                /><br/>
                <div className="lblInp">
                    BTC<br/>
                    ~ $ {usdBTC}
                </div>
                <p/><p/>
                <div className="flex-container">
                    <div className="left">Bridge Fee</div>
                    <div className="right">
                        <img id="bit" src={require('../img/Ergo.png')}
                             alt="aneta"/><b>{bridgeFee}</b> ERG 
                             
                          

                    </div>
                    
                    <div className="feeUSD">   = $ {bridgeFeeUsd}</div>
                    
                </div>
               
                <br></br>
                <p/><p/>
                <div className="flex-container">
                    <div className="left">ERG Network fee</div>
                    <div className="right">
                        <div><img id="bit" src={require('../img/Ergo.png')} alt="aneta"/><b>{ergFee}</b> ERG 
                        
                        </div>
                        
                    </div>
                    <div className="feeUSD2"> = $ {ergFeeUsd} </div>
                </div>

                <p/><p/>
                
                <br></br>
                <p/><p/>
                <hr id="menuHR1"></hr>
                <div className="flex-container">
                    <div className="left">You Will Receive</div>
                    <div className="right"><b>{anetaBTCAmount}</b> anetaBTC</div>
                </div>
                <button
                    onClick={handleClickOpen}
                    type="button" className="mainButton" id="mintButton"><b>Mint
                    anetaBTC</b></button>
            </div>
        )
    }

    function RedeemPage() {
        const [redeemAmount, setRedeemAmount] = useState('');
        const [usd, setUSD] = useState('0');

        const handleChangeRedeem = event => {
            setRedeemAmount(event.target.value);

            (async () => {
                const rawResponse = await fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&api_key=54a8bf7e64887ee6696896672ecc16a5b9ae3e1602f8d5fa687652e23761e8b6', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    mode: 'cors',
                    cache: 'default',
                });
                const content = await rawResponse.json();
                setUSD(content.USD * event.target.value)
                console.log(usd)
            })();

        };

        function runRedeem(args) {
            let data = {
                amount: 1,
                btc_vault_id: 0,
                btc_wallet_id: "Wallet1-testnet",
                network: "testnet",
                vault_id: 0,
                wallet_id: 0
            };
            console.log(JSON.stringify(data));
            (async () => {
                const rawResponse = await fetch('http://localhost:5004/redeem', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    mode: 'cors',
                    cache: 'default',
                    body: 'amount=1&btc_vault_id=0&btc_wallet_id=Wallet1-testnet&network=testnet&vault_id=0&wallet_id=0',
                });
                const content = await rawResponse.json();
                console.log(content);
            })();
        }

        return (
            <div id="UNWRAP">
                <p className="title">Redeem BTC</p>
                <input type="text" className="btcInput" maxlength="4" size="30" placeholder="0.00" required
                       id="mintAmount"
                       name="mintAmount"
                       onChange={handleChangeRedeem}
                       value={redeemAmount}
                /><br/>
                <div className="lblInp">
                    anetaBTC<br/>
                    ~ $ {usd}
                </div>
                <br></br>
                <p/>
                <p className="title2">BTC address</p>
                <input type="text" className="btcInputAddress" size="30" placeholder="Enter your BTC address"
                       required/><br/>
                <p/><p/>
                <div className="flex-container">
                    <div className="left">BTC network Fee</div>
                    <div className="right"><img id="bit" src={require('../img/Bitcoin.png')}
                                                alt="aneta"/><b>0</b> BTC
                    </div>
                </div>
                <p/><p/>
                <div className="flex-container">
                    <div className="left">ERG network Fee</div>
                    <div className="right"><img id="bit" src={require('../img/Ergo.png')} alt="aneta"/><b>0</b> ERG
                    </div>
                </div>

                <p/><p/>
                <hr id="menuHR1"></hr>
                <div className="flex-container">
                    <div className="left">You Will Receive</div>
                    <div className="right"><b>0</b> BTC</div>
                </div>
                <button onClick={() => runRedeem(true)} type="button" className="mainButton2" id="mintButton">
                    <b>Confirm</b></button>
            </div>
        )
    }
}


export default Bridge;
