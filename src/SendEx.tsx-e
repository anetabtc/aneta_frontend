// import * as React from "react";
// import {useState} from "react";
// import {ErgoAddress, OutputBuilder, TransactionBuilder} from "@fleet-sdk/core";
//
// const DEFAULT_EXPLORER_URL = "https://api-testnet.ergoplatform.com";
//
//
// function SendEx() {
//
//     const [selected, setSelected] = useState("Ergo")
//     const [userAddress, setUserAddress] = useState('');
//     const [connected, setConnected] = useState(false);
//     const [visible, setVisible] = useState(false);
//
//
//     async function handleWalletConnect() {
//
//         if (!connected) {
//             const isConnected = await ergoConnector.nautilus.connect();
//
//             if (isConnected) {
//                 const address = ergo.get_change_address();
//                 address.then((value) => {
//                     setUserAddress(value)
//                 });
//             }
//
//             setConnected(true)
//         } else {
//             visible ? setVisible(false) : setVisible(true)
//         }
//     }
//
//     async function disconnect() {
//
//         await ergoConnector.nautilus.disconnect();
//         setUserAddress('')
//
//         setConnected(false)
//         setVisible(false)
//     }
//
//
//     // useEffect(() => {
//     //     handleWalletConnect();
//     // }, [])
//     return (
//         <div>
//             <div id="navbar_menu">
//
//                 <div id="head">
//                     <a target="_blank" href="https://bitcoinfaucet.uo1.net/">
//                         <div className="menuButton">
//                             Get Test BTC
//                         </div>
//                     </a>
//                     <div><DropDown selected={selected} setSelected={setSelected}/></div>
//                     <div>
//                         <div className="menuButton" onClick={handleWalletConnect}>
//                             {userAddress ? userAddress.substring(0, 4) + '...' + userAddress.substring(userAddress.length - 4, userAddress.length) : 'Connect wallet'}
//                         </div>
//                         {visible ?
//                             <div className="menuButton" id="disconnect" onClick={disconnect}>Disconnect</div> : ""}
//
//                         <button
//                             onClick={() => sendTransaction(0.01, "9fsYtXufgnv65JRDMWEHqGcgSRwBxdfkJbmD6tUozxE1J9zE8Dw")}
//                         >Send
//                         </button>
//
//                     </div>
//                     <div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//
//
//     )
// }
//
//
// function DropDown({selected, setSelected}) {
//     const [isActive, setIsActive] = useState(false)
//
//     // function DownUp() {
//     //     if (isActive) {
//     //         return (
//     //             <img id="down" alt="aneta" src={require('./img/up.png')}/>
//     //         )
//     //     } else {
//     //         return (
//     //             <img id="down" alt="aneta" src={require('./img/down.png')}/>
//     //         )
//     //     }
//     // }
//
//     const options = ["Ergo", "Cardano"];
//     return (
//         <div className="dropdown">
//             <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
//                 <div className="imgwrapper">
//
//
//                 </div>
//                 <div>{selected}</div>
//
//
//             </div>
//
//
//             {isActive && (
//                 <div className="dropdown-content">
//                     <p id="navText">Select Network</p>
//                     {options.map((option) => (
//                         <div onClick={(e) => {
//                             setSelected(option)
//                             setIsActive(false)
//                         }}
//                              className="dropdown-item">
//                             <div>{option}</div>
//                             {selected === option && (
//                                 <div className="selected"></div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     )
// }
//
//
// export async function sendTransaction(price, receiverAddress, explorerUrl = DEFAULT_EXPLORER_URL) {
//
//     console.log("Start")
//     console.log(price + " Price")
//     console.log(receiverAddress + " address")
//     let currentHeight = await getCurrentHeight(explorerUrl);
//     let amountToSend = price + (1000000 * 2);
//     console.log(amountToSend+" Amount to send")
//     let inputs = await ergo.get_utxos();
//
//
//     console.log(inputs + "Input")
//
//     const unsignedTransaction = new TransactionBuilder(currentHeight)
//         .from(inputs)
//         .to(new OutputBuilder(amountToSend, receiverAddress)
//             .addTokens([
//                 { tokenId: "60da81069ae38c78bda38a738abcfb6c31b58d2269b25db596f5783b19f77690", amount: 1n }
//             ])
//         )
//         .sendChangeTo(receiverAddress)
//         .payMinFee()
//         .build("EIP-12");
//
//     console.log(unsignedTransaction)
//
//     // const unsignedTransaction = new TransactionBuilder(currentHeight)
//     //     .from(inputs)
//     //     .to(
//     //         new OutputBuilder(1000000n, "9gNvAv97W71Wm33GoXgSQBFJxinFubKvE6wh2dEhFTSgYEe783j")
//     //             .mintToken({
//     //                 name: "TestToken",
//     //                 amount: 21000000n,
//     //                 decimals: 4,
//     //                 description: "Just a test token"
//     //             })
//     //     )
//     //     .sendChangeTo("9i2bQmRpCPLmDdVgBNyeAy7dDXqBQfjvcxVVt5YMzbDud6AvJS8")
//     //     .payMinFee()
//     //     .build();
//
//     // console.log(unsignedTransaction)
//
//     let signedTransaction = await ergo.sign_tx(unsignedTransaction);
//     console.log(signedTransaction)
//
//     let outputZeroBoxId = signedTransaction.outputs[0].boxId;
//     let txInfo = await ergo.submit_tx(signedTransaction);
//     console.log(txInfo, outputZeroBoxId)
//     return { txId: txInfo, boxId: outputZeroBoxId };
// }
//
// async function getCurrentHeight(explorerUrl = DEFAULT_EXPLORER_URL) {
//     console.log("currentheight")
//     let url = `${explorerUrl}/api/v1/blocks?limit=1`;
//     let response = await fetch(url);
//     let json = await response.json();
//     console.log(json)
//     return json.total;
// }
//
// export default SendEx;
