import React from 'react'

function Bridge() {
  return (
    <div id="content1">
          <div id="radios">
            <input id="rad1" type="radio" name="radioBtn" checked />
            <label class="labels" for="rad1"><b>WRAP</b></label>
            <input id="rad2" type="radio" name="radioBtn" />
            <label class="labels" for="rad2"><b>UNWRAP</b></label>
            <div id="bckgrnd"></div>
          </div>

          
          <div id="WRAP">
            <p class="title">Mint anetaBTC by Wrapping BTC</p>  
            <input type="text" class="btcInput" size="30" required />
            <p /><p />
            <div class="flex-container">
              <div class="left">Bridge Fee</div>
              <div class="right"><b>0</b> BTC</div>
            </div>
            <p /><p />
            <div class="flex-container">
              <div class="left">Security Deposit</div>
              <div class="right"><b>0</b> ADA</div>
            </div>
            <p /><p />
            <div class="flex-container">
              <div class="left">You Will Receive</div>
              <div class="right"><b>0</b> anetaBTC</div>
            </div>
            <button type="button" class="mainButton" id="mintButton"><b>MINT anetaBTC</b></button>
          </div>
          
         
        </div>

  )
}

export default Bridge;
<script type="text/javascript">

</script>