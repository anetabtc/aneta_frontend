import React from "react";

function ErrorPayment() {

    const refreshPage = () => {
        window.location.reload();
    }

    return(
        <div className="mainPopup">
            <div className="confContent">
                <div className="confWindow">
                    <div className="confTitle">
                        Error
                    </div>
                    <div className="error">Something went wrong.</div>
                    <button type="button" id="confButton1" onClick={refreshPage}><b>Try again!</b></button>
                </div>
            </div>
        </div>
    )
}

export default ErrorPayment