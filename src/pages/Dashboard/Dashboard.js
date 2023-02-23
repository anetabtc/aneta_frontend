import React, {useEffect, useState} from 'react'

function Dashboard() {

    const [amount, setAmount] = useState()
    const [eBTCAmount, setEBTCAmount] = useState()
    const [ergAmount, setERGAmount] = useState()
    // const [BTCVault, setBTCVault] = useState("")
    let BTCVault
    let ERGVAult
    

    useEffect(() => {

        function get(){

            fetch("https://api.bitaps.com/btc/testnet/v1/blockchain/address/state/n4YDfMoo1i3rzF8XEq9zyfo8TFfnroLjy6")
                .then(res => res.json())
                .then(res1 => res1.data)
                .then((res2) => {
                    const result = res2.balance / 100000000
                    setAmount(result.toString().substring(0,6))
                    setEBTCAmount(result.toString().substring(0,6))
                })

            fetch("https://api.ergoplatform.com/addresses/9hp4qZYXu9UbMZbiGkZ185HtZeqAN5DN2siyzGB8V5ZM39GZfRq")
                .then(res => res.json())
                .then(res1 => res1.transactions)
                .then(res2 => {
                        const result = res2.confirmedBalance / 1000000000
                        setERGAmount(result.toString().substring(0, 6))
                    })
        }
        

        get();
    }, [])

    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noreferrer');
    };


    return (
        <div id="pageDashboard">
            <div className='menu_dashboard'>

                <div className={"dashBox"}>
                    <div className="infoTitleDash">BTC in Vault</div>
                    <div className={"infoDash"}>
                        <div className={"dashAmount"}>{amount} BTC</div>
                        <div className={"dashCircle"}>
                            <div className={"synced"}>Synced <img className={"secure"} src={require('../../assets/img/secure.png').default}/></div>
                        </div>
                    </div>
                    <div className={"dashButton"} role={"link"} onClick={() => openInNewTab('https://tbtc.bitaps.com/n4YDfMoo1i3rzF8XEq9zyfo8TFfnroLjy6')}>View supply ➜</div>
                </div>

                <div className={"dashBox"}>
                    <div className="infoTitleDash">eBTC minted</div>
                    <div className={"infoDash"}>
                        <div className={"dashAmount"}>{eBTCAmount} eBTC</div>
                        <div className={"dashCircle"}>
                            <div className={"synced"}>Synced <img className={"secure"} src={require('../../assets/img/secure.png').default}/></div>
                        </div>
                    </div>
                    <div className={"dashButton"} role="link" onClick={() => openInNewTab('https://explorer.ergoplatform.com/en/addresses/9hp4qZYXu9UbMZbiGkZ185HtZeqAN5DN2siyzGB8V5ZM39GZfRq')}>View supply ➜</div>
                </div>

                <div className={"dashBox"}>
                    <div className="infoTitleDash">Revenue</div>
                    <div className={"infoDash"}>
                        <div className={"dashAmount"}>{ergAmount} ERG</div>
                        <div className={"dashCircle"}>
                            <div className={"synced"}>Secure <img className={"secure"} src={require('../../assets/img/secure.png').default}/></div>
                        </div>
                    </div>
                    <div className={"dashButton"} role="link" onClick={() => openInNewTab('https://explorer.ergoplatform.com/en/addresses/9fsYtXufgnv65JRDMWEHqGcgSRwBxdfkJbmD6tUozxE1J9zE8Dw')}>View supply ➜</div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard;
