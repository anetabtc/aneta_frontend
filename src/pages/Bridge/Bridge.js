import React, {useState, useRef, useEffect} from 'react'
import {formatData} from "./Utils";
import {Link} from "react-router-dom"

import ConfirmationWindow from "./ConfirmationWindow";
import Mint from "./Mint";


function Bridge() {

    const [mintAmount, setMintAmount] = useState('');

    const handleChange = event => {
        setMintAmount(event.target.value);
    };

    const [redeemAmount, setRedeemAmount] = useState('');

    const handleChangeRedeem = event => {
        setRedeemAmount(event.target.value);
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




    const [visible, SetVisible] = useState(true);
    const [popup, setPopup] = useState(false);
    const handleClickOpen = () => {
        setPopup(!popup);


    }

    function DownUp() {
        if (visible) {
            return (
                <div id="WRAP">
                    <p className="title">Mint anetaBTC by Wrapping BTC</p>
                    <input type="text" placeholder="0.00" required
                           className="btcInput"
                           size="30"
                           id="mintAmount"
                           name="mintAmount"
                           onChange={handleChange}
                           value={mintAmount}
                    /><br/>
                    <div className="lblInp">
                        BTC<br/>
                        ~ $ 0.00
                    </div>
                    <p/><p/>
                    <div className="flex-container">
                        <div className="left">Bridge Fee</div>
                        <div className="right">
                            <img id="bit" src={require('../img/Ergo.png')}
                                 alt="aneta"/><b>0.5</b> ERG
                        </div>
                    </div>
                    <p/><p/>
                    <div className="flex-container">
                        <div className="left">ERG Network fee</div>
                        <div className="right">
                            <div><img id="bit" src={require('../img/Ergo.png')} alt="aneta"/><b>0.02</b> ERG</div>
                        </div>
                    </div>

                    <p/><p/>
                    <hr id="menuHR1"></hr>
                    <div className="flex-container">
                        <div className="left">You Will Receive</div>
                        <div className="right"><b>1.00</b> anetaBTC</div>
                    </div>
                    {/*<Link to="/conf">*/}
                    {/*    <button*/}
                    {/*        // onClick={() => runMint(true)}*/}
                    {/*        type="button" className="mainButton" id="mintButton"><b>Mint*/}
                    {/*        anetaBTC</b></button>*/}
                    {/*</Link>*/}
                        <button
                            onClick={handleClickOpen}
                            type="button" className="mainButton" id="mintButton"><b>Mint
                            anetaBTC</b></button>


                </div>
            )
        } else {
            return (
                <div id="UNWRAP">
                    <p className="title">Redeem BTC</p>
                    <input type="text" className="btcInput" size="30" placeholder="0.00" required
                           id="mintAmount"
                           name="mintAmount"
                           onChange={handleChangeRedeem}
                           value={redeemAmount}
                    /><br/>
                    <div className="lblInp2">
                        anetaBTC<br/>
                        ~ $ 0.00
                    </div>
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
                    <button onClick={() => runRedeem(true)} type="button" className="mainButton" id="mintButton">
                        <b>Confirm</b></button>
                </div>
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
}


export default Bridge;
