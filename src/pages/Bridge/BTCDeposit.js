import CheckMark from "./CheckMark";
import React from 'react';
function BTCDeposit({eBTC, bridgeFee}) {

    const refreshPage = () => {
        window.location.reload();
    }

     return(
        <div className="mainPopup">
            <div className="confContent" id="top_card">
                <div className="confWindow">
                    <div className="confTitle">
                        <div>
                        <img id="bitcoin" src={require('../img/Bitcoin.png').default} alt="aneta"/>
                            BTC Deposit</div>
                    </div>
                    <div className="confSubmission">
                    <div className="depositBTC">
                        <div>Bridge Fee Payment Submitted</div>
                        <div>eBTC will arrive in your wallet shortly.</div>
                        <div>Transactions can take around 10 minutes to process.</div>
                        <CheckMark/>
                        <div>Your unique anetaBTC ID for this entire transaction is:</div>
                        <div id="idTransaction"><b>"Pendind idXXXXX"</b></div>
                        <div>This unique ID is also available in your Transactions tab. If you need support, this ID will help us assist you.</div>
                        <button type="button" id="confButton1" className="confWRS" onClick={refreshPage}><b>Continue</b></button>
                    </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}


export default BTCDeposit

