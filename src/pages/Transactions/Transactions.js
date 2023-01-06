import React, {useEffect, useState} from 'react';
import getAddress from './getAddress'

//////////////////////////////
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAnalytics} from "firebase/analytics";
// Add a second document with a generated ID.
import {addDoc, collection, getDocs, doc} from "firebase/firestore";
import firebaseConfig from "../Bridge/firebaseConfig";

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
        console.log(txs)
        console.log(txs.length)
        // console.log(txs.info)

                setProducts(txs)






    }

    return (
        <div className='mainmenu_transaction'>
            <div className="menuTr">
                <p class="transactionTitle1">Wrap Requests</p>
                <b>
                    <table>
                        <tr>
                            <td>Created at</td>
                            <td>Amount (BTC)</td>
                            <td>Amount (eBTC)</td>
                            <td>BTC Transaction</td>
                            <td>ERG transaction</td>
                            <td>Confirmation Status</td>
                        </tr>

                        {products.map((tx) => (
                            tx.info == "Mint Order Submitted" || tx.info == "Mint Order Paid" ?
                            <tr key={tx.id}>

                                <td>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(tx.datetime)}</td>
                                <td>{tx.amount} BTC</td>
                                <td>{tx.amount} eBTC</td>
                                <td class="underline">{tx.btc_address}</td>
                                <td class="underline">{tx.erg_address}</td>
                                <td>{tx.info}</td>

                            </tr>
                                : null
                        ))}
                    </table>
                    <br/>
                    <p class="transactionTitle2">Unwrap Requests</p>
                    <table>
                        <tr>
                            <td>Created at</td>
                            <td>Amount (BTC)</td>
                            <td>Amount (eBTC)</td>
                            <td>BTC Transaction</td>
                            <td>ERG transaction</td>
                            <td>Confirmation Status</td>
                        </tr>
                        {products.map((tx) => (
                            tx.info == "Redeem Order Submitted" ?
                                <tr key={tx.id}>

                                    <td>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(tx.datetime)}</td>
                                    <td>{tx.amount} BTC</td>
                                    <td>{tx.amount} eBTC</td>
                                    <td class="underline">{tx.btc_address}</td>
                                    <td class="underline">{tx.erg_address}</td>
                                    <td>{tx.info}</td>

                                </tr>
                                : null
                        ))}
                    </table>
                </b>
            </div>
        </div>
    )
}

export default Transactions;
<script type="text/javascript">

</script>



