
import getCurrentHeight from "../Bridge/getCurrentHeight";
import React, {useEffect, useState} from 'react'

function Dashboard() {

    const [amount, setAmount] = useState()
    const [eBTCAmount, setEBTCAmount] = useState()
    const [security, setSecurity] = useState('Refresh page')
    const [ergCH, setErgCH] = useState()
    const [btcCH, setBTCCH] = useState()
    

    useEffect(() => {

        function get() {

            console.log("fffff")

            fetch("http://localhost:5004/getBTCVaultAmount")
                .then(res1 => res1.json())
                .then((amount) => {
                    console.log("Vault BTC amount: " + JSON.stringify(amount.amount))
                    setAmount(amount.amount)
                })

            fetch("http://localhost:5004/getEBTCVaultAmount")
                .then(res1 => res1.json())
                .then((amount) => {
                    console.log("Vault EBTC amount: " + JSON.stringify(amount.amount))
                    setEBTCAmount(amount.amount)
                })

            fetch("http://localhost:5004/securityMessage")
                .then(res1 => res1.json())
                .then((secure) => {
                    if (secure.message === "Secure") {
                        setSecurity(secure.message)
                    }
                })
            
            fetch("https://blockchain.info/latestblock")
                .then((response) => response.json())
                .then((result) => setBTCCH(result.height));
        
        }
        
        async function CH(){
            let currentHeight = await getCurrentHeight();
            console.log("fff", currentHeight);
            setErgCH(currentHeight)
        }

        get();
        CH();
    }, [])


    return (
        <div id="pageDashboard">
            <div className='menu_dashboard'>


                <div><h3 className="infoCluster">BTC in Vault</h3>
                    <div class="round"><h4>{amount} <br/>BTC</h4><h6 className='ClusterL'>Synced</h6> <h6> View Vault ➜</h6>
                    </div>
                </div>
                <div><h3 className="infoCluster">eBTC minted</h3>
                    <div class="round"><h4>{eBTCAmount} <br/>eBTC</h4><h6 className='ClusterL'>Synced</h6><h6>View supply
                        ➜</h6></div>
                </div>
                <div><h3 className="infoCluster">Network Security</h3>
                    <div class="round"><h4>{security}</h4><h6 className='ClusterL'>anetaBTC Bridge</h6><h6>View supply
                        ➜</h6></div>
                </div>

                <div><h3 className="infoCluster">BTC Network</h3>
                    <div class="round"><h4>Synced</h4><h6 className='ClusterL'>Block {btcCH}</h6><h6>View BTC height
                        ➜</h6></div>
                </div>
                <div><h3 className="infoCluster">ERG Network</h3>
                    <div class="round"><h4>Synced</h4><h6 className='ClusterL'>Block {ergCH}</h6><h6>View ERG height
                        ➜</h6></div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
<script type="text/javascript">

</script>
