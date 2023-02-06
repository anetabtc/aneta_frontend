import React, {useEffect} from "react";
import {useState} from "react";
import KYA from "../KYA";


function Navbar() {

    const [selected, setSelected] = useState("Ergo")
    const [userAddress, setUserAddress] = useState(JSON.parse(localStorage.getItem('address')));
    const [visible, setVisible] = useState(false);
    const [connectedOnRefresh, setConnectedOnRefresh] = useState(!!JSON.parse(localStorage.getItem('address')))


    if(connectedOnRefresh){
        setConnectedOnRefresh(false)
        handleWalletConnect()
    }

    async function handleWalletConnect() {

        console.log("useraddd", userAddress)
        if (userAddress === null) {
            const isConnected = await ergoConnector.nautilus.connect();

            if (isConnected) {
                const address = ergo.get_change_address();
                address.then((value) => {
                    localStorage.setItem('address', JSON.stringify(value))
                    setUserAddress(JSON.parse(localStorage.getItem('address')))
                });
                // const address = getAddress();
                // address.then((value) => {
                //     setUserAddress(value)
                // });
            }

        }else{
            await ergoConnector.nautilus.connect();
            if(!connectedOnRefresh){
                visible ? setVisible(false) : setVisible(true)
            }
        }
    }

    async function disconnect() {

        let disconnected = await ergoConnector.nautilus.disconnect();
        console.log("disconnected: ", disconnected)
        localStorage.removeItem('address');
        setUserAddress(JSON.parse(localStorage.getItem('address')))

        setVisible(false)
    }
    const [dark, setDark] = useState("")

    const darkModeToggle = () => {
            document.body.classList.toggle("dark");
            if(document.body.classList.contains('dark')){
                setDark(true)
                localStorage.setItem('dark-mode', 'true')
            }else{
                setDark(false)
                localStorage.setItem('dark-mode', 'false')};
    }

    useEffect(()=>{

       if( localStorage.getItem('dark-mode') === 'true')
       {document.body.classList.add('dark');
        setDark(true);
        }else {document.body.classList.remove('dark');
        setDark(false);}
    },);

    // useEffect(() => {
    //     handleWalletConnect();
    // }, [])
    return (
        <div>
            <KYA/>
            <div id="navbar_menu">
                <div id="imgLogonav">
                    {dark ? <img src={require('../assets/img/logo_dark.png').default} alt="aneta" className="imgLogo"/> : <img src={require('../assets/img/logo.png').default} alt="aneta" className="imgLogo"/>}
                </div>
                <div id="head">
                    <a target="_blank" href="./Navbar">
                        <div className="menuButton">
                            Get Test BTC
                        </div>
                    </a>
                    <a target="_blank" href="./Navbar">
                        <div className="menuButton">
                            Download Moonshine Wallet
                        </div>
                    </a>
                    <div><DropDown selected={selected} setSelected={setSelected}/></div>
                    <div>
                        <div className="menuButton" onClick={handleWalletConnect}>
                            {userAddress ? <img id="nautilusimg" alt="aneta" src={require('../assets/img/nautilus.png').default}/> : ""}
                            {userAddress ? userAddress.substring(0, 4) + '...' + userAddress.substring(userAddress.length - 4, userAddress.length) : 'Connect wallet'}
                        </div>
                        {visible ? <div className="menuButton" id="disconnect" onClick={disconnect}>Disconnect</div> : "" }


                    </div>
                    <div>
                        <button type="button" className="menuButton" id="sun" onClick={darkModeToggle}>
                            {dark ? <img alt="aneta" src={require('../assets/img/Vector_dark.png').default} id="Vector"/>: <img alt="aneta" src={require('../assets/img/Vector.png').default} id="Vector"/>}
                        </button>
                    </div>
                </div>
            </div>
        </div>


    )
}


function DropDown({selected, setSelected}) {
    const [isActive, setIsActive] = useState(false)

    const [dark, setDark] = useState("")
    useEffect(()=>{ localStorage.getItem('dark-mode') === 'true' ? setDark(true): setDark(false);},);

    function changeWidth() {
        if(selected==="Ergo"){
            document.getElementById("dropdown").style.width = "135px";
            document.getElementById("drop-content").style.width = "135px"
        }else if(selected==="Cardano") {
            document.getElementById("dropdown").style.width = "135px";
            document.getElementById("drop-content").style.width = "135px"
        }
    }
    const options = ["Ergo", "Cardano"];
    return (
        <div className="dropdown"  id={"dropdown"} >
            <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
                <div className="imgwrapper">

                    {dark ? <img src={require('../assets/img/' + selected + '_dark.png').default} id="Vector"/>:<img src={require('../assets/img/' + selected + '.png').default} id="Vector"/>}

                </div>
                <div>{selected}</div>


            </div>


            {isActive && (
                <div className="dropdown-content" id={"drop-content"}>
                    <p id="navText">Select Network</p>
                    {options.map((option) => (
                        <div onClick={(e) => {
                            setSelected(option)
                            setIsActive(false)
                            changeWidth()
                        }}
                             className="dropdown-item">
                            <div>{dark ? <img className="nav-icon" src={require('../assets/img/' + option + '_dark.png').default} alt="aneta"
                                      id="Vector"/>:<img className="nav-icon" src={require('../assets/img/' + option + '.png').default} alt="aneta"
                                      id="Vector"/>}</div>
                            <div>{option}</div>
                            {selected === option && (
                                <div className="selected"></div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}


export default Navbar;
