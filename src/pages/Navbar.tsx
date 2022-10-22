import {useState} from "react";
import {ReactNode, useEffect} from "react";


function Navbar() {

    const [selected, setSelected] = useState("Ergo")
    const [userAddress, setUserAddress] = useState<string>('');

    async function handleWalletConnect() {
  
        const isConnected: boolean = await ergoConnector.nautilus.connect();
        
        if(isConnected) {
          const address = ergo.get_change_address();
            address.then((value) => {
                setUserAddress(value)
            });
        }
        }

        useEffect(() => {
            handleWalletConnect();
        }, [])
    return (
        <div>
            <div id="navbar_menu">
                <div id="imgLogonav">
                    <img src={require('./img/logo.png')} alt="aneta" className="imgLogo"/>
                </div>
                <div id="head">
                <a target="_blank" href="https://bitcoinfaucet.uo1.net/"><div className="menuButton">
                        Get Test BTC
                    </div></a>
                    <div><DropDown selected={selected} setSelected={setSelected}/></div>
                    <div className="menuButton" >
                        <img id="nautilusimg" alt="aneta" src={require('./img/nautilus.jpeg')}/>
                        {userAddress? userAddress.substring(0,6) + '...' + userAddress.substring(userAddress.length-6, userAddress.length) : 'Connect wallet'}
                    </div>
                    <div>
                        <button type="button" className="menuButton" id="sun">
                            <img alt="aneta" src={require('./img/Vector.png')} id="Vector"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>


    )
}


function DropDown({selected, setSelected}) {
    const [isActive, setIsActive] = useState(false)

    function DownUp() {
        if (isActive) {
            return (
                <img id="down" alt="aneta" src={require('./img/up.png')}/>
            )
        } else {
            return (
                <img id="down" alt="aneta" src={require('./img/down.png')}/>
            )
        }
    }

    const options = ["Ergo", "Cardano"];
    return (
        <div className="dropdown">
            <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
                <div className="imgwrapper">

                    <img src={require('./img/' + selected + '.png')} id="Vector"/>

                </div>
                <div>{selected}</div>
                <div><DownUp/></div>

            </div>


            {isActive && (
                <div className="dropdown-content">
                    <p id="navText">Select Network</p>
                    {options.map((option) => (
                        <div onClick={(e) => {
                            setSelected(option)
                            setIsActive(false)
                        }}
                             className="dropdown-item">
                            <div><img className="nav-icon" src={require('./img/' + option + '.png')} alt="aneta"
                                      id="Vector"/></div>
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
