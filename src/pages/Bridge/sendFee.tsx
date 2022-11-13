import {useState} from "react";
import {OutputBuilder, TransactionBuilder} from "@fleet-sdk/core";
import redeem from "./redeem";

const DEFAULT_EXPLORER_URL = "https://api-testnet.ergoplatform.com";
const RECEIVER_ADDRESS = "9fsYtXufgnv65JRDMWEHqGcgSRwBxdfkJbmD6tUozxE1J9zE8Dw"

const sendFeeFunction = async function sendFee( explorerUrl = DEFAULT_EXPLORER_URL, receiverAddress = RECEIVER_ADDRESS, ) {

    const [nautilusAddress, setNautilusAddress] = useState('');

    const address1 = ergo.get_change_address();
    address1.then((value) => {
        setNautilusAddress(value)
    });

    console.log("Start")
    console.log(receiverAddress + " address")
    let currentHeight = await getCurrentHeight(explorerUrl);
    let fee = 2 * 10000000

    let inputs = await ergo.get_utxos();

    console.log(inputs + "Input")


    const unsignedTransaction = new TransactionBuilder(currentHeight)
        .from(inputs)
        .to(new OutputBuilder(0, receiverAddress))
        .sendChangeTo(nautilusAddress).payFee(fee)
        .build("EIP-12");

    console.log(unsignedTransaction)


    let signedTransaction = await ergo.sign_tx(unsignedTransaction);
    console.log(signedTransaction)

    let outputZeroBoxId = signedTransaction.outputs[0].boxId;
    let txInfo = await ergo.submit_tx(signedTransaction);

    // console.log(txInfo, outputZeroBoxId)

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

export default sendFeeFunction;