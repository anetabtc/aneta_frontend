import React from "react";
import {SetStateAction, useState, useEffect} from "react";
import getAddress from "./Bridge/address";


function Navbar() {

    const [selected, setSelected] = useState("Ergo")
    const [userAddress, setUserAddress] = useState('');
    const [connected, setConnected] = useState(false);
    const [visible, setVisible] = useState(false);

    async function handleWalletConnect() {

        if (!connected) {
            const isConnected = await ergoConnector.nautilus.connect();

            if (isConnected) {
                const address = ergo.get_change_address();
                address.then((value) => {
                    setUserAddress(value)
                });
                // const address = getAddress();
                // address.then((value) => {
                //     setUserAddress(value)
                // });
            }

            setConnected(true)
        }else{
            visible ? setVisible(false) : setVisible(true)
        }
    }

    async function disconnect() {

        await ergoConnector.nautilus.disconnect();
        setUserAddress('')

        setConnected(false)
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
            <div id="navbar_menu">
                <div id="imgLogonav">
                    {dark ? <img src={require('./img/logo_dark.png').default} alt="aneta" className="imgLogo"/> : <img src={require('./img/logo.png').default} alt="aneta" className="imgLogo"/>}
                </div>
                <div id="head">
                    <a target="_blank" href="https://bitcoinfaucet.uo1.net/">
                        <div className="menuButton">
                            Get Test BTC
                        </div>
                    </a>
                    <div><DropDown selected={selected} setSelected={setSelected}/></div>
                    <div>
                        <div className="menuButton" onClick={handleWalletConnect}>
                            {userAddress ? <img id="nautilusimg" alt="aneta" src={require('./img/nautilus.png').default}/> : ""}
                            {userAddress ? userAddress.substring(0, 4) + '...' + userAddress.substring(userAddress.length - 4, userAddress.length) : 'Connect wallet'}
                        </div>
                        {visible ? <div className="menuButton" id="disconnect" onClick={disconnect}>Disconnect</div> : "" }


                    </div>
                    <div>
                        <button type="button" className="menuButton" id="sun" onClick={darkModeToggle}>
                            {dark ? <img alt="aneta" src={require('./img/Vector_dark.png').default} id="Vector"/>: <img alt="aneta" src={require('./img/Vector.png').default} id="Vector"/>}
                        </button>
                    </div>
                </div>
            </div>
        </div>


    )
}


function DropDown({selected, setSelected}) {
    const [isActive, setIsActive] = useState(false)

    // function DownUp() {
    //     if (isActive) {
    //         return (
    //             <img id="down" alt="aneta" src={require('./img/up.png')}/>
    //         )
    //     } else {
    //         return (
    //             <img id="down" alt="aneta" src={require('./img/down.png')}/>
    //         )
    //     }
    // }

    const [dark, setDark] = useState("")
    useEffect(()=>{ localStorage.getItem('dark-mode') === 'true' ? setDark(true): setDark(false);},);

    function changeWidth() {
        if(selected==="Ergo"){
            document.getElementById("dropdown").style.width = "145px";
            document.getElementById("drop-content").style.width = "115px"
        }else if(selected==="Cardano") {
            document.getElementById("dropdown").style.width = "125px";
            document.getElementById("drop-content").style.width = "95px"
        }
    }
    const options = ["Ergo", "Cardano"];
    return (
        <div className="dropdown"  id={"dropdown"} >
            <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
                <div className="imgwrapper">

                    {dark ? <img src={require('./img/' + selected + '_dark.png').default} id="Vector"/>:<img src={require('./img/' + selected + '.png').default} id="Vector"/>}

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
                            <div>{dark ? <img className="nav-icon" src={require('./img/' + option + '_dark.png').default} alt="aneta"
                                      id="Vector"/>:<img className="nav-icon" src={require('./img/' + option + '.png').default} alt="aneta"
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
