function runMint(args){
    let data = {amount: 1, btc_vault_id: 0, btc_wallet_id: "Wallet1-testnet", network: "testnet", vault_id: 0, wallet_id: 0};
    console.log(JSON.stringify(data));
    (async () => {
      const rawResponse = await fetch('http://localhost:5004/mint', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type':  'application/x-www-form-urlencoded'
        },
        mode: 'cors',
        cache: 'default',
        body: 'amount=1&btc_vault_id=0&btc_wallet_id=Wallet1-testnet&network=testnet&vault_id=0&wallet_id=0',
      });
      const content = await rawResponse.json();
      console.log(content);
   return content;
    })();
  }


  function checkStatus(args) {
    
  }