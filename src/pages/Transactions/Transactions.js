import React, {useEffect, useState} from 'react';
import getAddress from './getAddress'

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
    const [idN, setId] = useState([]);
    let txs = [{}]


    useEffect(() => {
        const address = "9gsreni8oGsKvRxCip5A1gijpSroy5LTqGcHNkV7zxq4ppXxkub"
        loadTx(address)
    });


    async function loadTx(erg_address) {
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
                    "info": doc.data().info

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
            <div className={"mainmenu_transaction"}>

                <p className="transactionTitle1">Wrap Requests</p>

                <table className="tableWrap">
                    <tr>
                        <td>Created at</td>
                        <td>Transaction (BTC)</td>
                        <td>Transaction (eBTC)</td>
                        <td>Transaction (Bridge Fee)</td>
                        <td>anetaBTC ID</td>
                        <td>Confirmation Status</td>
                    </tr>
                    <hr className="menuHR2"/>
                </table>

                {
                    products.map((tx) => (
                        tx.info === "Mint Order Submitted" || tx.info === "Mint Order Paid" ?
                            <tr>
                                <td>{new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit'
                                }).format(tx.datetime)}</td>
                                <td>{tx.amount} BTC<p className="underline">{tx.btc_address ? tx.btc_address.substring(0, 7) + '-' + tx.btc_address.substring(tx.btc_address.length - 7, tx.btc_address.length) : ""}</p></td>
                                <td >{tx.amount} eBTC <p className="underline"> {tx.btc_address ? tx.btc_address.substring(0, 7) + '-' + tx.btc_address.substring(tx.btc_address.length - 7, tx.btc_address.length) : ""}</p></td>
                                <td >{Math.round(bridge*tx.amount*10000)/10000} ERG <p className="underline"> {tx.erg_txid ? tx.erg_txid.substring(0, 7) + '-' + tx.erg_txid.substring(tx.erg_txid.length - 7, tx.erg_txid.length) : ""}</p></td>

                                <td >{tx.id}</td>
                                <td ><p className="bord"> <b className="boldPo">•</b>Complete</p></td>
                            </tr> : null
                    ))
                }


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
                            <td>Created at</td>
                            <td>Transaction (BTC)</td>
                            <td>Transaction (eBTC)</td>
                            <td>Transaction (Bridge Fee)</td>
                            <td>anetaBTC ID</td>
                            <td>Confirmation Status</td>
                        </tr>
                        <hr className="menuHR2"/>
                        {products.map((tx) => (
                            tx.info == "Redeem Order Submitted" ?
                                <tr key={tx.id}>

                                    <td>{new Intl.DateTimeFormat('en-US', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit'
                                    }).format(tx.datetime)}</td>
                                    <td>{tx.amount} BTC<p
                                        className="underline">{tx.btc_address ? tx.btc_address.substring(0, 7) + '-' + tx.btc_address.substring(tx.btc_address.length - 7, tx.btc_address.length) : ""}</p>
                                    </td>
                                    <td>{tx.amount} eBTC <p
                                        className="underline"> {tx.btc_address ? tx.btc_address.substring(0, 7) + '-' + tx.btc_address.substring(tx.btc_address.length - 7, tx.btc_address.length) : ""}</p>
                                    </td>
                                    <td>{Math.round(bridge * tx.amount * 10000) / 10000} ERG <p
                                        className="underline"> {tx.erg_txid ? tx.erg_txid.substring(0, 7) + '-' + tx.erg_txid.substring(tx.erg_txid.length - 7, tx.erg_txid.length) : ""}</p>
                                    </td>
                                    <td>{tx.id}</td>
                                    <td><p className="bord"><b className="boldPo">•</b>Complete</p></td>

                                </tr>
                                : null
                        ))}
                    </table>

                </div>
            </div>
        )

    }
}

export default Transactions;
