import {useState} from "react";
import {OutputBuilder, TransactionBuilder} from "@fleet-sdk/core";
import redeem from "./redeem";
import getReceiverAddress from "./getReceiverAddress";
import getCurrentHeight from "./getCurrentHeight";

const sendFeeFunction = async function sendFee( erg, nautilusAddress) {

    let receiverAddress = getReceiverAddress()
    console.log("here", receiverAddress)
    let result = ''
    try{
        let currentHeight = await getCurrentHeight();
        console.log(currentHeight)
        let fee = 2 * 10000000;
        let bridgeFee = erg * 1000000000
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


export default sendFeeFunction;