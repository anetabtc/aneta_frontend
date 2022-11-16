const redeem = function redeemFunction(price, btcAddress, nautilusAddress, txInfo)
{
    // calling into the /mint endpoint in the backend

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            amount: price.toString(),
            btc_wallet_addr: btcAddress,
            network: "testnet",
            wallet_addr: nautilusAddress.toString(),
            tx_id: txInfo.toString()
        }).toString()
    };

    fetch("http://localhost:5004/redeem", requestOptions)
        .then(res => res.json())
        .then((response) => {
            console.log("Response from /redeem endpoint: " + JSON.stringify(response))
            let taskId = response['data']['task_id']
            const interval = setInterval(() => {
                fetch("http://localhost:5004/statusRedeem/" + taskId)
                    .then(res1 => res1.json())
                    .then((statusResponse) => {
                        console.log("Status response: " + JSON.stringify(statusResponse))
                        if (statusResponse['data']['task_status'] == 'finished') {
                            clearInterval(interval);
                            if (statusResponse['data']['task_result']['success'] === true) {
                                console.log("Resulting operation is success!")
                            } else {
                                console.log("Resulting operation did not complete successfully!")
                            }
                        } else if (statusResponse['data']['task_status'] == 'failed') {
                            clearInterval(interval);
                            console.log("Resulting operation has failed to finish!")
                        } else {
                            console.log("trying again...")
                        }
                    })
            }, 5000);
        });
};

export default redeem