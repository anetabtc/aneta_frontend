import React, {useEffect, useState} from 'react'

function ErrorPayment() {

    const refreshPage = () => {
        window.location.reload();
    }

    const [popupFixed, setPopupFixed] = useState(true);

    setTimeout(()=>{
        setPopupFixed(false);
        window.location.reload();
    },5000);

    return(
        popupFixed ? 
        //<div className="mainPopup">
        <div className="popupFixed">
{/*             <div className="confContent">
                <div className="confWindow">
                    <div className="confTitle">
                        Error
                    </div>
                    <div className="error">Something went wrong.</div>
                    <button type="button" id="confButton1" onClick={refreshPage}><b>Try again!</b></button>
                </div>
            </div> */}
            <div id="close">
                    <img src={require('../../../assets/img/dark_close.png').default} alt="X" onClick={refreshPage}/>
            </div>
            <div className="result">
                <div>
                    <img src={require('../../../assets/img/fail.png').default} alt="fail" height="80px"/>
                </div>
                <div className="resultTx">
                    <p>Transaction Failed</p>
                    <p>Please Try Again</p>
                </div>
            </div>
        </div> : ""
    )
}

export default ErrorPayment