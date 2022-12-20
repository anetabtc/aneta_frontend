import React, {useEffect} from 'react';
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
    }

    return (
        <div className='mainmenu_transaction'>
            <div className="menuTr">
                <p class="transactionTitle1">Wrap Requests</p>
                <b>
                    <table>
                        <tr>
                            <td>Updated</td>
                            <td>Amount (anetaBTC)</td>
                            <td>BTC Transaction</td>
                            <td>Confirmation Status</td>
                        </tr>
                        </tr>
                    </table>
                    <br/>
                    <p class="transactionTitle2">Unwrap Requests</p>
                    <table>
                        <tr>
                            <td>Updated</td>
                            <td>Amount (anetaBTC)</td>
                            <td>BTC Transaction</td>
                            <td>Confirmation Status</td>
                        </tr>
                    </table>
                </b>
            </div>
        </div>
    )
}

export default Transactions;
<script type="text/javascript">

</script>
