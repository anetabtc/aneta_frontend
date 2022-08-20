import React, {useState} from 'react'

function Bridge() {

  const[visible, SetVisible]=useState(true);
const[popup, setPopup] = useState(false);
const handleClickOpen=()=>{
  setPopup(!popup);

}
function DownUp(){
    if(visible){
        return (
          <div id="WRAP">
            <p className="title">Mint anetaBTC by Wrapping BTC</p>
            <input type="text" className="btcInput" size="30" placeholder="0.00" required /><br />
            <div className="lblInp">
            BTC<br />
            ~ $ 0.00
            </div>
                      <p /><p />
                      <div className="flex-container">
                        <div className="left">Bridge Fee</div>
                        <div className="right"><img id="bit" src={require('../img/Bitcoin.png')}/><b>0</b> BTC</div>
                      </div>
                      <p /><p />
                      <div className="flex-container">
                        <div className="left">Security Deposit</div>
                        <div className="right"><img id="bit" src={require('../img/Ergo.png')}/><b>0</b> ADA</div>
                      </div>

                      <p /><p />
                      <hr id="menuHR1"></hr>
                      <div className="flex-container">
                        <div className="left">You Will Receive</div>
                        <div className="right"><b>0</b> anetaBTC</div>
                      </div>
                      <button onClick={handleClickOpen} type="button" className="mainButton" id="mintButton" ><b>Mint anetaBTC</b></button>
                    </div>
        )
    }else{
        return (
          <div id="UNWRAP">
            <p className="title">Redeem BTC</p>
            <input type="text" className="btcInput" size="30" placeholder="0.00" required /><br />
            <div className="lblInp2">
            anetaBTC<br />
            ~ $ 0.00
            </div><p/>
              <p className="title2">BTC address</p>
            <input type="text" className="btcInputAddress" size="30" placeholder="Enter your BTC address" required /><br />
                      <p /><p />
                      <div className="flex-container">
                        <div className="left">BTC network Fee</div>
                        <div className="right"><img id="bit" src={require('../img/Bitcoin.png')}/><b>0</b> BTC</div>
                      </div>
                      <p /><p />
                      <div className="flex-container">
                        <div className="left">ERG network Fee</div>
                        <div className="right"><img id="bit" src={require('../img/Ergo.png')}/><b>0</b> ERG</div>
                      </div>

                      <p /><p />
                      <hr id="menuHR1"></hr>
                      <div className="flex-container">
                        <div className="left">You Will Receive</div>
                        <div className="right"><b>0</b> BTC</div>
                      </div>
                      <button onClick={handleClickOpen} type="button" className="mainButton" id="mintButton" ><b>Confirm</b></button>
                    </div>
        )
    }
}
  return (

    <div >
    {popup?
    <div className="mainPopup">
    <div className="popup">
    <div className="divLabel">
  <img id="bitcoin" src={require('../img/Bitcoin.png')}/>  <label className="labelMain"> BTC Deposit </label>
</div>
    <div className="menuPopup">
<br />
<label className="SingleTrans1">Send 1 BTC </label>
<p />
= $30,521.00
<p />
<label className="SingleTrans2">In a single transaction to: </label> <p/>
  <div type="text" className="addressBTC">
  <p className="labelAdd">
  tb1q03i4ngjso93ld8ehtksnf5mndlds8rndnmqoe
</p>
  </div><div className="timing">
<p />Within <b>0 Days 23:59:59</b><p />
</div>
<br />
<div className="attention">
<span><b>Attention:</b> Some Bitcoin wallets display values in mBTC. In </span><br/><span>this case, ensure you send the correct amount: <b>1000mBTC</b></span></div>
<br/>
<img className="qr" src={require('../img/qr.png')}/>
<br /><br/> <div className="note">
<b>Note:</b> Payments may take over 10 minutes to confirm. Don’t worry, your funds are safe :)
</div>
<p />
<button className="btnPayment">I have made the payment</button>

    </div>

    </div>
    </div>:""}










    <div id="content1">
          <div id="radios">
            <input id="rad1" type="radio" name="radioBtn" onClick={()=>SetVisible(true)}   />
            <label className="labels" htmlFor="rad1"><b>WRAP</b></label>
            <input id="rad2" type="radio" name="radioBtn" onClick={()=>SetVisible(false)} />
            <label className="labels" htmlFor="rad2"><b>UNWRAP</b></label>
            <div id="bckgrnd"></div>
          </div>



<DownUp/>



        </div>
</div>
  )
}


export default Bridge;
<script type="text/javascript">

</script>
