import {useState} from "react";
import {OutputBuilder, TransactionBuilder} from "@fleet-sdk/core";
import redeem from "./redeem";
import getReceiverAddress from "./getReceiverAddress";
import getCurrentHeight from "./getCurrentHeight";
const DEFAULT_EXPLORER_URL = "https://api.ergoplatform.com";

const sendFeeFunction = async function sendFee( erg, nautilusAddress) {

    let receiverAddress = await getReceiverAddress();
    console.log("here", receiverAddress)
    let result = ''
    try{
        let currentHeight = await getch();
        console.log(currentHeight)
        let fee = BigInt(20000000)

        let feeCalculator = erg * 1000000000
        let number = Math.trunc(feeCalculator)
        let bridgeFee = BigInt(number)
        let inputs = await ergo.get_utxos();


        // const unsignedTransaction = new TransactionBuilder(currentHeight)
        //     .payFee(fee)
        //     .build("EIP-12");

        const unsignedTransaction = new TransactionBuilder(currentHeight)
            .from(inputs)
            .to(new OutputBuilder(bridgeFee, receiverAddress))
            .payFee(fee)
            .sendChangeTo(nautilusAddress)
            .build("EIP-12");

        console.log(unsignedTransaction)


        let signedTransaction = await ergo.sign_tx(unsignedTransaction);
        console.log(signedTransaction)

        let outputZeroBoxId = signedTransaction.outputs[0].boxId;
        let txInfo = await ergo.submit_tx(signedTransaction);

        // console.log(txInfo, outputZeroBoxId)

        console.log("tx_info", txInfo)

        result = txInfo
    }catch(e){
        console.log("Error", e)
        result = ''
    }

    return result

}

async function getch(explorerUrl = DEFAULT_EXPLORER_URL){
    console.log("currentheight")
    let url = `${explorerUrl}/api/v1/blocks?limit=1`;
    let response = await fetch(url);
    let json = await response.json();
    console.log(json)
    return json.total;
}

export default sendFeeFunction;