import React, {useEffect, useState} from 'react'

import ConfirmationWindow from "./ConfirmationWindow.tsx";
import ConfirmationWindowRedeem from "./ConfirmationWindowRedeem.tsx";




function Bridge() {

    const [ergUsd, setErgUsd] = useState('0');

    const [usdBTC, setUsdBTC] = useState('0');

    const [anetaBTCAmountG, setAnetaBTCAmountG] = useState('0');

    const [bridgeFeeG, setBridgeFeeG] = useState('0');
    const [bridgeFeeUsdG, setBridgeFeeUsdG] = useState('0');

    const [btcNetworkFeeG, setBtcNetworkFeeG] = useState('0');
    const [btcNetworkFeeUsdG, setBtcNetworkFeeUsdG] = useState('0');
    const [btcAddressG, setBtcAddressG] = useState('');
    // const [btcAddressMint, setBtcAddressMint] = useState('');
    const [BTCAmountG, setBTCAmountG] = useState('0');
    const [userAddress, setUserAddress] = useState('');



    const [connectWalletError, setConnectWalletError] = useState(false);

    const [addressError, setAddressWalletError] = useState(false);

    const [multipleSatoshi, setMultipleSatoshi] = useState(true)
    const [checkSatoshi, setCheckSatoshi] = useState(true)
    const [multipleSatoshiRedeem, setMultipleSatoshiRedeem] = useState(true)
    const [checkSatoshiRedeem, setCheckSatoshiRedeem] = useState(true)
    const [checkMin, setCheckMin] = useState(true)
    const [checkMinRedeem, setCheckMinRedeem] = useState(true)

    const refreshPage = () => {
        window.location.reload();
        setTimeout(()=>{
            setMultipleSatoshi(true);
            setMultipleSatoshiRedeem(true);
            setCheckSatoshi(true);
            setCheckSatoshiRedeem(true);
            setCheckMinRedeem(true)
        },1000);
    }



    useEffect(()=>{
        ErgUsd();
        BtcUsd();
    }, [])

    // setInterval(() => {
    //     ErgUsd();
    //     BtcUsd();
    // }, 60000);

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
            console.log(content.USD + " erg usd")
            setErgUsd(content.USD)
        })();


    }

    function BtcUsd() {
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
            setUsdBTC(content.USD)
            console.log(usdBTC + " btcusd")
        })();
    }

    const [popup, setPopup] = useState(false);
    const handleClickOpen = () => {
        setPopup(!popup);
    }

    const [popupr, setPopupr] = useState(false);
    const handleClickOpenRedeem = () => {
        setPopupr(!popupr);
    }

    const [visible, SetVisible] = useState(true);


    function DownUp() {
        if (visible) {
            {console.log("anetaBTCAmountG" + anetaBTCAmountG)}
            return (
                <MintPage eBTC={anetaBTCAmountG} bridgeFee={bridgeFeeG}/>
            )
        } else {
            return (
                <RedeemPage eBTC = {BTCAmountG} btcNetworkFee = {btcNetworkFeeG} btcNetworkFeeUsd = {btcNetworkFeeUsdG}  btcAddress = {btcAddressG} />
            )
        }
    }

    function ConnectWalletError() {
        return(
            <div className="mainPopup">
                <div className="confContent">

                    <div className="confWindow">
                        <div className="confTitle">
                            Error
                        </div>
                        <div className="error">
                            Your wallet is not connected. Please try again.
                        </div>
                        <button type="button" id="confButton1" onClick={refreshPage}><b>Try again</b></button>
                    </div>
                </div>
            </div>
        )
    }

    function AddressError() {
        return(
            <div className="mainPopup">
                <div className="confContent">

                    <div className="confWindow">
                        <div className="confTitle">
                            Error
                        </div>
                        <div className="error">
                            Your address is incorrect. Please try again.
                        </div>
                        <button type="button" id="confButton1" onClick={refreshPage}><b>Try again</b></button>
                    </div>
                </div>
            </div>
        )
    }

    function SatoshiError() {
        return(
            <div className="mainPopup">
                <div className="confContent">

                    <div className="confWindow">
                        <div className="confTitle">
                            Error
                        </div>
                        <div className="error">
                        Please, enter a multiple number of satoshi (Maximum 8 decimal places).
                        </div>
                        <button type="button" id="confButton1" onClick={refreshPage}><b>Try again</b></button>
                    </div>
                </div>
            </div>
        )
    }

    function MinAmountError() {
        return(
            <div className="mainPopup">
                <div className="confContent">

                    <div className="confWindow">
                        <div className="confTitle">
                            Error
                        </div>
                        <div className="error">
                        You can mint and redeem a minimum of 0.0006 BTC
                        </div>
                        <button type="button" id="confButton1" onClick={refreshPage}><b>Try again</b></button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {multipleSatoshi ? '' : <SatoshiError/>}
            {checkMin ? '' : <MinAmountError/> }
            
            {connectWalletError ? <ConnectWalletError/> : ""}
            {addressError ? <AddressError/> : ""}
            {popup && multipleSatoshi && checkMin ? <ConfirmationWindow eBTC = {anetaBTCAmountG} bridgeFee = {bridgeFeeG} bridgeFeeUsd = {bridgeFeeUsdG}
                // btcAddress={btcAddressMint}
            /> : ""}
            {multipleSatoshiRedeem ? '' : <SatoshiError/>}
            {checkMinRedeem ? '' : <MinAmountError/> }
            {popupr && multipleSatoshiRedeem && checkMinRedeem ? <ConfirmationWindowRedeem eBTC = {BTCAmountG} btcNetworkFee = {btcNetworkFeeG} btcNetworkFeeUsd = {btcNetworkFeeUsdG}  btcAddress = {btcAddressG}  /> : ""}
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
        const [ergFee, setErgFee] = useState('0');
        const [ergFeeUsd, setErgFeeUsd] = useState('0');
        const [usdBtcMint, setUsdBtcMint] = useState('0');
        const [anetaBTCAmount, setAnetaBTCAmount] = useState('0');
        const [bridgeFee, setBridgeFee] = useState('0');
        const [bridgeFeeUsd, setBridgeFeeUsd] = useState('0');
        
        // const [btcAddress, setBtcAddress] = useState('');


        const handleChange = event => {
            setMintAmount(event.target.value);
            setErgFee("0.02");
            setErgFeeUsd(0.02 * ergUsd);
            setUsdBtcMint(usdBTC * event.target.value)
            if (event.target.value !== '' && (1000 * event.target.value)/1000 !== 0) {
                setAnetaBTCAmount(event.target.value);
            }
            else {
                setAnetaBTCAmount('0');
            }
            setBridgeFee(event.target.value * 33);
            setBridgeFeeUsd(event.target.value * 33 * ergUsd);          
        };

        useEffect(()=>{
            checkSatoshi ? '' : setMultipleSatoshi(false);
        })


        async function handleClickOpen1() {

            let checkDecimals = Math.round(100000 * (parseFloat(anetaBTCAmount)*100000000)) / 100000;
            let integer = Math.trunc(checkDecimals)/checkDecimals;
            if(integer<1){
                setCheckSatoshi(false)
            } 
            
            let minAmount = parseFloat(anetaBTCAmount)
            if(minAmount<0.0006){
                setCheckMin(false)
            }

            setAnetaBTCAmountG(anetaBTCAmount)
            setBridgeFeeG(bridgeFee)
            setBridgeFeeUsdG(bridgeFeeUsd)
            // setBtcAddressMint(btcAddress)

            const address = JSON.parse(localStorage.getItem('address'))
            console.log(address)
            address ? handleClickOpen() : setConnectWalletError(true)
        }




        return (
            <div id="WRAP">
                <p className="title">Mint eBTC by locking BTC</p>
                <input pattern="[0-9]+" type="number" placeholder="0.00"
                       className="btcInput"
                       size="30"
                       id="mintAmount"
                       name="mintAmount"
                       onChange={handleChange}
                       value={mintAmount}
                /><br/>
                <div className="lblInp">
                    <img id="bit" src={require('../img/Bitcoin.png').default}
                         alt="aneta"/>BTC<br/>
                    <div id="usd"> ~ $ {Math.round(usdBtcMint*100)/100}</div>
                </div>
                <br></br>
                <div className="flex-container">
                    <div className="left">Bridge Fee</div>
                    <div className="right">
                        <img id="bit" src={require('../img/Ergo_dark.png').default}alt="aneta" className='dark__mode'/>
                        <img id="bit" src={require('../img/Ergo.png').default}alt="aneta" className='sun__mode'/>
                        <b>{Math.round(bridgeFee*10000)/10000}</b> ERG
                    </div>
                    <div className="feeUSD8" id="usd"> = $ {Math.round(bridgeFeeUsd*10000)/10000}</div>
                </div>

                <br></br>
                <p/><p/>
                <div className="flex-container">
                    <div className="left">ERG Network fee</div>
                    <div className="right">
                        <div>
                            <img id="bit" src={require('../img/Ergo_dark.png').default}alt="aneta" className='dark__mode'/>
                            <img id="bit" src={require('../img/Ergo.png').default}alt="aneta" className='sun__mode'/>
                            <b>{Math.round(ergFee*100)/100}</b> ERG

                        </div>

                    </div>
                    <div className="feeUSD9" id="usd"> = $ {Math.round(ergFeeUsd*100)/100} </div>
                </div>
                <br/><br/>
                <hr id="menuHR1"></hr>
                <div className="flex-container">
                    <div className="left">You Will Receive</div>
                    <div className="right"><img id="bit" src={require('../img/werg.png').default} alt="eBTC"/><b>{anetaBTCAmount}</b> eBTC</div>
                </div>
                <button
                    onClick={handleClickOpen1}
                    type="button" className="mainButton" id="mintButton"><b>Mint
                    eBTC</b></button>
            </div>
        )
    }

    function RedeemPage() {
        const [redeemAmount, setRedeemAmount] = useState('');
        const [ergFee, setErgFee] = useState('0');
        const [ergFeeUsd, setErgFeeUsd] = useState('0');
        const [usdBtcRedeem, setUsdBtcRedeem] = useState('0');
        const [btcNetworkFee, setBtcNetworkFee] = useState('0');
        const [btcNetworkFeeUsd, setBtcNetworkFeeUsd] = useState('0');
        const [btcAddress, setBtcAddress] = useState('');
        const [BTCAmount, setBTCAmount] = useState('0');
        // const [BTCAmountUSD, setBTCAmountUSD] = useState('0');
        const [bridgeFee, setBridgeFee] = useState('0');
        const [bridgeFeeUsd, setBridgeFeeUsd] = useState('0');


        const handleChangeRedeem = event => {
            // ErgUsd();
            // BtcUsd();
            setRedeemAmount(event.target.value);
            setErgFee("0.02");
            if (event.target.value !== '' && (1000 * event.target.value)/1000 !== 0) {
                setBTCAmount(event.target.value);
            } else {
                setBTCAmount('0');
            }
            setBtcNetworkFee(event.target.value * 0.0025);
            setBtcNetworkFeeUsd(event.target.value * 0.0025 * usdBTC);
            setErgFeeUsd(0.02 * ergUsd);
            setUsdBtcRedeem(usdBTC * event.target.value);
            setBridgeFee(event.target.value * 33);
            setBridgeFeeUsd(event.target.value * 33 * ergUsd);

        };

        useEffect(()=>{
            checkSatoshiRedeem ? '' : setMultipleSatoshiRedeem(false)
        })

        async function handleClickOpenRedeem1() {

            let checkDecimals = Math.round(100000 * (parseFloat(BTCAmount)*100000000)) / 100000; 
            let integer = Math.trunc(checkDecimals)/checkDecimals;
            if(integer<1){
                setCheckSatoshiRedeem(false)
            }

            let minAmount = parseFloat(BTCAmount)
            if(minAmount<0.0006){
                setCheckMinRedeem(false)
            }

            setBtcNetworkFeeG(btcNetworkFee)
            setBtcNetworkFeeUsdG(btcNetworkFeeUsd)
            setBtcAddressG(btcAddress)
            setBTCAmountG(BTCAmount)
            const address = JSON.parse(localStorage.getItem('address'))
            console.log(address, "Address")
            address ? handleClickOpenRedeem() : setConnectWalletError(true)
        }





        const handleChangeBtcAddress = event => {
            setBtcAddress(event.target.value);
        }

        return (
            <div id="UNWRAP">
                <p className="title">Turn eBTC into BTC</p>
                <input pattern="[0-9]+" type="number" className="btcInput"  max="9999" size="30" placeholder="0.00" required
                       id="mintAmount"
                       name="mintAmount"
                       onChange={handleChangeRedeem}
                       value={redeemAmount}
                /><br/>
                <div className="lblInp">
                    <img id="bit" src={require('../img/werg.png').default} alt="eBTC"/>eBTC<br/>
                    <div id="usd">~ $ {Math.round(100*usdBtcRedeem)/100}</div>
                </div>
                <br></br>
                <p/>
                <p className="title2">BTC address</p>
                <input type="text" className="btcInputAddress" size="30" placeholder="Enter your BTC address" onChange={handleChangeBtcAddress} value={btcAddress}
                       required/><br/>

                <div className="flex-container">
                    <div className="left">Bridge Fee</div>
                    <div className="right">
                        <img id="bit" src={require('../img/Ergo_dark.png').default}alt="aneta" className='dark__mode'/>
                        <img id="bit" src={require('../img/Ergo.png').default}alt="aneta" className='sun__mode'/>
                        <b>{Math.round(bridgeFee*100)/100}</b> ERG


                    </div>

                    <div className="feeUSD1" id="usd"> = $ {Math.round(bridgeFeeUsd*100)/100}</div>

                </div>

                <br></br>
                <p/><p/>
                <div className="flex-container">
                    <div className="left">BTC network Fee</div>
                    <div className="right">
                        <img id="bit" src={require('../img/Bitcoin.png').default}
                             alt="aneta"/><b>{Math.round(btcNetworkFee*100)/100}</b> BTC


                    </div>

                    <div className="feeUSD5" id="usd"> = $ {Math.round(100*btcNetworkFeeUsd)/100}</div>

                </div>

                <br></br>
                <p/><p/>
                <div className="flex-container">
                    <div className="left">ERG Network fee</div>
                    <div className="right">
                        <div><img id="bit" src={require('../img/Ergo_dark.png').default}alt="aneta" className='dark__mode'/>
                            <img id="bit" src={require('../img/Ergo.png').default}alt="aneta" className='sun__mode'/>
                            <b>{Math.round(100*ergFee)/100}</b> ERG

                        </div>

                    </div>
                    <div className="feeUSD6" id="usd"> = $ {Math.round(100*ergFeeUsd)/100} </div>
                </div>
                <hr id="menuHR1"></hr>
                <div className="flex-container">
                    <div className="left">You Will Receive</div>
                    <div className="right"><img id="bit" src={require('../img/Bitcoin.png').default} alt="BTC"/><b>{BTCAmount}</b> BTC</div>
                    <div className="feeUSD7" id="usd"> = $ {Math.round(usdBtcRedeem*0.9975*100)/100} </div>
                </div>
                <button onClick={handleClickOpenRedeem1} type="button" className="mainButton2" id="mintButton">
                    <b>Confirm</b></button>
            </div>
        )
    }
}


export default Bridge;
