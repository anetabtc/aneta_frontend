import React, {useEffect, useState} from 'react';

//////////////////////////////
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAnalytics} from "firebase/analytics";
// Add a second document with a generated ID.
import {addDoc, collection, getDocs, doc} from "firebase/firestore";
import firebaseConfig from "../Bridge/firebaseConfig";
import {getAuth} from "firebase/auth";
import ConfirmationWindow from "../Bridge/ConfirmationWindow";
import ConfirmationWindowRedeem from "../Bridge/ConfirmationWindowRedeem";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


function Transactions() {
    const [products, setProducts] = useState([]);
    const [address, setAddress] = useState('')
    const [idN, setId] = useState([]);
    let txs = [{}]


    useEffect(() => {
        try{
            setAddress(JSON.parse(localStorage.getItem('address')))
        }catch (e) {
            setAddress('')
        }
        loadTx()

    });


    async function loadTx() {
        const colRef = collection(db, "users");
        const snapshot = await getDocs(colRef);
        snapshot.forEach(doc => {
            txs.push(
                {
                    "id": doc.id,
                    "datetime": doc.data().datetime,
                    "amount": doc.data().amount,
                    "btc_address": doc.data().btc_address,
                    "erg_txid": doc.data().erg_txid,
                    "info": doc.data().info,
                    "btc_tx_id": doc.data().btc_tx_id,
                    "erg_address": doc.data().erg_address

                }
            )
        })


        setProducts(txs)

    }

    const [visible, SetVisible] = useState(true);

    function DownUp() {
        if (visible) {

            return (
                <MintPage/>
            )
        } else {
            return (
                <RedeemPage/>
            )
        }
    }

    return (

        <div>

            <div id="radiosTrans">
                <input id="rad3" type="radio" name="radioBtn" onClick={() => SetVisible(true)}/>
                <label className="labelsTr" htmlFor="rad3"><b>Wrap Requests</b></label>
                <input id="rad4" type="radio" name="radioBtn" onClick={() => SetVisible(false)}/>
                <label className="labelsTr" htmlFor="rad4"><b>Unwrap Request</b></label>
                <div id="bckgrnd1"></div>

            </div>
            <DownUp/>

        </div>
    )

    function MintPage() {
        const bridge = 33


        return (
            <div className="mainmenu_transaction">

                <p className="transactionTitle1" >Wrap Requests</p>

                <table className="tableWrap" >
                    <tr>
                        <td className="TD1">Created at</td>
                        <td className="TD1">Transaction (BTC)</td>
                        <td className="TD1">Transaction (eBTC)</td>
                        <td className="TD1">Transaction (Bridge Fee)</td>
                        <td className="TD1" >anetaBTC ID</td>
                        <td className="TD1">Confirmation Status</td>
                    </tr>
                    <hr className="menuHR2"/>


                {
                    products.map((tx) => {

                            if ((tx.info === "Mint Order Submitted" || tx.info === "Mint Order Paid" || tx.info === "Mint Order Processing") && tx.erg_address === address && tx.info != "Mint Order Successful") {


                                return <tr >
                                    <td className="TD1">{new Intl.DateTimeFormat('en-US', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit'
                                    }).format(tx.datetime)}</td>
                                    {/*<td className="TD1" >{tx.datetime.toDate().toString()}</td>*/}

                                    <td className="TD1">{tx.amount} BTC<p
                                        className="underline">{tx.btc_tx_id ? tx.btc_tx_id.substring(0, 7) + '-' + tx.btc_tx_id.substring(tx.btc_tx_id.length - 7, tx.btc_tx_id.length) : ""}</p>
                                    </td>
                                    <td className="TD1">{tx.amount} eBTC <p className="underline">{tx.btc_tx_id ? tx.btc_tx_id.substring(0, 7) + '-' + tx.btc_tx_id.substring(tx.btc_tx_id.length - 7, tx.btc_tx_id.length) : ""}</p></td>
                                    <td className="TD1">{Math.round(bridge * tx.amount * 10000) / 10000} ERG <p
                                        className="underline"> {tx.erg_txid ? tx.erg_txid.substring(0, 7) + '-' + tx.erg_txid.substring(tx.erg_txid.length - 7, tx.erg_txid.length) : ""}</p>
                                    </td>

                                    <td className="TD1">{tx.id ? tx.id.substring(0, 7) + '-' + tx.id.substring(tx.id.length - 7, tx.id.length) : ""}</td>
                                    <td className="TD1"><p className="bord"><b className="boldPo">• Pending </b></p></td>
                                </tr>
                            }
                            if(tx.info === "Mint Order Successful" && tx.erg_address === address) {
                                return <tr>
                                    <td className="TD1">{new Intl.DateTimeFormat('en-US', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit'
                                    }).format(tx.datetime)}</td>
                                    {/*<td className="TD1"> {tx.datetime.toDate().toString()}</td>*/}

                                    <td className="TD1">{tx.amount} BTC<p
                                        className="underline">{tx.btc_tx_id ? tx.btc_tx_id.substring(0, 7) + '-' + tx.btc_tx_id.substring(tx.btc_tx_id.length - 7, tx.btc_tx_id.length) : ""}</p>
                                    </td>
                                    <td className="TD1">{tx.amount} eBTC <p className="underline">{tx.btc_tx_id ? tx.btc_tx_id.substring(0, 7) + '-' + tx.btc_tx_id.substring(tx.btc_tx_id.length - 7, tx.btc_tx_id.length) : ""}</p></td>
                                    <td className="TD1">{Math.round(bridge * tx.amount * 10000) / 10000} ERG <p
                                        className="underline"> {tx.erg_txid ? tx.erg_txid.substring(0, 7) + '-' + tx.erg_txid.substring(tx.erg_txid.length - 7, tx.erg_txid.length) : ""}</p>
                                    </td>

                                    <td className="TD1">{tx.id ? tx.id.substring(0, 7) + '-' + tx.id.substring(tx.id.length - 7, tx.id.length) : ""}</td>
                                    <td className="TD1"><p className="bord"><b className="boldPo1">• Complete</b></p></td>
                                </tr>
                            }
                            else {
                                return null
                            }
                        }
                    )
                }

                </table>
            </div>
        )
    }

    function RedeemPage() {
        const bridge = 33
        return (
            <div className='mainmenu_transaction'>
                <div>


                    <p class="transactionTitle1">Unwrap Requests</p>
                    <table className="tableWrap">
                        <tr border="0">
                            <td className="TD1">Created at</td>
                            <td className="TD1">Transaction (BTC)</td>
                            <td className="TD1">Transaction (eBTC)</td>
                            <td className="TD1">Transaction (Bridge Fee)</td>
                            <td className="TD1">anetaBTC ID</td>
                            <td className="TD1">Confirmation Status</td>
                        </tr>
                        <hr className="menuHR2"/>
                        {
                            products.map((tx) => {

                                    if ((tx.info === "Redeem Order Submitted" || tx.info === "Redeem Order Processing") && tx.erg_address === address) {

                                        return <tr>
                                            <td className="TD1">{new Intl.DateTimeFormat('en-US', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit'
                                            }).format(tx.datetime)}</td>

                                            <td className="TD1">{tx.amount} BTC<p
                                                className="underline">{tx.btc_tx_id ? tx.btc_tx_id.substring(0, 7) + '-' + tx.btc_tx_id.substring(tx.btc_tx_id.length - 7, tx.btc_tx_id.length) : "No data"}</p>
                                            </td>
                                            <td className="TD1">{tx.amount} eBTC <p className="underline">{tx.btc_tx_id ? tx.btc_tx_id.substring(0, 7) + '-' + tx.btc_tx_id.substring(tx.btc_tx_id.length - 7, tx.btc_tx_id.length) : "No data"}</p></td>
                                            <td className="TD1">{Math.round(bridge * tx.amount * 10000) / 10000} ERG <p
                                                className="underline"> {tx.erg_txid ? tx.erg_txid.substring(0, 7) + '-' + tx.erg_txid.substring(tx.erg_txid.length - 7, tx.erg_txid.length) : ""}</p>
                                            </td>

                                            <td className="TD1">{tx.id ? tx.id.substring(0, 7) + '-' + tx.id.substring(tx.id.length - 7, tx.id.length) : ""}</td>
                                            <td className="TD1"><p className="bord"><b className="boldPo">• Pending</b></p></td>
                                        </tr>
                                    }
                                    if(tx.info === "Redeem Order Successful" && tx.erg_address === address) {
                                        return <tr>
                                            <td className="TD1">{new Intl.DateTimeFormat('en-US', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit'
                                            }).format(tx.datetime)}</td>

                                            <td className="TD1">{tx.amount} BTC<p
                                                className="underline">{tx.btc_tx_id ? tx.btc_tx_id.substring(0, 7) + '-' + tx.btc_tx_id.substring(tx.btc_tx_id.length - 7, tx.btc_tx_id.length) : "No data"}</p>
                                            </td>
                                            <td className="TD1">{tx.amount} eBTC <p className="underline">{tx.btc_tx_id ? tx.btc_tx_id.substring(0, 7) + '-' + tx.btc_tx_id.substring(tx.btc_tx_id.length - 7, tx.btc_tx_id.length) : "No data"}</p></td>
                                            <td className="TD1">{Math.round(bridge * tx.amount * 10000) / 10000} ERG <p
                                                className="underline"> {tx.erg_txid ? tx.erg_txid.substring(0, 7) + '-' + tx.erg_txid.substring(tx.erg_txid.length - 7, tx.erg_txid.length) : ""}</p>
                                            </td>

                                            <td className="TD1">{tx.id ? tx.id.substring(0, 7) + '-' + tx.id.substring(tx.id.length - 7, tx.id.length) : ""}</td>
                                            <td className="TD1"><p className="bord"><b className="boldPo1">• Complete</b></p></td>
                                        </tr>
                                    }
                                    else {
                                        return null
                                    }
                                }
                            )
                        }
                    </table>

                </div>
            </div>
        )

    }
}

export default Transactions;