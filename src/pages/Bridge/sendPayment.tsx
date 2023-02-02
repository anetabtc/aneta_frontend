import {useState} from "react";
import {OutputBuilder, SConstant, SColl, TransactionBuilder, SByte, SLong} from "@fleet-sdk/core";

const DEFAULT_EXPLORER_URL = "https://api.ergoplatform.com";

const VAULT_ERG_WALLET_ADDRESS = "9hp4qZYXu9UbMZbiGkZ185HtZeqAN5DN2siyzGB8V5ZM39GZfRq"

const sendPaymentFunction = async function sendTransaction1(price, btcAddress, nautilusAddress) {

    let result = ''
    let receiverAddress = VAULT_ERG_WALLET_ADDRESS
    let currentHeight = await getch();
    console.log(currentHeight)
    let amountCalculator = price * 33 * 1000000000;
    let amountTrunc = Math.trunc(amountCalculator)
    let amountToSend = BigInt(amountTrunc);

    let tokenAmountCalculator = price * 100000000;
    let tokenAmountTrunc = Math.trunc(tokenAmountCalculator)
    let tokenAmountToSend = BigInt(tokenAmountTrunc);
    let feeAmount = BigInt(20000000);
    let fee = feeAmount;


    try{
        let inputs = await ergo.get_utxos()

        const unsignedTransaction = new TransactionBuilder(currentHeight)
            .from(inputs)
            .to(new OutputBuilder(amountToSend, receiverAddress)
                .addTokens([
                    {tokenId: "60da81069ae38c78bda38a738abcfb6c31b58d2269b25db596f5783b19f77690", amount: tokenAmountToSend}
                ])
                .setAdditionalRegisters({
                    R4: SConstant(SColl(SByte, Buffer.from(btcAddress, "utf-8"))),
                })
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

async function getch(explorerUrl = DEFAULT_EXPLORER_URL){
    console.log("currentheight")
    let url = `${explorerUrl}/api/v1/blocks?limit=1`;
    let response = await fetch(url);
    let json = await response.json();
    console.log(json)
    return json.total;
}



export default sendPaymentFunction;