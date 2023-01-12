import React, {useEffect} from "react";
import redeem from "./redeem";

function RedeemConfWindow({eBTC, btcAddress, nautilusAddress, txInfo}) {

    useEffect(() => {
        redeem(eBTC, btcAddress, nautilusAddress, txInfo)
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
        </div>
    )
}

export default RedeemConfWindow