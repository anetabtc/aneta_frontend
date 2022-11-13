import {useState} from "react";
import {OutputBuilder, TransactionBuilder} from "@fleet-sdk/core";
import redeem from "./redeem";

const DEFAULT_EXPLORER_URL = "https://api-testnet.ergoplatform.com";
const RECEIVER_ADDRESS = "9fsYtXufgnv65JRDMWEHqGcgSRwBxdfkJbmD6tUozxE1J9zE8Dw"

const sendPaymentFunction = async function sendTransaction(price, btcAddress, nautilusAddress, explorerUrl = DEFAULT_EXPLORER_URL, receiverAddress = RECEIVER_ADDRESS, ) {

    const [txInfo, setTxInfo] = useState('')
    sendTransaction1(price, btcAddress, nautilusAddress).then(r => {
        console.log("log:", r)
        setTxInfo(r)
    })

    return txInfo

}

export async function sendTransaction1(price, btcAddress, nautilusAddress, explorerUrl = DEFAULT_EXPLORER_URL, receiverAddress = RECEIVER_ADDRESS, ) {

    console.log("Start")
    console.log(price + " Price")
    console.log(receiverAddress + " address")
    let currentHeight = await getCurrentHeight(explorerUrl);
    let amountToSend = price * 33 * 1000000000;
    let tokenAmountToSend = price * 100000000;
    let feeAmount = 2 * 10000000;
    let fee = feeAmount;
    console.log(amountToSend + " Amount to send")
    console.log(feeAmount + " Fee to send")
    let inputs = await ergo.get_utxos();


    console.log(inputs + "Input")


    const unsignedTransaction = new TransactionBuilder(currentHeight)
        .from(inputs)
        .to(new OutputBuilder(amountToSend, receiverAddress)
            .addTokens([
                {tokenId: "60da81069ae38c78bda38a738abcfb6c31b58d2269b25db596f5783b19f77690", amount: tokenAmountToSend}
            ])
        )
        .sendChangeTo(nautilusAddress).payFee(fee)
        .build("EIP-12");

    console.log(unsignedTransaction)


    let signedTransaction = await ergo.sign_tx(unsignedTransaction);
    console.log(signedTransaction)

    let outputZeroBoxId = signedTransaction.outputs[0].boxId;
    let txInfo = await ergo.submit_tx(signedTransaction);

    console.log(txInfo, outputZeroBoxId)

    console.log("tx_info", txInfo)

    return txInfo

}

async function getCurrentHeight(explorerUrl = DEFAULT_EXPLORER_URL) {
    console.log("currentheight")
    let url = `${explorerUrl}/api/v1/blocks?limit=1`;
    let response = await fetch(url);
    let json = await response.json();
    console.log(json)
    return json.total;
}

export default sendPaymentFunction;