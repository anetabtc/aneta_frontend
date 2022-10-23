import CheckMark from "./CheckMark";

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
                            {/*<img id="bit" src={require('../img/Bitcoin.png')}*/}
                            {/*      alt="aneta"/>*/}
                            BTC Deposit</div>
                    </div>
                    <div className="confSubmission">
                        <div className="textBTC"></div>
                        <CheckMark/>
                        <button type="button" id="confButton1" className="confWRS" onClick={refreshPage}><b>Continue</b></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BTCDeposit