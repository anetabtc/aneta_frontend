import {useState} from "react";
import {OutputBuilder, TransactionBuilder} from "@fleet-sdk/core";
import redeem from "./redeem";
import getReceiverAddress from "./getReceiverAddress";
import getCurrentHeight from "./getCurrentHeight";

const sendPaymentFunction = async function sendTransaction1(price, btcAddress, nautilusAddress) {

    let result = ''
    let receiverAddress = await getReceiverAddress()
    let currentHeight = await getCurrentHeight();
    console.log(currentHeight)
    let amountToSend = price * 33 * 1000000000;
    let tokenAmountToSend = price * 100000000;
    let feeAmount = 2 * 10000000;
    let fee = feeAmount;


    try{
        let inputs = await ergo.get_utxos()

        const unsignedTransaction = new TransactionBuilder(currentHeight)
            .from(inputs)
            .to(new OutputBuilder(amountToSend, receiverAddress)
                .addTokens([
                    {tokenId: "60da81069ae38c78bda38a738abcfb6c31b58d2269b25db596f5783b19f77690", amount: tokenAmountToSend}
                ])
            )
            .sendChangeTo(nautilusAddress).payFee(fee)
            .build("EIP-12");



        let signedTransaction = await ergo.sign_tx(unsignedTransaction)

        let outputZeroBoxId = signedTransaction.outputs[0].boxId;
        let txInfo = await ergo.submit_tx(signedTransaction)

        result = txInfo
    }catch(e){
        console.log("error", e)
        result = ''
    }


    return result

}



export default sendPaymentFunction;