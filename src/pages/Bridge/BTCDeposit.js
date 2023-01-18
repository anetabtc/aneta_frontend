import CheckMark from "./CheckMark";
import React from 'react';
function BTCDeposit({eBTC, bridgeFee}) {

    const refreshPage = () => {
        window.location.reload();
    }

    return(
        <div className="mainPopup">
            <div className="confContent">
                <div className="confWindow">
                    <div className="confTitle">
                        <div>
                            {/*<img id="bit" src={require('../img/Bitcoin.png').default}*/}
                            {/*      alt="aneta"/>*/}
                            BTC Deposit</div>
                    </div>
                    <div className="confSubmission">
                        <BTCDepositSuccess/>
                        <CheckMark/>
                        <button type="button" id="confButton1" className="confWRS" onClick={refreshPage}><b>Continue</b></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function BTCDepositSuccess(){
    return (
        <div className="textBTC"></div>
    )
}

export default BTCDeposit

