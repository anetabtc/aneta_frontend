
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
                    <div class="round"><h4>{amount} BTC</h4><h6 className='ClusterL'>Synced</h6> <h6> <a href={"https://tbtc.bitaps.com/mhnQqgcZQjxXW4he5vZYHPfCaBx2UGorC5"} target={"_blank"}>View Vault ➜</a></h6>
                    </div>
                </div>
                <div><h3 className="infoCluster">eBTC minted</h3>
                    <div class="round"><h4>{eBTCAmount} eBTC</h4><h6 className='ClusterL'>Synced</h6><h6><a href={"https://explorer.ergoplatform.com/en/addresses/9fsYtXufgnv65JRDMWEHqGcgSRwBxdfkJbmD6tUozxE1J9zE8Dw"} target={"_blank"}>View supply
                        ➜</a></h6></div>
                </div>
                <div><h3 className="infoCluster">Network Security</h3>
                    <div class="round"><h4>{security}</h4><h6 className='ClusterL'>anetaBTC Bridge</h6></div>
                </div>
            </div>
            <div className='menu_dash'>
                <div><h3 className="infoCluster">BTC Network</h3>
                    <div class="round"><h4>Synced</h4><h6 className='ClusterL'>Block {btcCH}</h6><h6><a href={"https://btc.bitaps.com/"} target={"_blank"}>View BTC height
                        ➜</a></h6></div>
                </div>
                <div><h3 className="infoCluster">ERG Network</h3>
                    <div class="round"><h4>Synced</h4><h6 className='ClusterL'>Block {ergCH}</h6><h6><a href={"https://testnet.ergoplatform.com/"} target={_blank}>View ERG height
                        ➜</a></h6></div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
<script type="text/javascript">

</script>
