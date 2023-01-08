import React, {useEffect, useState} from 'react';
import getAddress from './getAddress'

//////////////////////////////
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAnalytics} from "firebase/analytics";
// Add a second document with a generated ID.
import {addDoc, collection, getDocs, doc} from "firebase/firestore";
import firebaseConfig from "../Bridge/firebaseConfig";
import ConfirmationWindow from "../Bridge/ConfirmationWindow";
import ConfirmationWindowRedeem from "../Bridge/ConfirmationWindowRedeem";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


function Transactions() {
    const [products, setProducts] = useState([]);
    let txs = []


    useEffect(() => {
        const address = "9gsreni8oGsKvRxCip5A1gijpSroy5LTqGcHNkV7zxq4ppXxkub"
        loadTx(address)
    });


    async function loadTx(erg_address) {
        const colRef = collection(db, "users");
        const snapshot = await getDocs(colRef);
        snapshot.forEach(doc => {
            txs.push(
                doc.data()
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

        return (
            <div className='mainmenu_transaction'>

                    <p className="transactionTitle1">Wrap Requests</p>

                        <table className="tableWrap">
                            <tr border="0">
                                <td>Created at</td>
                                <td>Transaction (BTC)</td>
                                <td>Transaction (eBTC)</td>
                                <td>Transaction (ERG)</td>
                                <td>anetaBTC ID</td>
                                <td>Confirmation Status</td>
                            </tr>
                            <hr className="menuHR"/>
                            {products.map((tx) => (
                                tx.info == "Mint Order Submitted" || tx.info == "Mint Order Paid" ?
                                    <tr key={tx.id}>

                                        <td>{new Intl.DateTimeFormat('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit'
                                        }).format(tx.datetime)}</td>
                                        <td>{tx.amount} BTC</td>
                                        <td>{tx.amount} eBTC</td>
                                        <td className="underline">{tx.btc_address}</td>
                                        <td className="underline">{tx.erg_address}</td>
                                        <td>{tx.info}</td>

                                    </tr>
                                    : null
                            ))}
                        </table>

                </div>
    )
    }

    function RedeemPage() {
        return (
            <div className='mainmenu_transaction'>
                <div>


                    <p class="transactionTitle1">Unwrap Requests</p>
                    <table className="tableWrap">
                        <tr>
                            <td>Created at</td>
                            <td>Amount (BTC)</td>
                            <td>Amount (eBTC)</td>
                            <td>BTC Transaction</td>
                            <td>ERG transaction</td>
                            <td>Confirmation Status</td>
                        </tr>
                        <hr className="menuHR"/>
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
                                    <td>{tx.amount} BTC</td>
                                    <td>{tx.amount} eBTC</td>
                                    <td class="underline">{tx.btc_address}</td>
                                    <td class="underline">{tx.erg_address}</td>
                                    <td>{tx.info}</td>

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
