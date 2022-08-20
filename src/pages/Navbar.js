import react, {useState} from "react";


function Navbar() {
    const[selected, setSelected] = useState("Select Network")
    return (
        <div id="navbar_menu">
        <div id="imgLogonav">
           <img src={require('./img/logo.png')} className="imgLogo" />
           </div>
           <div id="head">
           <div className="menuButton">
                  Get Test BTC
              </div>
               <div><DropDown selected={selected} setSelected={setSelected}/></div>
               <div className="menuButton">
                   <img id="nautilusimg" src={require('./img/nautilus.jpeg')}/>
                   9fSbgi...KMJAhb
               </div>
               <div><button type="button" className="menuButton" id="sun"><img src={require('./img/Vector.png')} id="Vector" /></button></div>
           </div>
        </div>


    )
}


function DropDown({selected, setSelected}) {
    const [isActive, setIsActive] = useState(false)

    function DownUp(){
        if(isActive){
            return (
                <img id="down" src={require('./img/up.png')}/>
            )
        }else{
            return (
                <img id="down" src={require('./img/down.png')}/>
            )
        }
    }

    const options = ["Ergo", "Cardano"];
    return (
        <div className="dropdown">
            <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
                <div className="imgwrapper">
                    {selected != "Select Network" && (
                        <img src={require('./img/' + selected + '.png')} id="Vector" />
                    )}
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
                             className="dropdown-item" >
                            <div><img className="nav-icon" src={require('./img/' + option + '.png')} id="Vector" /></div>
                            <div>{option}</div>
                            {selected == option && (
                                <div className="selected"></div>
                            ) }
                        </div>
                        ))}
                </div>
            )}
        </div>
    )
}


export default Navbar;
